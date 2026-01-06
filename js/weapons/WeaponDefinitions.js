/**
 * WeaponDefinitions.js - Weapon stats and properties
 * 
 * Each weapon has:
 * - name: Display name
 * - velocity: Bullet speed (pixels/second)
 * - fireRate: Shots per second (higher = faster)
 * - fireMode: 'semi' or 'auto'
 * - crosshairDistance: How far crosshair orbits from player
 * - crosshairGap: Gap in center of crosshair (smaller = more precise)
 * - damage: Damage per hit (for future use)
 * - spread: Bullet spread angle in radians (for shotgun)
 * - pellets: Number of projectiles per shot (for shotgun)
 * - projectileSize: Hitbox size multiplier (1 = normal)
 * - magSize: Rounds per magazine
 * - reloadTimeMs: Reload duration in milliseconds
 */

export const WEAPONS = {
    pistol: {
        name: 'Pistol',
        velocity: 600,
        fireRate: 20,          // 50ms per shot
        fireMode: 'semi',
        crosshairDistance: 85,
        crosshairGap: 4,
        damage: 25,
        spread: 0,
        pellets: 1,
        projectileSize: 1,
        magSize: 17,
        reloadTimeMs: 1500
    },
    
    shotgun: {
        name: 'Shotgun',
        velocity: 500,
        fireRate: 3.33,        // 300ms per shot
        fireMode: 'semi',
        crosshairDistance: 60, // Shorter range
        crosshairGap: 8,       // Less precise
        damage: 15,            // Per pellet
        spread: 0.3,           // ~17 degrees spread
        pellets: 5,            // 5 pellets per shot
        projectileSize: 0.7,
        magSize: 5,
        reloadTimeMs: 3000
    },
    
    smg: {
        name: 'SMG',
        velocity: 550,
        fireRate: 14.29,       // 70ms per shot
        fireMode: 'auto',
        crosshairDistance: 70,
        crosshairGap: 6,       // Medium precision
        damage: 10,
        spread: 0.1,           // Slight spread
        pellets: 1,
        projectileSize: 0.8,
        magSize: 25,
        reloadTimeMs: 2200
    },
    
    huntingRifle: {
        name: 'Hunting Rifle',
        velocity: 900,         // Very fast bullets
        fireRate: 0.83,        // 1200ms per shot
        fireMode: 'semi',
        crosshairDistance: 120, // Long range
        crosshairGap: 2,       // Very precise
        damage: 100,
        spread: 0,
        pellets: 1,
        projectileSize: 1,
        magSize: 3,
        reloadTimeMs: 3500
    },
    
    autoRifle: {
        name: 'Auto Rifle',
        velocity: 700,
        fireRate: 10,          // 100ms per shot
        fireMode: 'auto',
        crosshairDistance: 90,
        crosshairGap: 4,
        damage: 20,
        spread: 0.05,          // Very slight spread
        pellets: 1,
        projectileSize: 1,
        magSize: 20,
        reloadTimeMs: 2800
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
