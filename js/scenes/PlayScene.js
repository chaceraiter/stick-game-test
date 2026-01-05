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
        // We'll load actual sprites later
        // For now, we'll draw simple shapes using Phaser's graphics
    }

    create() {
        // === WATER HAZARD ===
        // Water at the bottom of the screen - kills the player!
        const waterGraphics = this.add.graphics();
        waterGraphics.fillStyle(0x1a5276);  // Dark blue
        waterGraphics.fillRect(0, 0, 800, 60);
        waterGraphics.generateTexture('water', 800, 60);
        waterGraphics.destroy();
        
        // Water is just a visual sprite (we'll use a zone for collision)
        this.add.image(400, 570, 'water');
        
        // Add some wave effect on top of water
        const waveGraphics = this.add.graphics();
        waveGraphics.fillStyle(0x2980b9);  // Lighter blue
        waveGraphics.fillRect(0, 0, 800, 8);
        waveGraphics.generateTexture('wave', 800, 8);
        waveGraphics.destroy();
        this.add.image(400, 544, 'wave');
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(400, 580, 800, 40);
        this.physics.add.existing(this.waterZone, true);  // true = static body
        
        
        // === PLATFORMS ===
        this.platforms = this.physics.add.staticGroup();
        
        // Create platform textures
        const platGraphics = this.add.graphics();
        platGraphics.fillStyle(0x8B4513);  // Brown
        platGraphics.fillRect(0, 0, 150, 20);
        platGraphics.generateTexture('platform', 150, 20);
        platGraphics.destroy();
        
        const smallPlatGraphics = this.add.graphics();
        smallPlatGraphics.fillStyle(0x8B4513);
        smallPlatGraphics.fillRect(0, 0, 100, 20);
        smallPlatGraphics.generateTexture('platform-small', 100, 20);
        smallPlatGraphics.destroy();
        
        // Layout platforms - player needs places to stand and jump between
        // Bottom row (just above water)
        this.platforms.create(75, 520, 'platform');     // Far left
        this.platforms.create(400, 520, 'platform');    // Center
        this.platforms.create(725, 520, 'platform');    // Far right
        
        // Middle row
        this.platforms.create(200, 420, 'platform');
        this.platforms.create(600, 420, 'platform');
        
        // Upper row
        this.platforms.create(100, 320, 'platform-small');
        this.platforms.create(400, 320, 'platform');
        this.platforms.create(700, 320, 'platform-small');
        
        // Top row
        this.platforms.create(250, 220, 'platform-small');
        this.platforms.create(550, 220, 'platform-small')
        
        
        // === PLAYER ===
        // Create the player as a simple rectangle for now
        // Later we'll replace this with a proper stick figure sprite
        
        const playerGraphics = this.add.graphics();
        playerGraphics.fillStyle(0x2d2d2d);  // Dark gray (stick figure color)
        playerGraphics.fillRect(0, 0, 20, 40);  // Narrow and tall, like a person
        playerGraphics.generateTexture('player', 20, 40);
        playerGraphics.destroy();
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(75, 480, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        
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
        // Create bullet texture FIRST (small bright rectangle)
        const bulletGraphics = this.add.graphics();
        bulletGraphics.fillStyle(0xff0000);  // Red laser
        bulletGraphics.fillRect(0, 0, 12, 4);
        bulletGraphics.generateTexture('bullet', 12, 4);
        bulletGraphics.destroy();
        
        // Now create the group that uses the texture
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });
        
        
        // === ENEMIES ===
        // Create enemy texture (red-ish stick figure placeholder)
        const enemyGraphics = this.add.graphics();
        enemyGraphics.fillStyle(0xcc3333);  // Red-ish color
        enemyGraphics.fillRect(0, 0, 20, 40);
        enemyGraphics.generateTexture('enemy', 20, 40);
        enemyGraphics.destroy();
        
        // Create enemies group
        this.enemies = this.physics.add.group();
        
        // Spawn initial enemies on platforms
        this.spawnEnemy(725, 480);   // Bottom right platform
        this.spawnEnemy(400, 280);   // Upper middle platform
        this.spawnEnemy(200, 380);   // Middle left platform
        this.spawnEnemy(550, 180);   // Top right platform
        
        // Make enemies collide with platforms (so they sit on them)
        this.physics.add.collider(this.enemies, this.platforms);
        
        // Bullets hit enemies!
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        
        
        // === UI TEXT ===
        // Show some instructions
        this.add.text(16, 16, 'Arrow keys to move, Up to jump, Click to shoot', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
        });
        
        // Enemy counter
        this.enemyCountText = this.add.text(16, 50, '', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
        });
        this.updateEnemyCount();
        
        // Level complete text (hidden initially)
        this.levelCompleteText = this.add.text(400, 280, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 20, y: 10 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(400, 340, 'Click to continue', {
            fontSize: '20px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 5 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        
        // Level counter display
        this.levelText = this.add.text(700, 16, 'Level: 1', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
        });
        
        // Valid spawn positions (x, y) - on platforms only (no ground anymore!)
        this.spawnPoints = [
            // Bottom row platforms
            { x: 75, y: 480 },
            { x: 400, y: 480 },
            { x: 725, y: 480 },
            // Middle row
            { x: 200, y: 380 },
            { x: 600, y: 380 },
            // Upper row
            { x: 100, y: 280 },
            { x: 400, y: 280 },
            { x: 700, y: 280 },
            // Top row
            { x: 250, y: 180 },
            { x: 550, y: 180 },
        ];
        
        // Player start position (on left bottom platform)
        this.playerStartX = 75;
        this.playerStartY = 480;
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
     * Start the next level with random enemy positions
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
        
        // Spawn enemies at random positions
        // More enemies as levels progress (4 + 1 per 2 levels, max based on spawn points)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), this.spawnPoints.length - 1);
        
        // Filter out player start position from spawn points for enemies
        const enemySpawnPoints = this.spawnPoints.filter(
            p => !(p.x === this.playerStartX && p.y === this.playerStartY)
        );
        
        // Shuffle and pick
        const shuffled = Phaser.Utils.Array.Shuffle([...enemySpawnPoints]);
        for (let i = 0; i < enemyCount; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position
        this.player.setPosition(this.playerStartX, this.playerStartY);
        this.player.setVelocity(0, 0);
    }
    
    /**
     * Called when player touches water
     */
    playerDied() {
        // Reset player to start position
        this.player.setPosition(this.playerStartX, this.playerStartY);
        this.player.setVelocity(0, 0);
        
        // Brief visual feedback - flash the player
        this.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            this.player.clearTint();
        });
    }

    update() {
        // This runs every frame - handle player movement here
        
        const speed = 200;
        const jumpVelocity = -500;  // Negative because Y goes down in screen coords (higher = more negative)
        
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 850 || bullet.y < -50 || bullet.y > 650)) {
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

