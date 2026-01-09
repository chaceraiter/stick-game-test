# Current Context for New Chat

## Project Status: Movement Abilities In Progress

A stick figure arena shooter built with Phaser 3, styled to look like doodles on crumpled notebook paper. Weapon system baseline is complete; current focus is movement abilities (jump pack + grappling hook) and movement feel.

## What Works

- **Player movement:** WASD or arrow keys to move, W/Up to jump
- **Stances:** W/S (or Up/Down) cycles stand ↔ crouch ↔ prone (250ms cooldown); W jumps only if already standing
- **Movement tuning:** lower jump height; slower movement when crouched/prone; 0.5× speed when moving backward vs facing
- **Aiming:** Crosshair orbits player at fixed distance, J/K to rotate aim
- **Facing + quick turn:** character faces left/right based on aim side; L mirrors aim for quick 180 turns (stand/crouch only); debug facing vector shown
- **Jump pack (test):** I = upward kick, O = short upward thrust; orange jet flame visual
- **Grapple (test):** N deploy/release; 2000ms cooldown; attaches only if ray hits platform/wall; rope constraint enables swinging; A/D pumps swing (impulse-gated near bottom) when taut; W reels in, S reels out; true misses show a brief orange shot line
- **Shooting:** Spacebar or click fires toward crosshair
- **Projectile collisions:** Bullets disappear when they hit platforms/walls (in addition to enemies)
- **Weapon switching:** 1–5 keys switch weapons
- **Weapon UI:** text label + image at top of screen (temporary clip art)
- **Ammo + reloads:** per-weapon magazine sizes + reload timers; E triggers reload; auto-reload on empty
- **Shotgun spread:** multi-pellet with randomized angle derived from crosshair gap + distance
- **Fire rate limiter:** per-weapon fire cooldown
- **Fire modes:** semi-auto vs full-auto behavior per weapon
- **Enemies:** Red stick figures, destroyed when shot
- **Level progression:** 6 layouts that cycle; complete level by killing all enemies
- **Platform shape library:** 15 simple shapes + 3 compound shapes = 18 total
- **Compound shape system:** Multiple collision bodies + custom visual outlines
- **Water hazard:** Blue wavy line at y=870
- **Walls:** Hand-drawn with crayon fill
- **Debug controls:** R (restart), G (next layout), F (fly), H (Arcade physics debug draw toggle)

## Weapon System: Complete

**Completed steps:**
1. ✅ Created `js/weapons/WeaponDefinitions.js` with 5 weapons defined
2. ✅ Fix diagonal velocity normalization
3. ✅ Dynamic crosshair (distance/gap changes per weapon)
4. ✅ Weapon switching with number keys (1-5)
5. ✅ Weapon display UI at top of screen
6. ✅ Unique weapon behaviors (shotgun spread, pellets)
7. ✅ Fire rate limiting per weapon
8. ✅ Fire modes (semi/auto) per weapon
9. ✅ Implemented magazine sizes + reloads + reload times

### Weapons Defined (in WeaponDefinitions.js)

| Weapon | Velocity | Fire Rate | Range | Precision | Special |
|--------|----------|-----------|-------|-----------|---------|
| Pistol | 600 | 3/sec | 85px | 4px gap | Balanced |
| Shotgun | 500 | 1/sec | 60px | 8px gap | 5 pellets, spread |
| SMG | 550 | 10/sec | 70px | 6px gap | Very fast |
| Hunting Rifle | 900 | 0.8/sec | 120px | 2px gap | Slow, precise |
| Auto Rifle | 700 | 5/sec | 90px | 4px gap | Medium |

## File Structure

