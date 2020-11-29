import BaseScene from '@scenes/base/BaseScene'


export default class InterfaceController extends BaseScene {

    get main() {
        return this.scene.get('Main')
    }

    showInterface() {
        this.scene.launch('Main')
        this.scene.bringToTop('Main')
        this.scene.bringToTop()
    }

    showEmoteBalloon(id, emote) {
        this.main.balloonFactory.showEmoteBalloon(id, emote)
    }

    showTextBalloon(id, text) {
        this.main.balloonFactory.showTextBalloon(id, text)
    }

    showCard(penguin) {
        this.main.playerCard.showCard(penguin)
    }

}
