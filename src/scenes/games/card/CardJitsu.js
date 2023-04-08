/* START OF COMPILED CODE */

import GameScene from "../GameScene";
import CardJitsuPlayer from "./CardJitsuPlayer";
import Button from "../../components/Button";
import CardJitsuClock from "./clock/CardJitsuClock";
/* START-USER-IMPORTS */

import BattleLoader from '@engine/loaders/BattleLoader'
import CardLoader from '@engine/loaders/CardLoader'
import CardJitsuCard from './card/CardJitsuCard'

/* END-USER-IMPORTS */

export default class CardJitsu extends GameScene {

    constructor() {
        super("CardJitsu");

        /** @type {CardJitsuPlayer} */
        this.player2;
        /** @type {CardJitsuPlayer} */
        this.player1;
        /** @type {CardJitsuClock} */
        this.clock;
        /** @type {Phaser.GameObjects.Image} */
        this.spinner;
        /** @type {Phaser.GameObjects.Text} */
        this.username2;
        /** @type {Phaser.GameObjects.Text} */
        this.username1;
        /** @type {CardJitsuPlayer[]} */
        this.players;
        /** @type {Phaser.GameObjects.Text[]} */
        this.usernames;


        /* START-USER-CTR-CODE */
        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    _preload() {

        this.load.pack("cardjitsu-pack", "assets/media/games/card/cardjitsu-pack.json");
    }

    /** @returns {void} */
    _create() {

        // bg
        this.add.image(760, 480, "cardjitsu", "bg");

        // player2
        const player2 = new CardJitsuPlayer(this, 760, 315);
        this.add.existing(player2);

        // player1
        const player1 = new CardJitsuPlayer(this, 760, 315);
        this.add.existing(player1);
        player1.scaleX = -1;
        player1.scaleY = 1;

        // close
        const close = this.add.image(1464, 57, "cardjitsu", "close");

        // help
        const help = this.add.image(754, 26, "cardjitsu", "help");
        help.setOrigin(0.5005370569280344, 0.5004436557231589);

        // panel
        const panel = this.add.image(760, 854, "cardjitsu", "panel");
        panel.setOrigin(0.500351370344343, 0.5);

        // frame
        const frame = this.add.image(758, 480, "cardjitsu", "frame");
        frame.setOrigin(0.5003261578604045, 0.5005192107995846);

        // clock
        const clock = new CardJitsuClock(this, 760, 676);
        this.add.existing(clock);
        clock.visible = false;

        // spinner
        const spinner = this.add.image(760, 482, "cardjitsu", "spinner");

        // username2
        const username2 = this.add.text(1420, 736, "", {});
        username2.setOrigin(1, 0);
        username2.setStyle({ "align": "right", "color": "#000", "fixedWidth":410,"fontFamily": "CCComiccrazy", "fontSize": "28px", "fontStyle": "bold" });

        // username1
        const username1 = this.add.text(100, 736, "", {});
        username1.setStyle({ "color": "#000", "fixedWidth":410,"fontFamily": "CCComiccrazy", "fontSize": "28px", "fontStyle": "bold" });

        // lists
        const players = [player1, player2];
        const usernames = [username1, username2];

        // close (components)
        const closeButton = new Button(close);
        closeButton.spriteName = "close";

        this.player2 = player2;
        this.player1 = player1;
        this.clock = clock;
        this.spinner = spinner;
        this.username2 = username2;
        this.username1 = username1;
        this.players = players;
        this.usernames = usernames;

        this.events.emit("scene-awake");
    }


    /* START-USER-CODE */

    create() {
        super.create()

        this.myPlayer
        this.opponent

        // Loader
        this.battleLoader = new BattleLoader(this)
        this.cardLoader = new CardLoader(this)

        this.onDealCardLoad = this.onDealCardLoad.bind(this)
        this.onRevealCardLoad = this.onRevealCardLoad.bind(this)

        // Spinner
        this.tweens.add({
            targets: this.spinner,
            angle: { from: 0, to: 180 },
            duration: 900,
            repeat: -1,
            ease: 'Cubic'
        })

        this.events.on('battle_complete', this.onBattleComplete, this)

        this.addListeners()
        this.network.send('start_game')
    }

    addListeners() {
        this.network.events.on('start_game', this.handleStartGame, this)
        this.network.events.on('send_deal', this.handleSendDeal, this)
        this.network.events.on('send_opponent_deal', this.handleSendOpponentDeal, this)
        this.network.events.on('pick_card', this.handlePickCard, this)
        this.network.events.on('reveal_card', this.handleRevealCard, this)
        this.network.events.on('judge', this.handleJudge, this)
        this.network.events.on('winner', this.handleWinner, this)
    }

    removeListeners() {
        this.network.events.off('start_game', this.handleStartGame, this)
        this.network.events.off('send_deal', this.handleSendDeal, this)
        this.network.events.off('send_opponent_deal', this.handleSendOpponentDeal, this)
        this.network.events.off('pick_card', this.handlePickCard, this)
        this.network.events.off('reveal_card', this.handleRevealCard, this)
        this.network.events.off('judge', this.handleJudge, this)
        this.network.events.off('winner', this.handleWinner, this)
    }

    handleStartGame(args) {
        for (let user of args.users) {
            this.setPlayer(user, args.users.indexOf(user))
        }

        this.spinner.visible = false
        this.playBattle('walk')
    }

    handleSendDeal(args) {
        for (let card of args.cards) {
            this.cardLoader.loadCard(card, this.onDealCardLoad)
        }
    }

    handleSendOpponentDeal(args) {
        for (let i = 0; i < args.deal; i++) {
            let cardPrefab = this.createCard()

            cardPrefab.init(this.opponent, 'back')
        }
    }

    handlePickCard(args) {
        if (this.opponent.pick) {
            this.events.once('remove_pick', () => this.handlePickCard(args))
            return
        }

        let card = this.opponent.dealtCards[args.card]
        this.opponent.pickCard(card)
    }

    handleRevealCard(args) {
        this.cardLoader.loadCard(args.card, this.onRevealCardLoad)
    }

    handleJudge(args) {
        let cardPrefab = this.opponent.pick

        cardPrefab.setState('reveal')

        this.events.once('flipped', () => this.onFlipped(args.winner))
    }

    handleWinner(args) {
        // Remove original handler
        this.events.off('battle_complete', this.onBattleComplete, this)

        this.events.once('battle_complete', () => this.onLastBattle(args.winner, args.cards))
    }

    setPlayer(user, index) {
        let player = this.players[index]
        player.set(user)

        if (this.world.isClientUsername(user.username)) {
            this.myPlayer = player
        } else {
            this.opponent = player
        }
    }

    checkBattleComplete() {
        if (!this.player1.animating && !this.player2.animating) {
            this.events.emit('battle_complete')
        }
    }

    onBattleComplete() {
        this.playBattle('ambient')

        this.network.send('send_deal')
    }

    onFlipped(winner) {
        if (winner == -1) {
            this.judgeTie()
            return
        }

        let winCard = this.players[winner].pick

        this.battleLoader.loadBattle(winCard, () => {
            this.judge(winner, winCard)
        })
    }

    onDealCardLoad(key, card) {
        let cardPrefab = this.createCard()

        cardPrefab.init(this.myPlayer, 'front', card)
        cardPrefab.icon.setTexture(key)
    }

    onRevealCardLoad(key, card) {
        let cardPrefab = this.opponent.pick

        cardPrefab.updateCard(card)
        cardPrefab.icon.setTexture(key)
    }

    onLastBattle(winSeat, winCards) {
        this.playBattle('ambient')

        let winner = this.players[winSeat]

        // temp until made int on server
        winCards = winCards.map(i => parseInt(i))

        let cards = winner.findWins(winCards)

        for (let i = 0; i < cards.length; i++) {
            cards[i].tweenToOver(i)
        }

        this.time.delayedCall(1000, () => this.playBattle('tie'))

        // this.events.once('battle_complete', )
    }

    playBattle(battle, winSeat = null) {
        if (winSeat == null) {
            this.player1.playBattle(battle)
            this.player2.playBattle(battle)

            return
        }

        if (winSeat == this.myPlayer.seat) {
            this.myPlayer.playBattle(`${battle}_attack`)
            this.opponent.playBattle(`${battle}_react`)
        } else {
            this.myPlayer.playBattle(`${battle}_react`)
            this.opponent.playBattle(`${battle}_attack`)
        }
    }

    createCard() {
        let card = new CardJitsuCard(this)
        this.add.existing(card)

        return card
    }

    allCardsDealt() {
        this.myPlayer.enableCards()

        this.clock.start()
    }

    timeUp() {
        let random = Phaser.Math.RND.pick(this.myPlayer.dealtCards)

        this.pickCard(random)
    }

    pickCard(card) {
        this.myPlayer.pickCard(card)
        this.network.send('pick_card', { card: card.id })

        this.clock.stop()
    }

    judge(winner, winCard) {
        if (winner == this.myPlayer.seat) {
            this.judgeWin(winner, winCard)
        } else {
            this.judgeLoss(winner, winCard)
        }
    }

    judgeTie() {
        this.myPlayer.cardLose()
        this.opponent.cardLose()

        this.playBattle('tie')
    }

    judgeWin(winSeat, winCard) {
        this.myPlayer.cardWin()
        this.opponent.cardLose()

        this.judgePlayBattle(winSeat, winCard)
    }

    judgeLoss(winSeat, winCard) {
        this.myPlayer.cardLose()
        this.opponent.cardWin()

        this.judgePlayBattle(winSeat, winCard)
    }

    judgePlayBattle(winSeat, winCard) {
        if (winCard.powerId == 0) {
            this.playBattle(winCard.elementId, winSeat)
            return
        }

        if (winCard.powerId != 0) {
            this.playBattle(`pow_${winCard.id}`, winSeat)
            return
        }
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
