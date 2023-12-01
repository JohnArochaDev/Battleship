// Variable Declarations //

const cBattleship = {
    name: 'Battleship',
    num: 4,
    health: 4,
    color: 'grey',
}

const cCruiserShip = {
    name: 'Cruiser Ship',
    num: 3,
    health: 3,
    color: 'grey',
}


const cTugShip = {
    name: 'Tug Ship',
    num: 2,
    health: 2,
    color: 'grey',
}

const pBattleship = {
    name: 'Battleship',
    num: 4,
    health: 4,
    color: 'grey',
}
//                                             READ LINE 424!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const pCruiserShip = {
    name: 'Cruiser Ship',
    num: 3,
    health: 3,
    color: 'grey',
}

const pTugShip = {
    name: 'Tug Ship',
    num: 2,
    health: 2,
    color: 'grey',
}

const colors = {
    5: 'red', // hit
    4: 'white', // miss
    3: 'grey', // tug ship
    2: 'grey', // cruiser
    1: 'grey', // battleship
    0: 'green', // boxes
}

const turnOptions = {
    down: 1,
    up: 2,
    left: 3,
    right: 4,
}

// Need to return this value to 0 if we want toever go back to random number generating for the AI

let turnFunction = 0

let col = 0

let row = 0

let cHitChoice

let newCChoice // THis is the variable that controlls the moves after it finds a hit

let savedCChoice 

let pShipsLeft = 3

let cShipsLeft = 3

let chart

let cChart

let pChart

let turn

let winner

let cChoice1

let cChoice2

let comId

let cBoxId // May use this to store the variable for cTurn

let cPreviousHits = []

// Dom Declirations //

const board = document.querySelectorAll('.box')

const cBoard = document.querySelectorAll('.cBox')

// function Statements //

function initiate() {
    board.forEach((box) => {
        box.addEventListener('click', (e)=>{
            play(e);
        });
    })
    pShipsLeft = 3
    cShipsLeft = 3
    turn = 1
    winner = null
    chart = [
        [0, 0, 0, 0, 0, 0, 0, 0], // col 0
        [0, 0, 0, 0, 0, 0, 0, 0], // col 1
        [0, 0, 0, 0, 0, 0, 0, 0], // col 2
        [0, 0, 0, 0, 0, 0, 0, 0], // col 3
        [0, 0, 0, 0, 0, 0, 0, 0], // col 4
        [0, 0, 0, 0, 0, 0, 0, 0], // col 5
        [0, 0, 0, 0, 0, 0, 0, 0], // col 6
        [0, 0, 0, 0, 0, 0, 0, 0], // col 7
    ]
    // THIS WILL BE THE CHART THAT THE PLAYER SEES HIS BOATS ON
    pChart = [
        [0, 0, 0, 0, 0, 0, 0, 0], // col 0
        [0, 0, 0, 0, 0, 3, 3, 0], // col 1
        [0, 0, 0, 0, 0, 0, 0, 0], // col 2
        [0, 0, 1, 0, 2, 0, 0, 0], // col 3
        [0, 0, 1, 0, 2, 0, 0, 0], // col 4
        [0, 0, 1, 0, 2, 0, 0, 0], // col 5
        [0, 0, 1, 0, 0, 0, 0, 0], // col 6
        [0, 0, 0, 0, 0, 0, 0, 0], // col 7
    ]
    //THIS WILL BE THE CHART THE PLAYER SEES HIS HITS AND MISSES ON
    cChart = [
        [0, 0, 0, 0, 0, 0, 0, 0], // col 0
        [0, 0, 1, 0, 0, 0, 0, 0], // col 1
        [0, 0, 1, 0, 0, 0, 0, 0], // col 2
        [0, 0, 1, 0, 0, 0, 0, 0], // col 3
        [0, 0, 1, 0, 0, 0, 0, 0], // col 4
        [0, 0, 0, 0, 0, 0, 0, 0], // col 5
        [3, 0, 0, 2, 2, 2, 0, 0], // col 6
        [3, 0, 0, 0, 0, 0, 0, 0], // col 7
    ]
    render()
}

function renderBoard() {
    chart.forEach((colArr, colIdx) => {
        colArr.forEach((cellVal, rowIdx) => {
            const cellId = `v${colIdx}h${rowIdx}`
            const cellEl = document.getElementById(cellId)
            cellEl.style.backgroundColor = colors[cellVal]
        })
    })
}

function render() {
    renderBoard();
    setTimeout(changeChart, 1000);
    setTimeout(renderBoard, 2000)
}

