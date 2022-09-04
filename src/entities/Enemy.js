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
        this.speed = 100;
        this.timeForLastTurn = 0;
        
        this.health = 40;
        this.damage = 20;

        this.platformCollidersLayer = null;
        this.rayGraphics = this.scene.add.graphics({lineStyle: {
            width: 2,
            color: 0
        }});
        //
        this.body.setGravityY(this.gravity);
        this.setSize(30, 35);
        this.setCollideWorldBounds(true);
        this.setImmovable(true);
        this.setVelocityX(this.speed)
        //
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update(time, delta) {
        const { ray, hasHit } = this.raycast(this.body, this.platformCollidersLayer, 40, 1)

        if(!hasHit && this.timeForLastTurn + 100 < time) {
            this.setFlipX(!this.flipX);
            this.setVelocityX(this.speed = -this.speed)
            this.timeForLastTurn = time;
        }

        this.rayGraphics.clear();
        this.rayGraphics.strokeLineShape(ray);
    }

    setPlatformsColliders(platformCollidersLayer) {
        this.platformCollidersLayer = platformCollidersLayer
    }

    takesHit(source) {
        source.deliversHit(this);

        this.health -= source.damage;
                
        if(this.health <= 0) {
            console.log('enemy dead');
        }
    }
}

export default Enemy;