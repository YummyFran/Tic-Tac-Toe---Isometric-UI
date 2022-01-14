import * as Player from "./classes/Player.js";
import * as Computer from "./classes/Computer.js";

const selectMode = () => {
    const select = prompt("Play Against: \n 1. Human \n 2. Computer");

    (select == 1) ? Player.startGame() : (select == 2) ? Computer.initialGame() :
        (alert("Invalid Input!"), selectMode());
}

selectMode();   