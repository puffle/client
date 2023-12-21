
// You can write more code here

/* START OF COMPILED CODE */

import BasePostcard from "./base/BasePostcard";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Postcard108 extends BasePostcard {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0);

        /** @type {Phaser.GameObjects.Text} */
        this.penguin;


        // bg
        const bg = scene.add.image(0, 0, "postcards/sprites/108", "108");
        bg.setOrigin(0, 0);
        this.add(bg);

        // penguin
        const penguin = scene.add.text(98, 46, "", {});
        penguin.text = "undefined";
        penguin.setStyle({ "color": "#000033", "fixedWidth":388,"fontFamily": "CCFaceFront", "fontSize": "34px" });
        penguin.setPadding({"left":5,"right":5});
        this.add(penguin);

        this.penguin = penguin;

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }


    /* START-USER-CODE */

    // Write your code here.

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
