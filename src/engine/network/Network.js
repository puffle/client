import DataHandler from './DataHandler'

import io from 'socket.io-client'

import axios from 'axios'


export default class Network {

    constructor(game) {
        this.game = game

        this.events = new Phaser.Events.EventEmitter()

        this.handler = new DataHandler(this)
        this.client = null

        this.saveUsername = false
        this.savePassword = false
        this.token = null

        // Used to switch back to correct login scene on an error
        this.lastLoginScene = null

        this.worldName
    }

    connectLogin(saveUsername, savePassword, auth) {
        this.saveUsername = saveUsername
        this.savePassword = savePassword

        // Only create token if save password is checked and space is available
        auth.createToken = auth.createToken && this.savePassword && auth.method === 'password' && Object.keys(this.savedPenguins).length <= 6

        // TODO: add error handling for ajv invalid schema
        axios.post('/login', auth)
            .then((response) => this.onMessage({ action: 'login', args: response.data}))
    }

    connectGame(world, username, key) {
        let response = { username: username, key: key }

        this.connect(world, response, () => {
            this.worldName = world
        }, () => {
            this.onConnectionLost()
        })
    }

    connect(world, auth, onConnect, onDisconnect) {
        this.disconnect()

        let config = this.game.crumbs.worlds[world]

        this.client = io.connect(config.host, { path: config.path, auth })

        this.client.once('connect', onConnect)
        this.client.once('disconnect', onDisconnect)
        this.client.on('connect_error', () => this.onConnectionLost())
        this.client.on('message', (message) => this.onMessage(message))
    }

    disconnect() {
        if (this.client) {
            this.client.disconnect()
        }
    }

    send(action, args = {}) {
        if (localStorage.logging == 'true') {
            console.log('Message sending:', action, args)
        }

        this.client.emit('message', { action: action, args: args })
    }

    // Handlers

    onMessage(message) {
        this.handler.handle(message)
    }

    onConnectionLost() {
        this.disconnect()

        let prompt = this.game.scene.getScene('InterfaceController').prompt
        prompt.showError('Connection was lost.\nPlease click to learn more', 'Learn More', () => { })
    }

    // Saved penguins

    get isSavedPenguins() {
        if (localStorage.getItem('saved_penguins')) {
            return true
        } else {
            return false
        }
    }

    get savedPenguins() {
        let savedPenguins = localStorage.getItem('saved_penguins')

        if (!savedPenguins) {
            return {}
        }

        try {
            return JSON.parse(savedPenguins)
        } catch (error) {
            return {}
        }
    }

    getToken(username) {
        let save = this.savedPenguins[username.toLowerCase()]

        if (save && save.token) {
            return save.token
        } else {
            return null
        }
    }

}