```
stick-game-test/
├── index.html                      # Loads Phaser + game.js as ES6 module
├── js/
│   ├── game.js                     # Phaser config (700x900)
│   ├── scenes/
│   │   └── PlayScene.js            # Main gameplay (still large; grapple logic extracted)
│   ├── platforms/
│   │   ├── PlatformShapes.js       # Re-export hub
│   │   ├── ShapeDefinitions.js     # 18 shapes
│   │   └── LayoutDefinitions.js    # 6 layouts
│   ├── drawing/
│   │   ├── ShapeRenderer.js        # Platform textures
│   │   └── EnvironmentRenderer.js  # Walls & water
│   ├── utils/
│   │   └── DebugControls.js        # R/G/F/H keys
│   ├── systems/
│   │   └── GrappleSystem.js        # Grapple logic extracted from PlayScene
│   └── weapons/
│       └── WeaponDefinitions.js    # NEW: 5 weapon configs
├── assets/
│   └── cropped-notebook-page.png
└── ai-context-management/
```

## Technical Notes

- Phaser 3.70.0 via CDN
- ES6 modules (requires local server)
- Canvas: 700x900
- Character: 9x17 pixels
- Crosshair: 17x17, orbits at 85px (will vary by weapon)
- Weapon art: temporary clip-art images in `assets/weapons/`
- Projectiles: 2x2 visual sprite with 1x1 hitbox
- Run: `python3 -m http.server 8000`

## Controls

| Action | Keys |
|--------|------|
| Move | WASD or Arrows |
| Jump | W or Up (standing only) |
| Stance up/down | W/S or Up/Down |
| Quick turn | L |
| Grapple | N (toggle), W/S reel |
| Grapple (pump) | A/D (while grappling) |
| Aim | J (CCW), K (CW) |
| Shoot | Space or Click |
| Reload | E |
| Debug | R/G/F/H |

## This Session Summary

1. Refactored codebase into ES6 modules (PlayScene 780→515 lines)
2. Fixed compound shape cleanup bug
3. Fixed layout label update bug
4. Added WASD movement controls
5. Added crosshair-based aiming system (J/K to rotate)
6. Added spacebar shooting
7. Created weapon definitions file with 5 weapons
8. Implemented weapon switching, dynamic crosshair, and shotgun spread
9. Added weapon UI text + image (temporary clip art)
10. Added fire rate limiter and fire modes; updated weapon fire timings
11. Reduced projectile size (2x2 visual, 1x1 hitbox)
12. Implemented bullet collision with platforms/walls (disable bullets on impact using pooled-bullet `enableBody/disableBody` pattern)
13. Implemented per-weapon magazines + reload timers + ammo UI (`E` reload, auto-reload on empty)
14. Added jump pack test (I/O) + orange jet flame
15. Added grappling hook prototype (N deploy/release; W/S reeling)
16. Added grapple miss tracer (brief orange line on true misses)
17. Added pump-only swing controls (A/D tangential accel) + improved rope constraint (taut projection + remove radial velocity)

## Since Last Checkpoint (e3f8653) — Detailed Notes (Uncommitted)

### Grapple System Refactor + Swing Physics Stabilization

- **Refactor:** Grapple logic is now encapsulated in `js/systems/GrappleSystem.js`, and `PlayScene` delegates input/constraint/draw to it.
- **New rope physics approach (goal: eliminate dead-hang jitter):**
  - While grappling, we temporarily set `player.body.allowGravity = false` (Arcade gravity off) to prevent a constant “fall then snap back” cycle.
  - We then apply a **pendulum-style** update in `GrappleSystem.applyConstraint(dt)`:
    1) **(Occasional) position projection** back onto the rope circle when drift is noticeable (epsilon-based).
    2) **Remove radial velocity** every frame so the player moves tangentially to the rope instead of “stretching” the rope.
    3) **Apply gravity only along the rope tangent** (project gravity onto the tangent), which yields natural swing acceleration without fighting a hard rope constraint.
  - `PlayScene` now passes `deltaSeconds` into `applyConstraint(deltaSeconds)` so the pendulum gravity uses real `dt`.
- **Performance/stutter fix (goal: remove “slow motion” during fast swing + A/D):**
  - Avoid frequent `body.reset(...)` inside the rope constraint projection; that can be expensive and can cause visible frame drops during fast motion.
  - Instead we “nudge” the GameObject + Arcade Body positions directly when projection is needed (and update `body.prev`), which is cheaper and preserves velocity.
