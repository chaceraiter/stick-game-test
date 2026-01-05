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

