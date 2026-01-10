# Grappling Mechanic — Intended Behavior + Implementation Audit

This document is the single source of truth for how the grappling hook is *supposed* to behave, plus a walkthrough of the current implementation and a “spec vs code” comparison checklist. The goal is to make it easy to spot bugs/unintended behavior after many iterations.

## 1) Intended Behavior (Plain Language Spec)

### 1.1 Core Concept

The grappling hook is a movement ability that lets the player attach a rope to the level geometry (platforms/walls) and swing like a pendulum. While attached, the player can:

- Reel the rope shorter/longer (W/S).
- “Pump” the swing (A/D) using a simplified, game-feel rule (no timing skill required).
- Release the rope (N again) while preserving momentum.

### 1.2 Glossary

- **Anchor**: The world point on a platform/wall where the grapple attaches.
- **Mount point**: The point on the player the rope is attached to (roughly chest/upper torso).
- **Rope length**: The target distance from mount point to anchor.
- **Taut**: Rope is at (or very near) its target length. Pumping only works when taut.
- **Slack**: Player is closer than rope length. Pumping is disabled in slack (to avoid air-control).
- **Swing direction**: Left vs right along the rope’s tangent (not world X).
- **Nadir / bottom**: The lowest point in the swing arc (most “efficient” pump moment).
- **Apex**: The highest point on either side of the swing; direction flips here.

### 1.3 Controls

- **N**: Deploy grapple (if not active) / Release grapple (if active).
- **W**: Reel in (shorten rope) while grappling.
- **S**: Reel out (lengthen rope) while grappling.
- **A / D**: Pump the swing (see pumping spec below).

### 1.4 Cooldown + Range

- **Cooldown**: You can attempt a grapple at most once per **2000ms**. A miss consumes the cooldown.
- **Max range**: Max grapple distance is ~6× the player’s standing/baseline height (we avoid shrinking range when crouched/prone).
  - Implementation note: we approximate “baseline height” by tracking the max observed Arcade body height.
- **Initial rope length**: When you successfully attach, rope length starts as the distance from mount point to anchor.
- **Reel limits**: Rope length is clamped between a small minimum and the max range.

### 1.5 Deployment (N press)

When you press **N** and grapple is not active:

1. If still on cooldown: nothing happens.
2. Otherwise, cast a straight line from the player’s mount point in the current aim direction out to max range.
3. If the line hits any platform/wall collision rectangle: attach.
4. If the line hits nothing: fail to deploy (show a short “miss tracer” line).

When you press **N** and grapple is active:

- Release immediately.

### 1.6 Attachment Rules

- A grapple can only attach to **platforms** and **walls** (static environment).
- If multiple objects are hit, the grapple attaches to the **closest** hit point along the cast.

### 1.7 While Grappling: Rope Physics

When grappling is active:

- The rope is treated as a **hard length constraint** (player mount point should stay on a circle of radius rope length around the anchor).
- The player should **naturally swing down** under gravity into the bottom of the arc (like a pendulum).
- The rope should not “buzz” or jitter at a dead hang.
- Visuals (rope line + crosshair + gun) should stay stable (no flicker).

### 1.8 Reeling (W/S)

While grappling:

- Holding **W** decreases rope length at a constant speed.
- Holding **S** increases rope length at a constant speed.
- Rope length is clamped between min and max.

Reeling should not cause violent snapping or obvious teleporting. Some correction is OK, but it should look stable.

### 1.9 Pumping (A/D) — No Timing Skill

Pumping is intended to be “easy to explain” and not require precise timing.

**High-level rule:** input is queued (tap or hold) and the system applies a small tangential impulse at the *most efficient point* (the bottom/nadir).

**Queue rules (game-feel):**

- Pumping only works when the rope is **taut**.
- The system only allows **one** pump to be queued at a time.
- **Same-direction queue (A while swinging left, D while swinging right):**
  - Can be queued **before** the bottom of the current half-swing.
  - If you try to queue it **after** the bottom, it is ignored (prevents banking a pump through a full cycle).
- **Opposite-direction queue (A while swinging right, D while swinging left):**
  - Can be queued **after** passing the bottom (to “prep” the next swing).
  - This matches the real-swing intuition of “start your movement on the way up”.
- A tap should “stick” (you can release immediately after tapping and the queue remains until it fires or expires).
- After a pump fires, you must fully release A/D (key-up) at least once during the next half-swing before another pump can be queued (prevents buffering / spamming).

**Fire moment:**

- The pump fires automatically at the bottom (nadir) when the swing passes through it.
- If the player is essentially at a dead hang near the bottom, a queued pump may fire immediately to kick-start motion.

### 1.10 Release (N press)

On release:

- Restore normal gravity behavior.
- Restore any temporary physics settings (e.g. bounce).
- Preserve the player’s existing momentum (don’t “wipe” horizontal velocity on release).

### 1.11 Visuals / Debug

While grappling:

- Draw a rope line from mount point to anchor.
- Draw a small anchor dot.
- On a missed shot: draw a brief orange tracer line showing the cast direction.
- On a successful pump impulse: briefly flash a green indicator at the anchor (debug feedback).

### 1.12 Out of Scope / Not Implemented Yet (but desired)

- Rope obstruction/line-of-sight rules (auto-release if rope intersects geometry).
- Rope wrapping around corners.
- Auto-release rules on underside bonk / blocked-up collisions.
- Tuned, final swing damping value (damping is currently a tuning knob and may be temporarily disabled).

