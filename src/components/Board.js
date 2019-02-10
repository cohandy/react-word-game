import React from "react";

import BoardRow from "../partials/BoardRow.js";
import generateTiles from "../partials/generateTiles.js";
import highlightTiles from "../partials/highlightTiles.js";
//list of most words in english lang, imported as json to avoid any compiler issues
import wordList from "../words.json";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tiles: generateTiles()
        }
        this.wordList = wordList[0].words;
    }

    componentDidMount() {
        //make tiles visible (animation)
        for(let i=0;i<this.state.tiles.length;i++) {
            for(let k=0;k<this.state.tiles[i].length;k++) {
                setTimeout(() => {
                    let changedTiles = this.state.tiles;
                    changedTiles[i][k].isVisible = true;
                    this.setState({
                        tiles: changedTiles
                    });
                }, ((i + k) * 75) + 200);
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        //if clear or confirm button has been clicked in BoardFooter, reset the board
        if(!nextProps.activeTiles.length && this.state.tiles.findIndex(i => i.isActive === true)) {
            let changedTiles = this.state.tiles;
            changedTiles = changedTiles.map((row) => {
                let newRow = [];
                for (let i = 0; i < row.length; i++) {
                    newRow.push({
                        letter: row[i].letter,
                        isVisible: true,
                        isActive: false,
                        isChoice: false,
                        isWord: false,
                        confirmWord: false,
                        points: row[i].points
                    })
                }
                return newRow;
            });
            this.setState({
                tiles: changedTiles
            });
        }
    }

    //all game logic
    tileClick(rowIndex, tileIndex) {
        if(!this.props.activePlay) return;
        let changedTiles = this.state.tiles,
            activeTiles = this.props.activeTiles,
            clickedTile = this.state.tiles[rowIndex][tileIndex];
        //if no tiles selected or tile click is legal
        if(this.props.activeTiles.length === 0 || clickedTile.isChoice) {
            changedTiles[rowIndex][tileIndex].isActive = true;
            activeTiles.push({
                letter: clickedTile.letter,
                points: clickedTile.points,
                rowIndex,
                tileIndex
            });
        } else if(clickedTile.isActive) {
            //if confirming spelled word
            if(clickedTile.confirmWord) {
                this.props.updatePoints();
                //clear active word tiles, reset game tiles
                resetBoard();
            } else {
                //rollback tile selections to index clicked
                let spliceIndex = null;
                for(let i=0;i<activeTiles.length;i++) {
                    if(activeTiles[i].rowIndex === rowIndex && activeTiles[i].tileIndex === tileIndex) {
                        spliceIndex = i + 1;
                    } else if(spliceIndex) {
                        changedTiles[activeTiles[i].rowIndex][activeTiles[i].tileIndex].isActive = false;
                    }
                }
                if(spliceIndex === 1) {
                    resetBoard();
                } else {
                    activeTiles.splice(spliceIndex);
                }
            }
        } else {
            //clear active word tiles, reset game tiles
            resetBoard();
        }
        if(activeTiles.length) {
            //highlight legal choices
            changedTiles = highlightTiles(activeTiles, changedTiles);
            //check if word
            let currentWord = activeTiles.reduce((acc, tile) => {
                return acc + tile.letter;
            }, "");
            //add the trailing commas like it is in word file, so it matches exactly
            let guessRegex = new RegExp("," + currentWord + ",", "i");
            if (guessRegex.test(this.wordList) && currentWord.length > 2 && this.props.words.findIndex(i => i.word === currentWord.toLowerCase()) === -1) {
                for(let i=0;i<activeTiles.length;i++) {
                    changedTiles[activeTiles[i].rowIndex][activeTiles[i].tileIndex].isWord = true;
                    if(i === activeTiles.length - 1) {
                        changedTiles[activeTiles[i].rowIndex][activeTiles[i].tileIndex].confirmWord = true;
                    }
                }
                activeTiles[activeTiles.length - 1].correct = true;
            } else {
                activeTiles[activeTiles.length - 1].correct = false;
            }
        }
        //change tile state
        this.setState({
            tiles: changedTiles
        });
        //update active word
        this.props.updateWord(activeTiles);

        function resetBoard() {
            activeTiles = [];
            changedTiles = changedTiles.map((row) => {
                let newRow = [];
                for (let i = 0; i < row.length; i++) {
                    newRow.push({
                        letter: row[i].letter,
                        isVisible: true,
                        isActive: false,
                        isChoice: false,
                        isWord: false,
                        confirmWord: false,
                        points: row[i].points
                    })
                }
                return newRow;
            });
        }
    }

    render() {
        return (
            <div className="board">
                {
                    this.state.tiles.map((row, index) => {
                        return (
                            <BoardRow row={row} rowIndex={index} key={"row-" + index} tileClick={this.tileClick.bind(this)}/>
                        )
                    })
                }
            </div>
        );
    }
}

export default Board;