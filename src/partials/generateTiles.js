const vowels = ['A', 'E', 'I', 'O', 'U'];
const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'V', 'W', 'A', 'E', 'I', 'O'];
const rareLetters = ['K', 'Q', 'X', 'Y', 'Z'];

//generate random letters for tiles
export default function generateTiles(numRows=4) {
    let rows = [];
    for(var i=0;i<numRows;i++) {
        let newRow = [],
            vowelIndex = Math.floor(Math.random() * numRows);
        for(var k=0;k<numRows;k++) {
            let letterArr = consonants,
                points = 2;
            //each row needs at least one vowel
            if(vowelIndex === k) {
                letterArr = vowels;
            //chance for harder letters
            } else if(Math.floor(Math.random() * 15) === 5) {
                letterArr = rareLetters;
                points = 4;
            }
            newRow.push({
                letter: letterArr[Math.floor(Math.random() * letterArr.length)],
                isVisible: false, 
                isActive: false, 
                isChoice: false,
                isWord: false,
                confirmWord: false,
                points
            });
        }
        rows.push(newRow);
    }
    return rows;
}