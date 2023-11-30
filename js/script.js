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

// May tempararily make tugShip 1 with a health of 1 for game building, return to balue 2 when finished

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

let turn

let winner

// Dom Declirations //

const board = document.querySelectorAll('.box')

// function Statements //

function initiate() {
    board.forEach((box) => {
        box.addEventListener('click', (e)=>{
            play(e);
            console.log(e.target.id)
        });
    })
    pShipsLeft = 3
    cShipsLeft = 3
    turn = 1
    winner = null
    chart = [
        [0, 0, 0, 0, 0, 0, 0, 0], // col 0
        [0, 0, 0, 1, 1, 1, 1, 0], // col 1
        [0, 0, 0, 0, 0, 0, 0, 0], // col 2
        [0, 0, 0, 0, 0, 0, 0, 0], // col 3
        [0, 0, 0, 0, 0, 0, 0, 0], // col 4
        [0, 0, 0, 0, 0, 0, 0, 0], // col 5
        [0, 0, 0, 0, 0, 0, 0, 0], // col 6
        [0, 0, 0, 0, 0, 0, 0, 0], // col 7
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

function render() {
    renderBoard()

}

function play(event) {
    const boxId = event.target.id
    const col = boxId[1]
    const row = boxId[3]
    console.log(chart[col][row])
    if (chart[col][row] === 4 || chart[col][row] === 5) {
        return
    } else if (chart[col][row] === 1) {
        if (cBattleship.health >= 2) {
            cBattleship.health--;
            chart[col][row] = 5
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
                console.log(turn)
            }
        } else {
            cShipsLeft -1;
            console.log('You sunk their Battleship!');
            chart[col][row] = 5
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
                console.log(turn)
            }
        }
    } else if (chart[col][row] === 2) {
        if (cCruiserShip.health >= 2) {
            cCruiserShip.health--;
            chart[col][row] = 5
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
                console.log(turn)
            }
        } else {
            cShipsLeft -1;
            console.log('You sunk their Cruiser!');
            chart[col][row] = 5
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
                console.log(turn)
            }
        }
    } else if (chart[col][row] === 3) {
        if (cTugShip.health >= 2) {
            cTugShip.health--;
            chart[col][row] = 5
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
                console.log(turn)
            }
        } else {
            cShipsLeft -1;
            console.log('You sunk their Tug!');
            chart[col][row] = 5
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
                console.log(turn)
            }
        }
    } else {
        chart[col][row] = 4
        if (!checkWinner()) {
            changeTurn()
            console.log(turn)
        }
    }
    render()
}

function checkWinner() {
    if (pShipsLeft === 0) {
        //Need to hide the entire board
        winner = 'c'
    } else if (cShipsLeft === 0) {
        winner = 'p'
    } else {
        return false
    }
}

function changeTurn() {
    turn = turn === 1 ? 2 : 1 
}

// Called Functions //

initiate()

// Dom Statements //