# Current Context for New Chat

## Project Status: Layout System Complete, Ready for Refactor

A stick figure arena shooter built with Phaser 3, styled to look like doodles on crumpled notebook paper. Layout system, compound shapes, and visual style all working. Ready for refactoring before adding more features.

## What Works

- **Player movement:** Arrow keys to move left/right, up to jump
- **Shooting:** Click to fire toward mouse cursor
- **Enemies:** Red stick figures, destroyed when shot
- **Level progression:** 6 layouts that cycle with G key
- **Platform shape library:** 15 simple shapes + 3 compound shapes = 18 total
- **Compound shape system:** Multiple collision bodies + custom visual outlines
- **Shape showcase:** Layout 2 displays all 18 shapes for reference
- **Water hazard:** Blue wavy line with crayon fill at y=870
- **Walls:** Hand-drawn with crayon fill, ending at y=795
- **Crayon visual style:** 24% gray fill + diagonal hatching on all shapes
- **Debug controls:** R (restart), G (next layout), F (fly), H (hitboxes)

## Shape Library (18 shapes)

### Simple Shapes (15)
**Flat:** flatLong (120x8), flatMedium (70x8), flatSmall (40x8), flatTiny (25x8)
**L-shapes:** lShapeDownRight (70x35), lShapeDownLeft (70x35)
**Blocks:** blockTall (35x65), blockWide (55x50), blockShort (40x30)
**Special:** tShape (40x25), pillar (18x45), cupShape (30x20), rock (25x16), bumpyWide (100x15), notchedBlock (50x55)

### Compound Shapes (3)
**verticalSlot** (60x60) - Two pillars, drop-through gap
**horizontalTunnel** (70x50) - Two bars, walk-through gap  
**zigZagGap** (60x80) - Two L-shapes, diagonal drop passage

## Layouts (6 total)

1. **Layout 1** - Three-zone pattern (tuned to reference)
2. **Layout 2** - Shape showcase (all 18 shapes displayed)
3-6. **Layouts 3-6** - Original mixed layouts (need updating)

## Layout Design Rules (for generator)

**Three-Zone Structure:**
- LEFT COLUMN (x ~120-160): Stacked flatLong/flatMedium, edge at x=100
- RIGHT COLUMN (x ~540-580): Similar, edge at x=600  
- CENTER (x ~260-440): Scattered small shapes, compound shapes

**Drop Corridors:** ~45px gap between walls and platform edges

## File Structure

```
stick-game-test/
├── index.html
├── js/
│   ├── game.js                   # Phaser config (700x900)
│   ├── platforms/
│   │   └── PlatformShapes.js     # 18 shapes + 6 layouts (~500 lines)
│   └── scenes/
│       └── PlayScene.js          # Main gameplay (~780 lines)
├── assets/
│   └── cropped-notebook-page.png
├── reference/
│   ├── example-map.png
│   └── layout-ref-1.png
└── ai-context-management/
```

## Technical Notes

- Phaser 3.70.0 via CDN
- Canvas: 700x900
- Walls: x=55 (left), x=645 (right), end y=795
- Water: y=870
- Character: 9x17 pixels
- Run: `python3 -m http.server 8000`

## Suggested Refactoring

**PlayScene.js is getting large (~780 lines).** Consider splitting:
- Shape drawing logic → separate module
- Debug controls → separate module
- Wall/water drawing → separate module

**PlatformShapes.js** - Consider:
- Separating shape definitions from layout definitions
- Adding shape metadata (categories, recommended zones)

## Future Goals (Queued)

1. Add more base shapes (5-10 more)
2. Shape variations (flip, scale)
3. Procedural layout generator
4. Dynamic holes/tunnels system (further out)

## This Session Summary

1. Character size reduced to 0.75x
2. Water simplified, wall bottoms raised
3. Layout 1 redesigned with three-zone structure
4. Created compound shape system
5. Added 3 compound shapes
6. Added crayon-like fill to everything
7. Added debug controls (R/G/F/H)
8. Added shape showcase layout
9. Documented extensively