- **Net result so far:**
  - Dead-hang vertical jitter is much improved.
  - Remaining issue: sprite/rope flicker while grappling (see below).

### Debug Controls: “Real” Physics Debug Toggle

- `H` now toggles Arcade debug drawing by flipping `physics.world.drawDebug` (not just hiding the debug graphic), and clears the debug graphic when disabled.
- This helps test whether a performance regression is coming from debug rendering vs gameplay logic.

## Current Known Issues / Observations

### Grapple Visual Flicker (New / High Priority)

- **Symptoms:** Player sprite flickers while swinging; rope flickers a bit too.
- **Notable detail:** Arcade debug body/hitbox appears stable, but the sprite flickers (suggesting a GameObject/body sync issue).
- **Trigger:** Sometimes re-aggravated by changing reel height (W/S reeling).
- **Hypothesis:** Our rope projection “nudges” might not be synchronized with Arcade’s internal update order for the GameObject/body every frame (especially when dt varies), causing the render position to oscillate between two sources of truth.
- **More specific suspicion:** In Phaser Arcade, `body.x/y` and `body.position.x/y` are both used by different internals. If we nudge only `body.position` (and the sprite) but not `body.x/y`, Arcade’s postUpdate can snap the sprite back to `body.x/y` next step → visible flicker even when the hitbox looks stable.
- **Candidate fix directions (next session, no decision yet):**
  1) Run rope constraint enforcement on the physics step (worldstep) instead of in the render `update()` loop.
  2) Revisit position correction method: keep projection rare, and ensure any manual position sync updates all relevant fields consistently.
  3) If needed, keep the “pendulum” model but shift all authoritative movement to the Body and let Phaser sync the sprite from the body only.

### Grapple Swing Feel (New / High Priority)

- **Current state:** The new pendulum-style rope motion is much smoother vertically and no longer “buzzes” at dead hang.
- **Observed issue:** With no input, swing energy appears to persist for a very long time (feels like near-zero damping).
- **Observed issue:** “Speed profile” through the arc can look unnatural at times (may be from discrete projection when reeling or when the constraint has to correct).
- **Observed issue:** When swinging into an underside/edge, the player can repeatedly bonk and keep swinging back and forth (no obstruction/auto-release behavior yet).
- **Notes:** A hard reload / caching mismatch has happened before; verify behavior with cache disabled when testing.

## Next Steps

Grapple pass 2: fix grapple visual flicker + finalize swing pump feel; then rope obstruction rules + preserve momentum on release; then decide next milestone (damage/health, projectile feel, or procedural generator).

## Wishlist / Planning Notes

