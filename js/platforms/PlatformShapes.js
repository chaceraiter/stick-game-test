/**
 * PlatformShapes.js - Library of hand-crafted platform shapes
 * 
 * Each shape is defined as an array of {x, y} points that form the outline.
 * Shapes are drawn clockwise starting from top-left.
 * The physics hitbox will be a simplified rectangle based on width/height.
 */

const PLATFORM_SHAPES = {
    
    // === BASIC SHAPES ===
    
    // Simple flat platform (wide)
    basic: {
        points: [
            {x: 0, y: 0}, {x: 80, y: 0}, {x: 80, y: 12}, {x: 0, y: 12}
        ],
        width: 80,
        height: 12
    },
    
    // Smaller flat platform
    basicSmall: {
        points: [
            {x: 0, y: 0}, {x: 55, y: 0}, {x: 55, y: 12}, {x: 0, y: 12}
        ],
        width: 55,
        height: 12
    },
    
    // Tiny platform (for tricky jumps)
    tiny: {
        points: [
            {x: 0, y: 0}, {x: 30, y: 0}, {x: 30, y: 10}, {x: 0, y: 10}
        ],
        width: 30,
        height: 10
    },
    
    // === IRREGULAR SHAPES (like the example-map) ===
    
    // L-shape facing right
    lShapeRight: {
        points: [
            {x: 0, y: 0}, {x: 40, y: 0}, {x: 40, y: 25},
            {x: 70, y: 25}, {x: 70, y: 37}, {x: 0, y: 37}
        ],
        width: 70,
        height: 37
    },
    
    // L-shape facing left
    lShapeLeft: {
        points: [
            {x: 30, y: 0}, {x: 70, y: 0}, {x: 70, y: 37},
            {x: 0, y: 37}, {x: 0, y: 25}, {x: 30, y: 25}
        ],
        width: 70,
        height: 37
    },
    
    // Step up (left to right)
    stepUp: {
        points: [
            {x: 0, y: 20}, {x: 35, y: 20}, {x: 35, y: 0},
            {x: 75, y: 0}, {x: 75, y: 12}, {x: 45, y: 12},
            {x: 45, y: 32}, {x: 0, y: 32}
        ],
        width: 75,
        height: 32
    },
    
    // Step down (left to right)
    stepDown: {
        points: [
            {x: 0, y: 0}, {x: 40, y: 0}, {x: 40, y: 20},
            {x: 75, y: 20}, {x: 75, y: 32}, {x: 0, y: 32}
        ],
        width: 75,
        height: 32
    },
    
    // Bump/hill shape
    bump: {
        points: [
            {x: 0, y: 15}, {x: 20, y: 5}, {x: 40, y: 0},
            {x: 60, y: 5}, {x: 80, y: 15}, {x: 80, y: 22},
            {x: 0, y: 22}
        ],
        width: 80,
        height: 22
    },
    
    // Notched platform (gap in middle)
    notched: {
        points: [
            {x: 0, y: 0}, {x: 30, y: 0}, {x: 30, y: 8},
            {x: 50, y: 8}, {x: 50, y: 0}, {x: 80, y: 0},
            {x: 80, y: 12}, {x: 0, y: 12}
        ],
        width: 80,
        height: 12
    },
    
    // Thick block
    block: {
        points: [
            {x: 0, y: 0}, {x: 45, y: 0}, {x: 45, y: 30}, {x: 0, y: 30}
        ],
        width: 45,
        height: 30
    },
    
    // Tall thin pillar
    pillar: {
        points: [
            {x: 0, y: 0}, {x: 20, y: 0}, {x: 20, y: 50}, {x: 0, y: 50}
        ],
        width: 20,
        height: 50
    },
    
    // Slanted top (ramp-ish, but flat for physics)
    slant: {
        points: [
            {x: 0, y: 15}, {x: 70, y: 0}, {x: 70, y: 12}, {x: 0, y: 27}
        ],
        width: 70,
        height: 27
    }
};


