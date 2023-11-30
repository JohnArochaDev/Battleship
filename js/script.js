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

let pChart

let cChart

let turn

let winner

let cChoice1// The value of the computers random choice, either for the column or the row

let cChoice2// The value of the computers random choice, either for the column or the row

let comId

// Dom Declirations //

const board = document.querySelectorAll('.box')

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
        [1, 0, 0, 0, 0, 0, 0, 0], // col 1
        [1, 0, 0, 0, 0, 0, 0, 0], // col 2
        [1, 0, 0, 0, 0, 0, 0, 0], // col 3
        [0, 0, 0, 0, 0, 0, 0, 0], // col 4
        [0, 0, 0, 0, 0, 0, 0, 0], // col 5
        [0, 0, 0, 0, 0, 0, 0, 0], // col 6
        [0, 0, 0, 0, 0, 0, 0, 0], // col 7
    ]
    //THIS WILL BE THE CHART THE PLAYER SEES HIS HITS AND MISSES ON
    cChart = [
        [0, 0, 0, 0, 0, 0, 0, 0], // col 0
        [0, 0, 0, 0, 0, 0, 0, 0], // col 1
        [0, 0, 0, 0, 0, 0, 0, 0], // col 2
        [0, 0, 0, 0, 0, 0, 0, 0], // col 3
        [0, 0, 0, 0, 0, 0, 0, 1], // col 4
        [0, 0, 0, 0, 0, 0, 0, 1], // col 5
        [0, 0, 0, 0, 0, 0, 0, 1], // col 6
        [0, 0, 0, 0, 0, 0, 0, 1], // col 7
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
    renderBoard();
    setTimeout(changeChart, 1000);
    setTimeout(renderBoard, 2000)
}

function play(event) {
    const boxId = event.target.id
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
            cCruiserShip.health--;
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
            cTugShip.health--;
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
    const col = boxId[1]
    console.log(col)
    const row = boxId[3]
    console.log(row)
    console.log(comId)
    console.log(chart[col][row])
    if (turn === !2) {
        return
    } else if (turn === 2) {
        if (chart[col][row] === 4 || chart[col][row] === 5)
        return
    }
}

cTurn()

function cChoice(min = 0, max = 9) {
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
    turn = turn === 1 ? 2 : 1 
}

function changeChart() {
    if (turn === 1) {
        chart = cChart
    } else {
        chart = pChart
    }
}
// Called Functions //

initiate()

// Dom Statements //