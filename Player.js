const X_CLASS = 'x';
const O_CLASS = 'o';
const WINS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
let  turn;
let X_SCORE = 0;
let O_SCORE = 0;

function startGame() {
    turn = false;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handClick);
        cell.addEventListener('click', handClick, { once: true });
    });
    showHover();
}
function handClick(e) {
    const cell = e.target;
    const currentClass = turn ? O_CLASS : X_CLASS;

    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        turn ? O_SCORE++ : X_SCORE++;
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        showHover();
    }
}
function endGame(draw) {
    if(draw) {
        alert(`Draw! \n X:${X_SCORE} \n O:${O_SCORE}`);
        startGame();
    } else {
        alert(`${turn ? "O's" : "X's"} Wins! \n X : ${X_SCORE} \n O : ${O_SCORE}`);
        startGame();
    }
}
function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(O_CLASS);
    })
}
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}
function swapTurns() {
    turn = !turn;
}
function showHover() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);

    if (turn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}
function checkWin(currentClass) {
    return WINS.some(combination =>  {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

export { startGame };