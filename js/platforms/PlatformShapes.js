/**
 * PlatformShapes.js - Library of hand-crafted platform shapes
 * 
 * Scaled based on reference image with stick figure:
 * - Stick figure is ~12x22 pixels
 * - Flat platforms are thin (~8-10px tall)
 * - Long platforms are ~100-120px wide
 * - Tall blocks are ~50-80px tall
 */

const PLATFORM_SHAPES = {
    
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
    }
};


/**
 * Predefined level layouts - all mixed variety of shapes
 * Canvas is 700x900, water at y=845, walls at x=55 and x=645
 * Playable area roughly x: 75-625, y: 100-800
 */
const LEVEL_LAYOUTS = [
    // Layout 1
    {
        name: "mix1",
        platforms: [
            // Bottom (y: 780-810)
            { shape: 'flatLong', x: 130, y: 800 },
            { shape: 'blockShort', x: 360, y: 780 },
            { shape: 'flatMedium', x: 540, y: 800 },
            // Lower-mid (y: 680-720)
            { shape: 'lShapeDownRight', x: 150, y: 710 },
            { shape: 'flatSmall', x: 380, y: 685 },
            { shape: 'blockWide', x: 550, y: 700 },
            // Mid (y: 570-610)
            { shape: 'flatMedium', x: 130, y: 595 },
            { shape: 'tShape', x: 330, y: 580 },
            { shape: 'flatLong', x: 490, y: 605 },
            // Upper-mid (y: 460-500)
            { shape: 'pillar', x: 190, y: 490 },
            { shape: 'flatMedium', x: 360, y: 490 },
            { shape: 'lShapeDownLeft', x: 540, y: 500 },
            // Upper (y: 360-400)
            { shape: 'flatSmall', x: 130, y: 390 },
            { shape: 'blockShort', x: 320, y: 380 },
            { shape: 'flatMedium', x: 510, y: 400 },
            // Top (y: 250-300)
            { shape: 'flatMedium', x: 190, y: 285 },
            { shape: 'flatSmall', x: 410, y: 260 },
            { shape: 'flatSmall', x: 580, y: 295 },
            // Very top (y: 130-180)
            { shape: 'flatSmall', x: 130, y: 170 },
            { shape: 'flatLong', x: 360, y: 155 },
            { shape: 'flatTiny', x: 590, y: 180 }
        ]
    },
    
    // Layout 2
    {
        name: "mix2",
        platforms: [
            // Bottom
            { shape: 'flatMedium', x: 100, y: 800 },
            { shape: 'rock', x: 280, y: 785 },
            { shape: 'flatLong', x: 490, y: 800 },
            // Lower-mid
            { shape: 'blockTall', x: 130, y: 700 },
            { shape: 'bumpyWide', x: 320, y: 710 },
            { shape: 'flatSmall', x: 550, y: 695 },
            // Mid
            { shape: 'flatSmall', x: 130, y: 595 },
            { shape: 'cupShape', x: 255, y: 585 },
            { shape: 'flatMedium', x: 410, y: 605 },
            { shape: 'blockShort', x: 580, y: 585 },
            // Upper-mid
            { shape: 'lShapeDownRight', x: 130, y: 490 },
            { shape: 'flatLong', x: 360, y: 475 },
            { shape: 'flatTiny', x: 590, y: 465 },
            // Upper
            { shape: 'flatMedium', x: 190, y: 375 },
            { shape: 'pillar', x: 410, y: 385 },
            { shape: 'flatSmall', x: 550, y: 360 },
            // Top
            { shape: 'flatSmall', x: 130, y: 260 },
            { shape: 'flatMedium', x: 330, y: 270 },
            { shape: 'lShapeDownLeft', x: 540, y: 260 },
            // Very top
            { shape: 'flatLong', x: 230, y: 155 },
            { shape: 'flatSmall', x: 540, y: 140 }
        ]
    },
    
    // Layout 3
    {
        name: "mix3",
        platforms: [
            // Bottom
            { shape: 'flatLong', x: 150, y: 800 },
            { shape: 'lShapeDownLeft', x: 410, y: 775 },
            { shape: 'flatMedium', x: 590, y: 800 },
            // Lower-mid
            { shape: 'flatMedium', x: 130, y: 695 },
            { shape: 'notchedBlock', x: 360, y: 700 },
            { shape: 'pillar', x: 565, y: 715 },
            // Mid
            { shape: 'blockWide', x: 130, y: 595 },
            { shape: 'flatSmall', x: 320, y: 580 },
            { shape: 'flatLong', x: 490, y: 600 },
            // Upper-mid
            { shape: 'flatTiny', x: 130, y: 490 },
            { shape: 'blockShort', x: 280, y: 495 },
            { shape: 'lShapeDownRight', x: 460, y: 490 },
            // Upper
            { shape: 'flatMedium', x: 165, y: 385 },
            { shape: 'flatSmall', x: 380, y: 375 },
            { shape: 'flatMedium', x: 540, y: 390 },
            // Top
            { shape: 'flatSmall', x: 130, y: 270 },
            { shape: 'tShape', x: 305, y: 260 },
            { shape: 'flatMedium', x: 490, y: 285 },
            // Very top
            { shape: 'flatMedium', x: 255, y: 155 },
            { shape: 'flatTiny', x: 510, y: 170 }
        ]
    },
    
    // Layout 4
    {
        name: "mix4",
        platforms: [
            // Bottom
            { shape: 'blockShort', x: 100, y: 780 },
            { shape: 'flatLong', x: 295, y: 800 },
            { shape: 'lShapeDownRight', x: 540, y: 775 },
            // Lower-mid
            { shape: 'flatMedium', x: 130, y: 685 },
            { shape: 'tShape', x: 320, y: 680 },
            { shape: 'flatMedium', x: 510, y: 695 },
            // Mid
            { shape: 'lShapeDownLeft', x: 130, y: 580 },
            { shape: 'rock', x: 330, y: 570 },
            { shape: 'bumpyWide', x: 475, y: 585 },
            // Upper-mid
            { shape: 'flatSmall', x: 130, y: 475 },
            { shape: 'blockTall', x: 305, y: 490 },
            { shape: 'flatMedium', x: 490, y: 475 },
            // Upper
            { shape: 'flatSmall', x: 150, y: 375 },
            { shape: 'cupShape', x: 360, y: 360 },
            { shape: 'flatSmall', x: 540, y: 375 },
            // Top
            { shape: 'flatMedium', x: 205, y: 270 },
            { shape: 'flatSmall', x: 435, y: 260 },
            { shape: 'pillar', x: 590, y: 270 },
            // Very top
            { shape: 'flatSmall', x: 130, y: 155 },
            { shape: 'flatLong', x: 330, y: 170 }
        ]
    },
    
    // Layout 5
    {
        name: "mix5",
        platforms: [
            // Bottom
            { shape: 'flatMedium', x: 130, y: 800 },
            { shape: 'pillar', x: 320, y: 770 },
            { shape: 'flatMedium', x: 450, y: 800 },
            { shape: 'flatSmall', x: 600, y: 785 },
            // Lower-mid
            { shape: 'blockWide', x: 130, y: 700 },
            { shape: 'flatLong', x: 360, y: 695 },
            { shape: 'flatTiny', x: 590, y: 685 },
            // Mid
            { shape: 'flatSmall', x: 130, y: 595 },
            { shape: 'lShapeDownRight', x: 280, y: 595 },
            { shape: 'blockShort', x: 540, y: 585 },
            // Upper-mid
            { shape: 'flatMedium', x: 130, y: 490 },
            { shape: 'flatSmall', x: 360, y: 475 },
            { shape: 'notchedBlock', x: 510, y: 495 },
            // Upper
            { shape: 'lShapeDownLeft', x: 150, y: 385 },
            { shape: 'flatMedium', x: 360, y: 375 },
            { shape: 'flatSmall', x: 565, y: 390 },
            // Top
            { shape: 'flatSmall', x: 130, y: 270 },
            { shape: 'blockShort', x: 320, y: 265 },
            { shape: 'flatMedium', x: 510, y: 285 },
            // Very top
            { shape: 'flatLong', x: 230, y: 170 },
            { shape: 'flatTiny', x: 540, y: 155 }
        ]
    }
];
