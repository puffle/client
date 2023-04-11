/* START OF COMPILED CODE */

import BaseContainer from "../../base/BaseContainer";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class SenseiBelt extends BaseContainer {

    constructor(scene, x, y) {
        super(scene, x ?? 760, y ?? 480);

        /** @type {Phaser.GameObjects.Image} */
        this.color;


        // belt
        const belt = scene.add.image(0, 0, "sensei", "belt/belt");
        belt.setOrigin(0.5009784735812133, 0.5);
        this.add(belt);

        // color
        const color = scene.add.image(4, -1, "sensei", "belt/color");
        color.setOrigin(0.503448275862069, 0.5);
        this.add(color);

        // shadow
        const shadow = scene.add.image(1, 6, "sensei", "belt/shadow");
        shadow.setOrigin(0.5, 0.5014492753623189);
        this.add(shadow);

        this.color = color;

        /* START-USER-CTR-CODE */
        /* END-USER-CTR-CODE */
    }


    /* START-USER-CODE */

    show() {
        super.show()

        // Fade
        scene.tweens.add({
            targets: this,
            alpha: { from: 0, to: 1 },
            duration: 1450
        })

        // Float
        scene.tweens.add({
            targets: this,
            y: this.y + 10,
            duration: 333,
            repeat: -1,
            yoyo: true,
            ease: Phaser.Math.Easing.Quadratic.InOut
        })
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
