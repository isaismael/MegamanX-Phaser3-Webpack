import Phaser from "phaser";

class Play extends Phaser.Scene {
    constructor(){
        super('PlayScene');
    }

    create() {
        const map = this.createMap();
        const layers = this.createLayers(map);

        const player = this.createPlayer();
        //
        this.physics.add.collider(player, layers.platformsColliders)
    }

    createMap() {
        const map = this.make.tilemap({key: 'map'});
        map.addTilesetImage('escenario', 'tiles-1');
        return map;
    }

    createLayers(map) {
        const tileset = map.getTileset('escenario');
        // Colliders
        const platformsColliders = map.createStaticLayer('platforms_colliders', tileset)
        // Platforms
        const platforms = map.createStaticLayer('platforms', tileset);
        
        platformsColliders.setCollisionByProperty({collides: true})

        return{
            platforms,
            platformsColliders
        }
    }

    createPlayer(){
        const player = this.physics.add.sprite(450, 100, 'player').setScale(1.5)
        player.body.setGravityY(500);
        player.setCollideWorldBounds(true)
        return player;
    }

}

export default Play;

