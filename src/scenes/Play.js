import Phaser from "phaser";
import Player from "../entities/Player";
import Crusher from "../entities/Crusher";

class Play extends Phaser.Scene {
    constructor(config) {
        super('PlayScene');
        this.config = config
    }

    create() {
        const map = this.createMap();
        const layers = this.createLayers(map);
        const playerZones = this.getPlayerZones(layers.playerZones);
        const player = this.createPlayer(playerZones.start);
        const enemy = this.createEnemy();
        //
        this.createEnemyColliders(enemy, {
            colliders: {
                platformsColliders: layers.platformsColliders
            }
        });
        //
        this.createPlayerColliders(player, {
            colliders: {
                platformsColliders: layers.platformsColliders
            }
        });
        //
        this.createEndOfLevel(playerZones.end, player);
        this.setupFollowupCameraOn(player);
    }

    createMap() {
        const map = this.make.tilemap({ key: 'map' });
        map.addTilesetImage('escenario', 'tiles-1');
        return map;
    }

    createLayers(map) {
        const tileset = map.getTileset('escenario');
        const platformsColliders = map.createStaticLayer('platforms_colliders', tileset);
        const platforms = map.createStaticLayer('platforms', tileset);
        const playerZones = map.getObjectLayer('player_zones');
        //
        platformsColliders.setCollisionByProperty({ collides: true })
        //
        return {
            platforms,
            platformsColliders,
            playerZones,
        }
    }

    createPlayer(start) {
        return new Player(this, start.x, start.y);
    }

    createEnemy () {
        return new Crusher(this, 400, 200)
    }

    createEnemyColliders(enemy, { colliders }) {
        enemy
            .addCollider(colliders.platformsColliders);
    }

    createPlayerColliders(player, { colliders }) {
        player
            .addCollider(colliders.platformsColliders);
    }
    //
    setupFollowupCameraOn(player) {
        const { width, height, mapOffset } = this.config;
        this.physics.world.setBounds(0, 0, width + mapOffset, height + 200)
        this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(1.2);
        this.cameras.main.startFollow(player)
    }

    getPlayerZones (playerZonesLayer) {
        const playerZones = playerZonesLayer.objects;
        return {
            start: playerZones.find(zone => zone.name === 'startZone'),
            end: playerZones.find(zone => zone.name === 'endZone'),
        }
    }
    createEndOfLevel(end, player) {
        const endOfLevel = this.physics.add.sprite(end.x, end.y, 'end')
        .setAlpha(0)
        .setSize(5, this.config.height);

        const eolOverlap = this.physics.add.overlap(player, endOfLevel, () => {
            eolOverlap.active = false;
            console.log('GANASTE!')
        })
    }

}

export default Play;

