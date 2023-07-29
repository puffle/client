import Plugin from '../Plugin'


export default class Join extends Plugin {

    constructor(network) {
        super(network)

        this.events = {
            'load_player': this.loadPlayer,
            'join_room': this.joinRoom,
            'join_igloo': this.joinIgloo,
            'add_player': this.addPlayer,
            'remove_player': this.removePlayer
        }
    }

    loadPlayer(args) {

        this.scene.start('WorldController')
        this.world.setClient(args)
    }

    joinRoom(args) {
        if (args.game !== undefined) {
            this.interface.showLoading(this.getString('loading', this.crumbs.games[args.game].key))
        } else {
            this.interface.showLoading(this.getString('loading', this.crumbs.scenes.rooms[args.room].key), true)
        }
        this.world.joinRoom(args)
    }

    joinIgloo(args) {
        this.interface.showLoading(this.getString('loading', 'igloo'), true)
        this.world.joinRoom(args)
    }

    addPlayer(args) {
        this.world.addPenguin(args.user)
    }

    removePlayer(args) {
        this.world.removePenguin(args.user)
    }

}
