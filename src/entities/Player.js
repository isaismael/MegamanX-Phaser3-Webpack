import Phaser from "phaser";
import HealthBar from "../hud/HealthBar";
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
        this.hasBeenHit = false;
        this.bounceVelocity = 250;
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        //
        this.health = 100;
        this.hp = new HealthBar(
            this.scene,
            150, 80,
            this.health
        )
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
        if(this.hasBeenHit) {
            return;
        }

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

    bounceOff() {
        this.body.touching.right ?
        this.setVelocityX(-this.bounceVelocity) :
        this.setVelocityX(this.bounceVelocity);

        setTimeout(() => this.setVelocityX(-this.bounceVelocity), 0)
    }

    takesHit(initiator) {
        if (this.hasBeenHit) {return;}
        this.hasBeenHit = true;
        this.bounceOff();

        this.health -= initiator.damage;
        this.hp.decrease(this.health);

        this.play('damage', true)

        this.scene.time.delayedCall(800, () => this.hasBeenHit = false);

    }
}

export default Player;