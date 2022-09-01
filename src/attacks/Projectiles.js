import Phaser from "phaser";
import Projectile from "./Projectile";
import { getTimestamp } from "../utils/functions";

class Projectiles extends Phaser.Physics.Arcade.Group{
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 5,
            active: false,
            visible: false,
            key: 'attack-one',
            classType: Projectile
        })

        this.timeFromlastProjectile =  null;
    }

    fireProjectile(initiator) {
        const projectile = this.getFirstDead(false);
        
        if(!projectile) { return; }
        if(this.timeFromlastProjectile &&
            this.timeFromlastProjectile + projectile.cooldown > getTimestamp()) { return; }

        const center = initiator.getCenter();
        let centerX;

        if(initiator.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
            projectile.speed = Math.abs(projectile.speed);
            projectile.setFlipX(false);
            projectile.setScale(2.5);
            centerX = center.x + 50
        } else {
            projectile.speed = -Math.abs(projectile.speed);
            projectile.setFlipX(true);
            projectile.setScale(2.5);
            centerX = center.x - 50
        }

        projectile.fire(centerX, center.y);
        this.timeFromlastProjectile = getTimestamp();
    }
}

export default Projectiles;