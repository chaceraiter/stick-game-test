/**
 * ShapeDefinitions.js - Library of hand-crafted platform shapes
 * 
 * SHAPE TYPES:
 * 
 * 1. SIMPLE SHAPES (15 total)
 *    - Defined with `points` array (polygon outline)
 *    - Single collision body matching the shape
 *    - Examples: flatLong, blockTall, lShapeDownRight
 * 
 * 2. COMPOUND SHAPES (3 total)
 *    - Defined with `parts` array (multiple collision rectangles)
 *    - Optional `outlines` array for connected visual appearance
 *    - Have passable gaps/tunnels between collision parts
 *    - Examples: verticalSlot, horizontalTunnel, zigZagGap
 * 
 * SCALING (based on reference with stick figure):
 * - Stick figure: 9x17 pixels (0.75x original)
 * - Flat platforms: ~8px tall
 * - Long platforms: ~100-120px wide
 * - Tall blocks: ~50-80px tall
 * 
 * FUTURE GOALS:
 * - Add more base shapes (5-10 more)
 * - Shape variations: horizontal flip, scaling
 * - Dynamic hole/tunnel system: apply caves/passages to any solid shape
 */

export const PLATFORM_SHAPES = {
    
    // === FLAT PLATFORMS (thin, like lines on paper) ===
    
    // Long flat platform (~8-10x character width)
    flatLong: {
        points: [
            {x: 0, y: 0}, {x: 120, y: 0}, {x: 120, y: 8}, {x: 0, y: 8}
        ],
        width: 120,
        height: 8
    },
    
    // Medium flat platform (~5-6x character width)
    flatMedium: {
        points: [
            {x: 0, y: 0}, {x: 70, y: 0}, {x: 70, y: 8}, {x: 0, y: 8}
        ],
        width: 70,
        height: 8
    },
    
    // Small flat platform (~3x character width)
    flatSmall: {
        points: [
            {x: 0, y: 0}, {x: 40, y: 0}, {x: 40, y: 8}, {x: 0, y: 8}
        ],
        width: 40,
        height: 8
    },
    
    // Tiny platform (just wider than character)
    flatTiny: {
        points: [
            {x: 0, y: 0}, {x: 25, y: 0}, {x: 25, y: 8}, {x: 0, y: 8}
        ],
        width: 25,
        height: 8
    },
    
    // === L-SHAPES / STAIRS ===
    
    // L-shape stepping down-right (like in reference)
    lShapeDownRight: {
        points: [
            {x: 0, y: 0}, {x: 35, y: 0}, {x: 35, y: 25},
            {x: 70, y: 25}, {x: 70, y: 35}, {x: 0, y: 35}
        ],
        width: 70,
        height: 35
    },
    
    // L-shape stepping down-left
    lShapeDownLeft: {
        points: [
            {x: 35, y: 0}, {x: 70, y: 0}, {x: 70, y: 35},
            {x: 0, y: 35}, {x: 0, y: 25}, {x: 35, y: 25}
        ],
        width: 70,
        height: 35
    },
    
    // === TALL BLOCKS (like in reference right side) ===
    
    // Tall block (~3x character height)
    blockTall: {
        points: [
            {x: 0, y: 0}, {x: 35, y: 0}, {x: 35, y: 65}, {x: 0, y: 65}
        ],
        width: 35,
        height: 65
    },
    
    // Wide tall block (like the chunky ones in reference)
    blockWide: {
        points: [
            {x: 0, y: 0}, {x: 55, y: 0}, {x: 55, y: 50}, {x: 0, y: 50}
        ],
        width: 55,
        height: 50
    },
    
    // Short thick block
    blockShort: {
        points: [
            {x: 0, y: 0}, {x: 40, y: 0}, {x: 40, y: 30}, {x: 0, y: 30}
        ],
        width: 40,
        height: 30
    },
    
    // === T-SHAPES / SMALL PIECES ===
    
    // T-shape (like the small cross piece in reference)
    tShape: {
        points: [
            {x: 10, y: 0}, {x: 30, y: 0}, {x: 30, y: 15},
            {x: 40, y: 15}, {x: 40, y: 25}, {x: 0, y: 25},
            {x: 0, y: 15}, {x: 10, y: 15}
        ],
        width: 40,
        height: 25
    },
    
    // Small pillar (vertical piece)
    pillar: {
        points: [
            {x: 0, y: 0}, {x: 18, y: 0}, {x: 18, y: 45}, {x: 0, y: 45}
        ],
        width: 18,
        height: 45
    },
    
    // === SPECIAL SHAPES ===
    
    // Cup/D-shape (like the semicircle at top of reference)
    cupShape: {
        points: [
            {x: 5, y: 0}, {x: 25, y: 0}, {x: 30, y: 8},
            {x: 30, y: 20}, {x: 0, y: 20}, {x: 0, y: 8}
        ],
        width: 30,
        height: 20
    },
    
    // Small oval/rock (like bottom center of reference)
    rock: {
        points: [
            {x: 5, y: 0}, {x: 20, y: 0}, {x: 25, y: 8},
            {x: 20, y: 16}, {x: 5, y: 16}, {x: 0, y: 8}
        ],
        width: 25,
        height: 16
    },
    
    // Wide platform with bumpy top (like the wavy one in reference)
    bumpyWide: {
        points: [
            {x: 0, y: 5}, {x: 20, y: 0}, {x: 50, y: 3}, {x: 80, y: 0}, {x: 100, y: 5},
            {x: 100, y: 15}, {x: 0, y: 15}
        ],
        width: 100,
        height: 15
    },
    
    // Notched block (block with bite taken out)
    notchedBlock: {
        points: [
            {x: 0, y: 0}, {x: 50, y: 0}, {x: 50, y: 20},
            {x: 35, y: 20}, {x: 35, y: 35}, {x: 50, y: 35},
            {x: 50, y: 55}, {x: 0, y: 55}
        ],
        width: 50,
        height: 55
    },
    
    // === COMPOUND SHAPES (multiple collision bodies with gaps) ===
    // These have a 'parts' array - both visual AND collision are drawn from parts
    // Each part is a rectangle: { x, y, w, h } relative to shape origin
    
    // Shape #1: Vertical slot - two pillars with drop-through gap
    // ██  ██
    // ██  ██
    // ██  ██
    verticalSlot: {
        width: 60,
        height: 60,
        parts: [
            { x: 0, y: 0, w: 20, h: 60 },     // left pillar
            { x: 40, y: 0, w: 20, h: 60 }     // right pillar (20px gap between)
        ]
    },
    
    // Shape #2: Horizontal tunnel - two bars stacked with walk-through gap
    // ██████████
    //           (gap - walk through here)
    // ██████████
    horizontalTunnel: {
        width: 70,
        height: 50,
        parts: [
            { x: 0, y: 0, w: 70, h: 15 },     // top bar
            { x: 0, y: 35, w: 70, h: 15 }     // bottom bar
        ],
        // Two separate horizontal bars
        outlines: [
            // Top bar
            [
                {x: 0, y: 0}, {x: 70, y: 0}, {x: 70, y: 15}, {x: 0, y: 15}
            ],
            // Bottom bar
            [
                {x: 0, y: 35}, {x: 70, y: 35}, {x: 70, y: 50}, {x: 0, y: 50}
            ]
        ]
    },
    
    // Shape #3: Zig-zag gap - diagonal drop-through (two L-shapes)
    // ████████
    // ██
    // ██
    //       ██
    //       ██
    // ████████
    zigZagGap: {
        width: 60,
        height: 80,
        parts: [
            { x: 0, y: 0, w: 60, h: 15 },     // top bar
            { x: 0, y: 15, w: 15, h: 30 },    // left stem
            { x: 45, y: 35, w: 15, h: 30 },   // right stem
            { x: 0, y: 65, w: 60, h: 15 }     // bottom bar
        ],
        // Custom outlines: two L-shapes drawn separately
        outlines: [
            // Top L-shape (top bar + left stem)
            [
                {x: 0, y: 0}, {x: 60, y: 0}, {x: 60, y: 15}, {x: 15, y: 15},
                {x: 15, y: 45}, {x: 0, y: 45}
            ],
            // Bottom inverted-L (right stem + bottom bar)
            [
                {x: 45, y: 35}, {x: 60, y: 35}, {x: 60, y: 80}, {x: 0, y: 80},
                {x: 0, y: 65}, {x: 45, y: 65}
            ]
        ]
    }
};

