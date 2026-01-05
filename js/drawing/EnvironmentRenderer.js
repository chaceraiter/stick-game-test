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