function play(event) {
    if (turn === 2) {
        return
    }
    const boxId = event.target.id
    const col = boxId[1]
    const row = boxId[3]
    if (chart[col][row] === 4 || chart[col][row] === 5) {
        return
    } else if (chart[col][row] === 1) {
        if (cBattleship.health >= 2) {
            cBattleship.health--;
            chart[col][row] = 5
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        } else {
            --cShipsLeft;
            console.log('You sunk their Battleship!');
            console.log(cShipsLeft);
            chart[col][row] = 5
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        }
    } else if (chart[col][row] === 2) {
        if (cCruiserShip.health >= 2) {
            --cCruiserShip.health;
            chart[col][row] = 5
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        } else {
            --cShipsLeft;
            console.log('You sunk their Cruiser!');
            console.log(cShipsLeft);
            chart[col][row] = 5
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        }
    } else if (chart[col][row] === 3) {
        if (cTugShip.health >= 2) {
            --cTugShip.health;
            chart[col][row] = 5
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        } else {
            --cShipsLeft;
            console.log('You sunk their Tug!');
            console.log(cShipsLeft);
            chart[col][row] = 5
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        }
    } else {
        chart[col][row] = 4
        if (!checkWinner()) {
            changeTurn()
        }
    }
    render()
}

function exactSpot() { // tells the cTurn to either make a specific guess or use the random value
    if (turnFunction === 0) {
        cBoxId = comId
    } else if (turnFunction !== 0) {
        cBoxId = newCChoice
        comId = newCChoice
    }
}

function cTurn() {
    cptrId() // comID is given Value Here
    exactSpot() // Giving cBoxId a value here depending on if it was a previous hit or not
    let col = cBoxId[1]
    let row = cBoxId[3]
    if (chart[col][row] === 1) {// BUILD A NEW SYSTEM THAT TAKES THE PREVIOUS GUESSES AND NEVER GUESSES THEM AGAIN
        if (pBattleship.health >= 2) {
            --pBattleship.health;
            if (!cPreviousHits.includes(cBoxId)) {
                cPreviousHits.push(cBoxId);
            }
            chart[col][row] = 5;
            savedCChoice = comId;
            hit()
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        } else {
            --pShipsLeft;
            if (!cPreviousHits.includes(cBoxId)) {
                cPreviousHits.push(cBoxId);
            }
            chart[col][row] = 5
            savedCChoice = comId;
            hit()
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        }
    } else if (chart[col][row] === 2) {
        if (pCruiserShip.health >= 2) {
            --pCruiserShip.health;
            if (!cPreviousHits.includes(cBoxId)) {
                cPreviousHits.push(cBoxId);
            }
            chart[col][row] = 5
            savedCChoice = comId;
            hit()
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        } else {
            --pShipsLeft;
            if (!cPreviousHits.includes(cBoxId)) {
                cPreviousHits.push(cBoxId);
            }
            chart[col][row] = 5
            savedCChoice = comId;
            hit()
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        }
    } else if (chart[col][row] === 3) {
        if (pTugShip.health >= 2) {
            --pTugShip.health;
            if (!cPreviousHits.includes(cBoxId)) {
                cPreviousHits.push(cBoxId);
            }
            chart[col][row] = 5
            savedCChoice = comId;
            hit()
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        } else {
            --pShipsLeft;
            if (!cPreviousHits.includes(cBoxId)) {
                cPreviousHits.push(cBoxId);
            }
            chart[col][row] = 5
            savedCChoice = comId;
            hit()
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        }
    } else {
        if (!cPreviousHits.includes(cBoxId)) {
            cPreviousHits.push(cBoxId);
        }
        console.log(cPreviousHits)
        chart[col][row] = 4
        savedCChoice = comId;
        if (!checkWinner()) {
            changeTurn()
        }
    }
    render()
}

// Function that runs if there is a hit to make it smarter

function hit() {// Uses random NUM generator and picks from its options
    cHitChoice = hitChoice()
    if (cHitChoice >= 0) {// CHANGE THIS BACK TO === 0 LATER
        let col = savedCChoice[1];
        let row = savedCChoice[3];
        --row;
        if (row < 0) {
        }
        if (chart[col][row] === 0) {
            cHitChoice = 1;
            return
        }
        turnFunction = turnOptions.down;
        newCChoice = `v${col}h${row}`
        // New function to keep going this way unless it misses
        //new function that runs the new coords on the board
        //new function to see if theboat sunk
        return savedCChoice
    } else if (cHitChoice === -1) { // TEMP CHANGE THESE NUMBERS SO IT NEVER USES THESE OPTIONS
        let col = savedCChoice[1];
        let row = savedCChoice[3];
        ++row;
        if (row > 7) {
        }
        if (chart[col][row] === 0) {
            cHitChoice = 2;
            return
        }
        turnFunction = turnOptions.up;
        savedCChoice = `v${col}h${row}`
        // New function to keep going this way unless it misses
        //new function that runs the new coords on the board
        //new function to see if theboat sunk
        return savedCChoice
    } else if (cHitChoice === -2) { // TEMP CHANGE THESE NUMBERS SO IT NEVER USES THESE OPTIONS
        let col = savedCChoice[1];
        let row = savedCChoice[3];
        --col;
        if (row < 0) {
        }
        if (chart[col][row] === 0) {
            cHitChoice = 3;
            return
        }
        turnFunction = turnOptions.left;
        savedCChoice = `v${col}h${row}`
        // New function to keep going this way unless it misses
        //new function that runs the new coords on the board
        //new function to see if theboat sunk
        return savedCChoice
    } else if (cHitChoice === -3) { // TEMP CHANGE THESE NUMBERS SO IT NEVER USES THESE OPTIONS
        let col = savedCChoice[1];
        let row = savedCChoice[3];
        ++col;
        if (row > 7) {
        }
        if (chart[col][row] === 0) {
            cHitChoice = 0;
            return
        }
        turnFunction = turnOptions.right;
        savedCChoice = `v${col}h${row}`
        // New function to keep going this way unless it misses
        //new function that runs the new coords on the board
        //new function to see if theboat sunk
        return savedCChoice
    }
}

