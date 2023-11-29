// - Press play and have a board appear, it should remove the start button and pull out the players board

// - the board should be either a 10x10 or a 14x14

// - Choose a layout for my ships(Predetermined or custom) upon a grid, it should save the placement of the pieces, and upon completion a start button should light up

// - Press start and have the game start

// - Have an empty grid appear, there needs to be a hover notifier that the box is being selected before its clicked, and the cursor needs to be a giant thin plus

// - Click on an empty box and either see an explosion, or a splash, indicating success or failure. the game needa to remember the placement of the shot on the grid.

// - Have the board containing my ships appear, and watch either a splash or an explosion of my ownships as the computer plays its turn. upon hit, it needs to play its next turns either horizontaly from the initial hit, or vertically, untill it defeats the ship and reverts back to random box inputs that avoid places it has already guessed

// - Return to the enemys blank grid board, with a mark indicating my last move/moves, as to help the game progress. Repeat the inital stage for this, but showcase the previos guesses. hits and misses, with different indicators

// - Repeat this process until there is a winner

// - once a winner is found, fade to black and either say "You sunk their battleship!" or "THey sunk your battleship!"

// - Display a play again button, that resets the whole game as if it was refreshed, placing all its original values back


// Variable Declarations //

const battleship = {
    name: 'Battleship'
    value: 4,
    health: 4,
    color: 'grey',
}

const cruiserShip = {
    name: 'Cruiser Ship'
    value: 3,
    health: 3,
    color: 'grey',
}

// May tempararily make tugShip 1 with a health of 1 for game building, return to balue 2 when finished

const tugShip = {
    name: 'Tug Ship'
    value: 1,
    health: 1,
    color: 'grey',
}

const colors = {
    hit: 'red',
    miss: 'white',
}

let chart

let turn

let winner

// Dom Declirations //

const play = (e) => {
    e.target.style.backgroundColor = hit
}

const board = document.querySelectorAll('.box')

// function Statements //


function initiate() {
    board.forEach((box) => {
        box.addEventListener('click', (e)=>{play(e); console.log(e.target.id)});
    })
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
        [0, 0, 0, 0, 0, 0, 0, 0], // col 8
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
        })
    })
}

function render() {
    renderBoard()
}

// Called Functions //

initiate()

// Variable Statements //
