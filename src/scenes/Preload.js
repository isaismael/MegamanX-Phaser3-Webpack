import Phaser from "phaser";

class Preload extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload(){
        this.load.tilemapTiledJSON('map', 'assets/autopista_map.json');
        this.load.image('tiles-1', 'assets/escenario.png')
        // Player
        this.load.image('player', 'assets/player_idle.png')
    }

    create(){
        this.scene.start('PlayScene')
    }
}

export default Preload;