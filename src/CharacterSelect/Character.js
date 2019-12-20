import React, { Component } from "react";
//import "../App.css";
import './Character.css';

class Character extends Component {
    constructor(props){
        super(props);
        this.state = {
            //originalName: this.props.name,
            name: (this.props.unlocked) ? this.props.name : "LOCKED" ,
            bet: this.props.bet,
            wallet: this.props.wallet,
            images: this.props.images,
            image: (this.props.unlocked) ? this.props.images[2] : require("./Images/Locked.jpg"), //Nuetral pic or Locked

            unlocked: this.props.unlocked,
            selected: false,
            color: "#5C5B59"
        }
    };

    //OnClick
    onClick() {
        if(!this.props.unlocked) {
            console.log("Locked!");
        }
        else {
            if(!this.state.selected) {
                this.setState({selected: true});
                this.setState({color: "#48BF84"});

                this.props.handlerCall(true, this.state);
            }
            else {
                this.setState({selected: false});
                this.setState({color: "#5C5B59"});

                this.props.handlerCall(false, this.state);
            }
        }
    }

    refresh() {
        console.log("Hi " + this.props.name);
        this.setState({ name: this.props.name});
        this.setState({ image: this.props.images[2]});
    }

    // ----------------- Render ----------------- //
    render() {
        var borderColor = "5px solid " + this.state.color;
        return (
            <button
            className="character"
            onClick={() => this.onClick()}>

                <img
                className="thumbnail"
                alt={this.state.name}
                style={{border: borderColor}}
                src={this.state.image}/>

                <div
                className="thumbnailText">
                    {this.state.name}</div>

            </button>
        );
    }
}

export default Character;
