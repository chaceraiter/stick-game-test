/**
 * Main game configuration
 * This file initializes Phaser with our settings and scenes
 */

const config = {
    type: Phaser.AUTO,  // Automatically choose WebGL or Canvas
    width: 550,   // Notebook paper proportions (portrait-ish, ~8.5:11 ratio)
    height: 700,
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

