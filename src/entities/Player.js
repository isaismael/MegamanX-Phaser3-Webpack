import Phaser from "phaser";
import initAnimations from './anims/playerAnims'

import collidable from "../mixins/collidable";

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');

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
        this.playerSpeed = 250
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        //
        this.body.setGravityY(this.gravity);
        this.setCollideWorldBounds(true);
        this.setOrigin(0.5, 1)
        //
        initAnimations(this.scene.anims)
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update() {
        const { left, right, space, up } = this.cursors;
        const onFloor = this.body.onFloor();

        if (left.isDown) {
            this.setFlipX(true)
            this.setVelocityX(-this.playerSpeed)
        } else if (right.isDown) {
            this.setFlipX(false)
            this.setVelocityX(this.playerSpeed)
        } else {
            this.setVelocityX(0)
        }
        //
        if ((space.isDown || up.isDown) && onFloor) {
            this.setVelocityY(-this.playerSpeed * 1.3)
        }

        // Play Anims
        onFloor ?
            this.body.velocity.x !== 0 ?
                this.play('run', true) : this.play('idle', true) :
            this.play('jump', true)
    }
}

export default Player;