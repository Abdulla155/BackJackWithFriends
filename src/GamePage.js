import React from 'react';
//import ReactDOM from 'react-dom';
import './App.css';
import Player from './Components/Players';
import CharacterSelect from './CharacterSelect/CharacterSelectPage';

class GamePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Player: this.props.selectedCharacters,
            selectedCharacters: this.props.selectedCharacters,
            deck: [],
            dealer: null,
            player: null,
            player2: null,
            wallet: 0,
            p2Wallet: 1000,
            p2Bet: 100,
            p2Broke: false,
            inputValue: '',
            currentBet: null,
            gameOver: false,
            message: null
        };
    }

    generateDeck() {
        const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
        const suits = ['♦', '♣', '♥', '♠'];
        const deck = [];
        for (let i = 0; i < cards.length; i++) {
            for (let j = 0; j < suits.length; j++) {
                deck.push({ number: cards[i], suit: suits[j] });
            }
        }
        return deck;
    }

    dealCards(deck) {
        const playerCard1 = this.getRandomCard(deck);
        const dealerCard1 = this.getRandomCard(playerCard1.updatedDeck);
        const player2Card1 = this.getRandomCard(dealerCard1.updatedDeck);
        const playerCard2 = this.getRandomCard(player2Card1.updatedDeck);
        const playerStartingHand = [playerCard1.randomCard, playerCard2.randomCard];
        const dealerStartingHand = [dealerCard1.randomCard, {}];
        const player2StartingHand = [player2Card1.randomCard, {}];

        const player = {
            cards: playerStartingHand,
            count: this.getCount(playerStartingHand)
        };
        const dealer = {
            cards: dealerStartingHand,
            count: this.getCount(dealerStartingHand)
        };
        const player2 = {
            cards: player2StartingHand,
            count: this.getCount(player2StartingHand)
        };

        return { updatedDeck: playerCard2.updatedDeck, player, dealer, player2 };
    }

    startNewGame(type) {
        if (type === 'continue') {
            if (this.state.wallet > 0) {
                const deck = (this.state.deck.length < 10) ? this.generateDeck() : this.state.deck;
                const { updatedDeck, player, dealer, player2 } = this.dealCards(deck);

                this.setState({
                    deck: updatedDeck,
                    dealer,
                    player,
                    player2,
                    currentBet: null,
                    gameOver: false,
                    message: null
                });
            } else {
                this.setState({ message: 'Game over! You are broke! Please start a new game.' });
            }
        } else {
            const deck = this.generateDeck();
            const { updatedDeck, player, dealer, player2 } = this.dealCards(deck);

            this.setState({
                deck: updatedDeck,
                dealer,
                player,
                wallet: 100,
                p2Wallet: 1000,
                player2,
                inputValue: '',
                currentBet: null,
                gameOver: false,
                message: null
            });
        }
    }

    getRandomCard(deck) {
        const updatedDeck = deck;
        const randomIndex = Math.floor(Math.random() * updatedDeck.length);
        const randomCard = updatedDeck[randomIndex];
        updatedDeck.splice(randomIndex, 1);
        return { randomCard, updatedDeck };
    }

    placeBet() {
        const currentBet = this.state.inputValue;

        if (currentBet > this.state.wallet) {
            this.setState({ message: 'Insufficient funds to bet that amount.' });
        } else if (currentBet % 1 !== 0) {
            this.setState({ message: 'Please bet whole numbers only.' });
        } else {
            // Deduct current bet from wallet
            const wallet = this.state.wallet - currentBet;
            this.setState({ wallet, inputValue: '', currentBet });
        }
        if(this.state.p2Wallet == 0) {
            console.log('p2 is broke as a joke');
            this.setState({p2Wallet : 0, p2Broke : true});
        } else {
            const p2Wallet = this.state.p2Wallet - this.state.p2Bet;
            this.setState({p2Wallet});
        }
    }

    hit() {
        if (!this.state.gameOver) {
            if (this.state.currentBet) {
                const { randomCard, updatedDeck } = this.getRandomCard(this.state.deck);
                const player = this.state.player;
                player.cards.push(randomCard);
                player.count = this.getCount(player.cards);

                if (player.count > 21) {
                    this.setState({ player, gameOver: true, message: 'BUST!' });
                } else {
                    this.setState({ deck: updatedDeck, player });
                }
            } else {
                this.setState({ message: 'Please place bet.' });
            }
        } else {
            this.setState({ message: 'Game over! Please start a new game.' });
        }
    }

    dealerDraw(dealer, deck) {
        const { randomCard, updatedDeck } = this.getRandomCard(deck);
        dealer.cards.push(randomCard);
        dealer.count = this.getCount(dealer.cards);
        return { dealer, updatedDeck };
    }

    getCount(cards) {
        const rearranged = [];
        cards.forEach(card => {
            if (card.number === 'A') {
                rearranged.push(card);
            } else if (card.number) {
                rearranged.unshift(card);
            }
        });

        return rearranged.reduce((total, card) => {
            if (card.number === 'J' || card.number === 'Q' || card.number === 'K') {
                return total + 10;
            } else if (card.number === 'A') {
                return (total + 11 <= 21) ? total + 11 : total + 1;
            } else {
                return total + card.number;
            }
        }, 0);
    }

    stand() {
        if (!this.state.gameOver) {
            // Show dealer's 2nd card
            const randomCard = this.getRandomCard(this.state.deck);
            let deck = randomCard.updatedDeck;
            let dealer = this.state.dealer;
            dealer.cards.pop();
            dealer.cards.push(randomCard.randomCard);
            dealer.count = this.getCount(dealer.cards);

            const p2RandomCard = this.getRandomCard(deck);
            let player2 = this.state.player2;
            player2.cards.pop();
            player2.cards.push(p2RandomCard.randomCard);
            player2.count = this.getCount(player2.cards);

            // Keep drawing cards until count is 17 or more
            while (dealer.count < 17) {
                const draw = this.dealerDraw(dealer, deck);
                dealer = draw.dealer;
                deck = draw.updatedDeck;
            }

            while (player2.count < 10) {
                const draw1 = this.dealerDraw(player2, deck);
                player2 = draw1.player2;
                deck = draw1.updatedDeck;
            }
            if (dealer.count > 21) {
                this.setState({
                    deck,
                    dealer,
                    wallet: this.state.wallet + this.state.currentBet * 2,
                    p2Wallet: this.state.p2Wallet + this.state.p2Bet * 2,
                    gameOver: true,
                    message: 'Dealer bust!'
                });
            } else {
                const winner = this.getWinner(dealer, this.state.player, this.state.player2);
                let wallet = this.state.wallet;
                let p2Wallet = this.state.p2Wallet;
                let message;

                if (winner === 'dealer') {
                    message = 'Dealer wins...';
                } else if (winner === 'player') {
                    wallet += this.state.currentBet * 2;
                    message = 'You win!';
                    p2Wallet -= this.state.p2Bet;
                } else if (winner === 'player & player2') {
                    message = 'You and player2 win';
                    wallet += this.state.currentBet * 2;
                    p2Wallet += this.state.p2Bet * 2;
                } else if (winner === 'player2') {
                    message = 'Player 2 wins';
                    p2Wallet += this.state.p2Bet * 2;
                } else {
                    wallet += this.state.currentBet;
                    p2Wallet += this.state.p2Bet;
                    message = 'Push.';
                }

                this.setState({
                    deck,
                    dealer,
                    player2,
                    wallet,
                    p2Wallet,
                    gameOver: true,
                    message
                });
            }
        } else {
            this.setState({ message: 'Game over! Please start a new game.' });
        }
    }

    getWinner(dealer, player, player2) {
        if (dealer.count > player.count && dealer.count > player2.count) {
            return 'dealer';
        } else if (dealer.count < player.count && dealer.count > player2.count) {
            return 'player';
        } else if (dealer.count < player.count && dealer.count == player2.count) {
            return 'player';
        } else if (dealer.count < player.count && dealer.count < player2.count) {
            return 'player & player2';
        } else if (dealer.count > player.count && dealer.count < player2.count) {
            return 'player2';
        } else if (dealer.count == player.count && dealer.count < player2.count) {
            return 'player2';
        } else {
            return 'push';
        }
    }

    inputChange(e) {
        const inputValue = +e.target.value;
        this.setState({ inputValue });
    }

    handleKeyDown(e) {
        const enter = 13;
        console.log(e.keyCode);

        if (e.keyCode === enter) {
            this.placeBet();
        }
    }

    componentWillMount() {
        this.startNewGame();
        const body = document.querySelector('body');
        body.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    render() {

        let dealerCount;
        const card1 = this.state.dealer.cards[0].number;
        const card2 = this.state.dealer.cards[1].number;
        if (card2) {
            dealerCount = this.state.dealer.count;
        } else {
            if (card1 === 'J' || card1 === 'Q' || card1 === 'K') {
                dealerCount = 10;
            } else if (card1 === 'A') {
                dealerCount = 11;
            } else {
                dealerCount = card1;
            }
        }
        let player2Count;
        const p2card1 = this.state.player2.cards[0].number;
        const p2card2 = this.state.player2.cards[1].number;
        if (p2card2) {
            player2Count = this.state.player2.count;
        } else {
            if (p2card1 === 'J' || p2card1 === 'Q' || p2card1 === 'K') {
                player2Count = 10;
            } else if (p2card1 === 'A') {
                player2Count = 11;
            } else {
                player2Count = p2card1;
            }
        }

        return (
            <div>
                <div className="buttons">
                    <button onClick={() => { this.startNewGame() }}>New Game</button>
                    <button onClick={() => { this.hit() }}>Hit</button>
                    <button onClick={() => { this.stand() }}>Stand</button>
                </div>

                <p>Your Wallet: ${this.state.wallet}</p>
                <p>Leo's Wallet: ${this.state.p2Wallet}</p>
                {
                    !this.state.currentBet ?
                        <div className="input-bet">
                            <form>
                                <input type="text" name="bet" placeholder="" value={this.state.inputValue} onChange={this.inputChange.bind(this)} />
                            </form>
                            <button onClick={() => { this.placeBet() }}>Place Bet</button>
                        </div>
                        : null
                }
                {
                    this.state.gameOver ?
                        <div className="buttons">
                            <button onClick={() => { this.startNewGame('continue') }}>Continue</button>
                        </div>
                        : null
                }

                <div style={{overflow: "hidden"}}>
                    <p style={{float: "left",  paddingLeft: "40px"}}>Your Hand ({this.state.player.count})</p>
                    <p style={{float: "right", paddingRight: "35px"}}>{this.state.player2.name}Leo's Hand ({this.state.player2.count})</p>
                </div>
                
                <table style={{float: "left"}} className="cards">
                    <tr>
                        {this.state.player.cards.map((card, i) => {
                            return <Card key={i} number={card.number} suit={card.suit} />
                        })}
                    </tr>
                </table>

                {/* <p>{this.state.selectedCharacters[0].name}'s Hand ({this.state.player2.count})</p> */}
                <table style={{float: "right"}} className="cards">
                    <tr>
                        {/* <img className="enemy" src={this.state.player2.images[0]} /> */}
                        {this.state.player2.cards.map((card, i) => {
                            return <Card key={i} number={card.number} suit={card.suit} />;
                        })}
                    </tr>
                </table>

                <p>Dealer's Hand ({this.state.dealer.count})</p>
                <table className="cards">
                    <tr>
                        {this.state.dealer.cards.map((card, i) => {
                            return <Card key={i} number={card.number} suit={card.suit} />;
                        })}
                    </tr>
                </table>

                <p>{this.state.message}</p>
            </div>
        );
    }
};

const Card = ({ number, suit }) => {
    const combo = (number) ? `${number}${suit}` : null;
    const color = (suit === '♦' || suit === '♥') ? 'card-red' : 'card';

    return (
        <td>
            <div className={color}>
                {combo}
            </div>
        </td>
    );
};

//ReactDOM.render(<App />, document.getElementById('root'));

export default GamePage;
