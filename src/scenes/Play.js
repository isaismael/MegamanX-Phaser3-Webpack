import Phaser from "phaser";
import Player from "../entities/Player";
import Enemies from "../groups/Enemies";

import initAnims from '../anims/index'

class Play extends Phaser.Scene {
    constructor(config) {
        super('PlayScene');
        this.config = config;

        
    }

    create() {
        const map = this.createMap();
        const layers = this.createLayers(map);
        const playerZones = this.getPlayerZones(layers.playerZones);
        const player = this.createPlayer(playerZones.start);
        const enemies = this.createEnemies(layers.enemySpawns, layers.platformsColliders);
        //
        this.createEnemyColliders(enemies, {
            colliders: {
                platformsColliders: layers.platformsColliders,
                player
            }
        });
        //
        this.createPlayerColliders(player, {
            colliders: {
                playerColliders: layers.playerColliders,
            }
        });
        //
        this.createEndOfLevel(playerZones.end, player);
        this.setupFollowupCameraOn(player);
        //
        initAnims(this.anims);
    }

    finishDrawing(pointer, layer) {
        this.line.x2 = pointer.worldX;
        this.line.y2 = pointer.worldY;

        this.graphics.clear();
        this.graphics.strokeLineShape(this.line);

        this.tileHits = layer.getTilesWithinShape(this.line);

        if (this.tileHits.length > 0) {
            this.tileHits.forEach(tile => {
                tile.index !== -1 && tile.setCollision(true)
            })
        }

        this.drawDebug(layer);

        this.plotting = false;
    }

    createMap() {
        const map = this.make.tilemap({ key: 'map' });
        map.addTilesetImage('escenario', 'tiles-1');
        return map;
    }

    createLayers(map) {
        const tileset = map.getTileset('escenario');
        const platformsColliders = map.createStaticLayer('platforms_colliders', tileset);
        const playerColliders = map.createStaticLayer('player_colliders',tileset)
        const platforms = map.createStaticLayer('platforms', tileset);
        const playerZones = map.getObjectLayer('player_zones');
        const enemySpawns = map.getObjectLayer('enemy_spawns');
        //
        platformsColliders.setCollisionByProperty({ collides: true })
        playerColliders.setCollisionByProperty({ collides: true })
        //
        return {
            platforms,
            platformsColliders,
            playerZones,
            enemySpawns,
            playerColliders
        }
    }

    createPlayer(start) {
        return new Player(this, start.x, start.y);
    }

    createEnemies(spawnLayer, platformsColliders) {
        const enemies = new Enemies(this);
        const enemyTypes = enemies.getTypes();

        spawnLayer.objects.forEach((spawnPoint, i) => {
            // if (i === 1) { return; }
            const enemy = new enemyTypes[spawnPoint.type](this, spawnPoint.x, spawnPoint.y);
            enemy.setPlatformsColliders(platformsColliders);
            enemies.add(enemy)
        })

        return enemies;
    }

    onPlayerCollision(enemy, player) {
        player.takesHit(enemy);
    }

    onWeaponHit(entity, source) {
        entity.takesHit(source);
    }

    createEnemyColliders(enemies, { colliders }) {
        enemies.addCollider(colliders.platformsColliders);
        enemies.addCollider(colliders.player, this.onPlayerCollision);
        enemies.addCollider(colliders.player.projectiles, this.onWeaponHit);
    }

    createPlayerColliders(player, { colliders }) {
        player
            .addCollider(colliders.playerColliders);
    }
    //
    setupFollowupCameraOn(player) {
        const { width, height, mapOffset } = this.config;
        this.physics.world.setBounds(0, 0, width + mapOffset, height + 200)
        this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(1.2);
        this.cameras.main.startFollow(player)
    }

    getPlayerZones(playerZonesLayer) {
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

