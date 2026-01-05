/**
 * LayoutDefinitions.js - Level layout configurations
 * 
 * Each layout defines platform positions for a level.
 * Layouts reference shapes from ShapeDefinitions.js by name.
 * 
 * ============================================================================
 * LEVEL LAYOUT DESIGN RULES (for generator reference)
 * ============================================================================
 * 
 * CANVAS & BOUNDARIES:
 * - Canvas: 700x900 pixels
 * - Walls: left at x=55, right at x=645
 * - Water line: y=870
 * - Wall bottoms: y=795 (with horizontal line to page edge)
 * - Playable vertical range: y=120 to y=780
 * 
 * THREE-ZONE STRUCTURE:
 * The map is divided into three vertical zones (like the reference image):
 * 
 * 1. LEFT COLUMN (x ~120-145)
 *    - Stacked horizontal platforms forming "tiers"
 *    - Mostly flatLong shapes, some flatMedium
 *    - ~8-9 tiers, spacing ~70-85px between tiers (NOT uniform)
 *    - X position varies slightly per tier (±15px wobble)
 *    - Creates a climbable ladder-like structure on left side
 *    - First platform (bottom-left) is player spawn point
 * 
 * 2. RIGHT COLUMN (x ~555-580)
 *    - Mirror concept of left column, but NOT symmetrical
 *    - Same shapes: mostly flatLong, some flatMedium
 *    - ~7-8 tiers (can differ from left count)
 *    - Y positions OFFSET from left column (don't align horizontally)
 *    - X position varies slightly per tier
 * 
 * 3. CENTER ZONE (x ~260-440)
 *    - Open area with scattered SMALL shapes
 *    - Shape types: rock, flatSmall, flatTiny, tShape, pillar, cupShape
 *    - NO large platforms in center
 *    - ~8-10 pieces at varied heights
 *    - Y positions don't align with side tiers
 *    - More sparse/random feel vs the structured sides
 * 
 * DROP CORRIDORS:
 * - ~40px gap between wall and nearest platform edge
 * - Allows player to drop straight down along walls
 * - Left corridor: x=55 to x~100 (clear)
 * - Right corridor: x~600 to x=645 (clear)
 * 
 * VISUAL RHYTHM:
 * - Sides: Dense, stacked, structured (like ladder rungs)
 * - Center: Sparse, scattered, organic
 * - Creates two "halves" with open middle battlefield
 * 
 * ASYMMETRY PRINCIPLES:
 * - Left and right have different tier counts
 * - Left and right y-positions don't align
 * - Different shapes on each side within same tier
 * - Center pieces positioned organically, not on grid
 * 
 * ============================================================================
 */

