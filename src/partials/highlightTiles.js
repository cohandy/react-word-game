export default function highlightTiles(activeTiles, gameTiles) {
    let activeTile = activeTiles[activeTiles.length - 1];
    for(let i=0;i<gameTiles.length;i++) {
        for(let k=0;k<gameTiles[i].length;k++) {
            if ((i >= activeTile.rowIndex - 1 && i <= activeTile.rowIndex + 1) && (k >= activeTile.tileIndex - 1 && k <= activeTile.tileIndex + 1) && !gameTiles[i][k].isActive) {
                gameTiles[i][k].isChoice = true;
            } else {
                gameTiles[i][k].isChoice = false;
                gameTiles[i][k].isWord = false;
                gameTiles[i][k].confirmWord = false;
            }
        }
    }
    return gameTiles;
}