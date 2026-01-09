export class GrappleSystem {
    constructor(scene, { getPlayer, getPlatforms, getWalls, getAimAngle }) {
        this.scene = scene;
        this.getPlayer = getPlayer;
        this.getPlatforms = getPlatforms;
        this.getWalls = getWalls;
        this.getAimAngle = getAimAngle;

        this.key = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

        this.nextGrappleTime = 0;
        this.active = false;
        this.anchor = null;
        this.ropeLength = 0;
        this.prevAllowGravity = null;
        this.prevBounce = null;

        this.shotUntil = 0;
        this.shotFadeMs = 350;
        this.shotStart = null;
        this.shotEnd = null;

        this.graphics = scene.add.graphics();
        this.graphics.setDepth(15);

        // Pump state: allow at most one "pump" impulse per half-swing.
        // We track the last tangential-velocity sign we pumped on; it flips at the apex.
        this.lastPumpedHalfSign = 0;
    }

    isActive() {
        return this.active;
    }

    getMaxRange() {
        const player = this.getPlayer?.();
        const height = player?.body?.height ?? 17;
        return height * 6;
    }

    getMountWorldPosition() {
        const player = this.getPlayer?.();
        if (!player || !player.body) return { x: player?.x ?? 0, y: player?.y ?? 0 };
        const x = player.body.center.x;
        const y = player.body.top + (player.body.height * 0.35);
        return { x, y };
    }

    updateInput({ reelIn, reelOut, dt }) {
        if (Phaser.Input.Keyboard.JustDown(this.key)) {
            this.toggle();
        }
        if (this.active) {
            this.updateReel({ reelIn, reelOut, dt });
        }
    }

    toggle() {
        if (this.active) {
            this.release();
        } else {
            this.tryDeploy();
        }
    }

    tryDeploy() {
        const now = this.scene.time.now;
        if (now < this.nextGrappleTime) return false;
        this.nextGrappleTime = now + 2000;

        const start = this.getMountWorldPosition();
        const aimAngle = this.getAimAngle?.() ?? 0;
        const maxRange = this.getMaxRange();
        const end = {
            x: start.x + Math.cos(aimAngle) * maxRange,
            y: start.y + Math.sin(aimAngle) * maxRange
        };

        const hit = this.findHit(start, end);
        if (!hit) {
            this.shotUntil = now + this.shotFadeMs;
            this.shotStart = { x: start.x, y: start.y };
            this.shotEnd = { x: end.x, y: end.y };
            return false;
        }

        this.shotUntil = 0;
        this.shotStart = null;
        this.shotEnd = null;

        this.active = true;
        this.anchor = { x: hit.x, y: hit.y };
        this.ropeLength = Phaser.Math.Distance.Between(start.x, start.y, hit.x, hit.y);

        // While grappling, we run our own "pendulum" gravity along the rope tangent.
        // Disabling Arcade gravity prevents a constant gravity-vs-constraint tug-of-war that can create jitter.
        const player = this.getPlayer?.();
        if (player?.body) {
            this.prevAllowGravity = player.body.allowGravity;
            player.body.allowGravity = false;

            // Also remove bounce while grappling; bounce + constraint can create perpetual “pinball” energy
            // on platform edges/undersides.
            this.prevBounce = { x: player.body.bounce.x, y: player.body.bounce.y };
            player.setBounce(0);
        }
        return true;
    }

    release() {
        const player = this.getPlayer?.();
        if (player?.body && this.prevAllowGravity !== null) {
            player.body.allowGravity = this.prevAllowGravity;
        }
        this.prevAllowGravity = null;
        if (player?.body && this.prevBounce) {
            player.body.bounce.x = this.prevBounce.x;
            player.body.bounce.y = this.prevBounce.y;
        }
        this.prevBounce = null;
        this.active = false;
        this.anchor = null;
        this.ropeLength = 0;
        if (this.graphics) this.graphics.clear();
        this.lastPumpedHalfSign = 0;
    }

    updateReel({ reelIn, reelOut, dt }) {
        const reelSpeed = 120; // px/s
        if (reelIn) {
            this.ropeLength -= reelSpeed * dt;
        }
        if (reelOut) {
            this.ropeLength += reelSpeed * dt;
        }
        const minLen = 10;
        const maxLen = this.getMaxRange();
        this.ropeLength = Phaser.Math.Clamp(this.ropeLength, minLen, maxLen);
    }

    applyConstraint(dt = 0) {
        if (!this.active || !this.anchor) return;
        const player = this.getPlayer?.();
        if (!player || !player.body) return;

        const mount = this.getMountWorldPosition();
        const dx = mount.x - this.anchor.x;
        const dy = mount.y - this.anchor.y;
        const dist = Math.hypot(dx, dy);
        if (dist <= 0.0001) return;

        // Rope physics model:
        // - Arcade gravity is disabled while grappling to avoid a constant "fall then snap back" cycle.
        // - We enforce a near-constant rope length (position projection) and remove radial velocity.
        // - Then we apply gravity ONLY along the rope tangent (pendulum behavior).
        //
        // This tends to be much more stable than letting Arcade gravity run and correcting afterward.
        const nx = dx / dist;
        const ny = dy / dist;

        // 1) Position projection (only if noticeably off-length; avoids calling reset every frame)
        const desiredMountX = this.anchor.x + nx * this.ropeLength;
        const desiredMountY = this.anchor.y + ny * this.ropeLength;
        const offsetX = desiredMountX - mount.x;
        const offsetY = desiredMountY - mount.y;
        const posEpsilon = 0.5;
        if (Math.abs(offsetX) > posEpsilon || Math.abs(offsetY) > posEpsilon) {
            // Avoid `body.reset(...)` here: frequent resets at high swing speeds can tank FPS.
            //
            // IMPORTANT: keep *Body* as the single source of truth to avoid render flicker.
            // If we only nudge the sprite position (or only some body fields), Arcade can resync the
            // GameObject from the Body on the next step, causing visible sprite/rope flicker.
            const body = player.body;
            if (body.position) {
                body.position.x += offsetX;
                body.position.y += offsetY;
                // Keep aliases in sync (Arcade internals can read body.x/y or body.position.x/y).
                body.x = body.position.x;
                body.y = body.position.y;
            } else {
                body.x += offsetX;
                body.y += offsetY;
            }
            if (body.prev) {
                body.prev.x += offsetX;
                body.prev.y += offsetY;
            }

            // Sync sprite to body (default origin is centered).
            player.x = body.center.x;
            player.y = body.center.y;
        }

        // 2) Remove radial velocity so motion stays tangent to the rope.
        const vel = player.body.velocity;
        const radialVel = vel.x * nx + vel.y * ny;
        vel.x -= radialVel * nx;
        vel.y -= radialVel * ny;

        // 3) Apply gravity along tangent only (pendulum acceleration).
        // Gravity vector is (0, g). Tangent is (ny, -nx).
        if (dt > 0) {
            const tangentX = ny;
            const tangentY = -nx;
            const g = this.scene.physics.world.gravity.y;
            const tangentialAccel = g * tangentY; // (0,g)·t
            vel.x += tangentX * tangentialAccel * dt;
            vel.y += tangentY * tangentialAccel * dt;

            // Add a small tangential damping so a no-input swing eventually settles instead of persisting forever.
            // This also reduces "infinite underside bonking" when you can’t clear an obstacle.
            const tangentialDampingPerSec = 0.35;
            const tangentialVel2 = vel.x * tangentX + vel.y * tangentY;
            const dampedTangentialVel2 = tangentialVel2 * Math.exp(-tangentialDampingPerSec * dt);
            vel.x = tangentX * dampedTangentialVel2;
            vel.y = tangentY * dampedTangentialVel2;
        }
    }

    applyPump(moveDir, dt) {
        if (!this.active || !this.anchor) return;
        const player = this.getPlayer?.();
        if (!player || !player.body) return;
        if (moveDir === 0) return;

        const mount = this.getMountWorldPosition();
        const dx = mount.x - this.anchor.x;
        const dy = mount.y - this.anchor.y;
        const dist = Math.hypot(dx, dy);
        if (dist <= 0.0001) return;

        const nx = dx / dist;
        const ny = dy / dist;

        // Pump only when the rope is roughly taut (avoids turning this into air-control when slack).
        if (dist < this.ropeLength * 0.98) return;

        // Tangent direction (perpendicular to rope). This is the "swing pump" direction.
        const tangentX = ny;
        const tangentY = -nx;

        // Pump realism (discrete impulses):
        // - "Pumping" should not behave like a continuous thruster; it should be something you can do
        //   once per half swing, primarily near the bottom of the arc.
        // - This also makes it harder to build amplitude from a dead hang by just holding A/D.
        //
        // We implement this as: if you're near the bottom AND moving through that bottom in a direction,
        // allow a single small tangential velocity impulse, then lock it out until the swing direction flips.
        //
        // `ny` is ~1 near the bottom (player below anchor), ~0 when horizontal, negative above the anchor.
        // Wider bottom window so timing is easier (still fades out away from bottom).
        const bottomness = Phaser.Math.Clamp((ny - 0.4) / 0.6, 0, 1);
        if (bottomness <= 0) return;

        const vel = player.body.velocity;
        const tangentialVel = vel.x * tangentX + vel.y * tangentY;
        const tangentialSpeed = Math.abs(tangentialVel);
        const tangentialSign = Math.sign(tangentialVel);
        if (tangentialSign === 0) return;

        // Input must match current swing direction.
        if (tangentialSign !== moveDir) return;

        // Only one pump per half-swing.
        if (this.lastPumpedHalfSign === tangentialSign) return;

        const pumpImpulse = 32 * bottomness; // px/s tangential impulse
        vel.x += tangentX * pumpImpulse * moveDir;
        vel.y += tangentY * pumpImpulse * moveDir;
        this.lastPumpedHalfSign = tangentialSign;

        const maxSpeed = 320;
        const speed = Math.hypot(vel.x, vel.y);
        if (speed > maxSpeed) {
            vel.x = (vel.x / speed) * maxSpeed;
            vel.y = (vel.y / speed) * maxSpeed;
        }
    }

    draw() {
        if (!this.graphics) return;
        this.graphics.clear();

        if (this.active && this.anchor) {
            const mount = this.getMountWorldPosition();
            this.graphics.lineStyle(1.5, 0x333333, 0.9);
            this.graphics.beginPath();
            this.graphics.moveTo(mount.x, mount.y);
            this.graphics.lineTo(this.anchor.x, this.anchor.y);
            this.graphics.strokePath();

            this.graphics.fillStyle(0x333333, 0.9);
            this.graphics.fillCircle(this.anchor.x, this.anchor.y, 2);
            return;
        }

        // Brief failed-shot line when grapple misses
        const now = this.scene.time.now;
        if (now < this.shotUntil && this.shotStart && this.shotEnd) {
            const t = (this.shotUntil - now) / this.shotFadeMs;
            const alpha = Phaser.Math.Clamp(t, 0, 1);
            this.graphics.lineStyle(2, 0xff7a00, 0.85 * alpha);
            this.graphics.beginPath();
            this.graphics.moveTo(this.shotStart.x, this.shotStart.y);
            this.graphics.lineTo(this.shotEnd.x, this.shotEnd.y);
            this.graphics.strokePath();
        }
    }

    findHit(start, end) {
        const candidates = [];

        const platforms = this.getPlatforms?.();
        const walls = this.getWalls?.();

        for (const obj of platforms?.getChildren?.() ?? []) {
            if (obj.body) candidates.push(obj.body);
        }
        for (const obj of walls?.getChildren?.() ?? []) {
            if (obj.body) candidates.push(obj.body);
        }

        let best = null;
        for (const body of candidates) {
            const rect = new Phaser.Geom.Rectangle(body.x, body.y, body.width, body.height);
            const hit = this.segmentRectIntersection(start.x, start.y, end.x, end.y, rect);
            if (!hit) continue;
            if (!best || hit.t < best.t) best = hit;
        }

        return best ? { x: best.x, y: best.y } : null;
    }

    segmentRectIntersection(x1, y1, x2, y2, rect) {
        const edges = [
            [rect.left, rect.top, rect.right, rect.top],
            [rect.right, rect.top, rect.right, rect.bottom],
            [rect.right, rect.bottom, rect.left, rect.bottom],
            [rect.left, rect.bottom, rect.left, rect.top]
        ];

        let best = null;
        for (const [x3, y3, x4, y4] of edges) {
            const hit = this.segmentIntersection(x1, y1, x2, y2, x3, y3, x4, y4);
            if (!hit) continue;
            if (!best || hit.t < best.t) best = hit;
        }
        return best;
    }

    segmentIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
        const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (Math.abs(denom) < 1e-9) return null;

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
        const u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / denom;

        if (t < 0 || t > 1 || u < 0 || u > 1) return null;

        return {
            x: x1 + t * (x2 - x1),
            y: y1 + t * (y2 - y1),
            t
        };
    }
}