export const LEVEL_LAYOUTS = [
    // Layout 1 - Two-column pattern with open center (varied y positions)
    {
        name: "mix1",
        platforms: [
            // === LEFT COLUMN (left edge at x=100, ~45px gap from wall) ===
            // flatLong(120w)->center@160, flatMedium(70w)->center@135, flatSmall(40w)->center@120
            { shape: 'flatLong', x: 160, y: 780 },    // Tier 1 (spawn)
            { shape: 'flatLong', x: 160, y: 695 },    // Tier 2
            { shape: 'flatLong', x: 160, y: 620 },    // Tier 3
            { shape: 'flatMedium', x: 135, y: 555 },  // Tier 4
            { shape: 'flatLong', x: 160, y: 475 },    // Tier 5
            { shape: 'flatLong', x: 160, y: 400 },    // Tier 6
            { shape: 'flatMedium', x: 135, y: 315 },  // Tier 7
            { shape: 'flatLong', x: 160, y: 240 },    // Tier 8
            { shape: 'flatSmall', x: 120, y: 160 },   // Tier 9 (top)
            
            // === RIGHT COLUMN (right edge at x=600, ~45px gap from wall) ===
            // Using compound shapes with real gaps!
            // zigZagGap(90w)->center@555, verticalSlot(70w)->center@565, horizontalTunnel(70w)->center@565
            { shape: 'flatLong', x: 540, y: 765 },          // Tier 1
            { shape: 'zigZagGap', x: 555, y: 670 },         // Tier 2 - zig-zag with drop gap!
            { shape: 'flatMedium', x: 565, y: 550 },        // Tier 3
            { shape: 'horizontalTunnel', x: 565, y: 460 },  // Tier 4 - walk-through tunnel!
            { shape: 'flatLong', x: 540, y: 370 },          // Tier 5
            { shape: 'verticalSlot', x: 565, y: 280 },      // Tier 6 - vertical drop slot!
            { shape: 'flatSmall', x: 580, y: 180 },         // Tier 7 (top)
            
            // === CENTER (spread wider, varied y) ===
            { shape: 'rock', x: 280, y: 730 },
            { shape: 'flatSmall', x: 420, y: 650 },
            { shape: 'tShape', x: 300, y: 570 },
            { shape: 'flatTiny', x: 400, y: 500 },
            { shape: 'flatSmall', x: 260, y: 420 },
            { shape: 'pillar', x: 440, y: 350 },
            { shape: 'cupShape', x: 320, y: 270 },
            { shape: 'flatTiny', x: 380, y: 190 },
            { shape: 'rock', x: 350, y: 120 }
        ]
    },
    
    // Layout 2 - SHAPE SHOWCASE (displays all 18 shapes)
    {
        name: "showcase",
        platforms: [
            // Row 1 (y=780): Flat platforms - spawn on first one
            { shape: 'flatLong', x: 150, y: 780 },
            { shape: 'flatMedium', x: 300, y: 780 },
            { shape: 'flatSmall', x: 420, y: 780 },
            { shape: 'flatTiny', x: 520, y: 780 },
            
            // Row 2 (y=680): L-shapes and blocks
            { shape: 'lShapeDownRight', x: 140, y: 680 },
            { shape: 'lShapeDownLeft', x: 280, y: 680 },
            { shape: 'blockTall', x: 400, y: 680 },
            { shape: 'blockWide', x: 500, y: 680 },
            
            // Row 3 (y=570): More blocks and special shapes
            { shape: 'blockShort', x: 140, y: 570 },
            { shape: 'tShape', x: 250, y: 570 },
            { shape: 'pillar', x: 350, y: 570 },
            { shape: 'cupShape', x: 440, y: 570 },
            { shape: 'rock', x: 530, y: 570 },
            
            // Row 4 (y=450): Remaining simple shapes
            { shape: 'bumpyWide', x: 200, y: 450 },
            { shape: 'notchedBlock', x: 400, y: 450 },
            
            // Row 5 (y=320): Compound shapes with gaps
            { shape: 'verticalSlot', x: 150, y: 320 },
            { shape: 'horizontalTunnel', x: 300, y: 320 },
            { shape: 'zigZagGap', x: 480, y: 320 },
            
            // Top platform for reference
            { shape: 'flatLong', x: 350, y: 180 }
        ]
    },
    
    // Layout 3 (was Layout 2)
    {
        name: "mix2",
        platforms: [
            // Bottom - first platform is spawn
            { shape: 'flatMedium', x: 140, y: 800 },
            { shape: 'rock', x: 300, y: 785 },
            { shape: 'flatLong', x: 520, y: 800 },
            // Lower-mid
            { shape: 'blockTall', x: 140, y: 700 },
            { shape: 'bumpyWide', x: 340, y: 710 },
            { shape: 'flatSmall', x: 560, y: 695 },
            // Mid
            { shape: 'flatSmall', x: 140, y: 595 },
            { shape: 'cupShape', x: 280, y: 585 },
            { shape: 'flatMedium', x: 420, y: 605 },
            { shape: 'blockShort', x: 570, y: 585 },
            // Upper-mid
            { shape: 'lShapeDownRight', x: 140, y: 490 },
            { shape: 'flatLong', x: 360, y: 475 },
            { shape: 'flatTiny', x: 570, y: 465 },
            // Upper
            { shape: 'flatMedium', x: 170, y: 375 },
            { shape: 'pillar', x: 380, y: 385 },
            { shape: 'flatSmall', x: 560, y: 360 },
            // Top
            { shape: 'flatSmall', x: 140, y: 260 },
            { shape: 'flatMedium', x: 340, y: 270 },
            { shape: 'lShapeDownLeft', x: 540, y: 260 },
            // Very top
            { shape: 'flatLong', x: 260, y: 155 },
            { shape: 'flatSmall', x: 540, y: 140 }
        ]
    },
    
    // Layout 4 (was Layout 3)
    {
        name: "mix3",
        platforms: [
            // Bottom - first platform is spawn
            { shape: 'flatLong', x: 160, y: 800 },
            { shape: 'lShapeDownLeft', x: 380, y: 775 },
            { shape: 'flatMedium', x: 560, y: 800 },
            // Lower-mid
            { shape: 'flatMedium', x: 150, y: 695 },
            { shape: 'notchedBlock', x: 350, y: 700 },
            { shape: 'pillar', x: 560, y: 715 },
            // Mid
            { shape: 'blockWide', x: 140, y: 595 },
            { shape: 'flatSmall', x: 320, y: 580 },
            { shape: 'flatLong', x: 520, y: 600 },
            // Upper-mid
            { shape: 'flatTiny', x: 140, y: 490 },
            { shape: 'blockShort', x: 300, y: 495 },
            { shape: 'lShapeDownRight', x: 510, y: 490 },
            // Upper
            { shape: 'flatMedium', x: 160, y: 385 },
            { shape: 'flatSmall', x: 360, y: 375 },
            { shape: 'flatMedium', x: 550, y: 390 },
            // Top
            { shape: 'flatSmall', x: 140, y: 270 },
            { shape: 'tShape', x: 330, y: 260 },
            { shape: 'flatMedium', x: 540, y: 285 },
            // Very top
            { shape: 'flatMedium', x: 270, y: 155 },
            { shape: 'flatTiny', x: 530, y: 170 }
        ]
    },
    
    // Layout 5 (was Layout 4)
    {
        name: "mix4",
        platforms: [
            // Bottom - first platform is spawn
            { shape: 'blockShort', x: 130, y: 780 },
            { shape: 'flatLong', x: 320, y: 800 },
            { shape: 'lShapeDownRight', x: 540, y: 775 },
            // Lower-mid
            { shape: 'flatMedium', x: 150, y: 685 },
            { shape: 'tShape', x: 340, y: 680 },
            { shape: 'flatMedium', x: 540, y: 695 },
            // Mid
            { shape: 'lShapeDownLeft', x: 140, y: 580 },
            { shape: 'rock', x: 340, y: 570 },
            { shape: 'bumpyWide', x: 520, y: 585 },
            // Upper-mid
            { shape: 'flatSmall', x: 140, y: 475 },
            { shape: 'blockTall', x: 330, y: 490 },
            { shape: 'flatMedium', x: 540, y: 475 },
            // Upper
            { shape: 'flatSmall', x: 140, y: 375 },
            { shape: 'cupShape', x: 350, y: 360 },
            { shape: 'flatSmall', x: 560, y: 375 },
            // Top
            { shape: 'flatMedium', x: 180, y: 270 },
            { shape: 'flatSmall', x: 400, y: 260 },
            { shape: 'pillar', x: 570, y: 270 },
            // Very top
            { shape: 'flatSmall', x: 140, y: 155 },
            { shape: 'flatLong', x: 360, y: 170 }
        ]
    },
    
    // Layout 6 (was Layout 5)
    {
        name: "mix5",
        platforms: [
            // Bottom - first platform is spawn
            { shape: 'flatMedium', x: 140, y: 800 },
            { shape: 'pillar', x: 320, y: 770 },
            { shape: 'flatMedium', x: 500, y: 800 },
            // Lower-mid
            { shape: 'blockWide', x: 140, y: 700 },
            { shape: 'flatLong', x: 360, y: 695 },
            { shape: 'flatTiny', x: 570, y: 685 },
            // Mid
            { shape: 'flatSmall', x: 140, y: 595 },
            { shape: 'lShapeDownRight', x: 300, y: 595 },
            { shape: 'blockShort', x: 550, y: 585 },
            // Upper-mid
            { shape: 'flatMedium', x: 150, y: 490 },
            { shape: 'flatSmall', x: 350, y: 475 },
            { shape: 'notchedBlock', x: 550, y: 495 },
            // Upper
            { shape: 'lShapeDownLeft', x: 150, y: 385 },
            { shape: 'flatMedium', x: 360, y: 375 },
            { shape: 'flatSmall', x: 560, y: 390 },
            // Top
            { shape: 'flatSmall', x: 140, y: 270 },
            { shape: 'blockShort', x: 340, y: 265 },
            { shape: 'flatMedium', x: 540, y: 285 },
            // Very top
            { shape: 'flatLong', x: 270, y: 170 },
            { shape: 'flatTiny', x: 540, y: 155 }
        ]
    }
];

