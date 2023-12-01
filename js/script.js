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
    down: 0,
    up: 1,
    left: 2,
    right: 3,
}

let turnFunction

let col = 0

let row = 0

let cHitChoice

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
        [1, 0, 0, 0, 0, 0, 0, 0], // col 0
        [1, 0, 0, 0, 0, 3, 3, 0], // col 1
        [1, 0, 0, 0, 0, 0, 0, 0], // col 2
        [1, 0, 0, 0, 2, 0, 0, 0], // col 3
        [0, 0, 0, 0, 2, 0, 0, 0], // col 4
        [0, 0, 0, 0, 2, 0, 0, 0], // col 5
        [0, 0, 0, 0, 0, 0, 0, 0], // col 6
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

function cTurn() {
    cptrId()
    const boxId = comId
    console.log('cptr ID: ' + comId)
    let col = boxId[1]
    let row = boxId[3]
    if (chart[col][row] === 4 || chart[col][row] === 5) {
        return retry()
    } else if (chart[col][row] === 1) {
        if (pBattleship.health >= 2) {
            --pBattleship.health;
            chart[col][row] = 5;
            savedCChoice = comId;
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        } else {
            --pShipsLeft;
            chart[col][row] = 5
            savedCChoice = comId;
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        }
    } else if (chart[col][row] === 2) {
        if (pCruiserShip.health >= 2) {
            --pCruiserShip.health;
            chart[col][row] = 5
            savedCChoice = comId;
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        } else {
            --pShipsLeft;
            chart[col][row] = 5
            savedCChoice = comId;
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        }
    } else if (chart[col][row] === 3) {
        if (pTugShip.health >= 2) {
            --pTugShip.health;
            chart[col][row] = 5
            savedCChoice = comId;
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        } else {
            --pShipsLeft;
            chart[col][row] = 5
            savedCChoice = comId;
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        }
    } else {
        chart[col][row] = 4
        savedCChoice = comId;
        if (!checkWinner()) {
            hit();
            changeTurn()
        }
    }
    render()
}

function retry() {
    if (turn === 2) {
        cTurn()
    }
}

// Function that runs if there is a hit to make it smarter

function hit() {
    cHitChoice = hitChoice()
    if (cHitChoice === 0) {
        let col = savedCChoice[1];
        let row = savedCChoice[3];
        --row;
        turnFunction = turnOptions.down;
        // chart[col][row];
        // New function to keep going this way unless it misses
        //new function that runs the new coords on the board
        //new function to see if theboat sunk
        return savedCChoice
    } else if (cHitChoice === 1) {
        let col = savedCChoice[1];
        let row = savedCChoice[3];
        ++row;
        turnFunction = turnOptions.up;
        // chart[col][row];
        // New function to keep going this way unless it misses
        //new function that runs the new coords on the board
        //new function to see if theboat sunk
        return savedCChoice
    } else if (cHitChoice === 2) {
        let col = savedCChoice[1];
        let row = savedCChoice[3];
        --col;
        turnFunction = turnOptions.left;
        // chart[col][row];
        // New function to keep going this way unless it misses
        //new function that runs the new coords on the board
        //new function to see if theboat sunk
        return savedCChoice
    } else if (cHitChoice === 3) {
        let col = savedCChoice[1];
        let row = savedCChoice[3];
        ++col;
        turnFunction = turnOptions.right;
        // chart[col][row];
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
    // console.log(cChoice1)
    cChoice2 = cChoice()
    // console.log(cChoice2)
    comId = `v${cChoice1}h${cChoice2}`
    // console.log(comId)
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
//     if (turn === 2 && turnFunction === 0) {
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