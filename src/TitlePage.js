import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";


class TitlePage extends Component {
    constructor(props) {
        super(props);
    };


    //////////////////////////////
    /////////// RENDER ///////////
    render() {
        return (
            <div>
                <Link to="/CharacterSelectPage">
                    <div className="titlePageStart">
                        Start
                    </div>
                </Link>
            </div>
        );
    }
}

export default TitlePage;
