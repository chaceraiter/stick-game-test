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
        
        
        // === WALLS (hand-drawn style) ===
        const wallGraphics = this.add.graphics();
        wallGraphics.lineStyle(2.5, 0x1a1a1a);  // Black pen
        
        // Left wall - irregular vertical line
        wallGraphics.beginPath();
        wallGraphics.moveTo(55, 0);
        for (let y = 0; y <= 840; y += 20) {
            const wobbleX = 55 + (Math.random() - 0.5) * 6 + Math.sin(y * 0.02) * 3;
            wallGraphics.lineTo(wobbleX, y);
        }
        wallGraphics.lineTo(55, 840);
        wallGraphics.strokePath();
        
        // Right wall - irregular vertical line
        wallGraphics.beginPath();
        wallGraphics.moveTo(645, 0);
        for (let y = 0; y <= 840; y += 20) {
            const wobbleX = 645 + (Math.random() - 0.5) * 6 + Math.sin(y * 0.025 + 1) * 3;
            wallGraphics.lineTo(wobbleX, y);
        }
        wallGraphics.lineTo(645, 840);
        wallGraphics.strokePath();
        
        // Wall collision bodies (invisible rectangles)
        this.walls = this.physics.add.staticGroup();
        
        // Create wall collision textures
        const wallTexture = this.add.graphics();
        wallTexture.fillStyle(0x000000, 0);  // Invisible
        wallTexture.fillRect(0, 0, 50, 840);
        wallTexture.generateTexture('wall', 50, 840);
        wallTexture.destroy();
        
        // Add collision walls (positioned so player stays in play area)
        this.walls.create(27, 420, 'wall');   // Left wall
        this.walls.create(673, 420, 'wall');  // Right wall
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 845, 700, 60);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 845);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 700; x += 15) {
            const waveY = 845 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 855);
        for (let x = 0; x <= 700; x += 12) {
            const waveY = 855 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(350, 870, 700, 60);
        this.physics.add.existing(this.waterZone, true);  // true = static body
        
        
        // === PLATFORMS (using shape library) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Helper function to draw a sketchy shape from points
        this.createSketchyShape = (shapeName, shapeData) => {
            const g = this.add.graphics();
            const wobble = () => (Math.random() - 0.5) * 2;
            const points = shapeData.points;
            
            // Draw sketchy outline following the shape points
            g.lineStyle(2, 0x1a1a1a);  // Dark pen color
            g.beginPath();
            
            // Move to first point with wobble
            g.moveTo(points[0].x + wobble() + 3, points[0].y + wobble() + 3);
            
            // Draw lines to each subsequent point with wobble
            for (let i = 1; i < points.length; i++) {
                g.lineTo(points[i].x + wobble() + 3, points[i].y + wobble() + 3);
            }
            
            // Close the shape
            g.lineTo(points[0].x + wobble() + 3, points[0].y + wobble() + 3);
            g.strokePath();
            
            // Very light fill
            g.fillStyle(0x000000, 0.05);
            g.beginPath();
            g.moveTo(points[0].x + 3, points[0].y + 3);
            for (let i = 1; i < points.length; i++) {
                g.lineTo(points[i].x + 3, points[i].y + 3);
            }
            g.closePath();
            g.fillPath();
            
            g.generateTexture(shapeName, shapeData.width + 6, shapeData.height + 6);
            g.destroy();
        };
        
        // Generate textures for all shapes in the library
        for (const [name, data] of Object.entries(PLATFORM_SHAPES)) {
            this.createSketchyShape(name, data);
        }
        
        // Select a random level layout (or use first one for now)
        this.currentLayoutIndex = 0;
        this.loadLayout(LEVEL_LAYOUTS[this.currentLayoutIndex])
        
        
        // === PLAYER (hand-drawn stick figure) ===
        const playerGraphics = this.add.graphics();
        playerGraphics.lineStyle(2, 0x1a1a1a);  // Black pen
        
        // Simple stick figure: head, body, legs
        // Head (circle)
        playerGraphics.strokeCircle(6, 4, 3);
        // Body (line down)
        playerGraphics.beginPath();
        playerGraphics.moveTo(6, 7);
        playerGraphics.lineTo(6, 14);
        playerGraphics.strokePath();
        // Arms (line across)
        playerGraphics.beginPath();
        playerGraphics.moveTo(2, 10);
        playerGraphics.lineTo(10, 10);
        playerGraphics.strokePath();
        // Legs (two lines)
        playerGraphics.beginPath();
        playerGraphics.moveTo(6, 14);
        playerGraphics.lineTo(3, 20);
        playerGraphics.moveTo(6, 14);
        playerGraphics.lineTo(9, 20);
        playerGraphics.strokePath();
        
        playerGraphics.generateTexture('player', 12, 22);
        playerGraphics.destroy();
        
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
        const bulletGraphics = this.add.graphics();
        bulletGraphics.lineStyle(2, 0x1a1a1a);  // Black pen stroke
        bulletGraphics.beginPath();
        bulletGraphics.moveTo(0, 2);
        bulletGraphics.lineTo(8, 2);
        bulletGraphics.strokePath();
        bulletGraphics.generateTexture('bullet', 10, 4);
        bulletGraphics.destroy();
        
        // Now create the group that uses the texture
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });
        
        
        // === ENEMIES ===
        // === ENEMY (hand-drawn stick figure in red) ===
        const enemyGraphics = this.add.graphics();
        enemyGraphics.lineStyle(2, 0xcc3333);  // Red pen
        
        // Same stick figure shape as player
        // Head (circle)
        enemyGraphics.strokeCircle(6, 4, 3);
        // Body (line down)
        enemyGraphics.beginPath();
        enemyGraphics.moveTo(6, 7);
        enemyGraphics.lineTo(6, 14);
        enemyGraphics.strokePath();
        // Arms (line across)
        enemyGraphics.beginPath();
        enemyGraphics.moveTo(2, 10);
        enemyGraphics.lineTo(10, 10);
        enemyGraphics.strokePath();
        // Legs (two lines)
        enemyGraphics.beginPath();
        enemyGraphics.moveTo(6, 14);
        enemyGraphics.lineTo(3, 20);
        enemyGraphics.moveTo(6, 14);
        enemyGraphics.lineTo(9, 20);
        enemyGraphics.strokePath();
        
        enemyGraphics.generateTexture('enemy', 12, 22);
        enemyGraphics.destroy();
        
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
        this.add.text(60, 16, 'Arrows: move | Up: jump | Click: shoot', {
            fontSize: '11px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
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
            const platform = this.platforms.create(plat.x, plat.y, plat.shape);
            
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
        
        const speed = 120;  // Scaled down for smaller characters
        const jumpVelocity = -280;  // Scaled down - smaller jump for zoomed-out feel
        
        // Left/Right movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
        } else {
            // No arrow pressed - stop horizontal movement
            this.player.setVelocityX(0);
        }
        
        // Jumping - only allow when touching the ground
        // blocked.down means something is directly below the player
        if (this.cursors.up.isDown && this.player.body.blocked.down) {
            this.player.setVelocityY(jumpVelocity);
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

