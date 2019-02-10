import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import TransitionContainer from "./TransitionContainer";
import Start from "./Start.js";
import Play from "./Play.js";

class App extends Component {
    render() {
        let date = new Date();
        return (
            <Router>
                <main>
                    <Route exact path="/" component={TransitionContainer(Start)}/>
                    <Route exact path="/play" component={TransitionContainer(Play)}/>
                    <footer className="l-footer">
                        <div className="l-container l-container--footer">
                            <span className="l-footer_text">&copy;&nbsp;{date.getFullYear()},&nbsp;Connor Handy</span>
                            <a href="https://connorhandy.com" target="_blank" rel="noopener noreferrer" className="l-footer_text l-footer_text--float-right">Contact</a>
                        </div>
                    </footer>
                </main>
            </Router>
        );
    }
}

export default App;