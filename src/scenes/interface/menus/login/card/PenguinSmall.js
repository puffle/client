import BaseContainer from '@scenes/base/BaseContainer'

import { Button, NineSlice } from '@components/components'

import PaperDoll from '@scenes/interface/game/playercard/paperdoll/PaperDoll'


/* START OF COMPILED CODE */

class PenguinSmall extends BaseContainer {

    constructor(scene, x, y) {
        super(scene, x, y);

        // bg
        const bg = scene.add.rectangle(0, 0, 688, 288);
        bg.isFilled = true;
        bg.fillColor = 164045;
        this.add(bg);

        // penguin_small
        const penguin_small = scene.add.image(0, 0, "login", "player_small");
        this.add(penguin_small);

        // username
        const username = scene.add.text(90, 0, "", {});
        username.setOrigin(0.5, 0.5);
        username.setStyle({"align":"center","fixedWidth":420,"fontFamily":"Arial","fontSize":"48px","fontStyle":"bold italic","stroke":"#003366","strokeThickness":10,"shadow.color":"#000000ff"});
        this.add(username);

        // paperDoll
        const paperDoll = new PaperDoll(scene, -210, 60);
        paperDoll.visible = false;
        this.add(paperDoll);

        // bg (components)
        const bgNineSlice = new NineSlice(bg);
        bgNineSlice.corner = 50;

        // penguin_small (components)
        const penguin_smallButton = new Button(penguin_small);
        penguin_smallButton.spriteName = "player_small";
        penguin_smallButton.activeFrame = false;

        // paperDoll (prefab fields)
        paperDoll.fadeIn = false;

        this.bg = bg;
        this.username = username;
        this.paperDoll = paperDoll;

        /* START-USER-CTR-CODE */

        this.button = penguin_smallButton

        /* END-USER-CTR-CODE */
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

export default PenguinSmall
