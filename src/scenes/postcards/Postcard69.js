
// You can write more code here

/* START OF COMPILED CODE */

import BasePostcard from "./base/BasePostcard";
import GoToButton from "./buttons/GoToButton";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Postcard69 extends BasePostcard {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0);

        /** @type {Phaser.GameObjects.Text} */
        this.name;


        // bg
        const bg = scene.add.image(0, 0, "postcards/sprites/69", "69");
        bg.setOrigin(0, 0);
        this.add(bg);

        // goToButton
        const goToButton = new GoToButton(scene, 857, 633);
        this.add(goToButton);

        // name
        const name = scene.add.text(27, 50, "", {});
        name.text = "TEST NAME123";
        name.setStyle({ "align": "right", "color": "#ffffff", "fixedWidth":280,"fontFamily": "CCFaceFront", "fontSize": "32px" });
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
