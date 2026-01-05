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
import { getWeaponBySlot } from '../weapons/WeaponDefinitions.js';

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
        
        
        // === WEAPON STATE ===
        this.currentWeaponSlot = 1;
        this.currentWeapon = getWeaponBySlot(this.currentWeaponSlot);
        
        // === CROSSHAIR (aim indicator) ===
        const crosshairKey = this.getCrosshairKey(this.currentWeapon.crosshairGap);
        this.ensureCrosshairTexture(crosshairKey, this.currentWeapon.crosshairGap);
        
        // Create crosshair sprite
        this.crosshair = this.add.image(0, 0, crosshairKey);
        this.crosshair.setAlpha(0.7);  // Semi-transparent
        
        // Aim state - angle in radians (0 = right, increases counterclockwise)
        this.aimAngle = 0;
        this.aimDistance = this.currentWeapon.crosshairDistance;
        
        
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
        
        // Number keys for weapon switching (1-5)
        this.weaponKeys = {
            one: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE),
            two: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO),
            three: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE),
            four: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR),
            five: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE)
        };
        
        
        // === BULLETS ===
        // === BULLET (hand-drawn dash) ===
        if (!this.textures.exists('bullet')) {
            const bulletGraphics = this.add.graphics();
            bulletGraphics.lineStyle(2, 0x1a1a1a);  // Black pen stroke
            bulletGraphics.beginPath();
            bulletGraphics.moveTo(0, 1.5);
            bulletGraphics.lineTo(6, 1.5);
            bulletGraphics.strokePath();
            bulletGraphics.generateTexture('bullet', 8, 3);
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
        
        // Weapon display (small, tucked under enemy count)
        this.weaponText = this.add.text(60, 48, `Weapon: ${this.currentWeapon.name}`, {
            fontSize: '11px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
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
        this.layoutText = this.add.text(60, 64, `Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`, {
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
        
        if (flyMode) {
            const inputX = (rightDown ? 1 : 0) - (leftDown ? 1 : 0);
            const inputY = (downDown ? 1 : 0) - (upDown ? 1 : 0);
            if (inputX !== 0 || inputY !== 0) {
                const length = Math.hypot(inputX, inputY);
                this.player.setVelocity(
                    (inputX / length) * flySpeed,
                    (inputY / length) * flySpeed
                );
            } else {
                this.player.setVelocity(0, 0);
            }
        } else {
            if (leftDown) {
                this.player.setVelocityX(-speed);
            } else if (rightDown) {
                this.player.setVelocityX(speed);
            } else {
                // No key pressed - stop horizontal movement
                this.player.setVelocityX(0);
            }
            
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
        
        // Weapon switching (1-5)
        if (Phaser.Input.Keyboard.JustDown(this.weaponKeys.one)) {
            this.switchWeapon(1);
        } else if (Phaser.Input.Keyboard.JustDown(this.weaponKeys.two)) {
            this.switchWeapon(2);
        } else if (Phaser.Input.Keyboard.JustDown(this.weaponKeys.three)) {
            this.switchWeapon(3);
        } else if (Phaser.Input.Keyboard.JustDown(this.weaponKeys.four)) {
            this.switchWeapon(4);
        } else if (Phaser.Input.Keyboard.JustDown(this.weaponKeys.five)) {
            this.switchWeapon(5);
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
    
    getCrosshairKey(gap) {
        return `crosshair-gap-${gap}`;
    }
    
    ensureCrosshairTexture(key, gap) {
        if (this.textures.exists(key)) return;
        
        const crosshairGraphics = this.add.graphics();
        const size = 17;  // About player height
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
        
        crosshairGraphics.generateTexture(key, size, size);
        crosshairGraphics.destroy();
    }
    
    switchWeapon(slot) {
        if (this.currentWeaponSlot === slot) return;
        
        this.currentWeaponSlot = slot;
        this.currentWeapon = getWeaponBySlot(slot);
        this.aimDistance = this.currentWeapon.crosshairDistance;
        
        const crosshairKey = this.getCrosshairKey(this.currentWeapon.crosshairGap);
        this.ensureCrosshairTexture(crosshairKey, this.currentWeapon.crosshairGap);
        this.crosshair.setTexture(crosshairKey);
        if (this.weaponText) {
            this.weaponText.setText(`Weapon: ${this.currentWeapon.name}`);
        }
    }
    
    /**
     * Shoot a bullet toward a target position
     * @param {number} targetX - X coordinate to shoot toward
     * @param {number} targetY - Y coordinate to shoot toward
     */
    shoot(targetX, targetY) {
        // Calculate direction to target
        const baseAngle = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            targetX, targetY
        );
        
        const pelletCount = this.currentWeapon.pellets;
        const spread = this.currentWeapon.spread;
        const pelletSpreadStart = -spread / 2;
        const pelletSpreadStep = pelletCount > 1 ? (spread / (pelletCount - 1)) : 0;
        
        for (let i = 0; i < pelletCount; i++) {
            const bullet = this.bullets.get(this.player.x, this.player.y);
            if (!bullet) return;  // No bullets available
            
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.setScale(this.currentWeapon.projectileSize);
            
            const angle = baseAngle + (pelletSpreadStart + pelletSpreadStep * i);
            const directionX = Math.cos(angle);
            const directionY = Math.sin(angle);
            
            // Set bullet velocity toward target (normalized so diagonals are consistent)
            const bulletSpeed = this.currentWeapon.velocity;
            bullet.setVelocity(
                directionX * bulletSpeed,
                directionY * bulletSpeed
            );
            
            // Rotate bullet to face direction of travel
            bullet.setRotation(angle);
            
            // Bullets shouldn't be affected by gravity
            bullet.body.allowGravity = false;
        }
    }
}
