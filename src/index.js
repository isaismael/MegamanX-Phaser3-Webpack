
import Phaser from "phaser";

import PlayScene from './scenes/Play'
import PreloadScene from "./scenes/Preload";
//
const MAP_WIDTH = 3200
//
const WIDTH = document.body.offsetWidth;
const HEIGHT = 600;

const SHARED_CONFIG = {
  mapOffset: MAP_WIDTH,
  width: WIDTH,
  height: HEIGHT
}

const Scenes = [PreloadScene, PlayScene];
const createScene = Scene => new Scene(SHARED_CONFIG)
const initScenes = () => Scenes.map(createScene)

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    default:'arcade',
    arcade: {
      //debug: true,
    }
  },
  scene: initScenes()
}

new Phaser.Game(config)