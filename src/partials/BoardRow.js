import React from "react";

const BoardRow = props => {
    return (
        <div className="board_row">
            {
                props.row.map((tile, index) => {
                    let tileClassName = "board_row_tile";
                    if(tile.isVisible) tileClassName += " is-visible";
                    if(tile.isActive) tileClassName += " is-active";
                    if(tile.isChoice) tileClassName += " is-choice";
                    if(tile.isWord) tileClassName += " is-word";
                    if(tile.confirmWord) tileClassName += " confirm-word";
                    return (
                        <div 
                            className={tileClassName}
                            data-row={props.rowIndex} 
                            data-index={index} 
                            key={`tile-${props.rowIndex}-${index}`}
                            onClick={() => props.tileClick(props.rowIndex, index)}
                        >
                            <div className="board_row_tile_container">
                                <span
                                    className={tile.points > 2 ? "board_row_tile_letter board_row_tile_letter--rare" : "board_row_tile_letter"}
                                >
                                    {tile.letter}
                                </span>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default BoardRow;