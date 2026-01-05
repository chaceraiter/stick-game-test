# Database performance optimization
_Exported on 1/4/2026 at 23:19:59 PST from Cursor (2.2.44)_

---

**User**

@paste-this-into-new-ai-chats.txt (1-5) 

---

**Cursor**

I see this project has an AI context management system! Let me get oriented by reading the current work status and project context.

Got it! I'm now oriented on the **stick figure arena shooter** project. Here's my understanding:

---

## Project Summary

A browser-based Worms-style stick figure shooter built with **Phaser 3**, styled like doodles on crumpled notebook paper with crayon-style fills.

**What's Working:**
- Player movement (arrow keys), jumping, mouse-aimed shooting
- Enemies (red stick figures that can be shot)
- 18 platform shapes (15 simple + 3 compound) with crayon hatching
- 6 layouts (cycle with `G` key), including a shape showcase
- Water hazard, walls, debug controls (`R`/`G`/`F`/`H`)

**Current State:** At a clean checkpoint. The layout system and visual style are polished.

**Next Steps (from docs):**
1. **Refactor** `PlayScene.js` (~780 lines) into smaller modules
2. Then expand the shape library and build the procedural generator

---

## Ready to Help

The codebase is at a natural stopping point. What would you like to work on?

- **Start the refactor?** (Split `PlayScene.js` into `ShapeRenderer`, `EnvironmentRenderer`, `DebugControls`, etc.)
- **Add more shapes first?** (If you'd rather keep momentum on gameplay)
- **Something else entirely?** (Bug fixes, new features, or just exploring)

What sounds good?

---

**User**

please refactor. you can go step by step and have me test in between to make sure we dont break anything

---

**Cursor**

Let me first read the current code to understand what we're working with.

Now I understand the codebase. Let me create a refactoring plan with incremental steps.

## Step 1: Extract DebugControls

Starting with the safest refactor - extracting debug controls (R/G/F/H keys) into their own module. This is low-risk because debug controls are optional functionality.

```javascript
/**
 * DebugControls.js - Debug/testing keyboard controls
 * 
 * Handles:
 * - R: Restart scene (same layout)
 * - G: Go to next layout
 * - F: Fly mode toggle (ignore gravity)
 * - H: Hitbox display toggle
 */

export class DebugControls {
    /**
     * @param {Phaser.Scene} scene - The scene to attach controls to
     */
    constructor(scene) {
        this.scene = scene;
        this.flyMode = false;
        
        // Set up key bindings
        this.restartKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.newMapKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        this.flyKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.hitboxKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
    }
    
    /**
     * Check for debug key presses. Call this in scene's update().
     * @param {Phaser.Physics.Arcade.Sprite} player - The player sprite (for fly mode)
     * @param {number} currentLayoutIndex - Current layout index
     * @param {number} totalLayouts - Total number of layouts
     * @returns {Object|null} - Action to take, or null if no debug key pressed
     *   { action: 'restart', layoutIndex: number } - Restart with this layout
     *   { action: 'flyToggled', flyMode: boolean } - Fly mode was toggled
     */
    update(player, currentLayoutIndex, totalLayouts) {
        // R key - restart scene (same layout)
        if (Phaser.Input.Keyboard.JustDown(this.restartKey)) {
            return { action: 'restart', layoutIndex: currentLayoutIndex };
        }
        
        // G key - go to next layout
        if (Phaser.Input.Keyboard.JustDown(this.newMapKey)) {
            const nextIndex = (currentLayoutIndex + 1) % totalLayouts;
            return { action: 'restart', layoutIndex: nextIndex };
        }
        
        // F key - toggle fly mode
        if (Phaser.Input.Keyboard.JustDown(this.flyKey)) {
            this.flyMode = !this.flyMode;
            player.body.allowGravity = !this.flyMode;
            if (this.flyMode) {
                player.setVelocity(0, 0);
            }
            return { action: 'flyToggled', flyMode: this.flyMode };
        }
        
        // H key - toggle hitbox display
        if (Phaser.Input.Keyboard.JustDown(this.hitboxKey)) {
            if (this.scene.physics.world.debugGraphic) {
                this.scene.physics.world.debugGraphic.visible = !this.scene.physics.world.debugGraphic.visible;
            }
            return { action: 'hitboxToggled' };
        }
        
        return null;
    }
    
    /**
     * Check if fly mode is currently enabled
     */
    isFlyMode() {
        return this.flyMode;
    }
}

```

Now let me update `PlayScene.js` to use the new module:

```javascript
/**
 * PlayScene - Main gameplay scene
 * 
 * This is where the actual game happens. Phaser scenes have three main methods:
 * - preload(): Load assets (images, sounds, etc.)
 * - create(): Set up game objects, physics, input (runs once when scene starts)
 * - update(): Game loop, runs every frame (~60 times per second)
 */

import { DebugControls } from '../utils/DebugControls.js';

class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        // Load the user-cropped notebook paper background (preserves scale)
        this.load.image('notebook-paper', 'assets/cropped-notebook-page.png');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using cropped image) ===
        // Paper is pre-cropped to edges, just scale to fit canvas
        const paper = this.add.image(350, 450, 'notebook-paper');
        paper.setDisplaySize(700, 900);
        
        
        // === WALLS (hand-drawn style with crayon fill) ===
        const wallGraphics = this.add.graphics();
        
        // Left wall - fill first, then outline
        // Build path points for left wall
        const leftWallPoints = [{x: 55, y: 0}];
        for (let y = 0; y <= 795; y += 20) {
            const wobbleX = 55 + (Math.random() - 0.5) * 6 + Math.sin(y * 0.02) * 3;
            leftWallPoints.push({x: wobbleX, y: y});
        }
        leftWallPoints.push({x: 55, y: 795}, {x: 0, y: 795}, {x: 0, y: 0});
        
        // Fill left wall
        wallGraphics.fillStyle(0x888888, 0.24);
        wallGraphics.beginPath();
        wallGraphics.moveTo(leftWallPoints[0].x, leftWallPoints[0].y);
        for (let i = 1; i < leftWallPoints.length; i++) {
            wallGraphics.lineTo(leftWallPoints[i].x, leftWallPoints[i].y);
        }
        wallGraphics.closePath();
        wallGraphics.fillPath();
        
        // Crayon strokes for left wall
        wallGraphics.lineStyle(0.5, 0x666666, 0.15);
        for (let y = 0; y < 795; y += 8) {
            wallGraphics.beginPath();
            wallGraphics.moveTo((Math.random() - 0.5) * 2, y + (Math.random() - 0.5) * 2);
            wallGraphics.lineTo(50 + (Math.random() - 0.5) * 10, y + 15 + (Math.random() - 0.5) * 2);
            wallGraphics.strokePath();
        }
        
        // Outline left wall
        wallGraphics.lineStyle(2.5, 0x1a1a1a);
        wallGraphics.beginPath();
        wallGraphics.moveTo(55, 0);
        for (let i = 1; i < leftWallPoints.length - 2; i++) {
            wallGraphics.lineTo(leftWallPoints[i].x, leftWallPoints[i].y);
        }
        wallGraphics.lineTo(55, 795);
        wallGraphics.lineTo(0, 795);
        wallGraphics.strokePath();
        
        // Right wall - fill first, then outline
        const rightWallPoints = [{x: 645, y: 0}];
        for (let y = 0; y <= 795; y += 20) {
            const wobbleX = 645 + (Math.random() - 0.5) * 6 + Math.sin(y * 0.025 + 1) * 3;
            rightWallPoints.push({x: wobbleX, y: y});
        }
        rightWallPoints.push({x: 645, y: 795}, {x: 700, y: 795}, {x: 700, y: 0});
        
        // Fill right wall
        wallGraphics.fillStyle(0x888888, 0.24);
        wallGraphics.beginPath();
        wallGraphics.moveTo(rightWallPoints[0].x, rightWallPoints[0].y);
        for (let i = 1; i < rightWallPoints.length; i++) {
            wallGraphics.lineTo(rightWallPoints[i].x, rightWallPoints[i].y);
        }
        wallGraphics.closePath();
        wallGraphics.fillPath();
        
        // Crayon strokes for right wall
        wallGraphics.lineStyle(0.5, 0x666666, 0.15);
        for (let y = 0; y < 795; y += 8) {
            wallGraphics.beginPath();
            wallGraphics.moveTo(650 + (Math.random() - 0.5) * 2, y + (Math.random() - 0.5) * 2);
            wallGraphics.lineTo(700 + (Math.random() - 0.5) * 2, y + 15 + (Math.random() - 0.5) * 2);
            wallGraphics.strokePath();
        }
        
        // Outline right wall
        wallGraphics.lineStyle(2.5, 0x1a1a1a);
        wallGraphics.beginPath();
        wallGraphics.moveTo(645, 0);
        for (let i = 1; i < rightWallPoints.length - 2; i++) {
            wallGraphics.lineTo(rightWallPoints[i].x, rightWallPoints[i].y);
        }
        wallGraphics.lineTo(645, 795);
        wallGraphics.lineTo(700, 795);
        wallGraphics.strokePath();
        
        // Wall collision bodies (invisible rectangles)
        this.walls = this.physics.add.staticGroup();
        
        // Create wall collision textures (only if they don't exist)
        if (!this.textures.exists('wall')) {
            const wallTexture = this.add.graphics();
            wallTexture.fillStyle(0x000000, 0);  // Invisible
            wallTexture.fillRect(0, 0, 50, 795);
            wallTexture.generateTexture('wall', 50, 795);
            wallTexture.destroy();
        }
        
        // Add collision walls (positioned so player stays in play area)
        this.walls.create(27, 397, 'wall');   // Left wall
        this.walls.create(673, 397, 'wall');  // Right wall
        
        
        // === WATER HAZARD (with crayon-like blue fill) ===
        const waterGraphics = this.add.graphics();
        
        // Build wavy surface points
        const waterPoints = [{x: 0, y: 870}];
        for (let x = 0; x <= 700; x += 15) {
            const waveY = 870 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterPoints.push({x: x, y: waveY});
        }
        
        // Blue crayon fill for water body
        waterGraphics.fillStyle(0x4A90D9, 0.24);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 870);
        for (const pt of waterPoints) {
            waterGraphics.lineTo(pt.x, pt.y);
        }
        waterGraphics.lineTo(700, 900);  // bottom right
        waterGraphics.lineTo(0, 900);    // bottom left
        waterGraphics.closePath();
        waterGraphics.fillPath();
        
        // Crayon strokes for water
        waterGraphics.lineStyle(0.5, 0x2070B0, 0.2);
        for (let y = 872; y < 900; y += 5) {
            waterGraphics.beginPath();
            waterGraphics.moveTo((Math.random() - 0.5) * 4, y + (Math.random() - 0.5) * 2);
            waterGraphics.lineTo(700 + (Math.random() - 0.5) * 4, y + 8 + (Math.random() - 0.5) * 2);
            waterGraphics.strokePath();
        }
        
        // Wavy surface line
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(waterPoints[0].x, waterPoints[0].y);
        for (let i = 1; i < waterPoints.length; i++) {
            waterGraphics.lineTo(waterPoints[i].x, waterPoints[i].y);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection (below the line)
        this.waterZone = this.add.zone(350, 885, 700, 30);
        this.physics.add.existing(this.waterZone, true);  // true = static body
        
        
        // === PLATFORMS (using shape library) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Helper function to draw a sketchy shape
        this.createSketchyShape = (shapeName, shapeData) => {
            const g = this.add.graphics();
            const wobble = () => (Math.random() - 0.5) * 2;
            
            g.lineStyle(2, 0x1a1a1a);  // Dark pen color
            
            // Check if this is a compound shape (has parts array)
            if (shapeData.parts) {
                // Compound shape: check if it has custom visual outline (points) or just draw parts
                if (shapeData.outlines) {
                    // Has multiple outline groups - draw each as connected shape
                    for (const outline of shapeData.outlines) {
                        // Crayon-like fill
                        g.fillStyle(0x888888, 0.24);
                        g.beginPath();
                        g.moveTo(outline[0].x + 3, outline[0].y + 3);
                        for (let i = 1; i < outline.length; i++) {
                            g.lineTo(outline[i].x + 3, outline[i].y + 3);
                        }
                        g.closePath();
                        g.fillPath();
                    }
                    
                    // Add crayon strokes across the whole shape
                    g.lineStyle(0.5, 0x666666, 0.15);
                    for (let y = 0; y < shapeData.height; y += 6) {
                        g.beginPath();
                        g.moveTo(3 + wobble(), y + 3 + wobble());
                        g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
                        g.strokePath();
                    }
                    g.lineStyle(2, 0x1a1a1a);
                    
                    // Draw outlines
                    for (const outline of shapeData.outlines) {
                        g.beginPath();
                        g.moveTo(outline[0].x + wobble() + 3, outline[0].y + wobble() + 3);
                        for (let i = 1; i < outline.length; i++) {
                            g.lineTo(outline[i].x + wobble() + 3, outline[i].y + wobble() + 3);
                        }
                        g.closePath();
                        g.strokePath();
                    }
                } else {
                    // No custom outline - draw each part as separate rectangle
                    for (const part of shapeData.parts) {
                        // Crayon-like fill
                        g.fillStyle(0x888888, 0.24);
                        g.fillRect(part.x + 3, part.y + 3, part.w, part.h);
                    }
                    
                    // Add crayon strokes
                    g.lineStyle(0.5, 0x666666, 0.15);
                    for (let y = 0; y < shapeData.height; y += 6) {
                        g.beginPath();
                        g.moveTo(3 + wobble(), y + 3 + wobble());
                        g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
                        g.strokePath();
                    }
                    g.lineStyle(2, 0x1a1a1a);
                    
                    // Draw outlines
                    for (const part of shapeData.parts) {
                        g.beginPath();
                        g.moveTo(part.x + wobble() + 3, part.y + wobble() + 3);
                        g.lineTo(part.x + part.w + wobble() + 3, part.y + wobble() + 3);
                        g.lineTo(part.x + part.w + wobble() + 3, part.y + part.h + wobble() + 3);
                        g.lineTo(part.x + wobble() + 3, part.y + part.h + wobble() + 3);
                        g.lineTo(part.x + wobble() + 3, part.y + wobble() + 3);
                        g.strokePath();
                    }
                }
            } else {
                // Simple shape: draw from points array (original behavior)
                const points = shapeData.points;
                
                // Crayon-like fill
                g.fillStyle(0x888888, 0.24);
                g.beginPath();
                g.moveTo(points[0].x + 3, points[0].y + 3);
                for (let i = 1; i < points.length; i++) {
                    g.lineTo(points[i].x + 3, points[i].y + 3);
                }
                g.closePath();
                g.fillPath();
                
                // Add subtle diagonal crayon strokes
                g.lineStyle(0.5, 0x666666, 0.15);
                for (let y = 0; y < shapeData.height; y += 6) {
                    g.beginPath();
                    g.moveTo(3 + wobble(), y + 3 + wobble());
                    g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
                    g.strokePath();
                }
                g.lineStyle(2, 0x1a1a1a);  // Reset for outline
                
                // Outline
                g.beginPath();
                g.moveTo(points[0].x + wobble() + 3, points[0].y + wobble() + 3);
                for (let i = 1; i < points.length; i++) {
                    g.lineTo(points[i].x + wobble() + 3, points[i].y + wobble() + 3);
                }
                g.lineTo(points[0].x + wobble() + 3, points[0].y + wobble() + 3);
                g.strokePath();
            }
            
            g.generateTexture(shapeName, shapeData.width + 6, shapeData.height + 6);
            g.destroy();
        };
        
        // Generate textures for all shapes in the library (only if they don't exist)
        for (const [name, data] of Object.entries(PLATFORM_SHAPES)) {
            if (!this.textures.exists(name)) {
                this.createSketchyShape(name, data);
            }
        }
        
        // Select level layout (use passed index or default to 0)
        this.currentLayoutIndex = (this.scene.settings.data && this.scene.settings.data.layoutIndex !== undefined) 
            ? this.scene.settings.data.layoutIndex 
            : 0;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex])
        
        
        // === PLAYER (hand-drawn stick figure - 0.75x original) ===
        if (!this.textures.exists('player')) {
            const playerGraphics = this.add.graphics();
            playerGraphics.lineStyle(1.5, 0x1a1a1a);  // Black pen
            
            // Simple stick figure: head, body, legs
            // Head (circle)
            playerGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 5.25);
            playerGraphics.lineTo(4.5, 10.5);
            playerGraphics.strokePath();
            // Arms (line across)
            playerGraphics.beginPath();
            playerGraphics.moveTo(1.5, 7.5);
            playerGraphics.lineTo(7.5, 7.5);
            playerGraphics.strokePath();
            // Legs (two lines)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(2.25, 15);
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(6.75, 15);
            playerGraphics.strokePath();
            
            playerGraphics.generateTexture('player', 9, 17);
            playerGraphics.destroy();
        }
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        
        // Player dies if they touch water!
        this.physics.add.overlap(this.player, this.waterZone, this.playerDied, null, this);
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Mouse input for shooting (and continuing after level complete)
        this.input.on('pointerdown', (pointer) => {
            if (this.levelInProgress) {
                this.shoot(pointer.x, pointer.y);
            } else {
                // Level is complete, click to start next level
                this.startNextLevel();
            }
        });
        
        
        // === BULLETS ===
        // === BULLET (hand-drawn dash) ===
        if (!this.textures.exists('bullet')) {
            const bulletGraphics = this.add.graphics();
            bulletGraphics.lineStyle(2, 0x1a1a1a);  // Black pen stroke
            bulletGraphics.beginPath();
            bulletGraphics.moveTo(0, 2);
            bulletGraphics.lineTo(8, 2);
            bulletGraphics.strokePath();
            bulletGraphics.generateTexture('bullet', 10, 4);
            bulletGraphics.destroy();
        }
        
        // Now create the group that uses the texture
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });
        
        
        // === ENEMIES ===
        // === ENEMY (hand-drawn stick figure in red - 0.75x original) ===
        if (!this.textures.exists('enemy')) {
            const enemyGraphics = this.add.graphics();
            enemyGraphics.lineStyle(1.5, 0xcc3333);  // Red pen
            
            // Same stick figure shape as player
            // Head (circle)
            enemyGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 5.25);
            enemyGraphics.lineTo(4.5, 10.5);
            enemyGraphics.strokePath();
            // Arms (line across)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(1.5, 7.5);
            enemyGraphics.lineTo(7.5, 7.5);
            enemyGraphics.strokePath();
            // Legs (two lines)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(2.25, 15);
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(6.75, 15);
            enemyGraphics.strokePath();
            
            enemyGraphics.generateTexture('enemy', 9, 17);
            enemyGraphics.destroy();
        }
        
        // Create enemies group
        this.enemies = this.physics.add.group();
        
        // Spawn initial enemies on platforms
        this.spawnEnemy(450, 600);   // Bottom right platform
        this.spawnEnemy(280, 460);   // Middle platform
        this.spawnEnemy(380, 390);   // Row 4
        this.spawnEnemy(380, 250);   // Top platform
        
        // Make enemies collide with platforms (so they sit on them)
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Bullets hit enemies!
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        
        
        // === UI TEXT ===
        // Show some instructions (smaller for notebook canvas)
        this.add.text(60, 16, 'Arrows: move | Click: shoot | R/G: restart/new | F: fly | H: hitbox', {
            fontSize: '9px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // R key to restart the scene (reload same layout)
        this.restartKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        // G key to generate new map (next layout)
        this.newMapKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        // F key to toggle fly mode (for testing)
        this.flyKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.flyMode = false;
        // H key to toggle hitbox display
        this.hitboxKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        
        // Enemy counter (positioned for notebook canvas)
        this.enemyCountText = this.add.text(60, 32, '', {
            fontSize: '11px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        this.updateEnemyCount();
        
        // Level complete text (hidden initially) - centered for 700px canvas
        this.levelCompleteText = this.add.text(350, 400, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '28px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 18, y: 10 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(350, 460, 'Click to continue', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 5 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display
        this.levelText = this.add.text(610, 16, 'Level: 1', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 6, y: 3 }
        });
        
        // Layout number display (for debugging)
        this.layoutText = this.add.text(60, 48, `Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`, {
            fontSize: '11px',
            fill: '#666',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Spawn points will be generated from the layout
        this.spawnPoints = [];
        
        // Player start position (will be set by layout)
        this.playerStartX = 100;
        this.playerStartY = 600;
    }
    
    /**
     * Load a level layout from the library
     */
    loadLayout(layout) {
        // Clear existing platforms
        this.platforms.clear(true, true);
        
        // Clear spawn points
        this.spawnPoints = [];
        
        // Create platforms from layout
        for (const plat of layout.platforms) {
            const shapeData = PLATFORM_SHAPES[plat.shape];
            
            // Check if this is a compound shape (has separate collision parts)
            if (shapeData.parts) {
                // Compound shape: create visual-only sprite + separate collision bodies
                
                // Add visual sprite (no physics)
                const visual = this.add.image(plat.x, plat.y, plat.shape);
                
                // Create collision bodies for each part
                for (const part of shapeData.parts) {
                    // Part coordinates are relative to shape origin (top-left)
                    // Convert to world position (plat.x, plat.y is center of shape)
                    const partX = plat.x - shapeData.width / 2 + part.x + part.w / 2;
                    const partY = plat.y - shapeData.height / 2 + part.y + part.h / 2;
                    
                    // Create invisible collision rectangle
                    const collider = this.add.rectangle(partX, partY, part.w, part.h, 0x000000, 0);
                    this.physics.add.existing(collider, true);  // true = static
                    this.platforms.add(collider);
                }
            } else {
                // Simple shape: single collision body (original behavior)
                const platform = this.platforms.create(plat.x, plat.y, plat.shape);
            }
            
            // Add this platform position as a spawn point
            // Spawn point is on top of the platform
            this.spawnPoints.push({
                x: plat.x,
                y: plat.y - shapeData.height / 2 - 15  // Above the platform
            });
        }
        
        // Set player start to first platform
        if (layout.platforms.length > 0) {
            const firstPlat = layout.platforms[0];
            const firstShape = PLATFORM_SHAPES[firstPlat.shape];
            this.playerStartX = firstPlat.x;
            this.playerStartY = firstPlat.y - firstShape.height / 2 - 15;
        }
    }
    
    /**
     * Spawn an enemy at a position
     */
    spawnEnemy(x, y) {
        const enemy = this.enemies.create(x, y, 'enemy');
        enemy.setBounce(0);
        enemy.setCollideWorldBounds(true);
    }
    
    /**
     * Called when a bullet hits an enemy
     */
    bulletHitEnemy(bullet, enemy) {
        // Deactivate the bullet
        bullet.setActive(false);
        bullet.setVisible(false);
        
        // Destroy the enemy
        enemy.destroy();
        
        // Update the counter
        this.updateEnemyCount();
        
        // Check for level complete
        if (this.enemies.countActive() === 0) {
            this.levelComplete();
        }
    }
    
    /**
     * Update the enemy count display
     */
    updateEnemyCount() {
        const count = this.enemies.countActive();
        this.enemyCountText.setText(`Enemies remaining: ${count}`);
    }
    
    /**
     * Called when all enemies are defeated
     */
    levelComplete() {
        this.levelInProgress = false;
        this.levelCompleteText.setVisible(true);
        this.clickToContinueText.setVisible(true);
    }
    
    /**
     * Start the next level - cycle through layouts and spawn enemies
     */
    startNextLevel() {
        this.currentLevel++;
        this.levelText.setText(`Level: ${this.currentLevel}`);
        
        // Hide completion messages
        this.levelCompleteText.setVisible(false);
        this.clickToContinueText.setVisible(false);
        
        // Clear any remaining bullets
        this.bullets.children.each((bullet) => {
            bullet.setActive(false);
            bullet.setVisible(false);
        });
        
        // Cycle to next layout (or random)
        this.currentLayoutIndex = (this.currentLayoutIndex + 1) % LEVEL_LAYOUTS.length;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex]);
        
        // Re-add platform and wall collisions
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Spawn enemies at random positions
        // More enemies as levels progress (4 + 1 per 2 levels, max based on spawn points)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), this.spawnPoints.length - 1);
        
        // Filter out player start position from spawn points for enemies
        const enemySpawnPoints = this.spawnPoints.filter(
            p => !(Math.abs(p.x - this.playerStartX) < 10 && Math.abs(p.y - this.playerStartY) < 10)
        );
        
        // Shuffle and pick
        const shuffled = Phaser.Utils.Array.Shuffle([...enemySpawnPoints]);
        for (let i = 0; i < enemyCount && i < shuffled.length; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position - use body.reset for proper physics sync
        this.player.body.reset(this.playerStartX, this.playerStartY);
    }
    
    /**
     * Called when player touches water
     */
    playerDied() {
        // Prevent multiple triggers while respawning
        if (this.isRespawning) return;
        this.isRespawning = true;
        
        // Force physics body to fully reset at new position
        // This syncs sprite + physics body immediately to prevent desync
        this.player.body.reset(this.playerStartX, this.playerStartY);
        
        // Brief visual feedback - flash the player
        this.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            this.player.clearTint();
        });
        
        // Clear respawn flag after player has time to land
        this.time.delayedCall(500, () => {
            this.isRespawning = false;
        });
    }

    update() {
        // This runs every frame - handle player movement here
        
        // Check for restart key (same layout)
        if (Phaser.Input.Keyboard.JustDown(this.restartKey)) {
            this.scene.restart({ layoutIndex: this.currentLayoutIndex });
            return;
        }
        
        // Check for new map key (next layout)
        if (Phaser.Input.Keyboard.JustDown(this.newMapKey)) {
            const nextIndex = (this.currentLayoutIndex + 1) % LEVEL_LAYOUTS.length;
            this.scene.restart({ layoutIndex: nextIndex });
            return;
        }
        
        // Toggle fly mode
        if (Phaser.Input.Keyboard.JustDown(this.flyKey)) {
            this.flyMode = !this.flyMode;
            this.player.body.allowGravity = !this.flyMode;
            if (this.flyMode) {
                this.player.setVelocity(0, 0);
            }
        }
        
        // Toggle hitbox debug display
        if (Phaser.Input.Keyboard.JustDown(this.hitboxKey)) {
            if (this.physics.world.debugGraphic) {
                this.physics.world.debugGraphic.visible = !this.physics.world.debugGraphic.visible;
            }
        }
        
        const speed = 120;  // Scaled down for smaller characters
        const flySpeed = 200;  // Speed when flying
        const jumpVelocity = -280;  // Scaled down - smaller jump for zoomed-out feel
        
        // Left/Right movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(this.flyMode ? -flySpeed : -speed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(this.flyMode ? flySpeed : speed);
        } else {
            // No arrow pressed - stop horizontal movement
            this.player.setVelocityX(0);
        }
        
        // Up/Down movement (fly mode) or jumping (normal mode)
        if (this.flyMode) {
            // Fly mode: up/down arrows move vertically
            if (this.cursors.up.isDown) {
                this.player.setVelocityY(-flySpeed);
            } else if (this.cursors.down.isDown) {
                this.player.setVelocityY(flySpeed);
            } else {
                this.player.setVelocityY(0);
            }
        } else {
            // Normal mode: jumping when touching ground
            if (this.cursors.up.isDown && this.player.body.blocked.down) {
                this.player.setVelocityY(jumpVelocity);
            }
        }
        
        // Clean up bullets that have left the screen
        this.bullets.children.each((bullet) => {
            if (bullet.active && (bullet.x < -50 || bullet.x > 750 || bullet.y < -50 || bullet.y > 950)) {
                bullet.setActive(false);
                bullet.setVisible(false);
            }
        });
    }
    
    /**
     * Shoot a bullet toward a target position
     * @param {number} targetX - X coordinate to shoot toward
     * @param {number} targetY - Y coordinate to shoot toward
     */
    shoot(targetX, targetY) {
        // Get a bullet from the group (reuses inactive bullets)
        const bullet = this.bullets.get(this.player.x, this.player.y);
        
        if (!bullet) return;  // No bullets available
        
        bullet.setActive(true);
        bullet.setVisible(true);
        
        // Calculate direction to target
        const angle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            targetX, targetY
        );
        
        // Set bullet velocity toward target
        const bulletSpeed = 600;
        bullet.setVelocity(
            Math.cos(angle) * bulletSpeed,
            Math.sin(angle) * bulletSpeed
        );
        
        // Rotate bullet to face direction of travel
        bullet.setRotation(angle);
        
        // Bullets shouldn't be affected by gravity
        bullet.body.allowGravity = false;
    }
}


```

```javascript
/**
 * PlayScene - Main gameplay scene
 * 
 * This is where the actual game happens. Phaser scenes have three main methods:
 * - preload(): Load assets (images, sounds, etc.)
 * - create(): Set up game objects, physics, input (runs once when scene starts)
 * - update(): Game loop, runs every frame (~60 times per second)
 */

import { DebugControls } from '../utils/DebugControls.js';

class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        // Load the user-cropped notebook paper background (preserves scale)
        this.load.image('notebook-paper', 'assets/cropped-notebook-page.png');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using cropped image) ===
        // Paper is pre-cropped to edges, just scale to fit canvas
        const paper = this.add.image(350, 450, 'notebook-paper');
        paper.setDisplaySize(700, 900);
        
        
        // === WALLS (hand-drawn style with crayon fill) ===
        const wallGraphics = this.add.graphics();
        
        // Left wall - fill first, then outline
        // Build path points for left wall
        const leftWallPoints = [{x: 55, y: 0}];
        for (let y = 0; y <= 795; y += 20) {
            const wobbleX = 55 + (Math.random() - 0.5) * 6 + Math.sin(y * 0.02) * 3;
            leftWallPoints.push({x: wobbleX, y: y});
        }
        leftWallPoints.push({x: 55, y: 795}, {x: 0, y: 795}, {x: 0, y: 0});
        
        // Fill left wall
        wallGraphics.fillStyle(0x888888, 0.24);
        wallGraphics.beginPath();
        wallGraphics.moveTo(leftWallPoints[0].x, leftWallPoints[0].y);
        for (let i = 1; i < leftWallPoints.length; i++) {
            wallGraphics.lineTo(leftWallPoints[i].x, leftWallPoints[i].y);
        }
        wallGraphics.closePath();
        wallGraphics.fillPath();
        
        // Crayon strokes for left wall
        wallGraphics.lineStyle(0.5, 0x666666, 0.15);
        for (let y = 0; y < 795; y += 8) {
            wallGraphics.beginPath();
            wallGraphics.moveTo((Math.random() - 0.5) * 2, y + (Math.random() - 0.5) * 2);
            wallGraphics.lineTo(50 + (Math.random() - 0.5) * 10, y + 15 + (Math.random() - 0.5) * 2);
            wallGraphics.strokePath();
        }
        
        // Outline left wall
        wallGraphics.lineStyle(2.5, 0x1a1a1a);
        wallGraphics.beginPath();
        wallGraphics.moveTo(55, 0);
        for (let i = 1; i < leftWallPoints.length - 2; i++) {
            wallGraphics.lineTo(leftWallPoints[i].x, leftWallPoints[i].y);
        }
        wallGraphics.lineTo(55, 795);
        wallGraphics.lineTo(0, 795);
        wallGraphics.strokePath();
        
        // Right wall - fill first, then outline
        const rightWallPoints = [{x: 645, y: 0}];
        for (let y = 0; y <= 795; y += 20) {
            const wobbleX = 645 + (Math.random() - 0.5) * 6 + Math.sin(y * 0.025 + 1) * 3;
            rightWallPoints.push({x: wobbleX, y: y});
        }
        rightWallPoints.push({x: 645, y: 795}, {x: 700, y: 795}, {x: 700, y: 0});
        
        // Fill right wall
        wallGraphics.fillStyle(0x888888, 0.24);
        wallGraphics.beginPath();
        wallGraphics.moveTo(rightWallPoints[0].x, rightWallPoints[0].y);
        for (let i = 1; i < rightWallPoints.length; i++) {
            wallGraphics.lineTo(rightWallPoints[i].x, rightWallPoints[i].y);
        }
        wallGraphics.closePath();
        wallGraphics.fillPath();
        
        // Crayon strokes for right wall
        wallGraphics.lineStyle(0.5, 0x666666, 0.15);
        for (let y = 0; y < 795; y += 8) {
            wallGraphics.beginPath();
            wallGraphics.moveTo(650 + (Math.random() - 0.5) * 2, y + (Math.random() - 0.5) * 2);
            wallGraphics.lineTo(700 + (Math.random() - 0.5) * 2, y + 15 + (Math.random() - 0.5) * 2);
            wallGraphics.strokePath();
        }
        
        // Outline right wall
        wallGraphics.lineStyle(2.5, 0x1a1a1a);
        wallGraphics.beginPath();
        wallGraphics.moveTo(645, 0);
        for (let i = 1; i < rightWallPoints.length - 2; i++) {
            wallGraphics.lineTo(rightWallPoints[i].x, rightWallPoints[i].y);
        }
        wallGraphics.lineTo(645, 795);
        wallGraphics.lineTo(700, 795);
        wallGraphics.strokePath();
        
        // Wall collision bodies (invisible rectangles)
        this.walls = this.physics.add.staticGroup();
        
        // Create wall collision textures (only if they don't exist)
        if (!this.textures.exists('wall')) {
            const wallTexture = this.add.graphics();
            wallTexture.fillStyle(0x000000, 0);  // Invisible
            wallTexture.fillRect(0, 0, 50, 795);
            wallTexture.generateTexture('wall', 50, 795);
            wallTexture.destroy();
        }
        
        // Add collision walls (positioned so player stays in play area)
        this.walls.create(27, 397, 'wall');   // Left wall
        this.walls.create(673, 397, 'wall');  // Right wall
        
        
        // === WATER HAZARD (with crayon-like blue fill) ===
        const waterGraphics = this.add.graphics();
        
        // Build wavy surface points
        const waterPoints = [{x: 0, y: 870}];
        for (let x = 0; x <= 700; x += 15) {
            const waveY = 870 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterPoints.push({x: x, y: waveY});
        }
        
        // Blue crayon fill for water body
        waterGraphics.fillStyle(0x4A90D9, 0.24);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 870);
        for (const pt of waterPoints) {
            waterGraphics.lineTo(pt.x, pt.y);
        }
        waterGraphics.lineTo(700, 900);  // bottom right
        waterGraphics.lineTo(0, 900);    // bottom left
        waterGraphics.closePath();
        waterGraphics.fillPath();
        
        // Crayon strokes for water
        waterGraphics.lineStyle(0.5, 0x2070B0, 0.2);
        for (let y = 872; y < 900; y += 5) {
            waterGraphics.beginPath();
            waterGraphics.moveTo((Math.random() - 0.5) * 4, y + (Math.random() - 0.5) * 2);
            waterGraphics.lineTo(700 + (Math.random() - 0.5) * 4, y + 8 + (Math.random() - 0.5) * 2);
            waterGraphics.strokePath();
        }
        
        // Wavy surface line
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(waterPoints[0].x, waterPoints[0].y);
        for (let i = 1; i < waterPoints.length; i++) {
            waterGraphics.lineTo(waterPoints[i].x, waterPoints[i].y);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection (below the line)
        this.waterZone = this.add.zone(350, 885, 700, 30);
        this.physics.add.existing(this.waterZone, true);  // true = static body
        
        
        // === PLATFORMS (using shape library) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Helper function to draw a sketchy shape
        this.createSketchyShape = (shapeName, shapeData) => {
            const g = this.add.graphics();
            const wobble = () => (Math.random() - 0.5) * 2;
            
            g.lineStyle(2, 0x1a1a1a);  // Dark pen color
            
            // Check if this is a compound shape (has parts array)
            if (shapeData.parts) {
                // Compound shape: check if it has custom visual outline (points) or just draw parts
                if (shapeData.outlines) {
                    // Has multiple outline groups - draw each as connected shape
                    for (const outline of shapeData.outlines) {
                        // Crayon-like fill
                        g.fillStyle(0x888888, 0.24);
                        g.beginPath();
                        g.moveTo(outline[0].x + 3, outline[0].y + 3);
                        for (let i = 1; i < outline.length; i++) {
                            g.lineTo(outline[i].x + 3, outline[i].y + 3);
                        }
                        g.closePath();
                        g.fillPath();
                    }
                    
                    // Add crayon strokes across the whole shape
                    g.lineStyle(0.5, 0x666666, 0.15);
                    for (let y = 0; y < shapeData.height; y += 6) {
                        g.beginPath();
                        g.moveTo(3 + wobble(), y + 3 + wobble());
                        g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
                        g.strokePath();
                    }
                    g.lineStyle(2, 0x1a1a1a);
                    
                    // Draw outlines
                    for (const outline of shapeData.outlines) {
                        g.beginPath();
                        g.moveTo(outline[0].x + wobble() + 3, outline[0].y + wobble() + 3);
                        for (let i = 1; i < outline.length; i++) {
                            g.lineTo(outline[i].x + wobble() + 3, outline[i].y + wobble() + 3);
                        }
                        g.closePath();
                        g.strokePath();
                    }
                } else {
                    // No custom outline - draw each part as separate rectangle
                    for (const part of shapeData.parts) {
                        // Crayon-like fill
                        g.fillStyle(0x888888, 0.24);
                        g.fillRect(part.x + 3, part.y + 3, part.w, part.h);
                    }
                    
                    // Add crayon strokes
                    g.lineStyle(0.5, 0x666666, 0.15);
                    for (let y = 0; y < shapeData.height; y += 6) {
                        g.beginPath();
                        g.moveTo(3 + wobble(), y + 3 + wobble());
                        g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
                        g.strokePath();
                    }
                    g.lineStyle(2, 0x1a1a1a);
                    
                    // Draw outlines
                    for (const part of shapeData.parts) {
                        g.beginPath();
                        g.moveTo(part.x + wobble() + 3, part.y + wobble() + 3);
                        g.lineTo(part.x + part.w + wobble() + 3, part.y + wobble() + 3);
                        g.lineTo(part.x + part.w + wobble() + 3, part.y + part.h + wobble() + 3);
                        g.lineTo(part.x + wobble() + 3, part.y + part.h + wobble() + 3);
                        g.lineTo(part.x + wobble() + 3, part.y + wobble() + 3);
                        g.strokePath();
                    }
                }
            } else {
                // Simple shape: draw from points array (original behavior)
                const points = shapeData.points;
                
                // Crayon-like fill
                g.fillStyle(0x888888, 0.24);
                g.beginPath();
                g.moveTo(points[0].x + 3, points[0].y + 3);
                for (let i = 1; i < points.length; i++) {
                    g.lineTo(points[i].x + 3, points[i].y + 3);
                }
                g.closePath();
                g.fillPath();
                
                // Add subtle diagonal crayon strokes
                g.lineStyle(0.5, 0x666666, 0.15);
                for (let y = 0; y < shapeData.height; y += 6) {
                    g.beginPath();
                    g.moveTo(3 + wobble(), y + 3 + wobble());
                    g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
                    g.strokePath();
                }
                g.lineStyle(2, 0x1a1a1a);  // Reset for outline
                
                // Outline
                g.beginPath();
                g.moveTo(points[0].x + wobble() + 3, points[0].y + wobble() + 3);
                for (let i = 1; i < points.length; i++) {
                    g.lineTo(points[i].x + wobble() + 3, points[i].y + wobble() + 3);
                }
                g.lineTo(points[0].x + wobble() + 3, points[0].y + wobble() + 3);
                g.strokePath();
            }
            
            g.generateTexture(shapeName, shapeData.width + 6, shapeData.height + 6);
            g.destroy();
        };
        
        // Generate textures for all shapes in the library (only if they don't exist)
        for (const [name, data] of Object.entries(PLATFORM_SHAPES)) {
            if (!this.textures.exists(name)) {
                this.createSketchyShape(name, data);
            }
        }
        
        // Select level layout (use passed index or default to 0)
        this.currentLayoutIndex = (this.scene.settings.data && this.scene.settings.data.layoutIndex !== undefined) 
            ? this.scene.settings.data.layoutIndex 
            : 0;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex])
        
        
        // === PLAYER (hand-drawn stick figure - 0.75x original) ===
        if (!this.textures.exists('player')) {
            const playerGraphics = this.add.graphics();
            playerGraphics.lineStyle(1.5, 0x1a1a1a);  // Black pen
            
            // Simple stick figure: head, body, legs
            // Head (circle)
            playerGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 5.25);
            playerGraphics.lineTo(4.5, 10.5);
            playerGraphics.strokePath();
            // Arms (line across)
            playerGraphics.beginPath();
            playerGraphics.moveTo(1.5, 7.5);
            playerGraphics.lineTo(7.5, 7.5);
            playerGraphics.strokePath();
            // Legs (two lines)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(2.25, 15);
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(6.75, 15);
            playerGraphics.strokePath();
            
            playerGraphics.generateTexture('player', 9, 17);
            playerGraphics.destroy();
        }
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        
        // Player dies if they touch water!
        this.physics.add.overlap(this.player, this.waterZone, this.playerDied, null, this);
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Mouse input for shooting (and continuing after level complete)
        this.input.on('pointerdown', (pointer) => {
            if (this.levelInProgress) {
                this.shoot(pointer.x, pointer.y);
            } else {
                // Level is complete, click to start next level
                this.startNextLevel();
            }
        });
        
        
        // === BULLETS ===
        // === BULLET (hand-drawn dash) ===
        if (!this.textures.exists('bullet')) {
            const bulletGraphics = this.add.graphics();
            bulletGraphics.lineStyle(2, 0x1a1a1a);  // Black pen stroke
            bulletGraphics.beginPath();
            bulletGraphics.moveTo(0, 2);
            bulletGraphics.lineTo(8, 2);
            bulletGraphics.strokePath();
            bulletGraphics.generateTexture('bullet', 10, 4);
            bulletGraphics.destroy();
        }
        
        // Now create the group that uses the texture
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });
        
        
        // === ENEMIES ===
        // === ENEMY (hand-drawn stick figure in red - 0.75x original) ===
        if (!this.textures.exists('enemy')) {
            const enemyGraphics = this.add.graphics();
            enemyGraphics.lineStyle(1.5, 0xcc3333);  // Red pen
            
            // Same stick figure shape as player
            // Head (circle)
            enemyGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 5.25);
            enemyGraphics.lineTo(4.5, 10.5);
            enemyGraphics.strokePath();
            // Arms (line across)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(1.5, 7.5);
            enemyGraphics.lineTo(7.5, 7.5);
            enemyGraphics.strokePath();
            // Legs (two lines)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(2.25, 15);
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(6.75, 15);
            enemyGraphics.strokePath();
            
            enemyGraphics.generateTexture('enemy', 9, 17);
            enemyGraphics.destroy();
        }
        
        // Create enemies group
        this.enemies = this.physics.add.group();
        
        // Spawn initial enemies on platforms
        this.spawnEnemy(450, 600);   // Bottom right platform
        this.spawnEnemy(280, 460);   // Middle platform
        this.spawnEnemy(380, 390);   // Row 4
        this.spawnEnemy(380, 250);   // Top platform
        
        // Make enemies collide with platforms (so they sit on them)
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Bullets hit enemies!
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        
        
        // === UI TEXT ===
        // Show some instructions (smaller for notebook canvas)
        this.add.text(60, 16, 'Arrows: move | Click: shoot | R/G: restart/new | F: fly | H: hitbox', {
            fontSize: '9px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Debug controls (R/G/F/H keys)
        this.debugControls = new DebugControls(this);
        
        // Enemy counter (positioned for notebook canvas)
        this.enemyCountText = this.add.text(60, 32, '', {
            fontSize: '11px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        this.updateEnemyCount();
        
        // Level complete text (hidden initially) - centered for 700px canvas
        this.levelCompleteText = this.add.text(350, 400, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '28px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 18, y: 10 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(350, 460, 'Click to continue', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 5 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display
        this.levelText = this.add.text(610, 16, 'Level: 1', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 6, y: 3 }
        });
        
        // Layout number display (for debugging)
        this.layoutText = this.add.text(60, 48, `Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`, {
            fontSize: '11px',
            fill: '#666',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Spawn points will be generated from the layout
        this.spawnPoints = [];
        
        // Player start position (will be set by layout)
        this.playerStartX = 100;
        this.playerStartY = 600;
    }
    
    /**
     * Load a level layout from the library
     */
    loadLayout(layout) {
        // Clear existing platforms
        this.platforms.clear(true, true);
        
        // Clear spawn points
        this.spawnPoints = [];
        
        // Create platforms from layout
        for (const plat of layout.platforms) {
            const shapeData = PLATFORM_SHAPES[plat.shape];
            
            // Check if this is a compound shape (has separate collision parts)
            if (shapeData.parts) {
                // Compound shape: create visual-only sprite + separate collision bodies
                
                // Add visual sprite (no physics)
                const visual = this.add.image(plat.x, plat.y, plat.shape);
                
                // Create collision bodies for each part
                for (const part of shapeData.parts) {
                    // Part coordinates are relative to shape origin (top-left)
                    // Convert to world position (plat.x, plat.y is center of shape)
                    const partX = plat.x - shapeData.width / 2 + part.x + part.w / 2;
                    const partY = plat.y - shapeData.height / 2 + part.y + part.h / 2;
                    
                    // Create invisible collision rectangle
                    const collider = this.add.rectangle(partX, partY, part.w, part.h, 0x000000, 0);
                    this.physics.add.existing(collider, true);  // true = static
                    this.platforms.add(collider);
                }
            } else {
                // Simple shape: single collision body (original behavior)
                const platform = this.platforms.create(plat.x, plat.y, plat.shape);
            }
            
            // Add this platform position as a spawn point
            // Spawn point is on top of the platform
            this.spawnPoints.push({
                x: plat.x,
                y: plat.y - shapeData.height / 2 - 15  // Above the platform
            });
        }
        
        // Set player start to first platform
        if (layout.platforms.length > 0) {
            const firstPlat = layout.platforms[0];
            const firstShape = PLATFORM_SHAPES[firstPlat.shape];
            this.playerStartX = firstPlat.x;
            this.playerStartY = firstPlat.y - firstShape.height / 2 - 15;
        }
    }
    
    /**
     * Spawn an enemy at a position
     */
    spawnEnemy(x, y) {
        const enemy = this.enemies.create(x, y, 'enemy');
        enemy.setBounce(0);
        enemy.setCollideWorldBounds(true);
    }
    
    /**
     * Called when a bullet hits an enemy
     */
    bulletHitEnemy(bullet, enemy) {
        // Deactivate the bullet
        bullet.setActive(false);
        bullet.setVisible(false);
        
        // Destroy the enemy
        enemy.destroy();
        
        // Update the counter
        this.updateEnemyCount();
        
        // Check for level complete
        if (this.enemies.countActive() === 0) {
            this.levelComplete();
        }
    }
    
    /**
     * Update the enemy count display
     */
    updateEnemyCount() {
        const count = this.enemies.countActive();
        this.enemyCountText.setText(`Enemies remaining: ${count}`);
    }
    
    /**
     * Called when all enemies are defeated
     */
    levelComplete() {
        this.levelInProgress = false;
        this.levelCompleteText.setVisible(true);
        this.clickToContinueText.setVisible(true);
    }
    
    /**
     * Start the next level - cycle through layouts and spawn enemies
     */
    startNextLevel() {
        this.currentLevel++;
        this.levelText.setText(`Level: ${this.currentLevel}`);
        
        // Hide completion messages
        this.levelCompleteText.setVisible(false);
        this.clickToContinueText.setVisible(false);
        
        // Clear any remaining bullets
        this.bullets.children.each((bullet) => {
            bullet.setActive(false);
            bullet.setVisible(false);
        });
        
        // Cycle to next layout (or random)
        this.currentLayoutIndex = (this.currentLayoutIndex + 1) % LEVEL_LAYOUTS.length;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex]);
        
        // Re-add platform and wall collisions
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Spawn enemies at random positions
        // More enemies as levels progress (4 + 1 per 2 levels, max based on spawn points)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), this.spawnPoints.length - 1);
        
        // Filter out player start position from spawn points for enemies
        const enemySpawnPoints = this.spawnPoints.filter(
            p => !(Math.abs(p.x - this.playerStartX) < 10 && Math.abs(p.y - this.playerStartY) < 10)
        );
        
        // Shuffle and pick
        const shuffled = Phaser.Utils.Array.Shuffle([...enemySpawnPoints]);
        for (let i = 0; i < enemyCount && i < shuffled.length; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position - use body.reset for proper physics sync
        this.player.body.reset(this.playerStartX, this.playerStartY);
    }
    
    /**
     * Called when player touches water
     */
    playerDied() {
        // Prevent multiple triggers while respawning
        if (this.isRespawning) return;
        this.isRespawning = true;
        
        // Force physics body to fully reset at new position
        // This syncs sprite + physics body immediately to prevent desync
        this.player.body.reset(this.playerStartX, this.playerStartY);
        
        // Brief visual feedback - flash the player
        this.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            this.player.clearTint();
        });
        
        // Clear respawn flag after player has time to land
        this.time.delayedCall(500, () => {
            this.isRespawning = false;
        });
    }

    update() {
        // This runs every frame - handle player movement here
        
        // Check for restart key (same layout)
        if (Phaser.Input.Keyboard.JustDown(this.restartKey)) {
            this.scene.restart({ layoutIndex: this.currentLayoutIndex });
            return;
        }
        
        // Check for new map key (next layout)
        if (Phaser.Input.Keyboard.JustDown(this.newMapKey)) {
            const nextIndex = (this.currentLayoutIndex + 1) % LEVEL_LAYOUTS.length;
            this.scene.restart({ layoutIndex: nextIndex });
            return;
        }
        
        // Toggle fly mode
        if (Phaser.Input.Keyboard.JustDown(this.flyKey)) {
            this.flyMode = !this.flyMode;
            this.player.body.allowGravity = !this.flyMode;
            if (this.flyMode) {
                this.player.setVelocity(0, 0);
            }
        }
        
        // Toggle hitbox debug display
        if (Phaser.Input.Keyboard.JustDown(this.hitboxKey)) {
            if (this.physics.world.debugGraphic) {
                this.physics.world.debugGraphic.visible = !this.physics.world.debugGraphic.visible;
            }
        }
        
        const speed = 120;  // Scaled down for smaller characters
        const flySpeed = 200;  // Speed when flying
        const jumpVelocity = -280;  // Scaled down - smaller jump for zoomed-out feel
        
        // Left/Right movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(this.flyMode ? -flySpeed : -speed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(this.flyMode ? flySpeed : speed);
        } else {
            // No arrow pressed - stop horizontal movement
            this.player.setVelocityX(0);
        }
        
        // Up/Down movement (fly mode) or jumping (normal mode)
        if (this.flyMode) {
            // Fly mode: up/down arrows move vertically
            if (this.cursors.up.isDown) {
                this.player.setVelocityY(-flySpeed);
            } else if (this.cursors.down.isDown) {
                this.player.setVelocityY(flySpeed);
            } else {
                this.player.setVelocityY(0);
            }
        } else {
            // Normal mode: jumping when touching ground
            if (this.cursors.up.isDown && this.player.body.blocked.down) {
                this.player.setVelocityY(jumpVelocity);
            }
        }
        
        // Clean up bullets that have left the screen
        this.bullets.children.each((bullet) => {
            if (bullet.active && (bullet.x < -50 || bullet.x > 750 || bullet.y < -50 || bullet.y > 950)) {
                bullet.setActive(false);
                bullet.setVisible(false);
            }
        });
    }
    
    /**
     * Shoot a bullet toward a target position
     * @param {number} targetX - X coordinate to shoot toward
     * @param {number} targetY - Y coordinate to shoot toward
     */
    shoot(targetX, targetY) {
        // Get a bullet from the group (reuses inactive bullets)
        const bullet = this.bullets.get(this.player.x, this.player.y);
        
        if (!bullet) return;  // No bullets available
        
        bullet.setActive(true);
        bullet.setVisible(true);
        
        // Calculate direction to target
        const angle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            targetX, targetY
        );
        
        // Set bullet velocity toward target
        const bulletSpeed = 600;
        bullet.setVelocity(
            Math.cos(angle) * bulletSpeed,
            Math.sin(angle) * bulletSpeed
        );
        
        // Rotate bullet to face direction of travel
        bullet.setRotation(angle);
        
        // Bullets shouldn't be affected by gravity
        bullet.body.allowGravity = false;
    }
}


```

```javascript
/**
 * PlayScene - Main gameplay scene
 * 
 * This is where the actual game happens. Phaser scenes have three main methods:
 * - preload(): Load assets (images, sounds, etc.)
 * - create(): Set up game objects, physics, input (runs once when scene starts)
 * - update(): Game loop, runs every frame (~60 times per second)
 */

import { DebugControls } from '../utils/DebugControls.js';

class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        // Load the user-cropped notebook paper background (preserves scale)
        this.load.image('notebook-paper', 'assets/cropped-notebook-page.png');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using cropped image) ===
        // Paper is pre-cropped to edges, just scale to fit canvas
        const paper = this.add.image(350, 450, 'notebook-paper');
        paper.setDisplaySize(700, 900);
        
        
        // === WALLS (hand-drawn style with crayon fill) ===
        const wallGraphics = this.add.graphics();
        
        // Left wall - fill first, then outline
        // Build path points for left wall
        const leftWallPoints = [{x: 55, y: 0}];
        for (let y = 0; y <= 795; y += 20) {
            const wobbleX = 55 + (Math.random() - 0.5) * 6 + Math.sin(y * 0.02) * 3;
            leftWallPoints.push({x: wobbleX, y: y});
        }
        leftWallPoints.push({x: 55, y: 795}, {x: 0, y: 795}, {x: 0, y: 0});
        
        // Fill left wall
        wallGraphics.fillStyle(0x888888, 0.24);
        wallGraphics.beginPath();
        wallGraphics.moveTo(leftWallPoints[0].x, leftWallPoints[0].y);
        for (let i = 1; i < leftWallPoints.length; i++) {
            wallGraphics.lineTo(leftWallPoints[i].x, leftWallPoints[i].y);
        }
        wallGraphics.closePath();
        wallGraphics.fillPath();
        
        // Crayon strokes for left wall
        wallGraphics.lineStyle(0.5, 0x666666, 0.15);
        for (let y = 0; y < 795; y += 8) {
            wallGraphics.beginPath();
            wallGraphics.moveTo((Math.random() - 0.5) * 2, y + (Math.random() - 0.5) * 2);
            wallGraphics.lineTo(50 + (Math.random() - 0.5) * 10, y + 15 + (Math.random() - 0.5) * 2);
            wallGraphics.strokePath();
        }
        
        // Outline left wall
        wallGraphics.lineStyle(2.5, 0x1a1a1a);
        wallGraphics.beginPath();
        wallGraphics.moveTo(55, 0);
        for (let i = 1; i < leftWallPoints.length - 2; i++) {
            wallGraphics.lineTo(leftWallPoints[i].x, leftWallPoints[i].y);
        }
        wallGraphics.lineTo(55, 795);
        wallGraphics.lineTo(0, 795);
        wallGraphics.strokePath();
        
        // Right wall - fill first, then outline
        const rightWallPoints = [{x: 645, y: 0}];
        for (let y = 0; y <= 795; y += 20) {
            const wobbleX = 645 + (Math.random() - 0.5) * 6 + Math.sin(y * 0.025 + 1) * 3;
            rightWallPoints.push({x: wobbleX, y: y});
        }
        rightWallPoints.push({x: 645, y: 795}, {x: 700, y: 795}, {x: 700, y: 0});
        
        // Fill right wall
        wallGraphics.fillStyle(0x888888, 0.24);
        wallGraphics.beginPath();
        wallGraphics.moveTo(rightWallPoints[0].x, rightWallPoints[0].y);
        for (let i = 1; i < rightWallPoints.length; i++) {
            wallGraphics.lineTo(rightWallPoints[i].x, rightWallPoints[i].y);
        }
        wallGraphics.closePath();
        wallGraphics.fillPath();
        
        // Crayon strokes for right wall
        wallGraphics.lineStyle(0.5, 0x666666, 0.15);
        for (let y = 0; y < 795; y += 8) {
            wallGraphics.beginPath();
            wallGraphics.moveTo(650 + (Math.random() - 0.5) * 2, y + (Math.random() - 0.5) * 2);
            wallGraphics.lineTo(700 + (Math.random() - 0.5) * 2, y + 15 + (Math.random() - 0.5) * 2);
            wallGraphics.strokePath();
        }
        
        // Outline right wall
        wallGraphics.lineStyle(2.5, 0x1a1a1a);
        wallGraphics.beginPath();
        wallGraphics.moveTo(645, 0);
        for (let i = 1; i < rightWallPoints.length - 2; i++) {
            wallGraphics.lineTo(rightWallPoints[i].x, rightWallPoints[i].y);
        }
        wallGraphics.lineTo(645, 795);
        wallGraphics.lineTo(700, 795);
        wallGraphics.strokePath();
        
        // Wall collision bodies (invisible rectangles)
        this.walls = this.physics.add.staticGroup();
        
        // Create wall collision textures (only if they don't exist)
        if (!this.textures.exists('wall')) {
            const wallTexture = this.add.graphics();
            wallTexture.fillStyle(0x000000, 0);  // Invisible
            wallTexture.fillRect(0, 0, 50, 795);
            wallTexture.generateTexture('wall', 50, 795);
            wallTexture.destroy();
        }
        
        // Add collision walls (positioned so player stays in play area)
        this.walls.create(27, 397, 'wall');   // Left wall
        this.walls.create(673, 397, 'wall');  // Right wall
        
        
        // === WATER HAZARD (with crayon-like blue fill) ===
        const waterGraphics = this.add.graphics();
        
        // Build wavy surface points
        const waterPoints = [{x: 0, y: 870}];
        for (let x = 0; x <= 700; x += 15) {
            const waveY = 870 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterPoints.push({x: x, y: waveY});
        }
        
        // Blue crayon fill for water body
        waterGraphics.fillStyle(0x4A90D9, 0.24);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 870);
        for (const pt of waterPoints) {
            waterGraphics.lineTo(pt.x, pt.y);
        }
        waterGraphics.lineTo(700, 900);  // bottom right
        waterGraphics.lineTo(0, 900);    // bottom left
        waterGraphics.closePath();
        waterGraphics.fillPath();
        
        // Crayon strokes for water
        waterGraphics.lineStyle(0.5, 0x2070B0, 0.2);
        for (let y = 872; y < 900; y += 5) {
            waterGraphics.beginPath();
            waterGraphics.moveTo((Math.random() - 0.5) * 4, y + (Math.random() - 0.5) * 2);
            waterGraphics.lineTo(700 + (Math.random() - 0.5) * 4, y + 8 + (Math.random() - 0.5) * 2);
            waterGraphics.strokePath();
        }
        
        // Wavy surface line
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(waterPoints[0].x, waterPoints[0].y);
        for (let i = 1; i < waterPoints.length; i++) {
            waterGraphics.lineTo(waterPoints[i].x, waterPoints[i].y);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection (below the line)
        this.waterZone = this.add.zone(350, 885, 700, 30);
        this.physics.add.existing(this.waterZone, true);  // true = static body
        
        
        // === PLATFORMS (using shape library) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Helper function to draw a sketchy shape
        this.createSketchyShape = (shapeName, shapeData) => {
            const g = this.add.graphics();
            const wobble = () => (Math.random() - 0.5) * 2;
            
            g.lineStyle(2, 0x1a1a1a);  // Dark pen color
            
            // Check if this is a compound shape (has parts array)
            if (shapeData.parts) {
                // Compound shape: check if it has custom visual outline (points) or just draw parts
                if (shapeData.outlines) {
                    // Has multiple outline groups - draw each as connected shape
                    for (const outline of shapeData.outlines) {
                        // Crayon-like fill
                        g.fillStyle(0x888888, 0.24);
                        g.beginPath();
                        g.moveTo(outline[0].x + 3, outline[0].y + 3);
                        for (let i = 1; i < outline.length; i++) {
                            g.lineTo(outline[i].x + 3, outline[i].y + 3);
                        }
                        g.closePath();
                        g.fillPath();
                    }
                    
                    // Add crayon strokes across the whole shape
                    g.lineStyle(0.5, 0x666666, 0.15);
                    for (let y = 0; y < shapeData.height; y += 6) {
                        g.beginPath();
                        g.moveTo(3 + wobble(), y + 3 + wobble());
                        g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
                        g.strokePath();
                    }
                    g.lineStyle(2, 0x1a1a1a);
                    
                    // Draw outlines
                    for (const outline of shapeData.outlines) {
                        g.beginPath();
                        g.moveTo(outline[0].x + wobble() + 3, outline[0].y + wobble() + 3);
                        for (let i = 1; i < outline.length; i++) {
                            g.lineTo(outline[i].x + wobble() + 3, outline[i].y + wobble() + 3);
                        }
                        g.closePath();
                        g.strokePath();
                    }
                } else {
                    // No custom outline - draw each part as separate rectangle
                    for (const part of shapeData.parts) {
                        // Crayon-like fill
                        g.fillStyle(0x888888, 0.24);
                        g.fillRect(part.x + 3, part.y + 3, part.w, part.h);
                    }
                    
                    // Add crayon strokes
                    g.lineStyle(0.5, 0x666666, 0.15);
                    for (let y = 0; y < shapeData.height; y += 6) {
                        g.beginPath();
                        g.moveTo(3 + wobble(), y + 3 + wobble());
                        g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
                        g.strokePath();
                    }
                    g.lineStyle(2, 0x1a1a1a);
                    
                    // Draw outlines
                    for (const part of shapeData.parts) {
                        g.beginPath();
                        g.moveTo(part.x + wobble() + 3, part.y + wobble() + 3);
                        g.lineTo(part.x + part.w + wobble() + 3, part.y + wobble() + 3);
                        g.lineTo(part.x + part.w + wobble() + 3, part.y + part.h + wobble() + 3);
                        g.lineTo(part.x + wobble() + 3, part.y + part.h + wobble() + 3);
                        g.lineTo(part.x + wobble() + 3, part.y + wobble() + 3);
                        g.strokePath();
                    }
                }
            } else {
                // Simple shape: draw from points array (original behavior)
                const points = shapeData.points;
                
                // Crayon-like fill
                g.fillStyle(0x888888, 0.24);
                g.beginPath();
                g.moveTo(points[0].x + 3, points[0].y + 3);
                for (let i = 1; i < points.length; i++) {
                    g.lineTo(points[i].x + 3, points[i].y + 3);
                }
                g.closePath();
                g.fillPath();
                
                // Add subtle diagonal crayon strokes
                g.lineStyle(0.5, 0x666666, 0.15);
                for (let y = 0; y < shapeData.height; y += 6) {
                    g.beginPath();
                    g.moveTo(3 + wobble(), y + 3 + wobble());
                    g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
                    g.strokePath();
                }
                g.lineStyle(2, 0x1a1a1a);  // Reset for outline
                
                // Outline
                g.beginPath();
                g.moveTo(points[0].x + wobble() + 3, points[0].y + wobble() + 3);
                for (let i = 1; i < points.length; i++) {
                    g.lineTo(points[i].x + wobble() + 3, points[i].y + wobble() + 3);
                }
                g.lineTo(points[0].x + wobble() + 3, points[0].y + wobble() + 3);
                g.strokePath();
            }
            
            g.generateTexture(shapeName, shapeData.width + 6, shapeData.height + 6);
            g.destroy();
        };
        
        // Generate textures for all shapes in the library (only if they don't exist)
        for (const [name, data] of Object.entries(PLATFORM_SHAPES)) {
            if (!this.textures.exists(name)) {
                this.createSketchyShape(name, data);
            }
        }
        
        // Select level layout (use passed index or default to 0)
        this.currentLayoutIndex = (this.scene.settings.data && this.scene.settings.data.layoutIndex !== undefined) 
            ? this.scene.settings.data.layoutIndex 
            : 0;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex])
        
        
        // === PLAYER (hand-drawn stick figure - 0.75x original) ===
        if (!this.textures.exists('player')) {
            const playerGraphics = this.add.graphics();
            playerGraphics.lineStyle(1.5, 0x1a1a1a);  // Black pen
            
            // Simple stick figure: head, body, legs
            // Head (circle)
            playerGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 5.25);
            playerGraphics.lineTo(4.5, 10.5);
            playerGraphics.strokePath();
            // Arms (line across)
            playerGraphics.beginPath();
            playerGraphics.moveTo(1.5, 7.5);
            playerGraphics.lineTo(7.5, 7.5);
            playerGraphics.strokePath();
            // Legs (two lines)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(2.25, 15);
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(6.75, 15);
            playerGraphics.strokePath();
            
            playerGraphics.generateTexture('player', 9, 17);
            playerGraphics.destroy();
        }
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        
        // Player dies if they touch water!
        this.physics.add.overlap(this.player, this.waterZone, this.playerDied, null, this);
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Mouse input for shooting (and continuing after level complete)
        this.input.on('pointerdown', (pointer) => {
            if (this.levelInProgress) {
                this.shoot(pointer.x, pointer.y);
            } else {
                // Level is complete, click to start next level
                this.startNextLevel();
            }
        });
        
        
        // === BULLETS ===
        // === BULLET (hand-drawn dash) ===
        if (!this.textures.exists('bullet')) {
            const bulletGraphics = this.add.graphics();
            bulletGraphics.lineStyle(2, 0x1a1a1a);  // Black pen stroke
            bulletGraphics.beginPath();
            bulletGraphics.moveTo(0, 2);
            bulletGraphics.lineTo(8, 2);
            bulletGraphics.strokePath();
            bulletGraphics.generateTexture('bullet', 10, 4);
            bulletGraphics.destroy();
        }
        
        // Now create the group that uses the texture
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });
        
        
        // === ENEMIES ===
        // === ENEMY (hand-drawn stick figure in red - 0.75x original) ===
        if (!this.textures.exists('enemy')) {
            const enemyGraphics = this.add.graphics();
            enemyGraphics.lineStyle(1.5, 0xcc3333);  // Red pen
            
            // Same stick figure shape as player
            // Head (circle)
            enemyGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 5.25);
            enemyGraphics.lineTo(4.5, 10.5);
            enemyGraphics.strokePath();
            // Arms (line across)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(1.5, 7.5);
            enemyGraphics.lineTo(7.5, 7.5);
            enemyGraphics.strokePath();
            // Legs (two lines)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(2.25, 15);
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(6.75, 15);
            enemyGraphics.strokePath();
            
            enemyGraphics.generateTexture('enemy', 9, 17);
            enemyGraphics.destroy();
        }
        
        // Create enemies group
        this.enemies = this.physics.add.group();
        
        // Spawn initial enemies on platforms
        this.spawnEnemy(450, 600);   // Bottom right platform
        this.spawnEnemy(280, 460);   // Middle platform
        this.spawnEnemy(380, 390);   // Row 4
        this.spawnEnemy(380, 250);   // Top platform
        
        // Make enemies collide with platforms (so they sit on them)
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Bullets hit enemies!
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        
        
        // === UI TEXT ===
        // Show some instructions (smaller for notebook canvas)
        this.add.text(60, 16, 'Arrows: move | Click: shoot | R/G: restart/new | F: fly | H: hitbox', {
            fontSize: '9px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Debug controls (R/G/F/H keys)
        this.debugControls = new DebugControls(this);
        
        // Enemy counter (positioned for notebook canvas)
        this.enemyCountText = this.add.text(60, 32, '', {
            fontSize: '11px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        this.updateEnemyCount();
        
        // Level complete text (hidden initially) - centered for 700px canvas
        this.levelCompleteText = this.add.text(350, 400, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '28px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 18, y: 10 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(350, 460, 'Click to continue', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 5 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display
        this.levelText = this.add.text(610, 16, 'Level: 1', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 6, y: 3 }
        });
        
        // Layout number display (for debugging)
        this.layoutText = this.add.text(60, 48, `Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`, {
            fontSize: '11px',
            fill: '#666',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Spawn points will be generated from the layout
        this.spawnPoints = [];
        
        // Player start position (will be set by layout)
        this.playerStartX = 100;
        this.playerStartY = 600;
    }
    
    /**
     * Load a level layout from the library
     */
    loadLayout(layout) {
        // Clear existing platforms
        this.platforms.clear(true, true);
        
        // Clear spawn points
        this.spawnPoints = [];
        
        // Create platforms from layout
        for (const plat of layout.platforms) {
            const shapeData = PLATFORM_SHAPES[plat.shape];
            
            // Check if this is a compound shape (has separate collision parts)
            if (shapeData.parts) {
                // Compound shape: create visual-only sprite + separate collision bodies
                
                // Add visual sprite (no physics)
                const visual = this.add.image(plat.x, plat.y, plat.shape);
                
                // Create collision bodies for each part
                for (const part of shapeData.parts) {
                    // Part coordinates are relative to shape origin (top-left)
                    // Convert to world position (plat.x, plat.y is center of shape)
                    const partX = plat.x - shapeData.width / 2 + part.x + part.w / 2;
                    const partY = plat.y - shapeData.height / 2 + part.y + part.h / 2;
                    
                    // Create invisible collision rectangle
                    const collider = this.add.rectangle(partX, partY, part.w, part.h, 0x000000, 0);
                    this.physics.add.existing(collider, true);  // true = static
                    this.platforms.add(collider);
                }
            } else {
                // Simple shape: single collision body (original behavior)
                const platform = this.platforms.create(plat.x, plat.y, plat.shape);
            }
            
            // Add this platform position as a spawn point
            // Spawn point is on top of the platform
            this.spawnPoints.push({
                x: plat.x,
                y: plat.y - shapeData.height / 2 - 15  // Above the platform
            });
        }
        
        // Set player start to first platform
        if (layout.platforms.length > 0) {
            const firstPlat = layout.platforms[0];
            const firstShape = PLATFORM_SHAPES[firstPlat.shape];
            this.playerStartX = firstPlat.x;
            this.playerStartY = firstPlat.y - firstShape.height / 2 - 15;
        }
    }
    
    /**
     * Spawn an enemy at a position
     */
    spawnEnemy(x, y) {
        const enemy = this.enemies.create(x, y, 'enemy');
        enemy.setBounce(0);
        enemy.setCollideWorldBounds(true);
    }
    
    /**
     * Called when a bullet hits an enemy
     */
    bulletHitEnemy(bullet, enemy) {
        // Deactivate the bullet
        bullet.setActive(false);
        bullet.setVisible(false);
        
        // Destroy the enemy
        enemy.destroy();
        
        // Update the counter
        this.updateEnemyCount();
        
        // Check for level complete
        if (this.enemies.countActive() === 0) {
            this.levelComplete();
        }
    }
    
    /**
     * Update the enemy count display
     */
    updateEnemyCount() {
        const count = this.enemies.countActive();
        this.enemyCountText.setText(`Enemies remaining: ${count}`);
    }
    
    /**
     * Called when all enemies are defeated
     */
    levelComplete() {
        this.levelInProgress = false;
        this.levelCompleteText.setVisible(true);
        this.clickToContinueText.setVisible(true);
    }
    
    /**
     * Start the next level - cycle through layouts and spawn enemies
     */
    startNextLevel() {
        this.currentLevel++;
        this.levelText.setText(`Level: ${this.currentLevel}`);
        
        // Hide completion messages
        this.levelCompleteText.setVisible(false);
        this.clickToContinueText.setVisible(false);
        
        // Clear any remaining bullets
        this.bullets.children.each((bullet) => {
            bullet.setActive(false);
            bullet.setVisible(false);
        });
        
        // Cycle to next layout (or random)
        this.currentLayoutIndex = (this.currentLayoutIndex + 1) % LEVEL_LAYOUTS.length;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex]);
        
        // Re-add platform and wall collisions
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Spawn enemies at random positions
        // More enemies as levels progress (4 + 1 per 2 levels, max based on spawn points)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), this.spawnPoints.length - 1);
        
        // Filter out player start position from spawn points for enemies
        const enemySpawnPoints = this.spawnPoints.filter(
            p => !(Math.abs(p.x - this.playerStartX) < 10 && Math.abs(p.y - this.playerStartY) < 10)
        );
        
        // Shuffle and pick
        const shuffled = Phaser.Utils.Array.Shuffle([...enemySpawnPoints]);
        for (let i = 0; i < enemyCount && i < shuffled.length; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position - use body.reset for proper physics sync
        this.player.body.reset(this.playerStartX, this.playerStartY);
    }
    
    /**
     * Called when player touches water
     */
    playerDied() {
        // Prevent multiple triggers while respawning
        if (this.isRespawning) return;
        this.isRespawning = true;
        
        // Force physics body to fully reset at new position
        // This syncs sprite + physics body immediately to prevent desync
        this.player.body.reset(this.playerStartX, this.playerStartY);
        
        // Brief visual feedback - flash the player
        this.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            this.player.clearTint();
        });
        
        // Clear respawn flag after player has time to land
        this.time.delayedCall(500, () => {
            this.isRespawning = false;
        });
    }

    update() {
        // This runs every frame - handle player movement here
        
        // Check debug controls (R/G/F/H keys)
        const debugAction = this.debugControls.update(this.player, this.currentLayoutIndex, LEVEL_LAYOUTS.length);
        if (debugAction) {
            if (debugAction.action === 'restart') {
                this.scene.restart({ layoutIndex: debugAction.layoutIndex });
                return;
            }
            // flyToggled and hitboxToggled are handled internally by DebugControls
        }
        
        const speed = 120;  // Scaled down for smaller characters
        const flySpeed = 200;  // Speed when flying
        const jumpVelocity = -280;  // Scaled down - smaller jump for zoomed-out feel
        
        // Left/Right movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(this.flyMode ? -flySpeed : -speed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(this.flyMode ? flySpeed : speed);
        } else {
            // No arrow pressed - stop horizontal movement
            this.player.setVelocityX(0);
        }
        
        // Up/Down movement (fly mode) or jumping (normal mode)
        if (this.flyMode) {
            // Fly mode: up/down arrows move vertically
            if (this.cursors.up.isDown) {
                this.player.setVelocityY(-flySpeed);
            } else if (this.cursors.down.isDown) {
                this.player.setVelocityY(flySpeed);
            } else {
                this.player.setVelocityY(0);
            }
        } else {
            // Normal mode: jumping when touching ground
            if (this.cursors.up.isDown && this.player.body.blocked.down) {
                this.player.setVelocityY(jumpVelocity);
            }
        }
        
        // Clean up bullets that have left the screen
        this.bullets.children.each((bullet) => {
            if (bullet.active && (bullet.x < -50 || bullet.x > 750 || bullet.y < -50 || bullet.y > 950)) {
                bullet.setActive(false);
                bullet.setVisible(false);
            }
        });
    }
    
    /**
     * Shoot a bullet toward a target position
     * @param {number} targetX - X coordinate to shoot toward
     * @param {number} targetY - Y coordinate to shoot toward
     */
    shoot(targetX, targetY) {
        // Get a bullet from the group (reuses inactive bullets)
        const bullet = this.bullets.get(this.player.x, this.player.y);
        
        if (!bullet) return;  // No bullets available
        
        bullet.setActive(true);
        bullet.setVisible(true);
        
        // Calculate direction to target
        const angle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            targetX, targetY
        );
        
        // Set bullet velocity toward target
        const bulletSpeed = 600;
        bullet.setVelocity(
            Math.cos(angle) * bulletSpeed,
            Math.sin(angle) * bulletSpeed
        );
        
        // Rotate bullet to face direction of travel
        bullet.setRotation(angle);
        
        // Bullets shouldn't be affected by gravity
        bullet.body.allowGravity = false;
    }
}


```

Now I need to update the references to `this.flyMode` to use the new module:

```javascript
/**
 * PlayScene - Main gameplay scene
 * 
 * This is where the actual game happens. Phaser scenes have three main methods:
 * - preload(): Load assets (images, sounds, etc.)
 * - create(): Set up game objects, physics, input (runs once when scene starts)
 * - update(): Game loop, runs every frame (~60 times per second)
 */

import { DebugControls } from '../utils/DebugControls.js';

class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        // Load the user-cropped notebook paper background (preserves scale)
        this.load.image('notebook-paper', 'assets/cropped-notebook-page.png');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using cropped image) ===
        // Paper is pre-cropped to edges, just scale to fit canvas
        const paper = this.add.image(350, 450, 'notebook-paper');
        paper.setDisplaySize(700, 900);
        
        
        // === WALLS (hand-drawn style with crayon fill) ===
        const wallGraphics = this.add.graphics();
        
        // Left wall - fill first, then outline
        // Build path points for left wall
        const leftWallPoints = [{x: 55, y: 0}];
        for (let y = 0; y <= 795; y += 20) {
            const wobbleX = 55 + (Math.random() - 0.5) * 6 + Math.sin(y * 0.02) * 3;
            leftWallPoints.push({x: wobbleX, y: y});
        }
        leftWallPoints.push({x: 55, y: 795}, {x: 0, y: 795}, {x: 0, y: 0});
        
        // Fill left wall
        wallGraphics.fillStyle(0x888888, 0.24);
        wallGraphics.beginPath();
        wallGraphics.moveTo(leftWallPoints[0].x, leftWallPoints[0].y);
        for (let i = 1; i < leftWallPoints.length; i++) {
            wallGraphics.lineTo(leftWallPoints[i].x, leftWallPoints[i].y);
        }
        wallGraphics.closePath();
        wallGraphics.fillPath();
        
        // Crayon strokes for left wall
        wallGraphics.lineStyle(0.5, 0x666666, 0.15);
        for (let y = 0; y < 795; y += 8) {
            wallGraphics.beginPath();
            wallGraphics.moveTo((Math.random() - 0.5) * 2, y + (Math.random() - 0.5) * 2);
            wallGraphics.lineTo(50 + (Math.random() - 0.5) * 10, y + 15 + (Math.random() - 0.5) * 2);
            wallGraphics.strokePath();
        }
        
        // Outline left wall
        wallGraphics.lineStyle(2.5, 0x1a1a1a);
        wallGraphics.beginPath();
        wallGraphics.moveTo(55, 0);
        for (let i = 1; i < leftWallPoints.length - 2; i++) {
            wallGraphics.lineTo(leftWallPoints[i].x, leftWallPoints[i].y);
        }
        wallGraphics.lineTo(55, 795);
        wallGraphics.lineTo(0, 795);
        wallGraphics.strokePath();
        
        // Right wall - fill first, then outline
        const rightWallPoints = [{x: 645, y: 0}];
        for (let y = 0; y <= 795; y += 20) {
            const wobbleX = 645 + (Math.random() - 0.5) * 6 + Math.sin(y * 0.025 + 1) * 3;
            rightWallPoints.push({x: wobbleX, y: y});
        }
        rightWallPoints.push({x: 645, y: 795}, {x: 700, y: 795}, {x: 700, y: 0});
        
        // Fill right wall
        wallGraphics.fillStyle(0x888888, 0.24);
        wallGraphics.beginPath();
        wallGraphics.moveTo(rightWallPoints[0].x, rightWallPoints[0].y);
        for (let i = 1; i < rightWallPoints.length; i++) {
            wallGraphics.lineTo(rightWallPoints[i].x, rightWallPoints[i].y);
        }
        wallGraphics.closePath();
        wallGraphics.fillPath();
        
        // Crayon strokes for right wall
        wallGraphics.lineStyle(0.5, 0x666666, 0.15);
        for (let y = 0; y < 795; y += 8) {
            wallGraphics.beginPath();
            wallGraphics.moveTo(650 + (Math.random() - 0.5) * 2, y + (Math.random() - 0.5) * 2);
            wallGraphics.lineTo(700 + (Math.random() - 0.5) * 2, y + 15 + (Math.random() - 0.5) * 2);
            wallGraphics.strokePath();
        }
        
        // Outline right wall
        wallGraphics.lineStyle(2.5, 0x1a1a1a);
        wallGraphics.beginPath();
        wallGraphics.moveTo(645, 0);
        for (let i = 1; i < rightWallPoints.length - 2; i++) {
            wallGraphics.lineTo(rightWallPoints[i].x, rightWallPoints[i].y);
        }
        wallGraphics.lineTo(645, 795);
        wallGraphics.lineTo(700, 795);
        wallGraphics.strokePath();
        
        // Wall collision bodies (invisible rectangles)
        this.walls = this.physics.add.staticGroup();
        
        // Create wall collision textures (only if they don't exist)
        if (!this.textures.exists('wall')) {
            const wallTexture = this.add.graphics();
            wallTexture.fillStyle(0x000000, 0);  // Invisible
            wallTexture.fillRect(0, 0, 50, 795);
            wallTexture.generateTexture('wall', 50, 795);
            wallTexture.destroy();
        }
        
        // Add collision walls (positioned so player stays in play area)
        this.walls.create(27, 397, 'wall');   // Left wall
        this.walls.create(673, 397, 'wall');  // Right wall
        
        
        // === WATER HAZARD (with crayon-like blue fill) ===
        const waterGraphics = this.add.graphics();
        
        // Build wavy surface points
        const waterPoints = [{x: 0, y: 870}];
        for (let x = 0; x <= 700; x += 15) {
            const waveY = 870 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterPoints.push({x: x, y: waveY});
        }
        
        // Blue crayon fill for water body
        waterGraphics.fillStyle(0x4A90D9, 0.24);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 870);
        for (const pt of waterPoints) {
            waterGraphics.lineTo(pt.x, pt.y);
        }
        waterGraphics.lineTo(700, 900);  // bottom right
        waterGraphics.lineTo(0, 900);    // bottom left
        waterGraphics.closePath();
        waterGraphics.fillPath();
        
        // Crayon strokes for water
        waterGraphics.lineStyle(0.5, 0x2070B0, 0.2);
        for (let y = 872; y < 900; y += 5) {
            waterGraphics.beginPath();
            waterGraphics.moveTo((Math.random() - 0.5) * 4, y + (Math.random() - 0.5) * 2);
            waterGraphics.lineTo(700 + (Math.random() - 0.5) * 4, y + 8 + (Math.random() - 0.5) * 2);
            waterGraphics.strokePath();
        }
        
        // Wavy surface line
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(waterPoints[0].x, waterPoints[0].y);
        for (let i = 1; i < waterPoints.length; i++) {
            waterGraphics.lineTo(waterPoints[i].x, waterPoints[i].y);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection (below the line)
        this.waterZone = this.add.zone(350, 885, 700, 30);
        this.physics.add.existing(this.waterZone, true);  // true = static body
        
        
        // === PLATFORMS (using shape library) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Helper function to draw a sketchy shape
        this.createSketchyShape = (shapeName, shapeData) => {
            const g = this.add.graphics();
            const wobble = () => (Math.random() - 0.5) * 2;
            
            g.lineStyle(2, 0x1a1a1a);  // Dark pen color
            
            // Check if this is a compound shape (has parts array)
            if (shapeData.parts) {
                // Compound shape: check if it has custom visual outline (points) or just draw parts
                if (shapeData.outlines) {
                    // Has multiple outline groups - draw each as connected shape
                    for (const outline of shapeData.outlines) {
                        // Crayon-like fill
                        g.fillStyle(0x888888, 0.24);
                        g.beginPath();
                        g.moveTo(outline[0].x + 3, outline[0].y + 3);
                        for (let i = 1; i < outline.length; i++) {
                            g.lineTo(outline[i].x + 3, outline[i].y + 3);
                        }
                        g.closePath();
                        g.fillPath();
                    }
                    
                    // Add crayon strokes across the whole shape
                    g.lineStyle(0.5, 0x666666, 0.15);
                    for (let y = 0; y < shapeData.height; y += 6) {
                        g.beginPath();
                        g.moveTo(3 + wobble(), y + 3 + wobble());
                        g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
                        g.strokePath();
                    }
                    g.lineStyle(2, 0x1a1a1a);
                    
                    // Draw outlines
                    for (const outline of shapeData.outlines) {
                        g.beginPath();
                        g.moveTo(outline[0].x + wobble() + 3, outline[0].y + wobble() + 3);
                        for (let i = 1; i < outline.length; i++) {
                            g.lineTo(outline[i].x + wobble() + 3, outline[i].y + wobble() + 3);
                        }
                        g.closePath();
                        g.strokePath();
                    }
                } else {
                    // No custom outline - draw each part as separate rectangle
                    for (const part of shapeData.parts) {
                        // Crayon-like fill
                        g.fillStyle(0x888888, 0.24);
                        g.fillRect(part.x + 3, part.y + 3, part.w, part.h);
                    }
                    
                    // Add crayon strokes
                    g.lineStyle(0.5, 0x666666, 0.15);
                    for (let y = 0; y < shapeData.height; y += 6) {
                        g.beginPath();
                        g.moveTo(3 + wobble(), y + 3 + wobble());
                        g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
                        g.strokePath();
                    }
                    g.lineStyle(2, 0x1a1a1a);
                    
                    // Draw outlines
                    for (const part of shapeData.parts) {
                        g.beginPath();
                        g.moveTo(part.x + wobble() + 3, part.y + wobble() + 3);
                        g.lineTo(part.x + part.w + wobble() + 3, part.y + wobble() + 3);
                        g.lineTo(part.x + part.w + wobble() + 3, part.y + part.h + wobble() + 3);
                        g.lineTo(part.x + wobble() + 3, part.y + part.h + wobble() + 3);
                        g.lineTo(part.x + wobble() + 3, part.y + wobble() + 3);
                        g.strokePath();
                    }
                }
            } else {
                // Simple shape: draw from points array (original behavior)
                const points = shapeData.points;
                
                // Crayon-like fill
                g.fillStyle(0x888888, 0.24);
                g.beginPath();
                g.moveTo(points[0].x + 3, points[0].y + 3);
                for (let i = 1; i < points.length; i++) {
                    g.lineTo(points[i].x + 3, points[i].y + 3);
                }
                g.closePath();
                g.fillPath();
                
                // Add subtle diagonal crayon strokes
                g.lineStyle(0.5, 0x666666, 0.15);
                for (let y = 0; y < shapeData.height; y += 6) {
                    g.beginPath();
                    g.moveTo(3 + wobble(), y + 3 + wobble());
                    g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
                    g.strokePath();
                }
                g.lineStyle(2, 0x1a1a1a);  // Reset for outline
                
                // Outline
                g.beginPath();
                g.moveTo(points[0].x + wobble() + 3, points[0].y + wobble() + 3);
                for (let i = 1; i < points.length; i++) {
                    g.lineTo(points[i].x + wobble() + 3, points[i].y + wobble() + 3);
                }
                g.lineTo(points[0].x + wobble() + 3, points[0].y + wobble() + 3);
                g.strokePath();
            }
            
            g.generateTexture(shapeName, shapeData.width + 6, shapeData.height + 6);
            g.destroy();
        };
        
        // Generate textures for all shapes in the library (only if they don't exist)
        for (const [name, data] of Object.entries(PLATFORM_SHAPES)) {
            if (!this.textures.exists(name)) {
                this.createSketchyShape(name, data);
            }
        }
        
        // Select level layout (use passed index or default to 0)
        this.currentLayoutIndex = (this.scene.settings.data && this.scene.settings.data.layoutIndex !== undefined) 
            ? this.scene.settings.data.layoutIndex 
            : 0;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex])
        
        
        // === PLAYER (hand-drawn stick figure - 0.75x original) ===
        if (!this.textures.exists('player')) {
            const playerGraphics = this.add.graphics();
            playerGraphics.lineStyle(1.5, 0x1a1a1a);  // Black pen
            
            // Simple stick figure: head, body, legs
            // Head (circle)
            playerGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 5.25);
            playerGraphics.lineTo(4.5, 10.5);
            playerGraphics.strokePath();
            // Arms (line across)
            playerGraphics.beginPath();
            playerGraphics.moveTo(1.5, 7.5);
            playerGraphics.lineTo(7.5, 7.5);
            playerGraphics.strokePath();
            // Legs (two lines)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(2.25, 15);
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(6.75, 15);
            playerGraphics.strokePath();
            
            playerGraphics.generateTexture('player', 9, 17);
            playerGraphics.destroy();
        }
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        
        // Player dies if they touch water!
        this.physics.add.overlap(this.player, this.waterZone, this.playerDied, null, this);
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Mouse input for shooting (and continuing after level complete)
        this.input.on('pointerdown', (pointer) => {
            if (this.levelInProgress) {
                this.shoot(pointer.x, pointer.y);
            } else {
                // Level is complete, click to start next level
                this.startNextLevel();
            }
        });
        
        
        // === BULLETS ===
        // === BULLET (hand-drawn dash) ===
        if (!this.textures.exists('bullet')) {
            const bulletGraphics = this.add.graphics();
            bulletGraphics.lineStyle(2, 0x1a1a1a);  // Black pen stroke
            bulletGraphics.beginPath();
            bulletGraphics.moveTo(0, 2);
            bulletGraphics.lineTo(8, 2);
            bulletGraphics.strokePath();
            bulletGraphics.generateTexture('bullet', 10, 4);
            bulletGraphics.destroy();
        }
        
        // Now create the group that uses the texture
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });
        
        
        // === ENEMIES ===
        // === ENEMY (hand-drawn stick figure in red - 0.75x original) ===
        if (!this.textures.exists('enemy')) {
            const enemyGraphics = this.add.graphics();
            enemyGraphics.lineStyle(1.5, 0xcc3333);  // Red pen
            
            // Same stick figure shape as player
            // Head (circle)
            enemyGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 5.25);
            enemyGraphics.lineTo(4.5, 10.5);
            enemyGraphics.strokePath();
            // Arms (line across)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(1.5, 7.5);
            enemyGraphics.lineTo(7.5, 7.5);
            enemyGraphics.strokePath();
            // Legs (two lines)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(2.25, 15);
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(6.75, 15);
            enemyGraphics.strokePath();
            
            enemyGraphics.generateTexture('enemy', 9, 17);
            enemyGraphics.destroy();
        }
        
        // Create enemies group
        this.enemies = this.physics.add.group();
        
        // Spawn initial enemies on platforms
        this.spawnEnemy(450, 600);   // Bottom right platform
        this.spawnEnemy(280, 460);   // Middle platform
        this.spawnEnemy(380, 390);   // Row 4
        this.spawnEnemy(380, 250);   // Top platform
        
        // Make enemies collide with platforms (so they sit on them)
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Bullets hit enemies!
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        
        
        // === UI TEXT ===
        // Show some instructions (smaller for notebook canvas)
        this.add.text(60, 16, 'Arrows: move | Click: shoot | R/G: restart/new | F: fly | H: hitbox', {
            fontSize: '9px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Debug controls (R/G/F/H keys)
        this.debugControls = new DebugControls(this);
        
        // Enemy counter (positioned for notebook canvas)
        this.enemyCountText = this.add.text(60, 32, '', {
            fontSize: '11px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        this.updateEnemyCount();
        
        // Level complete text (hidden initially) - centered for 700px canvas
        this.levelCompleteText = this.add.text(350, 400, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '28px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 18, y: 10 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(350, 460, 'Click to continue', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 5 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display
        this.levelText = this.add.text(610, 16, 'Level: 1', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 6, y: 3 }
        });
        
        // Layout number display (for debugging)
        this.layoutText = this.add.text(60, 48, `Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`, {
            fontSize: '11px',
            fill: '#666',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Spawn points will be generated from the layout
        this.spawnPoints = [];
        
        // Player start position (will be set by layout)
        this.playerStartX = 100;
        this.playerStartY = 600;
    }
    
    /**
     * Load a level layout from the library
     */
    loadLayout(layout) {
        // Clear existing platforms
        this.platforms.clear(true, true);
        
        // Clear spawn points
        this.spawnPoints = [];
        
        // Create platforms from layout
        for (const plat of layout.platforms) {
            const shapeData = PLATFORM_SHAPES[plat.shape];
            
            // Check if this is a compound shape (has separate collision parts)
            if (shapeData.parts) {
                // Compound shape: create visual-only sprite + separate collision bodies
                
                // Add visual sprite (no physics)
                const visual = this.add.image(plat.x, plat.y, plat.shape);
                
                // Create collision bodies for each part
                for (const part of shapeData.parts) {
                    // Part coordinates are relative to shape origin (top-left)
                    // Convert to world position (plat.x, plat.y is center of shape)
                    const partX = plat.x - shapeData.width / 2 + part.x + part.w / 2;
                    const partY = plat.y - shapeData.height / 2 + part.y + part.h / 2;
                    
                    // Create invisible collision rectangle
                    const collider = this.add.rectangle(partX, partY, part.w, part.h, 0x000000, 0);
                    this.physics.add.existing(collider, true);  // true = static
                    this.platforms.add(collider);
                }
            } else {
                // Simple shape: single collision body (original behavior)
                const platform = this.platforms.create(plat.x, plat.y, plat.shape);
            }
            
            // Add this platform position as a spawn point
            // Spawn point is on top of the platform
            this.spawnPoints.push({
                x: plat.x,
                y: plat.y - shapeData.height / 2 - 15  // Above the platform
            });
        }
        
        // Set player start to first platform
        if (layout.platforms.length > 0) {
            const firstPlat = layout.platforms[0];
            const firstShape = PLATFORM_SHAPES[firstPlat.shape];
            this.playerStartX = firstPlat.x;
            this.playerStartY = firstPlat.y - firstShape.height / 2 - 15;
        }
    }
    
    /**
     * Spawn an enemy at a position
     */
    spawnEnemy(x, y) {
        const enemy = this.enemies.create(x, y, 'enemy');
        enemy.setBounce(0);
        enemy.setCollideWorldBounds(true);
    }
    
    /**
     * Called when a bullet hits an enemy
     */
    bulletHitEnemy(bullet, enemy) {
        // Deactivate the bullet
        bullet.setActive(false);
        bullet.setVisible(false);
        
        // Destroy the enemy
        enemy.destroy();
        
        // Update the counter
        this.updateEnemyCount();
        
        // Check for level complete
        if (this.enemies.countActive() === 0) {
            this.levelComplete();
        }
    }
    
    /**
     * Update the enemy count display
     */
    updateEnemyCount() {
        const count = this.enemies.countActive();
        this.enemyCountText.setText(`Enemies remaining: ${count}`);
    }
    
    /**
     * Called when all enemies are defeated
     */
    levelComplete() {
        this.levelInProgress = false;
        this.levelCompleteText.setVisible(true);
        this.clickToContinueText.setVisible(true);
    }
    
    /**
     * Start the next level - cycle through layouts and spawn enemies
     */
    startNextLevel() {
        this.currentLevel++;
        this.levelText.setText(`Level: ${this.currentLevel}`);
        
        // Hide completion messages
        this.levelCompleteText.setVisible(false);
        this.clickToContinueText.setVisible(false);
        
        // Clear any remaining bullets
        this.bullets.children.each((bullet) => {
            bullet.setActive(false);
            bullet.setVisible(false);
        });
        
        // Cycle to next layout (or random)
        this.currentLayoutIndex = (this.currentLayoutIndex + 1) % LEVEL_LAYOUTS.length;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex]);
        
        // Re-add platform and wall collisions
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Spawn enemies at random positions
        // More enemies as levels progress (4 + 1 per 2 levels, max based on spawn points)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), this.spawnPoints.length - 1);
        
        // Filter out player start position from spawn points for enemies
        const enemySpawnPoints = this.spawnPoints.filter(
            p => !(Math.abs(p.x - this.playerStartX) < 10 && Math.abs(p.y - this.playerStartY) < 10)
        );
        
        // Shuffle and pick
        const shuffled = Phaser.Utils.Array.Shuffle([...enemySpawnPoints]);
        for (let i = 0; i < enemyCount && i < shuffled.length; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position - use body.reset for proper physics sync
        this.player.body.reset(this.playerStartX, this.playerStartY);
    }
    
    /**
     * Called when player touches water
     */
    playerDied() {
        // Prevent multiple triggers while respawning
        if (this.isRespawning) return;
        this.isRespawning = true;
        
        // Force physics body to fully reset at new position
        // This syncs sprite + physics body immediately to prevent desync
        this.player.body.reset(this.playerStartX, this.playerStartY);
        
        // Brief visual feedback - flash the player
        this.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            this.player.clearTint();
        });
        
        // Clear respawn flag after player has time to land
        this.time.delayedCall(500, () => {
            this.isRespawning = false;
        });
    }

    update() {
        // This runs every frame - handle player movement here
        
        // Check debug controls (R/G/F/H keys)
        const debugAction = this.debugControls.update(this.player, this.currentLayoutIndex, LEVEL_LAYOUTS.length);
        if (debugAction) {
            if (debugAction.action === 'restart') {
                this.scene.restart({ layoutIndex: debugAction.layoutIndex });
                return;
            }
            // flyToggled and hitboxToggled are handled internally by DebugControls
        }
        
        const speed = 120;  // Scaled down for smaller characters
        const flySpeed = 200;  // Speed when flying
        const jumpVelocity = -280;  // Scaled down - smaller jump for zoomed-out feel
        
        // Left/Right movement
        const flyMode = this.debugControls.isFlyMode();
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(flyMode ? -flySpeed : -speed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(flyMode ? flySpeed : speed);
        } else {
            // No arrow pressed - stop horizontal movement
            this.player.setVelocityX(0);
        }
        
        // Up/Down movement (fly mode) or jumping (normal mode)
        if (flyMode) {
            // Fly mode: up/down arrows move vertically
            if (this.cursors.up.isDown) {
                this.player.setVelocityY(-flySpeed);
            } else if (this.cursors.down.isDown) {
                this.player.setVelocityY(flySpeed);
            } else {
                this.player.setVelocityY(0);
            }
        } else {
            // Normal mode: jumping when touching ground
            if (this.cursors.up.isDown && this.player.body.blocked.down) {
                this.player.setVelocityY(jumpVelocity);
            }
        }
        
        // Clean up bullets that have left the screen
        this.bullets.children.each((bullet) => {
            if (bullet.active && (bullet.x < -50 || bullet.x > 750 || bullet.y < -50 || bullet.y > 950)) {
                bullet.setActive(false);
                bullet.setVisible(false);
            }
        });
    }
    
    /**
     * Shoot a bullet toward a target position
     * @param {number} targetX - X coordinate to shoot toward
     * @param {number} targetY - Y coordinate to shoot toward
     */
    shoot(targetX, targetY) {
        // Get a bullet from the group (reuses inactive bullets)
        const bullet = this.bullets.get(this.player.x, this.player.y);
        
        if (!bullet) return;  // No bullets available
        
        bullet.setActive(true);
        bullet.setVisible(true);
        
        // Calculate direction to target
        const angle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            targetX, targetY
        );
        
        // Set bullet velocity toward target
        const bulletSpeed = 600;
        bullet.setVelocity(
            Math.cos(angle) * bulletSpeed,
            Math.sin(angle) * bulletSpeed
        );
        
        // Rotate bullet to face direction of travel
        bullet.setRotation(angle);
        
        // Bullets shouldn't be affected by gravity
        bullet.body.allowGravity = false;
    }
}


```

Let me check how the files are loaded to make sure the module system will work:

I see the issue - the project currently uses regular `<script>` tags, not ES6 modules, but I added an `import` statement. Let me convert the project to use ES6 modules (this is cleaner and sets us up for future refactoring).

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stick Figure Arena</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            background-color: #1a1a2e;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        #game-container {
            border: 3px solid #4a4a6a;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div id="game-container"></div>
    
    <!-- Phaser 3 from CDN -->
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js"></script>
    
    <!-- Game entry point (ES6 module - requires local server) -->
    <script type="module" src="js/game.js"></script>
</body>
</html>


```

```javascript
/**
 * Main game configuration
 * This file initializes Phaser with our settings and scenes
 */

import { PlayScene } from './scenes/PlayScene.js';

const config = {
    type: Phaser.AUTO,  // Automatically choose WebGL or Canvas
    width: 700,   // Scaled up notebook paper proportions
    height: 900,
    parent: 'game-container',  // DOM element to put the game in
    
    // Physics configuration
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },  // Gravity pulls things down
            debug: true  // Show collision boxes (helpful for development!)
        }
    },
    
    // Background color (white fallback - actual paper image loads on top)
    backgroundColor: '#ffffff',
    
    // Scenes to include (order matters - first one starts automatically)
    scene: [PlayScene]
};

// Create the game!
const game = new Phaser.Game(config);


```

```javascript
/**
 * PlatformShapes.js - Library of hand-crafted platform shapes
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


/**
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
const LEVEL_LAYOUTS = [
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

```

```javascript
/**
 * PlatformShapes.js - Library of hand-crafted platform shapes
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


/**
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

```

```javascript
/**
 * PlayScene - Main gameplay scene
 * 
 * This is where the actual game happens. Phaser scenes have three main methods:
 * - preload(): Load assets (images, sounds, etc.)
 * - create(): Set up game objects, physics, input (runs once when scene starts)
 * - update(): Game loop, runs every frame (~60 times per second)
 */

import { DebugControls } from '../utils/DebugControls.js';
import { PLATFORM_SHAPES, LEVEL_LAYOUTS } from '../platforms/PlatformShapes.js';

export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        // Load the user-cropped notebook paper background (preserves scale)
        this.load.image('notebook-paper', 'assets/cropped-notebook-page.png');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using cropped image) ===
        // Paper is pre-cropped to edges, just scale to fit canvas
        const paper = this.add.image(350, 450, 'notebook-paper');
        paper.setDisplaySize(700, 900);
        
        
        // === WALLS (hand-drawn style with crayon fill) ===
        const wallGraphics = this.add.graphics();
        
        // Left wall - fill first, then outline
        // Build path points for left wall
        const leftWallPoints = [{x: 55, y: 0}];
        for (let y = 0; y <= 795; y += 20) {
            const wobbleX = 55 + (Math.random() - 0.5) * 6 + Math.sin(y * 0.02) * 3;
            leftWallPoints.push({x: wobbleX, y: y});
        }
        leftWallPoints.push({x: 55, y: 795}, {x: 0, y: 795}, {x: 0, y: 0});
        
        // Fill left wall
        wallGraphics.fillStyle(0x888888, 0.24);
        wallGraphics.beginPath();
        wallGraphics.moveTo(leftWallPoints[0].x, leftWallPoints[0].y);
        for (let i = 1; i < leftWallPoints.length; i++) {
            wallGraphics.lineTo(leftWallPoints[i].x, leftWallPoints[i].y);
        }
        wallGraphics.closePath();
        wallGraphics.fillPath();
        
        // Crayon strokes for left wall
        wallGraphics.lineStyle(0.5, 0x666666, 0.15);
        for (let y = 0; y < 795; y += 8) {
            wallGraphics.beginPath();
            wallGraphics.moveTo((Math.random() - 0.5) * 2, y + (Math.random() - 0.5) * 2);
            wallGraphics.lineTo(50 + (Math.random() - 0.5) * 10, y + 15 + (Math.random() - 0.5) * 2);
            wallGraphics.strokePath();
        }
        
        // Outline left wall
        wallGraphics.lineStyle(2.5, 0x1a1a1a);
        wallGraphics.beginPath();
        wallGraphics.moveTo(55, 0);
        for (let i = 1; i < leftWallPoints.length - 2; i++) {
            wallGraphics.lineTo(leftWallPoints[i].x, leftWallPoints[i].y);
        }
        wallGraphics.lineTo(55, 795);
        wallGraphics.lineTo(0, 795);
        wallGraphics.strokePath();
        
        // Right wall - fill first, then outline
        const rightWallPoints = [{x: 645, y: 0}];
        for (let y = 0; y <= 795; y += 20) {
            const wobbleX = 645 + (Math.random() - 0.5) * 6 + Math.sin(y * 0.025 + 1) * 3;
            rightWallPoints.push({x: wobbleX, y: y});
        }
        rightWallPoints.push({x: 645, y: 795}, {x: 700, y: 795}, {x: 700, y: 0});
        
        // Fill right wall
        wallGraphics.fillStyle(0x888888, 0.24);
        wallGraphics.beginPath();
        wallGraphics.moveTo(rightWallPoints[0].x, rightWallPoints[0].y);
        for (let i = 1; i < rightWallPoints.length; i++) {
            wallGraphics.lineTo(rightWallPoints[i].x, rightWallPoints[i].y);
        }
        wallGraphics.closePath();
        wallGraphics.fillPath();
        
        // Crayon strokes for right wall
        wallGraphics.lineStyle(0.5, 0x666666, 0.15);
        for (let y = 0; y < 795; y += 8) {
            wallGraphics.beginPath();
            wallGraphics.moveTo(650 + (Math.random() - 0.5) * 2, y + (Math.random() - 0.5) * 2);
            wallGraphics.lineTo(700 + (Math.random() - 0.5) * 2, y + 15 + (Math.random() - 0.5) * 2);
            wallGraphics.strokePath();
        }
        
        // Outline right wall
        wallGraphics.lineStyle(2.5, 0x1a1a1a);
        wallGraphics.beginPath();
        wallGraphics.moveTo(645, 0);
        for (let i = 1; i < rightWallPoints.length - 2; i++) {
            wallGraphics.lineTo(rightWallPoints[i].x, rightWallPoints[i].y);
        }
        wallGraphics.lineTo(645, 795);
        wallGraphics.lineTo(700, 795);
        wallGraphics.strokePath();
        
        // Wall collision bodies (invisible rectangles)
        this.walls = this.physics.add.staticGroup();
        
        // Create wall collision textures (only if they don't exist)
        if (!this.textures.exists('wall')) {
            const wallTexture = this.add.graphics();
            wallTexture.fillStyle(0x000000, 0);  // Invisible
            wallTexture.fillRect(0, 0, 50, 795);
            wallTexture.generateTexture('wall', 50, 795);
            wallTexture.destroy();
        }
        
        // Add collision walls (positioned so player stays in play area)
        this.walls.create(27, 397, 'wall');   // Left wall
        this.walls.create(673, 397, 'wall');  // Right wall
        
        
        // === WATER HAZARD (with crayon-like blue fill) ===
        const waterGraphics = this.add.graphics();
        
        // Build wavy surface points
        const waterPoints = [{x: 0, y: 870}];
        for (let x = 0; x <= 700; x += 15) {
            const waveY = 870 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterPoints.push({x: x, y: waveY});
        }
        
        // Blue crayon fill for water body
        waterGraphics.fillStyle(0x4A90D9, 0.24);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 870);
        for (const pt of waterPoints) {
            waterGraphics.lineTo(pt.x, pt.y);
        }
        waterGraphics.lineTo(700, 900);  // bottom right
        waterGraphics.lineTo(0, 900);    // bottom left
        waterGraphics.closePath();
        waterGraphics.fillPath();
        
        // Crayon strokes for water
        waterGraphics.lineStyle(0.5, 0x2070B0, 0.2);
        for (let y = 872; y < 900; y += 5) {
            waterGraphics.beginPath();
            waterGraphics.moveTo((Math.random() - 0.5) * 4, y + (Math.random() - 0.5) * 2);
            waterGraphics.lineTo(700 + (Math.random() - 0.5) * 4, y + 8 + (Math.random() - 0.5) * 2);
            waterGraphics.strokePath();
        }
        
        // Wavy surface line
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(waterPoints[0].x, waterPoints[0].y);
        for (let i = 1; i < waterPoints.length; i++) {
            waterGraphics.lineTo(waterPoints[i].x, waterPoints[i].y);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection (below the line)
        this.waterZone = this.add.zone(350, 885, 700, 30);
        this.physics.add.existing(this.waterZone, true);  // true = static body
        
        
        // === PLATFORMS (using shape library) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Helper function to draw a sketchy shape
        this.createSketchyShape = (shapeName, shapeData) => {
            const g = this.add.graphics();
            const wobble = () => (Math.random() - 0.5) * 2;
            
            g.lineStyle(2, 0x1a1a1a);  // Dark pen color
            
            // Check if this is a compound shape (has parts array)
            if (shapeData.parts) {
                // Compound shape: check if it has custom visual outline (points) or just draw parts
                if (shapeData.outlines) {
                    // Has multiple outline groups - draw each as connected shape
                    for (const outline of shapeData.outlines) {
                        // Crayon-like fill
                        g.fillStyle(0x888888, 0.24);
                        g.beginPath();
                        g.moveTo(outline[0].x + 3, outline[0].y + 3);
                        for (let i = 1; i < outline.length; i++) {
                            g.lineTo(outline[i].x + 3, outline[i].y + 3);
                        }
                        g.closePath();
                        g.fillPath();
                    }
                    
                    // Add crayon strokes across the whole shape
                    g.lineStyle(0.5, 0x666666, 0.15);
                    for (let y = 0; y < shapeData.height; y += 6) {
                        g.beginPath();
                        g.moveTo(3 + wobble(), y + 3 + wobble());
                        g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
                        g.strokePath();
                    }
                    g.lineStyle(2, 0x1a1a1a);
                    
                    // Draw outlines
                    for (const outline of shapeData.outlines) {
                        g.beginPath();
                        g.moveTo(outline[0].x + wobble() + 3, outline[0].y + wobble() + 3);
                        for (let i = 1; i < outline.length; i++) {
                            g.lineTo(outline[i].x + wobble() + 3, outline[i].y + wobble() + 3);
                        }
                        g.closePath();
                        g.strokePath();
                    }
                } else {
                    // No custom outline - draw each part as separate rectangle
                    for (const part of shapeData.parts) {
                        // Crayon-like fill
                        g.fillStyle(0x888888, 0.24);
                        g.fillRect(part.x + 3, part.y + 3, part.w, part.h);
                    }
                    
                    // Add crayon strokes
                    g.lineStyle(0.5, 0x666666, 0.15);
                    for (let y = 0; y < shapeData.height; y += 6) {
                        g.beginPath();
                        g.moveTo(3 + wobble(), y + 3 + wobble());
                        g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
                        g.strokePath();
                    }
                    g.lineStyle(2, 0x1a1a1a);
                    
                    // Draw outlines
                    for (const part of shapeData.parts) {
                        g.beginPath();
                        g.moveTo(part.x + wobble() + 3, part.y + wobble() + 3);
                        g.lineTo(part.x + part.w + wobble() + 3, part.y + wobble() + 3);
                        g.lineTo(part.x + part.w + wobble() + 3, part.y + part.h + wobble() + 3);
                        g.lineTo(part.x + wobble() + 3, part.y + part.h + wobble() + 3);
                        g.lineTo(part.x + wobble() + 3, part.y + wobble() + 3);
                        g.strokePath();
                    }
                }
            } else {
                // Simple shape: draw from points array (original behavior)
                const points = shapeData.points;
                
                // Crayon-like fill
                g.fillStyle(0x888888, 0.24);
                g.beginPath();
                g.moveTo(points[0].x + 3, points[0].y + 3);
                for (let i = 1; i < points.length; i++) {
                    g.lineTo(points[i].x + 3, points[i].y + 3);
                }
                g.closePath();
                g.fillPath();
                
                // Add subtle diagonal crayon strokes
                g.lineStyle(0.5, 0x666666, 0.15);
                for (let y = 0; y < shapeData.height; y += 6) {
                    g.beginPath();
                    g.moveTo(3 + wobble(), y + 3 + wobble());
                    g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
                    g.strokePath();
                }
                g.lineStyle(2, 0x1a1a1a);  // Reset for outline
                
                // Outline
                g.beginPath();
                g.moveTo(points[0].x + wobble() + 3, points[0].y + wobble() + 3);
                for (let i = 1; i < points.length; i++) {
                    g.lineTo(points[i].x + wobble() + 3, points[i].y + wobble() + 3);
                }
                g.lineTo(points[0].x + wobble() + 3, points[0].y + wobble() + 3);
                g.strokePath();
            }
            
            g.generateTexture(shapeName, shapeData.width + 6, shapeData.height + 6);
            g.destroy();
        };
        
        // Generate textures for all shapes in the library (only if they don't exist)
        for (const [name, data] of Object.entries(PLATFORM_SHAPES)) {
            if (!this.textures.exists(name)) {
                this.createSketchyShape(name, data);
            }
        }
        
        // Select level layout (use passed index or default to 0)
        this.currentLayoutIndex = (this.scene.settings.data && this.scene.settings.data.layoutIndex !== undefined) 
            ? this.scene.settings.data.layoutIndex 
            : 0;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex])
        
        
        // === PLAYER (hand-drawn stick figure - 0.75x original) ===
        if (!this.textures.exists('player')) {
            const playerGraphics = this.add.graphics();
            playerGraphics.lineStyle(1.5, 0x1a1a1a);  // Black pen
            
            // Simple stick figure: head, body, legs
            // Head (circle)
            playerGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 5.25);
            playerGraphics.lineTo(4.5, 10.5);
            playerGraphics.strokePath();
            // Arms (line across)
            playerGraphics.beginPath();
            playerGraphics.moveTo(1.5, 7.5);
            playerGraphics.lineTo(7.5, 7.5);
            playerGraphics.strokePath();
            // Legs (two lines)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(2.25, 15);
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(6.75, 15);
            playerGraphics.strokePath();
            
            playerGraphics.generateTexture('player', 9, 17);
            playerGraphics.destroy();
        }
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        
        // Player dies if they touch water!
        this.physics.add.overlap(this.player, this.waterZone, this.playerDied, null, this);
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Mouse input for shooting (and continuing after level complete)
        this.input.on('pointerdown', (pointer) => {
            if (this.levelInProgress) {
                this.shoot(pointer.x, pointer.y);
            } else {
                // Level is complete, click to start next level
                this.startNextLevel();
            }
        });
        
        
        // === BULLETS ===
        // === BULLET (hand-drawn dash) ===
        if (!this.textures.exists('bullet')) {
            const bulletGraphics = this.add.graphics();
            bulletGraphics.lineStyle(2, 0x1a1a1a);  // Black pen stroke
            bulletGraphics.beginPath();
            bulletGraphics.moveTo(0, 2);
            bulletGraphics.lineTo(8, 2);
            bulletGraphics.strokePath();
            bulletGraphics.generateTexture('bullet', 10, 4);
            bulletGraphics.destroy();
        }
        
        // Now create the group that uses the texture
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });
        
        
        // === ENEMIES ===
        // === ENEMY (hand-drawn stick figure in red - 0.75x original) ===
        if (!this.textures.exists('enemy')) {
            const enemyGraphics = this.add.graphics();
            enemyGraphics.lineStyle(1.5, 0xcc3333);  // Red pen
            
            // Same stick figure shape as player
            // Head (circle)
            enemyGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 5.25);
            enemyGraphics.lineTo(4.5, 10.5);
            enemyGraphics.strokePath();
            // Arms (line across)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(1.5, 7.5);
            enemyGraphics.lineTo(7.5, 7.5);
            enemyGraphics.strokePath();
            // Legs (two lines)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(2.25, 15);
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(6.75, 15);
            enemyGraphics.strokePath();
            
            enemyGraphics.generateTexture('enemy', 9, 17);
            enemyGraphics.destroy();
        }
        
        // Create enemies group
        this.enemies = this.physics.add.group();
        
        // Spawn initial enemies on platforms
        this.spawnEnemy(450, 600);   // Bottom right platform
        this.spawnEnemy(280, 460);   // Middle platform
        this.spawnEnemy(380, 390);   // Row 4
        this.spawnEnemy(380, 250);   // Top platform
        
        // Make enemies collide with platforms (so they sit on them)
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Bullets hit enemies!
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        
        
        // === UI TEXT ===
        // Show some instructions (smaller for notebook canvas)
        this.add.text(60, 16, 'Arrows: move | Click: shoot | R/G: restart/new | F: fly | H: hitbox', {
            fontSize: '9px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Debug controls (R/G/F/H keys)
        this.debugControls = new DebugControls(this);
        
        // Enemy counter (positioned for notebook canvas)
        this.enemyCountText = this.add.text(60, 32, '', {
            fontSize: '11px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        this.updateEnemyCount();
        
        // Level complete text (hidden initially) - centered for 700px canvas
        this.levelCompleteText = this.add.text(350, 400, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '28px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 18, y: 10 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(350, 460, 'Click to continue', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 5 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display
        this.levelText = this.add.text(610, 16, 'Level: 1', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 6, y: 3 }
        });
        
        // Layout number display (for debugging)
        this.layoutText = this.add.text(60, 48, `Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`, {
            fontSize: '11px',
            fill: '#666',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Spawn points will be generated from the layout
        this.spawnPoints = [];
        
        // Player start position (will be set by layout)
        this.playerStartX = 100;
        this.playerStartY = 600;
    }
    
    /**
     * Load a level layout from the library
     */
    loadLayout(layout) {
        // Clear existing platforms
        this.platforms.clear(true, true);
        
        // Clear spawn points
        this.spawnPoints = [];
        
        // Create platforms from layout
        for (const plat of layout.platforms) {
            const shapeData = PLATFORM_SHAPES[plat.shape];
            
            // Check if this is a compound shape (has separate collision parts)
            if (shapeData.parts) {
                // Compound shape: create visual-only sprite + separate collision bodies
                
                // Add visual sprite (no physics)
                const visual = this.add.image(plat.x, plat.y, plat.shape);
                
                // Create collision bodies for each part
                for (const part of shapeData.parts) {
                    // Part coordinates are relative to shape origin (top-left)
                    // Convert to world position (plat.x, plat.y is center of shape)
                    const partX = plat.x - shapeData.width / 2 + part.x + part.w / 2;
                    const partY = plat.y - shapeData.height / 2 + part.y + part.h / 2;
                    
                    // Create invisible collision rectangle
                    const collider = this.add.rectangle(partX, partY, part.w, part.h, 0x000000, 0);
                    this.physics.add.existing(collider, true);  // true = static
                    this.platforms.add(collider);
                }
            } else {
                // Simple shape: single collision body (original behavior)
                const platform = this.platforms.create(plat.x, plat.y, plat.shape);
            }
            
            // Add this platform position as a spawn point
            // Spawn point is on top of the platform
            this.spawnPoints.push({
                x: plat.x,
                y: plat.y - shapeData.height / 2 - 15  // Above the platform
            });
        }
        
        // Set player start to first platform
        if (layout.platforms.length > 0) {
            const firstPlat = layout.platforms[0];
            const firstShape = PLATFORM_SHAPES[firstPlat.shape];
            this.playerStartX = firstPlat.x;
            this.playerStartY = firstPlat.y - firstShape.height / 2 - 15;
        }
    }
    
    /**
     * Spawn an enemy at a position
     */
    spawnEnemy(x, y) {
        const enemy = this.enemies.create(x, y, 'enemy');
        enemy.setBounce(0);
        enemy.setCollideWorldBounds(true);
    }
    
    /**
     * Called when a bullet hits an enemy
     */
    bulletHitEnemy(bullet, enemy) {
        // Deactivate the bullet
        bullet.setActive(false);
        bullet.setVisible(false);
        
        // Destroy the enemy
        enemy.destroy();
        
        // Update the counter
        this.updateEnemyCount();
        
        // Check for level complete
        if (this.enemies.countActive() === 0) {
            this.levelComplete();
        }
    }
    
    /**
     * Update the enemy count display
     */
    updateEnemyCount() {
        const count = this.enemies.countActive();
        this.enemyCountText.setText(`Enemies remaining: ${count}`);
    }
    
    /**
     * Called when all enemies are defeated
     */
    levelComplete() {
        this.levelInProgress = false;
        this.levelCompleteText.setVisible(true);
        this.clickToContinueText.setVisible(true);
    }
    
    /**
     * Start the next level - cycle through layouts and spawn enemies
     */
    startNextLevel() {
        this.currentLevel++;
        this.levelText.setText(`Level: ${this.currentLevel}`);
        
        // Hide completion messages
        this.levelCompleteText.setVisible(false);
        this.clickToContinueText.setVisible(false);
        
        // Clear any remaining bullets
        this.bullets.children.each((bullet) => {
            bullet.setActive(false);
            bullet.setVisible(false);
        });
        
        // Cycle to next layout (or random)
        this.currentLayoutIndex = (this.currentLayoutIndex + 1) % LEVEL_LAYOUTS.length;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex]);
        
        // Re-add platform and wall collisions
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Spawn enemies at random positions
        // More enemies as levels progress (4 + 1 per 2 levels, max based on spawn points)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), this.spawnPoints.length - 1);
        
        // Filter out player start position from spawn points for enemies
        const enemySpawnPoints = this.spawnPoints.filter(
            p => !(Math.abs(p.x - this.playerStartX) < 10 && Math.abs(p.y - this.playerStartY) < 10)
        );
        
        // Shuffle and pick
        const shuffled = Phaser.Utils.Array.Shuffle([...enemySpawnPoints]);
        for (let i = 0; i < enemyCount && i < shuffled.length; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position - use body.reset for proper physics sync
        this.player.body.reset(this.playerStartX, this.playerStartY);
    }
    
    /**
     * Called when player touches water
     */
    playerDied() {
        // Prevent multiple triggers while respawning
        if (this.isRespawning) return;
        this.isRespawning = true;
        
        // Force physics body to fully reset at new position
        // This syncs sprite + physics body immediately to prevent desync
        this.player.body.reset(this.playerStartX, this.playerStartY);
        
        // Brief visual feedback - flash the player
        this.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            this.player.clearTint();
        });
        
        // Clear respawn flag after player has time to land
        this.time.delayedCall(500, () => {
            this.isRespawning = false;
        });
    }

    update() {
        // This runs every frame - handle player movement here
        
        // Check debug controls (R/G/F/H keys)
        const debugAction = this.debugControls.update(this.player, this.currentLayoutIndex, LEVEL_LAYOUTS.length);
        if (debugAction) {
            if (debugAction.action === 'restart') {
                this.scene.restart({ layoutIndex: debugAction.layoutIndex });
                return;
            }
            // flyToggled and hitboxToggled are handled internally by DebugControls
        }
        
        const speed = 120;  // Scaled down for smaller characters
        const flySpeed = 200;  // Speed when flying
        const jumpVelocity = -280;  // Scaled down - smaller jump for zoomed-out feel
        
        // Left/Right movement
        const flyMode = this.debugControls.isFlyMode();
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(flyMode ? -flySpeed : -speed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(flyMode ? flySpeed : speed);
        } else {
            // No arrow pressed - stop horizontal movement
            this.player.setVelocityX(0);
        }
        
        // Up/Down movement (fly mode) or jumping (normal mode)
        if (flyMode) {
            // Fly mode: up/down arrows move vertically
            if (this.cursors.up.isDown) {
                this.player.setVelocityY(-flySpeed);
            } else if (this.cursors.down.isDown) {
                this.player.setVelocityY(flySpeed);
            } else {
                this.player.setVelocityY(0);
            }
        } else {
            // Normal mode: jumping when touching ground
            if (this.cursors.up.isDown && this.player.body.blocked.down) {
                this.player.setVelocityY(jumpVelocity);
            }
        }
        
        // Clean up bullets that have left the screen
        this.bullets.children.each((bullet) => {
            if (bullet.active && (bullet.x < -50 || bullet.x > 750 || bullet.y < -50 || bullet.y > 950)) {
                bullet.setActive(false);
                bullet.setVisible(false);
            }
        });
    }
    
    /**
     * Shoot a bullet toward a target position
     * @param {number} targetX - X coordinate to shoot toward
     * @param {number} targetY - Y coordinate to shoot toward
     */
    shoot(targetX, targetY) {
        // Get a bullet from the group (reuses inactive bullets)
        const bullet = this.bullets.get(this.player.x, this.player.y);
        
        if (!bullet) return;  // No bullets available
        
        bullet.setActive(true);
        bullet.setVisible(true);
        
        // Calculate direction to target
        const angle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            targetX, targetY
        );
        
        // Set bullet velocity toward target
        const bulletSpeed = 600;
        bullet.setVelocity(
            Math.cos(angle) * bulletSpeed,
            Math.sin(angle) * bulletSpeed
        );
        
        // Rotate bullet to face direction of travel
        bullet.setRotation(angle);
        
        // Bullets shouldn't be affected by gravity
        bullet.body.allowGravity = false;
    }
}


```

## Step 1 Complete! ✓

**What changed:**

1. **Created** `js/utils/DebugControls.js` - New module handling R/G/F/H key controls
2. **Converted to ES6 modules** - The project now uses `import`/`export` (cleaner for future refactoring)
3. **Updated** `index.html` - Now loads `game.js` as a module
4. **Updated** `PlayScene.js` - Imports DebugControls and PlatformShapes, exports PlayScene
5. **Updated** `PlatformShapes.js` - Exports PLATFORM_SHAPES and LEVEL_LAYOUTS
6. **Updated** `game.js` - Imports PlayScene

**Files touched:** 5 files (1 new, 4 modified)

---

### Test it now:

1. Make sure you're running the local server:
   ```bash
   python3 -m http.server 8000
   ```

2. Open http://localhost:8000 in your browser

3. **Test these debug controls:**
   - **R** - Should restart the current layout
   - **G** - Should cycle to next layout
   - **F** - Should toggle fly mode (player ignores gravity, use all arrows to move)
   - **H** - Should toggle hitbox display

4. Basic gameplay should still work (arrows to move, click to shoot)

Let me know if everything works and I'll proceed to **Step 2: Extract EnvironmentRenderer** (walls and water drawing).

```shellscript
   python3 -m http.server 8000
```

---

**User**

everything seems to work

---

**Cursor**

Excellent! Let's move on to Step 2.

## Step 2: Extract EnvironmentRenderer

I'll extract the wall and water drawing code into a new module.

```javascript
/**
 * EnvironmentRenderer.js - Draws walls and water hazard
 * 
 * Handles the hand-drawn crayon-style visuals for:
 * - Left and right walls (with collision bodies)
 * - Water hazard at bottom (with collision zone)
 */

/**
 * Draw the walls with hand-drawn crayon style
 * @param {Phaser.Scene} scene - The scene to draw in
 * @returns {Phaser.Physics.Arcade.StaticGroup} - Wall collision group
 */
export function drawWalls(scene) {
    const wallGraphics = scene.add.graphics();
    
    // Left wall - fill first, then outline
    // Build path points for left wall
    const leftWallPoints = [{x: 55, y: 0}];
    for (let y = 0; y <= 795; y += 20) {
        const wobbleX = 55 + (Math.random() - 0.5) * 6 + Math.sin(y * 0.02) * 3;
        leftWallPoints.push({x: wobbleX, y: y});
    }
    leftWallPoints.push({x: 55, y: 795}, {x: 0, y: 795}, {x: 0, y: 0});
    
    // Fill left wall
    wallGraphics.fillStyle(0x888888, 0.24);
    wallGraphics.beginPath();
    wallGraphics.moveTo(leftWallPoints[0].x, leftWallPoints[0].y);
    for (let i = 1; i < leftWallPoints.length; i++) {
        wallGraphics.lineTo(leftWallPoints[i].x, leftWallPoints[i].y);
    }
    wallGraphics.closePath();
    wallGraphics.fillPath();
    
    // Crayon strokes for left wall
    wallGraphics.lineStyle(0.5, 0x666666, 0.15);
    for (let y = 0; y < 795; y += 8) {
        wallGraphics.beginPath();
        wallGraphics.moveTo((Math.random() - 0.5) * 2, y + (Math.random() - 0.5) * 2);
        wallGraphics.lineTo(50 + (Math.random() - 0.5) * 10, y + 15 + (Math.random() - 0.5) * 2);
        wallGraphics.strokePath();
    }
    
    // Outline left wall
    wallGraphics.lineStyle(2.5, 0x1a1a1a);
    wallGraphics.beginPath();
    wallGraphics.moveTo(55, 0);
    for (let i = 1; i < leftWallPoints.length - 2; i++) {
        wallGraphics.lineTo(leftWallPoints[i].x, leftWallPoints[i].y);
    }
    wallGraphics.lineTo(55, 795);
    wallGraphics.lineTo(0, 795);
    wallGraphics.strokePath();
    
    // Right wall - fill first, then outline
    const rightWallPoints = [{x: 645, y: 0}];
    for (let y = 0; y <= 795; y += 20) {
        const wobbleX = 645 + (Math.random() - 0.5) * 6 + Math.sin(y * 0.025 + 1) * 3;
        rightWallPoints.push({x: wobbleX, y: y});
    }
    rightWallPoints.push({x: 645, y: 795}, {x: 700, y: 795}, {x: 700, y: 0});
    
    // Fill right wall
    wallGraphics.fillStyle(0x888888, 0.24);
    wallGraphics.beginPath();
    wallGraphics.moveTo(rightWallPoints[0].x, rightWallPoints[0].y);
    for (let i = 1; i < rightWallPoints.length; i++) {
        wallGraphics.lineTo(rightWallPoints[i].x, rightWallPoints[i].y);
    }
    wallGraphics.closePath();
    wallGraphics.fillPath();
    
    // Crayon strokes for right wall
    wallGraphics.lineStyle(0.5, 0x666666, 0.15);
    for (let y = 0; y < 795; y += 8) {
        wallGraphics.beginPath();
        wallGraphics.moveTo(650 + (Math.random() - 0.5) * 2, y + (Math.random() - 0.5) * 2);
        wallGraphics.lineTo(700 + (Math.random() - 0.5) * 2, y + 15 + (Math.random() - 0.5) * 2);
        wallGraphics.strokePath();
    }
    
    // Outline right wall
    wallGraphics.lineStyle(2.5, 0x1a1a1a);
    wallGraphics.beginPath();
    wallGraphics.moveTo(645, 0);
    for (let i = 1; i < rightWallPoints.length - 2; i++) {
        wallGraphics.lineTo(rightWallPoints[i].x, rightWallPoints[i].y);
    }
    wallGraphics.lineTo(645, 795);
    wallGraphics.lineTo(700, 795);
    wallGraphics.strokePath();
    
    // Wall collision bodies (invisible rectangles)
    const walls = scene.physics.add.staticGroup();
    
    // Create wall collision textures (only if they don't exist)
    if (!scene.textures.exists('wall')) {
        const wallTexture = scene.add.graphics();
        wallTexture.fillStyle(0x000000, 0);  // Invisible
        wallTexture.fillRect(0, 0, 50, 795);
        wallTexture.generateTexture('wall', 50, 795);
        wallTexture.destroy();
    }
    
    // Add collision walls (positioned so player stays in play area)
    walls.create(27, 397, 'wall');   // Left wall
    walls.create(673, 397, 'wall');  // Right wall
    
    return walls;
}

/**
 * Draw the water hazard with hand-drawn crayon style
 * @param {Phaser.Scene} scene - The scene to draw in
 * @returns {Phaser.GameObjects.Zone} - Water collision zone
 */
export function drawWater(scene) {
    const waterGraphics = scene.add.graphics();
    
    // Build wavy surface points
    const waterPoints = [{x: 0, y: 870}];
    for (let x = 0; x <= 700; x += 15) {
        const waveY = 870 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
        waterPoints.push({x: x, y: waveY});
    }
    
    // Blue crayon fill for water body
    waterGraphics.fillStyle(0x4A90D9, 0.24);
    waterGraphics.beginPath();
    waterGraphics.moveTo(0, 870);
    for (const pt of waterPoints) {
        waterGraphics.lineTo(pt.x, pt.y);
    }
    waterGraphics.lineTo(700, 900);  // bottom right
    waterGraphics.lineTo(0, 900);    // bottom left
    waterGraphics.closePath();
    waterGraphics.fillPath();
    
    // Crayon strokes for water
    waterGraphics.lineStyle(0.5, 0x2070B0, 0.2);
    for (let y = 872; y < 900; y += 5) {
        waterGraphics.beginPath();
        waterGraphics.moveTo((Math.random() - 0.5) * 4, y + (Math.random() - 0.5) * 2);
        waterGraphics.lineTo(700 + (Math.random() - 0.5) * 4, y + 8 + (Math.random() - 0.5) * 2);
        waterGraphics.strokePath();
    }
    
    // Wavy surface line
    waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
    waterGraphics.beginPath();
    waterGraphics.moveTo(waterPoints[0].x, waterPoints[0].y);
    for (let i = 1; i < waterPoints.length; i++) {
        waterGraphics.lineTo(waterPoints[i].x, waterPoints[i].y);
    }
    waterGraphics.strokePath();
    
    // Invisible zone for water collision detection (below the line)
    const waterZone = scene.add.zone(350, 885, 700, 30);
    scene.physics.add.existing(waterZone, true);  // true = static body
    
    return waterZone;
}

```

Now let me update `PlayScene.js` to use the new module:

```javascript
/**
 * PlayScene - Main gameplay scene
 * 
 * This is where the actual game happens. Phaser scenes have three main methods:
 * - preload(): Load assets (images, sounds, etc.)
 * - create(): Set up game objects, physics, input (runs once when scene starts)
 * - update(): Game loop, runs every frame (~60 times per second)
 */

import { DebugControls } from '../utils/DebugControls.js';
import { PLATFORM_SHAPES, LEVEL_LAYOUTS } from '../platforms/PlatformShapes.js';
import { drawWalls, drawWater } from '../drawing/EnvironmentRenderer.js';

export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        // Load the user-cropped notebook paper background (preserves scale)
        this.load.image('notebook-paper', 'assets/cropped-notebook-page.png');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using cropped image) ===
        // Paper is pre-cropped to edges, just scale to fit canvas
        const paper = this.add.image(350, 450, 'notebook-paper');
        paper.setDisplaySize(700, 900);
        
        
        // === WALLS (hand-drawn style with crayon fill) ===
        const wallGraphics = this.add.graphics();
        
        // Left wall - fill first, then outline
        // Build path points for left wall
        const leftWallPoints = [{x: 55, y: 0}];
        for (let y = 0; y <= 795; y += 20) {
            const wobbleX = 55 + (Math.random() - 0.5) * 6 + Math.sin(y * 0.02) * 3;
            leftWallPoints.push({x: wobbleX, y: y});
        }
        leftWallPoints.push({x: 55, y: 795}, {x: 0, y: 795}, {x: 0, y: 0});
        
        // Fill left wall
        wallGraphics.fillStyle(0x888888, 0.24);
        wallGraphics.beginPath();
        wallGraphics.moveTo(leftWallPoints[0].x, leftWallPoints[0].y);
        for (let i = 1; i < leftWallPoints.length; i++) {
            wallGraphics.lineTo(leftWallPoints[i].x, leftWallPoints[i].y);
        }
        wallGraphics.closePath();
        wallGraphics.fillPath();
        
        // Crayon strokes for left wall
        wallGraphics.lineStyle(0.5, 0x666666, 0.15);
        for (let y = 0; y < 795; y += 8) {
            wallGraphics.beginPath();
            wallGraphics.moveTo((Math.random() - 0.5) * 2, y + (Math.random() - 0.5) * 2);
            wallGraphics.lineTo(50 + (Math.random() - 0.5) * 10, y + 15 + (Math.random() - 0.5) * 2);
            wallGraphics.strokePath();
        }
        
        // Outline left wall
        wallGraphics.lineStyle(2.5, 0x1a1a1a);
        wallGraphics.beginPath();
        wallGraphics.moveTo(55, 0);
        for (let i = 1; i < leftWallPoints.length - 2; i++) {
            wallGraphics.lineTo(leftWallPoints[i].x, leftWallPoints[i].y);
        }
        wallGraphics.lineTo(55, 795);
        wallGraphics.lineTo(0, 795);
        wallGraphics.strokePath();
        
        // Right wall - fill first, then outline
        const rightWallPoints = [{x: 645, y: 0}];
        for (let y = 0; y <= 795; y += 20) {
            const wobbleX = 645 + (Math.random() - 0.5) * 6 + Math.sin(y * 0.025 + 1) * 3;
            rightWallPoints.push({x: wobbleX, y: y});
        }
        rightWallPoints.push({x: 645, y: 795}, {x: 700, y: 795}, {x: 700, y: 0});
        
        // Fill right wall
        wallGraphics.fillStyle(0x888888, 0.24);
        wallGraphics.beginPath();
        wallGraphics.moveTo(rightWallPoints[0].x, rightWallPoints[0].y);
        for (let i = 1; i < rightWallPoints.length; i++) {
            wallGraphics.lineTo(rightWallPoints[i].x, rightWallPoints[i].y);
        }
        wallGraphics.closePath();
        wallGraphics.fillPath();
        
        // Crayon strokes for right wall
        wallGraphics.lineStyle(0.5, 0x666666, 0.15);
        for (let y = 0; y < 795; y += 8) {
            wallGraphics.beginPath();
            wallGraphics.moveTo(650 + (Math.random() - 0.5) * 2, y + (Math.random() - 0.5) * 2);
            wallGraphics.lineTo(700 + (Math.random() - 0.5) * 2, y + 15 + (Math.random() - 0.5) * 2);
            wallGraphics.strokePath();
        }
        
        // Outline right wall
        wallGraphics.lineStyle(2.5, 0x1a1a1a);
        wallGraphics.beginPath();
        wallGraphics.moveTo(645, 0);
        for (let i = 1; i < rightWallPoints.length - 2; i++) {
            wallGraphics.lineTo(rightWallPoints[i].x, rightWallPoints[i].y);
        }
        wallGraphics.lineTo(645, 795);
        wallGraphics.lineTo(700, 795);
        wallGraphics.strokePath();
        
        // Wall collision bodies (invisible rectangles)
        this.walls = this.physics.add.staticGroup();
        
        // Create wall collision textures (only if they don't exist)
        if (!this.textures.exists('wall')) {
            const wallTexture = this.add.graphics();
            wallTexture.fillStyle(0x000000, 0);  // Invisible
            wallTexture.fillRect(0, 0, 50, 795);
            wallTexture.generateTexture('wall', 50, 795);
            wallTexture.destroy();
        }
        
        // Add collision walls (positioned so player stays in play area)
        this.walls.create(27, 397, 'wall');   // Left wall
        this.walls.create(673, 397, 'wall');  // Right wall
        
        
        // === WATER HAZARD (with crayon-like blue fill) ===
        const waterGraphics = this.add.graphics();
        
        // Build wavy surface points
        const waterPoints = [{x: 0, y: 870}];
        for (let x = 0; x <= 700; x += 15) {
            const waveY = 870 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterPoints.push({x: x, y: waveY});
        }
        
        // Blue crayon fill for water body
        waterGraphics.fillStyle(0x4A90D9, 0.24);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 870);
        for (const pt of waterPoints) {
            waterGraphics.lineTo(pt.x, pt.y);
        }
        waterGraphics.lineTo(700, 900);  // bottom right
        waterGraphics.lineTo(0, 900);    // bottom left
        waterGraphics.closePath();
        waterGraphics.fillPath();
        
        // Crayon strokes for water
        waterGraphics.lineStyle(0.5, 0x2070B0, 0.2);
        for (let y = 872; y < 900; y += 5) {
            waterGraphics.beginPath();
            waterGraphics.moveTo((Math.random() - 0.5) * 4, y + (Math.random() - 0.5) * 2);
            waterGraphics.lineTo(700 + (Math.random() - 0.5) * 4, y + 8 + (Math.random() - 0.5) * 2);
            waterGraphics.strokePath();
        }
        
        // Wavy surface line
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(waterPoints[0].x, waterPoints[0].y);
        for (let i = 1; i < waterPoints.length; i++) {
            waterGraphics.lineTo(waterPoints[i].x, waterPoints[i].y);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection (below the line)
        this.waterZone = this.add.zone(350, 885, 700, 30);
        this.physics.add.existing(this.waterZone, true);  // true = static body
        
        
        // === PLATFORMS (using shape library) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Helper function to draw a sketchy shape
        this.createSketchyShape = (shapeName, shapeData) => {
            const g = this.add.graphics();
            const wobble = () => (Math.random() - 0.5) * 2;
            
            g.lineStyle(2, 0x1a1a1a);  // Dark pen color
            
            // Check if this is a compound shape (has parts array)
            if (shapeData.parts) {
                // Compound shape: check if it has custom visual outline (points) or just draw parts
                if (shapeData.outlines) {
                    // Has multiple outline groups - draw each as connected shape
                    for (const outline of shapeData.outlines) {
                        // Crayon-like fill
                        g.fillStyle(0x888888, 0.24);
                        g.beginPath();
                        g.moveTo(outline[0].x + 3, outline[0].y + 3);
                        for (let i = 1; i < outline.length; i++) {
                            g.lineTo(outline[i].x + 3, outline[i].y + 3);
                        }
                        g.closePath();
                        g.fillPath();
                    }
                    
                    // Add crayon strokes across the whole shape
                    g.lineStyle(0.5, 0x666666, 0.15);
                    for (let y = 0; y < shapeData.height; y += 6) {
                        g.beginPath();
                        g.moveTo(3 + wobble(), y + 3 + wobble());
                        g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
                        g.strokePath();
                    }
                    g.lineStyle(2, 0x1a1a1a);
                    
                    // Draw outlines
                    for (const outline of shapeData.outlines) {
                        g.beginPath();
                        g.moveTo(outline[0].x + wobble() + 3, outline[0].y + wobble() + 3);
                        for (let i = 1; i < outline.length; i++) {
                            g.lineTo(outline[i].x + wobble() + 3, outline[i].y + wobble() + 3);
                        }
                        g.closePath();
                        g.strokePath();
                    }
                } else {
                    // No custom outline - draw each part as separate rectangle
                    for (const part of shapeData.parts) {
                        // Crayon-like fill
                        g.fillStyle(0x888888, 0.24);
                        g.fillRect(part.x + 3, part.y + 3, part.w, part.h);
                    }
                    
                    // Add crayon strokes
                    g.lineStyle(0.5, 0x666666, 0.15);
                    for (let y = 0; y < shapeData.height; y += 6) {
                        g.beginPath();
                        g.moveTo(3 + wobble(), y + 3 + wobble());
                        g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
                        g.strokePath();
                    }
                    g.lineStyle(2, 0x1a1a1a);
                    
                    // Draw outlines
                    for (const part of shapeData.parts) {
                        g.beginPath();
                        g.moveTo(part.x + wobble() + 3, part.y + wobble() + 3);
                        g.lineTo(part.x + part.w + wobble() + 3, part.y + wobble() + 3);
                        g.lineTo(part.x + part.w + wobble() + 3, part.y + part.h + wobble() + 3);
                        g.lineTo(part.x + wobble() + 3, part.y + part.h + wobble() + 3);
                        g.lineTo(part.x + wobble() + 3, part.y + wobble() + 3);
                        g.strokePath();
                    }
                }
            } else {
                // Simple shape: draw from points array (original behavior)
                const points = shapeData.points;
                
                // Crayon-like fill
                g.fillStyle(0x888888, 0.24);
                g.beginPath();
                g.moveTo(points[0].x + 3, points[0].y + 3);
                for (let i = 1; i < points.length; i++) {
                    g.lineTo(points[i].x + 3, points[i].y + 3);
                }
                g.closePath();
                g.fillPath();
                
                // Add subtle diagonal crayon strokes
                g.lineStyle(0.5, 0x666666, 0.15);
                for (let y = 0; y < shapeData.height; y += 6) {
                    g.beginPath();
                    g.moveTo(3 + wobble(), y + 3 + wobble());
                    g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
                    g.strokePath();
                }
                g.lineStyle(2, 0x1a1a1a);  // Reset for outline
                
                // Outline
                g.beginPath();
                g.moveTo(points[0].x + wobble() + 3, points[0].y + wobble() + 3);
                for (let i = 1; i < points.length; i++) {
                    g.lineTo(points[i].x + wobble() + 3, points[i].y + wobble() + 3);
                }
                g.lineTo(points[0].x + wobble() + 3, points[0].y + wobble() + 3);
                g.strokePath();
            }
            
            g.generateTexture(shapeName, shapeData.width + 6, shapeData.height + 6);
            g.destroy();
        };
        
        // Generate textures for all shapes in the library (only if they don't exist)
        for (const [name, data] of Object.entries(PLATFORM_SHAPES)) {
            if (!this.textures.exists(name)) {
                this.createSketchyShape(name, data);
            }
        }
        
        // Select level layout (use passed index or default to 0)
        this.currentLayoutIndex = (this.scene.settings.data && this.scene.settings.data.layoutIndex !== undefined) 
            ? this.scene.settings.data.layoutIndex 
            : 0;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex])
        
        
        // === PLAYER (hand-drawn stick figure - 0.75x original) ===
        if (!this.textures.exists('player')) {
            const playerGraphics = this.add.graphics();
            playerGraphics.lineStyle(1.5, 0x1a1a1a);  // Black pen
            
            // Simple stick figure: head, body, legs
            // Head (circle)
            playerGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 5.25);
            playerGraphics.lineTo(4.5, 10.5);
            playerGraphics.strokePath();
            // Arms (line across)
            playerGraphics.beginPath();
            playerGraphics.moveTo(1.5, 7.5);
            playerGraphics.lineTo(7.5, 7.5);
            playerGraphics.strokePath();
            // Legs (two lines)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(2.25, 15);
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(6.75, 15);
            playerGraphics.strokePath();
            
            playerGraphics.generateTexture('player', 9, 17);
            playerGraphics.destroy();
        }
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        
        // Player dies if they touch water!
        this.physics.add.overlap(this.player, this.waterZone, this.playerDied, null, this);
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Mouse input for shooting (and continuing after level complete)
        this.input.on('pointerdown', (pointer) => {
            if (this.levelInProgress) {
                this.shoot(pointer.x, pointer.y);
            } else {
                // Level is complete, click to start next level
                this.startNextLevel();
            }
        });
        
        
        // === BULLETS ===
        // === BULLET (hand-drawn dash) ===
        if (!this.textures.exists('bullet')) {
            const bulletGraphics = this.add.graphics();
            bulletGraphics.lineStyle(2, 0x1a1a1a);  // Black pen stroke
            bulletGraphics.beginPath();
            bulletGraphics.moveTo(0, 2);
            bulletGraphics.lineTo(8, 2);
            bulletGraphics.strokePath();
            bulletGraphics.generateTexture('bullet', 10, 4);
            bulletGraphics.destroy();
        }
        
        // Now create the group that uses the texture
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });
        
        
        // === ENEMIES ===
        // === ENEMY (hand-drawn stick figure in red - 0.75x original) ===
        if (!this.textures.exists('enemy')) {
            const enemyGraphics = this.add.graphics();
            enemyGraphics.lineStyle(1.5, 0xcc3333);  // Red pen
            
            // Same stick figure shape as player
            // Head (circle)
            enemyGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 5.25);
            enemyGraphics.lineTo(4.5, 10.5);
            enemyGraphics.strokePath();
            // Arms (line across)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(1.5, 7.5);
            enemyGraphics.lineTo(7.5, 7.5);
            enemyGraphics.strokePath();
            // Legs (two lines)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(2.25, 15);
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(6.75, 15);
            enemyGraphics.strokePath();
            
            enemyGraphics.generateTexture('enemy', 9, 17);
            enemyGraphics.destroy();
        }
        
        // Create enemies group
        this.enemies = this.physics.add.group();
        
        // Spawn initial enemies on platforms
        this.spawnEnemy(450, 600);   // Bottom right platform
        this.spawnEnemy(280, 460);   // Middle platform
        this.spawnEnemy(380, 390);   // Row 4
        this.spawnEnemy(380, 250);   // Top platform
        
        // Make enemies collide with platforms (so they sit on them)
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Bullets hit enemies!
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        
        
        // === UI TEXT ===
        // Show some instructions (smaller for notebook canvas)
        this.add.text(60, 16, 'Arrows: move | Click: shoot | R/G: restart/new | F: fly | H: hitbox', {
            fontSize: '9px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Debug controls (R/G/F/H keys)
        this.debugControls = new DebugControls(this);
        
        // Enemy counter (positioned for notebook canvas)
        this.enemyCountText = this.add.text(60, 32, '', {
            fontSize: '11px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        this.updateEnemyCount();
        
        // Level complete text (hidden initially) - centered for 700px canvas
        this.levelCompleteText = this.add.text(350, 400, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '28px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 18, y: 10 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(350, 460, 'Click to continue', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 5 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display
        this.levelText = this.add.text(610, 16, 'Level: 1', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 6, y: 3 }
        });
        
        // Layout number display (for debugging)
        this.layoutText = this.add.text(60, 48, `Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`, {
            fontSize: '11px',
            fill: '#666',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Spawn points will be generated from the layout
        this.spawnPoints = [];
        
        // Player start position (will be set by layout)
        this.playerStartX = 100;
        this.playerStartY = 600;
    }
    
    /**
     * Load a level layout from the library
     */
    loadLayout(layout) {
        // Clear existing platforms
        this.platforms.clear(true, true);
        
        // Clear spawn points
        this.spawnPoints = [];
        
        // Create platforms from layout
        for (const plat of layout.platforms) {
            const shapeData = PLATFORM_SHAPES[plat.shape];
            
            // Check if this is a compound shape (has separate collision parts)
            if (shapeData.parts) {
                // Compound shape: create visual-only sprite + separate collision bodies
                
                // Add visual sprite (no physics)
                const visual = this.add.image(plat.x, plat.y, plat.shape);
                
                // Create collision bodies for each part
                for (const part of shapeData.parts) {
                    // Part coordinates are relative to shape origin (top-left)
                    // Convert to world position (plat.x, plat.y is center of shape)
                    const partX = plat.x - shapeData.width / 2 + part.x + part.w / 2;
                    const partY = plat.y - shapeData.height / 2 + part.y + part.h / 2;
                    
                    // Create invisible collision rectangle
                    const collider = this.add.rectangle(partX, partY, part.w, part.h, 0x000000, 0);
                    this.physics.add.existing(collider, true);  // true = static
                    this.platforms.add(collider);
                }
            } else {
                // Simple shape: single collision body (original behavior)
                const platform = this.platforms.create(plat.x, plat.y, plat.shape);
            }
            
            // Add this platform position as a spawn point
            // Spawn point is on top of the platform
            this.spawnPoints.push({
                x: plat.x,
                y: plat.y - shapeData.height / 2 - 15  // Above the platform
            });
        }
        
        // Set player start to first platform
        if (layout.platforms.length > 0) {
            const firstPlat = layout.platforms[0];
            const firstShape = PLATFORM_SHAPES[firstPlat.shape];
            this.playerStartX = firstPlat.x;
            this.playerStartY = firstPlat.y - firstShape.height / 2 - 15;
        }
    }
    
    /**
     * Spawn an enemy at a position
     */
    spawnEnemy(x, y) {
        const enemy = this.enemies.create(x, y, 'enemy');
        enemy.setBounce(0);
        enemy.setCollideWorldBounds(true);
    }
    
    /**
     * Called when a bullet hits an enemy
     */
    bulletHitEnemy(bullet, enemy) {
        // Deactivate the bullet
        bullet.setActive(false);
        bullet.setVisible(false);
        
        // Destroy the enemy
        enemy.destroy();
        
        // Update the counter
        this.updateEnemyCount();
        
        // Check for level complete
        if (this.enemies.countActive() === 0) {
            this.levelComplete();
        }
    }
    
    /**
     * Update the enemy count display
     */
    updateEnemyCount() {
        const count = this.enemies.countActive();
        this.enemyCountText.setText(`Enemies remaining: ${count}`);
    }
    
    /**
     * Called when all enemies are defeated
     */
    levelComplete() {
        this.levelInProgress = false;
        this.levelCompleteText.setVisible(true);
        this.clickToContinueText.setVisible(true);
    }
    
    /**
     * Start the next level - cycle through layouts and spawn enemies
     */
    startNextLevel() {
        this.currentLevel++;
        this.levelText.setText(`Level: ${this.currentLevel}`);
        
        // Hide completion messages
        this.levelCompleteText.setVisible(false);
        this.clickToContinueText.setVisible(false);
        
        // Clear any remaining bullets
        this.bullets.children.each((bullet) => {
            bullet.setActive(false);
            bullet.setVisible(false);
        });
        
        // Cycle to next layout (or random)
        this.currentLayoutIndex = (this.currentLayoutIndex + 1) % LEVEL_LAYOUTS.length;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex]);
        
        // Re-add platform and wall collisions
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Spawn enemies at random positions
        // More enemies as levels progress (4 + 1 per 2 levels, max based on spawn points)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), this.spawnPoints.length - 1);
        
        // Filter out player start position from spawn points for enemies
        const enemySpawnPoints = this.spawnPoints.filter(
            p => !(Math.abs(p.x - this.playerStartX) < 10 && Math.abs(p.y - this.playerStartY) < 10)
        );
        
        // Shuffle and pick
        const shuffled = Phaser.Utils.Array.Shuffle([...enemySpawnPoints]);
        for (let i = 0; i < enemyCount && i < shuffled.length; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position - use body.reset for proper physics sync
        this.player.body.reset(this.playerStartX, this.playerStartY);
    }
    
    /**
     * Called when player touches water
     */
    playerDied() {
        // Prevent multiple triggers while respawning
        if (this.isRespawning) return;
        this.isRespawning = true;
        
        // Force physics body to fully reset at new position
        // This syncs sprite + physics body immediately to prevent desync
        this.player.body.reset(this.playerStartX, this.playerStartY);
        
        // Brief visual feedback - flash the player
        this.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            this.player.clearTint();
        });
        
        // Clear respawn flag after player has time to land
        this.time.delayedCall(500, () => {
            this.isRespawning = false;
        });
    }

    update() {
        // This runs every frame - handle player movement here
        
        // Check debug controls (R/G/F/H keys)
        const debugAction = this.debugControls.update(this.player, this.currentLayoutIndex, LEVEL_LAYOUTS.length);
        if (debugAction) {
            if (debugAction.action === 'restart') {
                this.scene.restart({ layoutIndex: debugAction.layoutIndex });
                return;
            }
            // flyToggled and hitboxToggled are handled internally by DebugControls
        }
        
        const speed = 120;  // Scaled down for smaller characters
        const flySpeed = 200;  // Speed when flying
        const jumpVelocity = -280;  // Scaled down - smaller jump for zoomed-out feel
        
        // Left/Right movement
        const flyMode = this.debugControls.isFlyMode();
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(flyMode ? -flySpeed : -speed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(flyMode ? flySpeed : speed);
        } else {
            // No arrow pressed - stop horizontal movement
            this.player.setVelocityX(0);
        }
        
        // Up/Down movement (fly mode) or jumping (normal mode)
        if (flyMode) {
            // Fly mode: up/down arrows move vertically
            if (this.cursors.up.isDown) {
                this.player.setVelocityY(-flySpeed);
            } else if (this.cursors.down.isDown) {
                this.player.setVelocityY(flySpeed);
            } else {
                this.player.setVelocityY(0);
            }
        } else {
            // Normal mode: jumping when touching ground
            if (this.cursors.up.isDown && this.player.body.blocked.down) {
                this.player.setVelocityY(jumpVelocity);
            }
        }
        
        // Clean up bullets that have left the screen
        this.bullets.children.each((bullet) => {
            if (bullet.active && (bullet.x < -50 || bullet.x > 750 || bullet.y < -50 || bullet.y > 950)) {
                bullet.setActive(false);
                bullet.setVisible(false);
            }
        });
    }
    
    /**
     * Shoot a bullet toward a target position
     * @param {number} targetX - X coordinate to shoot toward
     * @param {number} targetY - Y coordinate to shoot toward
     */
    shoot(targetX, targetY) {
        // Get a bullet from the group (reuses inactive bullets)
        const bullet = this.bullets.get(this.player.x, this.player.y);
        
        if (!bullet) return;  // No bullets available
        
        bullet.setActive(true);
        bullet.setVisible(true);
        
        // Calculate direction to target
        const angle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            targetX, targetY
        );
        
        // Set bullet velocity toward target
        const bulletSpeed = 600;
        bullet.setVelocity(
            Math.cos(angle) * bulletSpeed,
            Math.sin(angle) * bulletSpeed
        );
        
        // Rotate bullet to face direction of travel
        bullet.setRotation(angle);
        
        // Bullets shouldn't be affected by gravity
        bullet.body.allowGravity = false;
    }
}


```

```javascript
/**
 * PlayScene - Main gameplay scene
 * 
 * This is where the actual game happens. Phaser scenes have three main methods:
 * - preload(): Load assets (images, sounds, etc.)
 * - create(): Set up game objects, physics, input (runs once when scene starts)
 * - update(): Game loop, runs every frame (~60 times per second)
 */

import { DebugControls } from '../utils/DebugControls.js';
import { PLATFORM_SHAPES, LEVEL_LAYOUTS } from '../platforms/PlatformShapes.js';
import { drawWalls, drawWater } from '../drawing/EnvironmentRenderer.js';

export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        // Load the user-cropped notebook paper background (preserves scale)
        this.load.image('notebook-paper', 'assets/cropped-notebook-page.png');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using cropped image) ===
        // Paper is pre-cropped to edges, just scale to fit canvas
        const paper = this.add.image(350, 450, 'notebook-paper');
        paper.setDisplaySize(700, 900);
        
        
        // === WALLS (hand-drawn style with crayon fill) ===
        this.walls = drawWalls(this);
        
        // === WATER HAZARD (with crayon-like blue fill) ===
        this.waterZone = drawWater(this);
        
        
        // === PLATFORMS (using shape library) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Helper function to draw a sketchy shape
        this.createSketchyShape = (shapeName, shapeData) => {
            const g = this.add.graphics();
            const wobble = () => (Math.random() - 0.5) * 2;
            
            g.lineStyle(2, 0x1a1a1a);  // Dark pen color
            
            // Check if this is a compound shape (has parts array)
            if (shapeData.parts) {
                // Compound shape: check if it has custom visual outline (points) or just draw parts
                if (shapeData.outlines) {
                    // Has multiple outline groups - draw each as connected shape
                    for (const outline of shapeData.outlines) {
                        // Crayon-like fill
                        g.fillStyle(0x888888, 0.24);
                        g.beginPath();
                        g.moveTo(outline[0].x + 3, outline[0].y + 3);
                        for (let i = 1; i < outline.length; i++) {
                            g.lineTo(outline[i].x + 3, outline[i].y + 3);
                        }
                        g.closePath();
                        g.fillPath();
                    }
                    
                    // Add crayon strokes across the whole shape
                    g.lineStyle(0.5, 0x666666, 0.15);
                    for (let y = 0; y < shapeData.height; y += 6) {
                        g.beginPath();
                        g.moveTo(3 + wobble(), y + 3 + wobble());
                        g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
                        g.strokePath();
                    }
                    g.lineStyle(2, 0x1a1a1a);
                    
                    // Draw outlines
                    for (const outline of shapeData.outlines) {
                        g.beginPath();
                        g.moveTo(outline[0].x + wobble() + 3, outline[0].y + wobble() + 3);
                        for (let i = 1; i < outline.length; i++) {
                            g.lineTo(outline[i].x + wobble() + 3, outline[i].y + wobble() + 3);
                        }
                        g.closePath();
                        g.strokePath();
                    }
                } else {
                    // No custom outline - draw each part as separate rectangle
                    for (const part of shapeData.parts) {
                        // Crayon-like fill
                        g.fillStyle(0x888888, 0.24);
                        g.fillRect(part.x + 3, part.y + 3, part.w, part.h);
                    }
                    
                    // Add crayon strokes
                    g.lineStyle(0.5, 0x666666, 0.15);
                    for (let y = 0; y < shapeData.height; y += 6) {
                        g.beginPath();
                        g.moveTo(3 + wobble(), y + 3 + wobble());
                        g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
                        g.strokePath();
                    }
                    g.lineStyle(2, 0x1a1a1a);
                    
                    // Draw outlines
                    for (const part of shapeData.parts) {
                        g.beginPath();
                        g.moveTo(part.x + wobble() + 3, part.y + wobble() + 3);
                        g.lineTo(part.x + part.w + wobble() + 3, part.y + wobble() + 3);
                        g.lineTo(part.x + part.w + wobble() + 3, part.y + part.h + wobble() + 3);
                        g.lineTo(part.x + wobble() + 3, part.y + part.h + wobble() + 3);
                        g.lineTo(part.x + wobble() + 3, part.y + wobble() + 3);
                        g.strokePath();
                    }
                }
            } else {
                // Simple shape: draw from points array (original behavior)
                const points = shapeData.points;
                
                // Crayon-like fill
                g.fillStyle(0x888888, 0.24);
                g.beginPath();
                g.moveTo(points[0].x + 3, points[0].y + 3);
                for (let i = 1; i < points.length; i++) {
                    g.lineTo(points[i].x + 3, points[i].y + 3);
                }
                g.closePath();
                g.fillPath();
                
                // Add subtle diagonal crayon strokes
                g.lineStyle(0.5, 0x666666, 0.15);
                for (let y = 0; y < shapeData.height; y += 6) {
                    g.beginPath();
                    g.moveTo(3 + wobble(), y + 3 + wobble());
                    g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
                    g.strokePath();
                }
                g.lineStyle(2, 0x1a1a1a);  // Reset for outline
                
                // Outline
                g.beginPath();
                g.moveTo(points[0].x + wobble() + 3, points[0].y + wobble() + 3);
                for (let i = 1; i < points.length; i++) {
                    g.lineTo(points[i].x + wobble() + 3, points[i].y + wobble() + 3);
                }
                g.lineTo(points[0].x + wobble() + 3, points[0].y + wobble() + 3);
                g.strokePath();
            }
            
            g.generateTexture(shapeName, shapeData.width + 6, shapeData.height + 6);
            g.destroy();
        };
        
        // Generate textures for all shapes in the library (only if they don't exist)
        for (const [name, data] of Object.entries(PLATFORM_SHAPES)) {
            if (!this.textures.exists(name)) {
                this.createSketchyShape(name, data);
            }
        }
        
        // Select level layout (use passed index or default to 0)
        this.currentLayoutIndex = (this.scene.settings.data && this.scene.settings.data.layoutIndex !== undefined) 
            ? this.scene.settings.data.layoutIndex 
            : 0;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex])
        
        
        // === PLAYER (hand-drawn stick figure - 0.75x original) ===
        if (!this.textures.exists('player')) {
            const playerGraphics = this.add.graphics();
            playerGraphics.lineStyle(1.5, 0x1a1a1a);  // Black pen
            
            // Simple stick figure: head, body, legs
            // Head (circle)
            playerGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 5.25);
            playerGraphics.lineTo(4.5, 10.5);
            playerGraphics.strokePath();
            // Arms (line across)
            playerGraphics.beginPath();
            playerGraphics.moveTo(1.5, 7.5);
            playerGraphics.lineTo(7.5, 7.5);
            playerGraphics.strokePath();
            // Legs (two lines)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(2.25, 15);
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(6.75, 15);
            playerGraphics.strokePath();
            
            playerGraphics.generateTexture('player', 9, 17);
            playerGraphics.destroy();
        }
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        
        // Player dies if they touch water!
        this.physics.add.overlap(this.player, this.waterZone, this.playerDied, null, this);
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Mouse input for shooting (and continuing after level complete)
        this.input.on('pointerdown', (pointer) => {
            if (this.levelInProgress) {
                this.shoot(pointer.x, pointer.y);
            } else {
                // Level is complete, click to start next level
                this.startNextLevel();
            }
        });
        
        
        // === BULLETS ===
        // === BULLET (hand-drawn dash) ===
        if (!this.textures.exists('bullet')) {
            const bulletGraphics = this.add.graphics();
            bulletGraphics.lineStyle(2, 0x1a1a1a);  // Black pen stroke
            bulletGraphics.beginPath();
            bulletGraphics.moveTo(0, 2);
            bulletGraphics.lineTo(8, 2);
            bulletGraphics.strokePath();
            bulletGraphics.generateTexture('bullet', 10, 4);
            bulletGraphics.destroy();
        }
        
        // Now create the group that uses the texture
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });
        
        
        // === ENEMIES ===
        // === ENEMY (hand-drawn stick figure in red - 0.75x original) ===
        if (!this.textures.exists('enemy')) {
            const enemyGraphics = this.add.graphics();
            enemyGraphics.lineStyle(1.5, 0xcc3333);  // Red pen
            
            // Same stick figure shape as player
            // Head (circle)
            enemyGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 5.25);
            enemyGraphics.lineTo(4.5, 10.5);
            enemyGraphics.strokePath();
            // Arms (line across)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(1.5, 7.5);
            enemyGraphics.lineTo(7.5, 7.5);
            enemyGraphics.strokePath();
            // Legs (two lines)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(2.25, 15);
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(6.75, 15);
            enemyGraphics.strokePath();
            
            enemyGraphics.generateTexture('enemy', 9, 17);
            enemyGraphics.destroy();
        }
        
        // Create enemies group
        this.enemies = this.physics.add.group();
        
        // Spawn initial enemies on platforms
        this.spawnEnemy(450, 600);   // Bottom right platform
        this.spawnEnemy(280, 460);   // Middle platform
        this.spawnEnemy(380, 390);   // Row 4
        this.spawnEnemy(380, 250);   // Top platform
        
        // Make enemies collide with platforms (so they sit on them)
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Bullets hit enemies!
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        
        
        // === UI TEXT ===
        // Show some instructions (smaller for notebook canvas)
        this.add.text(60, 16, 'Arrows: move | Click: shoot | R/G: restart/new | F: fly | H: hitbox', {
            fontSize: '9px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Debug controls (R/G/F/H keys)
        this.debugControls = new DebugControls(this);
        
        // Enemy counter (positioned for notebook canvas)
        this.enemyCountText = this.add.text(60, 32, '', {
            fontSize: '11px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        this.updateEnemyCount();
        
        // Level complete text (hidden initially) - centered for 700px canvas
        this.levelCompleteText = this.add.text(350, 400, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '28px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 18, y: 10 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(350, 460, 'Click to continue', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 5 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display
        this.levelText = this.add.text(610, 16, 'Level: 1', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 6, y: 3 }
        });
        
        // Layout number display (for debugging)
        this.layoutText = this.add.text(60, 48, `Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`, {
            fontSize: '11px',
            fill: '#666',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Spawn points will be generated from the layout
        this.spawnPoints = [];
        
        // Player start position (will be set by layout)
        this.playerStartX = 100;
        this.playerStartY = 600;
    }
    
    /**
     * Load a level layout from the library
     */
    loadLayout(layout) {
        // Clear existing platforms
        this.platforms.clear(true, true);
        
        // Clear spawn points
        this.spawnPoints = [];
        
        // Create platforms from layout
        for (const plat of layout.platforms) {
            const shapeData = PLATFORM_SHAPES[plat.shape];
            
            // Check if this is a compound shape (has separate collision parts)
            if (shapeData.parts) {
                // Compound shape: create visual-only sprite + separate collision bodies
                
                // Add visual sprite (no physics)
                const visual = this.add.image(plat.x, plat.y, plat.shape);
                
                // Create collision bodies for each part
                for (const part of shapeData.parts) {
                    // Part coordinates are relative to shape origin (top-left)
                    // Convert to world position (plat.x, plat.y is center of shape)
                    const partX = plat.x - shapeData.width / 2 + part.x + part.w / 2;
                    const partY = plat.y - shapeData.height / 2 + part.y + part.h / 2;
                    
                    // Create invisible collision rectangle
                    const collider = this.add.rectangle(partX, partY, part.w, part.h, 0x000000, 0);
                    this.physics.add.existing(collider, true);  // true = static
                    this.platforms.add(collider);
                }
            } else {
                // Simple shape: single collision body (original behavior)
                const platform = this.platforms.create(plat.x, plat.y, plat.shape);
            }
            
            // Add this platform position as a spawn point
            // Spawn point is on top of the platform
            this.spawnPoints.push({
                x: plat.x,
                y: plat.y - shapeData.height / 2 - 15  // Above the platform
            });
        }
        
        // Set player start to first platform
        if (layout.platforms.length > 0) {
            const firstPlat = layout.platforms[0];
            const firstShape = PLATFORM_SHAPES[firstPlat.shape];
            this.playerStartX = firstPlat.x;
            this.playerStartY = firstPlat.y - firstShape.height / 2 - 15;
        }
    }
    
    /**
     * Spawn an enemy at a position
     */
    spawnEnemy(x, y) {
        const enemy = this.enemies.create(x, y, 'enemy');
        enemy.setBounce(0);
        enemy.setCollideWorldBounds(true);
    }
    
    /**
     * Called when a bullet hits an enemy
     */
    bulletHitEnemy(bullet, enemy) {
        // Deactivate the bullet
        bullet.setActive(false);
        bullet.setVisible(false);
        
        // Destroy the enemy
        enemy.destroy();
        
        // Update the counter
        this.updateEnemyCount();
        
        // Check for level complete
        if (this.enemies.countActive() === 0) {
            this.levelComplete();
        }
    }
    
    /**
     * Update the enemy count display
     */
    updateEnemyCount() {
        const count = this.enemies.countActive();
        this.enemyCountText.setText(`Enemies remaining: ${count}`);
    }
    
    /**
     * Called when all enemies are defeated
     */
    levelComplete() {
        this.levelInProgress = false;
        this.levelCompleteText.setVisible(true);
        this.clickToContinueText.setVisible(true);
    }
    
    /**
     * Start the next level - cycle through layouts and spawn enemies
     */
    startNextLevel() {
        this.currentLevel++;
        this.levelText.setText(`Level: ${this.currentLevel}`);
        
        // Hide completion messages
        this.levelCompleteText.setVisible(false);
        this.clickToContinueText.setVisible(false);
        
        // Clear any remaining bullets
        this.bullets.children.each((bullet) => {
            bullet.setActive(false);
            bullet.setVisible(false);
        });
        
        // Cycle to next layout (or random)
        this.currentLayoutIndex = (this.currentLayoutIndex + 1) % LEVEL_LAYOUTS.length;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex]);
        
        // Re-add platform and wall collisions
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Spawn enemies at random positions
        // More enemies as levels progress (4 + 1 per 2 levels, max based on spawn points)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), this.spawnPoints.length - 1);
        
        // Filter out player start position from spawn points for enemies
        const enemySpawnPoints = this.spawnPoints.filter(
            p => !(Math.abs(p.x - this.playerStartX) < 10 && Math.abs(p.y - this.playerStartY) < 10)
        );
        
        // Shuffle and pick
        const shuffled = Phaser.Utils.Array.Shuffle([...enemySpawnPoints]);
        for (let i = 0; i < enemyCount && i < shuffled.length; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position - use body.reset for proper physics sync
        this.player.body.reset(this.playerStartX, this.playerStartY);
    }
    
    /**
     * Called when player touches water
     */
    playerDied() {
        // Prevent multiple triggers while respawning
        if (this.isRespawning) return;
        this.isRespawning = true;
        
        // Force physics body to fully reset at new position
        // This syncs sprite + physics body immediately to prevent desync
        this.player.body.reset(this.playerStartX, this.playerStartY);
        
        // Brief visual feedback - flash the player
        this.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            this.player.clearTint();
        });
        
        // Clear respawn flag after player has time to land
        this.time.delayedCall(500, () => {
            this.isRespawning = false;
        });
    }

    update() {
        // This runs every frame - handle player movement here
        
        // Check debug controls (R/G/F/H keys)
        const debugAction = this.debugControls.update(this.player, this.currentLayoutIndex, LEVEL_LAYOUTS.length);
        if (debugAction) {
            if (debugAction.action === 'restart') {
                this.scene.restart({ layoutIndex: debugAction.layoutIndex });
                return;
            }
            // flyToggled and hitboxToggled are handled internally by DebugControls
        }
        
        const speed = 120;  // Scaled down for smaller characters
        const flySpeed = 200;  // Speed when flying
        const jumpVelocity = -280;  // Scaled down - smaller jump for zoomed-out feel
        
        // Left/Right movement
        const flyMode = this.debugControls.isFlyMode();
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(flyMode ? -flySpeed : -speed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(flyMode ? flySpeed : speed);
        } else {
            // No arrow pressed - stop horizontal movement
            this.player.setVelocityX(0);
        }
        
        // Up/Down movement (fly mode) or jumping (normal mode)
        if (flyMode) {
            // Fly mode: up/down arrows move vertically
            if (this.cursors.up.isDown) {
                this.player.setVelocityY(-flySpeed);
            } else if (this.cursors.down.isDown) {
                this.player.setVelocityY(flySpeed);
            } else {
                this.player.setVelocityY(0);
            }
        } else {
            // Normal mode: jumping when touching ground
            if (this.cursors.up.isDown && this.player.body.blocked.down) {
                this.player.setVelocityY(jumpVelocity);
            }
        }
        
        // Clean up bullets that have left the screen
        this.bullets.children.each((bullet) => {
            if (bullet.active && (bullet.x < -50 || bullet.x > 750 || bullet.y < -50 || bullet.y > 950)) {
                bullet.setActive(false);
                bullet.setVisible(false);
            }
        });
    }
    
    /**
     * Shoot a bullet toward a target position
     * @param {number} targetX - X coordinate to shoot toward
     * @param {number} targetY - Y coordinate to shoot toward
     */
    shoot(targetX, targetY) {
        // Get a bullet from the group (reuses inactive bullets)
        const bullet = this.bullets.get(this.player.x, this.player.y);
        
        if (!bullet) return;  // No bullets available
        
        bullet.setActive(true);
        bullet.setVisible(true);
        
        // Calculate direction to target
        const angle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            targetX, targetY
        );
        
        // Set bullet velocity toward target
        const bulletSpeed = 600;
        bullet.setVelocity(
            Math.cos(angle) * bulletSpeed,
            Math.sin(angle) * bulletSpeed
        );
        
        // Rotate bullet to face direction of travel
        bullet.setRotation(angle);
        
        // Bullets shouldn't be affected by gravity
        bullet.body.allowGravity = false;
    }
}


```

## Step 2 Complete! ✓

**What changed:**

1. **Created** `js/drawing/EnvironmentRenderer.js` - New module with `drawWalls()` and `drawWater()` functions
2. **Updated** `PlayScene.js` - Replaced ~140 lines of wall/water code with 2 function calls

**PlayScene.js:** 780 → 624 lines (reduced by ~156 lines)

---

### Test it now:

1. Refresh http://localhost:8000

2. **Check visuals:**
   - Walls should still appear on left and right with the crayon fill/hatching
   - Water should still appear at the bottom with the wavy blue line
   
3. **Check collisions:**
   - Player should still collide with walls (can't walk off sides)
   - Falling into water should still respawn the player

4. **Debug controls should still work:** R/G/F/H

Let me know when it's working and I'll continue to **Step 3: Extract ShapeRenderer** (the `createSketchyShape` function for platform textures).

---

**User**

looks great so far!

---

**Cursor**

Excellent! On to Step 3.

## Step 3: Extract ShapeRenderer

I'll extract the platform texture generation code.

```javascript
/**
 * ShapeRenderer.js - Generates hand-drawn textures for platform shapes
 * 
 * Creates sketchy, crayon-style textures for all platform shapes.
 * Handles both simple shapes (single polygon) and compound shapes (multiple parts).
 */

/**
 * Create a sketchy hand-drawn texture for a shape
 * @param {Phaser.Scene} scene - The scene to create the texture in
 * @param {string} shapeName - Name for the texture
 * @param {Object} shapeData - Shape definition with points/parts, width, height
 */
export function createSketchyShape(scene, shapeName, shapeData) {
    const g = scene.add.graphics();
    const wobble = () => (Math.random() - 0.5) * 2;
    
    g.lineStyle(2, 0x1a1a1a);  // Dark pen color
    
    // Check if this is a compound shape (has parts array)
    if (shapeData.parts) {
        // Compound shape: check if it has custom visual outline (points) or just draw parts
        if (shapeData.outlines) {
            // Has multiple outline groups - draw each as connected shape
            for (const outline of shapeData.outlines) {
                // Crayon-like fill
                g.fillStyle(0x888888, 0.24);
                g.beginPath();
                g.moveTo(outline[0].x + 3, outline[0].y + 3);
                for (let i = 1; i < outline.length; i++) {
                    g.lineTo(outline[i].x + 3, outline[i].y + 3);
                }
                g.closePath();
                g.fillPath();
            }
            
            // Add crayon strokes across the whole shape
            g.lineStyle(0.5, 0x666666, 0.15);
            for (let y = 0; y < shapeData.height; y += 6) {
                g.beginPath();
                g.moveTo(3 + wobble(), y + 3 + wobble());
                g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
                g.strokePath();
            }
            g.lineStyle(2, 0x1a1a1a);
            
            // Draw outlines
            for (const outline of shapeData.outlines) {
                g.beginPath();
                g.moveTo(outline[0].x + wobble() + 3, outline[0].y + wobble() + 3);
                for (let i = 1; i < outline.length; i++) {
                    g.lineTo(outline[i].x + wobble() + 3, outline[i].y + wobble() + 3);
                }
                g.closePath();
                g.strokePath();
            }
        } else {
            // No custom outline - draw each part as separate rectangle
            for (const part of shapeData.parts) {
                // Crayon-like fill
                g.fillStyle(0x888888, 0.24);
                g.fillRect(part.x + 3, part.y + 3, part.w, part.h);
            }
            
            // Add crayon strokes
            g.lineStyle(0.5, 0x666666, 0.15);
            for (let y = 0; y < shapeData.height; y += 6) {
                g.beginPath();
                g.moveTo(3 + wobble(), y + 3 + wobble());
                g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
                g.strokePath();
            }
            g.lineStyle(2, 0x1a1a1a);
            
            // Draw outlines
            for (const part of shapeData.parts) {
                g.beginPath();
                g.moveTo(part.x + wobble() + 3, part.y + wobble() + 3);
                g.lineTo(part.x + part.w + wobble() + 3, part.y + wobble() + 3);
                g.lineTo(part.x + part.w + wobble() + 3, part.y + part.h + wobble() + 3);
                g.lineTo(part.x + wobble() + 3, part.y + part.h + wobble() + 3);
                g.lineTo(part.x + wobble() + 3, part.y + wobble() + 3);
                g.strokePath();
            }
        }
    } else {
        // Simple shape: draw from points array (original behavior)
        const points = shapeData.points;
        
        // Crayon-like fill
        g.fillStyle(0x888888, 0.24);
        g.beginPath();
        g.moveTo(points[0].x + 3, points[0].y + 3);
        for (let i = 1; i < points.length; i++) {
            g.lineTo(points[i].x + 3, points[i].y + 3);
        }
        g.closePath();
        g.fillPath();
        
        // Add subtle diagonal crayon strokes
        g.lineStyle(0.5, 0x666666, 0.15);
        for (let y = 0; y < shapeData.height; y += 6) {
            g.beginPath();
            g.moveTo(3 + wobble(), y + 3 + wobble());
            g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
            g.strokePath();
        }
        g.lineStyle(2, 0x1a1a1a);  // Reset for outline
        
        // Outline
        g.beginPath();
        g.moveTo(points[0].x + wobble() + 3, points[0].y + wobble() + 3);
        for (let i = 1; i < points.length; i++) {
            g.lineTo(points[i].x + wobble() + 3, points[i].y + wobble() + 3);
        }
        g.lineTo(points[0].x + wobble() + 3, points[0].y + wobble() + 3);
        g.strokePath();
    }
    
    g.generateTexture(shapeName, shapeData.width + 6, shapeData.height + 6);
    g.destroy();
}

/**
 * Generate textures for all shapes in the library (skips if already exists)
 * @param {Phaser.Scene} scene - The scene to create textures in
 * @param {Object} shapes - Shape definitions object (PLATFORM_SHAPES)
 */
export function generateAllShapeTextures(scene, shapes) {
    for (const [name, data] of Object.entries(shapes)) {
        if (!scene.textures.exists(name)) {
            createSketchyShape(scene, name, data);
        }
    }
}

```

Now let me update `PlayScene.js` to use the new module:

```javascript
/**
 * PlayScene - Main gameplay scene
 * 
 * This is where the actual game happens. Phaser scenes have three main methods:
 * - preload(): Load assets (images, sounds, etc.)
 * - create(): Set up game objects, physics, input (runs once when scene starts)
 * - update(): Game loop, runs every frame (~60 times per second)
 */

import { DebugControls } from '../utils/DebugControls.js';
import { PLATFORM_SHAPES, LEVEL_LAYOUTS } from '../platforms/PlatformShapes.js';
import { drawWalls, drawWater } from '../drawing/EnvironmentRenderer.js';
import { generateAllShapeTextures } from '../drawing/ShapeRenderer.js';

export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        // Load the user-cropped notebook paper background (preserves scale)
        this.load.image('notebook-paper', 'assets/cropped-notebook-page.png');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using cropped image) ===
        // Paper is pre-cropped to edges, just scale to fit canvas
        const paper = this.add.image(350, 450, 'notebook-paper');
        paper.setDisplaySize(700, 900);
        
        
        // === WALLS (hand-drawn style with crayon fill) ===
        this.walls = drawWalls(this);
        
        // === WATER HAZARD (with crayon-like blue fill) ===
        this.waterZone = drawWater(this);
        
        
        // === PLATFORMS (using shape library) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Helper function to draw a sketchy shape
        this.createSketchyShape = (shapeName, shapeData) => {
            const g = this.add.graphics();
            const wobble = () => (Math.random() - 0.5) * 2;
            
            g.lineStyle(2, 0x1a1a1a);  // Dark pen color
            
            // Check if this is a compound shape (has parts array)
            if (shapeData.parts) {
                // Compound shape: check if it has custom visual outline (points) or just draw parts
                if (shapeData.outlines) {
                    // Has multiple outline groups - draw each as connected shape
                    for (const outline of shapeData.outlines) {
                        // Crayon-like fill
                        g.fillStyle(0x888888, 0.24);
                        g.beginPath();
                        g.moveTo(outline[0].x + 3, outline[0].y + 3);
                        for (let i = 1; i < outline.length; i++) {
                            g.lineTo(outline[i].x + 3, outline[i].y + 3);
                        }
                        g.closePath();
                        g.fillPath();
                    }
                    
                    // Add crayon strokes across the whole shape
                    g.lineStyle(0.5, 0x666666, 0.15);
                    for (let y = 0; y < shapeData.height; y += 6) {
                        g.beginPath();
                        g.moveTo(3 + wobble(), y + 3 + wobble());
                        g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
                        g.strokePath();
                    }
                    g.lineStyle(2, 0x1a1a1a);
                    
                    // Draw outlines
                    for (const outline of shapeData.outlines) {
                        g.beginPath();
                        g.moveTo(outline[0].x + wobble() + 3, outline[0].y + wobble() + 3);
                        for (let i = 1; i < outline.length; i++) {
                            g.lineTo(outline[i].x + wobble() + 3, outline[i].y + wobble() + 3);
                        }
                        g.closePath();
                        g.strokePath();
                    }
                } else {
                    // No custom outline - draw each part as separate rectangle
                    for (const part of shapeData.parts) {
                        // Crayon-like fill
                        g.fillStyle(0x888888, 0.24);
                        g.fillRect(part.x + 3, part.y + 3, part.w, part.h);
                    }
                    
                    // Add crayon strokes
                    g.lineStyle(0.5, 0x666666, 0.15);
                    for (let y = 0; y < shapeData.height; y += 6) {
                        g.beginPath();
                        g.moveTo(3 + wobble(), y + 3 + wobble());
                        g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
                        g.strokePath();
                    }
                    g.lineStyle(2, 0x1a1a1a);
                    
                    // Draw outlines
                    for (const part of shapeData.parts) {
                        g.beginPath();
                        g.moveTo(part.x + wobble() + 3, part.y + wobble() + 3);
                        g.lineTo(part.x + part.w + wobble() + 3, part.y + wobble() + 3);
                        g.lineTo(part.x + part.w + wobble() + 3, part.y + part.h + wobble() + 3);
                        g.lineTo(part.x + wobble() + 3, part.y + part.h + wobble() + 3);
                        g.lineTo(part.x + wobble() + 3, part.y + wobble() + 3);
                        g.strokePath();
                    }
                }
            } else {
                // Simple shape: draw from points array (original behavior)
                const points = shapeData.points;
                
                // Crayon-like fill
                g.fillStyle(0x888888, 0.24);
                g.beginPath();
                g.moveTo(points[0].x + 3, points[0].y + 3);
                for (let i = 1; i < points.length; i++) {
                    g.lineTo(points[i].x + 3, points[i].y + 3);
                }
                g.closePath();
                g.fillPath();
                
                // Add subtle diagonal crayon strokes
                g.lineStyle(0.5, 0x666666, 0.15);
                for (let y = 0; y < shapeData.height; y += 6) {
                    g.beginPath();
                    g.moveTo(3 + wobble(), y + 3 + wobble());
                    g.lineTo(Math.min(shapeData.width, y + 20) + 3 + wobble(), Math.min(shapeData.height, y + 20) + 3 + wobble());
                    g.strokePath();
                }
                g.lineStyle(2, 0x1a1a1a);  // Reset for outline
                
                // Outline
                g.beginPath();
                g.moveTo(points[0].x + wobble() + 3, points[0].y + wobble() + 3);
                for (let i = 1; i < points.length; i++) {
                    g.lineTo(points[i].x + wobble() + 3, points[i].y + wobble() + 3);
                }
                g.lineTo(points[0].x + wobble() + 3, points[0].y + wobble() + 3);
                g.strokePath();
            }
            
            g.generateTexture(shapeName, shapeData.width + 6, shapeData.height + 6);
            g.destroy();
        };
        
        // Generate textures for all shapes in the library (only if they don't exist)
        for (const [name, data] of Object.entries(PLATFORM_SHAPES)) {
            if (!this.textures.exists(name)) {
                this.createSketchyShape(name, data);
            }
        }
        
        // Select level layout (use passed index or default to 0)
        this.currentLayoutIndex = (this.scene.settings.data && this.scene.settings.data.layoutIndex !== undefined) 
            ? this.scene.settings.data.layoutIndex 
            : 0;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex])
        
        
        // === PLAYER (hand-drawn stick figure - 0.75x original) ===
        if (!this.textures.exists('player')) {
            const playerGraphics = this.add.graphics();
            playerGraphics.lineStyle(1.5, 0x1a1a1a);  // Black pen
            
            // Simple stick figure: head, body, legs
            // Head (circle)
            playerGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 5.25);
            playerGraphics.lineTo(4.5, 10.5);
            playerGraphics.strokePath();
            // Arms (line across)
            playerGraphics.beginPath();
            playerGraphics.moveTo(1.5, 7.5);
            playerGraphics.lineTo(7.5, 7.5);
            playerGraphics.strokePath();
            // Legs (two lines)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(2.25, 15);
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(6.75, 15);
            playerGraphics.strokePath();
            
            playerGraphics.generateTexture('player', 9, 17);
            playerGraphics.destroy();
        }
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        
        // Player dies if they touch water!
        this.physics.add.overlap(this.player, this.waterZone, this.playerDied, null, this);
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Mouse input for shooting (and continuing after level complete)
        this.input.on('pointerdown', (pointer) => {
            if (this.levelInProgress) {
                this.shoot(pointer.x, pointer.y);
            } else {
                // Level is complete, click to start next level
                this.startNextLevel();
            }
        });
        
        
        // === BULLETS ===
        // === BULLET (hand-drawn dash) ===
        if (!this.textures.exists('bullet')) {
            const bulletGraphics = this.add.graphics();
            bulletGraphics.lineStyle(2, 0x1a1a1a);  // Black pen stroke
            bulletGraphics.beginPath();
            bulletGraphics.moveTo(0, 2);
            bulletGraphics.lineTo(8, 2);
            bulletGraphics.strokePath();
            bulletGraphics.generateTexture('bullet', 10, 4);
            bulletGraphics.destroy();
        }
        
        // Now create the group that uses the texture
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });
        
        
        // === ENEMIES ===
        // === ENEMY (hand-drawn stick figure in red - 0.75x original) ===
        if (!this.textures.exists('enemy')) {
            const enemyGraphics = this.add.graphics();
            enemyGraphics.lineStyle(1.5, 0xcc3333);  // Red pen
            
            // Same stick figure shape as player
            // Head (circle)
            enemyGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 5.25);
            enemyGraphics.lineTo(4.5, 10.5);
            enemyGraphics.strokePath();
            // Arms (line across)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(1.5, 7.5);
            enemyGraphics.lineTo(7.5, 7.5);
            enemyGraphics.strokePath();
            // Legs (two lines)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(2.25, 15);
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(6.75, 15);
            enemyGraphics.strokePath();
            
            enemyGraphics.generateTexture('enemy', 9, 17);
            enemyGraphics.destroy();
        }
        
        // Create enemies group
        this.enemies = this.physics.add.group();
        
        // Spawn initial enemies on platforms
        this.spawnEnemy(450, 600);   // Bottom right platform
        this.spawnEnemy(280, 460);   // Middle platform
        this.spawnEnemy(380, 390);   // Row 4
        this.spawnEnemy(380, 250);   // Top platform
        
        // Make enemies collide with platforms (so they sit on them)
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Bullets hit enemies!
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        
        
        // === UI TEXT ===
        // Show some instructions (smaller for notebook canvas)
        this.add.text(60, 16, 'Arrows: move | Click: shoot | R/G: restart/new | F: fly | H: hitbox', {
            fontSize: '9px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Debug controls (R/G/F/H keys)
        this.debugControls = new DebugControls(this);
        
        // Enemy counter (positioned for notebook canvas)
        this.enemyCountText = this.add.text(60, 32, '', {
            fontSize: '11px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        this.updateEnemyCount();
        
        // Level complete text (hidden initially) - centered for 700px canvas
        this.levelCompleteText = this.add.text(350, 400, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '28px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 18, y: 10 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(350, 460, 'Click to continue', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 5 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display
        this.levelText = this.add.text(610, 16, 'Level: 1', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 6, y: 3 }
        });
        
        // Layout number display (for debugging)
        this.layoutText = this.add.text(60, 48, `Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`, {
            fontSize: '11px',
            fill: '#666',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Spawn points will be generated from the layout
        this.spawnPoints = [];
        
        // Player start position (will be set by layout)
        this.playerStartX = 100;
        this.playerStartY = 600;
    }
    
    /**
     * Load a level layout from the library
     */
    loadLayout(layout) {
        // Clear existing platforms
        this.platforms.clear(true, true);
        
        // Clear spawn points
        this.spawnPoints = [];
        
        // Create platforms from layout
        for (const plat of layout.platforms) {
            const shapeData = PLATFORM_SHAPES[plat.shape];
            
            // Check if this is a compound shape (has separate collision parts)
            if (shapeData.parts) {
                // Compound shape: create visual-only sprite + separate collision bodies
                
                // Add visual sprite (no physics)
                const visual = this.add.image(plat.x, plat.y, plat.shape);
                
                // Create collision bodies for each part
                for (const part of shapeData.parts) {
                    // Part coordinates are relative to shape origin (top-left)
                    // Convert to world position (plat.x, plat.y is center of shape)
                    const partX = plat.x - shapeData.width / 2 + part.x + part.w / 2;
                    const partY = plat.y - shapeData.height / 2 + part.y + part.h / 2;
                    
                    // Create invisible collision rectangle
                    const collider = this.add.rectangle(partX, partY, part.w, part.h, 0x000000, 0);
                    this.physics.add.existing(collider, true);  // true = static
                    this.platforms.add(collider);
                }
            } else {
                // Simple shape: single collision body (original behavior)
                const platform = this.platforms.create(plat.x, plat.y, plat.shape);
            }
            
            // Add this platform position as a spawn point
            // Spawn point is on top of the platform
            this.spawnPoints.push({
                x: plat.x,
                y: plat.y - shapeData.height / 2 - 15  // Above the platform
            });
        }
        
        // Set player start to first platform
        if (layout.platforms.length > 0) {
            const firstPlat = layout.platforms[0];
            const firstShape = PLATFORM_SHAPES[firstPlat.shape];
            this.playerStartX = firstPlat.x;
            this.playerStartY = firstPlat.y - firstShape.height / 2 - 15;
        }
    }
    
    /**
     * Spawn an enemy at a position
     */
    spawnEnemy(x, y) {
        const enemy = this.enemies.create(x, y, 'enemy');
        enemy.setBounce(0);
        enemy.setCollideWorldBounds(true);
    }
    
    /**
     * Called when a bullet hits an enemy
     */
    bulletHitEnemy(bullet, enemy) {
        // Deactivate the bullet
        bullet.setActive(false);
        bullet.setVisible(false);
        
        // Destroy the enemy
        enemy.destroy();
        
        // Update the counter
        this.updateEnemyCount();
        
        // Check for level complete
        if (this.enemies.countActive() === 0) {
            this.levelComplete();
        }
    }
    
    /**
     * Update the enemy count display
     */
    updateEnemyCount() {
        const count = this.enemies.countActive();
        this.enemyCountText.setText(`Enemies remaining: ${count}`);
    }
    
    /**
     * Called when all enemies are defeated
     */
    levelComplete() {
        this.levelInProgress = false;
        this.levelCompleteText.setVisible(true);
        this.clickToContinueText.setVisible(true);
    }
    
    /**
     * Start the next level - cycle through layouts and spawn enemies
     */
    startNextLevel() {
        this.currentLevel++;
        this.levelText.setText(`Level: ${this.currentLevel}`);
        
        // Hide completion messages
        this.levelCompleteText.setVisible(false);
        this.clickToContinueText.setVisible(false);
        
        // Clear any remaining bullets
        this.bullets.children.each((bullet) => {
            bullet.setActive(false);
            bullet.setVisible(false);
        });
        
        // Cycle to next layout (or random)
        this.currentLayoutIndex = (this.currentLayoutIndex + 1) % LEVEL_LAYOUTS.length;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex]);
        
        // Re-add platform and wall collisions
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Spawn enemies at random positions
        // More enemies as levels progress (4 + 1 per 2 levels, max based on spawn points)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), this.spawnPoints.length - 1);
        
        // Filter out player start position from spawn points for enemies
        const enemySpawnPoints = this.spawnPoints.filter(
            p => !(Math.abs(p.x - this.playerStartX) < 10 && Math.abs(p.y - this.playerStartY) < 10)
        );
        
        // Shuffle and pick
        const shuffled = Phaser.Utils.Array.Shuffle([...enemySpawnPoints]);
        for (let i = 0; i < enemyCount && i < shuffled.length; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position - use body.reset for proper physics sync
        this.player.body.reset(this.playerStartX, this.playerStartY);
    }
    
    /**
     * Called when player touches water
     */
    playerDied() {
        // Prevent multiple triggers while respawning
        if (this.isRespawning) return;
        this.isRespawning = true;
        
        // Force physics body to fully reset at new position
        // This syncs sprite + physics body immediately to prevent desync
        this.player.body.reset(this.playerStartX, this.playerStartY);
        
        // Brief visual feedback - flash the player
        this.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            this.player.clearTint();
        });
        
        // Clear respawn flag after player has time to land
        this.time.delayedCall(500, () => {
            this.isRespawning = false;
        });
    }

    update() {
        // This runs every frame - handle player movement here
        
        // Check debug controls (R/G/F/H keys)
        const debugAction = this.debugControls.update(this.player, this.currentLayoutIndex, LEVEL_LAYOUTS.length);
        if (debugAction) {
            if (debugAction.action === 'restart') {
                this.scene.restart({ layoutIndex: debugAction.layoutIndex });
                return;
            }
            // flyToggled and hitboxToggled are handled internally by DebugControls
        }
        
        const speed = 120;  // Scaled down for smaller characters
        const flySpeed = 200;  // Speed when flying
        const jumpVelocity = -280;  // Scaled down - smaller jump for zoomed-out feel
        
        // Left/Right movement
        const flyMode = this.debugControls.isFlyMode();
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(flyMode ? -flySpeed : -speed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(flyMode ? flySpeed : speed);
        } else {
            // No arrow pressed - stop horizontal movement
            this.player.setVelocityX(0);
        }
        
        // Up/Down movement (fly mode) or jumping (normal mode)
        if (flyMode) {
            // Fly mode: up/down arrows move vertically
            if (this.cursors.up.isDown) {
                this.player.setVelocityY(-flySpeed);
            } else if (this.cursors.down.isDown) {
                this.player.setVelocityY(flySpeed);
            } else {
                this.player.setVelocityY(0);
            }
        } else {
            // Normal mode: jumping when touching ground
            if (this.cursors.up.isDown && this.player.body.blocked.down) {
                this.player.setVelocityY(jumpVelocity);
            }
        }
        
        // Clean up bullets that have left the screen
        this.bullets.children.each((bullet) => {
            if (bullet.active && (bullet.x < -50 || bullet.x > 750 || bullet.y < -50 || bullet.y > 950)) {
                bullet.setActive(false);
                bullet.setVisible(false);
            }
        });
    }
    
    /**
     * Shoot a bullet toward a target position
     * @param {number} targetX - X coordinate to shoot toward
     * @param {number} targetY - Y coordinate to shoot toward
     */
    shoot(targetX, targetY) {
        // Get a bullet from the group (reuses inactive bullets)
        const bullet = this.bullets.get(this.player.x, this.player.y);
        
        if (!bullet) return;  // No bullets available
        
        bullet.setActive(true);
        bullet.setVisible(true);
        
        // Calculate direction to target
        const angle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            targetX, targetY
        );
        
        // Set bullet velocity toward target
        const bulletSpeed = 600;
        bullet.setVelocity(
            Math.cos(angle) * bulletSpeed,
            Math.sin(angle) * bulletSpeed
        );
        
        // Rotate bullet to face direction of travel
        bullet.setRotation(angle);
        
        // Bullets shouldn't be affected by gravity
        bullet.body.allowGravity = false;
    }
}


```

```javascript
/**
 * PlayScene - Main gameplay scene
 * 
 * This is where the actual game happens. Phaser scenes have three main methods:
 * - preload(): Load assets (images, sounds, etc.)
 * - create(): Set up game objects, physics, input (runs once when scene starts)
 * - update(): Game loop, runs every frame (~60 times per second)
 */

import { DebugControls } from '../utils/DebugControls.js';
import { PLATFORM_SHAPES, LEVEL_LAYOUTS } from '../platforms/PlatformShapes.js';
import { drawWalls, drawWater } from '../drawing/EnvironmentRenderer.js';
import { generateAllShapeTextures } from '../drawing/ShapeRenderer.js';

export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        // Load the user-cropped notebook paper background (preserves scale)
        this.load.image('notebook-paper', 'assets/cropped-notebook-page.png');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using cropped image) ===
        // Paper is pre-cropped to edges, just scale to fit canvas
        const paper = this.add.image(350, 450, 'notebook-paper');
        paper.setDisplaySize(700, 900);
        
        
        // === WALLS (hand-drawn style with crayon fill) ===
        this.walls = drawWalls(this);
        
        // === WATER HAZARD (with crayon-like blue fill) ===
        this.waterZone = drawWater(this);
        
        
        // === PLATFORMS (using shape library) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Generate textures for all shapes in the library
        generateAllShapeTextures(this, PLATFORM_SHAPES);
        
        // Select level layout (use passed index or default to 0)
        this.currentLayoutIndex = (this.scene.settings.data && this.scene.settings.data.layoutIndex !== undefined) 
            ? this.scene.settings.data.layoutIndex 
            : 0;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex])
        
        
        // === PLAYER (hand-drawn stick figure - 0.75x original) ===
        if (!this.textures.exists('player')) {
            const playerGraphics = this.add.graphics();
            playerGraphics.lineStyle(1.5, 0x1a1a1a);  // Black pen
            
            // Simple stick figure: head, body, legs
            // Head (circle)
            playerGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 5.25);
            playerGraphics.lineTo(4.5, 10.5);
            playerGraphics.strokePath();
            // Arms (line across)
            playerGraphics.beginPath();
            playerGraphics.moveTo(1.5, 7.5);
            playerGraphics.lineTo(7.5, 7.5);
            playerGraphics.strokePath();
            // Legs (two lines)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(2.25, 15);
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(6.75, 15);
            playerGraphics.strokePath();
            
            playerGraphics.generateTexture('player', 9, 17);
            playerGraphics.destroy();
        }
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        
        // Player dies if they touch water!
        this.physics.add.overlap(this.player, this.waterZone, this.playerDied, null, this);
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Mouse input for shooting (and continuing after level complete)
        this.input.on('pointerdown', (pointer) => {
            if (this.levelInProgress) {
                this.shoot(pointer.x, pointer.y);
            } else {
                // Level is complete, click to start next level
                this.startNextLevel();
            }
        });
        
        
        // === BULLETS ===
        // === BULLET (hand-drawn dash) ===
        if (!this.textures.exists('bullet')) {
            const bulletGraphics = this.add.graphics();
            bulletGraphics.lineStyle(2, 0x1a1a1a);  // Black pen stroke
            bulletGraphics.beginPath();
            bulletGraphics.moveTo(0, 2);
            bulletGraphics.lineTo(8, 2);
            bulletGraphics.strokePath();
            bulletGraphics.generateTexture('bullet', 10, 4);
            bulletGraphics.destroy();
        }
        
        // Now create the group that uses the texture
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });
        
        
        // === ENEMIES ===
        // === ENEMY (hand-drawn stick figure in red - 0.75x original) ===
        if (!this.textures.exists('enemy')) {
            const enemyGraphics = this.add.graphics();
            enemyGraphics.lineStyle(1.5, 0xcc3333);  // Red pen
            
            // Same stick figure shape as player
            // Head (circle)
            enemyGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 5.25);
            enemyGraphics.lineTo(4.5, 10.5);
            enemyGraphics.strokePath();
            // Arms (line across)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(1.5, 7.5);
            enemyGraphics.lineTo(7.5, 7.5);
            enemyGraphics.strokePath();
            // Legs (two lines)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(2.25, 15);
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(6.75, 15);
            enemyGraphics.strokePath();
            
            enemyGraphics.generateTexture('enemy', 9, 17);
            enemyGraphics.destroy();
        }
        
        // Create enemies group
        this.enemies = this.physics.add.group();
        
        // Spawn initial enemies on platforms
        this.spawnEnemy(450, 600);   // Bottom right platform
        this.spawnEnemy(280, 460);   // Middle platform
        this.spawnEnemy(380, 390);   // Row 4
        this.spawnEnemy(380, 250);   // Top platform
        
        // Make enemies collide with platforms (so they sit on them)
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Bullets hit enemies!
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        
        
        // === UI TEXT ===
        // Show some instructions (smaller for notebook canvas)
        this.add.text(60, 16, 'Arrows: move | Click: shoot | R/G: restart/new | F: fly | H: hitbox', {
            fontSize: '9px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Debug controls (R/G/F/H keys)
        this.debugControls = new DebugControls(this);
        
        // Enemy counter (positioned for notebook canvas)
        this.enemyCountText = this.add.text(60, 32, '', {
            fontSize: '11px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        this.updateEnemyCount();
        
        // Level complete text (hidden initially) - centered for 700px canvas
        this.levelCompleteText = this.add.text(350, 400, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '28px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 18, y: 10 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(350, 460, 'Click to continue', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 5 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display
        this.levelText = this.add.text(610, 16, 'Level: 1', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 6, y: 3 }
        });
        
        // Layout number display (for debugging)
        this.layoutText = this.add.text(60, 48, `Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`, {
            fontSize: '11px',
            fill: '#666',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Spawn points will be generated from the layout
        this.spawnPoints = [];
        
        // Player start position (will be set by layout)
        this.playerStartX = 100;
        this.playerStartY = 600;
    }
    
    /**
     * Load a level layout from the library
     */
    loadLayout(layout) {
        // Clear existing platforms
        this.platforms.clear(true, true);
        
        // Clear spawn points
        this.spawnPoints = [];
        
        // Create platforms from layout
        for (const plat of layout.platforms) {
            const shapeData = PLATFORM_SHAPES[plat.shape];
            
            // Check if this is a compound shape (has separate collision parts)
            if (shapeData.parts) {
                // Compound shape: create visual-only sprite + separate collision bodies
                
                // Add visual sprite (no physics)
                const visual = this.add.image(plat.x, plat.y, plat.shape);
                
                // Create collision bodies for each part
                for (const part of shapeData.parts) {
                    // Part coordinates are relative to shape origin (top-left)
                    // Convert to world position (plat.x, plat.y is center of shape)
                    const partX = plat.x - shapeData.width / 2 + part.x + part.w / 2;
                    const partY = plat.y - shapeData.height / 2 + part.y + part.h / 2;
                    
                    // Create invisible collision rectangle
                    const collider = this.add.rectangle(partX, partY, part.w, part.h, 0x000000, 0);
                    this.physics.add.existing(collider, true);  // true = static
                    this.platforms.add(collider);
                }
            } else {
                // Simple shape: single collision body (original behavior)
                const platform = this.platforms.create(plat.x, plat.y, plat.shape);
            }
            
            // Add this platform position as a spawn point
            // Spawn point is on top of the platform
            this.spawnPoints.push({
                x: plat.x,
                y: plat.y - shapeData.height / 2 - 15  // Above the platform
            });
        }
        
        // Set player start to first platform
        if (layout.platforms.length > 0) {
            const firstPlat = layout.platforms[0];
            const firstShape = PLATFORM_SHAPES[firstPlat.shape];
            this.playerStartX = firstPlat.x;
            this.playerStartY = firstPlat.y - firstShape.height / 2 - 15;
        }
    }
    
    /**
     * Spawn an enemy at a position
     */
    spawnEnemy(x, y) {
        const enemy = this.enemies.create(x, y, 'enemy');
        enemy.setBounce(0);
        enemy.setCollideWorldBounds(true);
    }
    
    /**
     * Called when a bullet hits an enemy
     */
    bulletHitEnemy(bullet, enemy) {
        // Deactivate the bullet
        bullet.setActive(false);
        bullet.setVisible(false);
        
        // Destroy the enemy
        enemy.destroy();
        
        // Update the counter
        this.updateEnemyCount();
        
        // Check for level complete
        if (this.enemies.countActive() === 0) {
            this.levelComplete();
        }
    }
    
    /**
     * Update the enemy count display
     */
    updateEnemyCount() {
        const count = this.enemies.countActive();
        this.enemyCountText.setText(`Enemies remaining: ${count}`);
    }
    
    /**
     * Called when all enemies are defeated
     */
    levelComplete() {
        this.levelInProgress = false;
        this.levelCompleteText.setVisible(true);
        this.clickToContinueText.setVisible(true);
    }
    
    /**
     * Start the next level - cycle through layouts and spawn enemies
     */
    startNextLevel() {
        this.currentLevel++;
        this.levelText.setText(`Level: ${this.currentLevel}`);
        
        // Hide completion messages
        this.levelCompleteText.setVisible(false);
        this.clickToContinueText.setVisible(false);
        
        // Clear any remaining bullets
        this.bullets.children.each((bullet) => {
            bullet.setActive(false);
            bullet.setVisible(false);
        });
        
        // Cycle to next layout (or random)
        this.currentLayoutIndex = (this.currentLayoutIndex + 1) % LEVEL_LAYOUTS.length;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex]);
        
        // Re-add platform and wall collisions
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Spawn enemies at random positions
        // More enemies as levels progress (4 + 1 per 2 levels, max based on spawn points)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), this.spawnPoints.length - 1);
        
        // Filter out player start position from spawn points for enemies
        const enemySpawnPoints = this.spawnPoints.filter(
            p => !(Math.abs(p.x - this.playerStartX) < 10 && Math.abs(p.y - this.playerStartY) < 10)
        );
        
        // Shuffle and pick
        const shuffled = Phaser.Utils.Array.Shuffle([...enemySpawnPoints]);
        for (let i = 0; i < enemyCount && i < shuffled.length; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position - use body.reset for proper physics sync
        this.player.body.reset(this.playerStartX, this.playerStartY);
    }
    
    /**
     * Called when player touches water
     */
    playerDied() {
        // Prevent multiple triggers while respawning
        if (this.isRespawning) return;
        this.isRespawning = true;
        
        // Force physics body to fully reset at new position
        // This syncs sprite + physics body immediately to prevent desync
        this.player.body.reset(this.playerStartX, this.playerStartY);
        
        // Brief visual feedback - flash the player
        this.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            this.player.clearTint();
        });
        
        // Clear respawn flag after player has time to land
        this.time.delayedCall(500, () => {
            this.isRespawning = false;
        });
    }

    update() {
        // This runs every frame - handle player movement here
        
        // Check debug controls (R/G/F/H keys)
        const debugAction = this.debugControls.update(this.player, this.currentLayoutIndex, LEVEL_LAYOUTS.length);
        if (debugAction) {
            if (debugAction.action === 'restart') {
                this.scene.restart({ layoutIndex: debugAction.layoutIndex });
                return;
            }
            // flyToggled and hitboxToggled are handled internally by DebugControls
        }
        
        const speed = 120;  // Scaled down for smaller characters
        const flySpeed = 200;  // Speed when flying
        const jumpVelocity = -280;  // Scaled down - smaller jump for zoomed-out feel
        
        // Left/Right movement
        const flyMode = this.debugControls.isFlyMode();
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(flyMode ? -flySpeed : -speed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(flyMode ? flySpeed : speed);
        } else {
            // No arrow pressed - stop horizontal movement
            this.player.setVelocityX(0);
        }
        
        // Up/Down movement (fly mode) or jumping (normal mode)
        if (flyMode) {
            // Fly mode: up/down arrows move vertically
            if (this.cursors.up.isDown) {
                this.player.setVelocityY(-flySpeed);
            } else if (this.cursors.down.isDown) {
                this.player.setVelocityY(flySpeed);
            } else {
                this.player.setVelocityY(0);
            }
        } else {
            // Normal mode: jumping when touching ground
            if (this.cursors.up.isDown && this.player.body.blocked.down) {
                this.player.setVelocityY(jumpVelocity);
            }
        }
        
        // Clean up bullets that have left the screen
        this.bullets.children.each((bullet) => {
            if (bullet.active && (bullet.x < -50 || bullet.x > 750 || bullet.y < -50 || bullet.y > 950)) {
                bullet.setActive(false);
                bullet.setVisible(false);
            }
        });
    }
    
    /**
     * Shoot a bullet toward a target position
     * @param {number} targetX - X coordinate to shoot toward
     * @param {number} targetY - Y coordinate to shoot toward
     */
    shoot(targetX, targetY) {
        // Get a bullet from the group (reuses inactive bullets)
        const bullet = this.bullets.get(this.player.x, this.player.y);
        
        if (!bullet) return;  // No bullets available
        
        bullet.setActive(true);
        bullet.setVisible(true);
        
        // Calculate direction to target
        const angle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            targetX, targetY
        );
        
        // Set bullet velocity toward target
        const bulletSpeed = 600;
        bullet.setVelocity(
            Math.cos(angle) * bulletSpeed,
            Math.sin(angle) * bulletSpeed
        );
        
        // Rotate bullet to face direction of travel
        bullet.setRotation(angle);
        
        // Bullets shouldn't be affected by gravity
        bullet.body.allowGravity = false;
    }
}


```

## Step 3 Complete! ✓

**What changed:**

1. **Created** `js/drawing/ShapeRenderer.js` - New module with `createSketchyShape()` and `generateAllShapeTextures()`
2. **Updated** `PlayScene.js` - Replaced ~115 lines of shape rendering code with 1 function call

**PlayScene.js:** 624 → 510 lines (reduced by ~114 lines)

---

### Test it now:

1. Refresh http://localhost:8000

2. **Check platforms:**
   - All platforms should still have the sketchy hand-drawn crayon look
   - Press **G** to cycle through layouts and verify all 18 shapes render correctly
   - Layout 2 (the showcase) is a good one to check - it displays all shapes

3. **Check compound shapes specifically:**
   - The `verticalSlot`, `horizontalTunnel`, and `zigZagGap` should have proper gaps you can pass through

Let me know when it's working and I'll continue to the final step: **Step 4: Split PlatformShapes.js** into separate shape and layout definition files.

---

**User**

ok its working perfectly as far as i tested

---

**Cursor**

Let's finish up with the final step.

## Step 4: Split PlatformShapes

I'll create two new focused files and keep `PlatformShapes.js` as a re-export hub for backwards compatibility.

```javascript
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

```

```javascript
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

```

Now I'll update `PlatformShapes.js` to be a simple re-export hub:

```javascript
/**
 * PlatformShapes.js - Re-exports shapes and layouts from their dedicated files
 * 
 * This file exists for backwards compatibility.
 * Import from here, or directly from:
 *   - ShapeDefinitions.js - Platform shape definitions (18 shapes)
 *   - LayoutDefinitions.js - Level layout configurations (6 layouts)
 */

export { PLATFORM_SHAPES } from './ShapeDefinitions.js';
export { LEVEL_LAYOUTS } from './LayoutDefinitions.js';

```

## Step 4 Complete! ✓

**What changed:**

1. **Created** `js/platforms/ShapeDefinitions.js` - Contains all 18 shape definitions (257 lines)
2. **Created** `js/platforms/LayoutDefinitions.js` - Contains all 6 layouts + design rules (279 lines)
3. **Updated** `js/platforms/PlatformShapes.js` - Now a simple 11-line re-export hub

The existing import in `PlayScene.js` still works because `PlatformShapes.js` re-exports everything.

---

### Test it now:

1. Refresh http://localhost:8000
2. Press **G** to cycle through all 6 layouts - they should all work
3. All gameplay should function exactly as before

---

## 🎉 Refactoring Complete!

### Summary

| File | Before | After |
|------|--------|-------|
| `PlayScene.js` | 780 lines | **510 lines** |
| `PlatformShapes.js` | 531 lines | **11 lines** (re-export hub) |

### New File Structure

```
js/
├── game.js                         # Entry point
├── scenes/
│   └── PlayScene.js                # Main scene (510 lines, down from 780)
├── platforms/
│   ├── PlatformShapes.js           # Re-export hub (11 lines)
│   ├── ShapeDefinitions.js         # 18 shapes (257 lines)
│   └── LayoutDefinitions.js        # 6 layouts (279 lines)
├── drawing/
│   ├── EnvironmentRenderer.js      # Walls & water (156 lines)
│   └── ShapeRenderer.js            # Platform textures (128 lines)
└── utils/
    └── DebugControls.js            # R/G/F/H keys (67 lines)
```

**PlayScene.js is now ~35% smaller** and focused on gameplay logic. The drawing, debug, and data concerns are cleanly separated into their own modules.

```plaintext
js/
├── game.js                         # Entry point
├── scenes/
│   └── PlayScene.js                # Main scene (510 lines, down from 780)
├── platforms/
│   ├── PlatformShapes.js           # Re-export hub (11 lines)
│   ├── ShapeDefinitions.js         # 18 shapes (257 lines)
│   └── LayoutDefinitions.js        # 6 layouts (279 lines)
├── drawing/
│   ├── EnvironmentRenderer.js      # Walls & water (156 lines)
│   └── ShapeRenderer.js            # Platform textures (128 lines)
└── utils/
    └── DebugControls.js            # R/G/F/H keys (67 lines)
```

---

**User**

ok things look ok. 1 thing that im not sure if its new or if i didnt notice. the compound shapes stay drawn (without hitboxes) on screen when i complete a level by blasting all the bad guys. i also am confused what clicking to advance after doing that does since i cant tell but it seems the layout sometimes changes? or the layout changes but the label saying which layout does?

---

**Cursor**

Good catch! Let me investigate both issues. I'll look at how layouts are being loaded and cleared.

Found both bugs! Here's what's happening:

1. **Compound shape visuals staying on screen**: In `loadLayout()`, visual sprites for compound shapes (`this.add.image(...)` on line 268) are created but **never tracked or destroyed**. When `platforms.clear()` runs, it only clears the collision bodies, not the visual sprites.

2. **Layout label not updating**: In `startNextLevel()`, the layout index changes but `this.layoutText` is never updated with the new value.

Let me check where the layout text is defined and fix both issues:

Now I'll fix both bugs:

```javascript
/**
 * PlayScene - Main gameplay scene
 * 
 * This is where the actual game happens. Phaser scenes have three main methods:
 * - preload(): Load assets (images, sounds, etc.)
 * - create(): Set up game objects, physics, input (runs once when scene starts)
 * - update(): Game loop, runs every frame (~60 times per second)
 */

import { DebugControls } from '../utils/DebugControls.js';
import { PLATFORM_SHAPES, LEVEL_LAYOUTS } from '../platforms/PlatformShapes.js';
import { drawWalls, drawWater } from '../drawing/EnvironmentRenderer.js';
import { generateAllShapeTextures } from '../drawing/ShapeRenderer.js';

export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        // Load the user-cropped notebook paper background (preserves scale)
        this.load.image('notebook-paper', 'assets/cropped-notebook-page.png');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using cropped image) ===
        // Paper is pre-cropped to edges, just scale to fit canvas
        const paper = this.add.image(350, 450, 'notebook-paper');
        paper.setDisplaySize(700, 900);
        
        
        // === WALLS (hand-drawn style with crayon fill) ===
        this.walls = drawWalls(this);
        
        // === WATER HAZARD (with crayon-like blue fill) ===
        this.waterZone = drawWater(this);
        
        
        // === PLATFORMS (using shape library) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Generate textures for all shapes in the library
        generateAllShapeTextures(this, PLATFORM_SHAPES);
        
        // Select level layout (use passed index or default to 0)
        this.currentLayoutIndex = (this.scene.settings.data && this.scene.settings.data.layoutIndex !== undefined) 
            ? this.scene.settings.data.layoutIndex 
            : 0;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex])
        
        
        // === PLAYER (hand-drawn stick figure - 0.75x original) ===
        if (!this.textures.exists('player')) {
            const playerGraphics = this.add.graphics();
            playerGraphics.lineStyle(1.5, 0x1a1a1a);  // Black pen
            
            // Simple stick figure: head, body, legs
            // Head (circle)
            playerGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 5.25);
            playerGraphics.lineTo(4.5, 10.5);
            playerGraphics.strokePath();
            // Arms (line across)
            playerGraphics.beginPath();
            playerGraphics.moveTo(1.5, 7.5);
            playerGraphics.lineTo(7.5, 7.5);
            playerGraphics.strokePath();
            // Legs (two lines)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(2.25, 15);
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(6.75, 15);
            playerGraphics.strokePath();
            
            playerGraphics.generateTexture('player', 9, 17);
            playerGraphics.destroy();
        }
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        
        // Player dies if they touch water!
        this.physics.add.overlap(this.player, this.waterZone, this.playerDied, null, this);
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Mouse input for shooting (and continuing after level complete)
        this.input.on('pointerdown', (pointer) => {
            if (this.levelInProgress) {
                this.shoot(pointer.x, pointer.y);
            } else {
                // Level is complete, click to start next level
                this.startNextLevel();
            }
        });
        
        
        // === BULLETS ===
        // === BULLET (hand-drawn dash) ===
        if (!this.textures.exists('bullet')) {
            const bulletGraphics = this.add.graphics();
            bulletGraphics.lineStyle(2, 0x1a1a1a);  // Black pen stroke
            bulletGraphics.beginPath();
            bulletGraphics.moveTo(0, 2);
            bulletGraphics.lineTo(8, 2);
            bulletGraphics.strokePath();
            bulletGraphics.generateTexture('bullet', 10, 4);
            bulletGraphics.destroy();
        }
        
        // Now create the group that uses the texture
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });
        
        
        // === ENEMIES ===
        // === ENEMY (hand-drawn stick figure in red - 0.75x original) ===
        if (!this.textures.exists('enemy')) {
            const enemyGraphics = this.add.graphics();
            enemyGraphics.lineStyle(1.5, 0xcc3333);  // Red pen
            
            // Same stick figure shape as player
            // Head (circle)
            enemyGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 5.25);
            enemyGraphics.lineTo(4.5, 10.5);
            enemyGraphics.strokePath();
            // Arms (line across)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(1.5, 7.5);
            enemyGraphics.lineTo(7.5, 7.5);
            enemyGraphics.strokePath();
            // Legs (two lines)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(2.25, 15);
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(6.75, 15);
            enemyGraphics.strokePath();
            
            enemyGraphics.generateTexture('enemy', 9, 17);
            enemyGraphics.destroy();
        }
        
        // Create enemies group
        this.enemies = this.physics.add.group();
        
        // Spawn initial enemies on platforms
        this.spawnEnemy(450, 600);   // Bottom right platform
        this.spawnEnemy(280, 460);   // Middle platform
        this.spawnEnemy(380, 390);   // Row 4
        this.spawnEnemy(380, 250);   // Top platform
        
        // Make enemies collide with platforms (so they sit on them)
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Bullets hit enemies!
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        
        
        // === UI TEXT ===
        // Show some instructions (smaller for notebook canvas)
        this.add.text(60, 16, 'Arrows: move | Click: shoot | R/G: restart/new | F: fly | H: hitbox', {
            fontSize: '9px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Debug controls (R/G/F/H keys)
        this.debugControls = new DebugControls(this);
        
        // Enemy counter (positioned for notebook canvas)
        this.enemyCountText = this.add.text(60, 32, '', {
            fontSize: '11px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        this.updateEnemyCount();
        
        // Level complete text (hidden initially) - centered for 700px canvas
        this.levelCompleteText = this.add.text(350, 400, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '28px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 18, y: 10 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(350, 460, 'Click to continue', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 5 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display
        this.levelText = this.add.text(610, 16, 'Level: 1', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 6, y: 3 }
        });
        
        // Layout number display (for debugging)
        this.layoutText = this.add.text(60, 48, `Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`, {
            fontSize: '11px',
            fill: '#666',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Spawn points will be generated from the layout
        this.spawnPoints = [];
        
        // Player start position (will be set by layout)
        this.playerStartX = 100;
        this.playerStartY = 600;
    }
    
    /**
     * Load a level layout from the library
     */
    loadLayout(layout) {
        // Clear existing platforms
        this.platforms.clear(true, true);
        
        // Clear compound shape visuals (they're not in the platforms group)
        if (this.compoundVisuals) {
            this.compoundVisuals.forEach(v => v.destroy());
        }
        this.compoundVisuals = [];
        
        // Clear spawn points
        this.spawnPoints = [];
        
        // Create platforms from layout
        for (const plat of layout.platforms) {
            const shapeData = PLATFORM_SHAPES[plat.shape];
            
            // Check if this is a compound shape (has separate collision parts)
            if (shapeData.parts) {
                // Compound shape: create visual-only sprite + separate collision bodies
                
                // Add visual sprite (no physics) - track it for cleanup
                const visual = this.add.image(plat.x, plat.y, plat.shape);
                this.compoundVisuals.push(visual);
                
                // Create collision bodies for each part
                for (const part of shapeData.parts) {
                    // Part coordinates are relative to shape origin (top-left)
                    // Convert to world position (plat.x, plat.y is center of shape)
                    const partX = plat.x - shapeData.width / 2 + part.x + part.w / 2;
                    const partY = plat.y - shapeData.height / 2 + part.y + part.h / 2;
                    
                    // Create invisible collision rectangle
                    const collider = this.add.rectangle(partX, partY, part.w, part.h, 0x000000, 0);
                    this.physics.add.existing(collider, true);  // true = static
                    this.platforms.add(collider);
                }
            } else {
                // Simple shape: single collision body (original behavior)
                const platform = this.platforms.create(plat.x, plat.y, plat.shape);
            }
            
            // Add this platform position as a spawn point
            // Spawn point is on top of the platform
            this.spawnPoints.push({
                x: plat.x,
                y: plat.y - shapeData.height / 2 - 15  // Above the platform
            });
        }
        
        // Set player start to first platform
        if (layout.platforms.length > 0) {
            const firstPlat = layout.platforms[0];
            const firstShape = PLATFORM_SHAPES[firstPlat.shape];
            this.playerStartX = firstPlat.x;
            this.playerStartY = firstPlat.y - firstShape.height / 2 - 15;
        }
    }
    
    /**
     * Spawn an enemy at a position
     */
    spawnEnemy(x, y) {
        const enemy = this.enemies.create(x, y, 'enemy');
        enemy.setBounce(0);
        enemy.setCollideWorldBounds(true);
    }
    
    /**
     * Called when a bullet hits an enemy
     */
    bulletHitEnemy(bullet, enemy) {
        // Deactivate the bullet
        bullet.setActive(false);
        bullet.setVisible(false);
        
        // Destroy the enemy
        enemy.destroy();
        
        // Update the counter
        this.updateEnemyCount();
        
        // Check for level complete
        if (this.enemies.countActive() === 0) {
            this.levelComplete();
        }
    }
    
    /**
     * Update the enemy count display
     */
    updateEnemyCount() {
        const count = this.enemies.countActive();
        this.enemyCountText.setText(`Enemies remaining: ${count}`);
    }
    
    /**
     * Called when all enemies are defeated
     */
    levelComplete() {
        this.levelInProgress = false;
        this.levelCompleteText.setVisible(true);
        this.clickToContinueText.setVisible(true);
    }
    
    /**
     * Start the next level - cycle through layouts and spawn enemies
     */
    startNextLevel() {
        this.currentLevel++;
        this.levelText.setText(`Level: ${this.currentLevel}`);
        
        // Hide completion messages
        this.levelCompleteText.setVisible(false);
        this.clickToContinueText.setVisible(false);
        
        // Clear any remaining bullets
        this.bullets.children.each((bullet) => {
            bullet.setActive(false);
            bullet.setVisible(false);
        });
        
        // Cycle to next layout (or random)
        this.currentLayoutIndex = (this.currentLayoutIndex + 1) % LEVEL_LAYOUTS.length;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex]);
        
        // Re-add platform and wall collisions
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Spawn enemies at random positions
        // More enemies as levels progress (4 + 1 per 2 levels, max based on spawn points)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), this.spawnPoints.length - 1);
        
        // Filter out player start position from spawn points for enemies
        const enemySpawnPoints = this.spawnPoints.filter(
            p => !(Math.abs(p.x - this.playerStartX) < 10 && Math.abs(p.y - this.playerStartY) < 10)
        );
        
        // Shuffle and pick
        const shuffled = Phaser.Utils.Array.Shuffle([...enemySpawnPoints]);
        for (let i = 0; i < enemyCount && i < shuffled.length; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position - use body.reset for proper physics sync
        this.player.body.reset(this.playerStartX, this.playerStartY);
    }
    
    /**
     * Called when player touches water
     */
    playerDied() {
        // Prevent multiple triggers while respawning
        if (this.isRespawning) return;
        this.isRespawning = true;
        
        // Force physics body to fully reset at new position
        // This syncs sprite + physics body immediately to prevent desync
        this.player.body.reset(this.playerStartX, this.playerStartY);
        
        // Brief visual feedback - flash the player
        this.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            this.player.clearTint();
        });
        
        // Clear respawn flag after player has time to land
        this.time.delayedCall(500, () => {
            this.isRespawning = false;
        });
    }

    update() {
        // This runs every frame - handle player movement here
        
        // Check debug controls (R/G/F/H keys)
        const debugAction = this.debugControls.update(this.player, this.currentLayoutIndex, LEVEL_LAYOUTS.length);
        if (debugAction) {
            if (debugAction.action === 'restart') {
                this.scene.restart({ layoutIndex: debugAction.layoutIndex });
                return;
            }
            // flyToggled and hitboxToggled are handled internally by DebugControls
        }
        
        const speed = 120;  // Scaled down for smaller characters
        const flySpeed = 200;  // Speed when flying
        const jumpVelocity = -280;  // Scaled down - smaller jump for zoomed-out feel
        
        // Left/Right movement
        const flyMode = this.debugControls.isFlyMode();
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(flyMode ? -flySpeed : -speed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(flyMode ? flySpeed : speed);
        } else {
            // No arrow pressed - stop horizontal movement
            this.player.setVelocityX(0);
        }
        
        // Up/Down movement (fly mode) or jumping (normal mode)
        if (flyMode) {
            // Fly mode: up/down arrows move vertically
            if (this.cursors.up.isDown) {
                this.player.setVelocityY(-flySpeed);
            } else if (this.cursors.down.isDown) {
                this.player.setVelocityY(flySpeed);
            } else {
                this.player.setVelocityY(0);
            }
        } else {
            // Normal mode: jumping when touching ground
            if (this.cursors.up.isDown && this.player.body.blocked.down) {
                this.player.setVelocityY(jumpVelocity);
            }
        }
        
        // Clean up bullets that have left the screen
        this.bullets.children.each((bullet) => {
            if (bullet.active && (bullet.x < -50 || bullet.x > 750 || bullet.y < -50 || bullet.y > 950)) {
                bullet.setActive(false);
                bullet.setVisible(false);
            }
        });
    }
    
    /**
     * Shoot a bullet toward a target position
     * @param {number} targetX - X coordinate to shoot toward
     * @param {number} targetY - Y coordinate to shoot toward
     */
    shoot(targetX, targetY) {
        // Get a bullet from the group (reuses inactive bullets)
        const bullet = this.bullets.get(this.player.x, this.player.y);
        
        if (!bullet) return;  // No bullets available
        
        bullet.setActive(true);
        bullet.setVisible(true);
        
        // Calculate direction to target
        const angle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            targetX, targetY
        );
        
        // Set bullet velocity toward target
        const bulletSpeed = 600;
        bullet.setVelocity(
            Math.cos(angle) * bulletSpeed,
            Math.sin(angle) * bulletSpeed
        );
        
        // Rotate bullet to face direction of travel
        bullet.setRotation(angle);
        
        // Bullets shouldn't be affected by gravity
        bullet.body.allowGravity = false;
    }
}


```

Now let me fix the layout label not updating in `startNextLevel()`:

```javascript
/**
 * PlayScene - Main gameplay scene
 * 
 * This is where the actual game happens. Phaser scenes have three main methods:
 * - preload(): Load assets (images, sounds, etc.)
 * - create(): Set up game objects, physics, input (runs once when scene starts)
 * - update(): Game loop, runs every frame (~60 times per second)
 */

import { DebugControls } from '../utils/DebugControls.js';
import { PLATFORM_SHAPES, LEVEL_LAYOUTS } from '../platforms/PlatformShapes.js';
import { drawWalls, drawWater } from '../drawing/EnvironmentRenderer.js';
import { generateAllShapeTextures } from '../drawing/ShapeRenderer.js';

export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        // Load the user-cropped notebook paper background (preserves scale)
        this.load.image('notebook-paper', 'assets/cropped-notebook-page.png');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using cropped image) ===
        // Paper is pre-cropped to edges, just scale to fit canvas
        const paper = this.add.image(350, 450, 'notebook-paper');
        paper.setDisplaySize(700, 900);
        
        
        // === WALLS (hand-drawn style with crayon fill) ===
        this.walls = drawWalls(this);
        
        // === WATER HAZARD (with crayon-like blue fill) ===
        this.waterZone = drawWater(this);
        
        
        // === PLATFORMS (using shape library) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Generate textures for all shapes in the library
        generateAllShapeTextures(this, PLATFORM_SHAPES);
        
        // Select level layout (use passed index or default to 0)
        this.currentLayoutIndex = (this.scene.settings.data && this.scene.settings.data.layoutIndex !== undefined) 
            ? this.scene.settings.data.layoutIndex 
            : 0;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex])
        
        
        // === PLAYER (hand-drawn stick figure - 0.75x original) ===
        if (!this.textures.exists('player')) {
            const playerGraphics = this.add.graphics();
            playerGraphics.lineStyle(1.5, 0x1a1a1a);  // Black pen
            
            // Simple stick figure: head, body, legs
            // Head (circle)
            playerGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 5.25);
            playerGraphics.lineTo(4.5, 10.5);
            playerGraphics.strokePath();
            // Arms (line across)
            playerGraphics.beginPath();
            playerGraphics.moveTo(1.5, 7.5);
            playerGraphics.lineTo(7.5, 7.5);
            playerGraphics.strokePath();
            // Legs (two lines)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(2.25, 15);
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(6.75, 15);
            playerGraphics.strokePath();
            
            playerGraphics.generateTexture('player', 9, 17);
            playerGraphics.destroy();
        }
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        
        // Player dies if they touch water!
        this.physics.add.overlap(this.player, this.waterZone, this.playerDied, null, this);
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Mouse input for shooting (and continuing after level complete)
        this.input.on('pointerdown', (pointer) => {
            if (this.levelInProgress) {
                this.shoot(pointer.x, pointer.y);
            } else {
                // Level is complete, click to start next level
                this.startNextLevel();
            }
        });
        
        
        // === BULLETS ===
        // === BULLET (hand-drawn dash) ===
        if (!this.textures.exists('bullet')) {
            const bulletGraphics = this.add.graphics();
            bulletGraphics.lineStyle(2, 0x1a1a1a);  // Black pen stroke
            bulletGraphics.beginPath();
            bulletGraphics.moveTo(0, 2);
            bulletGraphics.lineTo(8, 2);
            bulletGraphics.strokePath();
            bulletGraphics.generateTexture('bullet', 10, 4);
            bulletGraphics.destroy();
        }
        
        // Now create the group that uses the texture
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });
        
        
        // === ENEMIES ===
        // === ENEMY (hand-drawn stick figure in red - 0.75x original) ===
        if (!this.textures.exists('enemy')) {
            const enemyGraphics = this.add.graphics();
            enemyGraphics.lineStyle(1.5, 0xcc3333);  // Red pen
            
            // Same stick figure shape as player
            // Head (circle)
            enemyGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 5.25);
            enemyGraphics.lineTo(4.5, 10.5);
            enemyGraphics.strokePath();
            // Arms (line across)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(1.5, 7.5);
            enemyGraphics.lineTo(7.5, 7.5);
            enemyGraphics.strokePath();
            // Legs (two lines)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(2.25, 15);
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(6.75, 15);
            enemyGraphics.strokePath();
            
            enemyGraphics.generateTexture('enemy', 9, 17);
            enemyGraphics.destroy();
        }
        
        // Create enemies group
        this.enemies = this.physics.add.group();
        
        // Spawn initial enemies on platforms
        this.spawnEnemy(450, 600);   // Bottom right platform
        this.spawnEnemy(280, 460);   // Middle platform
        this.spawnEnemy(380, 390);   // Row 4
        this.spawnEnemy(380, 250);   // Top platform
        
        // Make enemies collide with platforms (so they sit on them)
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Bullets hit enemies!
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        
        
        // === UI TEXT ===
        // Show some instructions (smaller for notebook canvas)
        this.add.text(60, 16, 'Arrows: move | Click: shoot | R/G: restart/new | F: fly | H: hitbox', {
            fontSize: '9px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Debug controls (R/G/F/H keys)
        this.debugControls = new DebugControls(this);
        
        // Enemy counter (positioned for notebook canvas)
        this.enemyCountText = this.add.text(60, 32, '', {
            fontSize: '11px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        this.updateEnemyCount();
        
        // Level complete text (hidden initially) - centered for 700px canvas
        this.levelCompleteText = this.add.text(350, 400, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '28px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 18, y: 10 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(350, 460, 'Click to continue', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 5 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display
        this.levelText = this.add.text(610, 16, 'Level: 1', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 6, y: 3 }
        });
        
        // Layout number display (for debugging)
        this.layoutText = this.add.text(60, 48, `Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`, {
            fontSize: '11px',
            fill: '#666',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Spawn points will be generated from the layout
        this.spawnPoints = [];
        
        // Player start position (will be set by layout)
        this.playerStartX = 100;
        this.playerStartY = 600;
    }
    
    /**
     * Load a level layout from the library
     */
    loadLayout(layout) {
        // Clear existing platforms
        this.platforms.clear(true, true);
        
        // Clear compound shape visuals (they're not in the platforms group)
        if (this.compoundVisuals) {
            this.compoundVisuals.forEach(v => v.destroy());
        }
        this.compoundVisuals = [];
        
        // Clear spawn points
        this.spawnPoints = [];
        
        // Create platforms from layout
        for (const plat of layout.platforms) {
            const shapeData = PLATFORM_SHAPES[plat.shape];
            
            // Check if this is a compound shape (has separate collision parts)
            if (shapeData.parts) {
                // Compound shape: create visual-only sprite + separate collision bodies
                
                // Add visual sprite (no physics) - track it for cleanup
                const visual = this.add.image(plat.x, plat.y, plat.shape);
                this.compoundVisuals.push(visual);
                
                // Create collision bodies for each part
                for (const part of shapeData.parts) {
                    // Part coordinates are relative to shape origin (top-left)
                    // Convert to world position (plat.x, plat.y is center of shape)
                    const partX = plat.x - shapeData.width / 2 + part.x + part.w / 2;
                    const partY = plat.y - shapeData.height / 2 + part.y + part.h / 2;
                    
                    // Create invisible collision rectangle
                    const collider = this.add.rectangle(partX, partY, part.w, part.h, 0x000000, 0);
                    this.physics.add.existing(collider, true);  // true = static
                    this.platforms.add(collider);
                }
            } else {
                // Simple shape: single collision body (original behavior)
                const platform = this.platforms.create(plat.x, plat.y, plat.shape);
            }
            
            // Add this platform position as a spawn point
            // Spawn point is on top of the platform
            this.spawnPoints.push({
                x: plat.x,
                y: plat.y - shapeData.height / 2 - 15  // Above the platform
            });
        }
        
        // Set player start to first platform
        if (layout.platforms.length > 0) {
            const firstPlat = layout.platforms[0];
            const firstShape = PLATFORM_SHAPES[firstPlat.shape];
            this.playerStartX = firstPlat.x;
            this.playerStartY = firstPlat.y - firstShape.height / 2 - 15;
        }
    }
    
    /**
     * Spawn an enemy at a position
     */
    spawnEnemy(x, y) {
        const enemy = this.enemies.create(x, y, 'enemy');
        enemy.setBounce(0);
        enemy.setCollideWorldBounds(true);
    }
    
    /**
     * Called when a bullet hits an enemy
     */
    bulletHitEnemy(bullet, enemy) {
        // Deactivate the bullet
        bullet.setActive(false);
        bullet.setVisible(false);
        
        // Destroy the enemy
        enemy.destroy();
        
        // Update the counter
        this.updateEnemyCount();
        
        // Check for level complete
        if (this.enemies.countActive() === 0) {
            this.levelComplete();
        }
    }
    
    /**
     * Update the enemy count display
     */
    updateEnemyCount() {
        const count = this.enemies.countActive();
        this.enemyCountText.setText(`Enemies remaining: ${count}`);
    }
    
    /**
     * Called when all enemies are defeated
     */
    levelComplete() {
        this.levelInProgress = false;
        this.levelCompleteText.setVisible(true);
        this.clickToContinueText.setVisible(true);
    }
    
    /**
     * Start the next level - cycle through layouts and spawn enemies
     */
    startNextLevel() {
        this.currentLevel++;
        this.levelText.setText(`Level: ${this.currentLevel}`);
        
        // Hide completion messages
        this.levelCompleteText.setVisible(false);
        this.clickToContinueText.setVisible(false);
        
        // Clear any remaining bullets
        this.bullets.children.each((bullet) => {
            bullet.setActive(false);
            bullet.setVisible(false);
        });
        
        // Cycle to next layout (or random)
        this.currentLayoutIndex = (this.currentLayoutIndex + 1) % LEVEL_LAYOUTS.length;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex]);
        
        // Update layout label
        this.layoutText.setText(`Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`);
        
        // Re-add platform and wall collisions
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Spawn enemies at random positions
        // More enemies as levels progress (4 + 1 per 2 levels, max based on spawn points)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), this.spawnPoints.length - 1);
        
        // Filter out player start position from spawn points for enemies
        const enemySpawnPoints = this.spawnPoints.filter(
            p => !(Math.abs(p.x - this.playerStartX) < 10 && Math.abs(p.y - this.playerStartY) < 10)
        );
        
        // Shuffle and pick
        const shuffled = Phaser.Utils.Array.Shuffle([...enemySpawnPoints]);
        for (let i = 0; i < enemyCount && i < shuffled.length; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position - use body.reset for proper physics sync
        this.player.body.reset(this.playerStartX, this.playerStartY);
    }
    
    /**
     * Called when player touches water
     */
    playerDied() {
        // Prevent multiple triggers while respawning
        if (this.isRespawning) return;
        this.isRespawning = true;
        
        // Force physics body to fully reset at new position
        // This syncs sprite + physics body immediately to prevent desync
        this.player.body.reset(this.playerStartX, this.playerStartY);
        
        // Brief visual feedback - flash the player
        this.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            this.player.clearTint();
        });
        
        // Clear respawn flag after player has time to land
        this.time.delayedCall(500, () => {
            this.isRespawning = false;
        });
    }

    update() {
        // This runs every frame - handle player movement here
        
        // Check debug controls (R/G/F/H keys)
        const debugAction = this.debugControls.update(this.player, this.currentLayoutIndex, LEVEL_LAYOUTS.length);
        if (debugAction) {
            if (debugAction.action === 'restart') {
                this.scene.restart({ layoutIndex: debugAction.layoutIndex });
                return;
            }
            // flyToggled and hitboxToggled are handled internally by DebugControls
        }
        
        const speed = 120;  // Scaled down for smaller characters
        const flySpeed = 200;  // Speed when flying
        const jumpVelocity = -280;  // Scaled down - smaller jump for zoomed-out feel
        
        // Left/Right movement
        const flyMode = this.debugControls.isFlyMode();
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(flyMode ? -flySpeed : -speed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(flyMode ? flySpeed : speed);
        } else {
            // No arrow pressed - stop horizontal movement
            this.player.setVelocityX(0);
        }
        
        // Up/Down movement (fly mode) or jumping (normal mode)
        if (flyMode) {
            // Fly mode: up/down arrows move vertically
            if (this.cursors.up.isDown) {
                this.player.setVelocityY(-flySpeed);
            } else if (this.cursors.down.isDown) {
                this.player.setVelocityY(flySpeed);
            } else {
                this.player.setVelocityY(0);
            }
        } else {
            // Normal mode: jumping when touching ground
            if (this.cursors.up.isDown && this.player.body.blocked.down) {
                this.player.setVelocityY(jumpVelocity);
            }
        }
        
        // Clean up bullets that have left the screen
        this.bullets.children.each((bullet) => {
            if (bullet.active && (bullet.x < -50 || bullet.x > 750 || bullet.y < -50 || bullet.y > 950)) {
                bullet.setActive(false);
                bullet.setVisible(false);
            }
        });
    }
    
    /**
     * Shoot a bullet toward a target position
     * @param {number} targetX - X coordinate to shoot toward
     * @param {number} targetY - Y coordinate to shoot toward
     */
    shoot(targetX, targetY) {
        // Get a bullet from the group (reuses inactive bullets)
        const bullet = this.bullets.get(this.player.x, this.player.y);
        
        if (!bullet) return;  // No bullets available
        
        bullet.setActive(true);
        bullet.setVisible(true);
        
        // Calculate direction to target
        const angle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            targetX, targetY
        );
        
        // Set bullet velocity toward target
        const bulletSpeed = 600;
        bullet.setVelocity(
            Math.cos(angle) * bulletSpeed,
            Math.sin(angle) * bulletSpeed
        );
        
        // Rotate bullet to face direction of travel
        bullet.setRotation(angle);
        
        // Bullets shouldn't be affected by gravity
        bullet.body.allowGravity = false;
    }
}


```

Fixed both bugs:

**Bug 1: Compound shape visuals not clearing**
- Added `this.compoundVisuals` array to track visual sprites for compound shapes
- Now destroys all tracked visuals when loading a new layout

**Bug 2: Layout label not updating**
- Added `this.layoutText.setText(...)` in `startNextLevel()` to update the label when advancing

---

### Test it now:

1. Refresh http://localhost:8000

2. **Test compound shape cleanup:**
   - Go to Layout 1 (has compound shapes on the right side - zigZagGap, horizontalTunnel, verticalSlot)
   - Kill all enemies to complete the level
   - Click to continue - the compound shapes should now **disappear** with the rest of the platforms

3. **Test layout label:**
   - Watch the "Layout: X/6" label in the top-left
   - It should update correctly when you click to advance after completing a level
   - Should also work with **G** key to cycle layouts

These bugs existed before the refactor - you just noticed them now! Good eye. 👀

---

**User**

good work fixing. lets checkpoint.

---

**Cursor**

Let me update the context files to checkpoint our progress.

```markdown
# Current Work Focus

Refactoring complete! Codebase is now modular with ES6 imports. PlayScene.js reduced from 780 to 515 lines. Fixed bugs with compound shape cleanup and layout label updates.

- **Project Goal:** Build a browser-based stick figure arena shooter with random level generation (Worms-style vibes, notebook paper aesthetic)

- **Intermediate Goal:** Expand shape library and build procedural generator

- **Current Task:** Refactor complete. Next: add more shapes (5-10), then build procedural layout generator.

## Completed Refactoring

1. **Converted to ES6 modules** - Clean import/export structure
2. **Split PlayScene.js** (780→515 lines):
   - `js/drawing/ShapeRenderer.js` - Platform texture generation
   - `js/drawing/EnvironmentRenderer.js` - Walls and water drawing
   - `js/utils/DebugControls.js` - R/G/F/H key handling
3. **Split PlatformShapes.js** (531→11 lines, now re-export hub):
   - `js/platforms/ShapeDefinitions.js` - 18 shape definitions
   - `js/platforms/LayoutDefinitions.js` - 6 layout configs

## Bug Fixes This Session

- Fixed compound shape visuals not clearing on level advance
- Fixed layout label not updating on level advance

## Queued Features

1. Add more base shapes (5-10)
2. Shape variations (flip, scale)
3. Procedural layout generator
4. Dynamic holes/tunnels system

```

```markdown
# Current Context for New Chat

## Project Status: Refactored, Ready for New Features

A stick figure arena shooter built with Phaser 3, styled to look like doodles on crumpled notebook paper. Codebase refactored into clean ES6 modules. Ready to add more shapes and build procedural generator.

## What Works

- **Player movement:** Arrow keys to move left/right, up to jump
- **Shooting:** Click to fire toward mouse cursor
- **Enemies:** Red stick figures, destroyed when shot
- **Level progression:** 6 layouts that cycle; complete level by killing all enemies, click to advance
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

1. **Layout 1** - Three-zone pattern with compound shapes on right
2. **Layout 2** - Shape showcase (all 18 shapes displayed)
3-6. **Layouts 3-6** - Mixed layouts

## File Structure

```
stick-game-test/
├── index.html                      # Loads Phaser + game.js as ES6 module
├── js/
│   ├── game.js                     # Phaser config (700x900), imports PlayScene
│   ├── scenes/
│   │   └── PlayScene.js            # Main gameplay (~515 lines)
│   ├── platforms/
│   │   ├── PlatformShapes.js       # Re-export hub (11 lines)
│   │   ├── ShapeDefinitions.js     # 18 shapes (257 lines)
│   │   └── LayoutDefinitions.js    # 6 layouts + design rules (279 lines)
│   ├── drawing/
│   │   ├── ShapeRenderer.js        # Platform texture generation (128 lines)
│   │   └── EnvironmentRenderer.js  # Walls & water drawing (156 lines)
│   └── utils/
│       └── DebugControls.js        # R/G/F/H key handling (67 lines)
├── assets/
│   └── cropped-notebook-page.png
├── reference/
│   ├── example-map.png
│   └── layout-ref-1.png
└── ai-context-management/
```

## Technical Notes

- Phaser 3.70.0 via CDN
- ES6 modules (requires local server)
- Canvas: 700x900
- Walls: x=55 (left), x=645 (right), end y=795
- Water: y=870
- Character: 9x17 pixels
- Run: `python3 -m http.server 8000`

## Layout Design Rules (for generator)

**Three-Zone Structure:**
- LEFT COLUMN (x ~120-160): Stacked flatLong/flatMedium, edge at x=100
- RIGHT COLUMN (x ~540-580): Similar, edge at x=600  
- CENTER (x ~260-440): Scattered small shapes, compound shapes

**Drop Corridors:** ~45px gap between walls and platform edges

## Future Goals (Queued)

1. Add more base shapes (5-10 more)
2. Shape variations (flip, scale)
3. Procedural layout generator
4. Dynamic holes/tunnels system (further out)

## This Session Summary

1. Converted project to ES6 modules
2. Extracted DebugControls.js (R/G/F/H keys)
3. Extracted EnvironmentRenderer.js (walls, water)
4. Extracted ShapeRenderer.js (platform textures)
5. Split PlatformShapes.js into ShapeDefinitions + LayoutDefinitions
6. Fixed bug: compound shape visuals not clearing on level advance
7. Fixed bug: layout label not updating on level advance
8. PlayScene.js reduced from 780 to 515 lines

```

## ✅ Checkpoint Saved

Updated both context files:
- `current-work-focus.md` 
- `current-context-for-new-chat.md`

---

### Session Summary

**Refactoring completed:**
| Task | Status |
|------|--------|
| Extract DebugControls.js | ✓ |
| Extract EnvironmentRenderer.js | ✓ |
| Extract ShapeRenderer.js | ✓ |
| Split PlatformShapes.js | ✓ |

**Bug fixes:**
- Compound shape visuals now clear on level advance
- Layout label now updates on level advance

**Results:**
- `PlayScene.js`: 780 → 515 lines (34% reduction)
- Codebase now uses ES6 modules
- 5 new focused modules created

**Ready for next phase:** Add more shapes, then build procedural layout generator.

---

**User**

can you git commit

---

**Cursor**

Done! Committed with:

```
Refactor: Split PlayScene.js into ES6 modules

- Convert project to ES6 modules (import/export)
- Extract DebugControls.js (R/G/F/H key handling)
- Extract EnvironmentRenderer.js (walls, water drawing)
- Extract ShapeRenderer.js (platform texture generation)
- Split PlatformShapes.js into ShapeDefinitions + LayoutDefinitions
- Fix: compound shape visuals now clear on level advance
- Fix: layout label now updates on level advance

PlayScene.js reduced from 780 to 515 lines (34% reduction)
```

13 files changed, 5 new files created. 🎉

```plaintext
Refactor: Split PlayScene.js into ES6 modules

- Convert project to ES6 modules (import/export)
- Extract DebugControls.js (R/G/F/H key handling)
- Extract EnvironmentRenderer.js (walls, water drawing)
- Extract ShapeRenderer.js (platform texture generation)
- Split PlatformShapes.js into ShapeDefinitions + LayoutDefinitions
- Fix: compound shape visuals now clear on level advance
- Fix: layout label now updates on level advance

PlayScene.js reduced from 780 to 515 lines (34% reduction)
```

---

**User**

ok lets update the wishist or planning while i have some ideas in my head. in broad strokes i want to update player character movement. i want to add more depth to weapons and projectiles. more depth to damage to enemies. more depth to enemy spawns and player spawns. more depth to level layouts/generation etc. maybe even eventually multiplayer

---

**Cursor**

Let me update the planning docs to capture your vision while it's fresh.

```markdown
# Project Vision and Goals

## What We're Building

A browser-based 2D stick figure arena shooter/platformer. Think "Worms meets stick figure combat" - side-view fixed arenas where the player shoots enemy stick figures to complete levels.

## Why

Fun personal project for learning game development. This is a test/learning project, so the priority is getting things working and understanding how they work, not production polish.

## Who It's For

The developer (learning project). May share with friends for testing/fun.

## Core Game Concept

- **View:** Side-view platformer, fixed arena (not scrolling)
- **Player:** Stick figure that can run, jump, and shoot
- **Enemies:** Stick figures placed around the map
- **Win Condition:** Hit all enemy stick figures to complete the level
- **Progression:** Random level generation with new enemy placements after each win
- **Hazards:** Water at the bottom of the map that kills the player

## Current State (MVP Complete)

✅ Player movement (run, jump)
✅ Basic arena/level with platforms
✅ Laser gun shooting
✅ Enemy stick figures (static targets)
✅ Level completion detection
✅ Water hazard
✅ 6 hand-crafted layouts (procedural generation pending)
✅ 18-shape platform library
✅ Codebase refactored into ES6 modules

---

## Feature Roadmap

### 1. Player Movement
**Current:** Basic left/right + jump
**Ideas:**
- Wall sliding / wall jump
- Double jump
- Crouch / slide
- Climb ledges
- Grappling hook
- Momentum / acceleration curves
- Coyote time (brief jump window after leaving platform)

### 2. Weapons & Projectiles
**Current:** Single laser gun, instant straight shots
**Ideas:**
- Multiple weapon types (shotgun spread, rocket launcher, grenade arc)
- Weapon switching / inventory
- Ammo / reload mechanics
- Projectile physics (gravity-affected, bouncing)
- Charging shots
- Different damage types
- Pickup weapons from map

### 3. Damage & Health
**Current:** Enemies die in 1 hit, player dies from water only
**Ideas:**
- Enemy health (multiple hits to kill)
- Player health system (HP bar, multiple hits)
- Damage numbers / feedback
- Knockback on hit
- Invincibility frames
- Death animations
- Respawn mechanics (lives system?)

### 4. Enemies
**Current:** Static red stick figures, don't move or shoot
**Ideas:**
- Enemy AI (patrol, chase, flee)
- Enemies that shoot back
- Different enemy types (melee, ranged, heavy)
- Enemy spawning waves
- Boss enemies
- Enemy health bars
- Alert states (idle → alerted → attacking)

### 5. Spawning System
**Current:** Fixed spawn points on platforms, enemies placed randomly
**Ideas:**
- Player spawn point selection (safe zones)
- Enemy spawn waves / timing
- Spawn animations / effects
- Reinforcement spawns mid-level
- Spawn point capture mechanics

### 6. Level Generation
**Current:** 6 hand-crafted layouts, 18-shape library
**Ideas:**
- Procedural layout generator
- More shapes (5-10 more)
- Shape variations (flip, scale, rotate)
- Dynamic holes/tunnels
- Destructible terrain
- Interactive elements (doors, switches, traps)
- Themed level sets
- Difficulty scaling

### 7. Multiplayer (Long-term)
**Ideas:**
- Local co-op (same screen)
- Online multiplayer (WebSocket/WebRTC)
- PvP mode (deathmatch)
- Co-op vs enemies
- Turn-based mode (like Worms)
- Lobby / matchmaking

---

## Priority Tiers

**Tier 1 - Core Depth (Next)**
- Procedural level generator
- Player health system
- Enemy health + damage feedback
- 1-2 more weapon types

**Tier 2 - Combat Feel**
- Enemy AI (basic movement + shooting)
- More movement options (wall jump, etc.)
- Weapon variety
- Polish (screenshake, particles, sound)

**Tier 3 - Progression**
- Wave-based gameplay
- Difficulty scaling
- Score / high scores
- Unlockables?

**Tier 4 - Multiplayer**
- Local first, then online
- Requires significant architecture work

---

## Success Criteria

A fun, replayable game loop with variety in weapons, enemies, and levels. Code remains understandable and modular.

```

```markdown
# Current Work Focus

Refactoring complete. Roadmap expanded with ideas for movement, weapons, enemies, spawns, levels, and multiplayer. See `project-vision-and-goals.md` for full feature roadmap.

- **Project Goal:** Build a browser-based stick figure arena shooter with depth in combat, enemies, and procedural levels

- **Intermediate Goal:** Add core depth to combat and levels (Tier 1 features)

- **Current Task:** Pick next feature to implement from Tier 1 priorities

## Tier 1 Priorities (Next Up)

1. **Procedural level generator** - Generate layouts from shape library
2. **Player health system** - HP bar, multiple hits to die
3. **Enemy health + damage** - Multi-hit enemies, damage feedback
4. **More weapon types** - 1-2 additional weapons with different behaviors

## Feature Categories (See project-vision-and-goals.md)

| Category | Current | Next Steps |
|----------|---------|------------|
| Movement | Basic run/jump | Wall jump, grapple, momentum |
| Weapons | Single laser | Multiple types, ammo, physics |
| Damage | 1-hit kills | Health systems, feedback |
| Enemies | Static targets | AI, shooting back, types |
| Spawning | Random placement | Waves, safe zones |
| Levels | 6 layouts | Procedural generator |
| Multiplayer | None | Long-term goal |

## Recently Completed

- ✅ ES6 module refactoring
- ✅ 18-shape platform library
- ✅ Compound shape system
- ✅ Debug controls (R/G/F/H)
- ✅ Bug fixes (compound cleanup, layout label)

```

Done! Updated the roadmap with your ideas. Here's what I captured:

---

## Feature Roadmap (7 Categories)

| Category | Current State | Ideas Captured |
|----------|---------------|----------------|
| **Movement** | Basic run/jump | Wall jump, double jump, crouch/slide, grappling hook, momentum, coyote time |
| **Weapons** | Single laser | Multiple types, ammo/reload, projectile physics, charging, pickups |
| **Damage** | 1-hit kills | Health systems, damage numbers, knockback, i-frames, death anims |
| **Enemies** | Static targets | AI (patrol/chase), shoot back, enemy types, waves, bosses |
| **Spawning** | Random placement | Spawn waves, safe zones, reinforcements, animations |
| **Levels** | 6 layouts | Procedural gen, more shapes, destructible terrain, interactive elements |
| **Multiplayer** | None | Local co-op → online PvP/co-op, turn-based mode |

---

## Priority Tiers

**Tier 1 (Next):** Procedural generator, player health, enemy health, more weapons

**Tier 2:** Enemy AI, movement options, weapon variety, polish

**Tier 3:** Waves, difficulty scaling, progression

**Tier 4:** Multiplayer (significant work)

---

All captured in `project-vision-and-goals.md`. When you're ready to work on something, just say which feature interests you!

---

**User**

lets add the option to control player movement with wasd

---

**Cursor**

I'll add WASD keys alongside the existing arrow controls:

```javascript
/**
 * PlayScene - Main gameplay scene
 * 
 * This is where the actual game happens. Phaser scenes have three main methods:
 * - preload(): Load assets (images, sounds, etc.)
 * - create(): Set up game objects, physics, input (runs once when scene starts)
 * - update(): Game loop, runs every frame (~60 times per second)
 */

import { DebugControls } from '../utils/DebugControls.js';
import { PLATFORM_SHAPES, LEVEL_LAYOUTS } from '../platforms/PlatformShapes.js';
import { drawWalls, drawWater } from '../drawing/EnvironmentRenderer.js';
import { generateAllShapeTextures } from '../drawing/ShapeRenderer.js';

export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        // Load the user-cropped notebook paper background (preserves scale)
        this.load.image('notebook-paper', 'assets/cropped-notebook-page.png');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using cropped image) ===
        // Paper is pre-cropped to edges, just scale to fit canvas
        const paper = this.add.image(350, 450, 'notebook-paper');
        paper.setDisplaySize(700, 900);
        
        
        // === WALLS (hand-drawn style with crayon fill) ===
        this.walls = drawWalls(this);
        
        // === WATER HAZARD (with crayon-like blue fill) ===
        this.waterZone = drawWater(this);
        
        
        // === PLATFORMS (using shape library) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Generate textures for all shapes in the library
        generateAllShapeTextures(this, PLATFORM_SHAPES);
        
        // Select level layout (use passed index or default to 0)
        this.currentLayoutIndex = (this.scene.settings.data && this.scene.settings.data.layoutIndex !== undefined) 
            ? this.scene.settings.data.layoutIndex 
            : 0;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex])
        
        
        // === PLAYER (hand-drawn stick figure - 0.75x original) ===
        if (!this.textures.exists('player')) {
            const playerGraphics = this.add.graphics();
            playerGraphics.lineStyle(1.5, 0x1a1a1a);  // Black pen
            
            // Simple stick figure: head, body, legs
            // Head (circle)
            playerGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 5.25);
            playerGraphics.lineTo(4.5, 10.5);
            playerGraphics.strokePath();
            // Arms (line across)
            playerGraphics.beginPath();
            playerGraphics.moveTo(1.5, 7.5);
            playerGraphics.lineTo(7.5, 7.5);
            playerGraphics.strokePath();
            // Legs (two lines)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(2.25, 15);
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(6.75, 15);
            playerGraphics.strokePath();
            
            playerGraphics.generateTexture('player', 9, 17);
            playerGraphics.destroy();
        }
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        
        // Player dies if they touch water!
        this.physics.add.overlap(this.player, this.waterZone, this.playerDied, null, this);
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // WASD keys as alternative movement
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
        
        // Mouse input for shooting (and continuing after level complete)
        this.input.on('pointerdown', (pointer) => {
            if (this.levelInProgress) {
                this.shoot(pointer.x, pointer.y);
            } else {
                // Level is complete, click to start next level
                this.startNextLevel();
            }
        });
        
        
        // === BULLETS ===
        // === BULLET (hand-drawn dash) ===
        if (!this.textures.exists('bullet')) {
            const bulletGraphics = this.add.graphics();
            bulletGraphics.lineStyle(2, 0x1a1a1a);  // Black pen stroke
            bulletGraphics.beginPath();
            bulletGraphics.moveTo(0, 2);
            bulletGraphics.lineTo(8, 2);
            bulletGraphics.strokePath();
            bulletGraphics.generateTexture('bullet', 10, 4);
            bulletGraphics.destroy();
        }
        
        // Now create the group that uses the texture
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });
        
        
        // === ENEMIES ===
        // === ENEMY (hand-drawn stick figure in red - 0.75x original) ===
        if (!this.textures.exists('enemy')) {
            const enemyGraphics = this.add.graphics();
            enemyGraphics.lineStyle(1.5, 0xcc3333);  // Red pen
            
            // Same stick figure shape as player
            // Head (circle)
            enemyGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 5.25);
            enemyGraphics.lineTo(4.5, 10.5);
            enemyGraphics.strokePath();
            // Arms (line across)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(1.5, 7.5);
            enemyGraphics.lineTo(7.5, 7.5);
            enemyGraphics.strokePath();
            // Legs (two lines)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(2.25, 15);
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(6.75, 15);
            enemyGraphics.strokePath();
            
            enemyGraphics.generateTexture('enemy', 9, 17);
            enemyGraphics.destroy();
        }
        
        // Create enemies group
        this.enemies = this.physics.add.group();
        
        // Spawn initial enemies on platforms
        this.spawnEnemy(450, 600);   // Bottom right platform
        this.spawnEnemy(280, 460);   // Middle platform
        this.spawnEnemy(380, 390);   // Row 4
        this.spawnEnemy(380, 250);   // Top platform
        
        // Make enemies collide with platforms (so they sit on them)
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Bullets hit enemies!
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        
        
        // === UI TEXT ===
        // Show some instructions (smaller for notebook canvas)
        this.add.text(60, 16, 'Arrows: move | Click: shoot | R/G: restart/new | F: fly | H: hitbox', {
            fontSize: '9px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Debug controls (R/G/F/H keys)
        this.debugControls = new DebugControls(this);
        
        // Enemy counter (positioned for notebook canvas)
        this.enemyCountText = this.add.text(60, 32, '', {
            fontSize: '11px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        this.updateEnemyCount();
        
        // Level complete text (hidden initially) - centered for 700px canvas
        this.levelCompleteText = this.add.text(350, 400, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '28px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 18, y: 10 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(350, 460, 'Click to continue', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 5 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display
        this.levelText = this.add.text(610, 16, 'Level: 1', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 6, y: 3 }
        });
        
        // Layout number display (for debugging)
        this.layoutText = this.add.text(60, 48, `Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`, {
            fontSize: '11px',
            fill: '#666',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Spawn points will be generated from the layout
        this.spawnPoints = [];
        
        // Player start position (will be set by layout)
        this.playerStartX = 100;
        this.playerStartY = 600;
    }
    
    /**
     * Load a level layout from the library
     */
    loadLayout(layout) {
        // Clear existing platforms
        this.platforms.clear(true, true);
        
        // Clear compound shape visuals (they're not in the platforms group)
        if (this.compoundVisuals) {
            this.compoundVisuals.forEach(v => v.destroy());
        }
        this.compoundVisuals = [];
        
        // Clear spawn points
        this.spawnPoints = [];
        
        // Create platforms from layout
        for (const plat of layout.platforms) {
            const shapeData = PLATFORM_SHAPES[plat.shape];
            
            // Check if this is a compound shape (has separate collision parts)
            if (shapeData.parts) {
                // Compound shape: create visual-only sprite + separate collision bodies
                
                // Add visual sprite (no physics) - track it for cleanup
                const visual = this.add.image(plat.x, plat.y, plat.shape);
                this.compoundVisuals.push(visual);
                
                // Create collision bodies for each part
                for (const part of shapeData.parts) {
                    // Part coordinates are relative to shape origin (top-left)
                    // Convert to world position (plat.x, plat.y is center of shape)
                    const partX = plat.x - shapeData.width / 2 + part.x + part.w / 2;
                    const partY = plat.y - shapeData.height / 2 + part.y + part.h / 2;
                    
                    // Create invisible collision rectangle
                    const collider = this.add.rectangle(partX, partY, part.w, part.h, 0x000000, 0);
                    this.physics.add.existing(collider, true);  // true = static
                    this.platforms.add(collider);
                }
            } else {
                // Simple shape: single collision body (original behavior)
                const platform = this.platforms.create(plat.x, plat.y, plat.shape);
            }
            
            // Add this platform position as a spawn point
            // Spawn point is on top of the platform
            this.spawnPoints.push({
                x: plat.x,
                y: plat.y - shapeData.height / 2 - 15  // Above the platform
            });
        }
        
        // Set player start to first platform
        if (layout.platforms.length > 0) {
            const firstPlat = layout.platforms[0];
            const firstShape = PLATFORM_SHAPES[firstPlat.shape];
            this.playerStartX = firstPlat.x;
            this.playerStartY = firstPlat.y - firstShape.height / 2 - 15;
        }
    }
    
    /**
     * Spawn an enemy at a position
     */
    spawnEnemy(x, y) {
        const enemy = this.enemies.create(x, y, 'enemy');
        enemy.setBounce(0);
        enemy.setCollideWorldBounds(true);
    }
    
    /**
     * Called when a bullet hits an enemy
     */
    bulletHitEnemy(bullet, enemy) {
        // Deactivate the bullet
        bullet.setActive(false);
        bullet.setVisible(false);
        
        // Destroy the enemy
        enemy.destroy();
        
        // Update the counter
        this.updateEnemyCount();
        
        // Check for level complete
        if (this.enemies.countActive() === 0) {
            this.levelComplete();
        }
    }
    
    /**
     * Update the enemy count display
     */
    updateEnemyCount() {
        const count = this.enemies.countActive();
        this.enemyCountText.setText(`Enemies remaining: ${count}`);
    }
    
    /**
     * Called when all enemies are defeated
     */
    levelComplete() {
        this.levelInProgress = false;
        this.levelCompleteText.setVisible(true);
        this.clickToContinueText.setVisible(true);
    }
    
    /**
     * Start the next level - cycle through layouts and spawn enemies
     */
    startNextLevel() {
        this.currentLevel++;
        this.levelText.setText(`Level: ${this.currentLevel}`);
        
        // Hide completion messages
        this.levelCompleteText.setVisible(false);
        this.clickToContinueText.setVisible(false);
        
        // Clear any remaining bullets
        this.bullets.children.each((bullet) => {
            bullet.setActive(false);
            bullet.setVisible(false);
        });
        
        // Cycle to next layout (or random)
        this.currentLayoutIndex = (this.currentLayoutIndex + 1) % LEVEL_LAYOUTS.length;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex]);
        
        // Update layout label
        this.layoutText.setText(`Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`);
        
        // Re-add platform and wall collisions
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Spawn enemies at random positions
        // More enemies as levels progress (4 + 1 per 2 levels, max based on spawn points)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), this.spawnPoints.length - 1);
        
        // Filter out player start position from spawn points for enemies
        const enemySpawnPoints = this.spawnPoints.filter(
            p => !(Math.abs(p.x - this.playerStartX) < 10 && Math.abs(p.y - this.playerStartY) < 10)
        );
        
        // Shuffle and pick
        const shuffled = Phaser.Utils.Array.Shuffle([...enemySpawnPoints]);
        for (let i = 0; i < enemyCount && i < shuffled.length; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position - use body.reset for proper physics sync
        this.player.body.reset(this.playerStartX, this.playerStartY);
    }
    
    /**
     * Called when player touches water
     */
    playerDied() {
        // Prevent multiple triggers while respawning
        if (this.isRespawning) return;
        this.isRespawning = true;
        
        // Force physics body to fully reset at new position
        // This syncs sprite + physics body immediately to prevent desync
        this.player.body.reset(this.playerStartX, this.playerStartY);
        
        // Brief visual feedback - flash the player
        this.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            this.player.clearTint();
        });
        
        // Clear respawn flag after player has time to land
        this.time.delayedCall(500, () => {
            this.isRespawning = false;
        });
    }

    update() {
        // This runs every frame - handle player movement here
        
        // Check debug controls (R/G/F/H keys)
        const debugAction = this.debugControls.update(this.player, this.currentLayoutIndex, LEVEL_LAYOUTS.length);
        if (debugAction) {
            if (debugAction.action === 'restart') {
                this.scene.restart({ layoutIndex: debugAction.layoutIndex });
                return;
            }
            // flyToggled and hitboxToggled are handled internally by DebugControls
        }
        
        const speed = 120;  // Scaled down for smaller characters
        const flySpeed = 200;  // Speed when flying
        const jumpVelocity = -280;  // Scaled down - smaller jump for zoomed-out feel
        
        // Left/Right movement
        const flyMode = this.debugControls.isFlyMode();
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(flyMode ? -flySpeed : -speed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(flyMode ? flySpeed : speed);
        } else {
            // No arrow pressed - stop horizontal movement
            this.player.setVelocityX(0);
        }
        
        // Up/Down movement (fly mode) or jumping (normal mode)
        if (flyMode) {
            // Fly mode: up/down arrows move vertically
            if (this.cursors.up.isDown) {
                this.player.setVelocityY(-flySpeed);
            } else if (this.cursors.down.isDown) {
                this.player.setVelocityY(flySpeed);
            } else {
                this.player.setVelocityY(0);
            }
        } else {
            // Normal mode: jumping when touching ground
            if (this.cursors.up.isDown && this.player.body.blocked.down) {
                this.player.setVelocityY(jumpVelocity);
            }
        }
        
        // Clean up bullets that have left the screen
        this.bullets.children.each((bullet) => {
            if (bullet.active && (bullet.x < -50 || bullet.x > 750 || bullet.y < -50 || bullet.y > 950)) {
                bullet.setActive(false);
                bullet.setVisible(false);
            }
        });
    }
    
    /**
     * Shoot a bullet toward a target position
     * @param {number} targetX - X coordinate to shoot toward
     * @param {number} targetY - Y coordinate to shoot toward
     */
    shoot(targetX, targetY) {
        // Get a bullet from the group (reuses inactive bullets)
        const bullet = this.bullets.get(this.player.x, this.player.y);
        
        if (!bullet) return;  // No bullets available
        
        bullet.setActive(true);
        bullet.setVisible(true);
        
        // Calculate direction to target
        const angle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            targetX, targetY
        );
        
        // Set bullet velocity toward target
        const bulletSpeed = 600;
        bullet.setVelocity(
            Math.cos(angle) * bulletSpeed,
            Math.sin(angle) * bulletSpeed
        );
        
        // Rotate bullet to face direction of travel
        bullet.setRotation(angle);
        
        // Bullets shouldn't be affected by gravity
        bullet.body.allowGravity = false;
    }
}


```

```javascript
/**
 * PlayScene - Main gameplay scene
 * 
 * This is where the actual game happens. Phaser scenes have three main methods:
 * - preload(): Load assets (images, sounds, etc.)
 * - create(): Set up game objects, physics, input (runs once when scene starts)
 * - update(): Game loop, runs every frame (~60 times per second)
 */

import { DebugControls } from '../utils/DebugControls.js';
import { PLATFORM_SHAPES, LEVEL_LAYOUTS } from '../platforms/PlatformShapes.js';
import { drawWalls, drawWater } from '../drawing/EnvironmentRenderer.js';
import { generateAllShapeTextures } from '../drawing/ShapeRenderer.js';

export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        // Load the user-cropped notebook paper background (preserves scale)
        this.load.image('notebook-paper', 'assets/cropped-notebook-page.png');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using cropped image) ===
        // Paper is pre-cropped to edges, just scale to fit canvas
        const paper = this.add.image(350, 450, 'notebook-paper');
        paper.setDisplaySize(700, 900);
        
        
        // === WALLS (hand-drawn style with crayon fill) ===
        this.walls = drawWalls(this);
        
        // === WATER HAZARD (with crayon-like blue fill) ===
        this.waterZone = drawWater(this);
        
        
        // === PLATFORMS (using shape library) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Generate textures for all shapes in the library
        generateAllShapeTextures(this, PLATFORM_SHAPES);
        
        // Select level layout (use passed index or default to 0)
        this.currentLayoutIndex = (this.scene.settings.data && this.scene.settings.data.layoutIndex !== undefined) 
            ? this.scene.settings.data.layoutIndex 
            : 0;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex])
        
        
        // === PLAYER (hand-drawn stick figure - 0.75x original) ===
        if (!this.textures.exists('player')) {
            const playerGraphics = this.add.graphics();
            playerGraphics.lineStyle(1.5, 0x1a1a1a);  // Black pen
            
            // Simple stick figure: head, body, legs
            // Head (circle)
            playerGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 5.25);
            playerGraphics.lineTo(4.5, 10.5);
            playerGraphics.strokePath();
            // Arms (line across)
            playerGraphics.beginPath();
            playerGraphics.moveTo(1.5, 7.5);
            playerGraphics.lineTo(7.5, 7.5);
            playerGraphics.strokePath();
            // Legs (two lines)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(2.25, 15);
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(6.75, 15);
            playerGraphics.strokePath();
            
            playerGraphics.generateTexture('player', 9, 17);
            playerGraphics.destroy();
        }
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        
        // Player dies if they touch water!
        this.physics.add.overlap(this.player, this.waterZone, this.playerDied, null, this);
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // WASD keys as alternative movement
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
        
        // Mouse input for shooting (and continuing after level complete)
        this.input.on('pointerdown', (pointer) => {
            if (this.levelInProgress) {
                this.shoot(pointer.x, pointer.y);
            } else {
                // Level is complete, click to start next level
                this.startNextLevel();
            }
        });
        
        
        // === BULLETS ===
        // === BULLET (hand-drawn dash) ===
        if (!this.textures.exists('bullet')) {
            const bulletGraphics = this.add.graphics();
            bulletGraphics.lineStyle(2, 0x1a1a1a);  // Black pen stroke
            bulletGraphics.beginPath();
            bulletGraphics.moveTo(0, 2);
            bulletGraphics.lineTo(8, 2);
            bulletGraphics.strokePath();
            bulletGraphics.generateTexture('bullet', 10, 4);
            bulletGraphics.destroy();
        }
        
        // Now create the group that uses the texture
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });
        
        
        // === ENEMIES ===
        // === ENEMY (hand-drawn stick figure in red - 0.75x original) ===
        if (!this.textures.exists('enemy')) {
            const enemyGraphics = this.add.graphics();
            enemyGraphics.lineStyle(1.5, 0xcc3333);  // Red pen
            
            // Same stick figure shape as player
            // Head (circle)
            enemyGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 5.25);
            enemyGraphics.lineTo(4.5, 10.5);
            enemyGraphics.strokePath();
            // Arms (line across)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(1.5, 7.5);
            enemyGraphics.lineTo(7.5, 7.5);
            enemyGraphics.strokePath();
            // Legs (two lines)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(2.25, 15);
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(6.75, 15);
            enemyGraphics.strokePath();
            
            enemyGraphics.generateTexture('enemy', 9, 17);
            enemyGraphics.destroy();
        }
        
        // Create enemies group
        this.enemies = this.physics.add.group();
        
        // Spawn initial enemies on platforms
        this.spawnEnemy(450, 600);   // Bottom right platform
        this.spawnEnemy(280, 460);   // Middle platform
        this.spawnEnemy(380, 390);   // Row 4
        this.spawnEnemy(380, 250);   // Top platform
        
        // Make enemies collide with platforms (so they sit on them)
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Bullets hit enemies!
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        
        
        // === UI TEXT ===
        // Show some instructions (smaller for notebook canvas)
        this.add.text(60, 16, 'Arrows: move | Click: shoot | R/G: restart/new | F: fly | H: hitbox', {
            fontSize: '9px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Debug controls (R/G/F/H keys)
        this.debugControls = new DebugControls(this);
        
        // Enemy counter (positioned for notebook canvas)
        this.enemyCountText = this.add.text(60, 32, '', {
            fontSize: '11px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        this.updateEnemyCount();
        
        // Level complete text (hidden initially) - centered for 700px canvas
        this.levelCompleteText = this.add.text(350, 400, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '28px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 18, y: 10 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(350, 460, 'Click to continue', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 5 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display
        this.levelText = this.add.text(610, 16, 'Level: 1', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 6, y: 3 }
        });
        
        // Layout number display (for debugging)
        this.layoutText = this.add.text(60, 48, `Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`, {
            fontSize: '11px',
            fill: '#666',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Spawn points will be generated from the layout
        this.spawnPoints = [];
        
        // Player start position (will be set by layout)
        this.playerStartX = 100;
        this.playerStartY = 600;
    }
    
    /**
     * Load a level layout from the library
     */
    loadLayout(layout) {
        // Clear existing platforms
        this.platforms.clear(true, true);
        
        // Clear compound shape visuals (they're not in the platforms group)
        if (this.compoundVisuals) {
            this.compoundVisuals.forEach(v => v.destroy());
        }
        this.compoundVisuals = [];
        
        // Clear spawn points
        this.spawnPoints = [];
        
        // Create platforms from layout
        for (const plat of layout.platforms) {
            const shapeData = PLATFORM_SHAPES[plat.shape];
            
            // Check if this is a compound shape (has separate collision parts)
            if (shapeData.parts) {
                // Compound shape: create visual-only sprite + separate collision bodies
                
                // Add visual sprite (no physics) - track it for cleanup
                const visual = this.add.image(plat.x, plat.y, plat.shape);
                this.compoundVisuals.push(visual);
                
                // Create collision bodies for each part
                for (const part of shapeData.parts) {
                    // Part coordinates are relative to shape origin (top-left)
                    // Convert to world position (plat.x, plat.y is center of shape)
                    const partX = plat.x - shapeData.width / 2 + part.x + part.w / 2;
                    const partY = plat.y - shapeData.height / 2 + part.y + part.h / 2;
                    
                    // Create invisible collision rectangle
                    const collider = this.add.rectangle(partX, partY, part.w, part.h, 0x000000, 0);
                    this.physics.add.existing(collider, true);  // true = static
                    this.platforms.add(collider);
                }
            } else {
                // Simple shape: single collision body (original behavior)
                const platform = this.platforms.create(plat.x, plat.y, plat.shape);
            }
            
            // Add this platform position as a spawn point
            // Spawn point is on top of the platform
            this.spawnPoints.push({
                x: plat.x,
                y: plat.y - shapeData.height / 2 - 15  // Above the platform
            });
        }
        
        // Set player start to first platform
        if (layout.platforms.length > 0) {
            const firstPlat = layout.platforms[0];
            const firstShape = PLATFORM_SHAPES[firstPlat.shape];
            this.playerStartX = firstPlat.x;
            this.playerStartY = firstPlat.y - firstShape.height / 2 - 15;
        }
    }
    
    /**
     * Spawn an enemy at a position
     */
    spawnEnemy(x, y) {
        const enemy = this.enemies.create(x, y, 'enemy');
        enemy.setBounce(0);
        enemy.setCollideWorldBounds(true);
    }
    
    /**
     * Called when a bullet hits an enemy
     */
    bulletHitEnemy(bullet, enemy) {
        // Deactivate the bullet
        bullet.setActive(false);
        bullet.setVisible(false);
        
        // Destroy the enemy
        enemy.destroy();
        
        // Update the counter
        this.updateEnemyCount();
        
        // Check for level complete
        if (this.enemies.countActive() === 0) {
            this.levelComplete();
        }
    }
    
    /**
     * Update the enemy count display
     */
    updateEnemyCount() {
        const count = this.enemies.countActive();
        this.enemyCountText.setText(`Enemies remaining: ${count}`);
    }
    
    /**
     * Called when all enemies are defeated
     */
    levelComplete() {
        this.levelInProgress = false;
        this.levelCompleteText.setVisible(true);
        this.clickToContinueText.setVisible(true);
    }
    
    /**
     * Start the next level - cycle through layouts and spawn enemies
     */
    startNextLevel() {
        this.currentLevel++;
        this.levelText.setText(`Level: ${this.currentLevel}`);
        
        // Hide completion messages
        this.levelCompleteText.setVisible(false);
        this.clickToContinueText.setVisible(false);
        
        // Clear any remaining bullets
        this.bullets.children.each((bullet) => {
            bullet.setActive(false);
            bullet.setVisible(false);
        });
        
        // Cycle to next layout (or random)
        this.currentLayoutIndex = (this.currentLayoutIndex + 1) % LEVEL_LAYOUTS.length;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex]);
        
        // Update layout label
        this.layoutText.setText(`Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`);
        
        // Re-add platform and wall collisions
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Spawn enemies at random positions
        // More enemies as levels progress (4 + 1 per 2 levels, max based on spawn points)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), this.spawnPoints.length - 1);
        
        // Filter out player start position from spawn points for enemies
        const enemySpawnPoints = this.spawnPoints.filter(
            p => !(Math.abs(p.x - this.playerStartX) < 10 && Math.abs(p.y - this.playerStartY) < 10)
        );
        
        // Shuffle and pick
        const shuffled = Phaser.Utils.Array.Shuffle([...enemySpawnPoints]);
        for (let i = 0; i < enemyCount && i < shuffled.length; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position - use body.reset for proper physics sync
        this.player.body.reset(this.playerStartX, this.playerStartY);
    }
    
    /**
     * Called when player touches water
     */
    playerDied() {
        // Prevent multiple triggers while respawning
        if (this.isRespawning) return;
        this.isRespawning = true;
        
        // Force physics body to fully reset at new position
        // This syncs sprite + physics body immediately to prevent desync
        this.player.body.reset(this.playerStartX, this.playerStartY);
        
        // Brief visual feedback - flash the player
        this.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            this.player.clearTint();
        });
        
        // Clear respawn flag after player has time to land
        this.time.delayedCall(500, () => {
            this.isRespawning = false;
        });
    }

    update() {
        // This runs every frame - handle player movement here
        
        // Check debug controls (R/G/F/H keys)
        const debugAction = this.debugControls.update(this.player, this.currentLayoutIndex, LEVEL_LAYOUTS.length);
        if (debugAction) {
            if (debugAction.action === 'restart') {
                this.scene.restart({ layoutIndex: debugAction.layoutIndex });
                return;
            }
            // flyToggled and hitboxToggled are handled internally by DebugControls
        }
        
        const speed = 120;  // Scaled down for smaller characters
        const flySpeed = 200;  // Speed when flying
        const jumpVelocity = -280;  // Scaled down - smaller jump for zoomed-out feel
        
        // Left/Right movement (arrows or WASD)
        const flyMode = this.debugControls.isFlyMode();
        const leftDown = this.cursors.left.isDown || this.wasd.left.isDown;
        const rightDown = this.cursors.right.isDown || this.wasd.right.isDown;
        const upDown = this.cursors.up.isDown || this.wasd.up.isDown;
        const downDown = this.cursors.down.isDown || this.wasd.down.isDown;
        
        if (leftDown) {
            this.player.setVelocityX(flyMode ? -flySpeed : -speed);
        } else if (rightDown) {
            this.player.setVelocityX(flyMode ? flySpeed : speed);
        } else {
            // No key pressed - stop horizontal movement
            this.player.setVelocityX(0);
        }
        
        // Up/Down movement (fly mode) or jumping (normal mode)
        if (flyMode) {
            // Fly mode: up/down moves vertically
            if (upDown) {
                this.player.setVelocityY(-flySpeed);
            } else if (downDown) {
                this.player.setVelocityY(flySpeed);
            } else {
                this.player.setVelocityY(0);
            }
        } else {
            // Normal mode: jumping when touching ground
            if (upDown && this.player.body.blocked.down) {
                this.player.setVelocityY(jumpVelocity);
            }
        }
        
        // Clean up bullets that have left the screen
        this.bullets.children.each((bullet) => {
            if (bullet.active && (bullet.x < -50 || bullet.x > 750 || bullet.y < -50 || bullet.y > 950)) {
                bullet.setActive(false);
                bullet.setVisible(false);
            }
        });
    }
    
    /**
     * Shoot a bullet toward a target position
     * @param {number} targetX - X coordinate to shoot toward
     * @param {number} targetY - Y coordinate to shoot toward
     */
    shoot(targetX, targetY) {
        // Get a bullet from the group (reuses inactive bullets)
        const bullet = this.bullets.get(this.player.x, this.player.y);
        
        if (!bullet) return;  // No bullets available
        
        bullet.setActive(true);
        bullet.setVisible(true);
        
        // Calculate direction to target
        const angle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            targetX, targetY
        );
        
        // Set bullet velocity toward target
        const bulletSpeed = 600;
        bullet.setVelocity(
            Math.cos(angle) * bulletSpeed,
            Math.sin(angle) * bulletSpeed
        );
        
        // Rotate bullet to face direction of travel
        bullet.setRotation(angle);
        
        // Bullets shouldn't be affected by gravity
        bullet.body.allowGravity = false;
    }
}


```

Let me also update the instructions text to mention WASD:

```javascript
/**
 * PlayScene - Main gameplay scene
 * 
 * This is where the actual game happens. Phaser scenes have three main methods:
 * - preload(): Load assets (images, sounds, etc.)
 * - create(): Set up game objects, physics, input (runs once when scene starts)
 * - update(): Game loop, runs every frame (~60 times per second)
 */

import { DebugControls } from '../utils/DebugControls.js';
import { PLATFORM_SHAPES, LEVEL_LAYOUTS } from '../platforms/PlatformShapes.js';
import { drawWalls, drawWater } from '../drawing/EnvironmentRenderer.js';
import { generateAllShapeTextures } from '../drawing/ShapeRenderer.js';

export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        // Load the user-cropped notebook paper background (preserves scale)
        this.load.image('notebook-paper', 'assets/cropped-notebook-page.png');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using cropped image) ===
        // Paper is pre-cropped to edges, just scale to fit canvas
        const paper = this.add.image(350, 450, 'notebook-paper');
        paper.setDisplaySize(700, 900);
        
        
        // === WALLS (hand-drawn style with crayon fill) ===
        this.walls = drawWalls(this);
        
        // === WATER HAZARD (with crayon-like blue fill) ===
        this.waterZone = drawWater(this);
        
        
        // === PLATFORMS (using shape library) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Generate textures for all shapes in the library
        generateAllShapeTextures(this, PLATFORM_SHAPES);
        
        // Select level layout (use passed index or default to 0)
        this.currentLayoutIndex = (this.scene.settings.data && this.scene.settings.data.layoutIndex !== undefined) 
            ? this.scene.settings.data.layoutIndex 
            : 0;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex])
        
        
        // === PLAYER (hand-drawn stick figure - 0.75x original) ===
        if (!this.textures.exists('player')) {
            const playerGraphics = this.add.graphics();
            playerGraphics.lineStyle(1.5, 0x1a1a1a);  // Black pen
            
            // Simple stick figure: head, body, legs
            // Head (circle)
            playerGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 5.25);
            playerGraphics.lineTo(4.5, 10.5);
            playerGraphics.strokePath();
            // Arms (line across)
            playerGraphics.beginPath();
            playerGraphics.moveTo(1.5, 7.5);
            playerGraphics.lineTo(7.5, 7.5);
            playerGraphics.strokePath();
            // Legs (two lines)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(2.25, 15);
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(6.75, 15);
            playerGraphics.strokePath();
            
            playerGraphics.generateTexture('player', 9, 17);
            playerGraphics.destroy();
        }
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        
        // Player dies if they touch water!
        this.physics.add.overlap(this.player, this.waterZone, this.playerDied, null, this);
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // WASD keys as alternative movement
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
        
        // Mouse input for shooting (and continuing after level complete)
        this.input.on('pointerdown', (pointer) => {
            if (this.levelInProgress) {
                this.shoot(pointer.x, pointer.y);
            } else {
                // Level is complete, click to start next level
                this.startNextLevel();
            }
        });
        
        
        // === BULLETS ===
        // === BULLET (hand-drawn dash) ===
        if (!this.textures.exists('bullet')) {
            const bulletGraphics = this.add.graphics();
            bulletGraphics.lineStyle(2, 0x1a1a1a);  // Black pen stroke
            bulletGraphics.beginPath();
            bulletGraphics.moveTo(0, 2);
            bulletGraphics.lineTo(8, 2);
            bulletGraphics.strokePath();
            bulletGraphics.generateTexture('bullet', 10, 4);
            bulletGraphics.destroy();
        }
        
        // Now create the group that uses the texture
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });
        
        
        // === ENEMIES ===
        // === ENEMY (hand-drawn stick figure in red - 0.75x original) ===
        if (!this.textures.exists('enemy')) {
            const enemyGraphics = this.add.graphics();
            enemyGraphics.lineStyle(1.5, 0xcc3333);  // Red pen
            
            // Same stick figure shape as player
            // Head (circle)
            enemyGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 5.25);
            enemyGraphics.lineTo(4.5, 10.5);
            enemyGraphics.strokePath();
            // Arms (line across)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(1.5, 7.5);
            enemyGraphics.lineTo(7.5, 7.5);
            enemyGraphics.strokePath();
            // Legs (two lines)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(2.25, 15);
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(6.75, 15);
            enemyGraphics.strokePath();
            
            enemyGraphics.generateTexture('enemy', 9, 17);
            enemyGraphics.destroy();
        }
        
        // Create enemies group
        this.enemies = this.physics.add.group();
        
        // Spawn initial enemies on platforms
        this.spawnEnemy(450, 600);   // Bottom right platform
        this.spawnEnemy(280, 460);   // Middle platform
        this.spawnEnemy(380, 390);   // Row 4
        this.spawnEnemy(380, 250);   // Top platform
        
        // Make enemies collide with platforms (so they sit on them)
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Bullets hit enemies!
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        
        
        // === UI TEXT ===
        // Show some instructions (smaller for notebook canvas)
        this.add.text(60, 16, 'WASD/Arrows: move | Click: shoot | R/G: restart/new | F: fly | H: hitbox', {
            fontSize: '9px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Debug controls (R/G/F/H keys)
        this.debugControls = new DebugControls(this);
        
        // Enemy counter (positioned for notebook canvas)
        this.enemyCountText = this.add.text(60, 32, '', {
            fontSize: '11px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        this.updateEnemyCount();
        
        // Level complete text (hidden initially) - centered for 700px canvas
        this.levelCompleteText = this.add.text(350, 400, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '28px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 18, y: 10 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(350, 460, 'Click to continue', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 5 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display
        this.levelText = this.add.text(610, 16, 'Level: 1', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 6, y: 3 }
        });
        
        // Layout number display (for debugging)
        this.layoutText = this.add.text(60, 48, `Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`, {
            fontSize: '11px',
            fill: '#666',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Spawn points will be generated from the layout
        this.spawnPoints = [];
        
        // Player start position (will be set by layout)
        this.playerStartX = 100;
        this.playerStartY = 600;
    }
    
    /**
     * Load a level layout from the library
     */
    loadLayout(layout) {
        // Clear existing platforms
        this.platforms.clear(true, true);
        
        // Clear compound shape visuals (they're not in the platforms group)
        if (this.compoundVisuals) {
            this.compoundVisuals.forEach(v => v.destroy());
        }
        this.compoundVisuals = [];
        
        // Clear spawn points
        this.spawnPoints = [];
        
        // Create platforms from layout
        for (const plat of layout.platforms) {
            const shapeData = PLATFORM_SHAPES[plat.shape];
            
            // Check if this is a compound shape (has separate collision parts)
            if (shapeData.parts) {
                // Compound shape: create visual-only sprite + separate collision bodies
                
                // Add visual sprite (no physics) - track it for cleanup
                const visual = this.add.image(plat.x, plat.y, plat.shape);
                this.compoundVisuals.push(visual);
                
                // Create collision bodies for each part
                for (const part of shapeData.parts) {
                    // Part coordinates are relative to shape origin (top-left)
                    // Convert to world position (plat.x, plat.y is center of shape)
                    const partX = plat.x - shapeData.width / 2 + part.x + part.w / 2;
                    const partY = plat.y - shapeData.height / 2 + part.y + part.h / 2;
                    
                    // Create invisible collision rectangle
                    const collider = this.add.rectangle(partX, partY, part.w, part.h, 0x000000, 0);
                    this.physics.add.existing(collider, true);  // true = static
                    this.platforms.add(collider);
                }
            } else {
                // Simple shape: single collision body (original behavior)
                const platform = this.platforms.create(plat.x, plat.y, plat.shape);
            }
            
            // Add this platform position as a spawn point
            // Spawn point is on top of the platform
            this.spawnPoints.push({
                x: plat.x,
                y: plat.y - shapeData.height / 2 - 15  // Above the platform
            });
        }
        
        // Set player start to first platform
        if (layout.platforms.length > 0) {
            const firstPlat = layout.platforms[0];
            const firstShape = PLATFORM_SHAPES[firstPlat.shape];
            this.playerStartX = firstPlat.x;
            this.playerStartY = firstPlat.y - firstShape.height / 2 - 15;
        }
    }
    
    /**
     * Spawn an enemy at a position
     */
    spawnEnemy(x, y) {
        const enemy = this.enemies.create(x, y, 'enemy');
        enemy.setBounce(0);
        enemy.setCollideWorldBounds(true);
    }
    
    /**
     * Called when a bullet hits an enemy
     */
    bulletHitEnemy(bullet, enemy) {
        // Deactivate the bullet
        bullet.setActive(false);
        bullet.setVisible(false);
        
        // Destroy the enemy
        enemy.destroy();
        
        // Update the counter
        this.updateEnemyCount();
        
        // Check for level complete
        if (this.enemies.countActive() === 0) {
            this.levelComplete();
        }
    }
    
    /**
     * Update the enemy count display
     */
    updateEnemyCount() {
        const count = this.enemies.countActive();
        this.enemyCountText.setText(`Enemies remaining: ${count}`);
    }
    
    /**
     * Called when all enemies are defeated
     */
    levelComplete() {
        this.levelInProgress = false;
        this.levelCompleteText.setVisible(true);
        this.clickToContinueText.setVisible(true);
    }
    
    /**
     * Start the next level - cycle through layouts and spawn enemies
     */
    startNextLevel() {
        this.currentLevel++;
        this.levelText.setText(`Level: ${this.currentLevel}`);
        
        // Hide completion messages
        this.levelCompleteText.setVisible(false);
        this.clickToContinueText.setVisible(false);
        
        // Clear any remaining bullets
        this.bullets.children.each((bullet) => {
            bullet.setActive(false);
            bullet.setVisible(false);
        });
        
        // Cycle to next layout (or random)
        this.currentLayoutIndex = (this.currentLayoutIndex + 1) % LEVEL_LAYOUTS.length;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex]);
        
        // Update layout label
        this.layoutText.setText(`Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`);
        
        // Re-add platform and wall collisions
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Spawn enemies at random positions
        // More enemies as levels progress (4 + 1 per 2 levels, max based on spawn points)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), this.spawnPoints.length - 1);
        
        // Filter out player start position from spawn points for enemies
        const enemySpawnPoints = this.spawnPoints.filter(
            p => !(Math.abs(p.x - this.playerStartX) < 10 && Math.abs(p.y - this.playerStartY) < 10)
        );
        
        // Shuffle and pick
        const shuffled = Phaser.Utils.Array.Shuffle([...enemySpawnPoints]);
        for (let i = 0; i < enemyCount && i < shuffled.length; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position - use body.reset for proper physics sync
        this.player.body.reset(this.playerStartX, this.playerStartY);
    }
    
    /**
     * Called when player touches water
     */
    playerDied() {
        // Prevent multiple triggers while respawning
        if (this.isRespawning) return;
        this.isRespawning = true;
        
        // Force physics body to fully reset at new position
        // This syncs sprite + physics body immediately to prevent desync
        this.player.body.reset(this.playerStartX, this.playerStartY);
        
        // Brief visual feedback - flash the player
        this.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            this.player.clearTint();
        });
        
        // Clear respawn flag after player has time to land
        this.time.delayedCall(500, () => {
            this.isRespawning = false;
        });
    }

    update() {
        // This runs every frame - handle player movement here
        
        // Check debug controls (R/G/F/H keys)
        const debugAction = this.debugControls.update(this.player, this.currentLayoutIndex, LEVEL_LAYOUTS.length);
        if (debugAction) {
            if (debugAction.action === 'restart') {
                this.scene.restart({ layoutIndex: debugAction.layoutIndex });
                return;
            }
            // flyToggled and hitboxToggled are handled internally by DebugControls
        }
        
        const speed = 120;  // Scaled down for smaller characters
        const flySpeed = 200;  // Speed when flying
        const jumpVelocity = -280;  // Scaled down - smaller jump for zoomed-out feel
        
        // Left/Right movement (arrows or WASD)
        const flyMode = this.debugControls.isFlyMode();
        const leftDown = this.cursors.left.isDown || this.wasd.left.isDown;
        const rightDown = this.cursors.right.isDown || this.wasd.right.isDown;
        const upDown = this.cursors.up.isDown || this.wasd.up.isDown;
        const downDown = this.cursors.down.isDown || this.wasd.down.isDown;
        
        if (leftDown) {
            this.player.setVelocityX(flyMode ? -flySpeed : -speed);
        } else if (rightDown) {
            this.player.setVelocityX(flyMode ? flySpeed : speed);
        } else {
            // No key pressed - stop horizontal movement
            this.player.setVelocityX(0);
        }
        
        // Up/Down movement (fly mode) or jumping (normal mode)
        if (flyMode) {
            // Fly mode: up/down moves vertically
            if (upDown) {
                this.player.setVelocityY(-flySpeed);
            } else if (downDown) {
                this.player.setVelocityY(flySpeed);
            } else {
                this.player.setVelocityY(0);
            }
        } else {
            // Normal mode: jumping when touching ground
            if (upDown && this.player.body.blocked.down) {
                this.player.setVelocityY(jumpVelocity);
            }
        }
        
        // Clean up bullets that have left the screen
        this.bullets.children.each((bullet) => {
            if (bullet.active && (bullet.x < -50 || bullet.x > 750 || bullet.y < -50 || bullet.y > 950)) {
                bullet.setActive(false);
                bullet.setVisible(false);
            }
        });
    }
    
    /**
     * Shoot a bullet toward a target position
     * @param {number} targetX - X coordinate to shoot toward
     * @param {number} targetY - Y coordinate to shoot toward
     */
    shoot(targetX, targetY) {
        // Get a bullet from the group (reuses inactive bullets)
        const bullet = this.bullets.get(this.player.x, this.player.y);
        
        if (!bullet) return;  // No bullets available
        
        bullet.setActive(true);
        bullet.setVisible(true);
        
        // Calculate direction to target
        const angle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            targetX, targetY
        );
        
        // Set bullet velocity toward target
        const bulletSpeed = 600;
        bullet.setVelocity(
            Math.cos(angle) * bulletSpeed,
            Math.sin(angle) * bulletSpeed
        );
        
        // Rotate bullet to face direction of travel
        bullet.setRotation(angle);
        
        // Bullets shouldn't be affected by gravity
        bullet.body.allowGravity = false;
    }
}


```

Done! Added WASD controls.

**Changes:**
- Added W/A/S/D key bindings alongside arrow keys
- Both work for movement, jumping, and fly mode
- Updated the on-screen instructions

**Test it:**
1. Refresh http://localhost:8000
2. Use **A/D** to move left/right
3. Use **W** to jump
4. In fly mode (F), **W/S** moves up/down
5. Arrow keys still work too - use whichever you prefer

---

**User**

okay lets work on how we aim and shoot now. lets try something and you tell me if you think it could work. i think a crosshair on screen representing where the player is aiming like a standard fps cross hair where two lines intersect with some space in the middle so there isnt perfect accuracy. at all times this crosshair should be a certain distance away from the character. say a distance of 5 player heights. crosshair about as big as the player character and semi transparent. aiming will now work by keyboard. one key to rotate aim clockwise and another to rotate aim counterclockwise. i'm thinking J and K for now. is that all possible. should we go one step at a time?

---

**Cursor**

Yes, this is totally doable! Great idea for a more arcade/console-friendly control scheme.

**What we need:**
1. **Crosshair graphic** - Two lines with center gap, ~player size, semi-transparent
2. **Fixed distance** - 5 × 17px (player height) = **85 pixels** from player
3. **Rotation state** - Track current aim angle
4. **J/K keys** - Rotate counterclockwise/clockwise
5. **Update shooting** - Fire toward crosshair instead of mouse

**Let's go step by step:**

1. ✅ Create crosshair visual + position at fixed distance from player
2. Add J/K rotation controls  
3. Update shooting to use crosshair position

Ready to start with **Step 1: Create crosshair and position it**?

I'll create the crosshair graphic, store an aim angle, and make it orbit the player at 85px distance. Initially it'll just point right (angle 0) and follow the player around. Then we add rotation.

---

**User**

ok sounds good

---

**Cursor**

Let me add the crosshair. I'll create it after the player and update its position every frame:

```javascript
/**
 * PlayScene - Main gameplay scene
 * 
 * This is where the actual game happens. Phaser scenes have three main methods:
 * - preload(): Load assets (images, sounds, etc.)
 * - create(): Set up game objects, physics, input (runs once when scene starts)
 * - update(): Game loop, runs every frame (~60 times per second)
 */

import { DebugControls } from '../utils/DebugControls.js';
import { PLATFORM_SHAPES, LEVEL_LAYOUTS } from '../platforms/PlatformShapes.js';
import { drawWalls, drawWater } from '../drawing/EnvironmentRenderer.js';
import { generateAllShapeTextures } from '../drawing/ShapeRenderer.js';

export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        // Load the user-cropped notebook paper background (preserves scale)
        this.load.image('notebook-paper', 'assets/cropped-notebook-page.png');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using cropped image) ===
        // Paper is pre-cropped to edges, just scale to fit canvas
        const paper = this.add.image(350, 450, 'notebook-paper');
        paper.setDisplaySize(700, 900);
        
        
        // === WALLS (hand-drawn style with crayon fill) ===
        this.walls = drawWalls(this);
        
        // === WATER HAZARD (with crayon-like blue fill) ===
        this.waterZone = drawWater(this);
        
        
        // === PLATFORMS (using shape library) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Generate textures for all shapes in the library
        generateAllShapeTextures(this, PLATFORM_SHAPES);
        
        // Select level layout (use passed index or default to 0)
        this.currentLayoutIndex = (this.scene.settings.data && this.scene.settings.data.layoutIndex !== undefined) 
            ? this.scene.settings.data.layoutIndex 
            : 0;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex])
        
        
        // === PLAYER (hand-drawn stick figure - 0.75x original) ===
        if (!this.textures.exists('player')) {
            const playerGraphics = this.add.graphics();
            playerGraphics.lineStyle(1.5, 0x1a1a1a);  // Black pen
            
            // Simple stick figure: head, body, legs
            // Head (circle)
            playerGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 5.25);
            playerGraphics.lineTo(4.5, 10.5);
            playerGraphics.strokePath();
            // Arms (line across)
            playerGraphics.beginPath();
            playerGraphics.moveTo(1.5, 7.5);
            playerGraphics.lineTo(7.5, 7.5);
            playerGraphics.strokePath();
            // Legs (two lines)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(2.25, 15);
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(6.75, 15);
            playerGraphics.strokePath();
            
            playerGraphics.generateTexture('player', 9, 17);
            playerGraphics.destroy();
        }
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        
        // Player dies if they touch water!
        this.physics.add.overlap(this.player, this.waterZone, this.playerDied, null, this);
        
        
        // === CROSSHAIR (aim indicator) ===
        // Create crosshair texture - two lines with gap in middle
        if (!this.textures.exists('crosshair')) {
            const crosshairGraphics = this.add.graphics();
            const size = 17;  // About player height
            const gap = 4;    // Gap in center
            const halfSize = size / 2;
            const halfGap = gap / 2;
            
            crosshairGraphics.lineStyle(1.5, 0x1a1a1a, 0.6);  // Semi-transparent dark line
            
            // Horizontal line (left segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(0, halfSize);
            crosshairGraphics.lineTo(halfSize - halfGap, halfSize);
            crosshairGraphics.strokePath();
            
            // Horizontal line (right segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(halfSize + halfGap, halfSize);
            crosshairGraphics.lineTo(size, halfSize);
            crosshairGraphics.strokePath();
            
            // Vertical line (top segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(halfSize, 0);
            crosshairGraphics.lineTo(halfSize, halfSize - halfGap);
            crosshairGraphics.strokePath();
            
            // Vertical line (bottom segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(halfSize, halfSize + halfGap);
            crosshairGraphics.lineTo(halfSize, size);
            crosshairGraphics.strokePath();
            
            crosshairGraphics.generateTexture('crosshair', size, size);
            crosshairGraphics.destroy();
        }
        
        // Create crosshair sprite
        this.crosshair = this.add.image(0, 0, 'crosshair');
        this.crosshair.setAlpha(0.7);  // Semi-transparent
        
        // Aim state - angle in radians (0 = right, increases counterclockwise)
        this.aimAngle = 0;
        this.aimDistance = 85;  // 5 player heights (5 * 17)
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // WASD keys as alternative movement
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
        
        // Mouse input for shooting (and continuing after level complete)
        this.input.on('pointerdown', (pointer) => {
            if (this.levelInProgress) {
                this.shoot(pointer.x, pointer.y);
            } else {
                // Level is complete, click to start next level
                this.startNextLevel();
            }
        });
        
        
        // === BULLETS ===
        // === BULLET (hand-drawn dash) ===
        if (!this.textures.exists('bullet')) {
            const bulletGraphics = this.add.graphics();
            bulletGraphics.lineStyle(2, 0x1a1a1a);  // Black pen stroke
            bulletGraphics.beginPath();
            bulletGraphics.moveTo(0, 2);
            bulletGraphics.lineTo(8, 2);
            bulletGraphics.strokePath();
            bulletGraphics.generateTexture('bullet', 10, 4);
            bulletGraphics.destroy();
        }
        
        // Now create the group that uses the texture
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });
        
        
        // === ENEMIES ===
        // === ENEMY (hand-drawn stick figure in red - 0.75x original) ===
        if (!this.textures.exists('enemy')) {
            const enemyGraphics = this.add.graphics();
            enemyGraphics.lineStyle(1.5, 0xcc3333);  // Red pen
            
            // Same stick figure shape as player
            // Head (circle)
            enemyGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 5.25);
            enemyGraphics.lineTo(4.5, 10.5);
            enemyGraphics.strokePath();
            // Arms (line across)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(1.5, 7.5);
            enemyGraphics.lineTo(7.5, 7.5);
            enemyGraphics.strokePath();
            // Legs (two lines)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(2.25, 15);
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(6.75, 15);
            enemyGraphics.strokePath();
            
            enemyGraphics.generateTexture('enemy', 9, 17);
            enemyGraphics.destroy();
        }
        
        // Create enemies group
        this.enemies = this.physics.add.group();
        
        // Spawn initial enemies on platforms
        this.spawnEnemy(450, 600);   // Bottom right platform
        this.spawnEnemy(280, 460);   // Middle platform
        this.spawnEnemy(380, 390);   // Row 4
        this.spawnEnemy(380, 250);   // Top platform
        
        // Make enemies collide with platforms (so they sit on them)
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Bullets hit enemies!
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        
        
        // === UI TEXT ===
        // Show some instructions (smaller for notebook canvas)
        this.add.text(60, 16, 'WASD/Arrows: move | Click: shoot | R/G: restart/new | F: fly | H: hitbox', {
            fontSize: '9px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Debug controls (R/G/F/H keys)
        this.debugControls = new DebugControls(this);
        
        // Enemy counter (positioned for notebook canvas)
        this.enemyCountText = this.add.text(60, 32, '', {
            fontSize: '11px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        this.updateEnemyCount();
        
        // Level complete text (hidden initially) - centered for 700px canvas
        this.levelCompleteText = this.add.text(350, 400, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '28px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 18, y: 10 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(350, 460, 'Click to continue', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 5 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display
        this.levelText = this.add.text(610, 16, 'Level: 1', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 6, y: 3 }
        });
        
        // Layout number display (for debugging)
        this.layoutText = this.add.text(60, 48, `Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`, {
            fontSize: '11px',
            fill: '#666',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Spawn points will be generated from the layout
        this.spawnPoints = [];
        
        // Player start position (will be set by layout)
        this.playerStartX = 100;
        this.playerStartY = 600;
    }
    
    /**
     * Load a level layout from the library
     */
    loadLayout(layout) {
        // Clear existing platforms
        this.platforms.clear(true, true);
        
        // Clear compound shape visuals (they're not in the platforms group)
        if (this.compoundVisuals) {
            this.compoundVisuals.forEach(v => v.destroy());
        }
        this.compoundVisuals = [];
        
        // Clear spawn points
        this.spawnPoints = [];
        
        // Create platforms from layout
        for (const plat of layout.platforms) {
            const shapeData = PLATFORM_SHAPES[plat.shape];
            
            // Check if this is a compound shape (has separate collision parts)
            if (shapeData.parts) {
                // Compound shape: create visual-only sprite + separate collision bodies
                
                // Add visual sprite (no physics) - track it for cleanup
                const visual = this.add.image(plat.x, plat.y, plat.shape);
                this.compoundVisuals.push(visual);
                
                // Create collision bodies for each part
                for (const part of shapeData.parts) {
                    // Part coordinates are relative to shape origin (top-left)
                    // Convert to world position (plat.x, plat.y is center of shape)
                    const partX = plat.x - shapeData.width / 2 + part.x + part.w / 2;
                    const partY = plat.y - shapeData.height / 2 + part.y + part.h / 2;
                    
                    // Create invisible collision rectangle
                    const collider = this.add.rectangle(partX, partY, part.w, part.h, 0x000000, 0);
                    this.physics.add.existing(collider, true);  // true = static
                    this.platforms.add(collider);
                }
            } else {
                // Simple shape: single collision body (original behavior)
                const platform = this.platforms.create(plat.x, plat.y, plat.shape);
            }
            
            // Add this platform position as a spawn point
            // Spawn point is on top of the platform
            this.spawnPoints.push({
                x: plat.x,
                y: plat.y - shapeData.height / 2 - 15  // Above the platform
            });
        }
        
        // Set player start to first platform
        if (layout.platforms.length > 0) {
            const firstPlat = layout.platforms[0];
            const firstShape = PLATFORM_SHAPES[firstPlat.shape];
            this.playerStartX = firstPlat.x;
            this.playerStartY = firstPlat.y - firstShape.height / 2 - 15;
        }
    }
    
    /**
     * Spawn an enemy at a position
     */
    spawnEnemy(x, y) {
        const enemy = this.enemies.create(x, y, 'enemy');
        enemy.setBounce(0);
        enemy.setCollideWorldBounds(true);
    }
    
    /**
     * Called when a bullet hits an enemy
     */
    bulletHitEnemy(bullet, enemy) {
        // Deactivate the bullet
        bullet.setActive(false);
        bullet.setVisible(false);
        
        // Destroy the enemy
        enemy.destroy();
        
        // Update the counter
        this.updateEnemyCount();
        
        // Check for level complete
        if (this.enemies.countActive() === 0) {
            this.levelComplete();
        }
    }
    
    /**
     * Update the enemy count display
     */
    updateEnemyCount() {
        const count = this.enemies.countActive();
        this.enemyCountText.setText(`Enemies remaining: ${count}`);
    }
    
    /**
     * Called when all enemies are defeated
     */
    levelComplete() {
        this.levelInProgress = false;
        this.levelCompleteText.setVisible(true);
        this.clickToContinueText.setVisible(true);
    }
    
    /**
     * Start the next level - cycle through layouts and spawn enemies
     */
    startNextLevel() {
        this.currentLevel++;
        this.levelText.setText(`Level: ${this.currentLevel}`);
        
        // Hide completion messages
        this.levelCompleteText.setVisible(false);
        this.clickToContinueText.setVisible(false);
        
        // Clear any remaining bullets
        this.bullets.children.each((bullet) => {
            bullet.setActive(false);
            bullet.setVisible(false);
        });
        
        // Cycle to next layout (or random)
        this.currentLayoutIndex = (this.currentLayoutIndex + 1) % LEVEL_LAYOUTS.length;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex]);
        
        // Update layout label
        this.layoutText.setText(`Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`);
        
        // Re-add platform and wall collisions
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Spawn enemies at random positions
        // More enemies as levels progress (4 + 1 per 2 levels, max based on spawn points)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), this.spawnPoints.length - 1);
        
        // Filter out player start position from spawn points for enemies
        const enemySpawnPoints = this.spawnPoints.filter(
            p => !(Math.abs(p.x - this.playerStartX) < 10 && Math.abs(p.y - this.playerStartY) < 10)
        );
        
        // Shuffle and pick
        const shuffled = Phaser.Utils.Array.Shuffle([...enemySpawnPoints]);
        for (let i = 0; i < enemyCount && i < shuffled.length; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position - use body.reset for proper physics sync
        this.player.body.reset(this.playerStartX, this.playerStartY);
    }
    
    /**
     * Called when player touches water
     */
    playerDied() {
        // Prevent multiple triggers while respawning
        if (this.isRespawning) return;
        this.isRespawning = true;
        
        // Force physics body to fully reset at new position
        // This syncs sprite + physics body immediately to prevent desync
        this.player.body.reset(this.playerStartX, this.playerStartY);
        
        // Brief visual feedback - flash the player
        this.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            this.player.clearTint();
        });
        
        // Clear respawn flag after player has time to land
        this.time.delayedCall(500, () => {
            this.isRespawning = false;
        });
    }

    update() {
        // This runs every frame - handle player movement here
        
        // Check debug controls (R/G/F/H keys)
        const debugAction = this.debugControls.update(this.player, this.currentLayoutIndex, LEVEL_LAYOUTS.length);
        if (debugAction) {
            if (debugAction.action === 'restart') {
                this.scene.restart({ layoutIndex: debugAction.layoutIndex });
                return;
            }
            // flyToggled and hitboxToggled are handled internally by DebugControls
        }
        
        const speed = 120;  // Scaled down for smaller characters
        const flySpeed = 200;  // Speed when flying
        const jumpVelocity = -280;  // Scaled down - smaller jump for zoomed-out feel
        
        // Left/Right movement (arrows or WASD)
        const flyMode = this.debugControls.isFlyMode();
        const leftDown = this.cursors.left.isDown || this.wasd.left.isDown;
        const rightDown = this.cursors.right.isDown || this.wasd.right.isDown;
        const upDown = this.cursors.up.isDown || this.wasd.up.isDown;
        const downDown = this.cursors.down.isDown || this.wasd.down.isDown;
        
        if (leftDown) {
            this.player.setVelocityX(flyMode ? -flySpeed : -speed);
        } else if (rightDown) {
            this.player.setVelocityX(flyMode ? flySpeed : speed);
        } else {
            // No key pressed - stop horizontal movement
            this.player.setVelocityX(0);
        }
        
        // Up/Down movement (fly mode) or jumping (normal mode)
        if (flyMode) {
            // Fly mode: up/down moves vertically
            if (upDown) {
                this.player.setVelocityY(-flySpeed);
            } else if (downDown) {
                this.player.setVelocityY(flySpeed);
            } else {
                this.player.setVelocityY(0);
            }
        } else {
            // Normal mode: jumping when touching ground
            if (upDown && this.player.body.blocked.down) {
                this.player.setVelocityY(jumpVelocity);
            }
        }
        
        // Clean up bullets that have left the screen
        this.bullets.children.each((bullet) => {
            if (bullet.active && (bullet.x < -50 || bullet.x > 750 || bullet.y < -50 || bullet.y > 950)) {
                bullet.setActive(false);
                bullet.setVisible(false);
            }
        });
    }
    
    /**
     * Shoot a bullet toward a target position
     * @param {number} targetX - X coordinate to shoot toward
     * @param {number} targetY - Y coordinate to shoot toward
     */
    shoot(targetX, targetY) {
        // Get a bullet from the group (reuses inactive bullets)
        const bullet = this.bullets.get(this.player.x, this.player.y);
        
        if (!bullet) return;  // No bullets available
        
        bullet.setActive(true);
        bullet.setVisible(true);
        
        // Calculate direction to target
        const angle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            targetX, targetY
        );
        
        // Set bullet velocity toward target
        const bulletSpeed = 600;
        bullet.setVelocity(
            Math.cos(angle) * bulletSpeed,
            Math.sin(angle) * bulletSpeed
        );
        
        // Rotate bullet to face direction of travel
        bullet.setRotation(angle);
        
        // Bullets shouldn't be affected by gravity
        bullet.body.allowGravity = false;
    }
}


```

Now let me add the crosshair position update in the `update()` loop:

```javascript
/**
 * PlayScene - Main gameplay scene
 * 
 * This is where the actual game happens. Phaser scenes have three main methods:
 * - preload(): Load assets (images, sounds, etc.)
 * - create(): Set up game objects, physics, input (runs once when scene starts)
 * - update(): Game loop, runs every frame (~60 times per second)
 */

import { DebugControls } from '../utils/DebugControls.js';
import { PLATFORM_SHAPES, LEVEL_LAYOUTS } from '../platforms/PlatformShapes.js';
import { drawWalls, drawWater } from '../drawing/EnvironmentRenderer.js';
import { generateAllShapeTextures } from '../drawing/ShapeRenderer.js';

export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        // Load the user-cropped notebook paper background (preserves scale)
        this.load.image('notebook-paper', 'assets/cropped-notebook-page.png');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using cropped image) ===
        // Paper is pre-cropped to edges, just scale to fit canvas
        const paper = this.add.image(350, 450, 'notebook-paper');
        paper.setDisplaySize(700, 900);
        
        
        // === WALLS (hand-drawn style with crayon fill) ===
        this.walls = drawWalls(this);
        
        // === WATER HAZARD (with crayon-like blue fill) ===
        this.waterZone = drawWater(this);
        
        
        // === PLATFORMS (using shape library) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Generate textures for all shapes in the library
        generateAllShapeTextures(this, PLATFORM_SHAPES);
        
        // Select level layout (use passed index or default to 0)
        this.currentLayoutIndex = (this.scene.settings.data && this.scene.settings.data.layoutIndex !== undefined) 
            ? this.scene.settings.data.layoutIndex 
            : 0;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex])
        
        
        // === PLAYER (hand-drawn stick figure - 0.75x original) ===
        if (!this.textures.exists('player')) {
            const playerGraphics = this.add.graphics();
            playerGraphics.lineStyle(1.5, 0x1a1a1a);  // Black pen
            
            // Simple stick figure: head, body, legs
            // Head (circle)
            playerGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 5.25);
            playerGraphics.lineTo(4.5, 10.5);
            playerGraphics.strokePath();
            // Arms (line across)
            playerGraphics.beginPath();
            playerGraphics.moveTo(1.5, 7.5);
            playerGraphics.lineTo(7.5, 7.5);
            playerGraphics.strokePath();
            // Legs (two lines)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(2.25, 15);
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(6.75, 15);
            playerGraphics.strokePath();
            
            playerGraphics.generateTexture('player', 9, 17);
            playerGraphics.destroy();
        }
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        
        // Player dies if they touch water!
        this.physics.add.overlap(this.player, this.waterZone, this.playerDied, null, this);
        
        
        // === CROSSHAIR (aim indicator) ===
        // Create crosshair texture - two lines with gap in middle
        if (!this.textures.exists('crosshair')) {
            const crosshairGraphics = this.add.graphics();
            const size = 17;  // About player height
            const gap = 4;    // Gap in center
            const halfSize = size / 2;
            const halfGap = gap / 2;
            
            crosshairGraphics.lineStyle(1.5, 0x1a1a1a, 0.6);  // Semi-transparent dark line
            
            // Horizontal line (left segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(0, halfSize);
            crosshairGraphics.lineTo(halfSize - halfGap, halfSize);
            crosshairGraphics.strokePath();
            
            // Horizontal line (right segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(halfSize + halfGap, halfSize);
            crosshairGraphics.lineTo(size, halfSize);
            crosshairGraphics.strokePath();
            
            // Vertical line (top segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(halfSize, 0);
            crosshairGraphics.lineTo(halfSize, halfSize - halfGap);
            crosshairGraphics.strokePath();
            
            // Vertical line (bottom segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(halfSize, halfSize + halfGap);
            crosshairGraphics.lineTo(halfSize, size);
            crosshairGraphics.strokePath();
            
            crosshairGraphics.generateTexture('crosshair', size, size);
            crosshairGraphics.destroy();
        }
        
        // Create crosshair sprite
        this.crosshair = this.add.image(0, 0, 'crosshair');
        this.crosshair.setAlpha(0.7);  // Semi-transparent
        
        // Aim state - angle in radians (0 = right, increases counterclockwise)
        this.aimAngle = 0;
        this.aimDistance = 85;  // 5 player heights (5 * 17)
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // WASD keys as alternative movement
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
        
        // Mouse input for shooting (and continuing after level complete)
        this.input.on('pointerdown', (pointer) => {
            if (this.levelInProgress) {
                this.shoot(pointer.x, pointer.y);
            } else {
                // Level is complete, click to start next level
                this.startNextLevel();
            }
        });
        
        
        // === BULLETS ===
        // === BULLET (hand-drawn dash) ===
        if (!this.textures.exists('bullet')) {
            const bulletGraphics = this.add.graphics();
            bulletGraphics.lineStyle(2, 0x1a1a1a);  // Black pen stroke
            bulletGraphics.beginPath();
            bulletGraphics.moveTo(0, 2);
            bulletGraphics.lineTo(8, 2);
            bulletGraphics.strokePath();
            bulletGraphics.generateTexture('bullet', 10, 4);
            bulletGraphics.destroy();
        }
        
        // Now create the group that uses the texture
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });
        
        
        // === ENEMIES ===
        // === ENEMY (hand-drawn stick figure in red - 0.75x original) ===
        if (!this.textures.exists('enemy')) {
            const enemyGraphics = this.add.graphics();
            enemyGraphics.lineStyle(1.5, 0xcc3333);  // Red pen
            
            // Same stick figure shape as player
            // Head (circle)
            enemyGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 5.25);
            enemyGraphics.lineTo(4.5, 10.5);
            enemyGraphics.strokePath();
            // Arms (line across)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(1.5, 7.5);
            enemyGraphics.lineTo(7.5, 7.5);
            enemyGraphics.strokePath();
            // Legs (two lines)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(2.25, 15);
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(6.75, 15);
            enemyGraphics.strokePath();
            
            enemyGraphics.generateTexture('enemy', 9, 17);
            enemyGraphics.destroy();
        }
        
        // Create enemies group
        this.enemies = this.physics.add.group();
        
        // Spawn initial enemies on platforms
        this.spawnEnemy(450, 600);   // Bottom right platform
        this.spawnEnemy(280, 460);   // Middle platform
        this.spawnEnemy(380, 390);   // Row 4
        this.spawnEnemy(380, 250);   // Top platform
        
        // Make enemies collide with platforms (so they sit on them)
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Bullets hit enemies!
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        
        
        // === UI TEXT ===
        // Show some instructions (smaller for notebook canvas)
        this.add.text(60, 16, 'WASD/Arrows: move | Click: shoot | R/G: restart/new | F: fly | H: hitbox', {
            fontSize: '9px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Debug controls (R/G/F/H keys)
        this.debugControls = new DebugControls(this);
        
        // Enemy counter (positioned for notebook canvas)
        this.enemyCountText = this.add.text(60, 32, '', {
            fontSize: '11px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        this.updateEnemyCount();
        
        // Level complete text (hidden initially) - centered for 700px canvas
        this.levelCompleteText = this.add.text(350, 400, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '28px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 18, y: 10 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(350, 460, 'Click to continue', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 5 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display
        this.levelText = this.add.text(610, 16, 'Level: 1', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 6, y: 3 }
        });
        
        // Layout number display (for debugging)
        this.layoutText = this.add.text(60, 48, `Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`, {
            fontSize: '11px',
            fill: '#666',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Spawn points will be generated from the layout
        this.spawnPoints = [];
        
        // Player start position (will be set by layout)
        this.playerStartX = 100;
        this.playerStartY = 600;
    }
    
    /**
     * Load a level layout from the library
     */
    loadLayout(layout) {
        // Clear existing platforms
        this.platforms.clear(true, true);
        
        // Clear compound shape visuals (they're not in the platforms group)
        if (this.compoundVisuals) {
            this.compoundVisuals.forEach(v => v.destroy());
        }
        this.compoundVisuals = [];
        
        // Clear spawn points
        this.spawnPoints = [];
        
        // Create platforms from layout
        for (const plat of layout.platforms) {
            const shapeData = PLATFORM_SHAPES[plat.shape];
            
            // Check if this is a compound shape (has separate collision parts)
            if (shapeData.parts) {
                // Compound shape: create visual-only sprite + separate collision bodies
                
                // Add visual sprite (no physics) - track it for cleanup
                const visual = this.add.image(plat.x, plat.y, plat.shape);
                this.compoundVisuals.push(visual);
                
                // Create collision bodies for each part
                for (const part of shapeData.parts) {
                    // Part coordinates are relative to shape origin (top-left)
                    // Convert to world position (plat.x, plat.y is center of shape)
                    const partX = plat.x - shapeData.width / 2 + part.x + part.w / 2;
                    const partY = plat.y - shapeData.height / 2 + part.y + part.h / 2;
                    
                    // Create invisible collision rectangle
                    const collider = this.add.rectangle(partX, partY, part.w, part.h, 0x000000, 0);
                    this.physics.add.existing(collider, true);  // true = static
                    this.platforms.add(collider);
                }
            } else {
                // Simple shape: single collision body (original behavior)
                const platform = this.platforms.create(plat.x, plat.y, plat.shape);
            }
            
            // Add this platform position as a spawn point
            // Spawn point is on top of the platform
            this.spawnPoints.push({
                x: plat.x,
                y: plat.y - shapeData.height / 2 - 15  // Above the platform
            });
        }
        
        // Set player start to first platform
        if (layout.platforms.length > 0) {
            const firstPlat = layout.platforms[0];
            const firstShape = PLATFORM_SHAPES[firstPlat.shape];
            this.playerStartX = firstPlat.x;
            this.playerStartY = firstPlat.y - firstShape.height / 2 - 15;
        }
    }
    
    /**
     * Spawn an enemy at a position
     */
    spawnEnemy(x, y) {
        const enemy = this.enemies.create(x, y, 'enemy');
        enemy.setBounce(0);
        enemy.setCollideWorldBounds(true);
    }
    
    /**
     * Called when a bullet hits an enemy
     */
    bulletHitEnemy(bullet, enemy) {
        // Deactivate the bullet
        bullet.setActive(false);
        bullet.setVisible(false);
        
        // Destroy the enemy
        enemy.destroy();
        
        // Update the counter
        this.updateEnemyCount();
        
        // Check for level complete
        if (this.enemies.countActive() === 0) {
            this.levelComplete();
        }
    }
    
    /**
     * Update the enemy count display
     */
    updateEnemyCount() {
        const count = this.enemies.countActive();
        this.enemyCountText.setText(`Enemies remaining: ${count}`);
    }
    
    /**
     * Called when all enemies are defeated
     */
    levelComplete() {
        this.levelInProgress = false;
        this.levelCompleteText.setVisible(true);
        this.clickToContinueText.setVisible(true);
    }
    
    /**
     * Start the next level - cycle through layouts and spawn enemies
     */
    startNextLevel() {
        this.currentLevel++;
        this.levelText.setText(`Level: ${this.currentLevel}`);
        
        // Hide completion messages
        this.levelCompleteText.setVisible(false);
        this.clickToContinueText.setVisible(false);
        
        // Clear any remaining bullets
        this.bullets.children.each((bullet) => {
            bullet.setActive(false);
            bullet.setVisible(false);
        });
        
        // Cycle to next layout (or random)
        this.currentLayoutIndex = (this.currentLayoutIndex + 1) % LEVEL_LAYOUTS.length;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex]);
        
        // Update layout label
        this.layoutText.setText(`Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`);
        
        // Re-add platform and wall collisions
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Spawn enemies at random positions
        // More enemies as levels progress (4 + 1 per 2 levels, max based on spawn points)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), this.spawnPoints.length - 1);
        
        // Filter out player start position from spawn points for enemies
        const enemySpawnPoints = this.spawnPoints.filter(
            p => !(Math.abs(p.x - this.playerStartX) < 10 && Math.abs(p.y - this.playerStartY) < 10)
        );
        
        // Shuffle and pick
        const shuffled = Phaser.Utils.Array.Shuffle([...enemySpawnPoints]);
        for (let i = 0; i < enemyCount && i < shuffled.length; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position - use body.reset for proper physics sync
        this.player.body.reset(this.playerStartX, this.playerStartY);
    }
    
    /**
     * Called when player touches water
     */
    playerDied() {
        // Prevent multiple triggers while respawning
        if (this.isRespawning) return;
        this.isRespawning = true;
        
        // Force physics body to fully reset at new position
        // This syncs sprite + physics body immediately to prevent desync
        this.player.body.reset(this.playerStartX, this.playerStartY);
        
        // Brief visual feedback - flash the player
        this.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            this.player.clearTint();
        });
        
        // Clear respawn flag after player has time to land
        this.time.delayedCall(500, () => {
            this.isRespawning = false;
        });
    }

    update() {
        // This runs every frame - handle player movement here
        
        // Check debug controls (R/G/F/H keys)
        const debugAction = this.debugControls.update(this.player, this.currentLayoutIndex, LEVEL_LAYOUTS.length);
        if (debugAction) {
            if (debugAction.action === 'restart') {
                this.scene.restart({ layoutIndex: debugAction.layoutIndex });
                return;
            }
            // flyToggled and hitboxToggled are handled internally by DebugControls
        }
        
        const speed = 120;  // Scaled down for smaller characters
        const flySpeed = 200;  // Speed when flying
        const jumpVelocity = -280;  // Scaled down - smaller jump for zoomed-out feel
        
        // Left/Right movement (arrows or WASD)
        const flyMode = this.debugControls.isFlyMode();
        const leftDown = this.cursors.left.isDown || this.wasd.left.isDown;
        const rightDown = this.cursors.right.isDown || this.wasd.right.isDown;
        const upDown = this.cursors.up.isDown || this.wasd.up.isDown;
        const downDown = this.cursors.down.isDown || this.wasd.down.isDown;
        
        if (leftDown) {
            this.player.setVelocityX(flyMode ? -flySpeed : -speed);
        } else if (rightDown) {
            this.player.setVelocityX(flyMode ? flySpeed : speed);
        } else {
            // No key pressed - stop horizontal movement
            this.player.setVelocityX(0);
        }
        
        // Up/Down movement (fly mode) or jumping (normal mode)
        if (flyMode) {
            // Fly mode: up/down moves vertically
            if (upDown) {
                this.player.setVelocityY(-flySpeed);
            } else if (downDown) {
                this.player.setVelocityY(flySpeed);
            } else {
                this.player.setVelocityY(0);
            }
        } else {
            // Normal mode: jumping when touching ground
            if (upDown && this.player.body.blocked.down) {
                this.player.setVelocityY(jumpVelocity);
            }
        }
        
        // Update crosshair position (orbits player at fixed distance)
        this.crosshair.x = this.player.x + Math.cos(this.aimAngle) * this.aimDistance;
        this.crosshair.y = this.player.y + Math.sin(this.aimAngle) * this.aimDistance;
        
        // Clean up bullets that have left the screen
        this.bullets.children.each((bullet) => {
            if (bullet.active && (bullet.x < -50 || bullet.x > 750 || bullet.y < -50 || bullet.y > 950)) {
                bullet.setActive(false);
                bullet.setVisible(false);
            }
        });
    }
    
    /**
     * Shoot a bullet toward a target position
     * @param {number} targetX - X coordinate to shoot toward
     * @param {number} targetY - Y coordinate to shoot toward
     */
    shoot(targetX, targetY) {
        // Get a bullet from the group (reuses inactive bullets)
        const bullet = this.bullets.get(this.player.x, this.player.y);
        
        if (!bullet) return;  // No bullets available
        
        bullet.setActive(true);
        bullet.setVisible(true);
        
        // Calculate direction to target
        const angle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            targetX, targetY
        );
        
        // Set bullet velocity toward target
        const bulletSpeed = 600;
        bullet.setVelocity(
            Math.cos(angle) * bulletSpeed,
            Math.sin(angle) * bulletSpeed
        );
        
        // Rotate bullet to face direction of travel
        bullet.setRotation(angle);
        
        // Bullets shouldn't be affected by gravity
        bullet.body.allowGravity = false;
    }
}


```

## Step 1 Complete! ✓

**What I added:**
- Crosshair texture: Two lines with a 4px gap in the center, ~17px size
- Semi-transparent (70% opacity)
- Orbits player at 85px distance (5 player heights)
- Currently points right (angle = 0) and follows player

**Test it now:**
1. Refresh http://localhost:8000
2. You should see a crosshair floating to the **right** of your character
3. It follows you as you move around

The crosshair doesn't rotate yet - that's **Step 2: Add J/K rotation**. Ready for that?

---

**User**

i was reviewing and clicked accept all a bunch and then on the last one clicked undo all

---

**Cursor**

Let me check what state the file is in now:

Good news - the crosshair code is all there! The changes were saved to the file. The "undo all" in Cursor's diff view doesn't undo already-saved file changes, it just affects the review UI.

Your file has:
- ✅ Crosshair texture creation (lines 98-133)
- ✅ Crosshair sprite setup (lines 136-138)
- ✅ Aim angle/distance variables (lines 140-141)
- ✅ Crosshair position update in loop (lines 538-540)

**Go ahead and test it** - refresh http://localhost:8000 and you should see the crosshair to the right of your player!

Ready for **Step 2: Add J/K rotation** when you confirm it's working?

---

**User**

was it maybe something older than that? potentially in @current-work-focus.md ?

---

**Cursor**

Ah yes! The context file got reverted to an older version. Let me check what else might have been affected and restore them:

Only `current-work-focus.md` got reverted. Let me restore it with the current state:

```markdown
# Current Work Focus

Refactoring complete. Now adding new features from the roadmap. Currently implementing keyboard-based aiming system.

- **Project Goal:** Build a browser-based stick figure arena shooter with depth in combat, enemies, and procedural levels

- **Intermediate Goal:** Improve controls and aiming system

- **Current Task:** Adding crosshair-based keyboard aiming (J/K to rotate aim)

## In Progress: Keyboard Aiming System

**Step 1** ✅ Create crosshair visual + position at fixed distance from player
**Step 2** ⏳ Add J/K rotation controls
**Step 3** Update shooting to use crosshair position

## Recently Completed

- ✅ ES6 module refactoring (PlayScene.js 780→515 lines)
- ✅ WASD movement controls (in addition to arrows)
- ✅ Crosshair visual (semi-transparent, orbits player at 85px)
- ✅ Bug fixes (compound shape cleanup, layout label)

## Tier 1 Priorities (See project-vision-and-goals.md)

1. Procedural level generator
2. Player health system
3. Enemy health + damage feedback
4. More weapon types

## Feature Categories

| Category | Current | In Progress |
|----------|---------|-------------|
| Movement | WASD + arrows | - |
| Aiming | Mouse click | Keyboard crosshair (J/K) |
| Weapons | Single laser | - |
| Enemies | Static targets | - |
| Levels | 6 layouts | - |

```

Fixed! Restored `current-work-focus.md` with current state.

The game code is fine - the crosshair is in there. Want to test it and then continue with **Step 2: Add J/K rotation**?

---

**User**

it follows the character. lets add the rotation

---

**Cursor**

```javascript
/**
 * PlayScene - Main gameplay scene
 * 
 * This is where the actual game happens. Phaser scenes have three main methods:
 * - preload(): Load assets (images, sounds, etc.)
 * - create(): Set up game objects, physics, input (runs once when scene starts)
 * - update(): Game loop, runs every frame (~60 times per second)
 */

import { DebugControls } from '../utils/DebugControls.js';
import { PLATFORM_SHAPES, LEVEL_LAYOUTS } from '../platforms/PlatformShapes.js';
import { drawWalls, drawWater } from '../drawing/EnvironmentRenderer.js';
import { generateAllShapeTextures } from '../drawing/ShapeRenderer.js';

export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        // Load the user-cropped notebook paper background (preserves scale)
        this.load.image('notebook-paper', 'assets/cropped-notebook-page.png');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using cropped image) ===
        // Paper is pre-cropped to edges, just scale to fit canvas
        const paper = this.add.image(350, 450, 'notebook-paper');
        paper.setDisplaySize(700, 900);
        
        
        // === WALLS (hand-drawn style with crayon fill) ===
        this.walls = drawWalls(this);
        
        // === WATER HAZARD (with crayon-like blue fill) ===
        this.waterZone = drawWater(this);
        
        
        // === PLATFORMS (using shape library) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Generate textures for all shapes in the library
        generateAllShapeTextures(this, PLATFORM_SHAPES);
        
        // Select level layout (use passed index or default to 0)
        this.currentLayoutIndex = (this.scene.settings.data && this.scene.settings.data.layoutIndex !== undefined) 
            ? this.scene.settings.data.layoutIndex 
            : 0;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex])
        
        
        // === PLAYER (hand-drawn stick figure - 0.75x original) ===
        if (!this.textures.exists('player')) {
            const playerGraphics = this.add.graphics();
            playerGraphics.lineStyle(1.5, 0x1a1a1a);  // Black pen
            
            // Simple stick figure: head, body, legs
            // Head (circle)
            playerGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 5.25);
            playerGraphics.lineTo(4.5, 10.5);
            playerGraphics.strokePath();
            // Arms (line across)
            playerGraphics.beginPath();
            playerGraphics.moveTo(1.5, 7.5);
            playerGraphics.lineTo(7.5, 7.5);
            playerGraphics.strokePath();
            // Legs (two lines)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(2.25, 15);
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(6.75, 15);
            playerGraphics.strokePath();
            
            playerGraphics.generateTexture('player', 9, 17);
            playerGraphics.destroy();
        }
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        
        // Player dies if they touch water!
        this.physics.add.overlap(this.player, this.waterZone, this.playerDied, null, this);
        
        
        // === CROSSHAIR (aim indicator) ===
        // Create crosshair texture - two lines with gap in middle
        if (!this.textures.exists('crosshair')) {
            const crosshairGraphics = this.add.graphics();
            const size = 17;  // About player height
            const gap = 4;    // Gap in center
            const halfSize = size / 2;
            const halfGap = gap / 2;
            
            crosshairGraphics.lineStyle(1.5, 0x1a1a1a, 0.6);  // Semi-transparent dark line
            
            // Horizontal line (left segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(0, halfSize);
            crosshairGraphics.lineTo(halfSize - halfGap, halfSize);
            crosshairGraphics.strokePath();
            
            // Horizontal line (right segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(halfSize + halfGap, halfSize);
            crosshairGraphics.lineTo(size, halfSize);
            crosshairGraphics.strokePath();
            
            // Vertical line (top segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(halfSize, 0);
            crosshairGraphics.lineTo(halfSize, halfSize - halfGap);
            crosshairGraphics.strokePath();
            
            // Vertical line (bottom segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(halfSize, halfSize + halfGap);
            crosshairGraphics.lineTo(halfSize, size);
            crosshairGraphics.strokePath();
            
            crosshairGraphics.generateTexture('crosshair', size, size);
            crosshairGraphics.destroy();
        }
        
        // Create crosshair sprite
        this.crosshair = this.add.image(0, 0, 'crosshair');
        this.crosshair.setAlpha(0.7);  // Semi-transparent
        
        // Aim state - angle in radians (0 = right, increases counterclockwise)
        this.aimAngle = 0;
        this.aimDistance = 85;  // 5 player heights (5 * 17)
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // WASD keys as alternative movement
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
        
        // J/K keys for aiming rotation
        this.aimKeys = {
            rotateLeft: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J),   // Counter-clockwise
            rotateRight: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)   // Clockwise
        };
        this.aimRotationSpeed = 3;  // Radians per second
        
        // Mouse input for shooting (and continuing after level complete)
        this.input.on('pointerdown', (pointer) => {
            if (this.levelInProgress) {
                this.shoot(pointer.x, pointer.y);
            } else {
                // Level is complete, click to start next level
                this.startNextLevel();
            }
        });
        
        
        // === BULLETS ===
        // === BULLET (hand-drawn dash) ===
        if (!this.textures.exists('bullet')) {
            const bulletGraphics = this.add.graphics();
            bulletGraphics.lineStyle(2, 0x1a1a1a);  // Black pen stroke
            bulletGraphics.beginPath();
            bulletGraphics.moveTo(0, 2);
            bulletGraphics.lineTo(8, 2);
            bulletGraphics.strokePath();
            bulletGraphics.generateTexture('bullet', 10, 4);
            bulletGraphics.destroy();
        }
        
        // Now create the group that uses the texture
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });
        
        
        // === ENEMIES ===
        // === ENEMY (hand-drawn stick figure in red - 0.75x original) ===
        if (!this.textures.exists('enemy')) {
            const enemyGraphics = this.add.graphics();
            enemyGraphics.lineStyle(1.5, 0xcc3333);  // Red pen
            
            // Same stick figure shape as player
            // Head (circle)
            enemyGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 5.25);
            enemyGraphics.lineTo(4.5, 10.5);
            enemyGraphics.strokePath();
            // Arms (line across)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(1.5, 7.5);
            enemyGraphics.lineTo(7.5, 7.5);
            enemyGraphics.strokePath();
            // Legs (two lines)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(2.25, 15);
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(6.75, 15);
            enemyGraphics.strokePath();
            
            enemyGraphics.generateTexture('enemy', 9, 17);
            enemyGraphics.destroy();
        }
        
        // Create enemies group
        this.enemies = this.physics.add.group();
        
        // Spawn initial enemies on platforms
        this.spawnEnemy(450, 600);   // Bottom right platform
        this.spawnEnemy(280, 460);   // Middle platform
        this.spawnEnemy(380, 390);   // Row 4
        this.spawnEnemy(380, 250);   // Top platform
        
        // Make enemies collide with platforms (so they sit on them)
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Bullets hit enemies!
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        
        
        // === UI TEXT ===
        // Show some instructions (smaller for notebook canvas)
        this.add.text(60, 16, 'WASD/Arrows: move | Click: shoot | R/G: restart/new | F: fly | H: hitbox', {
            fontSize: '9px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Debug controls (R/G/F/H keys)
        this.debugControls = new DebugControls(this);
        
        // Enemy counter (positioned for notebook canvas)
        this.enemyCountText = this.add.text(60, 32, '', {
            fontSize: '11px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        this.updateEnemyCount();
        
        // Level complete text (hidden initially) - centered for 700px canvas
        this.levelCompleteText = this.add.text(350, 400, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '28px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 18, y: 10 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(350, 460, 'Click to continue', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 5 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display
        this.levelText = this.add.text(610, 16, 'Level: 1', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 6, y: 3 }
        });
        
        // Layout number display (for debugging)
        this.layoutText = this.add.text(60, 48, `Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`, {
            fontSize: '11px',
            fill: '#666',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Spawn points will be generated from the layout
        this.spawnPoints = [];
        
        // Player start position (will be set by layout)
        this.playerStartX = 100;
        this.playerStartY = 600;
    }
    
    /**
     * Load a level layout from the library
     */
    loadLayout(layout) {
        // Clear existing platforms
        this.platforms.clear(true, true);
        
        // Clear compound shape visuals (they're not in the platforms group)
        if (this.compoundVisuals) {
            this.compoundVisuals.forEach(v => v.destroy());
        }
        this.compoundVisuals = [];
        
        // Clear spawn points
        this.spawnPoints = [];
        
        // Create platforms from layout
        for (const plat of layout.platforms) {
            const shapeData = PLATFORM_SHAPES[plat.shape];
            
            // Check if this is a compound shape (has separate collision parts)
            if (shapeData.parts) {
                // Compound shape: create visual-only sprite + separate collision bodies
                
                // Add visual sprite (no physics) - track it for cleanup
                const visual = this.add.image(plat.x, plat.y, plat.shape);
                this.compoundVisuals.push(visual);
                
                // Create collision bodies for each part
                for (const part of shapeData.parts) {
                    // Part coordinates are relative to shape origin (top-left)
                    // Convert to world position (plat.x, plat.y is center of shape)
                    const partX = plat.x - shapeData.width / 2 + part.x + part.w / 2;
                    const partY = plat.y - shapeData.height / 2 + part.y + part.h / 2;
                    
                    // Create invisible collision rectangle
                    const collider = this.add.rectangle(partX, partY, part.w, part.h, 0x000000, 0);
                    this.physics.add.existing(collider, true);  // true = static
                    this.platforms.add(collider);
                }
            } else {
                // Simple shape: single collision body (original behavior)
                const platform = this.platforms.create(plat.x, plat.y, plat.shape);
            }
            
            // Add this platform position as a spawn point
            // Spawn point is on top of the platform
            this.spawnPoints.push({
                x: plat.x,
                y: plat.y - shapeData.height / 2 - 15  // Above the platform
            });
        }
        
        // Set player start to first platform
        if (layout.platforms.length > 0) {
            const firstPlat = layout.platforms[0];
            const firstShape = PLATFORM_SHAPES[firstPlat.shape];
            this.playerStartX = firstPlat.x;
            this.playerStartY = firstPlat.y - firstShape.height / 2 - 15;
        }
    }
    
    /**
     * Spawn an enemy at a position
     */
    spawnEnemy(x, y) {
        const enemy = this.enemies.create(x, y, 'enemy');
        enemy.setBounce(0);
        enemy.setCollideWorldBounds(true);
    }
    
    /**
     * Called when a bullet hits an enemy
     */
    bulletHitEnemy(bullet, enemy) {
        // Deactivate the bullet
        bullet.setActive(false);
        bullet.setVisible(false);
        
        // Destroy the enemy
        enemy.destroy();
        
        // Update the counter
        this.updateEnemyCount();
        
        // Check for level complete
        if (this.enemies.countActive() === 0) {
            this.levelComplete();
        }
    }
    
    /**
     * Update the enemy count display
     */
    updateEnemyCount() {
        const count = this.enemies.countActive();
        this.enemyCountText.setText(`Enemies remaining: ${count}`);
    }
    
    /**
     * Called when all enemies are defeated
     */
    levelComplete() {
        this.levelInProgress = false;
        this.levelCompleteText.setVisible(true);
        this.clickToContinueText.setVisible(true);
    }
    
    /**
     * Start the next level - cycle through layouts and spawn enemies
     */
    startNextLevel() {
        this.currentLevel++;
        this.levelText.setText(`Level: ${this.currentLevel}`);
        
        // Hide completion messages
        this.levelCompleteText.setVisible(false);
        this.clickToContinueText.setVisible(false);
        
        // Clear any remaining bullets
        this.bullets.children.each((bullet) => {
            bullet.setActive(false);
            bullet.setVisible(false);
        });
        
        // Cycle to next layout (or random)
        this.currentLayoutIndex = (this.currentLayoutIndex + 1) % LEVEL_LAYOUTS.length;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex]);
        
        // Update layout label
        this.layoutText.setText(`Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`);
        
        // Re-add platform and wall collisions
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Spawn enemies at random positions
        // More enemies as levels progress (4 + 1 per 2 levels, max based on spawn points)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), this.spawnPoints.length - 1);
        
        // Filter out player start position from spawn points for enemies
        const enemySpawnPoints = this.spawnPoints.filter(
            p => !(Math.abs(p.x - this.playerStartX) < 10 && Math.abs(p.y - this.playerStartY) < 10)
        );
        
        // Shuffle and pick
        const shuffled = Phaser.Utils.Array.Shuffle([...enemySpawnPoints]);
        for (let i = 0; i < enemyCount && i < shuffled.length; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position - use body.reset for proper physics sync
        this.player.body.reset(this.playerStartX, this.playerStartY);
    }
    
    /**
     * Called when player touches water
     */
    playerDied() {
        // Prevent multiple triggers while respawning
        if (this.isRespawning) return;
        this.isRespawning = true;
        
        // Force physics body to fully reset at new position
        // This syncs sprite + physics body immediately to prevent desync
        this.player.body.reset(this.playerStartX, this.playerStartY);
        
        // Brief visual feedback - flash the player
        this.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            this.player.clearTint();
        });
        
        // Clear respawn flag after player has time to land
        this.time.delayedCall(500, () => {
            this.isRespawning = false;
        });
    }

    update() {
        // This runs every frame - handle player movement here
        
        // Check debug controls (R/G/F/H keys)
        const debugAction = this.debugControls.update(this.player, this.currentLayoutIndex, LEVEL_LAYOUTS.length);
        if (debugAction) {
            if (debugAction.action === 'restart') {
                this.scene.restart({ layoutIndex: debugAction.layoutIndex });
                return;
            }
            // flyToggled and hitboxToggled are handled internally by DebugControls
        }
        
        const speed = 120;  // Scaled down for smaller characters
        const flySpeed = 200;  // Speed when flying
        const jumpVelocity = -280;  // Scaled down - smaller jump for zoomed-out feel
        
        // Left/Right movement (arrows or WASD)
        const flyMode = this.debugControls.isFlyMode();
        const leftDown = this.cursors.left.isDown || this.wasd.left.isDown;
        const rightDown = this.cursors.right.isDown || this.wasd.right.isDown;
        const upDown = this.cursors.up.isDown || this.wasd.up.isDown;
        const downDown = this.cursors.down.isDown || this.wasd.down.isDown;
        
        if (leftDown) {
            this.player.setVelocityX(flyMode ? -flySpeed : -speed);
        } else if (rightDown) {
            this.player.setVelocityX(flyMode ? flySpeed : speed);
        } else {
            // No key pressed - stop horizontal movement
            this.player.setVelocityX(0);
        }
        
        // Up/Down movement (fly mode) or jumping (normal mode)
        if (flyMode) {
            // Fly mode: up/down moves vertically
            if (upDown) {
                this.player.setVelocityY(-flySpeed);
            } else if (downDown) {
                this.player.setVelocityY(flySpeed);
            } else {
                this.player.setVelocityY(0);
            }
        } else {
            // Normal mode: jumping when touching ground
            if (upDown && this.player.body.blocked.down) {
                this.player.setVelocityY(jumpVelocity);
            }
        }
        
        // Update crosshair position (orbits player at fixed distance)
        this.crosshair.x = this.player.x + Math.cos(this.aimAngle) * this.aimDistance;
        this.crosshair.y = this.player.y + Math.sin(this.aimAngle) * this.aimDistance;
        
        // Clean up bullets that have left the screen
        this.bullets.children.each((bullet) => {
            if (bullet.active && (bullet.x < -50 || bullet.x > 750 || bullet.y < -50 || bullet.y > 950)) {
                bullet.setActive(false);
                bullet.setVisible(false);
            }
        });
    }
    
    /**
     * Shoot a bullet toward a target position
     * @param {number} targetX - X coordinate to shoot toward
     * @param {number} targetY - Y coordinate to shoot toward
     */
    shoot(targetX, targetY) {
        // Get a bullet from the group (reuses inactive bullets)
        const bullet = this.bullets.get(this.player.x, this.player.y);
        
        if (!bullet) return;  // No bullets available
        
        bullet.setActive(true);
        bullet.setVisible(true);
        
        // Calculate direction to target
        const angle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            targetX, targetY
        );
        
        // Set bullet velocity toward target
        const bulletSpeed = 600;
        bullet.setVelocity(
            Math.cos(angle) * bulletSpeed,
            Math.sin(angle) * bulletSpeed
        );
        
        // Rotate bullet to face direction of travel
        bullet.setRotation(angle);
        
        // Bullets shouldn't be affected by gravity
        bullet.body.allowGravity = false;
    }
}


```

Now let me add the rotation logic in the update loop:

```javascript
/**
 * PlayScene - Main gameplay scene
 * 
 * This is where the actual game happens. Phaser scenes have three main methods:
 * - preload(): Load assets (images, sounds, etc.)
 * - create(): Set up game objects, physics, input (runs once when scene starts)
 * - update(): Game loop, runs every frame (~60 times per second)
 */

import { DebugControls } from '../utils/DebugControls.js';
import { PLATFORM_SHAPES, LEVEL_LAYOUTS } from '../platforms/PlatformShapes.js';
import { drawWalls, drawWater } from '../drawing/EnvironmentRenderer.js';
import { generateAllShapeTextures } from '../drawing/ShapeRenderer.js';

export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        // Load the user-cropped notebook paper background (preserves scale)
        this.load.image('notebook-paper', 'assets/cropped-notebook-page.png');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using cropped image) ===
        // Paper is pre-cropped to edges, just scale to fit canvas
        const paper = this.add.image(350, 450, 'notebook-paper');
        paper.setDisplaySize(700, 900);
        
        
        // === WALLS (hand-drawn style with crayon fill) ===
        this.walls = drawWalls(this);
        
        // === WATER HAZARD (with crayon-like blue fill) ===
        this.waterZone = drawWater(this);
        
        
        // === PLATFORMS (using shape library) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Generate textures for all shapes in the library
        generateAllShapeTextures(this, PLATFORM_SHAPES);
        
        // Select level layout (use passed index or default to 0)
        this.currentLayoutIndex = (this.scene.settings.data && this.scene.settings.data.layoutIndex !== undefined) 
            ? this.scene.settings.data.layoutIndex 
            : 0;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex])
        
        
        // === PLAYER (hand-drawn stick figure - 0.75x original) ===
        if (!this.textures.exists('player')) {
            const playerGraphics = this.add.graphics();
            playerGraphics.lineStyle(1.5, 0x1a1a1a);  // Black pen
            
            // Simple stick figure: head, body, legs
            // Head (circle)
            playerGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 5.25);
            playerGraphics.lineTo(4.5, 10.5);
            playerGraphics.strokePath();
            // Arms (line across)
            playerGraphics.beginPath();
            playerGraphics.moveTo(1.5, 7.5);
            playerGraphics.lineTo(7.5, 7.5);
            playerGraphics.strokePath();
            // Legs (two lines)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(2.25, 15);
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(6.75, 15);
            playerGraphics.strokePath();
            
            playerGraphics.generateTexture('player', 9, 17);
            playerGraphics.destroy();
        }
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        
        // Player dies if they touch water!
        this.physics.add.overlap(this.player, this.waterZone, this.playerDied, null, this);
        
        
        // === CROSSHAIR (aim indicator) ===
        // Create crosshair texture - two lines with gap in middle
        if (!this.textures.exists('crosshair')) {
            const crosshairGraphics = this.add.graphics();
            const size = 17;  // About player height
            const gap = 4;    // Gap in center
            const halfSize = size / 2;
            const halfGap = gap / 2;
            
            crosshairGraphics.lineStyle(1.5, 0x1a1a1a, 0.6);  // Semi-transparent dark line
            
            // Horizontal line (left segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(0, halfSize);
            crosshairGraphics.lineTo(halfSize - halfGap, halfSize);
            crosshairGraphics.strokePath();
            
            // Horizontal line (right segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(halfSize + halfGap, halfSize);
            crosshairGraphics.lineTo(size, halfSize);
            crosshairGraphics.strokePath();
            
            // Vertical line (top segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(halfSize, 0);
            crosshairGraphics.lineTo(halfSize, halfSize - halfGap);
            crosshairGraphics.strokePath();
            
            // Vertical line (bottom segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(halfSize, halfSize + halfGap);
            crosshairGraphics.lineTo(halfSize, size);
            crosshairGraphics.strokePath();
            
            crosshairGraphics.generateTexture('crosshair', size, size);
            crosshairGraphics.destroy();
        }
        
        // Create crosshair sprite
        this.crosshair = this.add.image(0, 0, 'crosshair');
        this.crosshair.setAlpha(0.7);  // Semi-transparent
        
        // Aim state - angle in radians (0 = right, increases counterclockwise)
        this.aimAngle = 0;
        this.aimDistance = 85;  // 5 player heights (5 * 17)
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // WASD keys as alternative movement
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
        
        // J/K keys for aiming rotation
        this.aimKeys = {
            rotateLeft: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J),   // Counter-clockwise
            rotateRight: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)   // Clockwise
        };
        this.aimRotationSpeed = 3;  // Radians per second
        
        // Mouse input for shooting (and continuing after level complete)
        this.input.on('pointerdown', (pointer) => {
            if (this.levelInProgress) {
                this.shoot(pointer.x, pointer.y);
            } else {
                // Level is complete, click to start next level
                this.startNextLevel();
            }
        });
        
        
        // === BULLETS ===
        // === BULLET (hand-drawn dash) ===
        if (!this.textures.exists('bullet')) {
            const bulletGraphics = this.add.graphics();
            bulletGraphics.lineStyle(2, 0x1a1a1a);  // Black pen stroke
            bulletGraphics.beginPath();
            bulletGraphics.moveTo(0, 2);
            bulletGraphics.lineTo(8, 2);
            bulletGraphics.strokePath();
            bulletGraphics.generateTexture('bullet', 10, 4);
            bulletGraphics.destroy();
        }
        
        // Now create the group that uses the texture
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });
        
        
        // === ENEMIES ===
        // === ENEMY (hand-drawn stick figure in red - 0.75x original) ===
        if (!this.textures.exists('enemy')) {
            const enemyGraphics = this.add.graphics();
            enemyGraphics.lineStyle(1.5, 0xcc3333);  // Red pen
            
            // Same stick figure shape as player
            // Head (circle)
            enemyGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 5.25);
            enemyGraphics.lineTo(4.5, 10.5);
            enemyGraphics.strokePath();
            // Arms (line across)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(1.5, 7.5);
            enemyGraphics.lineTo(7.5, 7.5);
            enemyGraphics.strokePath();
            // Legs (two lines)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(2.25, 15);
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(6.75, 15);
            enemyGraphics.strokePath();
            
            enemyGraphics.generateTexture('enemy', 9, 17);
            enemyGraphics.destroy();
        }
        
        // Create enemies group
        this.enemies = this.physics.add.group();
        
        // Spawn initial enemies on platforms
        this.spawnEnemy(450, 600);   // Bottom right platform
        this.spawnEnemy(280, 460);   // Middle platform
        this.spawnEnemy(380, 390);   // Row 4
        this.spawnEnemy(380, 250);   // Top platform
        
        // Make enemies collide with platforms (so they sit on them)
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Bullets hit enemies!
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        
        
        // === UI TEXT ===
        // Show some instructions (smaller for notebook canvas)
        this.add.text(60, 16, 'WASD/Arrows: move | Click: shoot | R/G: restart/new | F: fly | H: hitbox', {
            fontSize: '9px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Debug controls (R/G/F/H keys)
        this.debugControls = new DebugControls(this);
        
        // Enemy counter (positioned for notebook canvas)
        this.enemyCountText = this.add.text(60, 32, '', {
            fontSize: '11px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        this.updateEnemyCount();
        
        // Level complete text (hidden initially) - centered for 700px canvas
        this.levelCompleteText = this.add.text(350, 400, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '28px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 18, y: 10 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(350, 460, 'Click to continue', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 5 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display
        this.levelText = this.add.text(610, 16, 'Level: 1', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 6, y: 3 }
        });
        
        // Layout number display (for debugging)
        this.layoutText = this.add.text(60, 48, `Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`, {
            fontSize: '11px',
            fill: '#666',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Spawn points will be generated from the layout
        this.spawnPoints = [];
        
        // Player start position (will be set by layout)
        this.playerStartX = 100;
        this.playerStartY = 600;
    }
    
    /**
     * Load a level layout from the library
     */
    loadLayout(layout) {
        // Clear existing platforms
        this.platforms.clear(true, true);
        
        // Clear compound shape visuals (they're not in the platforms group)
        if (this.compoundVisuals) {
            this.compoundVisuals.forEach(v => v.destroy());
        }
        this.compoundVisuals = [];
        
        // Clear spawn points
        this.spawnPoints = [];
        
        // Create platforms from layout
        for (const plat of layout.platforms) {
            const shapeData = PLATFORM_SHAPES[plat.shape];
            
            // Check if this is a compound shape (has separate collision parts)
            if (shapeData.parts) {
                // Compound shape: create visual-only sprite + separate collision bodies
                
                // Add visual sprite (no physics) - track it for cleanup
                const visual = this.add.image(plat.x, plat.y, plat.shape);
                this.compoundVisuals.push(visual);
                
                // Create collision bodies for each part
                for (const part of shapeData.parts) {
                    // Part coordinates are relative to shape origin (top-left)
                    // Convert to world position (plat.x, plat.y is center of shape)
                    const partX = plat.x - shapeData.width / 2 + part.x + part.w / 2;
                    const partY = plat.y - shapeData.height / 2 + part.y + part.h / 2;
                    
                    // Create invisible collision rectangle
                    const collider = this.add.rectangle(partX, partY, part.w, part.h, 0x000000, 0);
                    this.physics.add.existing(collider, true);  // true = static
                    this.platforms.add(collider);
                }
            } else {
                // Simple shape: single collision body (original behavior)
                const platform = this.platforms.create(plat.x, plat.y, plat.shape);
            }
            
            // Add this platform position as a spawn point
            // Spawn point is on top of the platform
            this.spawnPoints.push({
                x: plat.x,
                y: plat.y - shapeData.height / 2 - 15  // Above the platform
            });
        }
        
        // Set player start to first platform
        if (layout.platforms.length > 0) {
            const firstPlat = layout.platforms[0];
            const firstShape = PLATFORM_SHAPES[firstPlat.shape];
            this.playerStartX = firstPlat.x;
            this.playerStartY = firstPlat.y - firstShape.height / 2 - 15;
        }
    }
    
    /**
     * Spawn an enemy at a position
     */
    spawnEnemy(x, y) {
        const enemy = this.enemies.create(x, y, 'enemy');
        enemy.setBounce(0);
        enemy.setCollideWorldBounds(true);
    }
    
    /**
     * Called when a bullet hits an enemy
     */
    bulletHitEnemy(bullet, enemy) {
        // Deactivate the bullet
        bullet.setActive(false);
        bullet.setVisible(false);
        
        // Destroy the enemy
        enemy.destroy();
        
        // Update the counter
        this.updateEnemyCount();
        
        // Check for level complete
        if (this.enemies.countActive() === 0) {
            this.levelComplete();
        }
    }
    
    /**
     * Update the enemy count display
     */
    updateEnemyCount() {
        const count = this.enemies.countActive();
        this.enemyCountText.setText(`Enemies remaining: ${count}`);
    }
    
    /**
     * Called when all enemies are defeated
     */
    levelComplete() {
        this.levelInProgress = false;
        this.levelCompleteText.setVisible(true);
        this.clickToContinueText.setVisible(true);
    }
    
    /**
     * Start the next level - cycle through layouts and spawn enemies
     */
    startNextLevel() {
        this.currentLevel++;
        this.levelText.setText(`Level: ${this.currentLevel}`);
        
        // Hide completion messages
        this.levelCompleteText.setVisible(false);
        this.clickToContinueText.setVisible(false);
        
        // Clear any remaining bullets
        this.bullets.children.each((bullet) => {
            bullet.setActive(false);
            bullet.setVisible(false);
        });
        
        // Cycle to next layout (or random)
        this.currentLayoutIndex = (this.currentLayoutIndex + 1) % LEVEL_LAYOUTS.length;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex]);
        
        // Update layout label
        this.layoutText.setText(`Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`);
        
        // Re-add platform and wall collisions
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Spawn enemies at random positions
        // More enemies as levels progress (4 + 1 per 2 levels, max based on spawn points)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), this.spawnPoints.length - 1);
        
        // Filter out player start position from spawn points for enemies
        const enemySpawnPoints = this.spawnPoints.filter(
            p => !(Math.abs(p.x - this.playerStartX) < 10 && Math.abs(p.y - this.playerStartY) < 10)
        );
        
        // Shuffle and pick
        const shuffled = Phaser.Utils.Array.Shuffle([...enemySpawnPoints]);
        for (let i = 0; i < enemyCount && i < shuffled.length; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position - use body.reset for proper physics sync
        this.player.body.reset(this.playerStartX, this.playerStartY);
    }
    
    /**
     * Called when player touches water
     */
    playerDied() {
        // Prevent multiple triggers while respawning
        if (this.isRespawning) return;
        this.isRespawning = true;
        
        // Force physics body to fully reset at new position
        // This syncs sprite + physics body immediately to prevent desync
        this.player.body.reset(this.playerStartX, this.playerStartY);
        
        // Brief visual feedback - flash the player
        this.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            this.player.clearTint();
        });
        
        // Clear respawn flag after player has time to land
        this.time.delayedCall(500, () => {
            this.isRespawning = false;
        });
    }

    update() {
        // This runs every frame - handle player movement here
        
        // Check debug controls (R/G/F/H keys)
        const debugAction = this.debugControls.update(this.player, this.currentLayoutIndex, LEVEL_LAYOUTS.length);
        if (debugAction) {
            if (debugAction.action === 'restart') {
                this.scene.restart({ layoutIndex: debugAction.layoutIndex });
                return;
            }
            // flyToggled and hitboxToggled are handled internally by DebugControls
        }
        
        const speed = 120;  // Scaled down for smaller characters
        const flySpeed = 200;  // Speed when flying
        const jumpVelocity = -280;  // Scaled down - smaller jump for zoomed-out feel
        
        // Left/Right movement (arrows or WASD)
        const flyMode = this.debugControls.isFlyMode();
        const leftDown = this.cursors.left.isDown || this.wasd.left.isDown;
        const rightDown = this.cursors.right.isDown || this.wasd.right.isDown;
        const upDown = this.cursors.up.isDown || this.wasd.up.isDown;
        const downDown = this.cursors.down.isDown || this.wasd.down.isDown;
        
        if (leftDown) {
            this.player.setVelocityX(flyMode ? -flySpeed : -speed);
        } else if (rightDown) {
            this.player.setVelocityX(flyMode ? flySpeed : speed);
        } else {
            // No key pressed - stop horizontal movement
            this.player.setVelocityX(0);
        }
        
        // Up/Down movement (fly mode) or jumping (normal mode)
        if (flyMode) {
            // Fly mode: up/down moves vertically
            if (upDown) {
                this.player.setVelocityY(-flySpeed);
            } else if (downDown) {
                this.player.setVelocityY(flySpeed);
            } else {
                this.player.setVelocityY(0);
            }
        } else {
            // Normal mode: jumping when touching ground
            if (upDown && this.player.body.blocked.down) {
                this.player.setVelocityY(jumpVelocity);
            }
        }
        
        // Rotate aim with J/K keys
        const deltaTime = this.game.loop.delta / 1000;  // Convert ms to seconds
        if (this.aimKeys.rotateLeft.isDown) {
            this.aimAngle -= this.aimRotationSpeed * deltaTime;
        }
        if (this.aimKeys.rotateRight.isDown) {
            this.aimAngle += this.aimRotationSpeed * deltaTime;
        }
        
        // Update crosshair position (orbits player at fixed distance)
        this.crosshair.x = this.player.x + Math.cos(this.aimAngle) * this.aimDistance;
        this.crosshair.y = this.player.y + Math.sin(this.aimAngle) * this.aimDistance;
        
        // Clean up bullets that have left the screen
        this.bullets.children.each((bullet) => {
            if (bullet.active && (bullet.x < -50 || bullet.x > 750 || bullet.y < -50 || bullet.y > 950)) {
                bullet.setActive(false);
                bullet.setVisible(false);
            }
        });
    }
    
    /**
     * Shoot a bullet toward a target position
     * @param {number} targetX - X coordinate to shoot toward
     * @param {number} targetY - Y coordinate to shoot toward
     */
    shoot(targetX, targetY) {
        // Get a bullet from the group (reuses inactive bullets)
        const bullet = this.bullets.get(this.player.x, this.player.y);
        
        if (!bullet) return;  // No bullets available
        
        bullet.setActive(true);
        bullet.setVisible(true);
        
        // Calculate direction to target
        const angle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            targetX, targetY
        );
        
        // Set bullet velocity toward target
        const bulletSpeed = 600;
        bullet.setVelocity(
            Math.cos(angle) * bulletSpeed,
            Math.sin(angle) * bulletSpeed
        );
        
        // Rotate bullet to face direction of travel
        bullet.setRotation(angle);
        
        // Bullets shouldn't be affected by gravity
        bullet.body.allowGravity = false;
    }
}


```

## Step 2 Complete! ✓

**Added:**
- **J key** - Rotate aim counter-clockwise
- **K key** - Rotate aim clockwise
- Rotation speed: 3 radians/second (~170°/sec) - smooth but responsive

**Test it:**
1. Refresh http://localhost:8000
2. Hold **J** to rotate the crosshair counter-clockwise
3. Hold **K** to rotate clockwise
4. The crosshair orbits around your character at fixed distance

Ready for **Step 3: Update shooting to fire toward crosshair** instead of mouse?

---

**User**

yes it works. i think we could half speed and then add the shooting update

---

**Cursor**

```javascript
/**
 * PlayScene - Main gameplay scene
 * 
 * This is where the actual game happens. Phaser scenes have three main methods:
 * - preload(): Load assets (images, sounds, etc.)
 * - create(): Set up game objects, physics, input (runs once when scene starts)
 * - update(): Game loop, runs every frame (~60 times per second)
 */

import { DebugControls } from '../utils/DebugControls.js';
import { PLATFORM_SHAPES, LEVEL_LAYOUTS } from '../platforms/PlatformShapes.js';
import { drawWalls, drawWater } from '../drawing/EnvironmentRenderer.js';
import { generateAllShapeTextures } from '../drawing/ShapeRenderer.js';

export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        // Load the user-cropped notebook paper background (preserves scale)
        this.load.image('notebook-paper', 'assets/cropped-notebook-page.png');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using cropped image) ===
        // Paper is pre-cropped to edges, just scale to fit canvas
        const paper = this.add.image(350, 450, 'notebook-paper');
        paper.setDisplaySize(700, 900);
        
        
        // === WALLS (hand-drawn style with crayon fill) ===
        this.walls = drawWalls(this);
        
        // === WATER HAZARD (with crayon-like blue fill) ===
        this.waterZone = drawWater(this);
        
        
        // === PLATFORMS (using shape library) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Generate textures for all shapes in the library
        generateAllShapeTextures(this, PLATFORM_SHAPES);
        
        // Select level layout (use passed index or default to 0)
        this.currentLayoutIndex = (this.scene.settings.data && this.scene.settings.data.layoutIndex !== undefined) 
            ? this.scene.settings.data.layoutIndex 
            : 0;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex])
        
        
        // === PLAYER (hand-drawn stick figure - 0.75x original) ===
        if (!this.textures.exists('player')) {
            const playerGraphics = this.add.graphics();
            playerGraphics.lineStyle(1.5, 0x1a1a1a);  // Black pen
            
            // Simple stick figure: head, body, legs
            // Head (circle)
            playerGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 5.25);
            playerGraphics.lineTo(4.5, 10.5);
            playerGraphics.strokePath();
            // Arms (line across)
            playerGraphics.beginPath();
            playerGraphics.moveTo(1.5, 7.5);
            playerGraphics.lineTo(7.5, 7.5);
            playerGraphics.strokePath();
            // Legs (two lines)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(2.25, 15);
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(6.75, 15);
            playerGraphics.strokePath();
            
            playerGraphics.generateTexture('player', 9, 17);
            playerGraphics.destroy();
        }
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        
        // Player dies if they touch water!
        this.physics.add.overlap(this.player, this.waterZone, this.playerDied, null, this);
        
        
        // === CROSSHAIR (aim indicator) ===
        // Create crosshair texture - two lines with gap in middle
        if (!this.textures.exists('crosshair')) {
            const crosshairGraphics = this.add.graphics();
            const size = 17;  // About player height
            const gap = 4;    // Gap in center
            const halfSize = size / 2;
            const halfGap = gap / 2;
            
            crosshairGraphics.lineStyle(1.5, 0x1a1a1a, 0.6);  // Semi-transparent dark line
            
            // Horizontal line (left segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(0, halfSize);
            crosshairGraphics.lineTo(halfSize - halfGap, halfSize);
            crosshairGraphics.strokePath();
            
            // Horizontal line (right segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(halfSize + halfGap, halfSize);
            crosshairGraphics.lineTo(size, halfSize);
            crosshairGraphics.strokePath();
            
            // Vertical line (top segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(halfSize, 0);
            crosshairGraphics.lineTo(halfSize, halfSize - halfGap);
            crosshairGraphics.strokePath();
            
            // Vertical line (bottom segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(halfSize, halfSize + halfGap);
            crosshairGraphics.lineTo(halfSize, size);
            crosshairGraphics.strokePath();
            
            crosshairGraphics.generateTexture('crosshair', size, size);
            crosshairGraphics.destroy();
        }
        
        // Create crosshair sprite
        this.crosshair = this.add.image(0, 0, 'crosshair');
        this.crosshair.setAlpha(0.7);  // Semi-transparent
        
        // Aim state - angle in radians (0 = right, increases counterclockwise)
        this.aimAngle = 0;
        this.aimDistance = 85;  // 5 player heights (5 * 17)
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // WASD keys as alternative movement
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
        
        // J/K keys for aiming rotation
        this.aimKeys = {
            rotateLeft: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J),   // Counter-clockwise
            rotateRight: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)   // Clockwise
        };
        this.aimRotationSpeed = 1.5;  // Radians per second
        
        // Mouse input for shooting (and continuing after level complete)
        this.input.on('pointerdown', (pointer) => {
            if (this.levelInProgress) {
                this.shoot(pointer.x, pointer.y);
            } else {
                // Level is complete, click to start next level
                this.startNextLevel();
            }
        });
        
        
        // === BULLETS ===
        // === BULLET (hand-drawn dash) ===
        if (!this.textures.exists('bullet')) {
            const bulletGraphics = this.add.graphics();
            bulletGraphics.lineStyle(2, 0x1a1a1a);  // Black pen stroke
            bulletGraphics.beginPath();
            bulletGraphics.moveTo(0, 2);
            bulletGraphics.lineTo(8, 2);
            bulletGraphics.strokePath();
            bulletGraphics.generateTexture('bullet', 10, 4);
            bulletGraphics.destroy();
        }
        
        // Now create the group that uses the texture
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });
        
        
        // === ENEMIES ===
        // === ENEMY (hand-drawn stick figure in red - 0.75x original) ===
        if (!this.textures.exists('enemy')) {
            const enemyGraphics = this.add.graphics();
            enemyGraphics.lineStyle(1.5, 0xcc3333);  // Red pen
            
            // Same stick figure shape as player
            // Head (circle)
            enemyGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 5.25);
            enemyGraphics.lineTo(4.5, 10.5);
            enemyGraphics.strokePath();
            // Arms (line across)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(1.5, 7.5);
            enemyGraphics.lineTo(7.5, 7.5);
            enemyGraphics.strokePath();
            // Legs (two lines)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(2.25, 15);
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(6.75, 15);
            enemyGraphics.strokePath();
            
            enemyGraphics.generateTexture('enemy', 9, 17);
            enemyGraphics.destroy();
        }
        
        // Create enemies group
        this.enemies = this.physics.add.group();
        
        // Spawn initial enemies on platforms
        this.spawnEnemy(450, 600);   // Bottom right platform
        this.spawnEnemy(280, 460);   // Middle platform
        this.spawnEnemy(380, 390);   // Row 4
        this.spawnEnemy(380, 250);   // Top platform
        
        // Make enemies collide with platforms (so they sit on them)
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Bullets hit enemies!
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        
        
        // === UI TEXT ===
        // Show some instructions (smaller for notebook canvas)
        this.add.text(60, 16, 'WASD/Arrows: move | Click: shoot | R/G: restart/new | F: fly | H: hitbox', {
            fontSize: '9px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Debug controls (R/G/F/H keys)
        this.debugControls = new DebugControls(this);
        
        // Enemy counter (positioned for notebook canvas)
        this.enemyCountText = this.add.text(60, 32, '', {
            fontSize: '11px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        this.updateEnemyCount();
        
        // Level complete text (hidden initially) - centered for 700px canvas
        this.levelCompleteText = this.add.text(350, 400, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '28px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 18, y: 10 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(350, 460, 'Click to continue', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 5 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display
        this.levelText = this.add.text(610, 16, 'Level: 1', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 6, y: 3 }
        });
        
        // Layout number display (for debugging)
        this.layoutText = this.add.text(60, 48, `Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`, {
            fontSize: '11px',
            fill: '#666',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Spawn points will be generated from the layout
        this.spawnPoints = [];
        
        // Player start position (will be set by layout)
        this.playerStartX = 100;
        this.playerStartY = 600;
    }
    
    /**
     * Load a level layout from the library
     */
    loadLayout(layout) {
        // Clear existing platforms
        this.platforms.clear(true, true);
        
        // Clear compound shape visuals (they're not in the platforms group)
        if (this.compoundVisuals) {
            this.compoundVisuals.forEach(v => v.destroy());
        }
        this.compoundVisuals = [];
        
        // Clear spawn points
        this.spawnPoints = [];
        
        // Create platforms from layout
        for (const plat of layout.platforms) {
            const shapeData = PLATFORM_SHAPES[plat.shape];
            
            // Check if this is a compound shape (has separate collision parts)
            if (shapeData.parts) {
                // Compound shape: create visual-only sprite + separate collision bodies
                
                // Add visual sprite (no physics) - track it for cleanup
                const visual = this.add.image(plat.x, plat.y, plat.shape);
                this.compoundVisuals.push(visual);
                
                // Create collision bodies for each part
                for (const part of shapeData.parts) {
                    // Part coordinates are relative to shape origin (top-left)
                    // Convert to world position (plat.x, plat.y is center of shape)
                    const partX = plat.x - shapeData.width / 2 + part.x + part.w / 2;
                    const partY = plat.y - shapeData.height / 2 + part.y + part.h / 2;
                    
                    // Create invisible collision rectangle
                    const collider = this.add.rectangle(partX, partY, part.w, part.h, 0x000000, 0);
                    this.physics.add.existing(collider, true);  // true = static
                    this.platforms.add(collider);
                }
            } else {
                // Simple shape: single collision body (original behavior)
                const platform = this.platforms.create(plat.x, plat.y, plat.shape);
            }
            
            // Add this platform position as a spawn point
            // Spawn point is on top of the platform
            this.spawnPoints.push({
                x: plat.x,
                y: plat.y - shapeData.height / 2 - 15  // Above the platform
            });
        }
        
        // Set player start to first platform
        if (layout.platforms.length > 0) {
            const firstPlat = layout.platforms[0];
            const firstShape = PLATFORM_SHAPES[firstPlat.shape];
            this.playerStartX = firstPlat.x;
            this.playerStartY = firstPlat.y - firstShape.height / 2 - 15;
        }
    }
    
    /**
     * Spawn an enemy at a position
     */
    spawnEnemy(x, y) {
        const enemy = this.enemies.create(x, y, 'enemy');
        enemy.setBounce(0);
        enemy.setCollideWorldBounds(true);
    }
    
    /**
     * Called when a bullet hits an enemy
     */
    bulletHitEnemy(bullet, enemy) {
        // Deactivate the bullet
        bullet.setActive(false);
        bullet.setVisible(false);
        
        // Destroy the enemy
        enemy.destroy();
        
        // Update the counter
        this.updateEnemyCount();
        
        // Check for level complete
        if (this.enemies.countActive() === 0) {
            this.levelComplete();
        }
    }
    
    /**
     * Update the enemy count display
     */
    updateEnemyCount() {
        const count = this.enemies.countActive();
        this.enemyCountText.setText(`Enemies remaining: ${count}`);
    }
    
    /**
     * Called when all enemies are defeated
     */
    levelComplete() {
        this.levelInProgress = false;
        this.levelCompleteText.setVisible(true);
        this.clickToContinueText.setVisible(true);
    }
    
    /**
     * Start the next level - cycle through layouts and spawn enemies
     */
    startNextLevel() {
        this.currentLevel++;
        this.levelText.setText(`Level: ${this.currentLevel}`);
        
        // Hide completion messages
        this.levelCompleteText.setVisible(false);
        this.clickToContinueText.setVisible(false);
        
        // Clear any remaining bullets
        this.bullets.children.each((bullet) => {
            bullet.setActive(false);
            bullet.setVisible(false);
        });
        
        // Cycle to next layout (or random)
        this.currentLayoutIndex = (this.currentLayoutIndex + 1) % LEVEL_LAYOUTS.length;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex]);
        
        // Update layout label
        this.layoutText.setText(`Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`);
        
        // Re-add platform and wall collisions
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Spawn enemies at random positions
        // More enemies as levels progress (4 + 1 per 2 levels, max based on spawn points)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), this.spawnPoints.length - 1);
        
        // Filter out player start position from spawn points for enemies
        const enemySpawnPoints = this.spawnPoints.filter(
            p => !(Math.abs(p.x - this.playerStartX) < 10 && Math.abs(p.y - this.playerStartY) < 10)
        );
        
        // Shuffle and pick
        const shuffled = Phaser.Utils.Array.Shuffle([...enemySpawnPoints]);
        for (let i = 0; i < enemyCount && i < shuffled.length; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position - use body.reset for proper physics sync
        this.player.body.reset(this.playerStartX, this.playerStartY);
    }
    
    /**
     * Called when player touches water
     */
    playerDied() {
        // Prevent multiple triggers while respawning
        if (this.isRespawning) return;
        this.isRespawning = true;
        
        // Force physics body to fully reset at new position
        // This syncs sprite + physics body immediately to prevent desync
        this.player.body.reset(this.playerStartX, this.playerStartY);
        
        // Brief visual feedback - flash the player
        this.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            this.player.clearTint();
        });
        
        // Clear respawn flag after player has time to land
        this.time.delayedCall(500, () => {
            this.isRespawning = false;
        });
    }

    update() {
        // This runs every frame - handle player movement here
        
        // Check debug controls (R/G/F/H keys)
        const debugAction = this.debugControls.update(this.player, this.currentLayoutIndex, LEVEL_LAYOUTS.length);
        if (debugAction) {
            if (debugAction.action === 'restart') {
                this.scene.restart({ layoutIndex: debugAction.layoutIndex });
                return;
            }
            // flyToggled and hitboxToggled are handled internally by DebugControls
        }
        
        const speed = 120;  // Scaled down for smaller characters
        const flySpeed = 200;  // Speed when flying
        const jumpVelocity = -280;  // Scaled down - smaller jump for zoomed-out feel
        
        // Left/Right movement (arrows or WASD)
        const flyMode = this.debugControls.isFlyMode();
        const leftDown = this.cursors.left.isDown || this.wasd.left.isDown;
        const rightDown = this.cursors.right.isDown || this.wasd.right.isDown;
        const upDown = this.cursors.up.isDown || this.wasd.up.isDown;
        const downDown = this.cursors.down.isDown || this.wasd.down.isDown;
        
        if (leftDown) {
            this.player.setVelocityX(flyMode ? -flySpeed : -speed);
        } else if (rightDown) {
            this.player.setVelocityX(flyMode ? flySpeed : speed);
        } else {
            // No key pressed - stop horizontal movement
            this.player.setVelocityX(0);
        }
        
        // Up/Down movement (fly mode) or jumping (normal mode)
        if (flyMode) {
            // Fly mode: up/down moves vertically
            if (upDown) {
                this.player.setVelocityY(-flySpeed);
            } else if (downDown) {
                this.player.setVelocityY(flySpeed);
            } else {
                this.player.setVelocityY(0);
            }
        } else {
            // Normal mode: jumping when touching ground
            if (upDown && this.player.body.blocked.down) {
                this.player.setVelocityY(jumpVelocity);
            }
        }
        
        // Rotate aim with J/K keys
        const deltaTime = this.game.loop.delta / 1000;  // Convert ms to seconds
        if (this.aimKeys.rotateLeft.isDown) {
            this.aimAngle -= this.aimRotationSpeed * deltaTime;
        }
        if (this.aimKeys.rotateRight.isDown) {
            this.aimAngle += this.aimRotationSpeed * deltaTime;
        }
        
        // Update crosshair position (orbits player at fixed distance)
        this.crosshair.x = this.player.x + Math.cos(this.aimAngle) * this.aimDistance;
        this.crosshair.y = this.player.y + Math.sin(this.aimAngle) * this.aimDistance;
        
        // Clean up bullets that have left the screen
        this.bullets.children.each((bullet) => {
            if (bullet.active && (bullet.x < -50 || bullet.x > 750 || bullet.y < -50 || bullet.y > 950)) {
                bullet.setActive(false);
                bullet.setVisible(false);
            }
        });
    }
    
    /**
     * Shoot a bullet toward a target position
     * @param {number} targetX - X coordinate to shoot toward
     * @param {number} targetY - Y coordinate to shoot toward
     */
    shoot(targetX, targetY) {
        // Get a bullet from the group (reuses inactive bullets)
        const bullet = this.bullets.get(this.player.x, this.player.y);
        
        if (!bullet) return;  // No bullets available
        
        bullet.setActive(true);
        bullet.setVisible(true);
        
        // Calculate direction to target
        const angle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            targetX, targetY
        );
        
        // Set bullet velocity toward target
        const bulletSpeed = 600;
        bullet.setVelocity(
            Math.cos(angle) * bulletSpeed,
            Math.sin(angle) * bulletSpeed
        );
        
        // Rotate bullet to face direction of travel
        bullet.setRotation(angle);
        
        // Bullets shouldn't be affected by gravity
        bullet.body.allowGravity = false;
    }
}


```

Now let me update shooting to fire toward the crosshair:

```javascript
/**
 * PlayScene - Main gameplay scene
 * 
 * This is where the actual game happens. Phaser scenes have three main methods:
 * - preload(): Load assets (images, sounds, etc.)
 * - create(): Set up game objects, physics, input (runs once when scene starts)
 * - update(): Game loop, runs every frame (~60 times per second)
 */

import { DebugControls } from '../utils/DebugControls.js';
import { PLATFORM_SHAPES, LEVEL_LAYOUTS } from '../platforms/PlatformShapes.js';
import { drawWalls, drawWater } from '../drawing/EnvironmentRenderer.js';
import { generateAllShapeTextures } from '../drawing/ShapeRenderer.js';

export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        // Load the user-cropped notebook paper background (preserves scale)
        this.load.image('notebook-paper', 'assets/cropped-notebook-page.png');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using cropped image) ===
        // Paper is pre-cropped to edges, just scale to fit canvas
        const paper = this.add.image(350, 450, 'notebook-paper');
        paper.setDisplaySize(700, 900);
        
        
        // === WALLS (hand-drawn style with crayon fill) ===
        this.walls = drawWalls(this);
        
        // === WATER HAZARD (with crayon-like blue fill) ===
        this.waterZone = drawWater(this);
        
        
        // === PLATFORMS (using shape library) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Generate textures for all shapes in the library
        generateAllShapeTextures(this, PLATFORM_SHAPES);
        
        // Select level layout (use passed index or default to 0)
        this.currentLayoutIndex = (this.scene.settings.data && this.scene.settings.data.layoutIndex !== undefined) 
            ? this.scene.settings.data.layoutIndex 
            : 0;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex])
        
        
        // === PLAYER (hand-drawn stick figure - 0.75x original) ===
        if (!this.textures.exists('player')) {
            const playerGraphics = this.add.graphics();
            playerGraphics.lineStyle(1.5, 0x1a1a1a);  // Black pen
            
            // Simple stick figure: head, body, legs
            // Head (circle)
            playerGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 5.25);
            playerGraphics.lineTo(4.5, 10.5);
            playerGraphics.strokePath();
            // Arms (line across)
            playerGraphics.beginPath();
            playerGraphics.moveTo(1.5, 7.5);
            playerGraphics.lineTo(7.5, 7.5);
            playerGraphics.strokePath();
            // Legs (two lines)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(2.25, 15);
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(6.75, 15);
            playerGraphics.strokePath();
            
            playerGraphics.generateTexture('player', 9, 17);
            playerGraphics.destroy();
        }
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        
        // Player dies if they touch water!
        this.physics.add.overlap(this.player, this.waterZone, this.playerDied, null, this);
        
        
        // === CROSSHAIR (aim indicator) ===
        // Create crosshair texture - two lines with gap in middle
        if (!this.textures.exists('crosshair')) {
            const crosshairGraphics = this.add.graphics();
            const size = 17;  // About player height
            const gap = 4;    // Gap in center
            const halfSize = size / 2;
            const halfGap = gap / 2;
            
            crosshairGraphics.lineStyle(1.5, 0x1a1a1a, 0.6);  // Semi-transparent dark line
            
            // Horizontal line (left segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(0, halfSize);
            crosshairGraphics.lineTo(halfSize - halfGap, halfSize);
            crosshairGraphics.strokePath();
            
            // Horizontal line (right segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(halfSize + halfGap, halfSize);
            crosshairGraphics.lineTo(size, halfSize);
            crosshairGraphics.strokePath();
            
            // Vertical line (top segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(halfSize, 0);
            crosshairGraphics.lineTo(halfSize, halfSize - halfGap);
            crosshairGraphics.strokePath();
            
            // Vertical line (bottom segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(halfSize, halfSize + halfGap);
            crosshairGraphics.lineTo(halfSize, size);
            crosshairGraphics.strokePath();
            
            crosshairGraphics.generateTexture('crosshair', size, size);
            crosshairGraphics.destroy();
        }
        
        // Create crosshair sprite
        this.crosshair = this.add.image(0, 0, 'crosshair');
        this.crosshair.setAlpha(0.7);  // Semi-transparent
        
        // Aim state - angle in radians (0 = right, increases counterclockwise)
        this.aimAngle = 0;
        this.aimDistance = 85;  // 5 player heights (5 * 17)
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // WASD keys as alternative movement
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
        
        // J/K keys for aiming rotation
        this.aimKeys = {
            rotateLeft: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J),   // Counter-clockwise
            rotateRight: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)   // Clockwise
        };
        this.aimRotationSpeed = 1.5;  // Radians per second
        
        // Mouse click to shoot (or continue after level complete)
        this.input.on('pointerdown', (pointer) => {
            if (this.levelInProgress) {
                // Shoot toward crosshair position (not mouse)
                this.shoot(this.crosshair.x, this.crosshair.y);
            } else {
                // Level is complete, click to start next level
                this.startNextLevel();
            }
        });
        
        // Spacebar to shoot (keyboard alternative)
        this.shootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.canShoot = true;  // Prevent holding space for auto-fire
        
        
        // === BULLETS ===
        // === BULLET (hand-drawn dash) ===
        if (!this.textures.exists('bullet')) {
            const bulletGraphics = this.add.graphics();
            bulletGraphics.lineStyle(2, 0x1a1a1a);  // Black pen stroke
            bulletGraphics.beginPath();
            bulletGraphics.moveTo(0, 2);
            bulletGraphics.lineTo(8, 2);
            bulletGraphics.strokePath();
            bulletGraphics.generateTexture('bullet', 10, 4);
            bulletGraphics.destroy();
        }
        
        // Now create the group that uses the texture
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });
        
        
        // === ENEMIES ===
        // === ENEMY (hand-drawn stick figure in red - 0.75x original) ===
        if (!this.textures.exists('enemy')) {
            const enemyGraphics = this.add.graphics();
            enemyGraphics.lineStyle(1.5, 0xcc3333);  // Red pen
            
            // Same stick figure shape as player
            // Head (circle)
            enemyGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 5.25);
            enemyGraphics.lineTo(4.5, 10.5);
            enemyGraphics.strokePath();
            // Arms (line across)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(1.5, 7.5);
            enemyGraphics.lineTo(7.5, 7.5);
            enemyGraphics.strokePath();
            // Legs (two lines)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(2.25, 15);
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(6.75, 15);
            enemyGraphics.strokePath();
            
            enemyGraphics.generateTexture('enemy', 9, 17);
            enemyGraphics.destroy();
        }
        
        // Create enemies group
        this.enemies = this.physics.add.group();
        
        // Spawn initial enemies on platforms
        this.spawnEnemy(450, 600);   // Bottom right platform
        this.spawnEnemy(280, 460);   // Middle platform
        this.spawnEnemy(380, 390);   // Row 4
        this.spawnEnemy(380, 250);   // Top platform
        
        // Make enemies collide with platforms (so they sit on them)
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Bullets hit enemies!
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        
        
        // === UI TEXT ===
        // Show some instructions (smaller for notebook canvas)
        this.add.text(60, 16, 'WASD/Arrows: move | Click: shoot | R/G: restart/new | F: fly | H: hitbox', {
            fontSize: '9px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Debug controls (R/G/F/H keys)
        this.debugControls = new DebugControls(this);
        
        // Enemy counter (positioned for notebook canvas)
        this.enemyCountText = this.add.text(60, 32, '', {
            fontSize: '11px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        this.updateEnemyCount();
        
        // Level complete text (hidden initially) - centered for 700px canvas
        this.levelCompleteText = this.add.text(350, 400, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '28px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 18, y: 10 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(350, 460, 'Click to continue', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 5 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display
        this.levelText = this.add.text(610, 16, 'Level: 1', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 6, y: 3 }
        });
        
        // Layout number display (for debugging)
        this.layoutText = this.add.text(60, 48, `Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`, {
            fontSize: '11px',
            fill: '#666',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Spawn points will be generated from the layout
        this.spawnPoints = [];
        
        // Player start position (will be set by layout)
        this.playerStartX = 100;
        this.playerStartY = 600;
    }
    
    /**
     * Load a level layout from the library
     */
    loadLayout(layout) {
        // Clear existing platforms
        this.platforms.clear(true, true);
        
        // Clear compound shape visuals (they're not in the platforms group)
        if (this.compoundVisuals) {
            this.compoundVisuals.forEach(v => v.destroy());
        }
        this.compoundVisuals = [];
        
        // Clear spawn points
        this.spawnPoints = [];
        
        // Create platforms from layout
        for (const plat of layout.platforms) {
            const shapeData = PLATFORM_SHAPES[plat.shape];
            
            // Check if this is a compound shape (has separate collision parts)
            if (shapeData.parts) {
                // Compound shape: create visual-only sprite + separate collision bodies
                
                // Add visual sprite (no physics) - track it for cleanup
                const visual = this.add.image(plat.x, plat.y, plat.shape);
                this.compoundVisuals.push(visual);
                
                // Create collision bodies for each part
                for (const part of shapeData.parts) {
                    // Part coordinates are relative to shape origin (top-left)
                    // Convert to world position (plat.x, plat.y is center of shape)
                    const partX = plat.x - shapeData.width / 2 + part.x + part.w / 2;
                    const partY = plat.y - shapeData.height / 2 + part.y + part.h / 2;
                    
                    // Create invisible collision rectangle
                    const collider = this.add.rectangle(partX, partY, part.w, part.h, 0x000000, 0);
                    this.physics.add.existing(collider, true);  // true = static
                    this.platforms.add(collider);
                }
            } else {
                // Simple shape: single collision body (original behavior)
                const platform = this.platforms.create(plat.x, plat.y, plat.shape);
            }
            
            // Add this platform position as a spawn point
            // Spawn point is on top of the platform
            this.spawnPoints.push({
                x: plat.x,
                y: plat.y - shapeData.height / 2 - 15  // Above the platform
            });
        }
        
        // Set player start to first platform
        if (layout.platforms.length > 0) {
            const firstPlat = layout.platforms[0];
            const firstShape = PLATFORM_SHAPES[firstPlat.shape];
            this.playerStartX = firstPlat.x;
            this.playerStartY = firstPlat.y - firstShape.height / 2 - 15;
        }
    }
    
    /**
     * Spawn an enemy at a position
     */
    spawnEnemy(x, y) {
        const enemy = this.enemies.create(x, y, 'enemy');
        enemy.setBounce(0);
        enemy.setCollideWorldBounds(true);
    }
    
    /**
     * Called when a bullet hits an enemy
     */
    bulletHitEnemy(bullet, enemy) {
        // Deactivate the bullet
        bullet.setActive(false);
        bullet.setVisible(false);
        
        // Destroy the enemy
        enemy.destroy();
        
        // Update the counter
        this.updateEnemyCount();
        
        // Check for level complete
        if (this.enemies.countActive() === 0) {
            this.levelComplete();
        }
    }
    
    /**
     * Update the enemy count display
     */
    updateEnemyCount() {
        const count = this.enemies.countActive();
        this.enemyCountText.setText(`Enemies remaining: ${count}`);
    }
    
    /**
     * Called when all enemies are defeated
     */
    levelComplete() {
        this.levelInProgress = false;
        this.levelCompleteText.setVisible(true);
        this.clickToContinueText.setVisible(true);
    }
    
    /**
     * Start the next level - cycle through layouts and spawn enemies
     */
    startNextLevel() {
        this.currentLevel++;
        this.levelText.setText(`Level: ${this.currentLevel}`);
        
        // Hide completion messages
        this.levelCompleteText.setVisible(false);
        this.clickToContinueText.setVisible(false);
        
        // Clear any remaining bullets
        this.bullets.children.each((bullet) => {
            bullet.setActive(false);
            bullet.setVisible(false);
        });
        
        // Cycle to next layout (or random)
        this.currentLayoutIndex = (this.currentLayoutIndex + 1) % LEVEL_LAYOUTS.length;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex]);
        
        // Update layout label
        this.layoutText.setText(`Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`);
        
        // Re-add platform and wall collisions
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Spawn enemies at random positions
        // More enemies as levels progress (4 + 1 per 2 levels, max based on spawn points)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), this.spawnPoints.length - 1);
        
        // Filter out player start position from spawn points for enemies
        const enemySpawnPoints = this.spawnPoints.filter(
            p => !(Math.abs(p.x - this.playerStartX) < 10 && Math.abs(p.y - this.playerStartY) < 10)
        );
        
        // Shuffle and pick
        const shuffled = Phaser.Utils.Array.Shuffle([...enemySpawnPoints]);
        for (let i = 0; i < enemyCount && i < shuffled.length; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position - use body.reset for proper physics sync
        this.player.body.reset(this.playerStartX, this.playerStartY);
    }
    
    /**
     * Called when player touches water
     */
    playerDied() {
        // Prevent multiple triggers while respawning
        if (this.isRespawning) return;
        this.isRespawning = true;
        
        // Force physics body to fully reset at new position
        // This syncs sprite + physics body immediately to prevent desync
        this.player.body.reset(this.playerStartX, this.playerStartY);
        
        // Brief visual feedback - flash the player
        this.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            this.player.clearTint();
        });
        
        // Clear respawn flag after player has time to land
        this.time.delayedCall(500, () => {
            this.isRespawning = false;
        });
    }

    update() {
        // This runs every frame - handle player movement here
        
        // Check debug controls (R/G/F/H keys)
        const debugAction = this.debugControls.update(this.player, this.currentLayoutIndex, LEVEL_LAYOUTS.length);
        if (debugAction) {
            if (debugAction.action === 'restart') {
                this.scene.restart({ layoutIndex: debugAction.layoutIndex });
                return;
            }
            // flyToggled and hitboxToggled are handled internally by DebugControls
        }
        
        const speed = 120;  // Scaled down for smaller characters
        const flySpeed = 200;  // Speed when flying
        const jumpVelocity = -280;  // Scaled down - smaller jump for zoomed-out feel
        
        // Left/Right movement (arrows or WASD)
        const flyMode = this.debugControls.isFlyMode();
        const leftDown = this.cursors.left.isDown || this.wasd.left.isDown;
        const rightDown = this.cursors.right.isDown || this.wasd.right.isDown;
        const upDown = this.cursors.up.isDown || this.wasd.up.isDown;
        const downDown = this.cursors.down.isDown || this.wasd.down.isDown;
        
        if (leftDown) {
            this.player.setVelocityX(flyMode ? -flySpeed : -speed);
        } else if (rightDown) {
            this.player.setVelocityX(flyMode ? flySpeed : speed);
        } else {
            // No key pressed - stop horizontal movement
            this.player.setVelocityX(0);
        }
        
        // Up/Down movement (fly mode) or jumping (normal mode)
        if (flyMode) {
            // Fly mode: up/down moves vertically
            if (upDown) {
                this.player.setVelocityY(-flySpeed);
            } else if (downDown) {
                this.player.setVelocityY(flySpeed);
            } else {
                this.player.setVelocityY(0);
            }
        } else {
            // Normal mode: jumping when touching ground
            if (upDown && this.player.body.blocked.down) {
                this.player.setVelocityY(jumpVelocity);
            }
        }
        
        // Rotate aim with J/K keys
        const deltaTime = this.game.loop.delta / 1000;  // Convert ms to seconds
        if (this.aimKeys.rotateLeft.isDown) {
            this.aimAngle -= this.aimRotationSpeed * deltaTime;
        }
        if (this.aimKeys.rotateRight.isDown) {
            this.aimAngle += this.aimRotationSpeed * deltaTime;
        }
        
        // Update crosshair position (orbits player at fixed distance)
        this.crosshair.x = this.player.x + Math.cos(this.aimAngle) * this.aimDistance;
        this.crosshair.y = this.player.y + Math.sin(this.aimAngle) * this.aimDistance;
        
        // Clean up bullets that have left the screen
        this.bullets.children.each((bullet) => {
            if (bullet.active && (bullet.x < -50 || bullet.x > 750 || bullet.y < -50 || bullet.y > 950)) {
                bullet.setActive(false);
                bullet.setVisible(false);
            }
        });
    }
    
    /**
     * Shoot a bullet toward a target position
     * @param {number} targetX - X coordinate to shoot toward
     * @param {number} targetY - Y coordinate to shoot toward
     */
    shoot(targetX, targetY) {
        // Get a bullet from the group (reuses inactive bullets)
        const bullet = this.bullets.get(this.player.x, this.player.y);
        
        if (!bullet) return;  // No bullets available
        
        bullet.setActive(true);
        bullet.setVisible(true);
        
        // Calculate direction to target
        const angle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            targetX, targetY
        );
        
        // Set bullet velocity toward target
        const bulletSpeed = 600;
        bullet.setVelocity(
            Math.cos(angle) * bulletSpeed,
            Math.sin(angle) * bulletSpeed
        );
        
        // Rotate bullet to face direction of travel
        bullet.setRotation(angle);
        
        // Bullets shouldn't be affected by gravity
        bullet.body.allowGravity = false;
    }
}


```

Let me add spacebar shooting in the update loop:

```javascript
/**
 * PlayScene - Main gameplay scene
 * 
 * This is where the actual game happens. Phaser scenes have three main methods:
 * - preload(): Load assets (images, sounds, etc.)
 * - create(): Set up game objects, physics, input (runs once when scene starts)
 * - update(): Game loop, runs every frame (~60 times per second)
 */

import { DebugControls } from '../utils/DebugControls.js';
import { PLATFORM_SHAPES, LEVEL_LAYOUTS } from '../platforms/PlatformShapes.js';
import { drawWalls, drawWater } from '../drawing/EnvironmentRenderer.js';
import { generateAllShapeTextures } from '../drawing/ShapeRenderer.js';

export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        // Load the user-cropped notebook paper background (preserves scale)
        this.load.image('notebook-paper', 'assets/cropped-notebook-page.png');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using cropped image) ===
        // Paper is pre-cropped to edges, just scale to fit canvas
        const paper = this.add.image(350, 450, 'notebook-paper');
        paper.setDisplaySize(700, 900);
        
        
        // === WALLS (hand-drawn style with crayon fill) ===
        this.walls = drawWalls(this);
        
        // === WATER HAZARD (with crayon-like blue fill) ===
        this.waterZone = drawWater(this);
        
        
        // === PLATFORMS (using shape library) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Generate textures for all shapes in the library
        generateAllShapeTextures(this, PLATFORM_SHAPES);
        
        // Select level layout (use passed index or default to 0)
        this.currentLayoutIndex = (this.scene.settings.data && this.scene.settings.data.layoutIndex !== undefined) 
            ? this.scene.settings.data.layoutIndex 
            : 0;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex])
        
        
        // === PLAYER (hand-drawn stick figure - 0.75x original) ===
        if (!this.textures.exists('player')) {
            const playerGraphics = this.add.graphics();
            playerGraphics.lineStyle(1.5, 0x1a1a1a);  // Black pen
            
            // Simple stick figure: head, body, legs
            // Head (circle)
            playerGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 5.25);
            playerGraphics.lineTo(4.5, 10.5);
            playerGraphics.strokePath();
            // Arms (line across)
            playerGraphics.beginPath();
            playerGraphics.moveTo(1.5, 7.5);
            playerGraphics.lineTo(7.5, 7.5);
            playerGraphics.strokePath();
            // Legs (two lines)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(2.25, 15);
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(6.75, 15);
            playerGraphics.strokePath();
            
            playerGraphics.generateTexture('player', 9, 17);
            playerGraphics.destroy();
        }
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        
        // Player dies if they touch water!
        this.physics.add.overlap(this.player, this.waterZone, this.playerDied, null, this);
        
        
        // === CROSSHAIR (aim indicator) ===
        // Create crosshair texture - two lines with gap in middle
        if (!this.textures.exists('crosshair')) {
            const crosshairGraphics = this.add.graphics();
            const size = 17;  // About player height
            const gap = 4;    // Gap in center
            const halfSize = size / 2;
            const halfGap = gap / 2;
            
            crosshairGraphics.lineStyle(1.5, 0x1a1a1a, 0.6);  // Semi-transparent dark line
            
            // Horizontal line (left segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(0, halfSize);
            crosshairGraphics.lineTo(halfSize - halfGap, halfSize);
            crosshairGraphics.strokePath();
            
            // Horizontal line (right segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(halfSize + halfGap, halfSize);
            crosshairGraphics.lineTo(size, halfSize);
            crosshairGraphics.strokePath();
            
            // Vertical line (top segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(halfSize, 0);
            crosshairGraphics.lineTo(halfSize, halfSize - halfGap);
            crosshairGraphics.strokePath();
            
            // Vertical line (bottom segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(halfSize, halfSize + halfGap);
            crosshairGraphics.lineTo(halfSize, size);
            crosshairGraphics.strokePath();
            
            crosshairGraphics.generateTexture('crosshair', size, size);
            crosshairGraphics.destroy();
        }
        
        // Create crosshair sprite
        this.crosshair = this.add.image(0, 0, 'crosshair');
        this.crosshair.setAlpha(0.7);  // Semi-transparent
        
        // Aim state - angle in radians (0 = right, increases counterclockwise)
        this.aimAngle = 0;
        this.aimDistance = 85;  // 5 player heights (5 * 17)
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // WASD keys as alternative movement
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
        
        // J/K keys for aiming rotation
        this.aimKeys = {
            rotateLeft: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J),   // Counter-clockwise
            rotateRight: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)   // Clockwise
        };
        this.aimRotationSpeed = 1.5;  // Radians per second
        
        // Mouse click to shoot (or continue after level complete)
        this.input.on('pointerdown', (pointer) => {
            if (this.levelInProgress) {
                // Shoot toward crosshair position (not mouse)
                this.shoot(this.crosshair.x, this.crosshair.y);
            } else {
                // Level is complete, click to start next level
                this.startNextLevel();
            }
        });
        
        // Spacebar to shoot (keyboard alternative)
        this.shootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.canShoot = true;  // Prevent holding space for auto-fire
        
        
        // === BULLETS ===
        // === BULLET (hand-drawn dash) ===
        if (!this.textures.exists('bullet')) {
            const bulletGraphics = this.add.graphics();
            bulletGraphics.lineStyle(2, 0x1a1a1a);  // Black pen stroke
            bulletGraphics.beginPath();
            bulletGraphics.moveTo(0, 2);
            bulletGraphics.lineTo(8, 2);
            bulletGraphics.strokePath();
            bulletGraphics.generateTexture('bullet', 10, 4);
            bulletGraphics.destroy();
        }
        
        // Now create the group that uses the texture
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });
        
        
        // === ENEMIES ===
        // === ENEMY (hand-drawn stick figure in red - 0.75x original) ===
        if (!this.textures.exists('enemy')) {
            const enemyGraphics = this.add.graphics();
            enemyGraphics.lineStyle(1.5, 0xcc3333);  // Red pen
            
            // Same stick figure shape as player
            // Head (circle)
            enemyGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 5.25);
            enemyGraphics.lineTo(4.5, 10.5);
            enemyGraphics.strokePath();
            // Arms (line across)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(1.5, 7.5);
            enemyGraphics.lineTo(7.5, 7.5);
            enemyGraphics.strokePath();
            // Legs (two lines)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(2.25, 15);
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(6.75, 15);
            enemyGraphics.strokePath();
            
            enemyGraphics.generateTexture('enemy', 9, 17);
            enemyGraphics.destroy();
        }
        
        // Create enemies group
        this.enemies = this.physics.add.group();
        
        // Spawn initial enemies on platforms
        this.spawnEnemy(450, 600);   // Bottom right platform
        this.spawnEnemy(280, 460);   // Middle platform
        this.spawnEnemy(380, 390);   // Row 4
        this.spawnEnemy(380, 250);   // Top platform
        
        // Make enemies collide with platforms (so they sit on them)
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Bullets hit enemies!
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        
        
        // === UI TEXT ===
        // Show some instructions (smaller for notebook canvas)
        this.add.text(60, 16, 'WASD/Arrows: move | Click: shoot | R/G: restart/new | F: fly | H: hitbox', {
            fontSize: '9px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Debug controls (R/G/F/H keys)
        this.debugControls = new DebugControls(this);
        
        // Enemy counter (positioned for notebook canvas)
        this.enemyCountText = this.add.text(60, 32, '', {
            fontSize: '11px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        this.updateEnemyCount();
        
        // Level complete text (hidden initially) - centered for 700px canvas
        this.levelCompleteText = this.add.text(350, 400, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '28px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 18, y: 10 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(350, 460, 'Click to continue', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 5 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display
        this.levelText = this.add.text(610, 16, 'Level: 1', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 6, y: 3 }
        });
        
        // Layout number display (for debugging)
        this.layoutText = this.add.text(60, 48, `Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`, {
            fontSize: '11px',
            fill: '#666',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Spawn points will be generated from the layout
        this.spawnPoints = [];
        
        // Player start position (will be set by layout)
        this.playerStartX = 100;
        this.playerStartY = 600;
    }
    
    /**
     * Load a level layout from the library
     */
    loadLayout(layout) {
        // Clear existing platforms
        this.platforms.clear(true, true);
        
        // Clear compound shape visuals (they're not in the platforms group)
        if (this.compoundVisuals) {
            this.compoundVisuals.forEach(v => v.destroy());
        }
        this.compoundVisuals = [];
        
        // Clear spawn points
        this.spawnPoints = [];
        
        // Create platforms from layout
        for (const plat of layout.platforms) {
            const shapeData = PLATFORM_SHAPES[plat.shape];
            
            // Check if this is a compound shape (has separate collision parts)
            if (shapeData.parts) {
                // Compound shape: create visual-only sprite + separate collision bodies
                
                // Add visual sprite (no physics) - track it for cleanup
                const visual = this.add.image(plat.x, plat.y, plat.shape);
                this.compoundVisuals.push(visual);
                
                // Create collision bodies for each part
                for (const part of shapeData.parts) {
                    // Part coordinates are relative to shape origin (top-left)
                    // Convert to world position (plat.x, plat.y is center of shape)
                    const partX = plat.x - shapeData.width / 2 + part.x + part.w / 2;
                    const partY = plat.y - shapeData.height / 2 + part.y + part.h / 2;
                    
                    // Create invisible collision rectangle
                    const collider = this.add.rectangle(partX, partY, part.w, part.h, 0x000000, 0);
                    this.physics.add.existing(collider, true);  // true = static
                    this.platforms.add(collider);
                }
            } else {
                // Simple shape: single collision body (original behavior)
                const platform = this.platforms.create(plat.x, plat.y, plat.shape);
            }
            
            // Add this platform position as a spawn point
            // Spawn point is on top of the platform
            this.spawnPoints.push({
                x: plat.x,
                y: plat.y - shapeData.height / 2 - 15  // Above the platform
            });
        }
        
        // Set player start to first platform
        if (layout.platforms.length > 0) {
            const firstPlat = layout.platforms[0];
            const firstShape = PLATFORM_SHAPES[firstPlat.shape];
            this.playerStartX = firstPlat.x;
            this.playerStartY = firstPlat.y - firstShape.height / 2 - 15;
        }
    }
    
    /**
     * Spawn an enemy at a position
     */
    spawnEnemy(x, y) {
        const enemy = this.enemies.create(x, y, 'enemy');
        enemy.setBounce(0);
        enemy.setCollideWorldBounds(true);
    }
    
    /**
     * Called when a bullet hits an enemy
     */
    bulletHitEnemy(bullet, enemy) {
        // Deactivate the bullet
        bullet.setActive(false);
        bullet.setVisible(false);
        
        // Destroy the enemy
        enemy.destroy();
        
        // Update the counter
        this.updateEnemyCount();
        
        // Check for level complete
        if (this.enemies.countActive() === 0) {
            this.levelComplete();
        }
    }
    
    /**
     * Update the enemy count display
     */
    updateEnemyCount() {
        const count = this.enemies.countActive();
        this.enemyCountText.setText(`Enemies remaining: ${count}`);
    }
    
    /**
     * Called when all enemies are defeated
     */
    levelComplete() {
        this.levelInProgress = false;
        this.levelCompleteText.setVisible(true);
        this.clickToContinueText.setVisible(true);
    }
    
    /**
     * Start the next level - cycle through layouts and spawn enemies
     */
    startNextLevel() {
        this.currentLevel++;
        this.levelText.setText(`Level: ${this.currentLevel}`);
        
        // Hide completion messages
        this.levelCompleteText.setVisible(false);
        this.clickToContinueText.setVisible(false);
        
        // Clear any remaining bullets
        this.bullets.children.each((bullet) => {
            bullet.setActive(false);
            bullet.setVisible(false);
        });
        
        // Cycle to next layout (or random)
        this.currentLayoutIndex = (this.currentLayoutIndex + 1) % LEVEL_LAYOUTS.length;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex]);
        
        // Update layout label
        this.layoutText.setText(`Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`);
        
        // Re-add platform and wall collisions
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Spawn enemies at random positions
        // More enemies as levels progress (4 + 1 per 2 levels, max based on spawn points)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), this.spawnPoints.length - 1);
        
        // Filter out player start position from spawn points for enemies
        const enemySpawnPoints = this.spawnPoints.filter(
            p => !(Math.abs(p.x - this.playerStartX) < 10 && Math.abs(p.y - this.playerStartY) < 10)
        );
        
        // Shuffle and pick
        const shuffled = Phaser.Utils.Array.Shuffle([...enemySpawnPoints]);
        for (let i = 0; i < enemyCount && i < shuffled.length; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position - use body.reset for proper physics sync
        this.player.body.reset(this.playerStartX, this.playerStartY);
    }
    
    /**
     * Called when player touches water
     */
    playerDied() {
        // Prevent multiple triggers while respawning
        if (this.isRespawning) return;
        this.isRespawning = true;
        
        // Force physics body to fully reset at new position
        // This syncs sprite + physics body immediately to prevent desync
        this.player.body.reset(this.playerStartX, this.playerStartY);
        
        // Brief visual feedback - flash the player
        this.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            this.player.clearTint();
        });
        
        // Clear respawn flag after player has time to land
        this.time.delayedCall(500, () => {
            this.isRespawning = false;
        });
    }

    update() {
        // This runs every frame - handle player movement here
        
        // Check debug controls (R/G/F/H keys)
        const debugAction = this.debugControls.update(this.player, this.currentLayoutIndex, LEVEL_LAYOUTS.length);
        if (debugAction) {
            if (debugAction.action === 'restart') {
                this.scene.restart({ layoutIndex: debugAction.layoutIndex });
                return;
            }
            // flyToggled and hitboxToggled are handled internally by DebugControls
        }
        
        const speed = 120;  // Scaled down for smaller characters
        const flySpeed = 200;  // Speed when flying
        const jumpVelocity = -280;  // Scaled down - smaller jump for zoomed-out feel
        
        // Left/Right movement (arrows or WASD)
        const flyMode = this.debugControls.isFlyMode();
        const leftDown = this.cursors.left.isDown || this.wasd.left.isDown;
        const rightDown = this.cursors.right.isDown || this.wasd.right.isDown;
        const upDown = this.cursors.up.isDown || this.wasd.up.isDown;
        const downDown = this.cursors.down.isDown || this.wasd.down.isDown;
        
        if (leftDown) {
            this.player.setVelocityX(flyMode ? -flySpeed : -speed);
        } else if (rightDown) {
            this.player.setVelocityX(flyMode ? flySpeed : speed);
        } else {
            // No key pressed - stop horizontal movement
            this.player.setVelocityX(0);
        }
        
        // Up/Down movement (fly mode) or jumping (normal mode)
        if (flyMode) {
            // Fly mode: up/down moves vertically
            if (upDown) {
                this.player.setVelocityY(-flySpeed);
            } else if (downDown) {
                this.player.setVelocityY(flySpeed);
            } else {
                this.player.setVelocityY(0);
            }
        } else {
            // Normal mode: jumping when touching ground
            if (upDown && this.player.body.blocked.down) {
                this.player.setVelocityY(jumpVelocity);
            }
        }
        
        // Rotate aim with J/K keys
        const deltaTime = this.game.loop.delta / 1000;  // Convert ms to seconds
        if (this.aimKeys.rotateLeft.isDown) {
            this.aimAngle -= this.aimRotationSpeed * deltaTime;
        }
        if (this.aimKeys.rotateRight.isDown) {
            this.aimAngle += this.aimRotationSpeed * deltaTime;
        }
        
        // Spacebar shooting
        if (this.shootKey.isDown && this.canShoot && this.levelInProgress) {
            this.shoot(this.crosshair.x, this.crosshair.y);
            this.canShoot = false;
        }
        if (this.shootKey.isUp) {
            this.canShoot = true;
        }
        
        // Update crosshair position (orbits player at fixed distance)
        this.crosshair.x = this.player.x + Math.cos(this.aimAngle) * this.aimDistance;
        this.crosshair.y = this.player.y + Math.sin(this.aimAngle) * this.aimDistance;
        
        // Clean up bullets that have left the screen
        this.bullets.children.each((bullet) => {
            if (bullet.active && (bullet.x < -50 || bullet.x > 750 || bullet.y < -50 || bullet.y > 950)) {
                bullet.setActive(false);
                bullet.setVisible(false);
            }
        });
    }
    
    /**
     * Shoot a bullet toward a target position
     * @param {number} targetX - X coordinate to shoot toward
     * @param {number} targetY - Y coordinate to shoot toward
     */
    shoot(targetX, targetY) {
        // Get a bullet from the group (reuses inactive bullets)
        const bullet = this.bullets.get(this.player.x, this.player.y);
        
        if (!bullet) return;  // No bullets available
        
        bullet.setActive(true);
        bullet.setVisible(true);
        
        // Calculate direction to target
        const angle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            targetX, targetY
        );
        
        // Set bullet velocity toward target
        const bulletSpeed = 600;
        bullet.setVelocity(
            Math.cos(angle) * bulletSpeed,
            Math.sin(angle) * bulletSpeed
        );
        
        // Rotate bullet to face direction of travel
        bullet.setRotation(angle);
        
        // Bullets shouldn't be affected by gravity
        bullet.body.allowGravity = false;
    }
}


```

Let me update the on-screen instructions to show the new controls:

```javascript
/**
 * PlayScene - Main gameplay scene
 * 
 * This is where the actual game happens. Phaser scenes have three main methods:
 * - preload(): Load assets (images, sounds, etc.)
 * - create(): Set up game objects, physics, input (runs once when scene starts)
 * - update(): Game loop, runs every frame (~60 times per second)
 */

import { DebugControls } from '../utils/DebugControls.js';
import { PLATFORM_SHAPES, LEVEL_LAYOUTS } from '../platforms/PlatformShapes.js';
import { drawWalls, drawWater } from '../drawing/EnvironmentRenderer.js';
import { generateAllShapeTextures } from '../drawing/ShapeRenderer.js';

export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        // Load the user-cropped notebook paper background (preserves scale)
        this.load.image('notebook-paper', 'assets/cropped-notebook-page.png');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using cropped image) ===
        // Paper is pre-cropped to edges, just scale to fit canvas
        const paper = this.add.image(350, 450, 'notebook-paper');
        paper.setDisplaySize(700, 900);
        
        
        // === WALLS (hand-drawn style with crayon fill) ===
        this.walls = drawWalls(this);
        
        // === WATER HAZARD (with crayon-like blue fill) ===
        this.waterZone = drawWater(this);
        
        
        // === PLATFORMS (using shape library) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Generate textures for all shapes in the library
        generateAllShapeTextures(this, PLATFORM_SHAPES);
        
        // Select level layout (use passed index or default to 0)
        this.currentLayoutIndex = (this.scene.settings.data && this.scene.settings.data.layoutIndex !== undefined) 
            ? this.scene.settings.data.layoutIndex 
            : 0;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex])
        
        
        // === PLAYER (hand-drawn stick figure - 0.75x original) ===
        if (!this.textures.exists('player')) {
            const playerGraphics = this.add.graphics();
            playerGraphics.lineStyle(1.5, 0x1a1a1a);  // Black pen
            
            // Simple stick figure: head, body, legs
            // Head (circle)
            playerGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 5.25);
            playerGraphics.lineTo(4.5, 10.5);
            playerGraphics.strokePath();
            // Arms (line across)
            playerGraphics.beginPath();
            playerGraphics.moveTo(1.5, 7.5);
            playerGraphics.lineTo(7.5, 7.5);
            playerGraphics.strokePath();
            // Legs (two lines)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(2.25, 15);
            playerGraphics.moveTo(4.5, 10.5);
            playerGraphics.lineTo(6.75, 15);
            playerGraphics.strokePath();
            
            playerGraphics.generateTexture('player', 9, 17);
            playerGraphics.destroy();
        }
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        
        // Player dies if they touch water!
        this.physics.add.overlap(this.player, this.waterZone, this.playerDied, null, this);
        
        
        // === CROSSHAIR (aim indicator) ===
        // Create crosshair texture - two lines with gap in middle
        if (!this.textures.exists('crosshair')) {
            const crosshairGraphics = this.add.graphics();
            const size = 17;  // About player height
            const gap = 4;    // Gap in center
            const halfSize = size / 2;
            const halfGap = gap / 2;
            
            crosshairGraphics.lineStyle(1.5, 0x1a1a1a, 0.6);  // Semi-transparent dark line
            
            // Horizontal line (left segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(0, halfSize);
            crosshairGraphics.lineTo(halfSize - halfGap, halfSize);
            crosshairGraphics.strokePath();
            
            // Horizontal line (right segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(halfSize + halfGap, halfSize);
            crosshairGraphics.lineTo(size, halfSize);
            crosshairGraphics.strokePath();
            
            // Vertical line (top segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(halfSize, 0);
            crosshairGraphics.lineTo(halfSize, halfSize - halfGap);
            crosshairGraphics.strokePath();
            
            // Vertical line (bottom segment)
            crosshairGraphics.beginPath();
            crosshairGraphics.moveTo(halfSize, halfSize + halfGap);
            crosshairGraphics.lineTo(halfSize, size);
            crosshairGraphics.strokePath();
            
            crosshairGraphics.generateTexture('crosshair', size, size);
            crosshairGraphics.destroy();
        }
        
        // Create crosshair sprite
        this.crosshair = this.add.image(0, 0, 'crosshair');
        this.crosshair.setAlpha(0.7);  // Semi-transparent
        
        // Aim state - angle in radians (0 = right, increases counterclockwise)
        this.aimAngle = 0;
        this.aimDistance = 85;  // 5 player heights (5 * 17)
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // WASD keys as alternative movement
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
        
        // J/K keys for aiming rotation
        this.aimKeys = {
            rotateLeft: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J),   // Counter-clockwise
            rotateRight: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)   // Clockwise
        };
        this.aimRotationSpeed = 1.5;  // Radians per second
        
        // Mouse click to shoot (or continue after level complete)
        this.input.on('pointerdown', (pointer) => {
            if (this.levelInProgress) {
                // Shoot toward crosshair position (not mouse)
                this.shoot(this.crosshair.x, this.crosshair.y);
            } else {
                // Level is complete, click to start next level
                this.startNextLevel();
            }
        });
        
        // Spacebar to shoot (keyboard alternative)
        this.shootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.canShoot = true;  // Prevent holding space for auto-fire
        
        
        // === BULLETS ===
        // === BULLET (hand-drawn dash) ===
        if (!this.textures.exists('bullet')) {
            const bulletGraphics = this.add.graphics();
            bulletGraphics.lineStyle(2, 0x1a1a1a);  // Black pen stroke
            bulletGraphics.beginPath();
            bulletGraphics.moveTo(0, 2);
            bulletGraphics.lineTo(8, 2);
            bulletGraphics.strokePath();
            bulletGraphics.generateTexture('bullet', 10, 4);
            bulletGraphics.destroy();
        }
        
        // Now create the group that uses the texture
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });
        
        
        // === ENEMIES ===
        // === ENEMY (hand-drawn stick figure in red - 0.75x original) ===
        if (!this.textures.exists('enemy')) {
            const enemyGraphics = this.add.graphics();
            enemyGraphics.lineStyle(1.5, 0xcc3333);  // Red pen
            
            // Same stick figure shape as player
            // Head (circle)
            enemyGraphics.strokeCircle(4.5, 3, 2.25);
            // Body (line down)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 5.25);
            enemyGraphics.lineTo(4.5, 10.5);
            enemyGraphics.strokePath();
            // Arms (line across)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(1.5, 7.5);
            enemyGraphics.lineTo(7.5, 7.5);
            enemyGraphics.strokePath();
            // Legs (two lines)
            enemyGraphics.beginPath();
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(2.25, 15);
            enemyGraphics.moveTo(4.5, 10.5);
            enemyGraphics.lineTo(6.75, 15);
            enemyGraphics.strokePath();
            
            enemyGraphics.generateTexture('enemy', 9, 17);
            enemyGraphics.destroy();
        }
        
        // Create enemies group
        this.enemies = this.physics.add.group();
        
        // Spawn initial enemies on platforms
        this.spawnEnemy(450, 600);   // Bottom right platform
        this.spawnEnemy(280, 460);   // Middle platform
        this.spawnEnemy(380, 390);   // Row 4
        this.spawnEnemy(380, 250);   // Top platform
        
        // Make enemies collide with platforms (so they sit on them)
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Bullets hit enemies!
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        
        
        // === UI TEXT ===
        // Show some instructions (smaller for notebook canvas)
        this.add.text(60, 16, 'WASD: move | J/K: aim | Space/Click: shoot | R/G/F/H: debug', {
            fontSize: '9px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Debug controls (R/G/F/H keys)
        this.debugControls = new DebugControls(this);
        
        // Enemy counter (positioned for notebook canvas)
        this.enemyCountText = this.add.text(60, 32, '', {
            fontSize: '11px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        this.updateEnemyCount();
        
        // Level complete text (hidden initially) - centered for 700px canvas
        this.levelCompleteText = this.add.text(350, 400, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '28px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 18, y: 10 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(350, 460, 'Click to continue', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 5 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display
        this.levelText = this.add.text(610, 16, 'Level: 1', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 6, y: 3 }
        });
        
        // Layout number display (for debugging)
        this.layoutText = this.add.text(60, 48, `Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`, {
            fontSize: '11px',
            fill: '#666',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        // Spawn points will be generated from the layout
        this.spawnPoints = [];
        
        // Player start position (will be set by layout)
        this.playerStartX = 100;
        this.playerStartY = 600;
    }
    
    /**
     * Load a level layout from the library
     */
    loadLayout(layout) {
        // Clear existing platforms
        this.platforms.clear(true, true);
        
        // Clear compound shape visuals (they're not in the platforms group)
        if (this.compoundVisuals) {
            this.compoundVisuals.forEach(v => v.destroy());
        }
        this.compoundVisuals = [];
        
        // Clear spawn points
        this.spawnPoints = [];
        
        // Create platforms from layout
        for (const plat of layout.platforms) {
            const shapeData = PLATFORM_SHAPES[plat.shape];
            
            // Check if this is a compound shape (has separate collision parts)
            if (shapeData.parts) {
                // Compound shape: create visual-only sprite + separate collision bodies
                
                // Add visual sprite (no physics) - track it for cleanup
                const visual = this.add.image(plat.x, plat.y, plat.shape);
                this.compoundVisuals.push(visual);
                
                // Create collision bodies for each part
                for (const part of shapeData.parts) {
                    // Part coordinates are relative to shape origin (top-left)
                    // Convert to world position (plat.x, plat.y is center of shape)
                    const partX = plat.x - shapeData.width / 2 + part.x + part.w / 2;
                    const partY = plat.y - shapeData.height / 2 + part.y + part.h / 2;
                    
                    // Create invisible collision rectangle
                    const collider = this.add.rectangle(partX, partY, part.w, part.h, 0x000000, 0);
                    this.physics.add.existing(collider, true);  // true = static
                    this.platforms.add(collider);
                }
            } else {
                // Simple shape: single collision body (original behavior)
                const platform = this.platforms.create(plat.x, plat.y, plat.shape);
            }
            
            // Add this platform position as a spawn point
            // Spawn point is on top of the platform
            this.spawnPoints.push({
                x: plat.x,
                y: plat.y - shapeData.height / 2 - 15  // Above the platform
            });
        }
        
        // Set player start to first platform
        if (layout.platforms.length > 0) {
            const firstPlat = layout.platforms[0];
            const firstShape = PLATFORM_SHAPES[firstPlat.shape];
            this.playerStartX = firstPlat.x;
            this.playerStartY = firstPlat.y - firstShape.height / 2 - 15;
        }
    }
    
    /**
     * Spawn an enemy at a position
     */
    spawnEnemy(x, y) {
        const enemy = this.enemies.create(x, y, 'enemy');
        enemy.setBounce(0);
        enemy.setCollideWorldBounds(true);
    }
    
    /**
     * Called when a bullet hits an enemy
     */
    bulletHitEnemy(bullet, enemy) {
        // Deactivate the bullet
        bullet.setActive(false);
        bullet.setVisible(false);
        
        // Destroy the enemy
        enemy.destroy();
        
        // Update the counter
        this.updateEnemyCount();
        
        // Check for level complete
        if (this.enemies.countActive() === 0) {
            this.levelComplete();
        }
    }
    
    /**
     * Update the enemy count display
     */
    updateEnemyCount() {
        const count = this.enemies.countActive();
        this.enemyCountText.setText(`Enemies remaining: ${count}`);
    }
    
    /**
     * Called when all enemies are defeated
     */
    levelComplete() {
        this.levelInProgress = false;
        this.levelCompleteText.setVisible(true);
        this.clickToContinueText.setVisible(true);
    }
    
    /**
     * Start the next level - cycle through layouts and spawn enemies
     */
    startNextLevel() {
        this.currentLevel++;
        this.levelText.setText(`Level: ${this.currentLevel}`);
        
        // Hide completion messages
        this.levelCompleteText.setVisible(false);
        this.clickToContinueText.setVisible(false);
        
        // Clear any remaining bullets
        this.bullets.children.each((bullet) => {
            bullet.setActive(false);
            bullet.setVisible(false);
        });
        
        // Cycle to next layout (or random)
        this.currentLayoutIndex = (this.currentLayoutIndex + 1) % LEVEL_LAYOUTS.length;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex]);
        
        // Update layout label
        this.layoutText.setText(`Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`);
        
        // Re-add platform and wall collisions
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Spawn enemies at random positions
        // More enemies as levels progress (4 + 1 per 2 levels, max based on spawn points)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), this.spawnPoints.length - 1);
        
        // Filter out player start position from spawn points for enemies
        const enemySpawnPoints = this.spawnPoints.filter(
            p => !(Math.abs(p.x - this.playerStartX) < 10 && Math.abs(p.y - this.playerStartY) < 10)
        );
        
        // Shuffle and pick
        const shuffled = Phaser.Utils.Array.Shuffle([...enemySpawnPoints]);
        for (let i = 0; i < enemyCount && i < shuffled.length; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position - use body.reset for proper physics sync
        this.player.body.reset(this.playerStartX, this.playerStartY);
    }
    
    /**
     * Called when player touches water
     */
    playerDied() {
        // Prevent multiple triggers while respawning
        if (this.isRespawning) return;
        this.isRespawning = true;
        
        // Force physics body to fully reset at new position
        // This syncs sprite + physics body immediately to prevent desync
        this.player.body.reset(this.playerStartX, this.playerStartY);
        
        // Brief visual feedback - flash the player
        this.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            this.player.clearTint();
        });
        
        // Clear respawn flag after player has time to land
        this.time.delayedCall(500, () => {
            this.isRespawning = false;
        });
    }

    update() {
        // This runs every frame - handle player movement here
        
        // Check debug controls (R/G/F/H keys)
        const debugAction = this.debugControls.update(this.player, this.currentLayoutIndex, LEVEL_LAYOUTS.length);
        if (debugAction) {
            if (debugAction.action === 'restart') {
                this.scene.restart({ layoutIndex: debugAction.layoutIndex });
                return;
            }
            // flyToggled and hitboxToggled are handled internally by DebugControls
        }
        
        const speed = 120;  // Scaled down for smaller characters
        const flySpeed = 200;  // Speed when flying
        const jumpVelocity = -280;  // Scaled down - smaller jump for zoomed-out feel
        
        // Left/Right movement (arrows or WASD)
        const flyMode = this.debugControls.isFlyMode();
        const leftDown = this.cursors.left.isDown || this.wasd.left.isDown;
        const rightDown = this.cursors.right.isDown || this.wasd.right.isDown;
        const upDown = this.cursors.up.isDown || this.wasd.up.isDown;
        const downDown = this.cursors.down.isDown || this.wasd.down.isDown;
        
        if (leftDown) {
            this.player.setVelocityX(flyMode ? -flySpeed : -speed);
        } else if (rightDown) {
            this.player.setVelocityX(flyMode ? flySpeed : speed);
        } else {
            // No key pressed - stop horizontal movement
            this.player.setVelocityX(0);
        }
        
        // Up/Down movement (fly mode) or jumping (normal mode)
        if (flyMode) {
            // Fly mode: up/down moves vertically
            if (upDown) {
                this.player.setVelocityY(-flySpeed);
            } else if (downDown) {
                this.player.setVelocityY(flySpeed);
            } else {
                this.player.setVelocityY(0);
            }
        } else {
            // Normal mode: jumping when touching ground
            if (upDown && this.player.body.blocked.down) {
                this.player.setVelocityY(jumpVelocity);
            }
        }
        
        // Rotate aim with J/K keys
        const deltaTime = this.game.loop.delta / 1000;  // Convert ms to seconds
        if (this.aimKeys.rotateLeft.isDown) {
            this.aimAngle -= this.aimRotationSpeed * deltaTime;
        }
        if (this.aimKeys.rotateRight.isDown) {
            this.aimAngle += this.aimRotationSpeed * deltaTime;
        }
        
        // Spacebar shooting
        if (this.shootKey.isDown && this.canShoot && this.levelInProgress) {
            this.shoot(this.crosshair.x, this.crosshair.y);
            this.canShoot = false;
        }
        if (this.shootKey.isUp) {
            this.canShoot = true;
        }
        
        // Update crosshair position (orbits player at fixed distance)
        this.crosshair.x = this.player.x + Math.cos(this.aimAngle) * this.aimDistance;
        this.crosshair.y = this.player.y + Math.sin(this.aimAngle) * this.aimDistance;
        
        // Clean up bullets that have left the screen
        this.bullets.children.each((bullet) => {
            if (bullet.active && (bullet.x < -50 || bullet.x > 750 || bullet.y < -50 || bullet.y > 950)) {
                bullet.setActive(false);
                bullet.setVisible(false);
            }
        });
    }
    
    /**
     * Shoot a bullet toward a target position
     * @param {number} targetX - X coordinate to shoot toward
     * @param {number} targetY - Y coordinate to shoot toward
     */
    shoot(targetX, targetY) {
        // Get a bullet from the group (reuses inactive bullets)
        const bullet = this.bullets.get(this.player.x, this.player.y);
        
        if (!bullet) return;  // No bullets available
        
        bullet.setActive(true);
        bullet.setVisible(true);
        
        // Calculate direction to target
        const angle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            targetX, targetY
        );
        
        // Set bullet velocity toward target
        const bulletSpeed = 600;
        bullet.setVelocity(
            Math.cos(angle) * bulletSpeed,
            Math.sin(angle) * bulletSpeed
        );
        
        // Rotate bullet to face direction of travel
        bullet.setRotation(angle);
        
        // Bullets shouldn't be affected by gravity
        bullet.body.allowGravity = false;
    }
}


```

## Step 3 Complete! ✓

**Changes:**
- Rotation speed halved: 3 → **1.5** radians/second
- **Click** now shoots toward crosshair (not mouse position)
- **Spacebar** added as keyboard alternative for shooting
- Updated on-screen instructions

**Full keyboard controls now:**
- **WASD** - Move
- **J/K** - Rotate aim
- **Space** - Shoot
- **R/G/F/H** - Debug controls

**Test it:**
1. Refresh http://localhost:8000
2. Use **J/K** to aim the crosshair at an enemy
3. Press **Space** to shoot toward the crosshair
4. Click still works too, but now fires toward crosshair not mouse

The aiming system is complete! 🎯

---

**User**

ok it works perfectly. i think we could have fun adding different weapons. i was thinking pistol, shotgun, submachine gun, hunting rifle, automatic rifle, and eventually grenade and rocket launcher. the latter two would be later. i think this would require some supporting features. we should change the projectiles generated by the player. the velocity can change. the damage dealt can change, although we can implement later. the rate of fire can change. the crosshair distance and precision (size or space in the middle) can change. the grenade and rocket may need to have different hitboxes and sprites and be affected by gravity. the hitbox for the projectile should be smaller. we should verify the velocity when moving diagonally is not higher (due to moving in 2 dimensions simultaneously). we should select weapon with a button. maybe number keys. we should display which weapon is selected relatively prominently top of screen.

---

**Cursor**

Great feature idea! This is a bigger system, so let me break it into incremental steps:

## Weapon System Plan

### Step 1: Weapon Data Structure
Define weapons with properties:
- `velocity` - bullet speed
- `fireRate` - shots per second
- `crosshairDistance` - aim distance
- `crosshairGap` - precision (gap size)
- `damage` - (for later)
- `spread` - (for shotgun)

### Step 2: Fix Diagonal Velocity
Normalize movement vector so diagonal isn't faster

### Step 3: Fire Rate System
Each weapon has different cooldown between shots

### Step 4: Dynamic Crosshair
Crosshair distance/gap changes per weapon

### Step 5: Weapon Switching (1-5 keys)
Number keys to select weapon

### Step 6: Weapon Display UI
Show selected weapon name prominently at top

### Step 7: Unique Weapon Behaviors
- Shotgun: Multiple projectiles with spread
- SMG: Very fast fire rate
- Hunting rifle: Slow, long range, small crosshair gap
- Auto rifle: Medium everything

### Later: Grenades & Rockets
- Gravity-affected projectiles
- Different sprites/hitboxes
- Explosions?

---

**Start with Step 1?** I'll create a weapon definitions file with the 5 initial weapons (pistol, shotgun, SMG, hunting rifle, auto rifle), then we can wire them up one step at a time.

---

**User**

ok

---

**Cursor**

```javascript
/**
 * WeaponDefinitions.js - Weapon stats and properties
 * 
 * Each weapon has:
 * - name: Display name
 * - velocity: Bullet speed (pixels/second)
 * - fireRate: Shots per second (higher = faster)
 * - crosshairDistance: How far crosshair orbits from player
 * - crosshairGap: Gap in center of crosshair (smaller = more precise)
 * - damage: Damage per hit (for future use)
 * - spread: Bullet spread angle in radians (for shotgun)
 * - pellets: Number of projectiles per shot (for shotgun)
 * - projectileSize: Hitbox size multiplier (1 = normal)
 */

export const WEAPONS = {
    pistol: {
        name: 'Pistol',
        velocity: 600,
        fireRate: 3,           // 3 shots/sec
        crosshairDistance: 85,
        crosshairGap: 4,
        damage: 25,
        spread: 0,
        pellets: 1,
        projectileSize: 1
    },
    
    shotgun: {
        name: 'Shotgun',
        velocity: 500,
        fireRate: 1,           // 1 shot/sec (slow)
        crosshairDistance: 60, // Shorter range
        crosshairGap: 8,       // Less precise
        damage: 15,            // Per pellet
        spread: 0.3,           // ~17 degrees spread
        pellets: 5,            // 5 pellets per shot
        projectileSize: 0.7
    },
    
    smg: {
        name: 'SMG',
        velocity: 550,
        fireRate: 10,          // 10 shots/sec (very fast)
        crosshairDistance: 70,
        crosshairGap: 6,       // Medium precision
        damage: 10,
        spread: 0.1,           // Slight spread
        pellets: 1,
        projectileSize: 0.8
    },
    
    huntingRifle: {
        name: 'Hunting Rifle',
        velocity: 900,         // Very fast bullets
        fireRate: 0.8,         // Slow (~1.25 sec between shots)
        crosshairDistance: 120, // Long range
        crosshairGap: 2,       // Very precise
        damage: 100,
        spread: 0,
        pellets: 1,
        projectileSize: 1
    },
    
    autoRifle: {
        name: 'Auto Rifle',
        velocity: 700,
        fireRate: 5,           // 5 shots/sec
        crosshairDistance: 90,
        crosshairGap: 4,
        damage: 20,
        spread: 0.05,          // Very slight spread
        pellets: 1,
        projectileSize: 1
    }
};

// Weapon slot order (for number key selection)
export const WEAPON_SLOTS = [
    'pistol',
    'shotgun', 
    'smg',
    'huntingRifle',
    'autoRifle'
];

// Get weapon by slot number (1-5)
export function getWeaponBySlot(slot) {
    const index = slot - 1;
    if (index >= 0 && index < WEAPON_SLOTS.length) {
        return WEAPONS[WEAPON_SLOTS[index]];
    }
    return WEAPONS.pistol;  // Default
}

```

## Step 1 Complete! ✓

Created `js/weapons/WeaponDefinitions.js` with 5 weapons:

| Weapon | Velocity | Fire Rate | Range | Precision | Special |
|--------|----------|-----------|-------|-----------|---------|
| **Pistol** | 600 | 3/sec | 85px | 4px gap | Balanced starter |
| **Shotgun** | 500 | 1/sec | 60px | 8px gap | 5 pellets, spread |
| **SMG** | 550 | 10/sec | 70px | 6px gap | Very fast fire |
| **Hunting Rifle** | 900 | 0.8/sec | 120px | 2px gap | Slow but precise |
| **Auto Rifle** | 700 | 5/sec | 90px | 4px gap | Medium everything |

Each weapon defines: `velocity`, `fireRate`, `crosshairDistance`, `crosshairGap`, `damage`, `spread`, `pellets`, `projectileSize`

---

**Ready for Step 2: Fix diagonal velocity?** This is a quick fix to ensure moving diagonally (e.g., W+D) isn't faster than moving in one direction.

---

**User**

yes

lets checkpoint and prepare to move to a new chat. follow instructions here as they apply @paste-this-into-stale-ai-chats.txt (1-5) 

---

**Cursor**

I'll prepare for the transition. Let me update the context files first:

```markdown
# Current Context for New Chat

## Project Status: Weapon System In Progress

A stick figure arena shooter built with Phaser 3, styled to look like doodles on crumpled notebook paper. Recently added keyboard aiming system. Now building out a multi-weapon system.

## What Works

- **Player movement:** WASD or arrow keys to move, W/Up to jump
- **Aiming:** Crosshair orbits player at fixed distance, J/K to rotate aim
- **Shooting:** Spacebar or click fires toward crosshair
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

**Remaining steps:**
2. ⏳ Fix diagonal velocity normalization
3. Implement fire rate limiting per weapon
4. Dynamic crosshair (distance/gap changes per weapon)
5. Weapon switching with number keys (1-5)
6. Weapon display UI at top of screen
7. Unique weapon behaviors (shotgun spread, etc.)

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
8. Started weapon system implementation (step 2 of 7 next)

## Next Steps

Continue weapon system implementation starting with Step 2: diagonal velocity fix.

```

```markdown
# Current Work Focus

Building weapon system with multiple weapon types. Keyboard aiming complete. Weapon definitions created.

- **Project Goal:** Build a browser-based stick figure arena shooter with depth in combat, enemies, and procedural levels

- **Intermediate Goal:** Implement multi-weapon system with different behaviors

- **Current Task:** Continue weapon system - Step 2: Fix diagonal velocity normalization

## Weapon System Progress

| Step | Task | Status |
|------|------|--------|
| 1 | Create weapon definitions | ✅ Done |
| 2 | Fix diagonal velocity | ⏳ Next |
| 3 | Fire rate limiting | Pending |
| 4 | Dynamic crosshair per weapon | Pending |
| 5 | Weapon switching (1-5 keys) | Pending |
| 6 | Weapon display UI | Pending |
| 7 | Unique behaviors (shotgun spread) | Pending |

## Recently Completed

- ✅ ES6 module refactoring
- ✅ WASD movement + arrow keys
- ✅ Crosshair aiming system (J/K rotation)
- ✅ Spacebar shooting
- ✅ WeaponDefinitions.js with 5 weapons

## Feature Roadmap (See project-vision-and-goals.md)

After weapons: procedural level generator, player health, enemy health, enemy AI

```

**Context files updated!**

---

## Ready for New Chat

**One question:** Would you like to export this chat to `past-chat-record/` yourself (using guides in `for-humans/how-to-export-chat-record/`), or should I create a detailed summary file?

**When you start the new chat:**
1. Paste the contents of `for-humans/paste-this-into-new-ai-chats.txt`
2. The new AI will pick up right where we left off (weapon system Step 2)

**Want me to commit these changes first?**

