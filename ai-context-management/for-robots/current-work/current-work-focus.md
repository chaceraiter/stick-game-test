# Current Work Focus

Layout system complete with 18 shapes and 6 layouts. Visual style polished. Good stopping point. Consider refactoring before adding more features.

- **Project Goal:** Build a browser-based stick figure arena shooter with random level generation (Worms-style vibes, notebook paper aesthetic)

- **Intermediate Goal:** Refactor codebase, then expand shape library and build procedural generator

- **Current Task:** Checkpoint complete. Next: refactor PlayScene.js (780 lines) into smaller modules, then continue with more shapes and generator.

## Potential Refactoring

1. **Split PlayScene.js:**
   - Shape/platform drawing → `js/drawing/ShapeRenderer.js`
   - Wall/water drawing → `js/drawing/EnvironmentRenderer.js`
   - Debug controls → `js/utils/DebugControls.js`

2. **Split PlatformShapes.js:**
   - Shape definitions → `js/platforms/ShapeDefinitions.js`
   - Layout definitions → `js/platforms/LayoutDefinitions.js`

## Queued Features (After Refactor)

1. Add more base shapes (5-10)
2. Shape variations (flip, scale)
3. Procedural layout generator
4. Dynamic holes/tunnels system
