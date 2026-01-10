# Grapple Alt Implementation Experiment (Branch: `grapple-alt-impl`)

This file documents the intentionally simplified grapple *experiment* we’re trying on this branch. If it feels better, we can adopt it (and update the main spec). If not, we can abandon the branch with no impact to `main`.

## Goal

Strip the pump/swing rules down to the minimum so we can:

1) Verify whether the rope motion has any **unintended damping** (energy loss) without our explicit damping code.
2) Evaluate a simpler pumping model before reintroducing “realistic” rules.

## What’s Different From the Main Spec

### Damping

- **Explicit swing damping is disabled** (so the swing should persist indefinitely unless something else is bleeding energy).

### Pumping

Instead of queued/nadir-timed pumping:

- **On A/D press:** apply a tangential impulse immediately.
- **Limit:** at most **one pump per half swing** (either direction). After you pump once, further A/D presses are ignored until the swing direction flips at the apex.
- No special bottom/nadir timing and no queue windows in this experiment.

## What We’re Testing

- If a no-input swing decays quickly anyway, the damping is coming from somewhere else (projection, collisions, Arcade resolution, etc.).
- Whether “one impulse per half swing” feels more predictable and intuitive than the queued/nadir rules.

