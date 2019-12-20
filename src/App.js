import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import './App.css';
import './Components/Players.js';

import CharacterSelectPage from "./CharacterSelect/CharacterSelectPage";
import GamePage from "./GamePage";
import TitlePage from "./TitlePage";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: [
                {
                    name: "Danny Devito", wallet: 100, bet: 25, images:
                        [require("./Images/Celebrity Pack/DannyDevitoDefeat.jpg"), // 0 Lost
                        require("./Images/Celebrity Pack/DannyDevitoLosing.jpg"), // 1
                        require("./Images/Celebrity Pack/DannyDevitoNeutral.jpg"), // 2 Nuetral
                        require("./Images/Celebrity Pack/DannyDevitoHappy.jpg"), // 3
                        require("./Images/Celebrity Pack/DannyDevitoVictory.jpg")]  // 4 win
                },
                {
                    name: "B. Cooper", wallet: 100, bet: 25, images:
                        [require("./Images/Celebrity Pack/BradleyCooperDefeat.jpg"), // 0 Lost
                        require("./Images/Celebrity Pack/BradleyCooperUpset.jpg"), // 1
                        require("./Images/Celebrity Pack/BradleyCooperNeutral.jpg"), // 2 Nuetral
                        require("./Images/Celebrity Pack/BradleyCooperHappy.jpg"), // 3
                        require("./Images/Celebrity Pack/BradleyCooperVictory.jpg")]  // 4 win
                },
                {
                    name: "Leonardo DiCaprio", wallet: 100, bet: 25, images:
                        [require("./Images/Celebrity Pack/LeoDefeat.png"), // 0 Lost
                        require("./Images/Celebrity Pack/LeoUpset.jpg"), // 1
                        require("./Images/Celebrity Pack/LeoNeutral.png"), // 2 Nuetral
                        require("./Images/Celebrity Pack/LeoHappy.jpg"), // 3
                        require("./Images/Celebrity Pack/LeoVictory.jpg")]  // 4 win
                },
                {
                    name: "The Rock", wallet: 100, bet: 25, images:
                        [require("./Images/Celebrity Pack/TheRockDefeat.jpg"), // 0 Lost
                        require("./Images/Celebrity Pack/TheRockUpset.jpg"), // 1
                        require("./Images/Celebrity Pack/TheRockNeutral.jpg"), // 2 Nuetral
                        require("./Images/Celebrity Pack/TheRockHappy.jpg"), // 3
                        require("./Images/Celebrity Pack/TheRockVictory.jpg")]  // 4 win
                },
                {
                    name: "Will Smith", wallet: 100, bet: 25, images:
                        [require("./Images/Celebrity Pack/WillSmithDefeat.jpg"), // 0 Lost
                        require("./Images/Celebrity Pack/WillSmithUpset.png"), // 1
                        require("./Images/Celebrity Pack/WillSmithNeutral.jpg"), // 2 Nuetral
                        require("./Images/Celebrity Pack/WillSmithHappy.jpg"), // 3
                        require("./Images/Celebrity Pack/WillSmithVictory.jpg")]  // 4 win
                },
                {
                    name: "Bashar al-Assad", wallet: 100, bet: 25, images:
                        [require("./Images/Dictator Pack/AssadDefeat.jpg"), // 0 Lost
                        require("./Images/Dictator Pack/AssadLosing.jpg"), // 1
                        require("./Images/Dictator Pack/AssadNeutral.jpg"), // 2 Nuetral
                        require("./Images/Dictator Pack/AssadHappy.jpg"), // 3
                        require("./Images/Dictator Pack/AssadVictory.jpg")]  // 4 win
                },
                {
                    name: "Recep Tayyip Erdogan", wallet: 100, bet: 25, images:
                        [require("./Images/Dictator Pack/ErdoganDefeat.png"), // 0 Lost
                        require("./Images/Dictator Pack/ErdoganUpset.jpg"), // 1
                        require("./Images/Dictator Pack/ErdoganNeutral.jpg"), // 2 Nuetral
                        require("./Images/Dictator Pack/ErdoganHappy.jpg"), // 3
                        require("./Images/Dictator Pack/ErdoganVictory.jpg")]  // 4 win
                },
                {
                    name: "Kim Jong Un", wallet: 100, bet: 25, images:
                        [require("./Images/Dictator Pack/KimJongDefeat.png"), // 0 Lost
                        require("./Images/Dictator Pack/KimJongUpset.png"), // 1
                        require("./Images/Dictator Pack/KimJongNeutral.png"), // 2 Nuetral
                        require("./Images/Dictator Pack/KimJongHappy.png"), // 3
                        require("./Images/Dictator Pack/KimJongVictory.png")]  // 4 win
                },
                {
                    name: "Putin", wallet: 100, bet: 25, images:
                        [require("./Images/Dictator Pack/PutinDefeat.png"), // 0 Lost
                        require("./Images/Dictator Pack/PutinUpset.png"), // 1
                        require("./Images/Dictator Pack/PutinNeutral.png"), // 2 Nuetral
                        require("./Images/Dictator Pack/PutinHappy.png"), // 3
                        require("./Images/Dictator Pack/PutinVictory.png")]  // 4 win
                },
                {
                    name: "Xi Jinping", wallet: 100, bet: 25, images:
                        [require("./Images/Dictator Pack/XiDefeat.png"), // 0 Lost
                        require("./Images/Dictator Pack/XiUpset.png"), // 1
                        require("./Images/Dictator Pack/XiNeutral.png"), // 2 Nuetral
                        require("./Images/Dictator Pack/XiHappy.png"), // 3
                        require("./Images/Dictator Pack/XiVictory.gif")]  // 4 win
                },
                {
                    name: "Bernie Sanders", wallet: 100, bet: 25, images:
                        [require("./Images/Politics Pack/BernieSandersDefeat.png"), // 0 Lost
                        require("./Images/Politics Pack/BernieSandersLosing.jpg"), // 1
                        require("./Images/Politics Pack/BernieSandersNeutral.jpg"), // 2 Nuetral
                        require("./Images/Politics Pack/BernieSandersHappy.jpg"), // 3
                        require("./Images/Politics Pack/BernieSandersVictory.png")]  // 4 win
                },
                {
                    name: "Hillary Clinton", wallet: 100, bet: 25, images:
                        [require("./Images/Politics Pack/HillaryClintonDefeat.jfif"), // 0 Lost
                        require("./Images/Politics Pack/HillaryClintonLosing.jpg"), // 1
                        require("./Images/Politics Pack/HillaryClintonNeutral.jpg"), // 2 Nuetral
                        require("./Images/Politics Pack/HillaryClintonHappy.jpeg"), // 3
                        require("./Images/Politics Pack/HillaryClintonVictory.jpg")]  // 4 win
                },
                {
                    name: "Mitch McConnell", wallet: 100, bet: 25, images:
                        [require("./Images/Politics Pack/McconnellDefeat.jpg"), // 0 Lost
                        require("./Images/Politics Pack/McconnellLosing.jpg"), // 1
                        require("./Images/Politics Pack/McconnellNeutral.jpg"), // 2 Nuetral
                        require("./Images/Politics Pack/McconnellHappy.jpg"), // 3
                        require("./Images/Politics Pack/McconnellVictory.jpeg")]  // 4 win
                },
                {
                    name: "Barrack Obama", wallet: 100, bet: 25, images:
                        [require("./Images/Politics Pack/ObamaDefeat.jfif"), // 0 Lost
                        require("./Images/Politics Pack/ObamaLosing.jpg"), // 1
                        require("./Images/Politics Pack/ObamaNeutral.jpg"), // 2 Nuetral
                        require("./Images/Politics Pack/ObamaHappy.jpg"), // 3
                        require("./Images/Politics Pack/ObamaVictory.jpg")]  // 4 win
                },
                {
                    name: "Donald Trump", wallet: 100, bet: 25, images:
                        [require("./Images/Politics Pack/TrumpDefeat.png"), // 0 Lost
                        require("./Images/Politics Pack/TrumpLosing.png"), // 1
                        require("./Images/Politics Pack/TrumpNeutral.png"), // 2 Nuetral
                        require("./Images/Politics Pack/TrumpHappy.png"), // 3
                        require("./Images/Politics Pack/TrumpVictory.png")]  // 4 win
                },
            ],
            selectedCharacters: []
        };

    }

    // Saves data from character select page into selectedCharactersNames[];
    characterSelectPageHandler(selectedCharacters) {
        this.setState({ selectedCharacters: (selectedCharacters) })
    }

    render() {
        return (
            <div className="App">

                <header className="masterhead">
                    <h1>BlackJack with Friends</h1>
                </header>

                <div className="container">
                    <Router>

                        <Route exact path="/">
                            <TitlePage />
                        </Route>

                        <Route exact path="/CharacterSelectPage">
                            <CharacterSelectPage
                                characters={this.state.characters}
                                handlerCall={this.characterSelectPageHandler.bind(this)} />
                        </Route>

                        <Route exact path="/GamePage">
                            <GamePage
                                characters={this.state.characters}
                                selectedCharacters={this.state.selectedCharacters}
                            />
                        </Route>

                    </Router>
                </div>
            </div>
        );
    }
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
