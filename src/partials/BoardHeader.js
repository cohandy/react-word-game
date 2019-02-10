import React from "react";
import { Link } from "react-router-dom";

const BoardHeader = props => {
    let timerClasses = ["board-timer"];
    if(props.timer !== "" && !props.activePlay) {
        timerClasses.push("is-fading");
    }
    return (
        <div className="l-board-header">
            <div className="l-board-header_top">
                <Link to="/" className="circle-arrow">
                    <span className="fa fa-arrow-left circle-arrow_icon"></span>
                </Link>
                <div className={timerClasses.join(" ")}>{props.timer}</div>
                <div className="score-board">
                    <span className="fa fa-ticket score-board_icon"></span>
                    <div className="score-board_points">{props.points}</div>
                    <div className={props.countingPoints ? "score-board_display-points" : "score-board_display-points is-hidden"}>+{props.displayPoints}</div>
                </div>
            </div>
            <div className="l-board-header_bottom">
                <div className={props.correctWord ? "current-word is-correct" : "current-word"}>
                    {
                        props.activeTiles.map((tile) => {
                            return (
                                tile.letter
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default BoardHeader;