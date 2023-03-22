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

let cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
let selection;
let difficulty;
let YOUR_SCORE = 0;
let COMPUTER_SCORE = 0;

function initialGame() {
    const selectDifficulty = prompt("Select difficulty: \n 1. Easy \n 2. Medium \n 3. Hard");
    chooseDifficulty(selectDifficulty);
    const selectMark = prompt("Choose your mark: \n 1. X \n 2. O");
    chooseMark(selectMark);
    startGame();
}

function startGame() {
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handClick);
        cell.addEventListener('click', handClick, { once: true });
    });
    showHover();
}

function chooseMark(select) {
    select == 1 ? selection = X_CLASS : select == 2 ? selection = O_CLASS : 
    (alert('Invalid Input'), initialGame());
}

function chooseDifficulty(difficultyLevel) {
    difficultyLevel == 1 ? difficulty = 'easy' :
    difficultyLevel == 2 ? (difficulty = 'medium', 
        alert('Medium level is currently Under Mentainance.'), 
        initialGame()) :
    difficultyLevel == 3 ? difficulty = 'hard' :
    (alert('Invalid Input'), initialGame());
}

function showHover() {
    board.classList.add(selection);
}

function handClick(e) {
    const cell = e.target;
    const computerSelection = selection == X_CLASS ? O_CLASS : X_CLASS;
 
    placeMark(cell, selection);
    if (checkWin(selection)) {
        YOUR_SCORE++;
        endGame('player');
    } else if (isDraw()) {
        endGame('draw');
    } else {
        computerMove(computerSelection, difficulty, selection);
        showHover();
    }
}

function placeMark(cell, selection) {
    cell.classList.add(selection);
}

function computerMove(computerSelection, difficulty, selection) {
    let EMPTY_CELLS = checkEmptyCells();

    if(difficulty == 'easy') {
        let random = Math.floor(Math.random() * EMPTY_CELLS.length);
        var value = EMPTY_CELLS[random];
    } else if(difficulty == 'medium') {

    } else if (difficulty == 'hard') {
       var value = minimax(EMPTY_CELLS, computerSelection, selection);
       console.log(value);
    } else {
        initialGame();
    }

    cells[value].classList.add(computerSelection);
    cells[value].removeEventListener('click', handClick);
    
    if(checkWin(computerSelection)) {
        COMPUTER_SCORE++;
        endGame('computer');
    }
}

function minimax(emptyCells, player, computerSelection, selection) {
    if( checkWin(computerSelection) ) return { evaluation : +10 };
    if( checkWin(selection)         ) return { evaluation : -10 };
    if( isDraw()                    ) return { evaluation : 0 };

    let EMPTY_SPACES = emptyCells;
    console.log(EMPTY_SPACES);
    let  moves = [];

    //loop for empty spaces then evaluate
    for(let i = 0; i < EMPTY_SPACES.length; i++) {
        let id = EMPTY_SPACES[i];
        let  backup = cells[id];

        // cells[id] = player;

        let move = {};
        move.id  = id;

        if(player == computerSelection) {
            move.evaluation =  minimax(emptyCells, selection).evaluation;
        } else {
            move.evaluation = minimax(emptyCells, computerSelection).evaluation;
        }
        // cells[id] = backup;
        moves.push(move);  
    }

    let bestMove;

    if(player == computerSelection) {
        //MAXIMIZER
        let bestEvaluation = -Infinity;
        for(let i = 0; i < moves.length; i++) {
            if(moves[i].evaluation > bestEvaluation) {
                bestEvaluation =  moves[i].evaluation;
                bestMove = moves[i];
            }
        }
    } else {
        //MINIMIZER
        let  bestEvaluation = +Infinity;
        for(let i = 0; i < moves.length; i++) {
            if(moves[i].evaluation < bestEvaluation) {
                bestEvaluation =  moves[i].evaluation;
                bestMove = moves[i];
            }
        }
    }

    return bestMove;
}

function checkEmptyCells() {
    let EMPTY = [];

    for (let i = 0; i < cells.length; i++) {
        if(!cells[i].classList.contains(X_CLASS)) {
            if(!cells[i].classList.contains(O_CLASS)){
                EMPTY.push(i);
            }
        }
    }
    return EMPTY;
}

function checkWin(currentClass) {
    return WINS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(O_CLASS);
    });
}

function endGame(result) {
    if(result == "draw") {
        alert(`Draw! \n Your Score:${YOUR_SCORE} \n Computer:${COMPUTER_SCORE}`);
        startGame();
    } else if(result == "player"){
        alert(`You Win! \n Your Score: ${YOUR_SCORE} \n Computer: ${COMPUTER_SCORE}`);
        startGame();
    } else {
        alert(`You Lose! \n Your Score: ${YOUR_SCORE} \n Computer: ${COMPUTER_SCORE}`);
        startGame();
    }
}

export { initialGame }


// Saturday,  December  18, 2021 @7:03PM
// I just finished Coding the "Easy" AI!!

/*
    2 days ago, typhoon Odette strikes our place.
    Wala kaming kuryente until now.
    Luckily, katapat lang ng bahay namin ang factory ng tempura
    and nakicharge kami kanina sa genrator nila.
    So ayon, na charge na laptop ko.
    Nag start ako code kanina mga 5:30pm para tapusin ko yung
    "easy" na AI. I did not expect na matatapos ko today kasi
    dati nung may kuryente pa, kahit may google at nanonood ako
    ng mga tutorials, di ko parin matapos code ko. But now, kung
    kailan walang internet at kuryente, tsaka ko pa na solve ang code.

    So yea!! I am very happy right now. 

    I'm excited to share this with you all, pero di ko pa alam kelan
    pa ako makapag connect sa internet. So if na post ko na to in any
    social media platform, that means restored na internet at electricity
    connections namin. 

    So yun lang, pin ko lang tong moment nato kasi apakasaya ko AHHAAHAHA
*/
