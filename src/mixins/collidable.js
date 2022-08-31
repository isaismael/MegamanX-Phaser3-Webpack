import Phaser from "phaser";

export default {
    addCollider(otherGameobject, callback) {
        this.scene.physics.add.collider(this, otherGameobject, callback, null, this);
        return this;
    },

    bodyPositionDifferenceX: 0,
    prevRay: null,
    prevHashit: null,

    raycast(body, layer, raylength = 40, precision = 0) {
        const { x, y, width, halfHeight } = body;

        this.bodyPositionDifferenceX += body.x - body.prev.x;

        if ((Math.abs(this.bodyPositionDifferenceX) <= precision) && this.prevHashit !== null) {
            return {
                ray: this.prevRay,
                hasHit: this.prevHashit
            }
        }

        const line = new Phaser.Geom.Line();
        let hasHit = false;

        switch (body.facing) {
            case Phaser.Physics.Arcade.FACING_RIGHT: {
                line.x1 = x + width;
                line.y1 = y + halfHeight;
                line.x2 = line.x1 + raylength;
                line.y2 = line.y1 + raylength;
                break;
            }
            case Phaser.Physics.Arcade.FACING_LEFT: {
                line.x1 = x;
                line.y1 = y + halfHeight;
                line.x2 = line.x1 - raylength;
                line.y2 = line.y1 + raylength;
                break;
            }
        }

        const hits = layer.getTilesWithinShape(line);

        if (hits.length > 0) {
            hasHit = this.prevHashit = hits.some(hit => hit.index !== -1);
        }

        this.prevRay = line;
        this.bodyPositionDifferenceX = 0;

        return { ray: line, hasHit };
    }
}