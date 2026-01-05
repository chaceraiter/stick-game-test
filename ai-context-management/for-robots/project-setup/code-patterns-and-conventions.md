# Code Patterns and Conventions

## General Style

- **Language:** JavaScript (ES6+)
- **Modules:** ES6 modules (`import`/`export`)
- **Naming:** camelCase for variables/functions, PascalCase for classes
- **Comments:** Explain *why*, not *what*. Code should be self-documenting where possible.

## Phaser-Specific Patterns

### Scene Structure

```javascript
class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    preload() {
        // Load assets here
    }

    create() {
        // Set up game objects, physics, input
    }

    update(time, delta) {
        // Game loop logic (called every frame)
    }
}
```

### Entity Classes

Game entities extend Phaser.GameObjects.Sprite (or Physics.Arcade.Sprite for physics-enabled entities):

```javascript
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        
        // Add to scene and enable physics
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Player-specific setup
        this.setCollideWorldBounds(true);
    }

    update() {
        // Per-frame player logic
    }
}
```

### Input Handling

Use Phaser's input system, typically set up in scene's `create()`:

```javascript
this.cursors = this.input.keyboard.createCursorKeys();
this.shootKey = this.input.keyboard.addKey('SPACE');
```

Check in `update()`:

```javascript
if (this.cursors.left.isDown) {
    player.setVelocityX(-160);
}
```

### Physics Groups

Use groups for collections of similar objects (enemies, bullets):

```javascript
this.enemies = this.physics.add.group();
this.bullets = this.physics.add.group();

// Add collision
this.physics.add.overlap(this.bullets, this.enemies, this.hitEnemy, null, this);
```

## File Organization

- One class per file
- Filename matches class name (e.g., `Player.js` contains `class Player`)
- Related utilities grouped in folders (`entities/`, `weapons/`, `utils/`)

## Asset Naming

- Lowercase with hyphens: `stick-figure-idle.png`
- Descriptive names: `laser-bullet.png`, `platform-grass.png`

## Constants

Game-wide constants (speeds, sizes, colors) in a config object or separate file:

```javascript
const GAME_CONFIG = {
    PLAYER_SPEED: 200,
    JUMP_VELOCITY: -400,
    GRAVITY: 800,
    BULLET_SPEED: 600
};
```

## Debugging

- Use `console.log()` freely during development
- Phaser has built-in debug rendering for physics: `this.physics.world.createDebugGraphic()`
