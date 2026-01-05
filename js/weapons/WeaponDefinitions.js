/**
 * WeaponDefinitions.js - Weapon stats and properties
 * 
 * Each weapon has:
 * - name: Display name
 * - velocity: Bullet speed (pixels/second)
 * - fireRate: Shots per second (higher = faster)
 * - crosshairDistance: How far crosshair orbits from player
 * - crosshairGap: Gap in center of crosshair (smaller = more precise)
 * - damage: Damage per hit (for future use)
 * - spread: Bullet spread angle in radians (for shotgun)
 * - pellets: Number of projectiles per shot (for shotgun)
 * - projectileSize: Hitbox size multiplier (1 = normal)
 */

export const WEAPONS = {
    pistol: {
        name: 'Pistol',
        velocity: 600,
        fireRate: 3,           // 3 shots/sec
        crosshairDistance: 85,
        crosshairGap: 4,
        damage: 25,
        spread: 0,
        pellets: 1,
        projectileSize: 1
    },
    
    shotgun: {
        name: 'Shotgun',
        velocity: 500,
        fireRate: 1,           // 1 shot/sec (slow)
        crosshairDistance: 60, // Shorter range
        crosshairGap: 8,       // Less precise
        damage: 15,            // Per pellet
        spread: 0.3,           // ~17 degrees spread
        pellets: 5,            // 5 pellets per shot
        projectileSize: 0.7
    },
    
    smg: {
        name: 'SMG',
        velocity: 550,
        fireRate: 10,          // 10 shots/sec (very fast)
        crosshairDistance: 70,
        crosshairGap: 6,       // Medium precision
        damage: 10,
        spread: 0.1,           // Slight spread
        pellets: 1,
        projectileSize: 0.8
    },
    
    huntingRifle: {
        name: 'Hunting Rifle',
        velocity: 900,         // Very fast bullets
        fireRate: 0.8,         // Slow (~1.25 sec between shots)
        crosshairDistance: 120, // Long range
        crosshairGap: 2,       // Very precise
        damage: 100,
        spread: 0,
        pellets: 1,
        projectileSize: 1
    },
    
    autoRifle: {
        name: 'Auto Rifle',
        velocity: 700,
        fireRate: 5,           // 5 shots/sec
        crosshairDistance: 90,
        crosshairGap: 4,
        damage: 20,
        spread: 0.05,          // Very slight spread
        pellets: 1,
        projectileSize: 1
    }
};

// Weapon slot order (for number key selection)
export const WEAPON_SLOTS = [
    'pistol',
    'shotgun', 
    'smg',
    'huntingRifle',
    'autoRifle'
];

// Get weapon by slot number (1-5)
export function getWeaponBySlot(slot) {
    const index = slot - 1;
    if (index >= 0 && index < WEAPON_SLOTS.length) {
        return WEAPONS[WEAPON_SLOTS[index]];
    }
    return WEAPONS.pistol;  // Default
}