/**
 * Predefined level layouts - arrays of platform placements
 * Each placement has: shape name, x position, y position
 */
const LEVEL_LAYOUTS = [
    // Layout 1: Basic scattered platforms
    {
        name: "scattered",
        platforms: [
            { shape: 'basic', x: 100, y: 620 },
            { shape: 'basic', x: 275, y: 620 },
            { shape: 'basic', x: 450, y: 620 },
            { shape: 'basicSmall', x: 180, y: 550 },
            { shape: 'basicSmall', x: 400, y: 550 },
            { shape: 'basic', x: 280, y: 480 },
            { shape: 'basicSmall', x: 80, y: 480 },
            { shape: 'basicSmall', x: 470, y: 480 },
            { shape: 'basicSmall', x: 170, y: 410 },
            { shape: 'basic', x: 380, y: 410 },
            { shape: 'basic', x: 100, y: 340 },
            { shape: 'basicSmall', x: 300, y: 340 },
            { shape: 'basicSmall', x: 470, y: 340 },
            { shape: 'basicSmall', x: 200, y: 270 },
            { shape: 'basicSmall', x: 380, y: 270 }
        ]
    },
    
    // Layout 2: L-shapes and steps
    {
        name: "angular",
        platforms: [
            { shape: 'basic', x: 100, y: 620 },
            { shape: 'lShapeRight', x: 280, y: 600 },
            { shape: 'basic', x: 450, y: 620 },
            { shape: 'stepUp', x: 120, y: 530 },
            { shape: 'lShapeLeft', x: 380, y: 520 },
            { shape: 'basicSmall', x: 250, y: 450 },
            { shape: 'stepDown', x: 400, y: 420 },
            { shape: 'lShapeRight', x: 80, y: 380 },
            { shape: 'basic', x: 280, y: 350 },
            { shape: 'basicSmall', x: 470, y: 340 },
            { shape: 'basicSmall', x: 180, y: 280 },
            { shape: 'basicSmall', x: 380, y: 280 }
        ]
    },
    
    // Layout 3: Pillar heavy
    {
        name: "pillars",
        platforms: [
            { shape: 'basic', x: 80, y: 620 },
            { shape: 'basic', x: 275, y: 620 },
            { shape: 'basic', x: 470, y: 620 },
            { shape: 'pillar', x: 150, y: 570 },
            { shape: 'pillar', x: 400, y: 570 },
            { shape: 'basic', x: 200, y: 500 },
            { shape: 'basicSmall', x: 350, y: 480 },
            { shape: 'block', x: 100, y: 430 },
            { shape: 'pillar', x: 280, y: 420 },
            { shape: 'basicSmall', x: 420, y: 400 },
            { shape: 'basic', x: 180, y: 330 },
            { shape: 'basic', x: 380, y: 320 },
            { shape: 'basicSmall', x: 280, y: 260 }
        ]
    },
    
    // Layout 4: Mixed chaos
    {
        name: "chaos",
        platforms: [
            { shape: 'lShapeLeft', x: 60, y: 600 },
            { shape: 'bump', x: 250, y: 610 },
            { shape: 'stepUp', x: 420, y: 600 },
            { shape: 'notched', x: 150, y: 520 },
            { shape: 'block', x: 380, y: 510 },
            { shape: 'basicSmall', x: 80, y: 450 },
            { shape: 'lShapeRight', x: 230, y: 440 },
            { shape: 'tiny', x: 420, y: 430 },
            { shape: 'tiny', x: 470, y: 400 },
            { shape: 'stepDown', x: 100, y: 360 },
            { shape: 'basicSmall', x: 320, y: 340 },
            { shape: 'bump', x: 430, y: 330 },
            { shape: 'basic', x: 200, y: 270 },
            { shape: 'tiny', x: 380, y: 260 }
        ]
    }
];

