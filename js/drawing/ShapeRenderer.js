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

