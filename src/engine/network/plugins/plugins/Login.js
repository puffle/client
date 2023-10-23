import Plugin from '../Plugin'


export default class Login extends Plugin {

    constructor(network) {
        super(network)
        this.events = {
            'login': this.login
        }
    }

    get loginScene() {
        return this.scene.getScene('Login')
    }

    login(args) {
        this.interface.hideLoading()

        if (args.penguin !== undefined && args.penguin.token !== undefined) {
            this.network.token = args.penguin.token
        }

        if (this.network.saveUsername) {
            this.savePlayer(args)
        } else {
            this.unsavePlayer(args)
        }

        if (args.success) {
            return this.scene.start('Servers', args)
        }

        if (!this.network.lastLoginScene) {
            return this.scene.start('Login')
        }

        let scene = this.scene.getScene(this.network.lastLoginScene)

        scene.events.once('create', () => this.onLoginError(args.message))
        this.scene.start(this.network.lastLoginScene)
    }

    onLoginError(message) {
        this.loginScene.events.emit('hideinput')

        this.interface.prompt.showError(message, 'Okay', () => {
            this.loginScene.events.emit('showinput')

            this.interface.prompt.error.visible = false
        })
    }

    // Saves a player to local storage
    savePlayer(args) {
        if (!args.success || !args.penguin.token) return
        let savedPenguins = this.network.savedPenguins

        if (Object.keys(savedPenguins).length > 6 && !(args.username in savedPenguins)) return

        args.penguin.username = args.username

        savedPenguins[args.username.toLowerCase()] = args.penguin
        localStorage.setItem('saved_penguins', JSON.stringify(savedPenguins))
    }

    // Deletes a player from local storage
    unsavePlayer(args) {
        if (!args.success) return
        let savedPenguins = this.network.savedPenguins

        if (args.username.toLowerCase() in savedPenguins) {
            delete savedPenguins[args.username.toLowerCase()]
            localStorage.setItem('saved_penguins', JSON.stringify(savedPenguins))
        }
    }

}
