
// You can write more code here

/* START OF COMPILED CODE */

import BasePostcard from "./base/BasePostcard";
import GoToButton from "./buttons/GoToButton";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Postcard20 extends BasePostcard {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0);

        /** @type {Phaser.GameObjects.Text} */
        this.name;
        /** @type {GoToButton} */
        this.goToButton;


        // bg
        const bg = scene.add.image(0, 0, "postcards/sprites/20", "20");
        bg.setOrigin(0, 0);
        this.add(bg);

        // name
        const name = scene.add.text(540, 421, "", {});
        name.text = "penguin88888888";
        name.setStyle({ "align": "center", "color": "#000000", "fixedWidth":372,"fontFamily": "CCFaceFront", "fontSize": "36px" });
        name.setPadding({"left":5,"right":5});
        this.add(name);

        // goToButton
        const goToButton = new GoToButton(scene, 719, 574);
        this.add(goToButton);

        // goToButton (prefab fields)
        goToButton.roomId = 801;

        this.name = name;
        this.goToButton = goToButton;

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
