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

// May tempararily make tugShip 1 with a health of 1 for game building, return to value 2 when finished

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

let pShipsLeft = 3

let cShipsLeft = 3

let chart

let cChart

// let pChart Maybe use later

let turn

let winner

let cChoice1// The value of the computers random choice, either for the column or the row

let cChoice2// The value of the computers random choice, either for the column or the row

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
        [0, 0, 1, 1, 1, 1, 0, 0], // col 1
        [0, 0, 0, 0, 0, 0, 0, 0], // col 2
        [0, 0, 0, 0, 0, 0, 0, 0], // col 3
        [0, 0, 0, 2, 0, 0, 0, 0], // col 4
        [0, 0, 0, 2, 0, 0, 0, 0], // col 5
        [0, 0, 0, 2, 0, 0, 0, 0], // col 6
        [3, 3, 0, 0, 0, 0, 0, 0], // col 7
    ]
    // THIS WILL BE THE CHART THAT THE PLAYER SEES HIS BOATS ON
    // pChart = [
    //     [1, 0, 0, 0, 0, 0, 0, 0], // col 0
    //     [1, 0, 0, 0, 0, 0, 0, 0], // col 1
    //     [1, 0, 0, 0, 0, 0, 0, 0], // col 2
    //     [1, 0, 0, 0, 0, 0, 0, 0], // col 3
    //     [0, 0, 0, 0, 0, 0, 0, 0], // col 4
    //     [0, 0, 0, 0, 0, 0, 0, 0], // col 5
    //     [0, 0, 0, 0, 0, 0, 0, 0], // col 6
    //     [0, 0, 0, 0, 0, 0, 0, 0], // col 7
    // ]
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
        // console.log('colArr', colArr)
        // console.log('colIdx', colIdx)
        colArr.forEach((cellVal, rowIdx) => {
            // console.log('cellVal', cellVal)
            // console.log('rowIdx', rowIdx)
            const cellId = `v${colIdx}h${rowIdx}`
            // console.log('cellId', cellId)
            const cellEl = document.getElementById(cellId)
            // console.log('cellEl', cellEl)
            cellEl.style.backgroundColor = colors[cellVal]
        })
    })
}

function renderCBoard() {
    cChart.forEach((colArr, colIdx) => {
        // console.log('colArr', colArr)
        // console.log('colIdx', colIdx)
        colArr.forEach((cellVal, rowIdx) => {
            // console.log('cellVal', cellVal)
            // console.log('rowIdx', rowIdx)
            const cellId = `c${colIdx}r${rowIdx}`
            // console.log('cellId', cellId)
            const cellEl = document.getElementById(cellId)
            // console.log('cellEl', cellEl)
            cellEl.style.backgroundColor = colors[cellVal]
        })
    })
}

function render() {
    renderBoard();
    renderCBoard()
    // setTimeout(changeChart, 1000); USE LATER WHEN WORKING
    // setTimeout(renderBoard, 2000)
}

function play(event) {
    if (turn === 2) {
        return
    }
    //                                                       If turn !1 NO MOVEMENT WILL WORK
    console.log('turn:' + turn)
    const boxId = event.target.id
    // console.log(boxId)
    const col = boxId[1]
    const row = boxId[3]
    // console.log(chart[col][row])
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
    console.log('Computer turn')
    cptrId()
    const boxId = comId
    const col = boxId[1]
    // console.log(col)
    const row = boxId[3]
    // console.log(row)
    console.log('Computr ID: ' + comId)
    console.log(cChart[col][row])
    if (turn === 1) {
        return
    } else if (turn === 2) {
        if (cChart[col][row] === 4 || cChart[col][row] === 5)
        return retry()
    } else if (cChart[col][row] === 1) {
        if (pBattleship.health >= 2) {
            --pBattleship.health;
            cChart[col][row] = 5
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        } else {
            --pShipsLeft;
            console.log('They sunk your Battleship!');
            // console.log(pShipsLeft);
            cChart[col][row] = 5
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        }
    } else if (cChart[col][row] === 2) {
        if (pCruiserShip.health >= 2) {
            --pCruiserShip.health;
            cChart[col][row] = 5
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        } else {
            --pShipsLeft;
            console.log('They sunk your Cruiser!');
            // console.log(pShipsLeft);
            cChart[col][row] = 5
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        }
    } else if (cChart[col][row] === 3) {
        if (pTugShip.health >= 2) {
            --pTugShip.health;
            cChart[col][row] = 5
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        } else {
            --pShipsLeft;
            console.log('They sunk your Tug!');
            cChart[col][row] = 5
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        }
    } else {
        cChart[col][row] = 4
        if (!checkWinner()) {
            changeTurn()
        }
    }
    console.log('turn:' + turn)
    render()
}

function retry() {
    if (turn === 2) {
        cTurn()
    }
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
    comId = `c${cChoice1}r${cChoice2}`
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
    if (turn === 2) {
        cTurn()
    }
}
// Use this later!
// function changeChart() {
//     if (turn === 1) {
//         chart = cChart
//     } else {
//         chart = pChart
//     }
// }

// Called Functions //

initiate()

// Dom Statements //




// SOUND EFFECTS FOR LATER// 



// EXPLOSION https://www.youtube.com/watch?v=YRex1Udiybs

//MISS https://www.youtube.com/watch?v=xHN3zSp6Ggg

// background noise potentally https://www.youtube.com/watch?v=FWdnm3CHato