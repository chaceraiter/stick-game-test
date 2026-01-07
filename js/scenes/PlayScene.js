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
        this.load.image('weapon-pistol', 'assets/weapons/pistol.png');
        this.load.image('weapon-shotgun', 'assets/weapons/shotgun.png');
        this.load.image('weapon-smg', 'assets/weapons/smg.png');
        this.load.image('weapon-hunting-rifle', 'assets/weapons/hunting-rifle.png');
        this.load.image('weapon-auto-rifle', 'assets/weapons/auto-rifle.png');
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
        // Regenerate so small sprite tweaks show up after restart.
        if (this.textures.exists('player')) this.textures.remove('player');
        {
            const playerGraphics = this.add.graphics();
            playerGraphics.lineStyle(1.5, 0x1a1a1a);  // Black pen

            // Base pose faces right (we flipX when facing left)
            // Head (circle)
            playerGraphics.strokeCircle(4.5, 3, 2.25);

            // Nose (tiny stroke to show facing direction)
            playerGraphics.beginPath();
            playerGraphics.moveTo(6.5, 3.0);
            playerGraphics.lineTo(7.6, 3.4);
            playerGraphics.strokePath();

            // Body (line down)
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 5.25);
            playerGraphics.lineTo(4.5, 10.5);
            playerGraphics.strokePath();

            // Arms (slightly forward to the right)
            playerGraphics.beginPath();
            playerGraphics.moveTo(1.5, 7.5);
            playerGraphics.lineTo(4.5, 7.7);
            playerGraphics.lineTo(7.5, 7.2);
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

        // Stance sprites are tiny; regenerate them each scene create so tweaks show up after restart.
        if (this.textures.exists('player-crouch')) this.textures.remove('player-crouch');
        {
            const playerGraphics = this.add.graphics();
            playerGraphics.lineStyle(1.5, 0x1a1a1a);

            // Crouch: ~60% standing height, same width (9x10)
            // Head
            playerGraphics.strokeCircle(4.5, 2.6, 2.1);

            // Nose (tiny stroke to show facing direction)
            playerGraphics.beginPath();
            playerGraphics.moveTo(6.4, 2.6);
            playerGraphics.lineTo(7.5, 3.0);
            playerGraphics.strokePath();

            // Torso
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 4.8);
            playerGraphics.lineTo(4.5, 6.6);
            playerGraphics.strokePath();

            // Arms (tucked in)
            playerGraphics.beginPath();
            playerGraphics.moveTo(2.1, 5.7);
            playerGraphics.lineTo(4.5, 6.2);
            playerGraphics.lineTo(6.9, 5.8);
            playerGraphics.strokePath();

            // Bent legs
            playerGraphics.beginPath();
            playerGraphics.moveTo(4.5, 6.6);
            playerGraphics.lineTo(3.2, 8.0);
            playerGraphics.lineTo(2.6, 9.8);
            playerGraphics.moveTo(4.5, 6.6);
            playerGraphics.lineTo(5.8, 8.0);
            playerGraphics.lineTo(6.4, 9.8);
            playerGraphics.strokePath();

            playerGraphics.generateTexture('player-crouch', 9, 10);
            playerGraphics.destroy();
        }

        if (this.textures.exists('player-prone')) this.textures.remove('player-prone');
        {
            const playerGraphics = this.add.graphics();
            playerGraphics.lineStyle(1.5, 0x1a1a1a);

            // Prone: roughly standing hitbox rotated (17x9)
            // Base pose faces left (we flipX when facing right)
            const y = 4.5;

            // Head (left)
            playerGraphics.strokeCircle(3.0, y, 2.0);

            // Nose (tiny stroke to show facing direction)
            playerGraphics.beginPath();
            playerGraphics.moveTo(1.0, y - 0.1);
            playerGraphics.lineTo(0.2, y - 0.6);
            playerGraphics.strokePath();

            // Torso (horizontal)
            playerGraphics.beginPath();
            playerGraphics.moveTo(5.2, y);
            playerGraphics.lineTo(13.8, y);
            playerGraphics.strokePath();

            // Arm (forward/down)
            playerGraphics.beginPath();
            playerGraphics.moveTo(6.2, y);
            playerGraphics.lineTo(0.4, y + 2.2);
            playerGraphics.strokePath();

            // Legs (two lines, trailing right)
            playerGraphics.beginPath();
            playerGraphics.moveTo(12.8, y);
            playerGraphics.lineTo(16.0, y - 2.3);
            playerGraphics.moveTo(12.8, y);
            playerGraphics.lineTo(16.0, y + 2.3);
            playerGraphics.strokePath();

            playerGraphics.generateTexture('player-prone', 17, 9);
            playerGraphics.destroy();
        }
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');

        // Player stance state (stand -> crouch -> prone)
        this.currentStance = 'stand';
        this.nextStanceChangeTime = 0;
        this.applyStance(this.currentStance);

        // Keep player above most environment visuals
        this.player.setDepth(10);
        
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
        this.crosshair.setDepth(20);

        // === GUN SPRITE (visual only) ===
        if (!this.textures.exists('gun')) {
            const gunGraphics = this.add.graphics();
            gunGraphics.fillStyle(0x8B5A2B, 1); // Brown
            gunGraphics.fillRect(0, 0, 10, 2); // ~1.5x arm length
            gunGraphics.generateTexture('gun', 10, 2);
            gunGraphics.destroy();
        }
        this.gun = this.add.image(0, 0, 'gun');
        this.gun.setOrigin(0, 0.5); // Left end anchors at chest
        this.gun.setDepth(11);

        // === JET FLAME (jump pack visual) ===
        if (!this.textures.exists('jet-flame')) {
            const flameGraphics = this.add.graphics();
            flameGraphics.fillStyle(0xff7a00, 1);
            flameGraphics.fillTriangle(0, 0, 0, 6, 8, 3);
            flameGraphics.generateTexture('jet-flame', 8, 6);
            flameGraphics.destroy();
        }
        this.jetFlame = this.add.image(-1000, -1000, 'jet-flame');
        this.jetFlame.setOrigin(0.5);
        this.jetFlame.setDepth(9);
        this.jetFlame.setVisible(false);
        
        // Aim state - angle in radians (0 = right, increases counterclockwise)
        this.aimAngle = 0;
        this.aimDistance = this.currentWeapon.crosshairDistance;
        this.facing = 1; // 1 = right, -1 = left
        this.updateGunTransform();
        this.updateFacingFromAim();

        this.facingDebugGraphics = this.add.graphics();
        this.facingDebugGraphics.setDepth(30);
        
        
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
        this.quickTurnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

        // Grapple (N)
        this.grappleKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
        this.nextGrappleTime = 0;
        this.grappleActive = false;
        this.grappleAnchor = null;
        this.grappleRopeLength = 0;
        this.grappleShotUntil = 0;
        this.grappleShotFadeMs = 350;
        this.grappleShotStart = null;
        this.grappleShotEnd = null;
        this.grappleGraphics = this.add.graphics();
        this.grappleGraphics.setDepth(15);

        // Jump pack testing (spammable)
        this.jumpPackKeys = {
            impulse: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I),
            thrust: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O)
        };
        this.jumpPackThrustActiveUntil = 0;
        this.jumpPackImpulseFlameUntil = 0;
        
        // Mouse click to shoot (or continue after level complete)
        this.input.on('pointerdown', (pointer) => {
            if (this.levelInProgress) {
                // Shoot toward crosshair position (not mouse)
                this.tryShoot(this.crosshair.x, this.crosshair.y);
                this.isPointerDown = true;
            } else {
                // Level is complete, click to start next level
                this.startNextLevel();
            }
        });
        this.input.on('pointerup', () => {
            this.isPointerDown = false;
        });
        
        // Spacebar to shoot (keyboard alternative)
        this.shootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.reloadKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.canShoot = true;  // Prevent holding space for auto-fire
        this.nextShotTime = 0;
        this.isPointerDown = false;

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
            bulletGraphics.fillStyle(0x1a1a1a, 1);
            bulletGraphics.fillRect(0, 0, 2, 2);
            bulletGraphics.generateTexture('bullet', 2, 2);
            bulletGraphics.destroy();
        }
        
        // Now create the group that uses the texture
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });

        // Bullets should disappear when they hit platforms or walls
        this.physics.add.overlap(this.bullets, this.platforms, this.bulletHitEnvironment, null, this);
        this.physics.add.overlap(this.bullets, this.walls, this.bulletHitEnvironment, null, this);
        
        
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
        this.add.text(60, 16, 'WASD: move | W/S: stance (W jumps if standing) | J/K: aim | L: quick turn | I/O: jump pack | N: grapple | Space/Click: shoot | E: reload | R/G/F/H: debug', {
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

        this.ammoText = this.add.text(60, 64, '', {
            fontSize: '11px',
            fill: '#333',
            backgroundColor: 'rgba(255,255,255,0.8)',
            padding: { x: 4, y: 2 }
        });
        
        this.weaponImage = this.add.image(610, 50, this.getWeaponImageKey(this.currentWeaponSlot));
        this.weaponImage.setOrigin(0.5);
        this.weaponImage.setScale(0.6);
        
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
        this.layoutText = this.add.text(60, 80, `Layout: ${this.currentLayoutIndex + 1}/${LEVEL_LAYOUTS.length}`, {
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

        // Ammo state per weapon slot (infinite reserve ammo for now)
        this.weaponAmmo = {};
        this.ensureWeaponAmmoState(this.currentWeaponSlot);
        this.updateAmmoText();
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
        // Disable the bullet so it can't hit multiple things (robust pooled-bullet pattern)
        bullet.disableBody(true, true);
        
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
            bullet.disableBody(true, true);
        });

        this.releaseGrapple();
        
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

        this.releaseGrapple();
        
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
            // flyToggled is handled internally by DebugControls
        }

        // Keep facing synced even when aim isn't moving (affects movement penalty + debug vector)
        this.updateFacingFromAim();

        const deltaSeconds = this.game.loop.delta / 1000;
        
        const speed = 120;  // Scaled down for smaller characters
        const flySpeed = 200;  // Speed when flying
        const jumpVelocity = -120;  // ~8-9px jump apex with gravity=800 (about half the 17px player height)
        
        // Left/Right movement (arrows or WASD)
        const flyMode = this.debugControls.isFlyMode();
        const leftDown = this.cursors.left.isDown || this.wasd.left.isDown;
        const rightDown = this.cursors.right.isDown || this.wasd.right.isDown;
        const upDown = this.cursors.up.isDown || this.wasd.up.isDown;
        const downDown = this.cursors.down.isDown || this.wasd.down.isDown;

        const upJustDown =
            Phaser.Input.Keyboard.JustDown(this.wasd.up) ||
            Phaser.Input.Keyboard.JustDown(this.cursors.up);
        const downJustDown =
            Phaser.Input.Keyboard.JustDown(this.wasd.down) ||
            Phaser.Input.Keyboard.JustDown(this.cursors.down);

        // Grapple toggle (N)
        if (Phaser.Input.Keyboard.JustDown(this.grappleKey)) {
            if (this.grappleActive) {
                this.releaseGrapple();
            } else {
                this.tryDeployGrapple();
            }
        }
        
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
            // Reeling uses W/S while grapple is active (so skip stance changes in that state)
            if (!this.grappleActive) {
                // Stance changes (W=up stance, S=down stance), with cooldown between changes
                if (upJustDown && this.currentStance !== 'stand') {
                    this.tryChangeStance('up');
                } else if (downJustDown && this.currentStance !== 'prone') {
                    this.tryChangeStance('down');
                }
            }

            // Quick 180 turn without rotating all the way around (crouch/stand only)
            if (Phaser.Input.Keyboard.JustDown(this.quickTurnKey) && this.currentStance !== 'prone') {
                this.aimAngle = Phaser.Math.Angle.Wrap(Math.PI - this.aimAngle);
                this.updateFacingFromAim();
            }

            const moveDir = (rightDown ? 1 : 0) - (leftDown ? 1 : 0);
            if (this.grappleActive) {
                this.applyGrapplePump(moveDir, deltaSeconds);
            } else {
                const stanceSpeedMultiplier = this.getStanceSpeedMultiplier();
                if (moveDir !== 0) {
                    const baseSpeed = speed * stanceSpeedMultiplier;
                    const forwardMultiplier = 1;
                    const backwardMultiplier = 0.5;
                    const facingMultiplier = moveDir === this.facing ? forwardMultiplier : backwardMultiplier;
                    this.player.setVelocityX(baseSpeed * moveDir * facingMultiplier);
                } else {
                    // No key pressed - stop horizontal movement
                    this.player.setVelocityX(0);
                }
            }
            
            // Normal mode: W/Up jumps only if already standing
            if (!this.grappleActive && this.currentStance === 'stand' && upJustDown && this.player.body.blocked.down) {
                this.player.setVelocityY(jumpVelocity);
            }
        }

        // Jump pack testing:
        // - I: short high-power upward kick (instant velocity set)
        // - O: upward thrust for a short duration (adds upward acceleration over time)
        if (Phaser.Input.Keyboard.JustDown(this.jumpPackKeys.impulse)) {
            this.activateJumpPackImpulse();
        }
        if (Phaser.Input.Keyboard.JustDown(this.jumpPackKeys.thrust)) {
            this.activateJumpPackThrust(250);
        }

        const now = this.time.now;
        if (now < this.jumpPackThrustActiveUntil) {
            const dt = this.game.loop.delta / 1000;
            const thrustAccel = 1800; // px/s^2 upward
            this.player.body.velocity.y -= thrustAccel * dt;
            this.player.body.velocity.y = Math.max(this.player.body.velocity.y, -450);
        }

        // Grapple reeling (W in, S out)
        if (this.grappleActive) {
            const dt = this.game.loop.delta / 1000;
            const reelSpeed = 120; // px/s
            if (upDown) {
                this.grappleRopeLength -= reelSpeed * dt;
            }
            if (downDown) {
                this.grappleRopeLength += reelSpeed * dt;
            }
            const minLen = 10;
            const maxLen = this.getMaxGrappleRange();
            this.grappleRopeLength = Phaser.Math.Clamp(this.grappleRopeLength, minLen, maxLen);
        }
        
        // Rotate aim with J/K keys
        const deltaTime = this.game.loop.delta / 1000;  // Convert ms to seconds
        if (this.aimKeys.rotateLeft.isDown) {
            this.aimAngle -= this.aimRotationSpeed * deltaTime;
        }
        if (this.aimKeys.rotateRight.isDown) {
            this.aimAngle += this.aimRotationSpeed * deltaTime;
        }
        this.aimAngle = Phaser.Math.Angle.Wrap(this.aimAngle);
        this.updateFacingFromAim();
        
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

        // Manual reload (E)
        if (Phaser.Input.Keyboard.JustDown(this.reloadKey)) {
            this.startReload(this.currentWeaponSlot);
        }
        
        // Spacebar shooting
        if (this.levelInProgress) {
            const fireMode = this.currentWeapon.fireMode;
            if (fireMode === 'auto') {
                if (this.shootKey.isDown) {
                    this.tryShoot(this.crosshair.x, this.crosshair.y);
                }
                if (this.isPointerDown) {
                    this.tryShoot(this.crosshair.x, this.crosshair.y);
                }
            } else {
                if (this.shootKey.isDown && this.canShoot) {
                    if (this.tryShoot(this.crosshair.x, this.crosshair.y)) {
                        this.canShoot = false;
                    }
                }
                if (this.shootKey.isUp) {
                    this.canShoot = true;
                }
            }
        }
        
        // Grapple constraint can move the player; apply it before dependent visuals (crosshair/gun/rope)
        this.applyGrappleConstraint();

        // Update crosshair position (orbits player at fixed distance)
        this.crosshair.x = this.player.x + Math.cos(this.aimAngle) * this.aimDistance;
        this.crosshair.y = this.player.y + Math.sin(this.aimAngle) * this.aimDistance;
        this.updateGunTransform();
        this.drawFacingDebug();
        this.updateJetFlame();
        this.drawGrapple();
        
        // Clean up bullets that have left the screen
        this.bullets.children.each((bullet) => {
            if (bullet.active && (bullet.x < -50 || bullet.x > 750 || bullet.y < -50 || bullet.y > 950)) {
                bullet.disableBody(true, true);
            }
        });
    }
    
    getCrosshairKey(gap) {
        return `crosshair-gap-${gap}`;
    }
    
    getWeaponImageKey(slot) {
        switch (slot) {
            case 1:
                return 'weapon-pistol';
            case 2:
                return 'weapon-shotgun';
            case 3:
                return 'weapon-smg';
            case 4:
                return 'weapon-hunting-rifle';
            case 5:
                return 'weapon-auto-rifle';
            default:
                return 'weapon-pistol';
        }
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

        this.ensureWeaponAmmoState(slot);
        
        const crosshairKey = this.getCrosshairKey(this.currentWeapon.crosshairGap);
        this.ensureCrosshairTexture(crosshairKey, this.currentWeapon.crosshairGap);
        this.crosshair.setTexture(crosshairKey);
        if (this.weaponText) {
            this.weaponText.setText(`Weapon: ${this.currentWeapon.name}`);
        }
        if (this.weaponImage) {
            this.weaponImage.setTexture(this.getWeaponImageKey(slot));
        }
        this.updateAmmoText();
    }

    tryShoot(targetX, targetY) {
        const ammoState = this.ensureWeaponAmmoState(this.currentWeaponSlot);
        if (ammoState.isReloading) {
            return false;
        }
        if (ammoState.ammoInMag <= 0) {
            this.startReload(this.currentWeaponSlot);
            return false;
        }

        const now = this.time.now;
        const fireRate = this.currentWeapon.fireRate;
        if (!fireRate || fireRate <= 0) {
            return false;
        }
        const shotDelay = 1000 / fireRate;
        if (now < this.nextShotTime) {
            return false;
        }
        this.nextShotTime = now + shotDelay;
        this.shoot(targetX, targetY);

        ammoState.ammoInMag = Math.max(0, ammoState.ammoInMag - 1);
        this.updateAmmoText();
        return true;
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
        const gapRadius = this.currentWeapon.crosshairGap / 2;
        const coneHalfAngle = Math.atan(gapRadius / this.aimDistance);
        
        for (let i = 0; i < pelletCount; i++) {
            const bullet = this.bullets.get(this.player.x, this.player.y);
            if (!bullet) return;  // No bullets available
            
            bullet.enableBody(true, this.player.x, this.player.y, true, true);
            bullet.setScale(this.currentWeapon.projectileSize);
            bullet.body.setSize(1, 1, true);
            
            const angle = baseAngle + Phaser.Math.FloatBetween(-coneHalfAngle, coneHalfAngle);
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

    bulletHitEnvironment(bullet) {
        bullet.disableBody(true, true);
    }

    getGunMountOffset() {
        if (this.currentStance === 'stand') return { x: 0, y: -1 };
        if (this.currentStance === 'crouch') return { x: 0, y: 0 };
        if (this.currentStance === 'prone') return { x: 0, y: 0 };
        return { x: 0, y: 0 };
    }

    updateGunTransform() {
        if (!this.gun || !this.player) return;
        const offset = this.getGunMountOffset();
        this.gun.setPosition(this.player.x + offset.x, this.player.y + offset.y);
        this.gun.setRotation(this.aimAngle);
    }

    updateFacingFromAim() {
        if (!this.player) return;
        const newFacing = Math.cos(this.aimAngle) >= 0 ? 1 : -1;
        if (newFacing === this.facing) return;
        this.facing = newFacing;
        this.player.setFlipX(this.facing === -1);
    }

    getHeadWorldPosition() {
        if (!this.player || !this.player.body) return { x: this.player.x, y: this.player.y };

        if (this.currentStance === 'prone') {
            const headInset = 3;
            const headX = this.facing === 1 ? this.player.body.right - headInset : this.player.body.left + headInset;
            const headY = this.player.body.top + (this.player.body.height / 2);
            return { x: headX, y: headY };
        }

        const headX = this.player.body.center.x;
        const headY = this.player.body.top + 3;
        return { x: headX, y: headY };
    }

    drawFacingDebug() {
        if (!this.facingDebugGraphics) return;
        this.facingDebugGraphics.clear();

        const head = this.getHeadWorldPosition();
        const length = 7;
        const endX = head.x + this.facing * length;
        const endY = head.y;

        this.facingDebugGraphics.lineStyle(2, 0xff00ff, 0.9);
        this.facingDebugGraphics.beginPath();
        this.facingDebugGraphics.moveTo(head.x, head.y);
        this.facingDebugGraphics.lineTo(endX, endY);
        this.facingDebugGraphics.strokePath();

        this.facingDebugGraphics.fillStyle(0xff00ff, 0.9);
        this.facingDebugGraphics.fillCircle(endX, endY, 1.3);
    }

    activateJumpPackImpulse() {
        const kickVelocity = -320;
        this.player.setVelocityY(kickVelocity);
        this.jumpPackImpulseFlameUntil = this.time.now + 140;
    }

    activateJumpPackThrust(durationMs) {
        this.jumpPackThrustActiveUntil = this.time.now + durationMs;
    }

    updateJetFlame() {
        if (!this.jetFlame || !this.player || !this.player.body) return;

        const now = this.time.now;
        const active = now < this.jumpPackThrustActiveUntil || now < this.jumpPackImpulseFlameUntil;
        if (!active) {
            this.jetFlame.setVisible(false);
            return;
        }

        const backInset = 2;
        const flameX = this.facing === 1 ? this.player.body.left - backInset : this.player.body.right + backInset;
        const flameY = this.player.body.center.y;
        this.jetFlame.setPosition(flameX, flameY);
        this.jetFlame.setRotation(this.facing === 1 ? Math.PI : 0);
        this.jetFlame.setVisible(true);
    }

    getMaxGrappleRange() {
        // Player is 17px tall; 5–7x that is ~85–120px
        return 17 * 6;
    }

    getGrappleMountWorldPosition() {
        if (!this.player || !this.player.body) return { x: this.player.x, y: this.player.y };
        const x = this.player.body.center.x;
        const y = this.player.body.top + (this.player.body.height * 0.35);
        return { x, y };
    }

    tryDeployGrapple() {
        const now = this.time.now;
        if (now < this.nextGrappleTime) return false;
        this.nextGrappleTime = now + 2000;

        const start = this.getGrappleMountWorldPosition();
        const maxRange = this.getMaxGrappleRange();
        const end = {
            x: start.x + Math.cos(this.aimAngle) * maxRange,
            y: start.y + Math.sin(this.aimAngle) * maxRange
        };

        const hit = this.findGrappleHit(start, end);
        if (!hit) {
            this.grappleShotUntil = now + this.grappleShotFadeMs;
            this.grappleShotStart = { x: start.x, y: start.y };
            this.grappleShotEnd = { x: end.x, y: end.y };
            return false;
        }
        this.grappleShotUntil = 0;
        this.grappleShotStart = null;
        this.grappleShotEnd = null;

        this.grappleActive = true;
        this.grappleAnchor = { x: hit.x, y: hit.y };
        this.grappleRopeLength = Phaser.Math.Distance.Between(start.x, start.y, hit.x, hit.y);
        return true;
    }

    releaseGrapple() {
        this.grappleActive = false;
        this.grappleAnchor = null;
        this.grappleRopeLength = 0;
        if (this.grappleGraphics) this.grappleGraphics.clear();
    }

    applyGrappleConstraint() {
        if (!this.grappleActive || !this.grappleAnchor || !this.player || !this.player.body) return;
        const mount = this.getGrappleMountWorldPosition();
        const dx = mount.x - this.grappleAnchor.x;
        const dy = mount.y - this.grappleAnchor.y;
        const dist = Math.hypot(dx, dy);
        if (dist <= 0.0001) return;

        const nx = dx / dist;
        const ny = dy / dist;

        const desiredMountX = this.grappleAnchor.x + nx * this.grappleRopeLength;
        const desiredMountY = this.grappleAnchor.y + ny * this.grappleRopeLength;
        const offsetX = desiredMountX - mount.x;
        const offsetY = desiredMountY - mount.y;

        if (Math.abs(offsetX) > 0.01 || Math.abs(offsetY) > 0.01) {
            const prevVelX = this.player.body.velocity.x;
            const prevVelY = this.player.body.velocity.y;
            this.player.body.reset(this.player.x + offsetX, this.player.y + offsetY);
            this.player.body.velocity.x = prevVelX;
            this.player.body.velocity.y = prevVelY;
        }

        const vel = this.player.body.velocity;
        const radialVel = vel.x * nx + vel.y * ny;
        vel.x -= radialVel * nx;
        vel.y -= radialVel * ny;
    }

    applyGrapplePump(moveDir, dt) {
        if (!this.grappleActive || !this.grappleAnchor || !this.player || !this.player.body) return;
        if (moveDir === 0) return;

        const mount = this.getGrappleMountWorldPosition();
        const dx = mount.x - this.grappleAnchor.x;
        const dy = mount.y - this.grappleAnchor.y;
        const dist = Math.hypot(dx, dy);
        if (dist <= 0.0001) return;

        const nx = dx / dist;
        const ny = dy / dist;

        // Pump only when the rope is roughly taut (avoids turning this into air-control when slack).
        if (dist < this.grappleRopeLength * 0.98) return;

        // Tangent direction (perpendicular to rope). This is the "swing pump" direction.
        const tangentX = ny;
        const tangentY = -nx;

        const pumpAccel = 900; // px/s^2
        this.player.body.velocity.x += tangentX * pumpAccel * dt * moveDir;
        this.player.body.velocity.y += tangentY * pumpAccel * dt * moveDir;

        const maxSpeed = 520;
        const vel = this.player.body.velocity;
        const speed = Math.hypot(vel.x, vel.y);
        if (speed > maxSpeed) {
            vel.x = (vel.x / speed) * maxSpeed;
            vel.y = (vel.y / speed) * maxSpeed;
        }
    }

    drawGrapple() {
        if (!this.grappleGraphics) return;
        this.grappleGraphics.clear();

        if (this.grappleActive && this.grappleAnchor) {
            const mount = this.getGrappleMountWorldPosition();
            this.grappleGraphics.lineStyle(1.5, 0x333333, 0.9);
            this.grappleGraphics.beginPath();
            this.grappleGraphics.moveTo(mount.x, mount.y);
            this.grappleGraphics.lineTo(this.grappleAnchor.x, this.grappleAnchor.y);
            this.grappleGraphics.strokePath();

            this.grappleGraphics.fillStyle(0x333333, 0.9);
            this.grappleGraphics.fillCircle(this.grappleAnchor.x, this.grappleAnchor.y, 2);
            return;
        }

        // Brief failed-shot line when grapple misses
        const now = this.time.now;
        if (now < this.grappleShotUntil && this.grappleShotStart && this.grappleShotEnd) {
            const t = (this.grappleShotUntil - now) / this.grappleShotFadeMs;
            const alpha = Phaser.Math.Clamp(t, 0, 1);
            this.grappleGraphics.lineStyle(2, 0xff7a00, 0.85 * alpha);
            this.grappleGraphics.beginPath();
            this.grappleGraphics.moveTo(this.grappleShotStart.x, this.grappleShotStart.y);
            this.grappleGraphics.lineTo(this.grappleShotEnd.x, this.grappleShotEnd.y);
            this.grappleGraphics.strokePath();
        }
    }

    findGrappleHit(start, end) {
        const candidates = [];

        for (const obj of this.platforms.getChildren()) {
            if (obj.body) candidates.push(obj.body);
        }
        for (const obj of this.walls.getChildren()) {
            if (obj.body) candidates.push(obj.body);
        }

        let best = null;
        for (const body of candidates) {
            const rect = new Phaser.Geom.Rectangle(body.x, body.y, body.width, body.height);
            const hit = this.segmentRectIntersection(start.x, start.y, end.x, end.y, rect);
            if (!hit) continue;
            if (!best || hit.t < best.t) best = hit;
        }

        return best ? { x: best.x, y: best.y } : null;
    }

    segmentRectIntersection(x1, y1, x2, y2, rect) {
        const edges = [
            [rect.left, rect.top, rect.right, rect.top],
            [rect.right, rect.top, rect.right, rect.bottom],
            [rect.right, rect.bottom, rect.left, rect.bottom],
            [rect.left, rect.bottom, rect.left, rect.top]
        ];

        let best = null;
        for (const [x3, y3, x4, y4] of edges) {
            const hit = this.segmentIntersection(x1, y1, x2, y2, x3, y3, x4, y4);
            if (!hit) continue;
            if (!best || hit.t < best.t) best = hit;
        }
        return best;
    }

    segmentIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
        const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (Math.abs(denom) < 1e-9) return null;

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
        const u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / denom;

        if (t < 0 || t > 1 || u < 0 || u > 1) return null;

        return {
            x: x1 + t * (x2 - x1),
            y: y1 + t * (y2 - y1),
            t
        };
    }

    getStanceSpeedMultiplier() {
        if (this.currentStance === 'crouch') return 0.7;
        if (this.currentStance === 'prone') return 0.45;
        return 1;
    }

    tryChangeStance(direction) {
        const now = this.time.now;
        if (now < this.nextStanceChangeTime) return false;

        const oldStance = this.currentStance;
        let newStance = oldStance;

        if (direction === 'down') {
            if (oldStance === 'stand') newStance = 'crouch';
            else if (oldStance === 'crouch') newStance = 'prone';
        } else if (direction === 'up') {
            if (oldStance === 'prone') newStance = 'crouch';
            else if (oldStance === 'crouch') newStance = 'stand';
        }

        if (newStance === oldStance) return false;

        this.currentStance = newStance;
        this.applyStance(newStance);
        this.nextStanceChangeTime = now + 250;
        return true;
    }

    applyStance(stance) {
        const x = this.player.x;
        const oldBottom = this.player.body ? this.player.body.bottom : this.player.y;
        const velocityX = this.player.body.velocity.x;
        const velocityY = this.player.body.velocity.y;

        if (stance === 'stand') {
            this.player.setTexture('player');
            this.player.body.setSize(9, 17, false);
            this.player.body.setOffset(0, 0);
        } else if (stance === 'crouch') {
            this.player.setTexture('player-crouch');
            this.player.body.setSize(9, 10, false);
            this.player.body.setOffset(0, 0);
        } else if (stance === 'prone') {
            this.player.setTexture('player-prone');
            this.player.body.setSize(17, 9, false);
            this.player.body.setOffset(0, 0);
        }

        // Keep physics stable after body size changes
        this.player.body.reset(x, this.player.y);
        const newBottom = this.player.body.bottom;
        const delta = oldBottom - newBottom;
        if (Math.abs(delta) > 0.01) {
            this.player.y += delta;
            this.player.body.reset(x, this.player.y);
        }
        this.player.setVelocity(velocityX, velocityY);
        this.updateFacingFromAim();
    }

    ensureWeaponAmmoState(slot) {
        if (this.weaponAmmo[slot]) return this.weaponAmmo[slot];
        const weapon = getWeaponBySlot(slot);
        const magSize = weapon.magSize ?? Infinity;
        this.weaponAmmo[slot] = {
            ammoInMag: Number.isFinite(magSize) ? magSize : Infinity,
            isReloading: false,
            reloadTimer: null
        };
        return this.weaponAmmo[slot];
    }

    updateAmmoText() {
        if (!this.ammoText) return;
        const weapon = this.currentWeapon;
        const ammoState = this.ensureWeaponAmmoState(this.currentWeaponSlot);
        const magSize = weapon.magSize ?? Infinity;
        if (!Number.isFinite(magSize)) {
            this.ammoText.setText('Ammo: ∞');
            return;
        }
        const base = `Ammo: ${ammoState.ammoInMag}/${magSize}`;
        this.ammoText.setText(ammoState.isReloading ? `${base} (reloading)` : base);
    }

    startReload(slot) {
        const weapon = getWeaponBySlot(slot);
        const magSize = weapon.magSize ?? Infinity;
        if (!Number.isFinite(magSize)) return false;

        const ammoState = this.ensureWeaponAmmoState(slot);
        if (ammoState.isReloading) return false;
        if (ammoState.ammoInMag >= magSize) return false;

        const reloadTimeMs = weapon.reloadTimeMs ?? 0;
        if (reloadTimeMs <= 0) {
            ammoState.ammoInMag = magSize;
            this.updateAmmoText();
            return true;
        }

        ammoState.isReloading = true;
        if (ammoState.reloadTimer) {
            ammoState.reloadTimer.remove(false);
        }
        ammoState.reloadTimer = this.time.delayedCall(reloadTimeMs, () => {
            ammoState.ammoInMag = magSize;
            ammoState.isReloading = false;
            ammoState.reloadTimer = null;
            this.updateAmmoText();
        });
        this.updateAmmoText();
        return true;
    }
}
