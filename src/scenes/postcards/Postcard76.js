
// You can write more code here

/* START OF COMPILED CODE */

import BasePostcard from "./base/BasePostcard";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Postcard76 extends BasePostcard {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0);

        /** @type {Phaser.GameObjects.Text} */
        this.name;


        // bg
        const bg = scene.add.image(0, 0, "postcards/sprites/76", "76");
        bg.setOrigin(0, 0);
        this.add(bg);

        // name
        const name = scene.add.text(20, 569, "", {});
        name.text = "Penguin8888888";
        name.setStyle({ "align": "right", "color": "#32005d", "fixedWidth":340,"fontFamily": "CCFaceFront", "fontSize": "32px" });
        name.setPadding({"left":5,"right":5});
        this.add(name);

        this.name = name;

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
