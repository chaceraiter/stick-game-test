# Project Architecture

## Technology Stack

| Component | Technology | Why |
|-----------|------------|-----|
| **Runtime** | Browser (HTML5 Canvas) | Easy to test, share, and iterate |
| **Game Framework** | Phaser 3 | Industry-standard 2D game framework, built-in physics, great docs |
| **Language** | JavaScript (vanilla) | Simpler setup, can migrate to TypeScript later if needed |
| **Physics** | Phaser Arcade Physics | Simple and fast, good for platformers. Can upgrade to Matter.js later for destructible terrain |
| **Build Tool** | None initially (simple HTTP server) | Keep it simple to start |

## Project Structure

```
stick-game-test/
├── ai-context-management/     # AI context system (already exists)
├── index.html                 # Entry point, loads Phaser and game
├── js/
│   ├── game.js               # Phaser game config and initialization
│   ├── scenes/
│   │   ├── PlayScene.js      # Main gameplay scene
│   │   ├── MenuScene.js      # (future) Start menu
│   │   └── GameOverScene.js  # (future) Game over screen
│   ├── entities/
│   │   ├── Player.js         # Player stick figure class
│   │   ├── Enemy.js          # Enemy stick figure class
│   │   └── Bullet.js         # Projectile class
│   ├── weapons/
│   │   └── LaserGun.js       # Weapon behavior
│   └── utils/
│       └── LevelGenerator.js # Random level generation
├── assets/
│   ├── sprites/              # Stick figure images, etc.
│   └── audio/                # (future) Sound effects
└── README.md
```

## Key Architectural Decisions

### Phaser Scenes
The game uses Phaser's scene system. Each major game state (menu, playing, game over) is a separate scene. For MVP, we mainly need `PlayScene`.

### Entity Pattern
Game objects (player, enemies, bullets) are separate classes that extend Phaser sprites. This keeps code organized and makes it easy to add new entity types.

### Physics
Starting with Arcade Physics (axis-aligned bounding boxes, simple gravity). This handles:
- Player movement and jumping
- Collision with platforms
- Bullet collision with enemies
- Water hazard detection

If/when we add destructible terrain, we may need to switch to Matter.js physics.

### Level Generation
Levels are defined as data (platform positions, enemy spawns, water level). The generator creates random valid configurations. Platforms are simple rectangles initially.

## Running Locally

Since we're using ES6 modules, need a local server:
```bash
# Python 3
python -m http.server 8000

# Node.js (if you have npx)
npx serve
```

Then open `http://localhost:8000` in browser.

## Future Architecture Considerations

- **TypeScript migration:** If the codebase grows, TypeScript adds helpful type checking
- **Bundler (Vite/Webpack):** If we need npm packages or build optimization
- **Matter.js:** For destructible terrain physics
- **Tiled integration:** For more complex level design (optional)
