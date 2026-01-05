# New AI chat instructions
_Exported on 1/4/2026 at 19:56:02 PST from Cursor (2.2.44)_

---

**User**

@paste-this-into-new-ai-chats.txt (1-5) 

---

**Cursor**

I've read through the AI context system orientation. I can see the current work files are still empty templates, which means this is a **new project** that needs to be set up.

Let's get your project context configured! Based on the folder name `stick-game-test`, it sounds like you're building some kind of stick game.

---

## Let's Set Up Your Project Context

**Step 1: Project Vision**

Tell me about your project:
- **What are you building?** (A stick game? What kind?)
- **Why are you building it?** (For fun? Learning? A specific purpose?)
- **Who is it for?** (Yourself? Friends? Public release?)

Once you answer, I'll capture this in `project-vision-and-goals.md` and we'll move through the remaining steps:
- Technical architecture (languages, frameworks)
- Code patterns and conventions
- Operating rules for how we work together
- Current work focus

**Ready when you are!** Just describe your project and we'll get started.

---

**User**

i want to build a relatively simple game. for fun and learning. side view platformer. not a scroller. like a fixed arena. the player controls a stick figure that can run and jump and aspirationally use a grappling gun. there are stick figures around the map or on the level. the player can shoot them with laser gun. aspirationally more weapons. the level is complete when all the other stick figures are hit. the new map after completing the level and new stick figure location can be generated randomly. almost like worms the game with stick figures. like water at the bottom of the map that kills players. the map should eventually be destructible. the bad guys shouldnt move or shoot back for now. it should be live not turnbased. i have no idea about architecture or anything like that but i could answer questions if you can suggest options.

---

**Cursor**

This sounds like a really fun project! A stick figure arena shooter with Worms-style vibes. I've got a clear picture of what you want to build.

Let me capture the vision and then help you pick the right tech stack.

---

## Quick Architecture Questions

Since you're open to suggestions, here are the main options for a 2D platformer like this:

### Option A: Web-based (JavaScript/TypeScript + Phaser.js)
- **Pros:** Runs in browser, easy to share with friends, great 2D game framework with built-in physics
- **Cons:** Web tech can be finicky
- **Best for:** Quick iteration, sharing easily, learning web game dev

### Option B: Python + Pygame
- **Pros:** Python is beginner-friendly, simple to get started
- **Cons:** Harder to share (others need Python), less powerful for physics/effects
- **Best for:** Learning programming fundamentals

### Option C: Godot Engine (GDScript)
- **Pros:** Real game engine, excellent 2D support, visual editor, GDScript is easy to learn
- **Cons:** More to learn upfront, but very capable
- **Best for:** If you want to learn "real" game development

### My Recommendation: **Phaser.js (Option A)**

For your game concept (physics platformer, destructible terrain eventually, random generation), Phaser gives you:
- Built-in physics (Arcade or Matter.js for more complex stuff)
- Terrain destruction is doable
- Easy to test in browser as you build
- Tons of tutorials for platformers

---

**Quick questions to finalize:**

1. **Does web-based (Phaser.js) sound good?** Or do you have a preference for Python/Godot/something else?

2. **What's your coding experience level?** (Helps me calibrate how much I explain)

3. **Any preferences on how I communicate?** (Verbose explanations vs. just give me the code, etc.)

Once you answer, I'll fill out all the project setup files and we can start building!

---

**User**

for now this is kind of a test. i think browser based is best for that right? i am familiar with coding concepts but not a professional. i would like to hear about what you're doing

---

**Cursor**

Perfect! Browser-based with Phaser.js it is. Great choice for testing and iterating quickly.

Let me set up all your project context files now. I'll explain what I'm putting in each one:

---

**What I'm doing:** Creating 5 foundational documents that will help me (and any future AI chat) understand your project instantly. This saves you from re-explaining everything when a chat gets stale or you start a new one.

```markdown
# Project Vision and Goals

## What We're Building

A browser-based 2D stick figure arena shooter/platformer. Think "Worms meets stick figure combat" - side-view fixed arenas where the player shoots enemy stick figures to complete levels.

## Why

Fun personal project for learning game development. This is a test/learning project, so the priority is getting things working and understanding how they work, not production polish.

## Who It's For

The developer (learning project). May share with friends for testing/fun.

## Core Game Concept

- **View:** Side-view platformer, fixed arena (not scrolling)
- **Player:** Stick figure that can run, jump, and shoot
- **Enemies:** Static stick figures placed around the map (don't move or shoot back initially)
- **Win Condition:** Hit all enemy stick figures to complete the level
- **Progression:** Random level generation with new enemy placements after each win
- **Hazards:** Water at the bottom of the map that kills the player

## MVP Features (Priority Order)

1. Player movement (run, jump)
2. Basic arena/level with platforms
3. Laser gun shooting
4. Enemy stick figures (static targets)
5. Level completion detection
6. Water hazard
7. Random level generation

## Aspirational Features (Later)

- Grappling gun
- More weapon types
- Destructible terrain
- Smarter enemies (movement, shooting back)
- Multiple lives or health system

## Success Criteria

A playable game loop: spawn in level → shoot all enemies → new level generates → repeat. Fun to play, code is understandable.

```

```markdown
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

```

```markdown
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

```

```markdown
# Agent Operating Rules

## Communication Style

- **Explain what you're doing.** The developer is learning, so provide context about decisions and how things work.
- **Be conversational but efficient.** No need for excessive formality, but stay focused on the task.
- **Announce significant changes.** Before making architectural decisions or big changes, explain the reasoning.

## Development Approach

- **Incremental progress.** Build features in small, testable chunks. Get something working, then improve it.
- **Keep it simple.** This is a learning project. Prefer straightforward solutions over clever abstractions.
- **Working code > perfect code.** Functionality first, refactor later if needed.

## Code Changes

- **Test before moving on.** After implementing a feature, describe how to test it.
- **Don't over-engineer.** Only add complexity when there's a clear need.
- **Preserve existing work.** Don't refactor working code unless asked or there's a good reason.

## What to Ask About First

- Major architectural changes
- Adding new dependencies
- Significant deviations from the plan
- Anything that might break existing functionality

## What You Can Do Without Asking

- Bug fixes
- Small improvements within the current task
- Adding comments or improving code clarity
- Setting up files according to the established structure

## Learning Project Considerations

- Explain game development concepts when introducing them (physics, game loops, etc.)
- Point out interesting Phaser features that might be useful
- If there are multiple ways to do something, briefly mention the alternatives

## Context Management

- Update `current-work-focus.md` when the focus shifts significantly
- Update `current-context-for-new-chat.md` at natural stopping points
- Keep notes about what's working and what's not

```

```markdown
# Current Work Focus

We're starting a stick figure arena shooter game from scratch. The project structure is set up but no game code exists yet. First priority is getting a basic playable prototype running in the browser.

- **Project Goal:** Build a browser-based stick figure arena shooter with random level generation (Worms-style vibes)

- **Intermediate Goal:** Create a minimal playable prototype - player can move, shoot, and hit enemies to complete a level

- **Current Task:** Set up the initial project files (HTML, Phaser config, basic scene) and get a player character moving on screen

```

```markdown
# Current Context for New Chat

## Project Status: Just Started

The AI context system is set up and project foundation documents are complete. No game code has been written yet.

## What Exists

- AI context management folder structure (complete)
- Project setup documents defining vision, architecture, patterns, and rules (complete)

## What Doesn't Exist Yet

- `index.html` - entry point
- `js/` folder with game code
- `assets/` folder with sprites
- Any playable game

## Next Steps

1. Create `index.html` with Phaser loaded via CDN
2. Create basic game configuration (`js/game.js`)
3. Create `PlayScene.js` with a simple test (colored rectangle as player)
4. Add keyboard input for movement
5. Add jumping with gravity

## Technical Decisions Made

- Using Phaser 3 (via CDN for simplicity)
- Vanilla JavaScript (not TypeScript)
- Arcade Physics (simple and fast)
- ES6 modules for code organization

## Known Issues

None yet - haven't started coding.

## Recent Changes

- Initial project setup (context system files)

```

Done! I've created all 6 project context files. Here's what each one contains:

---

## What I Just Set Up

| File | Purpose |
|------|---------|
| **`project-vision-and-goals.md`** | Your game concept, MVP features, aspirational features, success criteria |
| **`project-architecture.md`** | Tech stack (Phaser 3, vanilla JS, Arcade Physics), folder structure, how to run locally |
| **`code-patterns-and-conventions.md`** | JavaScript style, Phaser patterns for scenes/entities/input, file organization |
| **`agent-operating-rules.md`** | How I should communicate (explain things, incremental progress, ask before big changes) |
| **`current-work-focus.md`** | Where we are right now (just starting, need to build basic prototype) |
| **`current-context-for-new-chat.md`** | Living doc of project state (will update as we build) |

---

## How the Context System Works Going Forward

- **When a chat gets stale:** Paste the contents of `for-humans/paste-this-into-stale-ai-chats.txt` to have me re-read the current state
- **When starting a new chat:** Paste `for-humans/paste-this-into-new-ai-chats.txt` (like you did!)
- **At natural stopping points:** I'll update `current-context-for-new-chat.md` so future sessions know what's working

---

## Ready to Start Building?

The next step is creating the actual game files:

1. **`index.html`** - loads Phaser from CDN, hosts the game canvas
2. **`js/game.js`** - Phaser configuration (screen size, physics settings)
3. **`js/scenes/PlayScene.js`** - the main gameplay scene

We'd start with just getting a colored rectangle on screen that you can move with arrow keys, then build from there.

**Want me to create those initial files and get you a running player character?**

---

**User**

yes

---

**Cursor**

Let's build! I'll create the initial files to get a player moving on screen.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stick Figure Arena</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            background-color: #1a1a2e;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        #game-container {
            border: 3px solid #4a4a6a;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div id="game-container"></div>
    
    <!-- Phaser 3 from CDN -->
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js"></script>
    
    <!-- Game files (using regular scripts since ES modules need a server) -->
    <script src="js/scenes/PlayScene.js"></script>
    <script src="js/game.js"></script>
</body>
</html>

```

```javascript
/**
 * Main game configuration
 * This file initializes Phaser with our settings and scenes
 */

const config = {
    type: Phaser.AUTO,  // Automatically choose WebGL or Canvas
    width: 800,
    height: 600,
    parent: 'game-container',  // DOM element to put the game in
    
    // Physics configuration
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },  // Gravity pulls things down
            debug: true  // Show collision boxes (helpful for development!)
        }
    },
    
    // Background color (sky blue-ish)
    backgroundColor: '#87CEEB',
    
    // Scenes to include (order matters - first one starts automatically)
    scene: [PlayScene]
};

// Create the game!
const game = new Phaser.Game(config);

```

```javascript
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
        // === GROUND ===
        // Create a static platform for the player to stand on
        // Static bodies don't move when hit - perfect for floors/platforms
        
        this.platforms = this.physics.add.staticGroup();
        
        // Main ground - a green rectangle at the bottom
        // createRect returns a graphics texture we can use
        const groundGraphics = this.add.graphics();
        groundGraphics.fillStyle(0x4a7c23);  // Grass green
        groundGraphics.fillRect(0, 0, 800, 40);
        groundGraphics.generateTexture('ground', 800, 40);
        groundGraphics.destroy();
        
        // Add the ground platform
        const ground = this.platforms.create(400, 580, 'ground');
        
        // Add a couple floating platforms
        const platGraphics = this.add.graphics();
        platGraphics.fillStyle(0x8B4513);  // Brown
        platGraphics.fillRect(0, 0, 150, 20);
        platGraphics.generateTexture('platform', 150, 20);
        platGraphics.destroy();
        
        this.platforms.create(600, 450, 'platform');
        this.platforms.create(200, 350, 'platform');
        this.platforms.create(500, 250, 'platform');
        
        
        // === PLAYER ===
        // Create the player as a simple rectangle for now
        // Later we'll replace this with a proper stick figure sprite
        
        const playerGraphics = this.add.graphics();
        playerGraphics.fillStyle(0x2d2d2d);  // Dark gray (stick figure color)
        playerGraphics.fillRect(0, 0, 20, 40);  // Narrow and tall, like a person
        playerGraphics.generateTexture('player', 20, 40);
        playerGraphics.destroy();
        
        // Create player with physics
        this.player = this.physics.add.sprite(100, 450, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        
        // === UI TEXT ===
        // Show some instructions
        this.add.text(16, 16, 'Arrow keys to move, Up to jump', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
        });
    }

    update() {
        // This runs every frame - handle player movement here
        
        const speed = 200;
        const jumpVelocity = -400;  // Negative because Y goes down in screen coords
        
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
    }
}

```

Done! Here's what I created:

---

## Files Created

### `index.html`
The entry point. Loads Phaser from a CDN (so you don't need to install anything), then loads our game scripts. Has some minimal styling to center the game canvas.

### `js/game.js`
Phaser configuration:
- 800x600 canvas
- Arcade Physics with gravity (800 pixels/sec²)
- Debug mode ON (you'll see green boxes around collision areas - super helpful!)
- Loads our PlayScene

### `js/scenes/PlayScene.js`
The main gameplay scene with:
- **Ground** - A green platform at the bottom
- **Floating platforms** - Three brown platforms to jump on
- **Player** - A dark rectangle (placeholder for stick figure) with physics
- **Input** - Arrow keys to move, Up to jump

---

## How to Test It

Since we're using Phaser, you need a local web server (browsers block loading local JS files directly for security). Run one of these from your project folder:

```bash
# Python 3 (probably already installed on Mac)
python3 -m http.server 8000
```

Then open **http://localhost:8000** in your browser.

---

## What You Should See

- Sky blue background
- Green ground at bottom
- Three brown floating platforms
- Dark gray rectangle (your "player") that you can move with arrow keys
- Green debug outlines showing collision boxes
- Instructions text in the top-left

**Try:** Run around, jump on platforms. The player can't leave the screen edges.

---

**Want me to start the server for you?** Or let me know once you've got it running and we can move on to adding shooting!

```shellscript
# Python 3 (probably already installed on Mac)
python3 -m http.server 8000
```

---

**User**

start it please

---

**Cursor**

Server is starting up. 

**Open this in your browser:** **http://localhost:8000**

You should see your game with:
- A sky blue background
- Green ground at the bottom
- Brown platforms floating around
- A dark gray rectangle (your player) that you can control

**Controls:**
- **← →** Arrow keys to move left/right
- **↑** Up arrow to jump

The green outlines you'll see are debug collision boxes - they show what Phaser considers "solid" for physics. We can turn those off later when things look right.

Let me know what you see! 🎮

---

**User**

seems to work perfectly so far. the platforms are too high up to jump onto but collision laterally seems to be working. everything looks great.

---

**Cursor**

Awesome, glad it's working! 🎉

Good catch on the platforms - let me make the jump higher so you can actually reach them. I'll also lower the first platform a bit to make the progression more natural.

```javascript
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
        // === GROUND ===
        // Create a static platform for the player to stand on
        // Static bodies don't move when hit - perfect for floors/platforms
        
        this.platforms = this.physics.add.staticGroup();
        
        // Main ground - a green rectangle at the bottom
        // createRect returns a graphics texture we can use
        const groundGraphics = this.add.graphics();
        groundGraphics.fillStyle(0x4a7c23);  // Grass green
        groundGraphics.fillRect(0, 0, 800, 40);
        groundGraphics.generateTexture('ground', 800, 40);
        groundGraphics.destroy();
        
        // Add the ground platform
        const ground = this.platforms.create(400, 580, 'ground');
        
        // Add a couple floating platforms
        const platGraphics = this.add.graphics();
        platGraphics.fillStyle(0x8B4513);  // Brown
        platGraphics.fillRect(0, 0, 150, 20);
        platGraphics.generateTexture('platform', 150, 20);
        platGraphics.destroy();
        
        this.platforms.create(600, 480, 'platform');  // Low platform (easy hop)
        this.platforms.create(200, 400, 'platform');  // Medium platform
        this.platforms.create(500, 320, 'platform');  // High platform
        
        
        // === PLAYER ===
        // Create the player as a simple rectangle for now
        // Later we'll replace this with a proper stick figure sprite
        
        const playerGraphics = this.add.graphics();
        playerGraphics.fillStyle(0x2d2d2d);  // Dark gray (stick figure color)
        playerGraphics.fillRect(0, 0, 20, 40);  // Narrow and tall, like a person
        playerGraphics.generateTexture('player', 20, 40);
        playerGraphics.destroy();
        
        // Create player with physics
        this.player = this.physics.add.sprite(100, 450, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        
        // === UI TEXT ===
        // Show some instructions
        this.add.text(16, 16, 'Arrow keys to move, Up to jump', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
        });
    }

    update() {
        // This runs every frame - handle player movement here
        
        const speed = 200;
        const jumpVelocity = -400;  // Negative because Y goes down in screen coords
        
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
    }
}


```

```javascript
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
        // === GROUND ===
        // Create a static platform for the player to stand on
        // Static bodies don't move when hit - perfect for floors/platforms
        
        this.platforms = this.physics.add.staticGroup();
        
        // Main ground - a green rectangle at the bottom
        // createRect returns a graphics texture we can use
        const groundGraphics = this.add.graphics();
        groundGraphics.fillStyle(0x4a7c23);  // Grass green
        groundGraphics.fillRect(0, 0, 800, 40);
        groundGraphics.generateTexture('ground', 800, 40);
        groundGraphics.destroy();
        
        // Add the ground platform
        const ground = this.platforms.create(400, 580, 'ground');
        
        // Add a couple floating platforms
        const platGraphics = this.add.graphics();
        platGraphics.fillStyle(0x8B4513);  // Brown
        platGraphics.fillRect(0, 0, 150, 20);
        platGraphics.generateTexture('platform', 150, 20);
        platGraphics.destroy();
        
        this.platforms.create(600, 480, 'platform');  // Low platform (easy hop)
        this.platforms.create(200, 400, 'platform');  // Medium platform
        this.platforms.create(500, 320, 'platform');  // High platform
        
        
        // === PLAYER ===
        // Create the player as a simple rectangle for now
        // Later we'll replace this with a proper stick figure sprite
        
        const playerGraphics = this.add.graphics();
        playerGraphics.fillStyle(0x2d2d2d);  // Dark gray (stick figure color)
        playerGraphics.fillRect(0, 0, 20, 40);  // Narrow and tall, like a person
        playerGraphics.generateTexture('player', 20, 40);
        playerGraphics.destroy();
        
        // Create player with physics
        this.player = this.physics.add.sprite(100, 450, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        
        // === UI TEXT ===
        // Show some instructions
        this.add.text(16, 16, 'Arrow keys to move, Up to jump', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
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
    }
}


```

Done! **Refresh your browser** to see the changes:

**What I changed:**
- **Jump velocity:** -400 → -500 (25% higher jump)
- **Platform positions:** Lowered them and staggered better:
  - Low platform at y=480 (easy hop from ground)
  - Medium platform at y=400 
  - High platform at y=320

You should now be able to jump onto all three platforms in sequence. Give it a try!

---

**Next up when you're ready:** Add shooting! We'll give the player a laser gun that fires toward the mouse cursor (or in the direction they're facing). Sound good?

---

**User**

ok sounds good

---

**Cursor**

Let's add shooting! I'll make it so you click to fire a laser toward your mouse cursor.

```javascript
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
        // === GROUND ===
        // Create a static platform for the player to stand on
        // Static bodies don't move when hit - perfect for floors/platforms
        
        this.platforms = this.physics.add.staticGroup();
        
        // Main ground - a green rectangle at the bottom
        // createRect returns a graphics texture we can use
        const groundGraphics = this.add.graphics();
        groundGraphics.fillStyle(0x4a7c23);  // Grass green
        groundGraphics.fillRect(0, 0, 800, 40);
        groundGraphics.generateTexture('ground', 800, 40);
        groundGraphics.destroy();
        
        // Add the ground platform
        const ground = this.platforms.create(400, 580, 'ground');
        
        // Add a couple floating platforms
        const platGraphics = this.add.graphics();
        platGraphics.fillStyle(0x8B4513);  // Brown
        platGraphics.fillRect(0, 0, 150, 20);
        platGraphics.generateTexture('platform', 150, 20);
        platGraphics.destroy();
        
        this.platforms.create(600, 480, 'platform');  // Low platform (easy hop)
        this.platforms.create(200, 400, 'platform');  // Medium platform
        this.platforms.create(500, 320, 'platform');  // High platform
        
        
        // === PLAYER ===
        // Create the player as a simple rectangle for now
        // Later we'll replace this with a proper stick figure sprite
        
        const playerGraphics = this.add.graphics();
        playerGraphics.fillStyle(0x2d2d2d);  // Dark gray (stick figure color)
        playerGraphics.fillRect(0, 0, 20, 40);  // Narrow and tall, like a person
        playerGraphics.generateTexture('player', 20, 40);
        playerGraphics.destroy();
        
        // Create player with physics
        this.player = this.physics.add.sprite(100, 450, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Mouse input for shooting
        this.input.on('pointerdown', (pointer) => {
            this.shoot(pointer.x, pointer.y);
        });
        
        
        // === BULLETS ===
        // Group to hold all bullets - makes collision detection easy
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });
        
        // Create bullet texture (small bright rectangle)
        const bulletGraphics = this.add.graphics();
        bulletGraphics.fillStyle(0xff0000);  // Red laser
        bulletGraphics.fillRect(0, 0, 12, 4);
        bulletGraphics.generateTexture('bullet', 12, 4);
        bulletGraphics.destroy();
        
        
        // === UI TEXT ===
        // Show some instructions
        this.add.text(16, 16, 'Arrow keys to move, Up to jump, Click to shoot', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
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
    }
}


