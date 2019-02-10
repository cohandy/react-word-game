import React from "react";
import { Link } from "react-router-dom";

import GameOver from "../components/GameOver.js";

class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showScores: false,
            fadeInOptions: false,
            titleTopRow: "LEXICAL".split("").reduce((acc, letter) => {
                acc.push({letter, isVisible: false});
                return acc;
            }, []),
            titleBottomRow: "PURSUIT".split("").reduce((acc, letter) => {
                acc.push({ letter, isVisible: false});
                return acc;
            }, [])
        }
    }

    componentDidMount() {
        //make tiles visible (animation)
        let delayMs = 75;
        for (let i = 0; i < this.state.titleTopRow.length; i++) {
            setTimeout(() => {
                let changedTiles = this.state.titleTopRow;
                changedTiles[i].isVisible = true;
                this.setState({
                    titleTopRow: changedTiles
                });
            }, ((i) * delayMs) + 50);
        }
        for (let i = 0; i < this.state.titleBottomRow.length; i++) {
            setTimeout(() => {
                let changedTiles = this.state.titleBottomRow;
                changedTiles[i].isVisible = true;
                this.setState({
                    titleBottomRow: changedTiles
                });
            }, ((this.state.titleBottomRow.length * delayMs) - (i * delayMs)) + 500);
        }
        setTimeout(() => {
            this.setState({
                fadeInOptions: true
            });
        }, 350)
    }

    hideScores() {
        this.setState({
            showScores: false
        });
    }

    render() {
        return (
            <section className="l-container l-container--start">
                <div className="l-start">
                    <div className="start-tiles">
                        <div className="start-tiles-row board_row">
                        {
                            this.state.titleTopRow.map((letter, index) => {
                                let tileClasses = ['board_row_tile', 'board_row_tile--startpage'];
                                if (letter.isVisible) tileClasses.push('is-visible');
                                return (
                                    <div className={tileClasses.join(' ')} key={`home-tile-${index}`}>
                                        <div className="board_row_tile_container">
                                            <span className="board_row_tile_letter board_row_tile_letter--startpage">
                                                {letter.letter}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        }
                        </div>
                        <div className="start-tiles-row board_row">
                            {
                                this.state.titleBottomRow.map((letter, index) => {
                                    let tileClasses = ['board_row_tile', 'board_row_tile--startpage'];
                                    if(letter.isVisible) tileClasses.push('is-visible');
                                    return (
                                        <div className={tileClasses.join(' ')} key={`home-tile-${index}`}>
                                            <div className="board_row_tile_container">
                                                <span className="board_row_tile_letter board_row_tile_letter--startpage">
                                                    {letter.letter}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className={this.state.fadeInOptions ? "start-options is-visible" : "start-options"}>
                        <p className="start-options_text">It's Boggle in everything but the name!</p>
                        <Link to="/play" className="start-options_btn start-options_btn--play">Play</Link>
                        <div className="start-options_btn start-options_btn--scores" onClick={() => this.setState({ showScores: true })}>Top Scores</div>
                    </div>
                </div>
                <GameOver homePage={true} showModal={this.state.showScores} hideScores={this.hideScores.bind(this)}/>
            </section>
        );
    }
}

export default Start;