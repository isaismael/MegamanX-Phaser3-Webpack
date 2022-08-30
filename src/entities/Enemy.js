import Phaser from "phaser";

import collidable from "../mixins/collidable";

class Enemy  extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        scene.add.existing(this)
        scene.physics.add.existing(this);

        // Mixins
        Object.assign(this, collidable);

        this.init();
        this.initEvents();
    }

    init() {
        this.setScale(2.2)
        //
        this.gravity = 500;
        this.speed = 250
        //
        this.body.setGravityY(this.gravity);
        this.setSize(30, 35);
        this.setCollideWorldBounds(true);
        this.setImmovable(true);
        this.setOrigin(0.5, 1)
        //
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update(time, delta) {
        this.setVelocityX(30)
    }

}

export default Enemy;