import RoomScene from '../RoomScene'


/* START OF COMPILED CODE */

class Forest extends RoomScene {

    constructor() {
        super("Forest");

        /** @type {Phaser.GameObjects.Image[]} */
        this.sort;

        /* START-USER-CTR-CODE */
        /* END-USER-CTR-CODE */
    }

    preload() {

        this.load.pack("forest-pack", "assets/media/rooms/forest/forest-pack.json");
    }

    _create() {

        // bg
        const bg = this.add.image(-24, -13, "forest", "bg");
        bg.setOrigin(0, 0);

        // rock0001
        const rock0001 = this.add.image(254, 681, "forest", "rock0001");
        rock0001.setOrigin(0.6005747126436781, 0.7300884955752213);

        // tree
        const tree = this.add.image(-16, 272, "forest", "tree");
        tree.setOrigin(0, 0);

        // fg
        const fg = this.add.image(0, 969, "forest", "fg");
        fg.setOrigin(0, 1);

        // middle
        const middle = this.add.image(781, 548, "forest", "middle");
        middle.setOrigin(0.5, 0.608540925266904);

        // stairs
        const stairs = this.add.image(1129, 302, "forest", "stairs");
        stairs.setOrigin(0, 0);

        // rail
        const rail = this.add.image(1441, 831, "forest", "rail");
        rail.setOrigin(0.5, 0.5885714285714285);

        // sign
        const sign = this.add.image(1317, 681, "forest", "sign");
        sign.setOrigin(0.4794520547945205, 0.9397590361445783);

        // lists
        const sort = [sign, rail, middle, fg, tree, rock0001]

        this.sort = sort;
    }

    /* START-USER-CODE */

    get roomTriggers() {
        return [
            {
                body: this.roomPhysics.plaza,
                x: 130,
                y: 330,
                callback : () => { this.triggerRoom(300, 1240, 660) }
            },
            {
                body: this.roomPhysics.shack,
                x: 1330,
                y: 280,
                callback : () => { this.triggerRoom(807, 500, 800) }
            },
            {
                body: this.roomPhysics.cove,
                x: 1320,
                y: 900,
                callback : () => { this.triggerRoom(810, 520, 416) }
            }
        ]
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

export default Forest
