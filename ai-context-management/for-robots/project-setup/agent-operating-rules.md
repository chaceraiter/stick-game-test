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