// This will be the function that runs the new coords on the board
// Make sure the whole ID is pushed to the hitAgain, not the value of the cell in the array

function hitAgain(choice) {
    let col = choice[1];
    let row = choice[3];
    if (chart[col][row] === 1 || chart[col][row] === 2 || chart[col][row] === 3) {
        // Set a value to a variable that tells the game what function to run once its the computers turn
        chart[col][row] = 5;
        turnFunction = 0
    }
}
// Makes a random number between 0-4 that tells it to guess up down left or right

function hitChoice(min = 0, max = 4) {
    let choice = Math.random();
    choice = Math.floor(choice * max);
    choice = choice + min;
    return choice;
}

function cChoice(min = 0, max = 8) {
    let choice = Math.random();
    choice = Math.floor(choice * max);
    choice = choice + min;
    return choice;
}

// THis gives me an ID to use in the future for the computer turn (cTurn)

function cptrId() {
    cChoice1 = cChoice()
    cChoice2 = cChoice()
    comId = `v${cChoice1}h${cChoice2}`
    console.log('cptrId first try: ' + comId)
    if (cPreviousHits.includes(comId)) {
        cChoice1 = cChoice()
        cChoice2 = cChoice()
        comId = `v${cChoice1}h${cChoice2}`
        console.log('cptrId second try: ' + comId)
    }
    if (cPreviousHits.includes(comId)) {
        cChoice1 = cChoice()
        cChoice2 = cChoice()
        comId = `v${cChoice1}h${cChoice2}`
        console.log('cptrId third try: ' + comId)
    }
    if (cPreviousHits.includes(comId)) {
        cChoice1 = cChoice()
        cChoice2 = cChoice()
        comId = `v${cChoice1}h${cChoice2}`
        console.log('cptrId fourth try: ' + comId)
    }
    if (cPreviousHits.includes(comId)) {
        cChoice1 = cChoice()
        cChoice2 = cChoice()
        comId = `v${cChoice1}h${cChoice2}`
        console.log('cptrId fifth try: ' + comId)
    }
    return comId
}

function checkWinner() {
    if (pShipsLeft === 0) {
        winner = 'c'
        console.log('They sunk your battleship!')
    } else if (cShipsLeft === 0) {
        winner = 'p'
        console.log('You sunk their battleship!')
    } else {
        return false
    }
}

function changeTurn() {
    turn = turn === 1 ? 2 : 1;
    if (turn === 2) {// Use and AND statement to do whatis meantioned below!!
        setTimeout(cTurn, 3000)
        // Set a value to a variable that tells the game what function to run once its the computers turn 
    }
    
}

//THIS FUNCTION BELOW IS A NEW VERSION OF THE ABOVE FUNCTION///////////////////////////////////////////////////////////////////////

// function changeTurn() {
//     turn = turn === 1 ? 2 : 1;
//     if ((turn === 2 && turnFunction === 0) || (turn === 2 && someVariable === sum)) { // THIS MAY WORK TRY IT SECOND HALF IS FOR THE EXTRA VARIABLE FOR RE RUNNING CODE, ALSO MAYBE JUST CHANGE THE VARIABLE ENTERING INTO CTURN INSTEAD, THAT WAY WE DONT NEED A NEW FUNCTION FOR RUNNING THE CODE AND APPLYING THE CHANGE TO THE BOARD
//         setTimeout(down, 3000)
//         //variable to tell it to run this again next turn
//     } else if (turn === 2 && turnFunction === 1) {
//         setTimeout(up, 3000)
//         //variable to tell it to run this again next turn
//     } else if (turn === 2 && turnFunction === 2) {
//         setTimeout(left, 3000)
//         //variable to tell it to run this again next turn
//     } else if (turn === 2 && turnFunction === 3) {
//         setTimeout(right, 3000)
//         //variable to tell it to run this again next turn
//     }
// }

function changeChart() {
    if (turn === 1) {
        chart = cChart
    } else {
        chart = pChart
    }
}

function down() {

}

function up() {
    
}

function left() {
    
}

function right() {
    
}

// Called Functions //

initiate()

// Dom Statements //




// SOUND EFFECTS FOR LATER// 



// EXPLOSION https://www.youtube.com/watch?v=YRex1Udiybs

//MISS https://www.youtube.com/watch?v=xHN3zSp6Ggg

// background noise potentally https://www.youtube.com/watch?v=FWdnm3CHato



//save variable for last hit