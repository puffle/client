/* START OF COMPILED CODE */

import BaseContainer from "../../../base/BaseContainer";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class CardJitsuCard extends BaseContainer {

    constructor(scene, x, y) {
        super(scene, x ?? 750, y ?? 1000);

        /** @type {Phaser.GameObjects.Image} */
        this.shadow;
        /** @type {Phaser.GameObjects.Image} */
        this.hover;
        /** @type {Phaser.GameObjects.Image} */
        this.back;
        /** @type {Phaser.GameObjects.Sprite} */
        this.glow;
        /** @type {Phaser.GameObjects.Sprite} */
        this.icon;
        /** @type {Phaser.GameObjects.Image} */
        this.color;
        /** @type {Phaser.GameObjects.Image} */
        this.element;
        /** @type {Phaser.GameObjects.Image} */
        this.disabled;
        /** @type {Phaser.GameObjects.Text} */
        this.value;


        // shadow
        const shadow = scene.add.image(99, 111, "cardjitsu", "card/shadow");
        shadow.setOrigin(0.5010660980810234, 0.500945179584121);
        this.add(shadow);

        // hover
        const hover = scene.add.image(97, 108, "cardjitsu", "card/hover");
        hover.visible = false;
        this.add(hover);

        // back
        const back = scene.add.image(95, 107, "cardjitsu", "card/back");
        back.setOrigin(0.5010660980810234, 0.500945179584121);
        back.visible = false;
        this.add(back);

        // glow
        const glow = scene.add.sprite(95, 104, "cardjitsu", "card/glow0001");
        glow.setOrigin(0.5008695652173913, 0.5);
        glow.alpha = 0.5;
        glow.alphaTopLeft = 0.5;
        glow.alphaTopRight = 0.5;
        glow.alphaBottomLeft = 0.5;
        glow.alphaBottomRight = 0.5;
        this.add(glow);

        // icon
        const icon = scene.add.sprite(95, 107, "_MISSING");
        icon.visible = false;
        this.add(icon);

        // color
        const color = scene.add.image(95, 107, "cardjitsu", "card/color");
        color.setOrigin(0.5010660980810234, 0.500945179584121);
        this.add(color);

        // element
        const element = scene.add.image(28, 28, "cardjitsu", "card/f");
        element.setOrigin(0.5, 0.5051546391752577);
        this.add(element);

        // disabled
        const disabled = scene.add.image(95, 107, "cardjitsu", "card/disabled");
        disabled.setOrigin(0.5010660980810234, 0.500945179584121);
        disabled.visible = false;
        this.add(disabled);

        // value
        const value = scene.add.text(1, 48, "", {});
        value.text = "88";
        value.setStyle({ "align": "center", "color": "#000", "fixedWidth":52,"fontFamily": "Arial", "fontSize": "38px", "fontStyle": "bold" });
        this.add(value);

        this.shadow = shadow;
        this.hover = hover;
        this.back = back;
        this.glow = glow;
        this.icon = icon;
        this.color = color;
        this.element = element;
        this.disabled = disabled;
        this.value = value;

        /* START-USER-CTR-CODE */

        this.player
        this.state
        this.spacer

        this.color
        this.glow

        this.posDealts = [{ x: 100, y: 770 }, { x: 1420, y: 770 }]

        this.dealtFrontSpacer = 150
        this.dealtBackSpacer = 70

        this.scaleFront = 0.7
        this.scaleBack = 0.375
        this.scalePick = 1

        this.colors = {
            r: {
                color: 0xE23C26
            },
            g: {
                color: 0x61B946
            },
            b: {
                color: 0x1148A1
            },
            p: {
                color: 0xA399CA
            },
            o: {
                color: 0xF7952B
            },
            y: {
                color: 0xFBEB2D
            }
        }

        this.glow.anims.play('card/glow')

        this.on('pointerup', this.onUp, this)
        this.on('pointerover', this.onOver, this)
        this.on('pointerout', this.onOut, this)

        /* END-USER-CTR-CODE */
    }


    /* START-USER-CODE */

    init(player, state, card = null) {
        if (!player.dealtCards.includes(null)) {
            return
        }

        this.player = player
        this.state = state

        let empty = player.dealtCards.indexOf(null)
        player.dealtCards[empty] = this

        this.updateState()

        if (card) {
            this.updateCard(card)
        }

        this.tweenToDealt(empty)
    }

    updateCard(card) {
        this.value.text = card.value
        this.color.tint = this.colors[card.color].color
        this.element.setFrame(`card/${card.element}`)

        if (card.power_id > 0) {
            //this.glow.visible = true
        }
    }

    updateState() {
        if (this.state === 'back') {
            this.setStateBack()
        } else {
            this.setStateFront()
        }
    }

    setStateFront() {
        this.scale = this.scaleFront
        this.spacer = this.dealtFrontSpacer

        this.showFrontSprites(true)
    }

    setStateBack() {
        this.scale = this.scaleBack
        this.spacer = this.dealtBackSpacer

        this.showFrontSprites(false)
    }

    showFrontSprites(show) {
        this.back.visible = !show
        this.value.visible = show
        this.element.visible = show
        this.color.visible = show
        this.icon.visible = show

        this.glow.visible = false
    }

    tweenToDealt(empty) {
        let index = this.scene.players.indexOf(this.player)

        let pos = this.posDealts[index]

        let x = (index === 0)
            ? pos.x + (this.spacer * empty)
            : pos.x - (this.spacer * empty) - this.spacer

        this.scene.tweens.add({
            targets: this,
            x: x,
            y: pos.y,
            duration: 500
        })
    }

    enableInput() {
        this.setSize(this.color.width, this.color.height)
        this.setInteractive()

        // Offset
        this.input.hitArea.x = this.color.x
        this.input.hitArea.y = this.color.y
    }

    disableInput() {

    }

    onUp() {

    }

    onOver() {
        this.hover.visible = true
    }

    onOut() {
        this.hover.visible = false
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */