import React from "react";

const BoardFooter = props => {
    let confirmBtn = <div className="board-btn board-btn--right">CONFIRM</div>;
    if(props.activeTiles.length && props.activeTiles[props.activeTiles.length - 1].correct) {
        confirmBtn = <div className="board-btn board-btn--right is-visible" onClick={() => props.updatePoints()}>CONFIRM</div>;
    }
    return (
        <div className="l-board-footer">
            <div className="l-board-footer_top">
                <div 
                    className={props.activeTiles.length ? "board-btn is-visible" : "board-btn"}
                    onClick={() => props.updateWord([])}
                >
                    CLEAR
                </div>
                <div className="num-words">{props.words.length} {props.words.length === 1 ? "word" : "words"}</div>
                {confirmBtn}
            </div>
            <div className="l-board-footer_words">
                {
                    props.words.map((word) => {
                        return (
                            <div className="spelled-word" key={word.word + "-spelled"}>
                                <span className="spelled-word_word">{word.word}</span>
                                <span className="spelled-word_points">{word.points}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default BoardFooter;