---

## 2) Implementation Walkthrough (What the Code Does)

### 2.1 Where the code lives

- `js/scenes/PlayScene.js`
  - Owns player, platforms, walls, input.
  - Creates `this.grapple = new GrappleSystem(...)`.
  - Routes input to grapple (`updateInput` + `applyPump`) and calls `applyConstraint` + `draw` every frame.
- `js/systems/GrappleSystem.js`
  - Owns grapple state machine: cooldown, active flag, anchor, rope length.
  - Owns hit-testing (segment vs rectangles).
  - Owns rope physics constraint + pumping logic.
  - Owns rope/miss-tracer rendering.

### 2.2 Frame order (important)

In `PlayScene.update()`:

1. Read input states.
2. `grapple.updateInput({ reelIn, reelOut, dt })` handles N toggle + W/S reeling.
3. If grapple is active: `grapple.applyPump(moveDir, dt)` uses A/D to queue/fire pump.
4. Later in the frame: `grapple.applyConstraint(dt)` moves the player to enforce the rope and apply pendulum gravity.
5. After constraint: update crosshair, gun, jet flame; then `grapple.draw()` draws the rope/miss tracer.

This ordering matters because the rope constraint can move the player; dependent visuals are updated afterward.

### 2.3 Grapple state machine

- `updateInput()`:
  - On `N` just-down: `toggle()` deploys or releases.
  - If active: `updateReel()` adjusts rope length from W/S.
- `tryDeploy()`:
  - Enforces 2000ms cooldown (`nextGrappleTime`).
  - Casts a segment from mount → mount + aimDir*maxRange.
  - Uses `findHit()` to pick closest segment-rectangle edge intersection.
  - On miss: sets miss-tracer state (`shotUntil`, `shotStart`, `shotEnd`).
  - On hit: sets `active`, `anchor`, `ropeLength` and disables Arcade gravity + bounce on the player.
- `release()`:
  - Restores gravity/bounce, clears rope state, clears debug graphics, clears pump state.

### 2.4 Rope physics constraint

`applyConstraint(dt)` does:

1. Compute current mount→anchor vector.
2. **Position projection**: if mount is off the target circle by > epsilon, move the Arcade Body position (not just sprite) so mount lies on the circle.
3. **Remove radial velocity**: subtract velocity component along the rope direction.
4. **Pendulum gravity**: apply gravity only along the rope tangent (instead of full Arcade gravity).
5. **Optional damping**: exponential velocity damping per second (currently controlled by `swingDampingPerSec`).

### 2.5 Pump logic (high-level)

`applyPump(moveDir, dt)` does:

- Interprets A/D as `moveDir` (-1, 0, +1).
- Determines the current half-swing direction from the sign of tangential velocity (or, at near-rest, from input).
- Detects “passed nadir” by tracking `ny` peaking then decreasing (no hard `ny` threshold; small swings still have a definable bottom).
- Stores input taps as “pending”, then promotes them to “queued” when they become eligible under the queue window rules.
- Fires the queued impulse at the nadir, adds tangential velocity, and flashes green at anchor.

---

## 3) Spec vs Current Code (Comparison Checklist)

Use this to spot unintended behavior quickly:

- **Cooldown consumes misses**: Intended yes; Code: yes (`tryDeploy` sets cooldown before hit test).
- **Range ~6× height**: Intended yes; Code: yes (`getMaxRange()` = height × 6).
- **Attach only to platforms/walls**: Intended yes; Code: yes (`findHit()` uses platform + wall bodies).
- **Closest-hit attachment**: Intended yes; Code: yes (lowest `t`).
- **Reel W/S while grappling**: Intended yes; Code: yes (`updateReel()`).
- **No stance changes while grappling**: Intended yes; Code: yes (`PlayScene` skips stance change if grappleActive).
- **Swing stability**: Intended stable; Code: mostly stable via pendulum + projection + radial velocity removal.
- **Damping**: Intended as a tuning knob; Code: exists (`swingDampingPerSec`) and may be temporarily set to 0 while tuning.
- **Pump: no timing skill**: Intended yes; Code: queued + auto-fire at nadir.
- **Pump: same-dir before bottom / opposite-dir after bottom**: Intended yes; Code: yes (pending→queued gating on `halfPassedNadir`).
- **Pump: no multi-cycle banking**: Intended yes; Code: pending clears at apex; queued expires by half-counter.
- **Pump: tap sticks**: Intended yes; Code: yes (pending survives key-up).
- **Pump: require key-up before queuing again**: Intended yes; Code: yes (`pumpWaitingForKeyUp` gate).
- **Debug “pump fired” indicator**: Intended yes; Code: yes (green flash at anchor).
- **Rope obstruction auto-release**: Intended later; Code: not implemented.

### Things to verify in playtesting (likely bug sources)

- A/D “queue window” edge cases around the nadir (press very close to bottom).
- Behavior when rope is slightly slack (pumps should not act like air control).
- Reel-in/out interaction with nadir detection (reeling changes ny/dist).
- Whether the queued pump can get “stuck” if nadir detection never triggers (e.g. ny doesn’t form a clean local maximum due to jitter/reeling/collisions).
- Whether collision resolution with platforms (especially undersides) produces unintended energy.
