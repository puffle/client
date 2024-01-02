/* START OF COMPILED CODE */

import BasePostcard from "./base/BasePostcard";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Postcard103 extends BasePostcard {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0);

        /** @type {Phaser.GameObjects.Text} */
        this.puffle;


        // bg
        const bg = scene.add.image(0, 0, "postcards/sprites/103", "103");
        bg.setOrigin(0, 0);
        this.add(bg);

        // puffle
        const puffle = scene.add.text(85, 601, "", {});
        puffle.text = "undefined";
        puffle.setStyle({ "align": "right", "color": "#000000", "fixedWidth":504,"fontFamily": "CCFaceFront", "fontSize": "26px" });
        puffle.setPadding({"left":5,"right":5});
        this.add(puffle);

        this.puffle = puffle;

        /* START-USER-CTR-CODE */
        /* END-USER-CTR-CODE */
    }


    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
