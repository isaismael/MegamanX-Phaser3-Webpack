import Phaser from "phaser";

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
            this.setActive(false);
            this.setVisible(false);
            this.traveledDistace = 0
        }
    }

    fire(x, y) {
        this.setActive(true);
        this.setVisible(true);
        this.body.reset(x, y)
        this.setVelocityX(this.speed)
    }

    ifOutRange() {
        return this.traveledDistace &&
        this.traveledDistace >= this.maxDistance;
    }
}

export default Projectile;