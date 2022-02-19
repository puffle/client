import BaseScene from '@scenes/base/BaseScene'


export default class RuffleController extends BaseScene {

    constructor(key) {
        super(key)

        this.player
        this.container

        this.basePath = 'assets/media/flash/'
        this.path

        window.ruffle = this
    }

    create() {
		window.RufflePlayer = window.RufflePlayer || {}

        this.playerStyle = {
            width: '100%',
            height: '100%',
            pointerEvents: 'auto'
        }

        this.container = this.add.dom(760, 480)
        this.container.visible = false

        this.sound.pauseOnBlur = false
    }

    bootGame(game) {
        this.path = `games/${game.key}/bootstrap.swf`
        this.music = game.music || 0

        this.boot()
    }

    boot() {
        let ruffle = window.RufflePlayer.newest()
        this.player = ruffle.createPlayer()

        this.container.setElement(this.player, this.playerStyle)

        this.player.load({
            url: `${this.basePath}boot.swf`,
            allowScriptAccess: true,
            menu: false,
            contextMenu: false,
            scale: 'noborder',

            logLevel: (localStorage.logging == 'true')
                ? 'trace'
                : 'error'

        }).then(() => {
            this.interface.hideLoading()
            this.interface.hideInterface()

            this.container.visible = true
        })
    }

    close() {
        this.game.domContainer.style.zIndex = 'auto'

        setTimeout(() => {
            this.player.remove()
        }, 100)

        this.container.visible = false
        this.stopMusic()

        this.world.client.sendJoinLastRoom()
    }

    getPath() {
        return `${this.basePath}${this.path}`
    }

    getMyPlayer() {
        // todo
    }

    getPlayerObjectById() {
        // todo
    }

    getMyPlayerHex() {
        return this.world.getColor(this.world.client.penguin.color)
    }

    isMyPlayerMember() {
        return true
    }

    isItemOnMyPlayer() {
        // todo
    }

    sendGameOver() {
        this.game.domContainer.style.zIndex = -10

        this.interface.prompt.showCoin()
    }

    startGameMusic() {
        if (!this.music) {
            return
        }

        let music = this.music

        if (this.cache.audio.exists(music)) {
            return this.addMusic()
        }

        this.load.audio(music, `assets/media/music/${music}.mp3`)
        this.load.start()

        this.load.once(`filecomplete-audio-${music}`, () => {
            this.addMusic()
        })
    }

    addMusic() {
        if (!this.world.muteMusic && this.cache.audio.exists(this.music)) {
            this.sound.play(this.music, { loop: true })
        }
    }

    stopMusic() {
        this.sound.stopByKey(this.music)
    }

}