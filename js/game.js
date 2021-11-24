'use strict'
const WALL = '#'
const FOOD = '.'
const SUPER_FOOD = '♦'
const EMPTY = ' ';
const CHERRY = '🍒';

var gCherryInterval;

var gBoard;

var gGame = {
    score: 0,
    isOn: false
}

function init() {
    gBoard = buildBoard();
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    gCherryInterval = setInterval(makeCherries, 15000);
}

function resetGame() {
    gGame.score = 0;
    document.querySelector('h2 span').innerText = gGame.score
    gGhostImg = 101;
    clearInterval(gIntervalGhosts);
    gGhosts = []
    var elGameOverModal = document.querySelector('.game-over');
    elGameOverModal.hidden = true;
    gBoard = buildBoard();
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
    gCherryInterval = setInterval(makeCherries, 15000);
}

function buildBoard() {
    var SIZE = 16;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 || j === 0 || j === SIZE - 1) board[i][j] = WALL;
        }
    }
    board[1][1] = SUPER_FOOD;
    board[board.length - 2][board.length - 2] = SUPER_FOOD;
    board[1][board.length - 2] = SUPER_FOOD;
    board[board.length - 2][1] = SUPER_FOOD;

    return board;
}



function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
    // TODO: update model and dom
}

function checkVictory() {
    var foodCount = 0;
    for (var i = 1; i < gBoard.length - 1; i++) {
        for (var j = 1; j < gBoard.length - 1; j++) {
            if (gBoard[i][j] === FOOD) foodCount++
        }
    }
    if (foodCount === 1) gameOver('You Won!');
}

function gameOver(modalTxt) {
    gGame.isOn = false
    clearInterval(gIntervalGhosts);
    clearInterval(gCherryInterval);
    var elGameOverModal = document.querySelector('.game-over');
    elGameOverModal.hidden = false;
    elGameOverModal.querySelector('p').innerText = modalTxt;
}

function superMod() {
    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].img = 104;
    }
    gPacman.isSuper = true;
    setTimeout(regularMod, 5000);
}

function regularMod() {
    gPacman.isSuper = false;
    gGhostImg = 101 + gGhosts.length;
    for (var i = gGhosts.length; i < 3; i++) {
        createGhost(gBoard);
    }
    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].img = 101 + i;
    }
}

function makeCherries() {
    var emptyCells = getEmptyCells();
    var i = getRandomIntInclusive(0, emptyCells.length);
    var randomPos = emptyCells[i];
    gBoard[randomPos.i][randomPos.j] = CHERRY;
    renderCell(randomPos, CHERRY);
}

function getEmptyCells() {
    var emptyCells = [];
    for (var i = 1; i < gBoard.length - 1; i++) {
        for (var j = 1; j < gBoard[0].length - 1; j++) {
            var currCell = gBoard[i][j]
            if (currCell === ' ') {
                emptyCells.push({ i, j })
            }
        }
    }
    return emptyCells;
}
