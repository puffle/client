import EventComponent from './EventComponent'


/* START OF COMPILED CODE */

class SimpleButton extends EventComponent {

    constructor(gameObject) {
        super(gameObject);

        gameObject["__SimpleButton"] = this;

        /** @type {Phaser.GameObjects.Sprite} */
        this.gameObject = gameObject;
        /** @type {any} */
        this.hoverCallback = null;
        /** @type {any} */
        this.hoverOutCallback = null;
        /** @type {any} */
        this.callback = () => {};
        /** @type {boolean} */
        this.pixelPerfect = false;

        /* START-USER-CTR-CODE */

        gameObject.isButton = true

        /* END-USER-CTR-CODE */
    }

    /** @returns {SimpleButton} */
    static getComponent(gameObject) {
        return gameObject["__SimpleButton"];
    }

    /* START-USER-CODE */

    start() {
        this.gameObject.setInteractive({
            cursor: 'pointer',
            pixelPerfect: this.pixelPerfect
        })

        this.gameObject.on('pointerover', () => this.onOver())
        this.gameObject.on('pointerout', () => this.onOut())
        this.gameObject.on('pointerup', (pointer) => this.onUp(pointer))
    }

    onOver() {
        if (this.hoverCallback) this.hoverCallback()
    }

    onOut() {
        if (this.hoverOutCallback) this.hoverOutCallback()
    }

    onUp(pointer) {
        if (pointer.button != 0) {
            return
        }

        this.callback()
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

export default SimpleButton
