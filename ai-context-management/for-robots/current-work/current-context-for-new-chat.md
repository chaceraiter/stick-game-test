# Current Context for New Chat

## Project Status: Playable Prototype with Notebook Paper Aesthetic ✓

A stick figure arena shooter built with Phaser 3, styled to look like doodles on crumpled notebook paper.

## What Works

- **Player movement:** Arrow keys to move left/right, up to jump
- **Shooting:** Click to fire toward mouse cursor
- **Enemies:** Red stick figures placed on platforms, destroyed when shot
- **Level progression:** Complete a level by shooting all enemies, click to continue
- **Level layouts:** 5 mixed layouts that cycle, all using variety of shapes
- **Platform shape library:** 15 different shapes (flat platforms, L-shapes, blocks, pillars, special shapes)
- **Water hazard:** Wavy blue water at bottom kills player, respawns at start
- **Walls:** Hand-drawn irregular walls on left and right sides
- **Notebook paper background:** Actual crumpled paper image (user-cropped)
- **Hand-drawn aesthetic:** Stick figures, sketchy platform outlines, pen-stroke bullets

## File Structure

```
stick-game-test/
├── index.html                    # Entry point, loads Phaser from CDN
├── js/
│   ├── game.js                   # Phaser config (700x900 canvas)
│   ├── platforms/
│   │   └── PlatformShapes.js     # 15 shapes + 5 level layouts
│   └── scenes/
│       └── PlayScene.js          # Main gameplay
├── assets/
│   ├── notebook-page-crumpled.jpg
│   ├── notebook-paper-cropped.jpg
│   └── cropped-notebook-page.png  # User-cropped, currently used
├── reference/
│   ├── notebook-page-crumpled.jpg
│   ├── cropped-notebook-page.png
│   ├── example-map.png
│   └── example-map-2.png          # With stick figure for scale
├── ai-context-management/
└── README.md
```

## Technical Notes

- Phaser 3.70.0 via CDN
- Canvas: 700x900 (scaled up notebook proportions)
- Arcade Physics with gravity (800)
- Debug mode ON (green collision boxes visible)
- Walls at x=55 (left) and x=645 (right)
- Water at y=845
- Run with `python3 -m http.server 8000`

## Wishlist (Not Yet Implemented)

1. Reduce character size to half
2. Reduce water height to half
3. Simplify water to just one line for surface
4. Raise wall bottom edges (like in example-map)
5. Tweak platform shapes/sizes/layouts/locations

## What Doesn't Exist Yet

- Grappling gun
- Multiple weapons
- Destructible terrain
- Enemy AI (enemies are static)
- Lives/game over system
- Sound effects

## Recent Changes

1. Initial prototype with movement, shooting, enemies, levels
2. Added water hazard, replaced ground with platforms
3. Notebook paper proportions and hand-drawn aesthetic
4. Created platform shape library (15 shapes) based on user reference
5. Added walls on left and right sides
6. Scaled up canvas from 550x700 to 700x900
7. Added platforms to fill full vertical space

## Known Issues

- Respawn bug fixed (was spawning twice)
- All working as expected