```

```javascript
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
        // === GROUND ===
        // Create a static platform for the player to stand on
        // Static bodies don't move when hit - perfect for floors/platforms
        
        this.platforms = this.physics.add.staticGroup();
        
        // Main ground - a green rectangle at the bottom
        // createRect returns a graphics texture we can use
        const groundGraphics = this.add.graphics();
        groundGraphics.fillStyle(0x4a7c23);  // Grass green
        groundGraphics.fillRect(0, 0, 800, 40);
        groundGraphics.generateTexture('ground', 800, 40);
        groundGraphics.destroy();
        
        // Add the ground platform
        const ground = this.platforms.create(400, 580, 'ground');
        
        // Add a couple floating platforms
        const platGraphics = this.add.graphics();
        platGraphics.fillStyle(0x8B4513);  // Brown
        platGraphics.fillRect(0, 0, 150, 20);
        platGraphics.generateTexture('platform', 150, 20);
        platGraphics.destroy();
        
        this.platforms.create(600, 480, 'platform');  // Low platform (easy hop)
        this.platforms.create(200, 400, 'platform');  // Medium platform
        this.platforms.create(500, 320, 'platform');  // High platform
        
        
        // === PLAYER ===
        // Create the player as a simple rectangle for now
        // Later we'll replace this with a proper stick figure sprite
        
        const playerGraphics = this.add.graphics();
        playerGraphics.fillStyle(0x2d2d2d);  // Dark gray (stick figure color)
        playerGraphics.fillRect(0, 0, 20, 40);  // Narrow and tall, like a person
        playerGraphics.generateTexture('player', 20, 40);
        playerGraphics.destroy();
        
        // Create player with physics
        this.player = this.physics.add.sprite(100, 450, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Mouse input for shooting
        this.input.on('pointerdown', (pointer) => {
            this.shoot(pointer.x, pointer.y);
        });
        
        
        // === BULLETS ===
        // Group to hold all bullets - makes collision detection easy
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 20  // Limit bullets on screen
        });
        
        // Create bullet texture (small bright rectangle)
        const bulletGraphics = this.add.graphics();
        bulletGraphics.fillStyle(0xff0000);  // Red laser
        bulletGraphics.fillRect(0, 0, 12, 4);
        bulletGraphics.generateTexture('bullet', 12, 4);
        bulletGraphics.destroy();
        
        
        // === UI TEXT ===
        // Show some instructions
        this.add.text(16, 16, 'Arrow keys to move, Up to jump, Click to shoot', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
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


```

Done! **Refresh your browser** to try shooting.

---

## What I Added

**Mouse shooting:**
- Click anywhere to fire a red laser toward your cursor
- Bullets travel in a straight line (no gravity affects them)
- Bullets rotate to face the direction they're moving
- Max 20 bullets on screen (old ones get recycled)

**How it works:**
1. On click, we calculate the angle from player to mouse using `Phaser.Math.Angle.Between()`
2. Convert angle to velocity using `cos(angle)` and `sin(angle)` (basic trig!)
3. Bullets that leave the screen get deactivated and recycled

---

## Try It Out

- Move around with arrow keys
- Click to shoot toward your mouse
- Try shooting while jumping!

---

**Next step:** Add enemies (static stick figures) that you can hit with your bullets. When all enemies are hit, you complete the level. Ready for that?

---

**User**

i dont see lasers shooting

---

**Cursor**

Let me check what's going on. I'll look at the current code:

Found it! The problem is the order - I'm creating the bullets group *before* the bullet texture exists. Phaser can't find the 'bullet' texture when it tries to create one.

Let me fix that:

```javascript
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
        // === GROUND ===
        // Create a static platform for the player to stand on
        // Static bodies don't move when hit - perfect for floors/platforms
        
        this.platforms = this.physics.add.staticGroup();
        
        // Main ground - a green rectangle at the bottom
        // createRect returns a graphics texture we can use
        const groundGraphics = this.add.graphics();
        groundGraphics.fillStyle(0x4a7c23);  // Grass green
        groundGraphics.fillRect(0, 0, 800, 40);
        groundGraphics.generateTexture('ground', 800, 40);
        groundGraphics.destroy();
        
        // Add the ground platform
        const ground = this.platforms.create(400, 580, 'ground');
        
        // Add a couple floating platforms
        const platGraphics = this.add.graphics();
        platGraphics.fillStyle(0x8B4513);  // Brown
        platGraphics.fillRect(0, 0, 150, 20);
        platGraphics.generateTexture('platform', 150, 20);
        platGraphics.destroy();
        
        this.platforms.create(600, 480, 'platform');  // Low platform (easy hop)
        this.platforms.create(200, 400, 'platform');  // Medium platform
        this.platforms.create(500, 320, 'platform');  // High platform
        
        
        // === PLAYER ===
        // Create the player as a simple rectangle for now
        // Later we'll replace this with a proper stick figure sprite
        
        const playerGraphics = this.add.graphics();
        playerGraphics.fillStyle(0x2d2d2d);  // Dark gray (stick figure color)
        playerGraphics.fillRect(0, 0, 20, 40);  // Narrow and tall, like a person
        playerGraphics.generateTexture('player', 20, 40);
        playerGraphics.destroy();
        
        // Create player with physics
        this.player = this.physics.add.sprite(100, 450, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Mouse input for shooting
        this.input.on('pointerdown', (pointer) => {
            this.shoot(pointer.x, pointer.y);
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
        
        
        // === UI TEXT ===
        // Show some instructions
        this.add.text(16, 16, 'Arrow keys to move, Up to jump, Click to shoot', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
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


```

Fixed! **Refresh your browser** and try clicking again.

**The issue:** I created the bullets group before creating the bullet texture. Phaser was looking for a texture called 'bullet' that didn't exist yet. Now the texture is created first, then the group that uses it.

Let me know if it works now!

---

**User**

okay i can aim and shoot them repeatedly and see them now

---

**Cursor**

Excellent! 🎯 Now let's add enemies to shoot at.

I'll add:
- Static enemy stick figures placed around the level
- Collision detection so bullets destroy enemies
- A counter showing how many enemies are left
- "Level Complete" message when you hit them all

```javascript
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
        // === GROUND ===
        // Create a static platform for the player to stand on
        // Static bodies don't move when hit - perfect for floors/platforms
        
        this.platforms = this.physics.add.staticGroup();
        
        // Main ground - a green rectangle at the bottom
        // createRect returns a graphics texture we can use
        const groundGraphics = this.add.graphics();
        groundGraphics.fillStyle(0x4a7c23);  // Grass green
        groundGraphics.fillRect(0, 0, 800, 40);
        groundGraphics.generateTexture('ground', 800, 40);
        groundGraphics.destroy();
        
        // Add the ground platform
        const ground = this.platforms.create(400, 580, 'ground');
        
        // Add a couple floating platforms
        const platGraphics = this.add.graphics();
        platGraphics.fillStyle(0x8B4513);  // Brown
        platGraphics.fillRect(0, 0, 150, 20);
        platGraphics.generateTexture('platform', 150, 20);
        platGraphics.destroy();
        
        this.platforms.create(600, 480, 'platform');  // Low platform (easy hop)
        this.platforms.create(200, 400, 'platform');  // Medium platform
        this.platforms.create(500, 320, 'platform');  // High platform
        
        
        // === PLAYER ===
        // Create the player as a simple rectangle for now
        // Later we'll replace this with a proper stick figure sprite
        
        const playerGraphics = this.add.graphics();
        playerGraphics.fillStyle(0x2d2d2d);  // Dark gray (stick figure color)
        playerGraphics.fillRect(0, 0, 20, 40);  // Narrow and tall, like a person
        playerGraphics.generateTexture('player', 20, 40);
        playerGraphics.destroy();
        
        // Create player with physics
        this.player = this.physics.add.sprite(100, 450, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Mouse input for shooting
        this.input.on('pointerdown', (pointer) => {
            this.shoot(pointer.x, pointer.y);
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
        
        // Spawn some enemies at fixed positions for now
        this.spawnEnemy(700, 540);   // On ground, right side
        this.spawnEnemy(550, 280);   // On high platform
        this.spawnEnemy(150, 360);   // On medium platform
        this.spawnEnemy(650, 440);   // On low platform
        
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
        this.levelCompleteText = this.add.text(400, 300, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 20, y: 10 }
        });
        this.levelCompleteText.setOrigin(0.5);  // Center the text
        this.levelCompleteText.setVisible(false);
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
        this.levelCompleteText.setVisible(true);
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


```

Done! **Refresh your browser** and you'll see:

---

## What's New

- **4 red enemies** placed around the level (ground and platforms)
- **"Enemies remaining: 4"** counter in the top left
- **Bullets destroy enemies** on contact
- **"LEVEL COMPLETE!"** message when you shoot them all

---

## Try It Out

1. You should see 4 red stick figures around the map
2. Shoot them with your laser
3. Watch the counter go down
4. Get them all for the victory message!

---

**After this works:** We can add random level generation so when you complete a level, a new one spawns with new enemy positions. That'll give you the core gameplay loop!

---

**User**

ok the lasers make the enemies disappear

---

**Cursor**

Nice! 🎯 Now let's add the next level generation so you have a real game loop.

I'll make it so:
- After "Level Complete", click to start the next level
- Enemies respawn at random valid positions (on platforms or ground)
- Level counter so you can see your progress

```javascript
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
        // === GROUND ===
        // Create a static platform for the player to stand on
        // Static bodies don't move when hit - perfect for floors/platforms
        
        this.platforms = this.physics.add.staticGroup();
        
        // Main ground - a green rectangle at the bottom
        // createRect returns a graphics texture we can use
        const groundGraphics = this.add.graphics();
        groundGraphics.fillStyle(0x4a7c23);  // Grass green
        groundGraphics.fillRect(0, 0, 800, 40);
        groundGraphics.generateTexture('ground', 800, 40);
        groundGraphics.destroy();
        
        // Add the ground platform
        const ground = this.platforms.create(400, 580, 'ground');
        
        // Add a couple floating platforms
        const platGraphics = this.add.graphics();
        platGraphics.fillStyle(0x8B4513);  // Brown
        platGraphics.fillRect(0, 0, 150, 20);
        platGraphics.generateTexture('platform', 150, 20);
        platGraphics.destroy();
        
        this.platforms.create(600, 480, 'platform');  // Low platform (easy hop)
        this.platforms.create(200, 400, 'platform');  // Medium platform
        this.platforms.create(500, 320, 'platform');  // High platform
        
        
        // === PLAYER ===
        // Create the player as a simple rectangle for now
        // Later we'll replace this with a proper stick figure sprite
        
        const playerGraphics = this.add.graphics();
        playerGraphics.fillStyle(0x2d2d2d);  // Dark gray (stick figure color)
        playerGraphics.fillRect(0, 0, 20, 40);  // Narrow and tall, like a person
        playerGraphics.generateTexture('player', 20, 40);
        playerGraphics.destroy();
        
        // Create player with physics
        this.player = this.physics.add.sprite(100, 450, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Mouse input for shooting
        this.input.on('pointerdown', (pointer) => {
            this.shoot(pointer.x, pointer.y);
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
        
        // Spawn some enemies at fixed positions for now
        this.spawnEnemy(700, 540);   // On ground, right side
        this.spawnEnemy(550, 280);   // On high platform
        this.spawnEnemy(150, 360);   // On medium platform
        this.spawnEnemy(650, 440);   // On low platform
        
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
        
        // Valid spawn positions (x, y) - on platforms and ground
        // These are spots where enemies can stand
        this.spawnPoints = [
            { x: 100, y: 540 },   // Ground left
            { x: 300, y: 540 },   // Ground middle-left
            { x: 500, y: 540 },   // Ground middle-right
            { x: 700, y: 540 },   // Ground right
            { x: 600, y: 440 },   // Low platform
            { x: 200, y: 360 },   // Medium platform
            { x: 500, y: 280 },   // High platform
        ];
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
        this.levelCompleteText.setVisible(true);
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


```

```javascript
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
        // === GROUND ===
        // Create a static platform for the player to stand on
        // Static bodies don't move when hit - perfect for floors/platforms
        
        this.platforms = this.physics.add.staticGroup();
        
        // Main ground - a green rectangle at the bottom
        // createRect returns a graphics texture we can use
        const groundGraphics = this.add.graphics();
        groundGraphics.fillStyle(0x4a7c23);  // Grass green
        groundGraphics.fillRect(0, 0, 800, 40);
        groundGraphics.generateTexture('ground', 800, 40);
        groundGraphics.destroy();
        
        // Add the ground platform
        const ground = this.platforms.create(400, 580, 'ground');
        
        // Add a couple floating platforms
        const platGraphics = this.add.graphics();
        platGraphics.fillStyle(0x8B4513);  // Brown
        platGraphics.fillRect(0, 0, 150, 20);
        platGraphics.generateTexture('platform', 150, 20);
        platGraphics.destroy();
        
        this.platforms.create(600, 480, 'platform');  // Low platform (easy hop)
        this.platforms.create(200, 400, 'platform');  // Medium platform
        this.platforms.create(500, 320, 'platform');  // High platform
        
        
        // === PLAYER ===
        // Create the player as a simple rectangle for now
        // Later we'll replace this with a proper stick figure sprite
        
        const playerGraphics = this.add.graphics();
        playerGraphics.fillStyle(0x2d2d2d);  // Dark gray (stick figure color)
        playerGraphics.fillRect(0, 0, 20, 40);  // Narrow and tall, like a person
        playerGraphics.generateTexture('player', 20, 40);
        playerGraphics.destroy();
        
        // Create player with physics
        this.player = this.physics.add.sprite(100, 450, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        
        
        // === INPUT ===
        // Set up keyboard controls
        // createCursorKeys gives us arrow keys automatically
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Mouse input for shooting
        this.input.on('pointerdown', (pointer) => {
            this.shoot(pointer.x, pointer.y);
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
        
        // Spawn some enemies at fixed positions for now
        this.spawnEnemy(700, 540);   // On ground, right side
        this.spawnEnemy(550, 280);   // On high platform
        this.spawnEnemy(150, 360);   // On medium platform
        this.spawnEnemy(650, 440);   // On low platform
        
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
        
        // Valid spawn positions (x, y) - on platforms and ground
        // These are spots where enemies can stand
        this.spawnPoints = [
            { x: 100, y: 540 },   // Ground left
            { x: 300, y: 540 },   // Ground middle-left
            { x: 500, y: 540 },   // Ground middle-right
            { x: 700, y: 540 },   // Ground right
            { x: 600, y: 440 },   // Low platform
            { x: 200, y: 360 },   // Medium platform
            { x: 500, y: 280 },   // High platform
        ];
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
        // More enemies as levels progress (4 + 1 per 2 levels, max 7)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), 7);
        
        // Shuffle spawn points and pick the first N
        const shuffled = Phaser.Utils.Array.Shuffle([...this.spawnPoints]);
        for (let i = 0; i < enemyCount; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position
        this.player.setPosition(100, 450);
        this.player.setVelocity(0, 0);
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


```

```javascript
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
        // === GROUND ===
        // Create a static platform for the player to stand on
        // Static bodies don't move when hit - perfect for floors/platforms
        
        this.platforms = this.physics.add.staticGroup();
        
        // Main ground - a green rectangle at the bottom
        // createRect returns a graphics texture we can use
        const groundGraphics = this.add.graphics();
        groundGraphics.fillStyle(0x4a7c23);  // Grass green
        groundGraphics.fillRect(0, 0, 800, 40);
        groundGraphics.generateTexture('ground', 800, 40);
        groundGraphics.destroy();
        
        // Add the ground platform
        const ground = this.platforms.create(400, 580, 'ground');
        
        // Add a couple floating platforms
        const platGraphics = this.add.graphics();
        platGraphics.fillStyle(0x8B4513);  // Brown
        platGraphics.fillRect(0, 0, 150, 20);
        platGraphics.generateTexture('platform', 150, 20);
        platGraphics.destroy();
        
        this.platforms.create(600, 480, 'platform');  // Low platform (easy hop)
        this.platforms.create(200, 400, 'platform');  // Medium platform
        this.platforms.create(500, 320, 'platform');  // High platform
        
        
        // === PLAYER ===
        // Create the player as a simple rectangle for now
        // Later we'll replace this with a proper stick figure sprite
        
        const playerGraphics = this.add.graphics();
        playerGraphics.fillStyle(0x2d2d2d);  // Dark gray (stick figure color)
        playerGraphics.fillRect(0, 0, 20, 40);  // Narrow and tall, like a person
        playerGraphics.generateTexture('player', 20, 40);
        playerGraphics.destroy();
        
        // Create player with physics
        this.player = this.physics.add.sprite(100, 450, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        
        
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
        
        // Spawn some enemies at fixed positions for now
        this.spawnEnemy(700, 540);   // On ground, right side
        this.spawnEnemy(550, 280);   // On high platform
        this.spawnEnemy(150, 360);   // On medium platform
        this.spawnEnemy(650, 440);   // On low platform
        
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
        
        // Valid spawn positions (x, y) - on platforms and ground
        // These are spots where enemies can stand
        this.spawnPoints = [
            { x: 100, y: 540 },   // Ground left
            { x: 300, y: 540 },   // Ground middle-left
            { x: 500, y: 540 },   // Ground middle-right
            { x: 700, y: 540 },   // Ground right
            { x: 600, y: 440 },   // Low platform
            { x: 200, y: 360 },   // Medium platform
            { x: 500, y: 280 },   // High platform
        ];
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
        // More enemies as levels progress (4 + 1 per 2 levels, max 7)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), 7);
        
        // Shuffle spawn points and pick the first N
        const shuffled = Phaser.Utils.Array.Shuffle([...this.spawnPoints]);
        for (let i = 0; i < enemyCount; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position
        this.player.setPosition(100, 450);
        this.player.setVelocity(0, 0);
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


```

Done! **Refresh your browser** to get the full game loop.

---

## What's New

- **Level counter** in the top-right corner
- **"Click to continue"** prompt after completing a level
- **Random enemy spawns** - enemies appear at different valid positions each level
- **Progressive difficulty** - starts with 4 enemies, adds 1 more every 2 levels (max 7)
- **Player resets** to starting position each new level

---

## The Game Loop

1. Shoot all enemies
2. "Level Complete!" appears
3. Click to start next level
4. Enemies spawn at new random positions
5. Repeat!

---

You now have a playable game! 🎮

**What would you like to add next?** Some options:
- **Water hazard** at the bottom that kills the player
- **Better visuals** - actual stick figure sprites instead of rectangles
- **Sound effects**
- **More platforms** that also randomize

---

**User**

lets add the water hazard. of course that means the player has to start on a platform.

---

**Cursor**

Good thinking! Let me:
1. Replace the ground with water
2. Add more platforms so there's solid places to stand
3. Kill the player when they touch water (restart the level)
4. Update spawn points to be platforms only

```javascript
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
        
        // Create player with physics
        this.player = this.physics.add.sprite(100, 450, 'player');
        
        // Player physics properties
        this.player.setBounce(0.1);  // Tiny bounce when landing
        this.player.setCollideWorldBounds(true);  // Can't leave the screen
        
        // Make player collide with platforms
        this.physics.add.collider(this.player, this.platforms);
        
        
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
        
        // Spawn some enemies at fixed positions for now
        this.spawnEnemy(700, 540);   // On ground, right side
        this.spawnEnemy(550, 280);   // On high platform
        this.spawnEnemy(150, 360);   // On medium platform
        this.spawnEnemy(650, 440);   // On low platform
        
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
        
        // Valid spawn positions (x, y) - on platforms and ground
        // These are spots where enemies can stand
        this.spawnPoints = [
            { x: 100, y: 540 },   // Ground left
            { x: 300, y: 540 },   // Ground middle-left
            { x: 500, y: 540 },   // Ground middle-right
            { x: 700, y: 540 },   // Ground right
            { x: 600, y: 440 },   // Low platform
            { x: 200, y: 360 },   // Medium platform
            { x: 500, y: 280 },   // High platform
        ];
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
        // More enemies as levels progress (4 + 1 per 2 levels, max 7)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), 7);
        
        // Shuffle spawn points and pick the first N
        const shuffled = Phaser.Utils.Array.Shuffle([...this.spawnPoints]);
        for (let i = 0; i < enemyCount; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position
        this.player.setPosition(100, 450);
        this.player.setVelocity(0, 0);
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


```

```javascript
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
        
        // Spawn some enemies at fixed positions for now
        this.spawnEnemy(700, 540);   // On ground, right side
        this.spawnEnemy(550, 280);   // On high platform
        this.spawnEnemy(150, 360);   // On medium platform
        this.spawnEnemy(650, 440);   // On low platform
        
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
        
        // Valid spawn positions (x, y) - on platforms and ground
        // These are spots where enemies can stand
        this.spawnPoints = [
            { x: 100, y: 540 },   // Ground left
            { x: 300, y: 540 },   // Ground middle-left
            { x: 500, y: 540 },   // Ground middle-right
            { x: 700, y: 540 },   // Ground right
            { x: 600, y: 440 },   // Low platform
            { x: 200, y: 360 },   // Medium platform
            { x: 500, y: 280 },   // High platform
        ];
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
        // More enemies as levels progress (4 + 1 per 2 levels, max 7)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), 7);
        
        // Shuffle spawn points and pick the first N
        const shuffled = Phaser.Utils.Array.Shuffle([...this.spawnPoints]);
        for (let i = 0; i < enemyCount; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position
        this.player.setPosition(100, 450);
        this.player.setVelocity(0, 0);
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


```

```javascript
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
        
        // Spawn some enemies at fixed positions for now
        this.spawnEnemy(700, 540);   // On ground, right side
        this.spawnEnemy(550, 280);   // On high platform
        this.spawnEnemy(150, 360);   // On medium platform
        this.spawnEnemy(650, 440);   // On low platform
        
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
        // More enemies as levels progress (4 + 1 per 2 levels, max 7)
        const enemyCount = Math.min(4 + Math.floor(this.currentLevel / 2), 7);
        
        // Shuffle spawn points and pick the first N
        const shuffled = Phaser.Utils.Array.Shuffle([...this.spawnPoints]);
        for (let i = 0; i < enemyCount; i++) {
            this.spawnEnemy(shuffled[i].x, shuffled[i].y);
        }
        
        this.updateEnemyCount();
        this.levelInProgress = true;
        
        // Reset player position
        this.player.setPosition(100, 450);
        this.player.setVelocity(0, 0);
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


```

```javascript
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
        
        // Spawn some enemies at fixed positions for now
        this.spawnEnemy(700, 540);   // On ground, right side
        this.spawnEnemy(550, 280);   // On high platform
        this.spawnEnemy(150, 360);   // On medium platform
        this.spawnEnemy(650, 440);   // On low platform
        
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


```

Now let me update the initial enemy spawn positions to match the new platform layout:

```javascript
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


```

Done! **Refresh your browser** to see the water hazard.

---

## What Changed

**Water:**
- Dark blue water at the bottom of the screen with a lighter wave line on top
- Touching it respawns you at the starting platform (with a red flash)

**Platforms:**
- 10 platforms spread across the level in 4 rows
- Bottom row is just above the water
- Player spawns on the bottom-left platform

**Enemies:**
- Now spawn only on valid platform positions
- Won't spawn on your starting platform

---

## Try It Out

- Jump around between platforms
- Fall in the water to see the respawn
- Enemies are scattered across platforms to shoot

The platforming challenge is real now - miss a jump and you're in the water! 💀

**What next?** We could work on:
- Actual stick figure sprites (instead of rectangles)
- Random platform generation
- Lives/game over system

---

**User**

everything is good so far. should we be updating our context management folder? what about git? i have a git repo on chaceraiter/stick-game-test

---

**Cursor**

Great thinking! Yes, let's do both. This is a perfect checkpoint - you have a working game loop.

**What I'll do:**
1. Update the context management files with current progress
2. Stage and commit everything to git

```markdown
# Current Work Focus

We have a working playable prototype! The core game loop is functional: player can move, jump between platforms, shoot enemies, complete levels, and progress to randomly-generated next levels. Water hazard adds platforming challenge.

- **Project Goal:** Build a browser-based stick figure arena shooter with random level generation (Worms-style vibes)

- **Intermediate Goal:** Polish the prototype and add more game feel - better visuals, more variety, additional features from the aspirational list

- **Current Task:** Checkpoint reached! Next up could be: stick figure sprites, random platform generation, lives/game over system, or sound effects

```

```markdown
# Current Context for New Chat

## Project Status: Working Prototype ✓

The core game loop is complete and playable. This is a stick figure arena shooter built with Phaser 3.

## What Works

- **Player movement:** Arrow keys to move left/right, up to jump
- **Shooting:** Click to fire red laser toward mouse cursor
- **Enemies:** Red stick figures (rectangles) placed on platforms, destroyed when shot
- **Level progression:** Complete a level by shooting all enemies, click to start next level
- **Random spawns:** Enemies spawn at random valid platform positions each level
- **Progressive difficulty:** Enemy count increases every 2 levels (4 to start, max 9)
- **Water hazard:** Blue water at bottom kills player, respawns them at start with red flash
- **Platforms:** 10 platforms in 4 rows above the water

## File Structure

```
stick-game-test/
├── index.html              # Entry point, loads Phaser from CDN
├── js/
│   ├── game.js            # Phaser config (800x600, Arcade Physics, debug ON)
│   └── scenes/
│       └── PlayScene.js   # Main gameplay - all game logic currently here
├── ai-context-management/  # AI context system
└── README.md
```

## Technical Notes

- Using Phaser 3.70.0 via CDN
- Arcade Physics with gravity (800)
- Debug mode is ON (green collision boxes visible)
- All sprites are generated rectangles (no external assets yet)
- Run with `python3 -m http.server 8000`

## What Doesn't Exist Yet

- Actual stick figure sprites (using colored rectangles)
- Sound effects
- Grappling gun
- Multiple weapons
- Destructible terrain
- Enemy AI (enemies are static)
- Lives/game over system
- Random platform generation (platforms are fixed, only enemy positions randomize)

## Known Issues

None currently - everything is working as intended for the prototype.

## Recent Changes

1. Initial setup with player movement and jumping
2. Added shooting toward mouse cursor
3. Added static enemies that can be destroyed
4. Added level completion and random enemy spawns for next level
5. Added water hazard at bottom, replaced ground with platforms

```

Context files updated. Now let's commit to git:

Looks like git isn't initialized yet in this folder. Let me set it up and connect to your repo:

Git is set up. Let me stage everything and commit:

All done! ✅

---

## Summary

**Context files updated:**
- `current-work-focus.md` - Reflects that we have a working prototype
- `current-context-for-new-chat.md` - Documents everything that's working, file structure, and what's next

**Git committed and pushed:**
- Commit: `d025801` - "Initial prototype: working game loop with movement, shooting, enemies, levels, and water hazard"
- 19 files, 1143 lines
- Pushed to `https://github.com/chaceraiter/stick-game-test`

---

**Going forward:** Good practice is to commit at natural checkpoints like this. I'll remind you (or you can ask) when we hit good stopping points.

**Ready to keep building?** What would you like to tackle next:
- Actual stick figure sprites
- Random platform generation  
- Lives/game over system
- Sound effects
- Something else?

---

**User**

is this a lot of lines to have in like 1 file? playscene?

---

**Cursor**

Good instinct to ask! Here's my honest take:

**399 lines is fine for now**, especially for a prototype. But you're right that it's getting to the point where we'd think about splitting it up.

---

## When to Split

| File Size | Status |
|-----------|--------|
| < 200 lines | Totally fine |
| 200-500 lines | Watch it, consider splitting if adding more |
| 500+ lines | Should probably refactor |

You're in the "watch it" zone. If we keep adding features (weapons, grappling hook, enemy AI), it'll get harder to navigate.

---

## How We'd Split It

The architecture doc I wrote earlier suggested this structure:

```
js/
├── game.js
├── scenes/
│   └── PlayScene.js      ← Smaller, just orchestrates things
├── entities/
│   ├── Player.js         ← Movement, shooting, death logic
│   ├── Enemy.js          ← Enemy behavior
│   └── Bullet.js         ← Projectile logic
└── utils/
    └── LevelGenerator.js ← Spawn points, random generation
```

Each class handles its own logic. PlayScene just creates them and connects them.

---

## My Recommendation

**For a learning project:** Keep it as-is for now. One file is easier to understand and you can see everything together. Refactor when it feels painful to find things.

**If you want to learn the pattern:** We could refactor now as a learning exercise.

Your call - want to keep building features, or do a quick refactor first?

```plaintext
js/
├── game.js
├── scenes/
│   └── PlayScene.js      ← Smaller, just orchestrates things
├── entities/
│   ├── Player.js         ← Movement, shooting, death logic
│   ├── Enemy.js          ← Enemy behavior
│   └── Bullet.js         ← Projectile logic
└── utils/
    └── LevelGenerator.js ← Spawn points, random generation
```

---

**User**

thats fine for now i guess. i was thinking next we could change up the scale. i was thinking player character and non player characters way smaller

---

**Cursor**

Good idea! Smaller characters will make the arena feel bigger and more like a real stick figure game. Let me shrink them down:

```javascript
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
        playerGraphics.fillRect(0, 0, 8, 20);  // Small stick figure size
        playerGraphics.generateTexture('player', 8, 20);
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


```

```javascript
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
        playerGraphics.fillRect(0, 0, 8, 20);  // Small stick figure size
        playerGraphics.generateTexture('player', 8, 20);
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
        enemyGraphics.fillRect(0, 0, 8, 20);  // Same size as player
        enemyGraphics.generateTexture('enemy', 8, 20);
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


```

Let me also shrink the bullets to match the new scale:

```javascript
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
        playerGraphics.fillRect(0, 0, 8, 20);  // Small stick figure size
        playerGraphics.generateTexture('player', 8, 20);
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
        bulletGraphics.fillRect(0, 0, 6, 2);  // Smaller to match character scale
        bulletGraphics.generateTexture('bullet', 6, 2);
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
        enemyGraphics.fillRect(0, 0, 8, 20);  // Same size as player
        enemyGraphics.generateTexture('enemy', 8, 20);
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


```

Done! **Refresh your browser** to see the smaller characters.

---

## What Changed

| Element | Before | After |
|---------|--------|-------|
| Player | 20×40 px | 8×20 px |
| Enemies | 20×40 px | 8×20 px |
| Bullets | 12×4 px | 6×2 px |

The characters are now about **40% of the original size** - should feel much more like little stick figures in a big arena.

---

The movement speed and jump height are the same, so they'll feel faster/more agile relative to their size now. Let me know if you want to tweak the feel - we can adjust speed/jump if it feels too floaty or fast.

---

**User**

i suppose i meant zoom the camera out kind of. like scale the whole thing down. which has been almost done. but the jump height is still very high.

---

**Cursor**

Ah, got it! To complete the "zoomed out" feel, I need to reduce the jump height (and maybe movement speed) so the tiny characters don't leap across the whole screen.

```javascript
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
        playerGraphics.fillRect(0, 0, 8, 20);  // Small stick figure size
        playerGraphics.generateTexture('player', 8, 20);
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
        bulletGraphics.fillRect(0, 0, 6, 2);  // Smaller to match character scale
        bulletGraphics.generateTexture('bullet', 6, 2);
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
        enemyGraphics.fillRect(0, 0, 8, 20);  // Same size as player
        enemyGraphics.generateTexture('enemy', 8, 20);
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


```

**Refresh** and try it now.

---

## Changes

| Property | Before | After |
|----------|--------|-------|
| Speed | 200 | 120 |
| Jump | -500 | -280 |

The characters should move and jump in proportion to their smaller size now - more like watching tiny figures from a distance.

Let me know if it feels right or needs more tweaking. The platforms might be a bit tricky to reach now - we can adjust if needed.

---

**User**

now i was thinking of doing two things. make the window the proportions of a sheet of notebook paper. like with the 27 lines or whatever. and make the background look like one of those lined sheets

---

**Cursor**

Love this idea! A notebook paper aesthetic would be really cool for a stick figure game. Let me:

1. Change canvas to portrait notebook proportions
2. Draw a lined paper background with blue lines and red margin

```javascript
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
    
    // Background color (notebook paper cream)
    backgroundColor: '#f5f5dc',
    
    // Scenes to include (order matters - first one starts automatically)
    scene: [PlayScene]
};

// Create the game!
const game = new Phaser.Game(config);


```

Now let me update the scene with the lined paper background and adjust the layout for the new dimensions:

```javascript
    create() {
        // === NOTEBOOK PAPER BACKGROUND ===
        const graphics = this.add.graphics();
        
        // Draw horizontal ruled lines (blue)
        const lineSpacing = 26;  // ~27 lines on the page
        graphics.lineStyle(1, 0x9fc5e8);  // Light blue
        for (let y = lineSpacing; y < 700; y += lineSpacing) {
            graphics.moveTo(0, y);
            graphics.lineTo(550, y);
        }
        graphics.strokePath();
        
        // Draw red margin line
        graphics.lineStyle(2, 0xea9999);  // Pink-red
        graphics.moveTo(50, 0);
        graphics.lineTo(50, 700);
        graphics.strokePath();
        
        // Optional: three hole punch marks on the left
        graphics.fillStyle(0xcccccc);
        graphics.fillCircle(20, 150, 8);
        graphics.fillCircle(20, 350, 8);
        graphics.fillCircle(20, 550, 8);
        
        
        // === WATER HAZARD ===
        // Water at the bottom of the screen - kills the player!
        const waterGraphics = this.add.graphics();
        waterGraphics.fillStyle(0x1a5276);  // Dark blue
        waterGraphics.fillRect(0, 0, 550, 50);
        waterGraphics.generateTexture('water', 550, 50);
        waterGraphics.destroy();
        
        // Water is just a visual sprite (we'll use a zone for collision)
        this.add.image(275, 675, 'water');
        
        // Add some wave effect on top of water
        const waveGraphics = this.add.graphics();
        waveGraphics.fillStyle(0x2980b9);  // Lighter blue
        waveGraphics.fillRect(0, 0, 550, 6);
        waveGraphics.generateTexture('wave', 550, 6);
        waveGraphics.destroy();
        this.add.image(275, 653, 'wave');
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 40);
        this.physics.add.existing(this.waterZone, true);  // true = static body
        
        
        // === PLATFORMS ===
        this.platforms = this.physics.add.staticGroup();
        
        // Create platform textures - brown like pencil/wood
        const platGraphics = this.add.graphics();
        platGraphics.fillStyle(0x8B4513);  // Brown
        platGraphics.fillRect(0, 0, 100, 12);
        platGraphics.generateTexture('platform', 100, 12);
        platGraphics.destroy();
        
        const smallPlatGraphics = this.add.graphics();
        smallPlatGraphics.fillStyle(0x8B4513);
        smallPlatGraphics.fillRect(0, 0, 70, 12);
        smallPlatGraphics.generateTexture('platform-small', 70, 12);
        smallPlatGraphics.destroy();
        
        // Layout platforms for 550x700 canvas
        // Bottom row (just above water)
        this.platforms.create(100, 620, 'platform');
        this.platforms.create(275, 620, 'platform');
        this.platforms.create(450, 620, 'platform');
        
        // Row 2
        this.platforms.create(180, 540, 'platform');
        this.platforms.create(400, 540, 'platform-small');
        
        // Row 3
        this.platforms.create(80, 460, 'platform-small');
        this.platforms.create(300, 460, 'platform');
        this.platforms.create(480, 460, 'platform-small');
        
        // Row 4
        this.platforms.create(180, 380, 'platform-small');
        this.platforms.create(400, 380, 'platform');
        
        // Row 5
        this.platforms.create(100, 300, 'platform');
        this.platforms.create(320, 300, 'platform-small');
        this.platforms.create(480, 300, 'platform-small');
        
        // Top row
        this.platforms.create(220, 220, 'platform-small');
        this.platforms.create(400, 220, 'platform-small');
```

```javascript
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
        // === NOTEBOOK PAPER BACKGROUND ===
        const paperLines = this.add.graphics();
        
        // Draw horizontal ruled lines (blue)
        const lineSpacing = 26;  // ~27 lines on the page
        paperLines.lineStyle(1, 0x9fc5e8);  // Light blue
        for (let y = lineSpacing; y < 700; y += lineSpacing) {
            paperLines.moveTo(0, y);
            paperLines.lineTo(550, y);
        }
        paperLines.strokePath();
        
        // Draw red margin line
        paperLines.lineStyle(2, 0xea9999);  // Pink-red
        paperLines.moveTo(50, 0);
        paperLines.lineTo(50, 700);
        paperLines.strokePath();
        
        // Three hole punch marks on the left
        paperLines.fillStyle(0xcccccc);
        paperLines.fillCircle(20, 150, 8);
        paperLines.fillCircle(20, 350, 8);
        paperLines.fillCircle(20, 550, 8);
        
        
        // === WATER HAZARD ===
        // Water at the bottom of the screen - kills the player!
        const waterGraphics = this.add.graphics();
        waterGraphics.fillStyle(0x1a5276);  // Dark blue
        waterGraphics.fillRect(0, 0, 550, 50);
        waterGraphics.generateTexture('water', 550, 50);
        waterGraphics.destroy();
        
        // Water is just a visual sprite (we'll use a zone for collision)
        this.add.image(275, 675, 'water');
        
        // Add some wave effect on top of water
        const waveGraphics = this.add.graphics();
        waveGraphics.fillStyle(0x2980b9);  // Lighter blue
        waveGraphics.fillRect(0, 0, 550, 6);
        waveGraphics.generateTexture('wave', 550, 6);
        waveGraphics.destroy();
        this.add.image(275, 653, 'wave');
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 40);
        this.physics.add.existing(this.waterZone, true);  // true = static body
        
        
        // === PLATFORMS ===
        this.platforms = this.physics.add.staticGroup();
        
        // Create platform textures - smaller for new scale
        const platGraphics = this.add.graphics();
        platGraphics.fillStyle(0x8B4513);  // Brown
        platGraphics.fillRect(0, 0, 80, 10);
        platGraphics.generateTexture('platform', 80, 10);
        platGraphics.destroy();
        
        const smallPlatGraphics = this.add.graphics();
        smallPlatGraphics.fillStyle(0x8B4513);
        smallPlatGraphics.fillRect(0, 0, 55, 10);
        smallPlatGraphics.generateTexture('platform-small', 55, 10);
        smallPlatGraphics.destroy();
        
        // Layout platforms for 550x700 canvas
        // Bottom row (just above water)
        this.platforms.create(100, 620, 'platform');
        this.platforms.create(275, 620, 'platform');
        this.platforms.create(450, 620, 'platform');
        
        // Row 2
        this.platforms.create(180, 550, 'platform');
        this.platforms.create(400, 550, 'platform-small');
        
        // Row 3
        this.platforms.create(80, 480, 'platform-small');
        this.platforms.create(280, 480, 'platform');
        this.platforms.create(470, 480, 'platform-small');
        
        // Row 4
        this.platforms.create(170, 410, 'platform-small');
        this.platforms.create(380, 410, 'platform');
        
        // Row 5
        this.platforms.create(100, 340, 'platform');
        this.platforms.create(300, 340, 'platform-small');
        this.platforms.create(470, 340, 'platform-small');
        
        // Top row
        this.platforms.create(200, 270, 'platform-small');
        this.platforms.create(380, 270, 'platform-small')
        
        
        // === PLAYER ===
        // Create the player as a simple rectangle for now
        // Later we'll replace this with a proper stick figure sprite
        
        const playerGraphics = this.add.graphics();
        playerGraphics.fillStyle(0x2d2d2d);  // Dark gray (stick figure color)
        playerGraphics.fillRect(0, 0, 8, 20);  // Small stick figure size
        playerGraphics.generateTexture('player', 8, 20);
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
        bulletGraphics.fillRect(0, 0, 6, 2);  // Smaller to match character scale
        bulletGraphics.generateTexture('bullet', 6, 2);
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
        enemyGraphics.fillRect(0, 0, 8, 20);  // Same size as player
        enemyGraphics.generateTexture('enemy', 8, 20);
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


```

Now let me update the player start position and spawn points for the new layout:

```javascript
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
        // === NOTEBOOK PAPER BACKGROUND ===
        const paperLines = this.add.graphics();
        
        // Draw horizontal ruled lines (blue)
        const lineSpacing = 26;  // ~27 lines on the page
        paperLines.lineStyle(1, 0x9fc5e8);  // Light blue
        for (let y = lineSpacing; y < 700; y += lineSpacing) {
            paperLines.moveTo(0, y);
            paperLines.lineTo(550, y);
        }
        paperLines.strokePath();
        
        // Draw red margin line
        paperLines.lineStyle(2, 0xea9999);  // Pink-red
        paperLines.moveTo(50, 0);
        paperLines.lineTo(50, 700);
        paperLines.strokePath();
        
        // Three hole punch marks on the left
        paperLines.fillStyle(0xcccccc);
        paperLines.fillCircle(20, 150, 8);
        paperLines.fillCircle(20, 350, 8);
        paperLines.fillCircle(20, 550, 8);
        
        
        // === WATER HAZARD ===
        // Water at the bottom of the screen - kills the player!
        const waterGraphics = this.add.graphics();
        waterGraphics.fillStyle(0x1a5276);  // Dark blue
        waterGraphics.fillRect(0, 0, 550, 50);
        waterGraphics.generateTexture('water', 550, 50);
        waterGraphics.destroy();
        
        // Water is just a visual sprite (we'll use a zone for collision)
        this.add.image(275, 675, 'water');
        
        // Add some wave effect on top of water
        const waveGraphics = this.add.graphics();
        waveGraphics.fillStyle(0x2980b9);  // Lighter blue
        waveGraphics.fillRect(0, 0, 550, 6);
        waveGraphics.generateTexture('wave', 550, 6);
        waveGraphics.destroy();
        this.add.image(275, 653, 'wave');
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 40);
        this.physics.add.existing(this.waterZone, true);  // true = static body
        
        
        // === PLATFORMS ===
        this.platforms = this.physics.add.staticGroup();
        
        // Create platform textures - smaller for new scale
        const platGraphics = this.add.graphics();
        platGraphics.fillStyle(0x8B4513);  // Brown
        platGraphics.fillRect(0, 0, 80, 10);
        platGraphics.generateTexture('platform', 80, 10);
        platGraphics.destroy();
        
        const smallPlatGraphics = this.add.graphics();
        smallPlatGraphics.fillStyle(0x8B4513);
        smallPlatGraphics.fillRect(0, 0, 55, 10);
        smallPlatGraphics.generateTexture('platform-small', 55, 10);
        smallPlatGraphics.destroy();
        
        // Layout platforms for 550x700 canvas
        // Bottom row (just above water)
        this.platforms.create(100, 620, 'platform');
        this.platforms.create(275, 620, 'platform');
        this.platforms.create(450, 620, 'platform');
        
        // Row 2
        this.platforms.create(180, 550, 'platform');
        this.platforms.create(400, 550, 'platform-small');
        
        // Row 3
        this.platforms.create(80, 480, 'platform-small');
        this.platforms.create(280, 480, 'platform');
        this.platforms.create(470, 480, 'platform-small');
        
        // Row 4
        this.platforms.create(170, 410, 'platform-small');
        this.platforms.create(380, 410, 'platform');
        
        // Row 5
        this.platforms.create(100, 340, 'platform');
        this.platforms.create(300, 340, 'platform-small');
        this.platforms.create(470, 340, 'platform-small');
        
        // Top row
        this.platforms.create(200, 270, 'platform-small');
        this.platforms.create(380, 270, 'platform-small')
        
        
        // === PLAYER ===
        // Create the player as a simple rectangle for now
        // Later we'll replace this with a proper stick figure sprite
        
        const playerGraphics = this.add.graphics();
        playerGraphics.fillStyle(0x2d2d2d);  // Dark gray (stick figure color)
        playerGraphics.fillRect(0, 0, 8, 20);  // Small stick figure size
        playerGraphics.generateTexture('player', 8, 20);
        playerGraphics.destroy();
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
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
        bulletGraphics.fillRect(0, 0, 6, 2);  // Smaller to match character scale
        bulletGraphics.generateTexture('bullet', 6, 2);
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
        enemyGraphics.fillRect(0, 0, 8, 20);  // Same size as player
        enemyGraphics.generateTexture('enemy', 8, 20);
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


```

```javascript
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
        // === NOTEBOOK PAPER BACKGROUND ===
        const paperLines = this.add.graphics();
        
        // Draw horizontal ruled lines (blue)
        const lineSpacing = 26;  // ~27 lines on the page
        paperLines.lineStyle(1, 0x9fc5e8);  // Light blue
        for (let y = lineSpacing; y < 700; y += lineSpacing) {
            paperLines.moveTo(0, y);
            paperLines.lineTo(550, y);
        }
        paperLines.strokePath();
        
        // Draw red margin line
        paperLines.lineStyle(2, 0xea9999);  // Pink-red
        paperLines.moveTo(50, 0);
        paperLines.lineTo(50, 700);
        paperLines.strokePath();
        
        // Three hole punch marks on the left
        paperLines.fillStyle(0xcccccc);
        paperLines.fillCircle(20, 150, 8);
        paperLines.fillCircle(20, 350, 8);
        paperLines.fillCircle(20, 550, 8);
        
        
        // === WATER HAZARD ===
        // Water at the bottom of the screen - kills the player!
        const waterGraphics = this.add.graphics();
        waterGraphics.fillStyle(0x1a5276);  // Dark blue
        waterGraphics.fillRect(0, 0, 550, 50);
        waterGraphics.generateTexture('water', 550, 50);
        waterGraphics.destroy();
        
        // Water is just a visual sprite (we'll use a zone for collision)
        this.add.image(275, 675, 'water');
        
        // Add some wave effect on top of water
        const waveGraphics = this.add.graphics();
        waveGraphics.fillStyle(0x2980b9);  // Lighter blue
        waveGraphics.fillRect(0, 0, 550, 6);
        waveGraphics.generateTexture('wave', 550, 6);
        waveGraphics.destroy();
        this.add.image(275, 653, 'wave');
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 40);
        this.physics.add.existing(this.waterZone, true);  // true = static body
        
        
        // === PLATFORMS ===
        this.platforms = this.physics.add.staticGroup();
        
        // Create platform textures - smaller for new scale
        const platGraphics = this.add.graphics();
        platGraphics.fillStyle(0x8B4513);  // Brown
        platGraphics.fillRect(0, 0, 80, 10);
        platGraphics.generateTexture('platform', 80, 10);
        platGraphics.destroy();
        
        const smallPlatGraphics = this.add.graphics();
        smallPlatGraphics.fillStyle(0x8B4513);
        smallPlatGraphics.fillRect(0, 0, 55, 10);
        smallPlatGraphics.generateTexture('platform-small', 55, 10);
        smallPlatGraphics.destroy();
        
        // Layout platforms for 550x700 canvas
        // Bottom row (just above water)
        this.platforms.create(100, 620, 'platform');
        this.platforms.create(275, 620, 'platform');
        this.platforms.create(450, 620, 'platform');
        
        // Row 2
        this.platforms.create(180, 550, 'platform');
        this.platforms.create(400, 550, 'platform-small');
        
        // Row 3
        this.platforms.create(80, 480, 'platform-small');
        this.platforms.create(280, 480, 'platform');
        this.platforms.create(470, 480, 'platform-small');
        
        // Row 4
        this.platforms.create(170, 410, 'platform-small');
        this.platforms.create(380, 410, 'platform');
        
        // Row 5
        this.platforms.create(100, 340, 'platform');
        this.platforms.create(300, 340, 'platform-small');
        this.platforms.create(470, 340, 'platform-small');
        
        // Top row
        this.platforms.create(200, 270, 'platform-small');
        this.platforms.create(380, 270, 'platform-small')
        
        
        // === PLAYER ===
        // Create the player as a simple rectangle for now
        // Later we'll replace this with a proper stick figure sprite
        
        const playerGraphics = this.add.graphics();
        playerGraphics.fillStyle(0x2d2d2d);  // Dark gray (stick figure color)
        playerGraphics.fillRect(0, 0, 8, 20);  // Small stick figure size
        playerGraphics.generateTexture('player', 8, 20);
        playerGraphics.destroy();
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
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
        bulletGraphics.fillRect(0, 0, 6, 2);  // Smaller to match character scale
        bulletGraphics.generateTexture('bullet', 6, 2);
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
        enemyGraphics.fillRect(0, 0, 8, 20);  // Same size as player
        enemyGraphics.generateTexture('enemy', 8, 20);
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
            { x: 100, y: 600 },
            { x: 275, y: 600 },
            { x: 450, y: 600 },
            // Row 2
            { x: 180, y: 530 },
            { x: 400, y: 530 },
            // Row 3
            { x: 80, y: 460 },
            { x: 280, y: 460 },
            { x: 470, y: 460 },
            // Row 4
            { x: 170, y: 390 },
            { x: 380, y: 390 },
            // Row 5
            { x: 100, y: 320 },
            { x: 300, y: 320 },
            { x: 470, y: 320 },
            // Top row
            { x: 200, y: 250 },
            { x: 380, y: 250 },
        ];
        
        // Player start position (on left bottom platform)
        this.playerStartX = 100;
        this.playerStartY = 600;
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


```

```javascript
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
        // === NOTEBOOK PAPER BACKGROUND ===
        const paperLines = this.add.graphics();
        
        // Draw horizontal ruled lines (blue)
        const lineSpacing = 26;  // ~27 lines on the page
        paperLines.lineStyle(1, 0x9fc5e8);  // Light blue
        for (let y = lineSpacing; y < 700; y += lineSpacing) {
            paperLines.moveTo(0, y);
            paperLines.lineTo(550, y);
        }
        paperLines.strokePath();
        
        // Draw red margin line
        paperLines.lineStyle(2, 0xea9999);  // Pink-red
        paperLines.moveTo(50, 0);
        paperLines.lineTo(50, 700);
        paperLines.strokePath();
        
        // Three hole punch marks on the left
        paperLines.fillStyle(0xcccccc);
        paperLines.fillCircle(20, 150, 8);
        paperLines.fillCircle(20, 350, 8);
        paperLines.fillCircle(20, 550, 8);
        
        
        // === WATER HAZARD ===
        // Water at the bottom of the screen - kills the player!
        const waterGraphics = this.add.graphics();
        waterGraphics.fillStyle(0x1a5276);  // Dark blue
        waterGraphics.fillRect(0, 0, 550, 50);
        waterGraphics.generateTexture('water', 550, 50);
        waterGraphics.destroy();
        
        // Water is just a visual sprite (we'll use a zone for collision)
        this.add.image(275, 675, 'water');
        
        // Add some wave effect on top of water
        const waveGraphics = this.add.graphics();
        waveGraphics.fillStyle(0x2980b9);  // Lighter blue
        waveGraphics.fillRect(0, 0, 550, 6);
        waveGraphics.generateTexture('wave', 550, 6);
        waveGraphics.destroy();
        this.add.image(275, 653, 'wave');
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 40);
        this.physics.add.existing(this.waterZone, true);  // true = static body
        
        
        // === PLATFORMS ===
        this.platforms = this.physics.add.staticGroup();
        
        // Create platform textures - smaller for new scale
        const platGraphics = this.add.graphics();
        platGraphics.fillStyle(0x8B4513);  // Brown
        platGraphics.fillRect(0, 0, 80, 10);
        platGraphics.generateTexture('platform', 80, 10);
        platGraphics.destroy();
        
        const smallPlatGraphics = this.add.graphics();
        smallPlatGraphics.fillStyle(0x8B4513);
        smallPlatGraphics.fillRect(0, 0, 55, 10);
        smallPlatGraphics.generateTexture('platform-small', 55, 10);
        smallPlatGraphics.destroy();
        
        // Layout platforms for 550x700 canvas
        // Bottom row (just above water)
        this.platforms.create(100, 620, 'platform');
        this.platforms.create(275, 620, 'platform');
        this.platforms.create(450, 620, 'platform');
        
        // Row 2
        this.platforms.create(180, 550, 'platform');
        this.platforms.create(400, 550, 'platform-small');
        
        // Row 3
        this.platforms.create(80, 480, 'platform-small');
        this.platforms.create(280, 480, 'platform');
        this.platforms.create(470, 480, 'platform-small');
        
        // Row 4
        this.platforms.create(170, 410, 'platform-small');
        this.platforms.create(380, 410, 'platform');
        
        // Row 5
        this.platforms.create(100, 340, 'platform');
        this.platforms.create(300, 340, 'platform-small');
        this.platforms.create(470, 340, 'platform-small');
        
        // Top row
        this.platforms.create(200, 270, 'platform-small');
        this.platforms.create(380, 270, 'platform-small')
        
        
        // === PLAYER ===
        // Create the player as a simple rectangle for now
        // Later we'll replace this with a proper stick figure sprite
        
        const playerGraphics = this.add.graphics();
        playerGraphics.fillStyle(0x2d2d2d);  // Dark gray (stick figure color)
        playerGraphics.fillRect(0, 0, 8, 20);  // Small stick figure size
        playerGraphics.generateTexture('player', 8, 20);
        playerGraphics.destroy();
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
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
        bulletGraphics.fillRect(0, 0, 6, 2);  // Smaller to match character scale
        bulletGraphics.generateTexture('bullet', 6, 2);
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
        enemyGraphics.fillRect(0, 0, 8, 20);  // Same size as player
        enemyGraphics.generateTexture('enemy', 8, 20);
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
            { x: 100, y: 600 },
            { x: 275, y: 600 },
            { x: 450, y: 600 },
            // Row 2
            { x: 180, y: 530 },
            { x: 400, y: 530 },
            // Row 3
            { x: 80, y: 460 },
            { x: 280, y: 460 },
            { x: 470, y: 460 },
            // Row 4
            { x: 170, y: 390 },
            { x: 380, y: 390 },
            // Row 5
            { x: 100, y: 320 },
            { x: 300, y: 320 },
            { x: 470, y: 320 },
            // Top row
            { x: 200, y: 250 },
            { x: 380, y: 250 },
        ];
        
        // Player start position (on left bottom platform)
        this.playerStartX = 100;
        this.playerStartY = 600;
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


```

Let me also update the bullet cleanup boundaries for the new canvas size:

```javascript
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
        // === NOTEBOOK PAPER BACKGROUND ===
        const paperLines = this.add.graphics();
        
        // Draw horizontal ruled lines (blue)
        const lineSpacing = 26;  // ~27 lines on the page
        paperLines.lineStyle(1, 0x9fc5e8);  // Light blue
        for (let y = lineSpacing; y < 700; y += lineSpacing) {
            paperLines.moveTo(0, y);
            paperLines.lineTo(550, y);
        }
        paperLines.strokePath();
        
        // Draw red margin line
        paperLines.lineStyle(2, 0xea9999);  // Pink-red
        paperLines.moveTo(50, 0);
        paperLines.lineTo(50, 700);
        paperLines.strokePath();
        
        // Three hole punch marks on the left
        paperLines.fillStyle(0xcccccc);
        paperLines.fillCircle(20, 150, 8);
        paperLines.fillCircle(20, 350, 8);
        paperLines.fillCircle(20, 550, 8);
        
        
        // === WATER HAZARD ===
        // Water at the bottom of the screen - kills the player!
        const waterGraphics = this.add.graphics();
        waterGraphics.fillStyle(0x1a5276);  // Dark blue
        waterGraphics.fillRect(0, 0, 550, 50);
        waterGraphics.generateTexture('water', 550, 50);
        waterGraphics.destroy();
        
        // Water is just a visual sprite (we'll use a zone for collision)
        this.add.image(275, 675, 'water');
        
        // Add some wave effect on top of water
        const waveGraphics = this.add.graphics();
        waveGraphics.fillStyle(0x2980b9);  // Lighter blue
        waveGraphics.fillRect(0, 0, 550, 6);
        waveGraphics.generateTexture('wave', 550, 6);
        waveGraphics.destroy();
        this.add.image(275, 653, 'wave');
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 40);
        this.physics.add.existing(this.waterZone, true);  // true = static body
        
        
        // === PLATFORMS ===
        this.platforms = this.physics.add.staticGroup();
        
        // Create platform textures - smaller for new scale
        const platGraphics = this.add.graphics();
        platGraphics.fillStyle(0x8B4513);  // Brown
        platGraphics.fillRect(0, 0, 80, 10);
        platGraphics.generateTexture('platform', 80, 10);
        platGraphics.destroy();
        
        const smallPlatGraphics = this.add.graphics();
        smallPlatGraphics.fillStyle(0x8B4513);
        smallPlatGraphics.fillRect(0, 0, 55, 10);
        smallPlatGraphics.generateTexture('platform-small', 55, 10);
        smallPlatGraphics.destroy();
        
        // Layout platforms for 550x700 canvas
        // Bottom row (just above water)
        this.platforms.create(100, 620, 'platform');
        this.platforms.create(275, 620, 'platform');
        this.platforms.create(450, 620, 'platform');
        
        // Row 2
        this.platforms.create(180, 550, 'platform');
        this.platforms.create(400, 550, 'platform-small');
        
        // Row 3
        this.platforms.create(80, 480, 'platform-small');
        this.platforms.create(280, 480, 'platform');
        this.platforms.create(470, 480, 'platform-small');
        
        // Row 4
        this.platforms.create(170, 410, 'platform-small');
        this.platforms.create(380, 410, 'platform');
        
        // Row 5
        this.platforms.create(100, 340, 'platform');
        this.platforms.create(300, 340, 'platform-small');
        this.platforms.create(470, 340, 'platform-small');
        
        // Top row
        this.platforms.create(200, 270, 'platform-small');
        this.platforms.create(380, 270, 'platform-small')
        
        
        // === PLAYER ===
        // Create the player as a simple rectangle for now
        // Later we'll replace this with a proper stick figure sprite
        
        const playerGraphics = this.add.graphics();
        playerGraphics.fillStyle(0x2d2d2d);  // Dark gray (stick figure color)
        playerGraphics.fillRect(0, 0, 8, 20);  // Small stick figure size
        playerGraphics.generateTexture('player', 8, 20);
        playerGraphics.destroy();
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
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
        bulletGraphics.fillRect(0, 0, 6, 2);  // Smaller to match character scale
        bulletGraphics.generateTexture('bullet', 6, 2);
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
        enemyGraphics.fillRect(0, 0, 8, 20);  // Same size as player
        enemyGraphics.generateTexture('enemy', 8, 20);
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
            { x: 100, y: 600 },
            { x: 275, y: 600 },
            { x: 450, y: 600 },
            // Row 2
            { x: 180, y: 530 },
            { x: 400, y: 530 },
            // Row 3
            { x: 80, y: 460 },
            { x: 280, y: 460 },
            { x: 470, y: 460 },
            // Row 4
            { x: 170, y: 390 },
            { x: 380, y: 390 },
            // Row 5
            { x: 100, y: 320 },
            { x: 300, y: 320 },
            { x: 470, y: 320 },
            // Top row
            { x: 200, y: 250 },
            { x: 380, y: 250 },
        ];
        
        // Player start position (on left bottom platform)
        this.playerStartX = 100;
        this.playerStartY = 600;
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

Done! **Refresh your browser** to see the notebook paper aesthetic.

---

## What Changed

**Canvas:**
- 800×600 → 550×700 (portrait, notebook proportions)

**Background:**
- Cream paper color
- Blue horizontal ruled lines (26px spacing, ~27 lines)
- Red margin line on the left
- Three hole punch marks

**Layout:**
- All platforms repositioned for new dimensions
- Smaller platforms (80px and 55px wide)
- More vertical arrangement with 6 rows of platforms
- Water at the bottom

---

The game should now look like stick figures fighting on a page from a notebook! Let me know how it looks and if anything needs adjusting.

---

**User**

pretty good start. i have two reference images, the most recent files in my download folder. can you import these into the project folder for cataloguing and later reference. they're called notebook-something and example-map.png

---

**Cursor**

Found them! Let me create a reference folder and copy them over:

Let me take a look at these reference images:

Done! Copied to `/reference/` folder.

---

## What I See

**notebook-page-crumpled.jpg:**
- Crumpled paper texture (nice touch!)
- Blue horizontal lines
- Pink margin line
- Two hole punches (I did three - can adjust)
- White paper, not cream

**example-map.png:**
This is really helpful for the vision:
- **Hand-drawn platform outlines** - irregular shapes, not perfect rectangles
- **Red wavy hazard walls** on left and right sides (lava/fire?)
- **Blue wavy water** at the bottom
- Platforms have organic, sketchy edges
- Some platforms are L-shaped or irregular
- Very doodled-on-notebook aesthetic

---

This gives me a much clearer picture of the target aesthetic! The current platforms are too clean/geometric - they should look like someone sketched them with a pen.

Want me to:
1. Make the platforms look hand-drawn with irregular edges?
2. Add the side wall hazards (the red wavy lines)?
3. Use the crumpled paper as an actual background texture?

---

**User**

so the red on the example map is me trying to fill in the walls on the sides, not make it hazards. thats all it means. but everything else you're getting.

---

**Cursor**

Got it! So the red is just showing "this is where the walls are" - the arena boundaries. Not hazards, just the edges.

So the vision is:
- **Hand-drawn sketchy platforms** with irregular edges (not perfect rectangles)
- **Wavy water** at the bottom (also sketchy/doodled)
- **Wall boundaries** on the sides (just visual, the arena edges)
- Everything looks like it was doodled on notebook paper

---

Want me to start making the platforms and water look more hand-drawn/sketchy? I can draw them with irregular outlines instead of clean rectangles - more like someone drew them with a pen during class.

---

**User**

yes exactly

---

**Cursor**

Let's make it look doodled! I'll redraw the platforms and water with sketchy, hand-drawn lines.

```javascript
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
        // === NOTEBOOK PAPER BACKGROUND ===
        const paperLines = this.add.graphics();
        
        // Draw horizontal ruled lines (blue)
        const lineSpacing = 26;  // ~27 lines on the page
        paperLines.lineStyle(1, 0x9fc5e8);  // Light blue
        for (let y = lineSpacing; y < 700; y += lineSpacing) {
            paperLines.moveTo(0, y);
            paperLines.lineTo(550, y);
        }
        paperLines.strokePath();
        
        // Draw red margin line
        paperLines.lineStyle(2, 0xea9999);  // Pink-red
        paperLines.moveTo(50, 0);
        paperLines.lineTo(50, 700);
        paperLines.strokePath();
        
        // Three hole punch marks on the left
        paperLines.fillStyle(0xcccccc);
        paperLines.fillCircle(20, 150, 8);
        paperLines.fillCircle(20, 350, 8);
        paperLines.fillCircle(20, 550, 8);
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
        this.physics.add.existing(this.waterZone, true);  // true = static body
        
        
        // === PLATFORMS ===
        this.platforms = this.physics.add.staticGroup();
        
        // Create platform textures - smaller for new scale
        const platGraphics = this.add.graphics();
        platGraphics.fillStyle(0x8B4513);  // Brown
        platGraphics.fillRect(0, 0, 80, 10);
        platGraphics.generateTexture('platform', 80, 10);
        platGraphics.destroy();
        
        const smallPlatGraphics = this.add.graphics();
        smallPlatGraphics.fillStyle(0x8B4513);
        smallPlatGraphics.fillRect(0, 0, 55, 10);
        smallPlatGraphics.generateTexture('platform-small', 55, 10);
        smallPlatGraphics.destroy();
        
        // Layout platforms for 550x700 canvas
        // Bottom row (just above water)
        this.platforms.create(100, 620, 'platform');
        this.platforms.create(275, 620, 'platform');
        this.platforms.create(450, 620, 'platform');
        
        // Row 2
        this.platforms.create(180, 550, 'platform');
        this.platforms.create(400, 550, 'platform-small');
        
        // Row 3
        this.platforms.create(80, 480, 'platform-small');
        this.platforms.create(280, 480, 'platform');
        this.platforms.create(470, 480, 'platform-small');
        
        // Row 4
        this.platforms.create(170, 410, 'platform-small');
        this.platforms.create(380, 410, 'platform');
        
        // Row 5
        this.platforms.create(100, 340, 'platform');
        this.platforms.create(300, 340, 'platform-small');
        this.platforms.create(470, 340, 'platform-small');
        
        // Top row
        this.platforms.create(200, 270, 'platform-small');
        this.platforms.create(380, 270, 'platform-small')
        
        
        // === PLAYER ===
        // Create the player as a simple rectangle for now
        // Later we'll replace this with a proper stick figure sprite
        
        const playerGraphics = this.add.graphics();
        playerGraphics.fillStyle(0x2d2d2d);  // Dark gray (stick figure color)
        playerGraphics.fillRect(0, 0, 8, 20);  // Small stick figure size
        playerGraphics.generateTexture('player', 8, 20);
        playerGraphics.destroy();
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
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
        bulletGraphics.fillRect(0, 0, 6, 2);  // Smaller to match character scale
        bulletGraphics.generateTexture('bullet', 6, 2);
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
        enemyGraphics.fillRect(0, 0, 8, 20);  // Same size as player
        enemyGraphics.generateTexture('enemy', 8, 20);
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
            { x: 100, y: 600 },
            { x: 275, y: 600 },
            { x: 450, y: 600 },
            // Row 2
            { x: 180, y: 530 },
            { x: 400, y: 530 },
            // Row 3
            { x: 80, y: 460 },
            { x: 280, y: 460 },
            { x: 470, y: 460 },
            // Row 4
            { x: 170, y: 390 },
            { x: 380, y: 390 },
            // Row 5
            { x: 100, y: 320 },
            { x: 300, y: 320 },
            { x: 470, y: 320 },
            // Top row
            { x: 200, y: 250 },
            { x: 380, y: 250 },
        ];
        
        // Player start position (on left bottom platform)
        this.playerStartX = 100;
        this.playerStartY = 600;
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

```javascript
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
        // === NOTEBOOK PAPER BACKGROUND ===
        const paperLines = this.add.graphics();
        
        // Draw horizontal ruled lines (blue)
        const lineSpacing = 26;  // ~27 lines on the page
        paperLines.lineStyle(1, 0x9fc5e8);  // Light blue
        for (let y = lineSpacing; y < 700; y += lineSpacing) {
            paperLines.moveTo(0, y);
            paperLines.lineTo(550, y);
        }
        paperLines.strokePath();
        
        // Draw red margin line
        paperLines.lineStyle(2, 0xea9999);  // Pink-red
        paperLines.moveTo(50, 0);
        paperLines.lineTo(50, 700);
        paperLines.strokePath();
        
        // Three hole punch marks on the left
        paperLines.fillStyle(0xcccccc);
        paperLines.fillCircle(20, 150, 8);
        paperLines.fillCircle(20, 350, 8);
        paperLines.fillCircle(20, 550, 8);
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
        this.physics.add.existing(this.waterZone, true);  // true = static body
        
        
        // === PLATFORMS (hand-drawn style) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Helper function to draw a sketchy platform texture
        const createSketchyPlatform = (name, width, height) => {
            const g = this.add.graphics();
            const wobble = () => (Math.random() - 0.5) * 3;  // Random wobble for hand-drawn feel
            
            // Draw sketchy outline
            g.lineStyle(2, 0x1a1a1a);  // Dark pen color
            g.beginPath();
            
            // Top edge (slightly wobbly)
            g.moveTo(wobble(), wobble());
            for (let x = 0; x <= width; x += 10) {
                g.lineTo(x + wobble(), wobble() + 1);
            }
            
            // Right edge
            g.lineTo(width + wobble(), height + wobble());
            
            // Bottom edge (wobbly)
            for (let x = width; x >= 0; x -= 10) {
                g.lineTo(x + wobble(), height + wobble() - 1);
            }
            
            // Left edge back to start
            g.lineTo(wobble(), wobble());
            g.strokePath();
            
            // Optional: very light fill
            g.fillStyle(0x000000, 0.05);
            g.fillRect(2, 2, width - 4, height - 4);
            
            g.generateTexture(name, width + 6, height + 6);
            g.destroy();
        };
        
        // Create platform textures
        createSketchyPlatform('platform', 80, 12);
        createSketchyPlatform('platform-small', 55, 12);
        
        // Layout platforms for 550x700 canvas
        // Bottom row (just above water)
        this.platforms.create(100, 620, 'platform');
        this.platforms.create(275, 620, 'platform');
        this.platforms.create(450, 620, 'platform');
        
        // Row 2
        this.platforms.create(180, 550, 'platform');
        this.platforms.create(400, 550, 'platform-small');
        
        // Row 3
        this.platforms.create(80, 480, 'platform-small');
        this.platforms.create(280, 480, 'platform');
        this.platforms.create(470, 480, 'platform-small');
        
        // Row 4
        this.platforms.create(170, 410, 'platform-small');
        this.platforms.create(380, 410, 'platform');
        
        // Row 5
        this.platforms.create(100, 340, 'platform');
        this.platforms.create(300, 340, 'platform-small');
        this.platforms.create(470, 340, 'platform-small');
        
        // Top row
        this.platforms.create(200, 270, 'platform-small');
        this.platforms.create(380, 270, 'platform-small')
        
        
        // === PLAYER ===
        // Create the player as a simple rectangle for now
        // Later we'll replace this with a proper stick figure sprite
        
        const playerGraphics = this.add.graphics();
        playerGraphics.fillStyle(0x2d2d2d);  // Dark gray (stick figure color)
        playerGraphics.fillRect(0, 0, 8, 20);  // Small stick figure size
        playerGraphics.generateTexture('player', 8, 20);
        playerGraphics.destroy();
        
        // Create player with physics - start on the left bottom platform
        this.player = this.physics.add.sprite(100, 600, 'player');
        
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
        bulletGraphics.fillRect(0, 0, 6, 2);  // Smaller to match character scale
        bulletGraphics.generateTexture('bullet', 6, 2);
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
        enemyGraphics.fillRect(0, 0, 8, 20);  // Same size as player
        enemyGraphics.generateTexture('enemy', 8, 20);
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
            { x: 100, y: 600 },
            { x: 275, y: 600 },
            { x: 450, y: 600 },
            // Row 2
            { x: 180, y: 530 },
            { x: 400, y: 530 },
            // Row 3
            { x: 80, y: 460 },
            { x: 280, y: 460 },
            { x: 470, y: 460 },
            // Row 4
            { x: 170, y: 390 },
            { x: 380, y: 390 },
            // Row 5
            { x: 100, y: 320 },
            { x: 300, y: 320 },
            { x: 470, y: 320 },
            // Top row
            { x: 200, y: 250 },
            { x: 380, y: 250 },
        ];
        
        // Player start position (on left bottom platform)
        this.playerStartX = 100;
        this.playerStartY = 600;
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

Now let me make the player and enemies look hand-drawn too - outlines instead of solid rectangles:

```javascript
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
        // === NOTEBOOK PAPER BACKGROUND ===
        const paperLines = this.add.graphics();
        
        // Draw horizontal ruled lines (blue)
        const lineSpacing = 26;  // ~27 lines on the page
        paperLines.lineStyle(1, 0x9fc5e8);  // Light blue
        for (let y = lineSpacing; y < 700; y += lineSpacing) {
            paperLines.moveTo(0, y);
            paperLines.lineTo(550, y);
        }
        paperLines.strokePath();
        
        // Draw red margin line
        paperLines.lineStyle(2, 0xea9999);  // Pink-red
        paperLines.moveTo(50, 0);
        paperLines.lineTo(50, 700);
        paperLines.strokePath();
        
        // Three hole punch marks on the left
        paperLines.fillStyle(0xcccccc);
        paperLines.fillCircle(20, 150, 8);
        paperLines.fillCircle(20, 350, 8);
        paperLines.fillCircle(20, 550, 8);
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
        this.physics.add.existing(this.waterZone, true);  // true = static body
        
        
        // === PLATFORMS (hand-drawn style) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Helper function to draw a sketchy platform texture
        const createSketchyPlatform = (name, width, height) => {
            const g = this.add.graphics();
            const wobble = () => (Math.random() - 0.5) * 3;  // Random wobble for hand-drawn feel
            
            // Draw sketchy outline
            g.lineStyle(2, 0x1a1a1a);  // Dark pen color
            g.beginPath();
            
            // Top edge (slightly wobbly)
            g.moveTo(wobble(), wobble());
            for (let x = 0; x <= width; x += 10) {
                g.lineTo(x + wobble(), wobble() + 1);
            }
            
            // Right edge
            g.lineTo(width + wobble(), height + wobble());
            
            // Bottom edge (wobbly)
            for (let x = width; x >= 0; x -= 10) {
                g.lineTo(x + wobble(), height + wobble() - 1);
            }
            
            // Left edge back to start
            g.lineTo(wobble(), wobble());
            g.strokePath();
            
            // Optional: very light fill
            g.fillStyle(0x000000, 0.05);
            g.fillRect(2, 2, width - 4, height - 4);
            
            g.generateTexture(name, width + 6, height + 6);
            g.destroy();
        };
        
        // Create platform textures
        createSketchyPlatform('platform', 80, 12);
        createSketchyPlatform('platform-small', 55, 12);
        
        // Layout platforms for 550x700 canvas
        // Bottom row (just above water)
        this.platforms.create(100, 620, 'platform');
        this.platforms.create(275, 620, 'platform');
        this.platforms.create(450, 620, 'platform');
        
        // Row 2
        this.platforms.create(180, 550, 'platform');
        this.platforms.create(400, 550, 'platform-small');
        
        // Row 3
        this.platforms.create(80, 480, 'platform-small');
        this.platforms.create(280, 480, 'platform');
        this.platforms.create(470, 480, 'platform-small');
        
        // Row 4
        this.platforms.create(170, 410, 'platform-small');
        this.platforms.create(380, 410, 'platform');
        
        // Row 5
        this.platforms.create(100, 340, 'platform');
        this.platforms.create(300, 340, 'platform-small');
        this.platforms.create(470, 340, 'platform-small');
        
        // Top row
        this.platforms.create(200, 270, 'platform-small');
        this.platforms.create(380, 270, 'platform-small')
        
        
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
        bulletGraphics.fillRect(0, 0, 6, 2);  // Smaller to match character scale
        bulletGraphics.generateTexture('bullet', 6, 2);
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
        enemyGraphics.fillRect(0, 0, 8, 20);  // Same size as player
        enemyGraphics.generateTexture('enemy', 8, 20);
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
            { x: 100, y: 600 },
            { x: 275, y: 600 },
            { x: 450, y: 600 },
            // Row 2
            { x: 180, y: 530 },
            { x: 400, y: 530 },
            // Row 3
            { x: 80, y: 460 },
            { x: 280, y: 460 },
            { x: 470, y: 460 },
            // Row 4
            { x: 170, y: 390 },
            { x: 380, y: 390 },
            // Row 5
            { x: 100, y: 320 },
            { x: 300, y: 320 },
            { x: 470, y: 320 },
            // Top row
            { x: 200, y: 250 },
            { x: 380, y: 250 },
        ];
        
        // Player start position (on left bottom platform)
        this.playerStartX = 100;
        this.playerStartY = 600;
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

```javascript
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
        // === NOTEBOOK PAPER BACKGROUND ===
        const paperLines = this.add.graphics();
        
        // Draw horizontal ruled lines (blue)
        const lineSpacing = 26;  // ~27 lines on the page
        paperLines.lineStyle(1, 0x9fc5e8);  // Light blue
        for (let y = lineSpacing; y < 700; y += lineSpacing) {
            paperLines.moveTo(0, y);
            paperLines.lineTo(550, y);
        }
        paperLines.strokePath();
        
        // Draw red margin line
        paperLines.lineStyle(2, 0xea9999);  // Pink-red
        paperLines.moveTo(50, 0);
        paperLines.lineTo(50, 700);
        paperLines.strokePath();
        
        // Three hole punch marks on the left
        paperLines.fillStyle(0xcccccc);
        paperLines.fillCircle(20, 150, 8);
        paperLines.fillCircle(20, 350, 8);
        paperLines.fillCircle(20, 550, 8);
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
        this.physics.add.existing(this.waterZone, true);  // true = static body
        
        
        // === PLATFORMS (hand-drawn style) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Helper function to draw a sketchy platform texture
        const createSketchyPlatform = (name, width, height) => {
            const g = this.add.graphics();
            const wobble = () => (Math.random() - 0.5) * 3;  // Random wobble for hand-drawn feel
            
            // Draw sketchy outline
            g.lineStyle(2, 0x1a1a1a);  // Dark pen color
            g.beginPath();
            
            // Top edge (slightly wobbly)
            g.moveTo(wobble(), wobble());
            for (let x = 0; x <= width; x += 10) {
                g.lineTo(x + wobble(), wobble() + 1);
            }
            
            // Right edge
            g.lineTo(width + wobble(), height + wobble());
            
            // Bottom edge (wobbly)
            for (let x = width; x >= 0; x -= 10) {
                g.lineTo(x + wobble(), height + wobble() - 1);
            }
            
            // Left edge back to start
            g.lineTo(wobble(), wobble());
            g.strokePath();
            
            // Optional: very light fill
            g.fillStyle(0x000000, 0.05);
            g.fillRect(2, 2, width - 4, height - 4);
            
            g.generateTexture(name, width + 6, height + 6);
            g.destroy();
        };
        
        // Create platform textures
        createSketchyPlatform('platform', 80, 12);
        createSketchyPlatform('platform-small', 55, 12);
        
        // Layout platforms for 550x700 canvas
        // Bottom row (just above water)
        this.platforms.create(100, 620, 'platform');
        this.platforms.create(275, 620, 'platform');
        this.platforms.create(450, 620, 'platform');
        
        // Row 2
        this.platforms.create(180, 550, 'platform');
        this.platforms.create(400, 550, 'platform-small');
        
        // Row 3
        this.platforms.create(80, 480, 'platform-small');
        this.platforms.create(280, 480, 'platform');
        this.platforms.create(470, 480, 'platform-small');
        
        // Row 4
        this.platforms.create(170, 410, 'platform-small');
        this.platforms.create(380, 410, 'platform');
        
        // Row 5
        this.platforms.create(100, 340, 'platform');
        this.platforms.create(300, 340, 'platform-small');
        this.platforms.create(470, 340, 'platform-small');
        
        // Top row
        this.platforms.create(200, 270, 'platform-small');
        this.platforms.create(380, 270, 'platform-small')
        
        
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
        bulletGraphics.fillRect(0, 0, 6, 2);  // Smaller to match character scale
        bulletGraphics.generateTexture('bullet', 6, 2);
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
            { x: 100, y: 600 },
            { x: 275, y: 600 },
            { x: 450, y: 600 },
            // Row 2
            { x: 180, y: 530 },
            { x: 400, y: 530 },
            // Row 3
            { x: 80, y: 460 },
            { x: 280, y: 460 },
            { x: 470, y: 460 },
            // Row 4
            { x: 170, y: 390 },
            { x: 380, y: 390 },
            // Row 5
            { x: 100, y: 320 },
            { x: 300, y: 320 },
            { x: 470, y: 320 },
            // Top row
            { x: 200, y: 250 },
            { x: 380, y: 250 },
        ];
        
        // Player start position (on left bottom platform)
        this.playerStartX = 100;
        this.playerStartY = 600;
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

And let me make the bullets look like pen strokes too:

```javascript
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
        // === NOTEBOOK PAPER BACKGROUND ===
        const paperLines = this.add.graphics();
        
        // Draw horizontal ruled lines (blue)
        const lineSpacing = 26;  // ~27 lines on the page
        paperLines.lineStyle(1, 0x9fc5e8);  // Light blue
        for (let y = lineSpacing; y < 700; y += lineSpacing) {
            paperLines.moveTo(0, y);
            paperLines.lineTo(550, y);
        }
        paperLines.strokePath();
        
        // Draw red margin line
        paperLines.lineStyle(2, 0xea9999);  // Pink-red
        paperLines.moveTo(50, 0);
        paperLines.lineTo(50, 700);
        paperLines.strokePath();
        
        // Three hole punch marks on the left
        paperLines.fillStyle(0xcccccc);
        paperLines.fillCircle(20, 150, 8);
        paperLines.fillCircle(20, 350, 8);
        paperLines.fillCircle(20, 550, 8);
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
        this.physics.add.existing(this.waterZone, true);  // true = static body
        
        
        // === PLATFORMS (hand-drawn style) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Helper function to draw a sketchy platform texture
        const createSketchyPlatform = (name, width, height) => {
            const g = this.add.graphics();
            const wobble = () => (Math.random() - 0.5) * 3;  // Random wobble for hand-drawn feel
            
            // Draw sketchy outline
            g.lineStyle(2, 0x1a1a1a);  // Dark pen color
            g.beginPath();
            
            // Top edge (slightly wobbly)
            g.moveTo(wobble(), wobble());
            for (let x = 0; x <= width; x += 10) {
                g.lineTo(x + wobble(), wobble() + 1);
            }
            
            // Right edge
            g.lineTo(width + wobble(), height + wobble());
            
            // Bottom edge (wobbly)
            for (let x = width; x >= 0; x -= 10) {
                g.lineTo(x + wobble(), height + wobble() - 1);
            }
            
            // Left edge back to start
            g.lineTo(wobble(), wobble());
            g.strokePath();
            
            // Optional: very light fill
            g.fillStyle(0x000000, 0.05);
            g.fillRect(2, 2, width - 4, height - 4);
            
            g.generateTexture(name, width + 6, height + 6);
            g.destroy();
        };
        
        // Create platform textures
        createSketchyPlatform('platform', 80, 12);
        createSketchyPlatform('platform-small', 55, 12);
        
        // Layout platforms for 550x700 canvas
        // Bottom row (just above water)
        this.platforms.create(100, 620, 'platform');
        this.platforms.create(275, 620, 'platform');
        this.platforms.create(450, 620, 'platform');
        
        // Row 2
        this.platforms.create(180, 550, 'platform');
        this.platforms.create(400, 550, 'platform-small');
        
        // Row 3
        this.platforms.create(80, 480, 'platform-small');
        this.platforms.create(280, 480, 'platform');
        this.platforms.create(470, 480, 'platform-small');
        
        // Row 4
        this.platforms.create(170, 410, 'platform-small');
        this.platforms.create(380, 410, 'platform');
        
        // Row 5
        this.platforms.create(100, 340, 'platform');
        this.platforms.create(300, 340, 'platform-small');
        this.platforms.create(470, 340, 'platform-small');
        
        // Top row
        this.platforms.create(200, 270, 'platform-small');
        this.platforms.create(380, 270, 'platform-small')
        
        
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
            { x: 100, y: 600 },
            { x: 275, y: 600 },
            { x: 450, y: 600 },
            // Row 2
            { x: 180, y: 530 },
            { x: 400, y: 530 },
            // Row 3
            { x: 80, y: 460 },
            { x: 280, y: 460 },
            { x: 470, y: 460 },
            // Row 4
            { x: 170, y: 390 },
            { x: 380, y: 390 },
            // Row 5
            { x: 100, y: 320 },
            { x: 300, y: 320 },
            { x: 470, y: 320 },
            // Top row
            { x: 200, y: 250 },
            { x: 380, y: 250 },
        ];
        
        // Player start position (on left bottom platform)
        this.playerStartX = 100;
        this.playerStartY = 600;
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

Let me also fix the hole punches to match the reference (2 instead of 3):

```javascript
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
        // === NOTEBOOK PAPER BACKGROUND ===
        const paperLines = this.add.graphics();
        
        // Draw horizontal ruled lines (blue)
        const lineSpacing = 26;  // ~27 lines on the page
        paperLines.lineStyle(1, 0x9fc5e8);  // Light blue
        for (let y = lineSpacing; y < 700; y += lineSpacing) {
            paperLines.moveTo(0, y);
            paperLines.lineTo(550, y);
        }
        paperLines.strokePath();
        
        // Draw red margin line
        paperLines.lineStyle(2, 0xea9999);  // Pink-red
        paperLines.moveTo(50, 0);
        paperLines.lineTo(50, 700);
        paperLines.strokePath();
        
        // Two hole punch marks on the left (like the reference)
        paperLines.fillStyle(0xcccccc);
        paperLines.fillCircle(20, 200, 8);
        paperLines.fillCircle(20, 500, 8);
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
        this.physics.add.existing(this.waterZone, true);  // true = static body
        
        
        // === PLATFORMS (hand-drawn style) ===
        this.platforms = this.physics.add.staticGroup();
        
        // Helper function to draw a sketchy platform texture
        const createSketchyPlatform = (name, width, height) => {
            const g = this.add.graphics();
            const wobble = () => (Math.random() - 0.5) * 3;  // Random wobble for hand-drawn feel
            
            // Draw sketchy outline
            g.lineStyle(2, 0x1a1a1a);  // Dark pen color
            g.beginPath();
            
            // Top edge (slightly wobbly)
            g.moveTo(wobble(), wobble());
            for (let x = 0; x <= width; x += 10) {
                g.lineTo(x + wobble(), wobble() + 1);
            }
            
            // Right edge
            g.lineTo(width + wobble(), height + wobble());
            
            // Bottom edge (wobbly)
            for (let x = width; x >= 0; x -= 10) {
                g.lineTo(x + wobble(), height + wobble() - 1);
            }
            
            // Left edge back to start
            g.lineTo(wobble(), wobble());
            g.strokePath();
            
            // Optional: very light fill
            g.fillStyle(0x000000, 0.05);
            g.fillRect(2, 2, width - 4, height - 4);
            
            g.generateTexture(name, width + 6, height + 6);
            g.destroy();
        };
        
        // Create platform textures
        createSketchyPlatform('platform', 80, 12);
        createSketchyPlatform('platform-small', 55, 12);
        
        // Layout platforms for 550x700 canvas
        // Bottom row (just above water)
        this.platforms.create(100, 620, 'platform');
        this.platforms.create(275, 620, 'platform');
        this.platforms.create(450, 620, 'platform');
        
        // Row 2
        this.platforms.create(180, 550, 'platform');
        this.platforms.create(400, 550, 'platform-small');
        
        // Row 3
        this.platforms.create(80, 480, 'platform-small');
        this.platforms.create(280, 480, 'platform');
        this.platforms.create(470, 480, 'platform-small');
        
        // Row 4
        this.platforms.create(170, 410, 'platform-small');
        this.platforms.create(380, 410, 'platform');
        
        // Row 5
        this.platforms.create(100, 340, 'platform');
        this.platforms.create(300, 340, 'platform-small');
        this.platforms.create(470, 340, 'platform-small');
        
        // Top row
        this.platforms.create(200, 270, 'platform-small');
        this.platforms.create(380, 270, 'platform-small')
        
        
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
            { x: 100, y: 600 },
            { x: 275, y: 600 },
            { x: 450, y: 600 },
            // Row 2
            { x: 180, y: 530 },
            { x: 400, y: 530 },
            // Row 3
            { x: 80, y: 460 },
            { x: 280, y: 460 },
            { x: 470, y: 460 },
            // Row 4
            { x: 170, y: 390 },
            { x: 380, y: 390 },
            // Row 5
            { x: 100, y: 320 },
            { x: 300, y: 320 },
            { x: 470, y: 320 },
            // Top row
            { x: 200, y: 250 },
            { x: 380, y: 250 },
        ];
        
        // Player start position (on left bottom platform)
        this.playerStartX = 100;
        this.playerStartY = 600;
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

Done! **Refresh your browser** to see the hand-drawn style.

---

## What Changed

**Water:**
- Wavy blue lines instead of solid rectangle
- Semi-transparent fill with sketchy wave lines on top

**Platforms:**
- Drawn with wobbly pen strokes
- Irregular outlines like someone sketched them quickly
- Light transparent fill

**Player & Enemies:**
- Actual stick figures now! (head circle, body line, arms, legs)
- Player is black pen, enemies are red pen

**Bullets:**
- Short pen stroke dash instead of solid rectangle

**Hole punches:**
- Changed from 3 to 2 (matching your reference)

---

It should look much more like doodles on notebook paper now! Let me know what you think and what needs tweaking.

---

**User**

why dont you set up a repo of sorts of example platforms so you dont have to randomly generate? or in addition to randomly generated. clip the platforms i already made. does that sound like a good plan or am i off base? feel free to critique me

---

**Cursor**

No, you're totally on base - this is a great instinct! It's actually a common game design pattern called **"prefabs"** or **"chunks"**.

---

## Why This is Smart

**Fully random generation** has problems:
- Can create unfair/impossible jumps
- No quality control on shapes
- Hard to ensure good gameplay flow

**Hand-crafted prefabs** solve this:
- Each platform shape is tested and known to work
- You can create interesting irregular shapes (like your example-map.png)
- Mix and match for variety without randomness chaos
- Can still randomize *which* prefabs appear and *where*

---

## How I'd Structure It

```javascript
// Library of platform shapes - each is an array of {x, y} points
const PLATFORM_SHAPES = {
    // Simple flat platform
    basic: [
        {x: 0, y: 0}, {x: 80, y: 0}, {x: 80, y: 12}, {x: 0, y: 12}
    ],
    
    // L-shaped platform (like in your example)
    lShape: [
        {x: 0, y: 0}, {x: 40, y: 0}, {x: 40, y: 30}, 
        {x: 80, y: 30}, {x: 80, y: 42}, {x: 0, y: 42}
    ],
    
    // Stepped platform
    steps: [ /* points */ ],
    
    // etc...
};
```

Then level generation picks shapes from the library and places them.

---

## Next Step Options

1. **Catalog current platforms** - Turn what exists into named shapes
2. **Add irregular shapes** - Create L-shapes, steps, etc. like your example-map.png
3. **Build a simple level format** - Define levels as "put shape X at position Y"

Want me to set this up? I can create a platform shape library and refactor the level generation to use it.

```javascript
// Library of platform shapes - each is an array of {x, y} points
const PLATFORM_SHAPES = {
    // Simple flat platform
    basic: [
        {x: 0, y: 0}, {x: 80, y: 0}, {x: 80, y: 12}, {x: 0, y: 12}
    ],
    
    // L-shaped platform (like in your example)
    lShape: [
        {x: 0, y: 0}, {x: 40, y: 0}, {x: 40, y: 30}, 
        {x: 80, y: 30}, {x: 80, y: 42}, {x: 0, y: 42}
    ],
    
    // Stepped platform
    steps: [ /* points */ ],
    
    // etc...
};
```

---

**User**

yes go ahead and do that

---

**Cursor**

```javascript
/**
 * PlatformShapes.js - Library of hand-crafted platform shapes
 * 
 * Each shape is defined as an array of {x, y} points that form the outline.
 * Shapes are drawn clockwise starting from top-left.
 * The physics hitbox will be a simplified rectangle based on width/height.
 */

const PLATFORM_SHAPES = {
    
    // === BASIC SHAPES ===
    
    // Simple flat platform (wide)
    basic: {
        points: [
            {x: 0, y: 0}, {x: 80, y: 0}, {x: 80, y: 12}, {x: 0, y: 12}
        ],
        width: 80,
        height: 12
    },
    
    // Smaller flat platform
    basicSmall: {
        points: [
            {x: 0, y: 0}, {x: 55, y: 0}, {x: 55, y: 12}, {x: 0, y: 12}
        ],
        width: 55,
        height: 12
    },
    
    // Tiny platform (for tricky jumps)
    tiny: {
        points: [
            {x: 0, y: 0}, {x: 30, y: 0}, {x: 30, y: 10}, {x: 0, y: 10}
        ],
        width: 30,
        height: 10
    },
    
    // === IRREGULAR SHAPES (like the example-map) ===
    
    // L-shape facing right
    lShapeRight: {
        points: [
            {x: 0, y: 0}, {x: 40, y: 0}, {x: 40, y: 25},
            {x: 70, y: 25}, {x: 70, y: 37}, {x: 0, y: 37}
        ],
        width: 70,
        height: 37
    },
    
    // L-shape facing left
    lShapeLeft: {
        points: [
            {x: 30, y: 0}, {x: 70, y: 0}, {x: 70, y: 37},
            {x: 0, y: 37}, {x: 0, y: 25}, {x: 30, y: 25}
        ],
        width: 70,
        height: 37
    },
    
    // Step up (left to right)
    stepUp: {
        points: [
            {x: 0, y: 20}, {x: 35, y: 20}, {x: 35, y: 0},
            {x: 75, y: 0}, {x: 75, y: 12}, {x: 45, y: 12},
            {x: 45, y: 32}, {x: 0, y: 32}
        ],
        width: 75,
        height: 32
    },
    
    // Step down (left to right)
    stepDown: {
        points: [
            {x: 0, y: 0}, {x: 40, y: 0}, {x: 40, y: 20},
            {x: 75, y: 20}, {x: 75, y: 32}, {x: 0, y: 32}
        ],
        width: 75,
        height: 32
    },
    
    // Bump/hill shape
    bump: {
        points: [
            {x: 0, y: 15}, {x: 20, y: 5}, {x: 40, y: 0},
            {x: 60, y: 5}, {x: 80, y: 15}, {x: 80, y: 22},
            {x: 0, y: 22}
        ],
        width: 80,
        height: 22
    },
    
    // Notched platform (gap in middle)
    notched: {
        points: [
            {x: 0, y: 0}, {x: 30, y: 0}, {x: 30, y: 8},
            {x: 50, y: 8}, {x: 50, y: 0}, {x: 80, y: 0},
            {x: 80, y: 12}, {x: 0, y: 12}
        ],
        width: 80,
        height: 12
    },
    
    // Thick block
    block: {
        points: [
            {x: 0, y: 0}, {x: 45, y: 0}, {x: 45, y: 30}, {x: 0, y: 30}
        ],
        width: 45,
        height: 30
    },
    
    // Tall thin pillar
    pillar: {
        points: [
            {x: 0, y: 0}, {x: 20, y: 0}, {x: 20, y: 50}, {x: 0, y: 50}
        ],
        width: 20,
        height: 50
    },
    
    // Slanted top (ramp-ish, but flat for physics)
    slant: {
        points: [
            {x: 0, y: 15}, {x: 70, y: 0}, {x: 70, y: 12}, {x: 0, y: 27}
        ],
        width: 70,
        height: 27
    }
};


/**
 * Predefined level layouts - arrays of platform placements
 * Each placement has: shape name, x position, y position
 */
const LEVEL_LAYOUTS = [
    // Layout 1: Basic scattered platforms
    {
        name: "scattered",
        platforms: [
            { shape: 'basic', x: 100, y: 620 },
            { shape: 'basic', x: 275, y: 620 },
            { shape: 'basic', x: 450, y: 620 },
            { shape: 'basicSmall', x: 180, y: 550 },
            { shape: 'basicSmall', x: 400, y: 550 },
            { shape: 'basic', x: 280, y: 480 },
            { shape: 'basicSmall', x: 80, y: 480 },
            { shape: 'basicSmall', x: 470, y: 480 },
            { shape: 'basicSmall', x: 170, y: 410 },
            { shape: 'basic', x: 380, y: 410 },
            { shape: 'basic', x: 100, y: 340 },
            { shape: 'basicSmall', x: 300, y: 340 },
            { shape: 'basicSmall', x: 470, y: 340 },
            { shape: 'basicSmall', x: 200, y: 270 },
            { shape: 'basicSmall', x: 380, y: 270 }
        ]
    },
    
    // Layout 2: L-shapes and steps
    {
        name: "angular",
        platforms: [
            { shape: 'basic', x: 100, y: 620 },
            { shape: 'lShapeRight', x: 280, y: 600 },
            { shape: 'basic', x: 450, y: 620 },
            { shape: 'stepUp', x: 120, y: 530 },
            { shape: 'lShapeLeft', x: 380, y: 520 },
            { shape: 'basicSmall', x: 250, y: 450 },
            { shape: 'stepDown', x: 400, y: 420 },
            { shape: 'lShapeRight', x: 80, y: 380 },
            { shape: 'basic', x: 280, y: 350 },
            { shape: 'basicSmall', x: 470, y: 340 },
            { shape: 'basicSmall', x: 180, y: 280 },
            { shape: 'basicSmall', x: 380, y: 280 }
        ]
    },
    
    // Layout 3: Pillar heavy
    {
        name: "pillars",
        platforms: [
            { shape: 'basic', x: 80, y: 620 },
            { shape: 'basic', x: 275, y: 620 },
            { shape: 'basic', x: 470, y: 620 },
            { shape: 'pillar', x: 150, y: 570 },
            { shape: 'pillar', x: 400, y: 570 },
            { shape: 'basic', x: 200, y: 500 },
            { shape: 'basicSmall', x: 350, y: 480 },
            { shape: 'block', x: 100, y: 430 },
            { shape: 'pillar', x: 280, y: 420 },
            { shape: 'basicSmall', x: 420, y: 400 },
            { shape: 'basic', x: 180, y: 330 },
            { shape: 'basic', x: 380, y: 320 },
            { shape: 'basicSmall', x: 280, y: 260 }
        ]
    },
    
    // Layout 4: Mixed chaos
    {
        name: "chaos",
        platforms: [
            { shape: 'lShapeLeft', x: 60, y: 600 },
            { shape: 'bump', x: 250, y: 610 },
            { shape: 'stepUp', x: 420, y: 600 },
            { shape: 'notched', x: 150, y: 520 },
            { shape: 'block', x: 380, y: 510 },
            { shape: 'basicSmall', x: 80, y: 450 },
            { shape: 'lShapeRight', x: 230, y: 440 },
            { shape: 'tiny', x: 420, y: 430 },
            { shape: 'tiny', x: 470, y: 400 },
            { shape: 'stepDown', x: 100, y: 360 },
            { shape: 'basicSmall', x: 320, y: 340 },
            { shape: 'bump', x: 430, y: 330 },
            { shape: 'basic', x: 200, y: 270 },
            { shape: 'tiny', x: 380, y: 260 }
        ]
    }
];

```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stick Figure Arena</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            background-color: #1a1a2e;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        #game-container {
            border: 3px solid #4a4a6a;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div id="game-container"></div>
    
    <!-- Phaser 3 from CDN -->
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js"></script>
    
    <!-- Game files (using regular scripts since ES modules need a server) -->
    <script src="js/platforms/PlatformShapes.js"></script>
    <script src="js/scenes/PlayScene.js"></script>
    <script src="js/game.js"></script>
</body>
</html>


```

Now let me update PlayScene to use the shape library:

```javascript
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
        // === NOTEBOOK PAPER BACKGROUND ===
        const paperLines = this.add.graphics();
        
        // Draw horizontal ruled lines (blue)
        const lineSpacing = 26;  // ~27 lines on the page
        paperLines.lineStyle(1, 0x9fc5e8);  // Light blue
        for (let y = lineSpacing; y < 700; y += lineSpacing) {
            paperLines.moveTo(0, y);
            paperLines.lineTo(550, y);
        }
        paperLines.strokePath();
        
        // Draw red margin line
        paperLines.lineStyle(2, 0xea9999);  // Pink-red
        paperLines.moveTo(50, 0);
        paperLines.lineTo(50, 700);
        paperLines.strokePath();
        
        // Two hole punch marks on the left (like the reference)
        paperLines.fillStyle(0xcccccc);
        paperLines.fillCircle(20, 200, 8);
        paperLines.fillCircle(20, 500, 8);
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
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
            { x: 100, y: 600 },
            { x: 275, y: 600 },
            { x: 450, y: 600 },
            // Row 2
            { x: 180, y: 530 },
            { x: 400, y: 530 },
            // Row 3
            { x: 80, y: 460 },
            { x: 280, y: 460 },
            { x: 470, y: 460 },
            // Row 4
            { x: 170, y: 390 },
            { x: 380, y: 390 },
            // Row 5
            { x: 100, y: 320 },
            { x: 300, y: 320 },
            { x: 470, y: 320 },
            // Top row
            { x: 200, y: 250 },
            { x: 380, y: 250 },
        ];
        
        // Player start position (on left bottom platform)
        this.playerStartX = 100;
        this.playerStartY = 600;
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

Now let me add the `loadLayout` method and update level progression:

```javascript
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
        // === NOTEBOOK PAPER BACKGROUND ===
        const paperLines = this.add.graphics();
        
        // Draw horizontal ruled lines (blue)
        const lineSpacing = 26;  // ~27 lines on the page
        paperLines.lineStyle(1, 0x9fc5e8);  // Light blue
        for (let y = lineSpacing; y < 700; y += lineSpacing) {
            paperLines.moveTo(0, y);
            paperLines.lineTo(550, y);
        }
        paperLines.strokePath();
        
        // Draw red margin line
        paperLines.lineStyle(2, 0xea9999);  // Pink-red
        paperLines.moveTo(50, 0);
        paperLines.lineTo(50, 700);
        paperLines.strokePath();
        
        // Two hole punch marks on the left (like the reference)
        paperLines.fillStyle(0xcccccc);
        paperLines.fillCircle(20, 200, 8);
        paperLines.fillCircle(20, 500, 8);
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

```javascript
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
        // === NOTEBOOK PAPER BACKGROUND ===
        const paperLines = this.add.graphics();
        
        // Draw horizontal ruled lines (blue)
        const lineSpacing = 26;  // ~27 lines on the page
        paperLines.lineStyle(1, 0x9fc5e8);  // Light blue
        for (let y = lineSpacing; y < 700; y += lineSpacing) {
            paperLines.moveTo(0, y);
            paperLines.lineTo(550, y);
        }
        paperLines.strokePath();
        
        // Draw red margin line
        paperLines.lineStyle(2, 0xea9999);  // Pink-red
        paperLines.moveTo(50, 0);
        paperLines.lineTo(50, 700);
        paperLines.strokePath();
        
        // Two hole punch marks on the left (like the reference)
        paperLines.fillStyle(0xcccccc);
        paperLines.fillCircle(20, 200, 8);
        paperLines.fillCircle(20, 500, 8);
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
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
        
        // Re-add platform collisions
        this.physics.add.collider(this.player, this.platforms);
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

Let me fix the level text position for the narrower canvas:

```javascript
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
        // === NOTEBOOK PAPER BACKGROUND ===
        const paperLines = this.add.graphics();
        
        // Draw horizontal ruled lines (blue)
        const lineSpacing = 26;  // ~27 lines on the page
        paperLines.lineStyle(1, 0x9fc5e8);  // Light blue
        for (let y = lineSpacing; y < 700; y += lineSpacing) {
            paperLines.moveTo(0, y);
            paperLines.lineTo(550, y);
        }
        paperLines.strokePath();
        
        // Draw red margin line
        paperLines.lineStyle(2, 0xea9999);  // Pink-red
        paperLines.moveTo(50, 0);
        paperLines.lineTo(50, 700);
        paperLines.strokePath();
        
        // Two hole punch marks on the left (like the reference)
        paperLines.fillStyle(0xcccccc);
        paperLines.fillCircle(20, 200, 8);
        paperLines.fillCircle(20, 500, 8);
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
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
        
        // Level counter display (positioned for 550px wide canvas)
        this.levelText = this.add.text(470, 16, 'Level: 1', {
            fontSize: '14px',
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
        
        // Re-add platform collisions
        this.physics.add.collider(this.player, this.platforms);
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

```javascript
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
        // === NOTEBOOK PAPER BACKGROUND ===
        const paperLines = this.add.graphics();
        
        // Draw horizontal ruled lines (blue)
        const lineSpacing = 26;  // ~27 lines on the page
        paperLines.lineStyle(1, 0x9fc5e8);  // Light blue
        for (let y = lineSpacing; y < 700; y += lineSpacing) {
            paperLines.moveTo(0, y);
            paperLines.lineTo(550, y);
        }
        paperLines.strokePath();
        
        // Draw red margin line
        paperLines.lineStyle(2, 0xea9999);  // Pink-red
        paperLines.moveTo(50, 0);
        paperLines.lineTo(50, 700);
        paperLines.strokePath();
        
        // Two hole punch marks on the left (like the reference)
        paperLines.fillStyle(0xcccccc);
        paperLines.fillCircle(20, 200, 8);
        paperLines.fillCircle(20, 500, 8);
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
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
        
        // Level complete text (hidden initially) - centered for 550px canvas
        this.levelCompleteText = this.add.text(275, 300, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 15, y: 8 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(275, 350, 'Click to continue', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        
        // Level counter display (positioned for 550px wide canvas)
        this.levelText = this.add.text(470, 16, 'Level: 1', {
            fontSize: '14px',
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
        
        // Re-add platform collisions
        this.physics.add.collider(this.player, this.platforms);
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

```javascript
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
        // === NOTEBOOK PAPER BACKGROUND ===
        const paperLines = this.add.graphics();
        
        // Draw horizontal ruled lines (blue)
        const lineSpacing = 26;  // ~27 lines on the page
        paperLines.lineStyle(1, 0x9fc5e8);  // Light blue
        for (let y = lineSpacing; y < 700; y += lineSpacing) {
            paperLines.moveTo(0, y);
            paperLines.lineTo(550, y);
        }
        paperLines.strokePath();
        
        // Draw red margin line
        paperLines.lineStyle(2, 0xea9999);  // Pink-red
        paperLines.moveTo(50, 0);
        paperLines.lineTo(50, 700);
        paperLines.strokePath();
        
        // Two hole punch marks on the left (like the reference)
        paperLines.fillStyle(0xcccccc);
        paperLines.fillCircle(20, 200, 8);
        paperLines.fillCircle(20, 500, 8);
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
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
        
        // Enemy counter
        this.enemyCountText = this.add.text(16, 50, '', {
            fontSize: '18px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
        });
        this.updateEnemyCount();
        
        // Level complete text (hidden initially) - centered for 550px canvas
        this.levelCompleteText = this.add.text(275, 300, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 15, y: 8 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(275, 350, 'Click to continue', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        
        // Level counter display (positioned for 550px wide canvas)
        this.levelText = this.add.text(470, 16, 'Level: 1', {
            fontSize: '14px',
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
        
        // Re-add platform collisions
        this.physics.add.collider(this.player, this.platforms);
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

```javascript
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
        // === NOTEBOOK PAPER BACKGROUND ===
        const paperLines = this.add.graphics();
        
        // Draw horizontal ruled lines (blue)
        const lineSpacing = 26;  // ~27 lines on the page
        paperLines.lineStyle(1, 0x9fc5e8);  // Light blue
        for (let y = lineSpacing; y < 700; y += lineSpacing) {
            paperLines.moveTo(0, y);
            paperLines.lineTo(550, y);
        }
        paperLines.strokePath();
        
        // Draw red margin line
        paperLines.lineStyle(2, 0xea9999);  // Pink-red
        paperLines.moveTo(50, 0);
        paperLines.lineTo(50, 700);
        paperLines.strokePath();
        
        // Two hole punch marks on the left (like the reference)
        paperLines.fillStyle(0xcccccc);
        paperLines.fillCircle(20, 200, 8);
        paperLines.fillCircle(20, 500, 8);
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
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
        
        // Level complete text (hidden initially) - centered for 550px canvas
        this.levelCompleteText = this.add.text(275, 300, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 15, y: 8 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(275, 350, 'Click to continue', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        
        // Level counter display (positioned for 550px wide canvas)
        this.levelText = this.add.text(470, 16, 'Level: 1', {
            fontSize: '14px',
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
        
        // Re-add platform collisions
        this.physics.add.collider(this.player, this.platforms);
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

Done! **Refresh your browser** to see the new system.

---

## What I Built

### New File: `js/platforms/PlatformShapes.js`

**Shape Library** with 11 different platform shapes:
| Shape | Description |
|-------|-------------|
| `basic` | Standard flat platform (80px) |
| `basicSmall` | Smaller flat (55px) |
| `tiny` | Very small (30px) for tricky jumps |
| `lShapeRight` | L-shape extending right |
| `lShapeLeft` | L-shape extending left |
| `stepUp` | Stepped platform going up |
| `stepDown` | Stepped platform going down |
| `bump` | Rounded hill shape |
| `notched` | Platform with a notch cut out |
| `block` | Thick square block |
| `pillar` | Tall thin vertical piece |

**4 Predefined Level Layouts:**
1. `scattered` - Basic platforms spread around
2. `angular` - L-shapes and steps
3. `pillars` - Vertical pillar heavy
4. `chaos` - Mixed everything

---

## How It Works Now

- Level 1 starts with layout "scattered"
- Each time you complete a level, it cycles to the next layout
- After all 4 layouts, it loops back
- Enemies spawn randomly on the current layout's platforms
- Enemy count still increases with level progression

---

## To Add More

Edit `PlatformShapes.js` to:
- Add new shapes to `PLATFORM_SHAPES`
- Create new layouts in `LEVEL_LAYOUTS`

Let me know how it plays and if you want to tweak any shapes or layouts!

---

**User**

things are looking good so far. i definitely have a wishlist. perhaps we could define that and then do the items and test one by one?

---

**Cursor**

Love that approach! Let's map out your wishlist and then knock them out one at a time.

**What's on your wishlist?** Just list out everything you're thinking - features, fixes, polish, whatever. Could be things like:

- Gameplay features (grappling hook, more weapons, destructible terrain, etc.)
- Visual improvements (actual stick figures, animations, effects)
- Level design (more layouts, random generation tweaks)
- Game feel (sound effects, screen shake, death animations)
- Quality of life (pause menu, restart button, etc.)
- Bugs or tweaks to existing stuff

Once you give me the list, I'll organize it into a task list and we'll work through them testing each one before moving to the next.

---

**User**

it seems like the background isnt really like different as in the white notebook photo i uploaded still. firstly

---

**Cursor**

Ah, you're right! I'm just drawing basic lines on a flat cream color, but your reference image has that crumpled paper texture with wrinkles and depth.

Let me use the actual image you provided as the background:

Now let me update PlayScene to use the actual image as background:

```javascript
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
        // Load the crumpled notebook paper background
        this.load.image('notebook-paper', 'assets/notebook-page-crumpled.jpg');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND ===
        const paperLines = this.add.graphics();
        
        // Draw horizontal ruled lines (blue)
        const lineSpacing = 26;  // ~27 lines on the page
        paperLines.lineStyle(1, 0x9fc5e8);  // Light blue
        for (let y = lineSpacing; y < 700; y += lineSpacing) {
            paperLines.moveTo(0, y);
            paperLines.lineTo(550, y);
        }
        paperLines.strokePath();
        
        // Draw red margin line
        paperLines.lineStyle(2, 0xea9999);  // Pink-red
        paperLines.moveTo(50, 0);
        paperLines.lineTo(50, 700);
        paperLines.strokePath();
        
        // Two hole punch marks on the left (like the reference)
        paperLines.fillStyle(0xcccccc);
        paperLines.fillCircle(20, 200, 8);
        paperLines.fillCircle(20, 500, 8);
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
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
        
        // Level complete text (hidden initially) - centered for 550px canvas
        this.levelCompleteText = this.add.text(275, 300, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 15, y: 8 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(275, 350, 'Click to continue', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        
        // Level counter display (positioned for 550px wide canvas)
        this.levelText = this.add.text(470, 16, 'Level: 1', {
            fontSize: '14px',
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
        
        // Re-add platform collisions
        this.physics.add.collider(this.player, this.platforms);
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

```javascript
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
        // Load the crumpled notebook paper background
        this.load.image('notebook-paper', 'assets/notebook-page-crumpled.jpg');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using actual image) ===
        // Add the crumpled paper image, scaled to fit the canvas
        const paper = this.add.image(275, 350, 'notebook-paper');
        paper.setDisplaySize(550, 700);  // Scale to fit canvas
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
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
        
        // Level complete text (hidden initially) - centered for 550px canvas
        this.levelCompleteText = this.add.text(275, 300, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 15, y: 8 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(275, 350, 'Click to continue', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        
        // Level counter display (positioned for 550px wide canvas)
        this.levelText = this.add.text(470, 16, 'Level: 1', {
            fontSize: '14px',
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
        
        // Re-add platform collisions
        this.physics.add.collider(this.player, this.platforms);
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

Let me also update the fallback background color to white (in case image doesn't load):

```javascript
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


```

**Refresh your browser** to see the actual crumpled notebook paper as the background.

---

**What changed:**
- Now using your uploaded `notebook-page-crumpled.jpg` as the actual background
- Scaled to fit the 550×700 canvas
- Has all the authentic paper texture, wrinkles, ruled lines, and margin

---

Let me know how it looks! Then we can continue building out your wishlist - what else is on it?

---

**User**

good except could you crop the image or expand the background image so that the borders of the paper are the border of the screen or game window? its ok if you have to crop in a straight line if the "paper" in the image doesnt have perfrectly straight lines

---

**Cursor**

Got it! I'll zoom in on the paper so the edges are cropped out and it fills the whole screen.

```javascript
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
        // Load the crumpled notebook paper background
        this.load.image('notebook-paper', 'assets/notebook-page-crumpled.jpg');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using actual image) ===
        // Add the crumpled paper image, zoomed in to crop out the borders
        const paper = this.add.image(275, 350, 'notebook-paper');
        // Scale up ~130% so paper edges are outside the visible canvas
        paper.setDisplaySize(720, 910);  // Cropped/zoomed to fill edge-to-edge
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
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
        
        // Level complete text (hidden initially) - centered for 550px canvas
        this.levelCompleteText = this.add.text(275, 300, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 15, y: 8 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(275, 350, 'Click to continue', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        
        // Level counter display (positioned for 550px wide canvas)
        this.levelText = this.add.text(470, 16, 'Level: 1', {
            fontSize: '14px',
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
        
        // Re-add platform collisions
        this.physics.add.collider(this.player, this.platforms);
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

**Refresh** - I've zoomed the image to ~130% so the paper edges are cropped out and the lined paper fills the entire game window.

If it's still not quite right (too much border showing, or too zoomed), let me know and I can adjust the zoom level.

---

**User**

not quite! i still want to have the notebook holes visible. like now the red vertical line is too far right and the top of the paper is cut off can i give you permission to visually check things yourself? would that help?

---

**Cursor**

Yes! Let me look at the image again to get the positioning right:

I can see it now! The holes and margin are on the left side of the image. I was centering the zoom wrong - I need to shift the image so the left side (with holes) stays visible while cropping the right edge.

```javascript
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
        // Load the crumpled notebook paper background
        this.load.image('notebook-paper', 'assets/notebook-page-crumpled.jpg');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using actual image) ===
        // Add the crumpled paper image, positioned to show holes/margin on left
        // while cropping the white border around the paper
        const paper = this.add.image(310, 380, 'notebook-paper');
        // Scale up to crop borders, shift right/down to keep left edge + holes visible
        paper.setDisplaySize(680, 860);
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
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
        
        // Level complete text (hidden initially) - centered for 550px canvas
        this.levelCompleteText = this.add.text(275, 300, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 15, y: 8 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(275, 350, 'Click to continue', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        
        // Level counter display (positioned for 550px wide canvas)
        this.levelText = this.add.text(470, 16, 'Level: 1', {
            fontSize: '14px',
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
        
        // Re-add platform collisions
        this.physics.add.collider(this.player, this.platforms);
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

**Refresh** and check - I shifted the image to keep the left edge (holes + margin) visible while still cropping the white border around the paper.

If it still needs tweaking, let me know which direction to adjust:
- "more left" / "more right" 
- "more up" / "more down"
- "more zoomed in" / "less zoomed"

---

**User**

ok lets rewind back to before i said to zoom in on the paper. why dont you make a copy of and manually crop the reference image to just at the edge of the paper

---

**Cursor**

Good call - that's the cleaner approach. Let me crop the image file directly:

Let me check how the crop looks:

Still has some white edge showing on the right and bottom. Let me crop tighter:

Much better! The paper fills almost the whole image now with holes and margin visible. Now let me update the game to use this cropped version and scale it to fit:

```javascript
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
        // Load the cropped crumpled notebook paper background
        this.load.image('notebook-paper', 'assets/notebook-paper-cropped.jpg');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using actual image) ===
        // Add the crumpled paper image, positioned to show holes/margin on left
        // while cropping the white border around the paper
        const paper = this.add.image(310, 380, 'notebook-paper');
        // Scale up to crop borders, shift right/down to keep left edge + holes visible
        paper.setDisplaySize(680, 860);
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
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
        
        // Level complete text (hidden initially) - centered for 550px canvas
        this.levelCompleteText = this.add.text(275, 300, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 15, y: 8 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(275, 350, 'Click to continue', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        
        // Level counter display (positioned for 550px wide canvas)
        this.levelText = this.add.text(470, 16, 'Level: 1', {
            fontSize: '14px',
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
        
        // Re-add platform collisions
        this.physics.add.collider(this.player, this.platforms);
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

```javascript
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
        // Load the cropped crumpled notebook paper background
        this.load.image('notebook-paper', 'assets/notebook-paper-cropped.jpg');
    }

    create() {
        // === NOTEBOOK PAPER BACKGROUND (using cropped image) ===
        // Paper is pre-cropped to edges, just scale to fit canvas
        const paper = this.add.image(275, 350, 'notebook-paper');
        paper.setDisplaySize(550, 700);
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
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
        
        // Level complete text (hidden initially) - centered for 550px canvas
        this.levelCompleteText = this.add.text(275, 300, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 15, y: 8 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(275, 350, 'Click to continue', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        
        // Level counter display (positioned for 550px wide canvas)
        this.levelText = this.add.text(470, 16, 'Level: 1', {
            fontSize: '14px',
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
        
        // Re-add platform collisions
        this.physics.add.collider(this.player, this.platforms);
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

**Refresh** - I cropped the image file directly to the paper edges and now it scales to fit the canvas exactly.

You should see:
- Full crumpled paper texture
- 3 hole punches on the left
- Red margin line visible
- Blue ruled lines
- No white border around the paper

How does it look?

---

**User**

very close. lets checkpoint there. whatever checkpointing entails you think

---

**Cursor**

```markdown
# Current Context for New Chat

## Project Status: Playable Prototype with Notebook Paper Aesthetic ✓

A stick figure arena shooter built with Phaser 3, styled to look like doodles on crumpled notebook paper.

## What Works

- **Player movement:** Arrow keys to move left/right, up to jump
- **Shooting:** Click to fire toward mouse cursor
- **Enemies:** Red stick figures placed on platforms, destroyed when shot
- **Level progression:** Complete a level by shooting all enemies, click to continue
- **Level layouts:** 4 predefined layouts that cycle (scattered, angular, pillars, chaos)
- **Platform shape library:** 11 different shapes (basic, L-shapes, steps, blocks, etc.)
- **Water hazard:** Blue wavy water at bottom kills player, respawns at start
- **Notebook paper background:** Actual crumpled paper image (cropped to edges)
- **Hand-drawn aesthetic:** Stick figures, sketchy platform outlines, pen-stroke bullets

## File Structure

```
stick-game-test/
├── index.html                    # Entry point, loads Phaser from CDN
├── js/
│   ├── game.js                   # Phaser config (550x700 canvas)
│   ├── platforms/
│   │   └── PlatformShapes.js     # Shape library + level layouts
│   └── scenes/
│       └── PlayScene.js          # Main gameplay
├── assets/
│   ├── notebook-page-crumpled.jpg    # Original reference
│   └── notebook-paper-cropped.jpg    # Cropped version used in game
├── reference/
│   ├── notebook-page-crumpled.jpg    # Reference image
│   └── example-map.png               # Level design reference
├── ai-context-management/            # AI context system
└── README.md
```

## Technical Notes

- Phaser 3.70.0 via CDN
- Canvas: 550x700 (notebook paper proportions)
- Arcade Physics with gravity (800)
- Debug mode ON (green collision boxes visible)
- Run with `python3 -m http.server 8000`

## What Doesn't Exist Yet

- Grappling gun
- Multiple weapons
- Destructible terrain
- Enemy AI (enemies are static)
- Lives/game over system
- Sound effects
- Actual animations (stick figures are static)

## Recent Changes

1. Initial prototype with movement, shooting, enemies, levels
2. Added water hazard, replaced ground with platforms
3. Resized to notebook paper proportions (550x700)
4. Added hand-drawn aesthetic (sketchy platforms, stick figures)
5. Created platform shape library with 11 shapes
6. Added 4 predefined level layouts
7. Added actual crumpled notebook paper background image (cropped)

## Known Issues

- Some white border may still show at paper edges (minor)
- Platforms may need position tweaking for some layouts

```

```markdown
# Current Work Focus

Playable prototype with notebook paper aesthetic is working. Core game loop complete. Platform shape library and level layouts system in place. Now working through a wishlist of improvements.

- **Project Goal:** Build a browser-based stick figure arena shooter with random level generation (Worms-style vibes, notebook paper aesthetic)

- **Intermediate Goal:** Polish the notebook paper visual style and add more game features from the wishlist

- **Current Task:** User defining wishlist of features/improvements to tackle one by one

```

**Checkpoint complete!** ✅

---

**Saved:**
- Context files updated with current state
- Git commit: `d69aca3` - "Notebook paper aesthetic: crumpled paper background, hand-drawn stick figures, platform shape library with 4 level layouts"
- Pushed to GitHub

---

**Current state:**
- Playable game with notebook paper look
- Hand-drawn stick figures and platforms
- 4 level layouts cycling
- Crumpled paper background

---

**Ready for your wishlist!** What features/improvements do you want to tackle? List them out and we'll work through them one by one.

---

**User**

i cropped the notebook page myself. perhaps it looks a little different and theres some overhang or underhang or whatever but the point was to preserve the scale and dimensions of things. try that? or try cropping like that.

---

**Cursor**

Let me check for your cropped version:

I don't see a new file in your Downloads. The most recent is still `notebook-page-crumpled.jpg` from earlier. 

Did you save your cropped version somewhere else? Or if you haven't saved it yet, go ahead and save it and let me know the filename/location!

---

**User**

i dropped it in the reference folder sorry

---

**Cursor**

Found it! Let me check your crop:

Nice crop! Keeps the paper edge at the actual paper boundaries. Let me use this:

```javascript
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
        const paper = this.add.image(275, 350, 'notebook-paper');
        paper.setDisplaySize(550, 700);
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
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
        
        // Level complete text (hidden initially) - centered for 550px canvas
        this.levelCompleteText = this.add.text(275, 300, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 15, y: 8 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(275, 350, 'Click to continue', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        
        // Level counter display (positioned for 550px wide canvas)
        this.levelText = this.add.text(470, 16, 'Level: 1', {
            fontSize: '14px',
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
        
        // Re-add platform collisions
        this.physics.add.collider(this.player, this.platforms);
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

**Refresh** - now using your cropped version that preserves the proper scale of the lines, holes, and margin.

How does it look?

---

**User**

good. now it appears whenever i respawn that i respawn twice. like the character appears and starts dropping immediately through the platform and then appears again on top of it.

---

**Cursor**

That sounds like the water collision is triggering multiple times. Let me check and fix the respawn logic:

Found it! The water overlap fires continuously while the player is in the water zone. I need to add a cooldown to prevent multiple triggers:

```javascript
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
        const paper = this.add.image(275, 350, 'notebook-paper');
        paper.setDisplaySize(550, 700);
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
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
        
        // Level complete text (hidden initially) - centered for 550px canvas
        this.levelCompleteText = this.add.text(275, 300, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 15, y: 8 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(275, 350, 'Click to continue', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        
        // Level counter display (positioned for 550px wide canvas)
        this.levelText = this.add.text(470, 16, 'Level: 1', {
            fontSize: '14px',
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
        
        // Re-add platform collisions
        this.physics.add.collider(this.player, this.platforms);
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
        
        // Reset player position
        this.player.setPosition(this.playerStartX, this.playerStartY);
        this.player.setVelocity(0, 0);
    }
    
    /**
     * Called when player touches water
     */
    playerDied() {
        // Prevent multiple triggers while respawning
        if (this.isRespawning) return;
        this.isRespawning = true;
        
        // Reset player to start position
        this.player.setPosition(this.playerStartX, this.playerStartY);
        this.player.setVelocity(0, 0);
        
        // Brief visual feedback - flash the player
        this.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            this.player.clearTint();
        });
        
        // Clear respawn flag after a short delay
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

Let me also initialize the flag:

```javascript
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
        const paper = this.add.image(275, 350, 'notebook-paper');
        paper.setDisplaySize(550, 700);
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
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
        
        // Level complete text (hidden initially) - centered for 550px canvas
        this.levelCompleteText = this.add.text(275, 300, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 15, y: 8 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(275, 350, 'Click to continue', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display (positioned for 550px wide canvas)
        this.levelText = this.add.text(470, 16, 'Level: 1', {
            fontSize: '14px',
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
        
        // Re-add platform collisions
        this.physics.add.collider(this.player, this.platforms);
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
        
        // Reset player position
        this.player.setPosition(this.playerStartX, this.playerStartY);
        this.player.setVelocity(0, 0);
    }
    
    /**
     * Called when player touches water
     */
    playerDied() {
        // Prevent multiple triggers while respawning
        if (this.isRespawning) return;
        this.isRespawning = true;
        
        // Reset player to start position
        this.player.setPosition(this.playerStartX, this.playerStartY);
        this.player.setVelocity(0, 0);
        
        // Brief visual feedback - flash the player
        this.player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            this.player.clearTint();
        });
        
        // Clear respawn flag after a short delay
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

**Refresh** - added a respawn cooldown flag so the water collision doesn't trigger multiple times.

Try falling in the water now - should be a clean single respawn.

---

**User**

still happening twice. take your time and think hard.

---

**Cursor**

```javascript
// Re-add platform collisions
this.physics.add.collider(this.player, this.platforms);
this.physics.add.collider(this.enemies, this.platforms);
```

Let me think through this more carefully...

The issue might be that when we teleport the player, the physics body doesn't sync immediately with the sprite position. Let me check the code and try a different approach:

I think the issue is the physics body isn't syncing immediately with the teleport. Let me use `body.reset()` to force an immediate physics sync:

```javascript
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
        const paper = this.add.image(275, 350, 'notebook-paper');
        paper.setDisplaySize(550, 700);
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
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
        
        // Level complete text (hidden initially) - centered for 550px canvas
        this.levelCompleteText = this.add.text(275, 300, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 15, y: 8 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(275, 350, 'Click to continue', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display (positioned for 550px wide canvas)
        this.levelText = this.add.text(470, 16, 'Level: 1', {
            fontSize: '14px',
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
        
        // Re-add platform collisions
        this.physics.add.collider(this.player, this.platforms);
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
        
        // Reset player position
        this.player.setPosition(this.playerStartX, this.playerStartY);
        this.player.setVelocity(0, 0);
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

Let me also fix the same issue in `startNextLevel`:

```javascript
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
        const paper = this.add.image(275, 350, 'notebook-paper');
        paper.setDisplaySize(550, 700);
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
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
        
        // Level complete text (hidden initially) - centered for 550px canvas
        this.levelCompleteText = this.add.text(275, 300, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 15, y: 8 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(275, 350, 'Click to continue', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display (positioned for 550px wide canvas)
        this.levelText = this.add.text(470, 16, 'Level: 1', {
            fontSize: '14px',
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
        
        // Re-add platform collisions
        this.physics.add.collider(this.player, this.platforms);
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

**Refresh** and try falling in water again.

**What I changed:** Using `body.reset(x, y)` instead of `setPosition` + `setVelocity`. This method properly syncs the physics body immediately - it resets position, velocity, AND all collision flags in one atomic operation.

The previous approach could leave the physics body desynchronized from the sprite for a frame, causing that "ghost" appearance.

---

**User**

perfectly fixed. i think next we should work on map design. can you create the walls?

---

**Cursor**

Let me add hand-drawn walls on the left and right sides. I'll check your example-map reference again to match the style:

I see the style - irregular hand-drawn vertical lines on both sides. Let me add those:

```javascript
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
        const paper = this.add.image(275, 350, 'notebook-paper');
        paper.setDisplaySize(550, 700);
        
        
        // === WALLS (hand-drawn style) ===
        const wallGraphics = this.add.graphics();
        wallGraphics.lineStyle(2.5, 0x1a1a1a);  // Black pen
        
        // Left wall - irregular vertical line
        wallGraphics.beginPath();
        wallGraphics.moveTo(45, 0);
        for (let y = 0; y <= 650; y += 20) {
            const wobbleX = 45 + (Math.random() - 0.5) * 6 + Math.sin(y * 0.02) * 3;
            wallGraphics.lineTo(wobbleX, y);
        }
        wallGraphics.lineTo(45, 650);
        wallGraphics.strokePath();
        
        // Right wall - irregular vertical line
        wallGraphics.beginPath();
        wallGraphics.moveTo(505, 0);
        for (let y = 0; y <= 650; y += 20) {
            const wobbleX = 505 + (Math.random() - 0.5) * 6 + Math.sin(y * 0.025 + 1) * 3;
            wallGraphics.lineTo(wobbleX, y);
        }
        wallGraphics.lineTo(505, 650);
        wallGraphics.strokePath();
        
        // Wall collision bodies (invisible rectangles)
        this.walls = this.physics.add.staticGroup();
        
        // Create wall collision textures
        const wallTexture = this.add.graphics();
        wallTexture.fillStyle(0x000000, 0);  // Invisible
        wallTexture.fillRect(0, 0, 50, 650);
        wallTexture.generateTexture('wall', 50, 650);
        wallTexture.destroy();
        
        // Add collision walls (positioned so player stays in play area)
        this.walls.create(22, 325, 'wall');   // Left wall
        this.walls.create(528, 325, 'wall');  // Right wall
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
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
        
        // Level complete text (hidden initially) - centered for 550px canvas
        this.levelCompleteText = this.add.text(275, 300, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 15, y: 8 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(275, 350, 'Click to continue', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display (positioned for 550px wide canvas)
        this.levelText = this.add.text(470, 16, 'Level: 1', {
            fontSize: '14px',
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
        
        // Re-add platform collisions
        this.physics.add.collider(this.player, this.platforms);
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

Now let me add collision between player and walls:

```javascript
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
        const paper = this.add.image(275, 350, 'notebook-paper');
        paper.setDisplaySize(550, 700);
        
        
        // === WALLS (hand-drawn style) ===
        const wallGraphics = this.add.graphics();
        wallGraphics.lineStyle(2.5, 0x1a1a1a);  // Black pen
        
        // Left wall - irregular vertical line
        wallGraphics.beginPath();
        wallGraphics.moveTo(45, 0);
        for (let y = 0; y <= 650; y += 20) {
            const wobbleX = 45 + (Math.random() - 0.5) * 6 + Math.sin(y * 0.02) * 3;
            wallGraphics.lineTo(wobbleX, y);
        }
        wallGraphics.lineTo(45, 650);
        wallGraphics.strokePath();
        
        // Right wall - irregular vertical line
        wallGraphics.beginPath();
        wallGraphics.moveTo(505, 0);
        for (let y = 0; y <= 650; y += 20) {
            const wobbleX = 505 + (Math.random() - 0.5) * 6 + Math.sin(y * 0.025 + 1) * 3;
            wallGraphics.lineTo(wobbleX, y);
        }
        wallGraphics.lineTo(505, 650);
        wallGraphics.strokePath();
        
        // Wall collision bodies (invisible rectangles)
        this.walls = this.physics.add.staticGroup();
        
        // Create wall collision textures
        const wallTexture = this.add.graphics();
        wallTexture.fillStyle(0x000000, 0);  // Invisible
        wallTexture.fillRect(0, 0, 50, 650);
        wallTexture.generateTexture('wall', 50, 650);
        wallTexture.destroy();
        
        // Add collision walls (positioned so player stays in play area)
        this.walls.create(22, 325, 'wall');   // Left wall
        this.walls.create(528, 325, 'wall');  // Right wall
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
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
        
        // Level complete text (hidden initially) - centered for 550px canvas
        this.levelCompleteText = this.add.text(275, 300, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 15, y: 8 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(275, 350, 'Click to continue', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display (positioned for 550px wide canvas)
        this.levelText = this.add.text(470, 16, 'Level: 1', {
            fontSize: '14px',
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
        
        // Re-add platform collisions
        this.physics.add.collider(this.player, this.platforms);
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

```javascript
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
        const paper = this.add.image(275, 350, 'notebook-paper');
        paper.setDisplaySize(550, 700);
        
        
        // === WALLS (hand-drawn style) ===
        const wallGraphics = this.add.graphics();
        wallGraphics.lineStyle(2.5, 0x1a1a1a);  // Black pen
        
        // Left wall - irregular vertical line
        wallGraphics.beginPath();
        wallGraphics.moveTo(45, 0);
        for (let y = 0; y <= 650; y += 20) {
            const wobbleX = 45 + (Math.random() - 0.5) * 6 + Math.sin(y * 0.02) * 3;
            wallGraphics.lineTo(wobbleX, y);
        }
        wallGraphics.lineTo(45, 650);
        wallGraphics.strokePath();
        
        // Right wall - irregular vertical line
        wallGraphics.beginPath();
        wallGraphics.moveTo(505, 0);
        for (let y = 0; y <= 650; y += 20) {
            const wobbleX = 505 + (Math.random() - 0.5) * 6 + Math.sin(y * 0.025 + 1) * 3;
            wallGraphics.lineTo(wobbleX, y);
        }
        wallGraphics.lineTo(505, 650);
        wallGraphics.strokePath();
        
        // Wall collision bodies (invisible rectangles)
        this.walls = this.physics.add.staticGroup();
        
        // Create wall collision textures
        const wallTexture = this.add.graphics();
        wallTexture.fillStyle(0x000000, 0);  // Invisible
        wallTexture.fillRect(0, 0, 50, 650);
        wallTexture.generateTexture('wall', 50, 650);
        wallTexture.destroy();
        
        // Add collision walls (positioned so player stays in play area)
        this.walls.create(22, 325, 'wall');   // Left wall
        this.walls.create(528, 325, 'wall');  // Right wall
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
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
        
        // Level complete text (hidden initially) - centered for 550px canvas
        this.levelCompleteText = this.add.text(275, 300, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 15, y: 8 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(275, 350, 'Click to continue', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display (positioned for 550px wide canvas)
        this.levelText = this.add.text(470, 16, 'Level: 1', {
            fontSize: '14px',
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

**Refresh** to see the walls!

---

**What I added:**
- **Left wall** at x≈45 - irregular hand-drawn black line
- **Right wall** at x≈505 - irregular hand-drawn black line  
- **Collision bodies** - invisible rectangles so player can't pass through
- Walls connect to the water at the bottom

The play area is now bounded on both sides. Try running into the walls - you should bounce off them.

How do they look?

---

**User**

perfect. can we work on the platform shapes and variety now? have you sampled my image and created prebuilts off all of those? would i help if i added a stick figure to the image so you could scale those hand drawn ones correctly?

---

**Cursor**

Great question! Let me look at your example-map again and catalog all the shapes I see:

Looking at your example-map, I can see these distinct shapes:

**What I see:**
1. **Long flat platforms** (various lengths)
2. **L-shapes / stairs** (stepping up or down)
3. **Tall blocks / pillars** (vertical rectangles)
4. **T-shapes** (small cross/intersection pieces)
5. **Cup/D-shape** (small semicircle at top)
6. **Irregular blocks** with notches or internal detail
7. **Small oval** at bottom (rock?)

**What I currently have in the library:**
- basic, basicSmall, tiny (flat platforms)
- lShapeRight, lShapeLeft
- stepUp, stepDown
- block, pillar
- bump, notched, slant

---

**Yes, a stick figure for scale would be super helpful!** 

If you add a stick figure to the reference image (standing on a platform), I can:
1. Get the correct size ratio between character and platforms
2. Make sure jump distances are reasonable
3. Scale all the custom shapes from your drawing accurately

Go ahead and add the stick figure - then I'll recreate the platform shapes to match your hand-drawn ones at the proper scale!

---

**User**

ok red stick figure on example-map-2 in reference folder

---

**Cursor**

I can see the red stick figure on the long thin platform in the lower-left area. This gives me great scale reference!

**Scale analysis:**
- Stick figure is about 1/8th to 1/10th the width of the long platform
- The flat platforms are quite thin (about half the stick figure's height)
- The tall blocks are 3-4x the stick figure's height
- L-shapes step up about 1.5-2x character height

Let me rewrite the platform shapes to match your hand-drawn reference:

```javascript
/**
 * PlatformShapes.js - Library of hand-crafted platform shapes
 * 
 * Scaled based on reference image with stick figure:
 * - Stick figure is ~12x22 pixels
 * - Flat platforms are thin (~8-10px tall)
 * - Long platforms are ~100-120px wide
 * - Tall blocks are ~50-80px tall
 */

const PLATFORM_SHAPES = {
    
    // === FLAT PLATFORMS (thin, like lines on paper) ===
    
    // Long flat platform (~8-10x character width)
    flatLong: {
        points: [
            {x: 0, y: 0}, {x: 120, y: 0}, {x: 120, y: 8}, {x: 0, y: 8}
        ],
        width: 120,
        height: 8
    },
    
    // Medium flat platform (~5-6x character width)
    flatMedium: {
        points: [
            {x: 0, y: 0}, {x: 70, y: 0}, {x: 70, y: 8}, {x: 0, y: 8}
        ],
        width: 70,
        height: 8
    },
    
    // Small flat platform (~3x character width)
    flatSmall: {
        points: [
            {x: 0, y: 0}, {x: 40, y: 0}, {x: 40, y: 8}, {x: 0, y: 8}
        ],
        width: 40,
        height: 8
    },
    
    // Tiny platform (just wider than character)
    flatTiny: {
        points: [
            {x: 0, y: 0}, {x: 25, y: 0}, {x: 25, y: 8}, {x: 0, y: 8}
        ],
        width: 25,
        height: 8
    },
    
    // === L-SHAPES / STAIRS ===
    
    // L-shape stepping down-right (like in reference)
    lShapeDownRight: {
        points: [
            {x: 0, y: 0}, {x: 35, y: 0}, {x: 35, y: 25},
            {x: 70, y: 25}, {x: 70, y: 35}, {x: 0, y: 35}
        ],
        width: 70,
        height: 35
    },
    
    // L-shape stepping down-left
    lShapeDownLeft: {
        points: [
            {x: 35, y: 0}, {x: 70, y: 0}, {x: 70, y: 35},
            {x: 0, y: 35}, {x: 0, y: 25}, {x: 35, y: 25}
        ],
        width: 70,
        height: 35
    },
    
    // === TALL BLOCKS (like in reference right side) ===
    
    // Tall block (~3x character height)
    blockTall: {
        points: [
            {x: 0, y: 0}, {x: 35, y: 0}, {x: 35, y: 65}, {x: 0, y: 65}
        ],
        width: 35,
        height: 65
    },
    
    // Wide tall block (like the chunky ones in reference)
    blockWide: {
        points: [
            {x: 0, y: 0}, {x: 55, y: 0}, {x: 55, y: 50}, {x: 0, y: 50}
        ],
        width: 55,
        height: 50
    },
    
    // Short thick block
    blockShort: {
        points: [
            {x: 0, y: 0}, {x: 40, y: 0}, {x: 40, y: 30}, {x: 0, y: 30}
        ],
        width: 40,
        height: 30
    },
    
    // === T-SHAPES / SMALL PIECES ===
    
    // T-shape (like the small cross piece in reference)
    tShape: {
        points: [
            {x: 10, y: 0}, {x: 30, y: 0}, {x: 30, y: 15},
            {x: 40, y: 15}, {x: 40, y: 25}, {x: 0, y: 25},
            {x: 0, y: 15}, {x: 10, y: 15}
        ],
        width: 40,
        height: 25
    },
    
    // Small pillar (vertical piece)
    pillar: {
        points: [
            {x: 0, y: 0}, {x: 18, y: 0}, {x: 18, y: 45}, {x: 0, y: 45}
        ],
        width: 18,
        height: 45
    },
    
    // === SPECIAL SHAPES ===
    
    // Cup/D-shape (like the semicircle at top of reference)
    cupShape: {
        points: [
            {x: 5, y: 0}, {x: 25, y: 0}, {x: 30, y: 8},
            {x: 30, y: 20}, {x: 0, y: 20}, {x: 0, y: 8}
        ],
        width: 30,
        height: 20
    },
    
    // Small oval/rock (like bottom center of reference)
    rock: {
        points: [
            {x: 5, y: 0}, {x: 20, y: 0}, {x: 25, y: 8},
            {x: 20, y: 16}, {x: 5, y: 16}, {x: 0, y: 8}
        ],
        width: 25,
        height: 16
    },
    
    // Wide platform with bumpy top (like the wavy one in reference)
    bumpyWide: {
        points: [
            {x: 0, y: 5}, {x: 20, y: 0}, {x: 50, y: 3}, {x: 80, y: 0}, {x: 100, y: 5},
            {x: 100, y: 15}, {x: 0, y: 15}
        ],
        width: 100,
        height: 15
    },
    
    // Notched block (block with bite taken out)
    notchedBlock: {
        points: [
            {x: 0, y: 0}, {x: 50, y: 0}, {x: 50, y: 20},
            {x: 35, y: 20}, {x: 35, y: 35}, {x: 50, y: 35},
            {x: 50, y: 55}, {x: 0, y: 55}
        ],
        width: 50,
        height: 55
    }
};


/**
 * Predefined level layouts using the new shapes
 */
const LEVEL_LAYOUTS = [
    // Layout 1: Classic - mostly flat platforms
    {
        name: "classic",
        platforms: [
            // Bottom row
            { shape: 'flatLong', x: 100, y: 620 },
            { shape: 'flatMedium', x: 300, y: 620 },
            { shape: 'flatLong', x: 450, y: 620 },
            // Row 2
            { shape: 'flatMedium', x: 150, y: 550 },
            { shape: 'flatSmall', x: 350, y: 530 },
            { shape: 'flatMedium', x: 450, y: 560 },
            // Row 3
            { shape: 'flatLong', x: 100, y: 470 },
            { shape: 'flatSmall', x: 320, y: 450 },
            { shape: 'flatMedium', x: 420, y: 480 },
            // Row 4
            { shape: 'flatMedium', x: 200, y: 390 },
            { shape: 'flatLong', x: 400, y: 400 },
            // Top
            { shape: 'flatSmall', x: 150, y: 310 },
            { shape: 'flatMedium', x: 300, y: 320 },
            { shape: 'flatSmall', x: 450, y: 300 }
        ]
    },
    
    // Layout 2: Blocky - tall blocks to climb
    {
        name: "blocky",
        platforms: [
            // Bottom
            { shape: 'flatLong', x: 100, y: 620 },
            { shape: 'blockShort', x: 280, y: 605 },
            { shape: 'flatLong', x: 420, y: 620 },
            // Mid-lower
            { shape: 'blockTall', x: 150, y: 555 },
            { shape: 'flatMedium', x: 280, y: 540 },
            { shape: 'blockWide', x: 420, y: 570 },
            // Mid
            { shape: 'flatMedium', x: 100, y: 460 },
            { shape: 'blockShort', x: 250, y: 460 },
            { shape: 'flatMedium', x: 380, y: 470 },
            // Upper
            { shape: 'blockTall', x: 180, y: 370 },
            { shape: 'flatLong', x: 300, y: 380 },
            { shape: 'flatSmall', x: 450, y: 360 },
            // Top
            { shape: 'flatMedium', x: 200, y: 290 },
            { shape: 'flatSmall', x: 380, y: 280 }
        ]
    },
    
    // Layout 3: Stairs - L-shapes and steps
    {
        name: "stairs",
        platforms: [
            // Bottom
            { shape: 'flatLong', x: 80, y: 620 },
            { shape: 'lShapeDownRight', x: 250, y: 600 },
            { shape: 'flatMedium', x: 420, y: 620 },
            // Mid-lower
            { shape: 'lShapeDownLeft', x: 100, y: 540 },
            { shape: 'flatSmall', x: 280, y: 530 },
            { shape: 'lShapeDownRight', x: 380, y: 550 },
            // Mid
            { shape: 'flatMedium', x: 150, y: 450 },
            { shape: 'tShape', x: 300, y: 440 },
            { shape: 'flatMedium', x: 400, y: 460 },
            // Upper
            { shape: 'lShapeDownRight', x: 120, y: 370 },
            { shape: 'flatMedium', x: 280, y: 360 },
            { shape: 'lShapeDownLeft', x: 420, y: 380 },
            // Top
            { shape: 'flatSmall', x: 200, y: 280 },
            { shape: 'flatSmall', x: 350, y: 290 }
        ]
    },
    
    // Layout 4: Mixed - variety of shapes
    {
        name: "mixed",
        platforms: [
            // Bottom
            { shape: 'flatLong', x: 100, y: 620 },
            { shape: 'rock', x: 280, y: 610 },
            { shape: 'flatMedium', x: 400, y: 620 },
            // Mid-lower
            { shape: 'bumpyWide', x: 120, y: 550 },
            { shape: 'pillar', x: 300, y: 560 },
            { shape: 'blockShort', x: 420, y: 575 },
            // Mid
            { shape: 'flatSmall', x: 100, y: 480 },
            { shape: 'cupShape', x: 220, y: 470 },
            { shape: 'notchedBlock', x: 320, y: 490 },
            { shape: 'flatMedium', x: 430, y: 480 },
            // Upper
            { shape: 'tShape', x: 150, y: 400 },
            { shape: 'flatLong', x: 280, y: 390 },
            { shape: 'blockTall', x: 450, y: 380 },
            // Top
            { shape: 'flatSmall', x: 180, y: 310 },
            { shape: 'flatMedium', x: 320, y: 300 }
        ]
    },
    
    // Layout 5: Vertical challenge - lots of climbing
    {
        name: "vertical",
        platforms: [
            // Bottom
            { shape: 'flatMedium', x: 100, y: 620 },
            { shape: 'flatSmall', x: 300, y: 620 },
            { shape: 'flatMedium', x: 450, y: 620 },
            // Stack left
            { shape: 'blockTall', x: 100, y: 550 },
            { shape: 'flatSmall', x: 100, y: 480 },
            // Stack right
            { shape: 'blockWide', x: 420, y: 565 },
            { shape: 'pillar', x: 450, y: 490 },
            // Middle column
            { shape: 'flatTiny', x: 250, y: 560 },
            { shape: 'flatTiny', x: 300, y: 500 },
            { shape: 'flatTiny', x: 250, y: 440 },
            { shape: 'flatTiny', x: 300, y: 380 },
            // Upper platforms
            { shape: 'flatMedium', x: 120, y: 390 },
            { shape: 'flatMedium', x: 400, y: 400 },
            // Top
            { shape: 'flatLong', x: 250, y: 300 }
        ]
    }
];

```

**Refresh** to see the new platform shapes!

---

## New Shapes Based on Your Reference

| Shape | Description | Size |
|-------|-------------|------|
| `flatLong` | Long thin platform | 120×8 |
| `flatMedium` | Medium thin platform | 70×8 |
| `flatSmall` | Small thin platform | 40×8 |
| `flatTiny` | Tiny platform | 25×8 |
| `lShapeDownRight` | L stepping down-right | 70×35 |
| `lShapeDownLeft` | L stepping down-left | 70×35 |
| `blockTall` | Tall block (~3x character) | 35×65 |
| `blockWide` | Chunky wide block | 55×50 |
| `blockShort` | Short thick block | 40×30 |
| `tShape` | T/cross piece | 40×25 |
| `pillar` | Thin vertical | 18×45 |
| `cupShape` | D/cup shape | 30×20 |
| `rock` | Small oval | 25×16 |
| `bumpyWide` | Wide with wavy top | 100×15 |
| `notchedBlock` | Block with notch | 50×55 |

## 5 Level Layouts
1. **classic** - mostly flat platforms
2. **blocky** - tall blocks to climb
3. **stairs** - L-shapes and steps
4. **mixed** - variety of all shapes
5. **vertical** - climbing challenge

Play through a few levels to see the different shapes cycle through! How do they look?

---

**User**

i like where your head is at but lets forgo different level types for now and just throw a mix of platform shapes on all levels

---

**Cursor**

Got it! Let me simplify - all levels will be a mix of shapes:

```javascript
/**
 * PlatformShapes.js - Library of hand-crafted platform shapes
 * 
 * Scaled based on reference image with stick figure:
 * - Stick figure is ~12x22 pixels
 * - Flat platforms are thin (~8-10px tall)
 * - Long platforms are ~100-120px wide
 * - Tall blocks are ~50-80px tall
 */

const PLATFORM_SHAPES = {
    
    // === FLAT PLATFORMS (thin, like lines on paper) ===
    
    // Long flat platform (~8-10x character width)
    flatLong: {
        points: [
            {x: 0, y: 0}, {x: 120, y: 0}, {x: 120, y: 8}, {x: 0, y: 8}
        ],
        width: 120,
        height: 8
    },
    
    // Medium flat platform (~5-6x character width)
    flatMedium: {
        points: [
            {x: 0, y: 0}, {x: 70, y: 0}, {x: 70, y: 8}, {x: 0, y: 8}
        ],
        width: 70,
        height: 8
    },
    
    // Small flat platform (~3x character width)
    flatSmall: {
        points: [
            {x: 0, y: 0}, {x: 40, y: 0}, {x: 40, y: 8}, {x: 0, y: 8}
        ],
        width: 40,
        height: 8
    },
    
    // Tiny platform (just wider than character)
    flatTiny: {
        points: [
            {x: 0, y: 0}, {x: 25, y: 0}, {x: 25, y: 8}, {x: 0, y: 8}
        ],
        width: 25,
        height: 8
    },
    
    // === L-SHAPES / STAIRS ===
    
    // L-shape stepping down-right (like in reference)
    lShapeDownRight: {
        points: [
            {x: 0, y: 0}, {x: 35, y: 0}, {x: 35, y: 25},
            {x: 70, y: 25}, {x: 70, y: 35}, {x: 0, y: 35}
        ],
        width: 70,
        height: 35
    },
    
    // L-shape stepping down-left
    lShapeDownLeft: {
        points: [
            {x: 35, y: 0}, {x: 70, y: 0}, {x: 70, y: 35},
            {x: 0, y: 35}, {x: 0, y: 25}, {x: 35, y: 25}
        ],
        width: 70,
        height: 35
    },
    
    // === TALL BLOCKS (like in reference right side) ===
    
    // Tall block (~3x character height)
    blockTall: {
        points: [
            {x: 0, y: 0}, {x: 35, y: 0}, {x: 35, y: 65}, {x: 0, y: 65}
        ],
        width: 35,
        height: 65
    },
    
    // Wide tall block (like the chunky ones in reference)
    blockWide: {
        points: [
            {x: 0, y: 0}, {x: 55, y: 0}, {x: 55, y: 50}, {x: 0, y: 50}
        ],
        width: 55,
        height: 50
    },
    
    // Short thick block
    blockShort: {
        points: [
            {x: 0, y: 0}, {x: 40, y: 0}, {x: 40, y: 30}, {x: 0, y: 30}
        ],
        width: 40,
        height: 30
    },
    
    // === T-SHAPES / SMALL PIECES ===
    
    // T-shape (like the small cross piece in reference)
    tShape: {
        points: [
            {x: 10, y: 0}, {x: 30, y: 0}, {x: 30, y: 15},
            {x: 40, y: 15}, {x: 40, y: 25}, {x: 0, y: 25},
            {x: 0, y: 15}, {x: 10, y: 15}
        ],
        width: 40,
        height: 25
    },
    
    // Small pillar (vertical piece)
    pillar: {
        points: [
            {x: 0, y: 0}, {x: 18, y: 0}, {x: 18, y: 45}, {x: 0, y: 45}
        ],
        width: 18,
        height: 45
    },
    
    // === SPECIAL SHAPES ===
    
    // Cup/D-shape (like the semicircle at top of reference)
    cupShape: {
        points: [
            {x: 5, y: 0}, {x: 25, y: 0}, {x: 30, y: 8},
            {x: 30, y: 20}, {x: 0, y: 20}, {x: 0, y: 8}
        ],
        width: 30,
        height: 20
    },
    
    // Small oval/rock (like bottom center of reference)
    rock: {
        points: [
            {x: 5, y: 0}, {x: 20, y: 0}, {x: 25, y: 8},
            {x: 20, y: 16}, {x: 5, y: 16}, {x: 0, y: 8}
        ],
        width: 25,
        height: 16
    },
    
    // Wide platform with bumpy top (like the wavy one in reference)
    bumpyWide: {
        points: [
            {x: 0, y: 5}, {x: 20, y: 0}, {x: 50, y: 3}, {x: 80, y: 0}, {x: 100, y: 5},
            {x: 100, y: 15}, {x: 0, y: 15}
        ],
        width: 100,
        height: 15
    },
    
    // Notched block (block with bite taken out)
    notchedBlock: {
        points: [
            {x: 0, y: 0}, {x: 50, y: 0}, {x: 50, y: 20},
            {x: 35, y: 20}, {x: 35, y: 35}, {x: 50, y: 35},
            {x: 50, y: 55}, {x: 0, y: 55}
        ],
        width: 50,
        height: 55
    }
};


/**
 * Predefined level layouts - all mixed variety of shapes
 */
const LEVEL_LAYOUTS = [
    // Layout 1
    {
        name: "mix1",
        platforms: [
            { shape: 'flatLong', x: 100, y: 620 },
            { shape: 'blockShort', x: 280, y: 605 },
            { shape: 'flatMedium', x: 420, y: 620 },
            { shape: 'lShapeDownRight', x: 120, y: 550 },
            { shape: 'flatSmall', x: 300, y: 530 },
            { shape: 'blockWide', x: 430, y: 565 },
            { shape: 'flatMedium', x: 100, y: 460 },
            { shape: 'tShape', x: 260, y: 450 },
            { shape: 'flatLong', x: 380, y: 470 },
            { shape: 'pillar', x: 180, y: 380 },
            { shape: 'flatMedium', x: 300, y: 380 },
            { shape: 'lShapeDownLeft', x: 430, y: 390 },
            { shape: 'flatSmall', x: 150, y: 300 },
            { shape: 'flatSmall', x: 350, y: 310 }
        ]
    },
    
    // Layout 2
    {
        name: "mix2",
        platforms: [
            { shape: 'flatMedium', x: 80, y: 620 },
            { shape: 'rock', x: 220, y: 610 },
            { shape: 'flatLong', x: 380, y: 620 },
            { shape: 'blockTall', x: 100, y: 545 },
            { shape: 'bumpyWide', x: 250, y: 550 },
            { shape: 'flatSmall', x: 430, y: 540 },
            { shape: 'flatSmall', x: 100, y: 470 },
            { shape: 'cupShape', x: 200, y: 460 },
            { shape: 'flatMedium', x: 320, y: 470 },
            { shape: 'blockShort', x: 450, y: 455 },
            { shape: 'lShapeDownRight', x: 130, y: 390 },
            { shape: 'flatLong', x: 300, y: 380 },
            { shape: 'flatTiny', x: 470, y: 370 },
            { shape: 'flatMedium', x: 200, y: 300 },
            { shape: 'flatSmall', x: 400, y: 290 }
        ]
    },
    
    // Layout 3
    {
        name: "mix3",
        platforms: [
            { shape: 'flatLong', x: 120, y: 620 },
            { shape: 'lShapeDownLeft', x: 320, y: 600 },
            { shape: 'flatMedium', x: 460, y: 620 },
            { shape: 'flatMedium', x: 100, y: 540 },
            { shape: 'notchedBlock', x: 280, y: 555 },
            { shape: 'pillar', x: 420, y: 555 },
            { shape: 'blockWide', x: 100, y: 470 },
            { shape: 'flatSmall', x: 250, y: 460 },
            { shape: 'flatLong', x: 380, y: 475 },
            { shape: 'flatTiny', x: 130, y: 390 },
            { shape: 'blockShort', x: 250, y: 400 },
            { shape: 'lShapeDownRight', x: 380, y: 400 },
            { shape: 'flatMedium', x: 180, y: 310 },
            { shape: 'flatMedium', x: 380, y: 300 }
        ]
    },
    
    // Layout 4
    {
        name: "mix4",
        platforms: [
            { shape: 'blockShort', x: 80, y: 605 },
            { shape: 'flatLong', x: 230, y: 620 },
            { shape: 'lShapeDownRight', x: 420, y: 600 },
            { shape: 'flatMedium', x: 100, y: 530 },
            { shape: 'tShape', x: 250, y: 530 },
            { shape: 'flatMedium', x: 400, y: 540 },
            { shape: 'lShapeDownLeft', x: 100, y: 460 },
            { shape: 'rock', x: 260, y: 450 },
            { shape: 'bumpyWide', x: 370, y: 465 },
            { shape: 'flatSmall', x: 130, y: 380 },
            { shape: 'blockTall', x: 260, y: 400 },
            { shape: 'flatMedium', x: 380, y: 380 },
            { shape: 'flatSmall', x: 150, y: 300 },
            { shape: 'cupShape', x: 300, y: 295 },
            { shape: 'flatSmall', x: 420, y: 300 }
        ]
    },
    
    // Layout 5
    {
        name: "mix5",
        platforms: [
            { shape: 'flatMedium', x: 100, y: 620 },
            { shape: 'pillar', x: 250, y: 595 },
            { shape: 'flatMedium', x: 350, y: 620 },
            { shape: 'flatSmall', x: 470, y: 610 },
            { shape: 'blockWide', x: 100, y: 555 },
            { shape: 'flatLong', x: 280, y: 540 },
            { shape: 'flatTiny', x: 460, y: 530 },
            { shape: 'flatSmall', x: 100, y: 470 },
            { shape: 'lShapeDownRight', x: 220, y: 470 },
            { shape: 'blockShort', x: 400, y: 460 },
            { shape: 'flatMedium', x: 130, y: 390 },
            { shape: 'flatSmall', x: 300, y: 380 },
            { shape: 'notchedBlock', x: 420, y: 400 },
            { shape: 'flatLong', x: 200, y: 300 },
            { shape: 'flatTiny', x: 420, y: 290 }
        ]
    }
];

```

**Refresh** - all 5 level layouts now have a mix of all shape types:

- Flat platforms (long, medium, small, tiny)
- Blocks (tall, wide, short)
- L-shapes (both directions)
- Special shapes (T, pillar, cup, rock, bumpy, notched)

Every level you play will have variety. How do they look?

---

**User**

ok making good progress. now lets fill the whole vertical space. we are missing platforms in the top half roughly of the window

---

**Cursor**

Good catch! The canvas is 700px tall but platforms stop around y=300. Let me add more platforms up top (y=100-280 range):

```javascript
/**
 * PlatformShapes.js - Library of hand-crafted platform shapes
 * 
 * Scaled based on reference image with stick figure:
 * - Stick figure is ~12x22 pixels
 * - Flat platforms are thin (~8-10px tall)
 * - Long platforms are ~100-120px wide
 * - Tall blocks are ~50-80px tall
 */

const PLATFORM_SHAPES = {
    
    // === FLAT PLATFORMS (thin, like lines on paper) ===
    
    // Long flat platform (~8-10x character width)
    flatLong: {
        points: [
            {x: 0, y: 0}, {x: 120, y: 0}, {x: 120, y: 8}, {x: 0, y: 8}
        ],
        width: 120,
        height: 8
    },
    
    // Medium flat platform (~5-6x character width)
    flatMedium: {
        points: [
            {x: 0, y: 0}, {x: 70, y: 0}, {x: 70, y: 8}, {x: 0, y: 8}
        ],
        width: 70,
        height: 8
    },
    
    // Small flat platform (~3x character width)
    flatSmall: {
        points: [
            {x: 0, y: 0}, {x: 40, y: 0}, {x: 40, y: 8}, {x: 0, y: 8}
        ],
        width: 40,
        height: 8
    },
    
    // Tiny platform (just wider than character)
    flatTiny: {
        points: [
            {x: 0, y: 0}, {x: 25, y: 0}, {x: 25, y: 8}, {x: 0, y: 8}
        ],
        width: 25,
        height: 8
    },
    
    // === L-SHAPES / STAIRS ===
    
    // L-shape stepping down-right (like in reference)
    lShapeDownRight: {
        points: [
            {x: 0, y: 0}, {x: 35, y: 0}, {x: 35, y: 25},
            {x: 70, y: 25}, {x: 70, y: 35}, {x: 0, y: 35}
        ],
        width: 70,
        height: 35
    },
    
    // L-shape stepping down-left
    lShapeDownLeft: {
        points: [
            {x: 35, y: 0}, {x: 70, y: 0}, {x: 70, y: 35},
            {x: 0, y: 35}, {x: 0, y: 25}, {x: 35, y: 25}
        ],
        width: 70,
        height: 35
    },
    
    // === TALL BLOCKS (like in reference right side) ===
    
    // Tall block (~3x character height)
    blockTall: {
        points: [
            {x: 0, y: 0}, {x: 35, y: 0}, {x: 35, y: 65}, {x: 0, y: 65}
        ],
        width: 35,
        height: 65
    },
    
    // Wide tall block (like the chunky ones in reference)
    blockWide: {
        points: [
            {x: 0, y: 0}, {x: 55, y: 0}, {x: 55, y: 50}, {x: 0, y: 50}
        ],
        width: 55,
        height: 50
    },
    
    // Short thick block
    blockShort: {
        points: [
            {x: 0, y: 0}, {x: 40, y: 0}, {x: 40, y: 30}, {x: 0, y: 30}
        ],
        width: 40,
        height: 30
    },
    
    // === T-SHAPES / SMALL PIECES ===
    
    // T-shape (like the small cross piece in reference)
    tShape: {
        points: [
            {x: 10, y: 0}, {x: 30, y: 0}, {x: 30, y: 15},
            {x: 40, y: 15}, {x: 40, y: 25}, {x: 0, y: 25},
            {x: 0, y: 15}, {x: 10, y: 15}
        ],
        width: 40,
        height: 25
    },
    
    // Small pillar (vertical piece)
    pillar: {
        points: [
            {x: 0, y: 0}, {x: 18, y: 0}, {x: 18, y: 45}, {x: 0, y: 45}
        ],
        width: 18,
        height: 45
    },
    
    // === SPECIAL SHAPES ===
    
    // Cup/D-shape (like the semicircle at top of reference)
    cupShape: {
        points: [
            {x: 5, y: 0}, {x: 25, y: 0}, {x: 30, y: 8},
            {x: 30, y: 20}, {x: 0, y: 20}, {x: 0, y: 8}
        ],
        width: 30,
        height: 20
    },
    
    // Small oval/rock (like bottom center of reference)
    rock: {
        points: [
            {x: 5, y: 0}, {x: 20, y: 0}, {x: 25, y: 8},
            {x: 20, y: 16}, {x: 5, y: 16}, {x: 0, y: 8}
        ],
        width: 25,
        height: 16
    },
    
    // Wide platform with bumpy top (like the wavy one in reference)
    bumpyWide: {
        points: [
            {x: 0, y: 5}, {x: 20, y: 0}, {x: 50, y: 3}, {x: 80, y: 0}, {x: 100, y: 5},
            {x: 100, y: 15}, {x: 0, y: 15}
        ],
        width: 100,
        height: 15
    },
    
    // Notched block (block with bite taken out)
    notchedBlock: {
        points: [
            {x: 0, y: 0}, {x: 50, y: 0}, {x: 50, y: 20},
            {x: 35, y: 20}, {x: 35, y: 35}, {x: 50, y: 35},
            {x: 50, y: 55}, {x: 0, y: 55}
        ],
        width: 50,
        height: 55
    }
};


/**
 * Predefined level layouts - all mixed variety of shapes
 * Canvas is 550x700, water at y=655, walls at x=45 and x=505
 * Playable area roughly x: 60-490, y: 80-620
 */
const LEVEL_LAYOUTS = [
    // Layout 1
    {
        name: "mix1",
        platforms: [
            // Bottom (y: 600-620)
            { shape: 'flatLong', x: 100, y: 620 },
            { shape: 'blockShort', x: 280, y: 605 },
            { shape: 'flatMedium', x: 420, y: 620 },
            // Lower-mid (y: 520-560)
            { shape: 'lShapeDownRight', x: 120, y: 550 },
            { shape: 'flatSmall', x: 300, y: 530 },
            { shape: 'blockWide', x: 430, y: 545 },
            // Mid (y: 440-480)
            { shape: 'flatMedium', x: 100, y: 460 },
            { shape: 'tShape', x: 260, y: 450 },
            { shape: 'flatLong', x: 380, y: 470 },
            // Upper-mid (y: 360-400)
            { shape: 'pillar', x: 150, y: 380 },
            { shape: 'flatMedium', x: 280, y: 380 },
            { shape: 'lShapeDownLeft', x: 420, y: 390 },
            // Upper (y: 280-320)
            { shape: 'flatSmall', x: 100, y: 300 },
            { shape: 'blockShort', x: 250, y: 295 },
            { shape: 'flatMedium', x: 400, y: 310 },
            // Top (y: 180-240)
            { shape: 'flatMedium', x: 150, y: 220 },
            { shape: 'flatSmall', x: 320, y: 200 },
            { shape: 'flatSmall', x: 450, y: 230 },
            // Very top (y: 100-150)
            { shape: 'flatSmall', x: 100, y: 130 },
            { shape: 'flatLong', x: 280, y: 120 },
            { shape: 'flatTiny', x: 460, y: 140 }
        ]
    },
    
    // Layout 2
    {
        name: "mix2",
        platforms: [
            // Bottom
            { shape: 'flatMedium', x: 80, y: 620 },
            { shape: 'rock', x: 220, y: 610 },
            { shape: 'flatLong', x: 380, y: 620 },
            // Lower-mid
            { shape: 'blockTall', x: 100, y: 545 },
            { shape: 'bumpyWide', x: 250, y: 550 },
            { shape: 'flatSmall', x: 430, y: 540 },
            // Mid
            { shape: 'flatSmall', x: 100, y: 460 },
            { shape: 'cupShape', x: 200, y: 455 },
            { shape: 'flatMedium', x: 320, y: 470 },
            { shape: 'blockShort', x: 450, y: 455 },
            // Upper-mid
            { shape: 'lShapeDownRight', x: 100, y: 380 },
            { shape: 'flatLong', x: 280, y: 370 },
            { shape: 'flatTiny', x: 460, y: 360 },
            // Upper
            { shape: 'flatMedium', x: 150, y: 290 },
            { shape: 'pillar', x: 320, y: 300 },
            { shape: 'flatSmall', x: 430, y: 280 },
            // Top
            { shape: 'flatSmall', x: 100, y: 200 },
            { shape: 'flatMedium', x: 260, y: 210 },
            { shape: 'lShapeDownLeft', x: 420, y: 200 },
            // Very top
            { shape: 'flatLong', x: 180, y: 120 },
            { shape: 'flatSmall', x: 420, y: 110 }
        ]
    },
    
    // Layout 3
    {
        name: "mix3",
        platforms: [
            // Bottom
            { shape: 'flatLong', x: 120, y: 620 },
            { shape: 'lShapeDownLeft', x: 320, y: 600 },
            { shape: 'flatMedium', x: 460, y: 620 },
            // Lower-mid
            { shape: 'flatMedium', x: 100, y: 540 },
            { shape: 'notchedBlock', x: 280, y: 545 },
            { shape: 'pillar', x: 440, y: 555 },
            // Mid
            { shape: 'blockWide', x: 100, y: 460 },
            { shape: 'flatSmall', x: 250, y: 450 },
            { shape: 'flatLong', x: 380, y: 465 },
            // Upper-mid
            { shape: 'flatTiny', x: 100, y: 380 },
            { shape: 'blockShort', x: 220, y: 385 },
            { shape: 'lShapeDownRight', x: 360, y: 380 },
            // Upper
            { shape: 'flatMedium', x: 130, y: 300 },
            { shape: 'flatSmall', x: 300, y: 290 },
            { shape: 'flatMedium', x: 420, y: 300 },
            // Top
            { shape: 'flatSmall', x: 100, y: 210 },
            { shape: 'tShape', x: 240, y: 200 },
            { shape: 'flatMedium', x: 380, y: 220 },
            // Very top
            { shape: 'flatMedium', x: 200, y: 120 },
            { shape: 'flatTiny', x: 400, y: 130 }
        ]
    },
    
    // Layout 4
    {
        name: "mix4",
        platforms: [
            // Bottom
            { shape: 'blockShort', x: 80, y: 605 },
            { shape: 'flatLong', x: 230, y: 620 },
            { shape: 'lShapeDownRight', x: 420, y: 600 },
            // Lower-mid
            { shape: 'flatMedium', x: 100, y: 530 },
            { shape: 'tShape', x: 250, y: 525 },
            { shape: 'flatMedium', x: 400, y: 540 },
            // Mid
            { shape: 'lShapeDownLeft', x: 100, y: 450 },
            { shape: 'rock', x: 260, y: 440 },
            { shape: 'bumpyWide', x: 370, y: 455 },
            // Upper-mid
            { shape: 'flatSmall', x: 100, y: 370 },
            { shape: 'blockTall', x: 240, y: 380 },
            { shape: 'flatMedium', x: 380, y: 370 },
            // Upper
            { shape: 'flatSmall', x: 120, y: 290 },
            { shape: 'cupShape', x: 280, y: 280 },
            { shape: 'flatSmall', x: 420, y: 290 },
            // Top
            { shape: 'flatMedium', x: 160, y: 210 },
            { shape: 'flatSmall', x: 340, y: 200 },
            { shape: 'pillar', x: 460, y: 210 },
            // Very top
            { shape: 'flatSmall', x: 100, y: 120 },
            { shape: 'flatLong', x: 260, y: 130 }
        ]
    },
    
    // Layout 5
    {
        name: "mix5",
        platforms: [
            // Bottom
            { shape: 'flatMedium', x: 100, y: 620 },
            { shape: 'pillar', x: 250, y: 595 },
            { shape: 'flatMedium', x: 350, y: 620 },
            { shape: 'flatSmall', x: 470, y: 610 },
            // Lower-mid
            { shape: 'blockWide', x: 100, y: 545 },
            { shape: 'flatLong', x: 280, y: 540 },
            { shape: 'flatTiny', x: 460, y: 530 },
            // Mid
            { shape: 'flatSmall', x: 100, y: 460 },
            { shape: 'lShapeDownRight', x: 220, y: 460 },
            { shape: 'blockShort', x: 420, y: 455 },
            // Upper-mid
            { shape: 'flatMedium', x: 100, y: 380 },
            { shape: 'flatSmall', x: 280, y: 370 },
            { shape: 'notchedBlock', x: 400, y: 385 },
            // Upper
            { shape: 'lShapeDownLeft', x: 120, y: 300 },
            { shape: 'flatMedium', x: 280, y: 290 },
            { shape: 'flatSmall', x: 440, y: 300 },
            // Top
            { shape: 'flatSmall', x: 100, y: 210 },
            { shape: 'blockShort', x: 250, y: 205 },
            { shape: 'flatMedium', x: 400, y: 220 },
            // Very top
            { shape: 'flatLong', x: 180, y: 130 },
            { shape: 'flatTiny', x: 420, y: 120 }
        ]
    }
];

```

**Refresh** - each layout now has platforms all the way up:

| Row | Y Range | Coverage |
|-----|---------|----------|
| Bottom | 600-620 | ✓ had |
| Lower-mid | 520-560 | ✓ had |
| Mid | 440-480 | ✓ had |
| Upper-mid | 360-400 | ✓ had |
| Upper | 280-320 | ✓ had |
| **Top** | 180-240 | **✓ added** |
| **Very top** | 100-150 | **✓ added** |

Platforms now fill from y=100 (near top) down to y=620 (just above water). The whole vertical space should be covered now!

---

**User**

great. now lets scale the window larger. i think most people these days have at least 1080 vertical pixels. minus some for browser and desktop elements.

---

**Cursor**

Let me scale up the game. Current is 550×700, let's go to **700×900** - keeps the notebook proportions while being much larger.

---

**User**

i stopped you. should we refactor to make a scale change like this easier in the future or no? what do you think?

---

**Cursor**

Good question! Let me give you my honest take:

## Option A: Just Do It Now (Manual)
- Update the ~10 places with hardcoded values
- Takes 5-10 minutes
- Fine if we don't expect to rescale again

## Option B: Simple Config Object
- Create one config with `CANVAS_WIDTH`, `CANVAS_HEIGHT`, `WATER_Y`, `WALL_LEFT_X`, etc.
- Other code references these constants
- Makes future changes easy
- Takes ~15 minutes

## Option C: Full Percentage-Based
- Position everything as % of canvas
- Platforms at `{x: 0.2, y: 0.85}` instead of `{x: 100, y: 620}`
- Very flexible but more complex
- Probably overkill for this project

---

**My recommendation:** **Option B** - a simple config object.

It's not much extra work, and having canvas dimensions + key boundaries (water level, wall positions, play area) in one place is genuinely useful. The platform layouts can stay as pixel values, but they'd be based on the known canvas size documented in the config.

Worth it? Your call - if you think we'll tweak the scale again or just want cleaner code, let's do B. If you just want to see the bigger screen now and move on, A is fine.

---

**User**

ok, since this is a test lets do the simpler way

---

**Cursor**

Let's do it! Scaling from 550×700 to **700×900**.

```javascript
/**
 * Main game configuration
 * This file initializes Phaser with our settings and scenes
 */

const config = {
    type: Phaser.AUTO,  // Automatically choose WebGL or Canvas
    width: 700,   // Scaled up notebook paper proportions
    height: 900,
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


```

```javascript
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
        wallGraphics.moveTo(45, 0);
        for (let y = 0; y <= 650; y += 20) {
            const wobbleX = 45 + (Math.random() - 0.5) * 6 + Math.sin(y * 0.02) * 3;
            wallGraphics.lineTo(wobbleX, y);
        }
        wallGraphics.lineTo(45, 650);
        wallGraphics.strokePath();
        
        // Right wall - irregular vertical line
        wallGraphics.beginPath();
        wallGraphics.moveTo(505, 0);
        for (let y = 0; y <= 650; y += 20) {
            const wobbleX = 505 + (Math.random() - 0.5) * 6 + Math.sin(y * 0.025 + 1) * 3;
            wallGraphics.lineTo(wobbleX, y);
        }
        wallGraphics.lineTo(505, 650);
        wallGraphics.strokePath();
        
        // Wall collision bodies (invisible rectangles)
        this.walls = this.physics.add.staticGroup();
        
        // Create wall collision textures
        const wallTexture = this.add.graphics();
        wallTexture.fillStyle(0x000000, 0);  // Invisible
        wallTexture.fillRect(0, 0, 50, 650);
        wallTexture.generateTexture('wall', 50, 650);
        wallTexture.destroy();
        
        // Add collision walls (positioned so player stays in play area)
        this.walls.create(22, 325, 'wall');   // Left wall
        this.walls.create(528, 325, 'wall');  // Right wall
        
        
        // === WATER HAZARD (hand-drawn style) ===
        const waterGraphics = this.add.graphics();
        
        // Light blue fill for water body
        waterGraphics.fillStyle(0x89CFF0, 0.4);  // Light blue, semi-transparent
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
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
        
        // Level complete text (hidden initially) - centered for 550px canvas
        this.levelCompleteText = this.add.text(275, 300, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 15, y: 8 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(275, 350, 'Click to continue', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display (positioned for 550px wide canvas)
        this.levelText = this.add.text(470, 16, 'Level: 1', {
            fontSize: '14px',
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

```javascript
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
        waterGraphics.fillRect(0, 655, 550, 50);
        
        // Draw wavy water line (hand-drawn style)
        waterGraphics.lineStyle(2, 0x4A90D9);  // Blue pen color
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 655);
        
        // Create wavy line across the top of water
        for (let x = 0; x <= 550; x += 15) {
            const waveY = 655 + Math.sin(x * 0.05) * 4 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Second wavy line for more doodled feel
        waterGraphics.lineStyle(1.5, 0x4A90D9);
        waterGraphics.beginPath();
        waterGraphics.moveTo(0, 665);
        for (let x = 0; x <= 550; x += 12) {
            const waveY = 665 + Math.sin(x * 0.06 + 1) * 3 + (Math.random() - 0.5) * 2;
            waterGraphics.lineTo(x, waveY);
        }
        waterGraphics.strokePath();
        
        // Invisible zone for water collision detection
        this.waterZone = this.add.zone(275, 680, 550, 50);
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
        
        // Level complete text (hidden initially) - centered for 550px canvas
        this.levelCompleteText = this.add.text(275, 300, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 15, y: 8 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(275, 350, 'Click to continue', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display (positioned for 550px wide canvas)
        this.levelText = this.add.text(470, 16, 'Level: 1', {
            fontSize: '14px',
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

```javascript
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
        
        // Level complete text (hidden initially) - centered for 550px canvas
        this.levelCompleteText = this.add.text(275, 300, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 15, y: 8 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(275, 350, 'Click to continue', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
        });
        this.clickToContinueText.setOrigin(0.5);
        this.clickToContinueText.setVisible(false);
        
        // Track current level and game state
        this.currentLevel = 1;
        this.levelInProgress = true;
        this.isRespawning = false;  // Prevents double-respawn bug
        
        // Level counter display (positioned for 550px wide canvas)
        this.levelText = this.add.text(470, 16, 'Level: 1', {
            fontSize: '14px',
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

```javascript
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
        
        // Level complete text (hidden initially) - centered for 550px canvas
        this.levelCompleteText = this.add.text(275, 300, '🎉 LEVEL COMPLETE! 🎉', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#228B22',
            padding: { x: 15, y: 8 }
        });
        this.levelCompleteText.setOrigin(0.5);
        this.levelCompleteText.setVisible(false);
        
        this.clickToContinueText = this.add.text(275, 350, 'Click to continue', {
            fontSize: '16px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 8, y: 4 }
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

```javascript
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
            if (bullet.active && (bullet.x < -50 || bullet.x > 600 || bullet.y < -50 || bullet.y > 750)) {
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


```

```javascript
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


```

Now the platform layouts - scaling positions for the larger canvas:

```javascript
/**
 * PlatformShapes.js - Library of hand-crafted platform shapes
 * 
 * Scaled based on reference image with stick figure:
 * - Stick figure is ~12x22 pixels
 * - Flat platforms are thin (~8-10px tall)
 * - Long platforms are ~100-120px wide
 * - Tall blocks are ~50-80px tall
 */

const PLATFORM_SHAPES = {
    
    // === FLAT PLATFORMS (thin, like lines on paper) ===
    
    // Long flat platform (~8-10x character width)
    flatLong: {
        points: [
            {x: 0, y: 0}, {x: 120, y: 0}, {x: 120, y: 8}, {x: 0, y: 8}
        ],
        width: 120,
        height: 8
    },
    
    // Medium flat platform (~5-6x character width)
    flatMedium: {
        points: [
            {x: 0, y: 0}, {x: 70, y: 0}, {x: 70, y: 8}, {x: 0, y: 8}
        ],
        width: 70,
        height: 8
    },
    
    // Small flat platform (~3x character width)
    flatSmall: {
        points: [
            {x: 0, y: 0}, {x: 40, y: 0}, {x: 40, y: 8}, {x: 0, y: 8}
        ],
        width: 40,
        height: 8
    },
    
    // Tiny platform (just wider than character)
    flatTiny: {
        points: [
            {x: 0, y: 0}, {x: 25, y: 0}, {x: 25, y: 8}, {x: 0, y: 8}
        ],
        width: 25,
        height: 8
    },
    
    // === L-SHAPES / STAIRS ===
    
    // L-shape stepping down-right (like in reference)
    lShapeDownRight: {
        points: [
            {x: 0, y: 0}, {x: 35, y: 0}, {x: 35, y: 25},
            {x: 70, y: 25}, {x: 70, y: 35}, {x: 0, y: 35}
        ],
        width: 70,
        height: 35
    },
    
    // L-shape stepping down-left
    lShapeDownLeft: {
        points: [
            {x: 35, y: 0}, {x: 70, y: 0}, {x: 70, y: 35},
            {x: 0, y: 35}, {x: 0, y: 25}, {x: 35, y: 25}
        ],
        width: 70,
        height: 35
    },
    
    // === TALL BLOCKS (like in reference right side) ===
    
    // Tall block (~3x character height)
    blockTall: {
        points: [
            {x: 0, y: 0}, {x: 35, y: 0}, {x: 35, y: 65}, {x: 0, y: 65}
        ],
        width: 35,
        height: 65
    },
    
    // Wide tall block (like the chunky ones in reference)
    blockWide: {
        points: [
            {x: 0, y: 0}, {x: 55, y: 0}, {x: 55, y: 50}, {x: 0, y: 50}
        ],
        width: 55,
        height: 50
    },
    
    // Short thick block
    blockShort: {
        points: [
            {x: 0, y: 0}, {x: 40, y: 0}, {x: 40, y: 30}, {x: 0, y: 30}
        ],
        width: 40,
        height: 30
    },
    
    // === T-SHAPES / SMALL PIECES ===
    
    // T-shape (like the small cross piece in reference)
    tShape: {
        points: [
            {x: 10, y: 0}, {x: 30, y: 0}, {x: 30, y: 15},
            {x: 40, y: 15}, {x: 40, y: 25}, {x: 0, y: 25},
            {x: 0, y: 15}, {x: 10, y: 15}
        ],
        width: 40,
        height: 25
    },
    
    // Small pillar (vertical piece)
    pillar: {
        points: [
            {x: 0, y: 0}, {x: 18, y: 0}, {x: 18, y: 45}, {x: 0, y: 45}
        ],
        width: 18,
        height: 45
    },
    
    // === SPECIAL SHAPES ===
    
    // Cup/D-shape (like the semicircle at top of reference)
    cupShape: {
        points: [
            {x: 5, y: 0}, {x: 25, y: 0}, {x: 30, y: 8},
            {x: 30, y: 20}, {x: 0, y: 20}, {x: 0, y: 8}
        ],
        width: 30,
        height: 20
    },
    
    // Small oval/rock (like bottom center of reference)
    rock: {
        points: [
            {x: 5, y: 0}, {x: 20, y: 0}, {x: 25, y: 8},
            {x: 20, y: 16}, {x: 5, y: 16}, {x: 0, y: 8}
        ],
        width: 25,
        height: 16
    },
    
    // Wide platform with bumpy top (like the wavy one in reference)
    bumpyWide: {
        points: [
            {x: 0, y: 5}, {x: 20, y: 0}, {x: 50, y: 3}, {x: 80, y: 0}, {x: 100, y: 5},
            {x: 100, y: 15}, {x: 0, y: 15}
        ],
        width: 100,
        height: 15
    },
    
    // Notched block (block with bite taken out)
    notchedBlock: {
        points: [
            {x: 0, y: 0}, {x: 50, y: 0}, {x: 50, y: 20},
            {x: 35, y: 20}, {x: 35, y: 35}, {x: 50, y: 35},
            {x: 50, y: 55}, {x: 0, y: 55}
        ],
        width: 50,
        height: 55
    }
};


/**
 * Predefined level layouts - all mixed variety of shapes
 * Canvas is 700x900, water at y=845, walls at x=55 and x=645
 * Playable area roughly x: 75-625, y: 100-800
 */
const LEVEL_LAYOUTS = [
    // Layout 1
    {
        name: "mix1",
        platforms: [
            // Bottom (y: 780-810)
            { shape: 'flatLong', x: 130, y: 800 },
            { shape: 'blockShort', x: 360, y: 780 },
            { shape: 'flatMedium', x: 540, y: 800 },
            // Lower-mid (y: 680-720)
            { shape: 'lShapeDownRight', x: 150, y: 710 },
            { shape: 'flatSmall', x: 380, y: 685 },
            { shape: 'blockWide', x: 550, y: 700 },
            // Mid (y: 570-610)
            { shape: 'flatMedium', x: 130, y: 595 },
            { shape: 'tShape', x: 330, y: 580 },
            { shape: 'flatLong', x: 490, y: 605 },
            // Upper-mid (y: 460-500)
            { shape: 'pillar', x: 190, y: 490 },
            { shape: 'flatMedium', x: 360, y: 490 },
            { shape: 'lShapeDownLeft', x: 540, y: 500 },
            // Upper (y: 360-400)
            { shape: 'flatSmall', x: 130, y: 390 },
            { shape: 'blockShort', x: 320, y: 380 },
            { shape: 'flatMedium', x: 510, y: 400 },
            // Top (y: 250-300)
            { shape: 'flatMedium', x: 190, y: 285 },
            { shape: 'flatSmall', x: 410, y: 260 },
            { shape: 'flatSmall', x: 580, y: 295 },
            // Very top (y: 130-180)
            { shape: 'flatSmall', x: 130, y: 170 },
            { shape: 'flatLong', x: 360, y: 155 },
            { shape: 'flatTiny', x: 590, y: 180 }
        ]
    },
    
    // Layout 2
    {
        name: "mix2",
        platforms: [
            // Bottom
            { shape: 'flatMedium', x: 100, y: 800 },
            { shape: 'rock', x: 280, y: 785 },
            { shape: 'flatLong', x: 490, y: 800 },
            // Lower-mid
            { shape: 'blockTall', x: 130, y: 700 },
            { shape: 'bumpyWide', x: 320, y: 710 },
            { shape: 'flatSmall', x: 550, y: 695 },
            // Mid
            { shape: 'flatSmall', x: 130, y: 595 },
            { shape: 'cupShape', x: 255, y: 585 },
            { shape: 'flatMedium', x: 410, y: 605 },
            { shape: 'blockShort', x: 580, y: 585 },
            // Upper-mid
            { shape: 'lShapeDownRight', x: 130, y: 490 },
            { shape: 'flatLong', x: 360, y: 475 },
            { shape: 'flatTiny', x: 590, y: 465 },
            // Upper
            { shape: 'flatMedium', x: 190, y: 375 },
            { shape: 'pillar', x: 410, y: 385 },
            { shape: 'flatSmall', x: 550, y: 360 },
            // Top
            { shape: 'flatSmall', x: 130, y: 260 },
            { shape: 'flatMedium', x: 330, y: 270 },
            { shape: 'lShapeDownLeft', x: 540, y: 260 },
            // Very top
            { shape: 'flatLong', x: 230, y: 155 },
            { shape: 'flatSmall', x: 540, y: 140 }
        ]
    },
    
    // Layout 3
    {
        name: "mix3",
        platforms: [
            // Bottom
            { shape: 'flatLong', x: 150, y: 800 },
            { shape: 'lShapeDownLeft', x: 410, y: 775 },
            { shape: 'flatMedium', x: 590, y: 800 },
            // Lower-mid
            { shape: 'flatMedium', x: 130, y: 695 },
            { shape: 'notchedBlock', x: 360, y: 700 },
            { shape: 'pillar', x: 565, y: 715 },
            // Mid
            { shape: 'blockWide', x: 130, y: 595 },
            { shape: 'flatSmall', x: 320, y: 580 },
            { shape: 'flatLong', x: 490, y: 600 },
            // Upper-mid
            { shape: 'flatTiny', x: 130, y: 490 },
            { shape: 'blockShort', x: 280, y: 495 },
            { shape: 'lShapeDownRight', x: 460, y: 490 },
            // Upper
            { shape: 'flatMedium', x: 165, y: 385 },
            { shape: 'flatSmall', x: 380, y: 375 },
            { shape: 'flatMedium', x: 540, y: 390 },
            // Top
            { shape: 'flatSmall', x: 130, y: 270 },
            { shape: 'tShape', x: 305, y: 260 },
            { shape: 'flatMedium', x: 490, y: 285 },
            // Very top
            { shape: 'flatMedium', x: 255, y: 155 },
            { shape: 'flatTiny', x: 510, y: 170 }
        ]
    },
    
    // Layout 4
    {
        name: "mix4",
        platforms: [
            // Bottom
            { shape: 'blockShort', x: 100, y: 780 },
            { shape: 'flatLong', x: 295, y: 800 },
            { shape: 'lShapeDownRight', x: 540, y: 775 },
            // Lower-mid
            { shape: 'flatMedium', x: 130, y: 685 },
            { shape: 'tShape', x: 320, y: 680 },
            { shape: 'flatMedium', x: 510, y: 695 },
            // Mid
            { shape: 'lShapeDownLeft', x: 130, y: 580 },
            { shape: 'rock', x: 330, y: 570 },
            { shape: 'bumpyWide', x: 475, y: 585 },
            // Upper-mid
            { shape: 'flatSmall', x: 130, y: 475 },
            { shape: 'blockTall', x: 305, y: 490 },
            { shape: 'flatMedium', x: 490, y: 475 },
            // Upper
            { shape: 'flatSmall', x: 150, y: 375 },
            { shape: 'cupShape', x: 360, y: 360 },
            { shape: 'flatSmall', x: 540, y: 375 },
            // Top
            { shape: 'flatMedium', x: 205, y: 270 },
            { shape: 'flatSmall', x: 435, y: 260 },
            { shape: 'pillar', x: 590, y: 270 },
            // Very top
            { shape: 'flatSmall', x: 130, y: 155 },
            { shape: 'flatLong', x: 330, y: 170 }
        ]
    },
    
    // Layout 5
    {
        name: "mix5",
        platforms: [
            // Bottom
            { shape: 'flatMedium', x: 130, y: 800 },
            { shape: 'pillar', x: 320, y: 770 },
            { shape: 'flatMedium', x: 450, y: 800 },
            { shape: 'flatSmall', x: 600, y: 785 },
            // Lower-mid
            { shape: 'blockWide', x: 130, y: 700 },
            { shape: 'flatLong', x: 360, y: 695 },
            { shape: 'flatTiny', x: 590, y: 685 },
            // Mid
            { shape: 'flatSmall', x: 130, y: 595 },
            { shape: 'lShapeDownRight', x: 280, y: 595 },
            { shape: 'blockShort', x: 540, y: 585 },
            // Upper-mid
            { shape: 'flatMedium', x: 130, y: 490 },
            { shape: 'flatSmall', x: 360, y: 475 },
            { shape: 'notchedBlock', x: 510, y: 495 },
            // Upper
            { shape: 'lShapeDownLeft', x: 150, y: 385 },
            { shape: 'flatMedium', x: 360, y: 375 },
            { shape: 'flatSmall', x: 565, y: 390 },
            // Top
            { shape: 'flatSmall', x: 130, y: 270 },
            { shape: 'blockShort', x: 320, y: 265 },
            { shape: 'flatMedium', x: 510, y: 285 },
            // Very top
            { shape: 'flatLong', x: 230, y: 170 },
            { shape: 'flatTiny', x: 540, y: 155 }
        ]
    }
];

```

**Refresh** to see the larger game!

---

## Scaled from 550×700 → 700×900

| Element | Before | After |
|---------|--------|-------|
| Canvas | 550×700 | 700×900 |
| Left wall | x=45 | x=55 |
| Right wall | x=505 | x=645 |
| Water | y=655 | y=845 |
| Play area | 460×570 px | 590×745 px |

All platform positions, UI elements, and boundaries have been scaled to match. The game should fill more of your screen now!

---

**User**

ok quick outline of my wishlist without working on it or fleshing details. reduce character size to half. reduce water height to half. reduce water realism so just one line represents surface. raise bottom edge of right and left walls like in example map. additionally tweak platform shapes sizes layouts and locations.

---

**Cursor**

Got it! Here's your wishlist captured:

---

## Wishlist

1. **Reduce character size to half** - Player and enemies smaller
2. **Reduce water height to half** - Less water area at bottom
3. **Simplify water** - Just one line for surface (less realistic, more doodled)
4. **Raise wall bottom edges** - Like in example-map, walls don't go all the way to water
5. **Tweak platform shapes/sizes/layouts/locations** - General refinement pass

---

Ready to tackle these whenever you want - one at a time or as a batch. Just say the word!

---

**User**

ok lets checkpoint here

---

**Cursor**

```markdown
# Current Context for New Chat

## Project Status: Playable Prototype with Notebook Paper Aesthetic ✓

A stick figure arena shooter built with Phaser 3, styled to look like doodles on crumpled notebook paper.

## What Works

- **Player movement:** Arrow keys to move left/right, up to jump
- **Shooting:** Click to fire toward mouse cursor
- **Enemies:** Red stick figures placed on platforms, destroyed when shot
- **Level progression:** Complete a level by shooting all enemies, click to continue
- **Level layouts:** 5 mixed layouts that cycle, all using variety of shapes
- **Platform shape library:** 15 different shapes (flat platforms, L-shapes, blocks, pillars, special shapes)
- **Water hazard:** Wavy blue water at bottom kills player, respawns at start
- **Walls:** Hand-drawn irregular walls on left and right sides
- **Notebook paper background:** Actual crumpled paper image (user-cropped)
- **Hand-drawn aesthetic:** Stick figures, sketchy platform outlines, pen-stroke bullets

## File Structure

```
stick-game-test/
├── index.html                    # Entry point, loads Phaser from CDN
├── js/
│   ├── game.js                   # Phaser config (700x900 canvas)
│   ├── platforms/
│   │   └── PlatformShapes.js     # 15 shapes + 5 level layouts
│   └── scenes/
│       └── PlayScene.js          # Main gameplay
├── assets/
│   ├── notebook-page-crumpled.jpg
│   ├── notebook-paper-cropped.jpg
│   └── cropped-notebook-page.png  # User-cropped, currently used
├── reference/
│   ├── notebook-page-crumpled.jpg
│   ├── cropped-notebook-page.png
│   ├── example-map.png
│   └── example-map-2.png          # With stick figure for scale
├── ai-context-management/
└── README.md
```

## Technical Notes

- Phaser 3.70.0 via CDN
- Canvas: 700x900 (scaled up notebook proportions)
- Arcade Physics with gravity (800)
- Debug mode ON (green collision boxes visible)
- Walls at x=55 (left) and x=645 (right)
- Water at y=845
- Run with `python3 -m http.server 8000`

## Wishlist (Not Yet Implemented)

1. Reduce character size to half
2. Reduce water height to half
3. Simplify water to just one line for surface
4. Raise wall bottom edges (like in example-map)
5. Tweak platform shapes/sizes/layouts/locations

## What Doesn't Exist Yet

- Grappling gun
- Multiple weapons
- Destructible terrain
- Enemy AI (enemies are static)
- Lives/game over system
- Sound effects

## Recent Changes

1. Initial prototype with movement, shooting, enemies, levels
2. Added water hazard, replaced ground with platforms
3. Notebook paper proportions and hand-drawn aesthetic
4. Created platform shape library (15 shapes) based on user reference
5. Added walls on left and right sides
6. Scaled up canvas from 550x700 to 700x900
7. Added platforms to fill full vertical space

## Known Issues

- Respawn bug fixed (was spawning twice)
- All working as expected

```

```markdown
# Current Work Focus

Playable prototype at larger scale (700x900) with full notebook paper aesthetic. Platform shape library complete with 15 shapes and 5 mixed layouts. Walls and water hazard in place. Ready to refine visual details.

- **Project Goal:** Build a browser-based stick figure arena shooter with random level generation (Worms-style vibes, notebook paper aesthetic)

- **Intermediate Goal:** Refine visual scale and proportions to match the hand-drawn reference style

- **Current Task:** Wishlist defined - next steps are: reduce character size, simplify water, adjust wall heights, tweak platform layouts

```

**Checkpoint complete!** ✅

---

**Commit:** `e23cead` - "Scale up to 700x900, add walls, full vertical platforms, 15 platform shapes, 5 mixed layouts"

**Pushed to GitHub**

**Context files updated** with current state + wishlist captured

---

**Wishlist ready for next session:**
1. Reduce character size to half
2. Reduce water height to half  
3. Simplify water to one line
4. Raise wall bottom edges
5. Tweak platform shapes/sizes/layouts

Ready to continue whenever you are!

---

**User**

how is your context window. should we start a new chat?

---

**Cursor**

Good question! Honest assessment:

**I'm doing fine** - still tracking everything clearly. We've been efficient and the checkpoints help.

**But** this has been a substantial session with a lot of code changes. Starting fresh would:
- Give me a clean slate
- The context system will bootstrap me quickly (that's why we built it!)
- Might get slightly crisper responses

**My suggestion:** Since we just checkpointed and have a clear wishlist, this is a **natural break point**. If you want to continue now, I'm good. If you want to test the context system with a fresh chat, now's a perfect time.

Your call - either works!

---

**User**

im about to paste this in. it may be redundant since we just checkpointed but i want to test the context management system. @paste-this-into-stale-ai-chats.txt (1-5) 

---

**Cursor**

Following the stale chat procedures:

---

## Context Check

Would you like me to:

**A) Refresh & Continue** - I'll re-read the context files and continue this chat with fresh orientation

**B) Start Fresh** - I'll help preserve this session's work and prepare you to start a new chat

---

Since we just checkpointed, both options are clean. If you're testing the system, **Option B** would let you see the full new-chat bootstrap process!

---

**User**

lets try B

---

**Cursor**

## Starting Fresh - Step 1: Preserve This Chat's History

**Would you like to:**

**A) Export this chat yourself** - Use the guides in `for-humans/how-to-export-chat-record/` (there's one for Cursor)

**B) Have me create a detailed summary** - I'll write a comprehensive record of this session to `past-chat-record/`

---

*Note: Since we just checkpointed, the current context files are already up-to-date. But preserving the full chat history gives you a detailed record of HOW we got here, not just where we are.*

---

**User**

the folder is actually missing cursor instructions. ill do it myself if you tell me how

---

**Cursor**

Let me create the Cursor export instructions:

```markdown
# How to Export Chat from Cursor

## Method 1: Copy & Paste (Simplest)

1. In Cursor, scroll to the top of your chat
2. Click and drag to select all messages (or Cmd+A if it works)
3. Copy (Cmd+C)
4. Create a new file in `past-chat-record/` named `YYYY-MM-DD-description.md`
5. Paste (Cmd+V)
6. Clean up formatting if needed

## Method 2: Manual Transcription

If copy doesn't work well:
1. Create a new markdown file in `past-chat-record/`
2. Go through the chat and copy key exchanges
3. Focus on: decisions made, code written, problems solved

## File Naming

Use format: `YYYY-MM-DD-brief-description.md`

Examples:
- `2025-01-04-initial-game-prototype.md`
- `2025-01-04-notebook-aesthetic-and-platforms.md`

## Tips

- Cursor chats can be long - you don't need every message
- Focus on capturing: what was built, key decisions, what's next
```

---

**User**

dont create that. the system is copied from a permanent system saved elsewhere. if i want to update it i will do it elsewhere and copy it here. just tell me how

---

**Cursor**

Got it! Here's how to export a Cursor chat:

## Cursor Chat Export

**Option 1: Copy/Paste (Simplest)**
1. In the chat panel, scroll to the top
2. Click and drag to select all messages (or Cmd+A if it works)
3. Copy and paste into a markdown file

**Option 2: Chat History File**
1. Open Command Palette (Cmd+Shift+P)
2. Search for "Export" or "Chat" - Cursor may have an export option
3. If not, the chat history is stored in Cursor's data folder:
   - Mac: `~/Library/Application Support/Cursor/`
   - Look for chat logs or history files

**Option 3: Manual Summary**
1. Just scroll through and copy the key parts you want to preserve
2. The full transcript isn't always necessary - key decisions and code changes matter most

---

For this session, since we checkpointed thoroughly, the context files already capture the state. A full export is optional but nice for the detailed "how we got here" story.

Ready when you are to finish the transition!

