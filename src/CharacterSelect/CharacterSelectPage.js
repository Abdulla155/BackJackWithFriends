import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../App.css";
import './Character.css';

import Character from "./Character";

class CharacterSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: this.props.characters,
            numberOfPacks: 6,
            selectedCharacters: [],
            unlockedPackIndexes: [0],
            unlockInput: ''
        };

        // Values for unknown characters
        const unknownCharacter = {
            name:"UNKNOWN",
            images:
                [require("./Images/imagePlaceHolder.jpg"), // 0 Lost?
                require("./Images/imagePlaceHolder.jpg"), // 1
                require("./Images/imagePlaceHolder.jpg"), // 2 Nuetral
                require("./Images/imagePlaceHolder.jpg"), // 3
                require("./Images/imagePlaceHolder.jpg")]  // 4 win?
        };

        // Fill unknown values so characters[] is full of characters
        this.state.characters = this.state.characters.concat(
            new Array((this.state.numberOfPacks*5) - this.state.characters.length)
                .fill(unknownCharacter)
         );
    }

    // Addikng or subtractingcharacter from Selected array
    characterHandler(adding, character) {
        var selected = this.state.selectedCharacters;
        (adding)?
            selected.push(character):
            selected.splice( selected.indexOf(character) , 1);

        this.setState({ selectedCharacters: selected })
    }

    // Button that triggers game page
    startGameOnClick() {
        var characters = this.state.selectedCharacters;
        if(characters.length === 5) {
            this.props.handlerCall(this.state.selectedCharacters);
            //alert("Starting!");
        }
        else if(characters.length > 5) {
            this.state.selectedCharacters = this.state.selectedCharacters.splice(0, 5);
            this.props.handlerCall(this.state.selectedCharacters);
        }
        else {
            this.state.selectedCharacters = this.state.selectedCharacters.concat(
                new Array(5 - this.state.selectedCharacters.length)
                    .fill(this.state.characters[0])
             );
             this.props.handlerCall(this.state.selectedCharacters);
            //alert("You have to pick 5 characters!");
        }
    }

    //// UNLOCK WITH CODES ////
    // Unlocks Characters depending on password inputted
    unlockOnClick() {
        var unlockedPackIndexesTEMP = this.state.unlockedPackIndexes;
        switch (this.state.unlockInput) {
            case "World Domination": // Dictators
                unlockedPackIndexesTEMP.push(1);
                break;
            case "Polly": // Politics
                unlockedPackIndexesTEMP.push(2);
                break;
            case "Supreme": // Unlock All
                unlockedPackIndexesTEMP.push(1,2);
            break;
            default:
                break;
            // code block
        }
        this.setState({unlockedPackIndexes: unlockedPackIndexesTEMP});
        this.setState({unlockInput: ''});
        this.triggerChildAlert();
        console.log("Unlocked Packs: " + this.state.unlockedPackIndexes);
    }
    // Changes 'unlockInput' to inputted value
    unlockInputChange(e) {
        const unlockInputt = e.target.value;
        this.setState({ unlockInput: unlockInputt });
    }
    //
    triggerChildAlert() {
         for(let i = 0; i < this.state.characters.length; i++){

            var pack = Math.floor(i/5);
            var unlockedCheck = !(this.state.unlockedPackIndexes.indexOf(pack) === -1);

            var ref = this.refs[i];
            console.log("ref: " + ref );

            if ( unlockedCheck ) {
                ref.refresh();
            }
        }
    }

    //// POPULATE PAGE ////
    // Populates known pack of 5
    getCharactersPack(pack) {
        var characters = [];
        for(let j = 0; j < 5; j++) {
            var character;

            var index = (pack*5) + j;
            var unlockedCheck = !(this.state.unlockedPackIndexes.indexOf(pack) === -1);
            //console.log(unlockedCheck);

            character = this.state.characters[index];
            characters.push(
                <Character
                    name = {character.name}
                    ref = {index}
                    images = {character.images}
                    handlerCall = {this.characterHandler.bind(this)}
                    key = {index}
                    unlocked = {unlockedCheck}
                />
            );
        }
        return characters;
    }
    // Populates scene with packsa
    getAllPacks(numOfPacks) {
        var allPacks = [];

        for(let i = 0; i < numOfPacks; i++) {
            allPacks.push(
                <div className="characterPack" key = {i}>
                    {this.getCharactersPack(i)}
                </div>
            );
        }

        return allPacks;

    }

    //////////////////////////////
    /////////// RENDER ///////////
    render() {
        return (
            <div>
                <div className="allCharacters">
                    {this.getAllPacks(this.state.numberOfPacks)}
                </div>

                <div className="unlockArea">
                    <form>
                        <input
                        type="text"
                        name="characterUnlock"
                        placeholder="???"
                        value={this.state.unlockInput}
                        onChange={this.unlockInputChange.bind(this)} />
                    </form>
                    <button
                    onClick={() => { this.unlockOnClick() }}>
                        UNLOCK
                    </button>
                    <Link to="/GamePage">
                        <button onClick={() => {this.startGameOnClick()}}>
                            Start
                        </button>
                    </Link>
                </div>

            </div>
        );
    }
}

export default CharacterSelect;
