/**
 * PlayScene - Main gameplay scene
 * 
 * This is where the actual game happens. Phaser scenes have three main methods:
 * - preload(): Load assets (images, sounds, etc.)
 * - create(): Set up game objects, physics, input (runs once when scene starts)
 * - update(): Game loop, runs every frame (~60 times per second)
 */

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

