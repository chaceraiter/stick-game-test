# Current Context for New Chat

## Project Status: Weapon System In Progress

A stick figure arena shooter built with Phaser 3, styled to look like doodles on crumpled notebook paper. Recently added keyboard aiming system. Now building out a multi-weapon system.

## What Works

- **Player movement:** WASD or arrow keys to move, W/Up to jump
- **Aiming:** Crosshair orbits player at fixed distance, J/K to rotate aim
- **Shooting:** Spacebar or click fires toward crosshair
- **Weapon switching:** 1–5 keys switch weapons
- **Weapon UI:** text label + image at top of screen (temporary clip art)
- **Shotgun spread:** multi-pellet with randomized angle derived from crosshair gap + distance
- **Enemies:** Red stick figures, destroyed when shot
- **Level progression:** 6 layouts that cycle; complete level by killing all enemies
- **Platform shape library:** 15 simple shapes + 3 compound shapes = 18 total
- **Compound shape system:** Multiple collision bodies + custom visual outlines
- **Water hazard:** Blue wavy line at y=870
- **Walls:** Hand-drawn with crayon fill
- **Debug controls:** R (restart), G (next layout), F (fly), H (hitboxes)

## In Progress: Weapon System

**Completed steps:**
1. ✅ Created `js/weapons/WeaponDefinitions.js` with 5 weapons defined
2. ✅ Fix diagonal velocity normalization
3. ✅ Dynamic crosshair (distance/gap changes per weapon)
4. ✅ Weapon switching with number keys (1-5)
5. ✅ Weapon display UI at top of screen
6. ✅ Unique weapon behaviors (shotgun spread, pellets)

**Remaining steps:**
7. Implement fire rate limiting per weapon

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
│   │   └── PlayScene.js            # Main gameplay (~570 lines)
│   ├── platforms/
│   │   ├── PlatformShapes.js       # Re-export hub
│   │   ├── ShapeDefinitions.js     # 18 shapes
│   │   └── LayoutDefinitions.js    # 6 layouts
│   ├── drawing/
│   │   ├── ShapeRenderer.js        # Platform textures
│   │   └── EnvironmentRenderer.js  # Walls & water
│   ├── utils/
│   │   └── DebugControls.js        # R/G/F/H keys
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
- Run: `python3 -m http.server 8000`

## Controls

| Action | Keys |
|--------|------|
| Move | WASD or Arrows |
| Jump | W or Up |
| Aim | J (CCW), K (CW) |
| Shoot | Space or Click |
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

## Next Steps

Implement fire rate limiting per weapon.

## Wishlist / Planning Notes

- Consider limiting weapon art/style to cowboy-type guns only (revisit weapon art choices).
