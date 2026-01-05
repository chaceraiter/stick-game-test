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
- **Enemies:** Stick figures placed around the map
- **Win Condition:** Hit all enemy stick figures to complete the level
- **Progression:** Random level generation with new enemy placements after each win
- **Hazards:** Water at the bottom of the map that kills the player

## Current State (MVP Complete)

✅ Player movement (run, jump)
✅ Basic arena/level with platforms
✅ Laser gun shooting
✅ Enemy stick figures (static targets)
✅ Level completion detection
✅ Water hazard
✅ 6 hand-crafted layouts (procedural generation pending)
✅ 18-shape platform library
✅ Codebase refactored into ES6 modules

---

## Feature Roadmap

### 1. Player Movement
**Current:** Basic left/right + jump
**Ideas:**
- Wall sliding / wall jump
- Double jump
- Crouch / slide
- Climb ledges
- Grappling hook
- Momentum / acceleration curves
- Coyote time (brief jump window after leaving platform)

### 2. Weapons & Projectiles
**Current:** Single laser gun, instant straight shots
**Ideas:**
- Multiple weapon types (shotgun spread, rocket launcher, grenade arc)
- Weapon switching / inventory
- Ammo / reload mechanics
- Projectile physics (gravity-affected, bouncing)
- Charging shots
- Different damage types
- Pickup weapons from map

### 3. Damage & Health
**Current:** Enemies die in 1 hit, player dies from water only
**Ideas:**
- Enemy health (multiple hits to kill)
- Player health system (HP bar, multiple hits)
- Damage numbers / feedback
- Knockback on hit
- Invincibility frames
- Death animations
- Respawn mechanics (lives system?)

### 4. Enemies
**Current:** Static red stick figures, don't move or shoot
**Ideas:**
- Enemy AI (patrol, chase, flee)
- Enemies that shoot back
- Different enemy types (melee, ranged, heavy)
- Enemy spawning waves
- Boss enemies
- Enemy health bars
- Alert states (idle → alerted → attacking)

### 5. Spawning System
**Current:** Fixed spawn points on platforms, enemies placed randomly
**Ideas:**
- Player spawn point selection (safe zones)
- Enemy spawn waves / timing
- Spawn animations / effects
- Reinforcement spawns mid-level
- Spawn point capture mechanics

### 6. Level Generation
**Current:** 6 hand-crafted layouts, 18-shape library
**Ideas:**
- Procedural layout generator
- More shapes (5-10 more)
- Shape variations (flip, scale, rotate)
- Dynamic holes/tunnels
- Destructible terrain
- Interactive elements (doors, switches, traps)
- Themed level sets
- Difficulty scaling

### 7. Multiplayer (Long-term)
**Ideas:**
- Local co-op (same screen)
- Online multiplayer (WebSocket/WebRTC)
- PvP mode (deathmatch)
- Co-op vs enemies
- Turn-based mode (like Worms)
- Lobby / matchmaking

---

## Priority Tiers

**Tier 1 - Core Depth (Next)**
- Procedural level generator
- Player health system
- Enemy health + damage feedback
- 1-2 more weapon types

**Tier 2 - Combat Feel**
- Enemy AI (basic movement + shooting)
- More movement options (wall jump, etc.)
- Weapon variety
- Polish (screenshake, particles, sound)

**Tier 3 - Progression**
- Wave-based gameplay
- Difficulty scaling
- Score / high scores
- Unlockables?

**Tier 4 - Multiplayer**
- Local first, then online
- Requires significant architecture work

---

## Success Criteria

A fun, replayable game loop with variety in weapons, enemies, and levels. Code remains understandable and modular.