- Consider limiting weapon art/style to cowboy-type guns only (revisit weapon art choices).
- Grapple (pass 2) plan: swing feel + rope obstruction
  - **Implemented so far:**
    - Pump-only A/D: applies tangential acceleration only (no “walk” control while grapple is active).
    - Rope constraint: project player mount point back to the rope circle and remove radial velocity to keep motion tangential.
    - Miss tracer: brief orange shot line on true misses (post-cooldown) so misses are visible.
  - **Known issues / observations:**
    - Swing motion can feel choppy/buggy (Arcade-style constraint + collisions).
    - Pumping can build energy fast enough to allow full loops from a dead hang (tune realism).
    - Player horizontal velocity can “disappear” after releasing grapple (likely due to non-grapple movement logic zeroing X velocity when no input).
    - Ceiling/underside attachments can get “stuck” against platform collision resolution (still allowed; needs better obstruction rules).
  - **Wishlist: slack-rope visuals (curved rope)**
    - Visual-only: when the rope is slack (player is inside max length), render a slight sag/curve instead of a straight line.
    - Proposed approach: quadratic bezier curve using a single control point with tunables (`slackEpsilon`, `sagPerSlack`, `maxSagPx`, `downBias`).
    - Note: attempted once locally but appeared to cause a freeze after ~1–5s while grappling, so it was reverted; revisit carefully and profile.
  - **Next session: do these one-by-one**
    1) **Preserve momentum on release (fix “velocity disappears”)**
       - Cause: non-grapple movement code uses `setVelocityX(0)` when no A/D input, so the first frame after release can wipe X velocity.
       - Fix direction: do not hard-zero X velocity while airborne; use ground-only friction or an accel/decel model.
       - Acceptance: release grapple mid-swing and keep most of your horizontal speed without holding A/D.
    2) **Rope obstruction ⇒ immediate auto-release**
       - Rule: while grappling, segment-test mount→anchor against platform/wall AABBs; if any hit occurs with `t < 1 - ε`, release.
       - Keep ceiling grapples, but ensure we don’t self-block on the anchor surface (epsilon + ignore the body containing the anchor point, if needed).
       - Acceptance: grapples that would “clip through” or run through a platform drop immediately instead of jittering/sticking.
    3) **Stability pass (reduce choppiness/jitter)**
       - Add small positional epsilon so we don’t `reset(...)` when the correction is tiny.
       - Consider running constraint before/after collisions consistently (already before visuals) and minimize teleport-like corrections.
       - Acceptance: swing arc looks smooth; fewer visible “snaps”.
    4) **Pump realism tuning (avoid easy full loops)**
       - Lower `pumpAccel` and/or `maxSpeed` clamp.
       - Gate pumping: apply most of the pump only near bottom of arc (based on rope angle or relative mount/anchor Y).
       - Optional realism: only add energy if input matches current tangential velocity sign.
       - Acceptance: you can still gain swing speed, but full loops require significant setup (or may be impossible depending on desired realism).
  - **Notes**
    - Full loops aren’t necessarily “wrong”, but current tuning makes them too easy.
    - Choppiness can also come from collisions when attached under platforms; the obstruction rule should remove many worst cases.
  - **Rope obstruction rules (simple + fast):**
    - Only while grappling, segment-test mount→anchor against platform/wall AABBs.
    - If the rope segment intersects anything *before* the anchor point (t < 1 - ε), **auto-release**.
    - Perf: with current platform/wall counts this is negligible; can optimize later (broad-phase filter, every N frames, only when mount moved, etc.).
    - Important: allow ceiling grapples without instantly “self-blocking” on the anchored platform (epsilon/ignore the body containing the anchor hit).
  - **Release momentum (next):**
    - Avoid `setVelocityX(0)` style logic while in-air; move toward acceleration/friction-based horizontal movement so momentum carries through grapple release.
  - **Future behavior idea:** “edge catch” (re-anchor rope to the blocking hit point) instead of releasing; rope wrapping later if desired.
- Movement wishlist:
  - Much lower jump height.
  - Walk up small steps/ledges (basic “step-up” support).
  - Jetpack/jumppack style movement ability.
  - Grappling gun / grappling hook.
  - Revisit movement speed (and possibly acceleration vs instant velocity).
  - Add crouch + prone with associated sprites and movement-speed changes.
  - Tweak movement velocities (walk/air/stance multipliers).
  - Tweak flip-direction behavior (when/how facing switches).
  - Consider stance-based aim constraints (e.g. prone aim limits).
  - Consider aim acceleration/response (instead of constant turn rate).
  - Tweak crouch height/hitbox sizing and feel.
  - Add ground/air acceleration + deceleration + friction (instead of instant velocity).
  - Add “can stand here?” ceiling check before standing up from crouch/prone.
- Bullet collision reliability ideas (if tunneling/artifacts show up with fast bullets):
  - Lower projectile velocities (and/or cap max projectile speed per weapon).
  - Slightly larger projectile physics body (sprite can stay small).
  - “Long rectangle” projectile body aligned to travel direction (helps, but still per-frame AABB checks).
  - Swept collision (treat motion as a segment from prev→next position; manual segment-vs-rect checks).
  - Instant hit-scan for straight-line weapons: on shot, raycast/segment-test against platforms/walls/enemies and place the bullet at the first hit (no per-frame collision checks); still spawn a visual tracer if desired.
- Hit spark or impact indicator (visual feedback on hits).
- Optional projectile debug overlay (toggleable), implemented without noticeable slowdown.
