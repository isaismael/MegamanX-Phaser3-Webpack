import Phaser from "phaser";
import SpriteEffect from "../effects/SpriteEffect";

class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.speed = 450;
        this.maxDistance = 800;
        this.traveledDistace = 0;

        this.damage = 10;
        this.cooldown = 100;
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        this.traveledDistace += this.body.deltaAbsX();

        if(this.ifOutRange()) {
            this.body.reset(0, 0);
            this.activeProjectile(false);
            this.traveledDistace = 0
        }
    }

    fire(x, y) {
        this.activeProjectile(true);
        this.body.reset(x, y);
        this.setVelocityX(this.speed);
    }

    deliversHit(target) {
        this.activeProjectile(false);
        this.traveledDistace = 0;
        this.body.reset(0,0);
        new SpriteEffect(this.scene, 0, 0, 'hit-enemy').playOn(target);
    }

    activeProjectile(isActive){
        this.setActive(isActive);
        this.setVisible(isActive);
    }

    ifOutRange() {
        return this.traveledDistace &&
        this.traveledDistace >= this.maxDistance;
    }
}

export default Projectile;