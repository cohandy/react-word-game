import React from "react";
import { Link } from "react-router-dom";

class GameOver extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            stats: []
        }
    }

    componentDidMount() {
        if(!this.props.homePage) {
            setTimeout(() => {
                this.setState({
                    showModal: true
                });
            }, 10);
            this.computeStats();
        } else {
            this.fetchTopScores();
        }
    }

    fetchTopScores() {
        //on the homepage, this component grabs top scores stored in localstorage
        let storedStats = JSON.parse(localStorage.getItem("stats")) || {
            longestWord: "",
            bestWord: "",
            bestWordPoints: 0,
            score: 0,
            totalWords: 0
        };
        this.setStats(storedStats.longestWord, storedStats.bestWord, storedStats.totalWords, storedStats.score);
    }

    computeStats() {
        //calculate top words/points
        let stats = this.props.words.reduce((acc, word) => {
            if(word.word.length > acc.longestWord.length) {
                acc.longestWord = word.word;
            }
            if(word.points > acc.mostPoints) {
                acc.bestWord = word.word;
                acc.mostPoints = word.points;
            }
            return acc;
        }, {longestWord: "", bestWord: "", mostPoints: 0});
        //set state
        this.setStats(stats.longestWord, stats.bestWord, this.props.words.length);
        //update localstorage
        let storedStats = JSON.parse(localStorage.getItem("stats")) || {
            longestWord: "",
            bestWord: "",
            bestWordPoints: 0,
            score: 0,
            totalWords: 0
        };
        if(stats.longestWord.length > storedStats.longestWord.length) {
            storedStats.longestWord = stats.longestWord;
        }
        if(stats.mostPoints > storedStats.bestWordPoints) {
            storedStats.bestWord = stats.bestWord;
            storedStats.bestWordPoints = stats.mostPoints;
        }
        if(this.props.score > storedStats.score) {
            storedStats.score = this.props.score;
        }
        if (this.props.words.length > storedStats.totalWords) {
            storedStats.totalWords = this.props.words.length;
        }
        localStorage.setItem("stats", JSON.stringify(storedStats));
    }

    setStats(longestWord, bestWord, totalWords, score=this.props.score) {
        this.setState({
            stats: [
                {
                    title: "Longest Word",
                    word: longestWord
                },
                {
                    title: "Best Word",
                    word: bestWord
                },
                {
                    title: "Total Words",
                    word: totalWords
                }
            ],
            score,
        });
    }

    render() {
        let sectionClasses = ['l-slide-modal', 'l-slide-modal--game-over'];
        if(this.state.showModal || this.props.showModal) sectionClasses.push('is-visible');
        return (
            <section className={sectionClasses.join(' ')}>
                <div className="l-container l-container--modal">
                    <div className="game-stats">
                        <h1 className="game-stats_title">{this.props.homePage ? "TOP SCORES." : "GAME OVER."}</h1>
                        <ul className="game-stats_list">
                            {
                                this.state.stats.map((stat, index) => {
                                    return (
                                        <li className="game-stats_list_item" key={"stat-" + index}>
                                            <span className="game-stats_list_item_text">{stat.title || "N/A"}</span>
                                            <span className="game-stats_list_item_text game-stats_list_item_text--float-right">{stat.word || "N/A"}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className="game-stats_score">
                            <h5 className="game-stats_score_title">{this.props.homePage ? "High Score:" : "Score:"}</h5>
                            <p className="game-stats_score_points">{this.state.score}</p>
                        </div>
                        <div className="game-stats_options">
                            {
                                this.props.homePage
                                ?
                                <div className="game-stats_options">
                                    <div className="circle-arrow circle-arrow--static" onClick={() => this.props.hideScores()}>
                                        <span className="fa fa-arrow-up circle-arrow_icon"></span>
                                    </div>
                                </div>
                                :
                                <div className="game-stats_options">
                                    <Link to="/" className="circle-arrow circle-arrow--static">
                                        <span className="fa fa-arrow-left circle-arrow_icon"></span>
                                    </Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default GameOver;