import Phaser from "phaser";

class Preload extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload(){
        this.load.tilemapTiledJSON('map', 'assets/autopista_map.json');
        this.load.image('tiles-1', 'assets/escenario.png');
        this.load.image('attack-one', 'assets/attack_one.png');
        // SpriteSheet
        // PLAYER
        this.load.spritesheet('player', 'assets/player_spritesheet.png', {
            frameWidth: 35, frameHeight: 46
        })
        // CRUSHER
        this.load.spritesheet('crusher', 'assets/enemies/crusher_spritesheet.png', {
            frameWidth: 45, frameHeight: 36
        })
        // HIT-ENEMY
        this.load.spritesheet('hit-enemy', 'assets/hit-enemy.png', {
            frameWidth: 17, frameHeight: 16
        })

    }

    create(){
        this.scene.start('PlayScene')
    }
}

export default Preload;