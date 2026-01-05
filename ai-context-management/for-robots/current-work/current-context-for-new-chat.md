# Current Context for New Chat

## Project Status: Playable Prototype with Notebook Paper Aesthetic ✓

A stick figure arena shooter built with Phaser 3, styled to look like doodles on crumpled notebook paper.

## What Works

- **Player movement:** Arrow keys to move left/right, up to jump
- **Shooting:** Click to fire toward mouse cursor
- **Enemies:** Red stick figures placed on platforms, destroyed when shot
- **Level progression:** Complete a level by shooting all enemies, click to continue
- **Level layouts:** 4 predefined layouts that cycle (scattered, angular, pillars, chaos)
- **Platform shape library:** 11 different shapes (basic, L-shapes, steps, blocks, etc.)
- **Water hazard:** Blue wavy water at bottom kills player, respawns at start
- **Notebook paper background:** Actual crumpled paper image (cropped to edges)
- **Hand-drawn aesthetic:** Stick figures, sketchy platform outlines, pen-stroke bullets

## File Structure

```
stick-game-test/
├── index.html                    # Entry point, loads Phaser from CDN
├── js/
│   ├── game.js                   # Phaser config (550x700 canvas)
│   ├── platforms/
│   │   └── PlatformShapes.js     # Shape library + level layouts
│   └── scenes/
│       └── PlayScene.js          # Main gameplay
├── assets/
│   ├── notebook-page-crumpled.jpg    # Original reference
│   └── notebook-paper-cropped.jpg    # Cropped version used in game
├── reference/
│   ├── notebook-page-crumpled.jpg    # Reference image
│   └── example-map.png               # Level design reference
├── ai-context-management/            # AI context system
└── README.md
```

## Technical Notes

- Phaser 3.70.0 via CDN
- Canvas: 550x700 (notebook paper proportions)
- Arcade Physics with gravity (800)
- Debug mode ON (green collision boxes visible)
- Run with `python3 -m http.server 8000`

## What Doesn't Exist Yet

- Grappling gun
- Multiple weapons
- Destructible terrain
- Enemy AI (enemies are static)
- Lives/game over system
- Sound effects
- Actual animations (stick figures are static)

## Recent Changes

1. Initial prototype with movement, shooting, enemies, levels
2. Added water hazard, replaced ground with platforms
3. Resized to notebook paper proportions (550x700)
4. Added hand-drawn aesthetic (sketchy platforms, stick figures)
5. Created platform shape library with 11 shapes
6. Added 4 predefined level layouts
7. Added actual crumpled notebook paper background image (cropped)

## Known Issues

- Some white border may still show at paper edges (minor)
- Platforms may need position tweaking for some layouts
