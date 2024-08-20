/*
    LittleJS Platformer Example - Objects
    - Base GameObject class for objects with health
    - Crate object collides with player, can be destroyed
    - Weapon is held and fires bullets with some settings
    - Bullet is the projectile launched by a weapon
*/

// import module
import * as LittleJS from '../../dist/littlejs.esm.js';
import { ASSERT, max, percent } from '../../dist/littlejs.esm.js';
const {
    EngineObject,
    Timer,
    hsl
} = LittleJS;

class GameObject extends EngineObject
{
    damageTimer: LittleJS.Timer;
    health: number;
    isGameObject: number;
    warmup: number // this prop is from gameLevel js

    constructor(
        pos: LittleJS.Vector2, 
        size: LittleJS.Vector2, 
        tileInfo: LittleJS.TileInfo, 
        angle: number
    )
    {
        super(pos, size, tileInfo, angle);
        this.health = 0;
        this.isGameObject = 1;
        this.damageTimer = new Timer;
    }

    update()
    {
        super.update();

        // flash white when damaged
        if (!this.isDead() && this.damageTimer.isSet())
        {
            const a = .5*percent(this.damageTimer, .15, 0);
            this.additiveColor = hsl(0,0,a,0);
        }
        else
            this.additiveColor = hsl(0,0,0,0);

        // kill if below level
        if (!this.isDead() && this.pos.y < -9)
            this.warmup ? this.destroy() : this.kill();
    }

    damage(damage, damagingObject)
    {
        ASSERT(damage >= 0);
        if (this.isDead())
            return 0;
        
        // set damage timer;
        this.damageTimer.set();
        for (const child of this.children)
            child.damageTimer && child.damageTimer.set();

        // apply damage and kill if necessary
        const newHealth = max(this.health - damage, 0);
        if (!newHealth)
            this.kill(damagingObject);

        // set new health and return amount damaged
        return this.health - (this.health = newHealth);
    }

    isDead()                { return !this.health; }
    
    kill(damagingObject?: any)    { this.destroy(); }
}