import Phaser from "phaser";

import collidable from "../mixins/collidable";

class Crusher  extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'crusher');

        scene.add.existing(this)
        scene.physics.add.existing(this);

        // Mixins
        Object.assign(this, collidable);

        this.init();
    }

    init() {
        this.setScale(2.2)
        //
        this.gravity = 500;
        this.speed = 250
        //
        this.body.setGravityY(this.gravity);
        this.setCollideWorldBounds(true);
        this.setOrigin(0.5, 1)
        //
    }

}

export default Crusher;