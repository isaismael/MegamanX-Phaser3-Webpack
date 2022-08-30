
import Enemy from "./Enemy";
import initAnims from '../entities/anims/crusherAnims'

class Crusher extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'crusher');
        initAnims(scene.anims);
    }

    update(time, delta) {
        super.update(time, delta);
        this.play('crusher-idle', true)
    }
}

export default Crusher;