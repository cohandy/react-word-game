import React from "react";

import Board from "../components/Board.js";
import BoardHeader from "../partials/BoardHeader.js";
import BoardFooter from "../partials/BoardFooter.js";
import GameOver from "../components/GameOver.js";

class Play extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTiles: [],
            points: 0,
            displayPoints: 0,
            countingPoints: false,
            spelledWords: [],
            correctWord: false,
            timer: "",
            activePlay: false,
            gameOver: false
        }
    }

    componentWillMount() {
        setTimeout(() => {
            this.startGame();
        }, 950);
    }

    startGame(stepIndex=0) {
        let steps = ["Ready", "Set", "Go!"];
        if(stepIndex < steps.length) {
            this.setState({
                timer: steps[stepIndex],
                activePlay: stepIndex === steps.length - 1 ? true : false
            });
            if (stepIndex !== steps.length - 1) {
                setTimeout(() => {
                    this.setState({
                        timer: ""
                    });
                }, 950);
            }
            setTimeout(() => {
                this.startGame(stepIndex + 1);
            }, 1000);
        } else {
            this.timerCountdown(59);
        }
    }

    timerCountdown(seconds) {
        if(seconds > 0) {
            this.setState({
                timer: seconds < 10 ? `0:0${seconds}` : `0:${seconds}`
            });
            setTimeout(() => {
                this.timerCountdown(seconds - 1);
            }, 1000);
        } else {
            this.setState({
                timer: "Time's Up!",
                activePlay: false,
                gameOver: true
            });
        }
    }

    updateWord(tiles) {
        let correctWord = false;
        if(tiles.length) {
            if (tiles[tiles.length - 1].correct) {
                correctWord = true;
            }
        }
        this.setState({
            activeTiles: tiles,
            correctWord
        });
    }

    updatePoints() {
        let newWord = this.state.activeTiles.reduce((acc, tile) => {
            return acc + tile.letter;
        }, "").toLowerCase();
        //animate points counting up
        const pointsCountUp = points => {
            if(points) {
                this.setState({
                    points: this.state.points + 1
                });
                setTimeout(() => {
                    pointsCountUp(points - 1);
                }, 85);
            } else {
                this.setState({
                    countingPoints: false
                });
            }
        }
        //check if word was already found
        if(this.state.spelledWords.findIndex(i => i.word === newWord) === -1) {
            //gather points
            let points = this.state.activeTiles.reduce((acc, tile) => {
                return acc + tile.points;
            }, 0);
            //push to spelled words
            let words = this.state.spelledWords;
            words.push({ word: newWord, points: points });
            this.setState({
                activeTiles: [],
                displayPoints: points,
                countingPoints: true,
                spelledWords: words
            });
            pointsCountUp(points);
        } else {
            console.log("found");
        }
    }

    render() {
        let gameOver = <GameOver words={this.state.spelledWords} score={this.state.points}/>
        if(!this.state.gameOver) gameOver = "";
        return (
            <section className="l-container">
                {gameOver}
                <BoardHeader 
                    activeTiles={this.state.activeTiles} 
                    points={this.state.points} 
                    displayPoints={this.state.displayPoints} 
                    countingPoints={this.state.countingPoints} 
                    correctWord={this.state.correctWord}
                    activePlay={this.state.activePlay} 
                    timer={this.state.timer}
                />
                <div className="l-board">
                    <Board 
                        activeTiles={this.state.activeTiles} 
                        updateWord={this.updateWord.bind(this)} 
                        updatePoints={this.updatePoints.bind(this)} 
                        words={this.state.spelledWords}
                        activePlay={this.state.activePlay} 
                    />
                </div>
                <BoardFooter 
                    words={this.state.spelledWords} 
                    activeTiles={this.state.activeTiles} 
                    updatePoints={this.updatePoints.bind(this)} 
                    updateWord={this.updateWord.bind(this)}
                />
            </section>
        );
    }
}

export default Play;