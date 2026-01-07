# Current Work Focus

Weapon system baseline is in place; shifting focus to improving player movement feel and adding movement abilities.

- **Project Goal:** Build a browser-based stick figure arena shooter with depth in combat, enemies, and procedural levels

- **Intermediate Goal:** Improve player movement (feel + abilities)

- **Current Task:** Grapple pass 2: swing pumping + rope obstruction

## Weapon System Progress

| Step | Task | Status |
|------|------|--------|
| 1 | Create weapon definitions | ✅ Done |
| 2 | Fix diagonal velocity | ✅ Done |
| 3 | Fire rate limiting | ✅ Done |
| 4 | Dynamic crosshair per weapon | ✅ Done |
| 5 | Weapon switching (1-5 keys) | ✅ Done |
| 6 | Weapon display UI | ✅ Done |
| 7 | Unique behaviors (shotgun spread) | ✅ Done |
| 8 | Fire modes (semi/auto) | ✅ Done |
| 9 | Magazines + reloads | ✅ Done |

## Recently Completed

- ✅ ES6 module refactoring
- ✅ WASD movement + arrow keys
- ✅ Crosshair aiming system (J/K rotation)
- ✅ Spacebar shooting
- ✅ WeaponDefinitions.js with 5 weapons
- ✅ Weapon switching + dynamic crosshair
- ✅ Shotgun spread + pellet support
- ✅ Weapon image UI (temporary clip art)
- ✅ Bullet/projectile collision with platforms + walls (bullets disappear on impact)
- ✅ Magazines + reloads (per-weapon mag size + reload time)
- ✅ Jump pack test (I/O keys) + jet flame
- ✅ Grapple prototype + miss tracer + swing pumping starter

## Grapple Pass 2 Plan (Current)

- Preserve momentum when releasing grapple (no immediate X velocity wipe after release)
- Rope obstruction rule: auto-release if rope intersects platforms/walls (keep ceiling grapples but prevent “stuck under platform”)
- Fix swing “stickiness”/jitter (Arcade constraint smoothing + epsilon to reduce micro-resets)
- Tune pump realism (gated pumping near bottom of arc + lower accel/clamps)

## Feature Roadmap (See project-vision-and-goals.md)

After weapons: procedural level generator, player health, enemy health, enemy AI
