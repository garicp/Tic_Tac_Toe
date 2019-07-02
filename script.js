// Part 1 - Initial states
// anonymous function
window.onload = function () {
    let num;
    let box;
    let ctx;
    let turn = 1;
    let filled;
    let symbol;
    let winner;
    let gameOver = false;
    let scoreX = 0;
    let scoreO = 0;
    let resultWord = document.getElementById("result");

    // 1-dimension array
    filled = [false, false, false, false, false, false, false, false, false];
    symbol = ["", "", "", "", "", "", "", "", ""];
    // 2-dimension array
    winner = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Part 2 - New Game button ... event + function
    // create a new game click event
    let buttonNewGame = document.getElementById("new");
    buttonNewGame.addEventListener("click", newGame);

    // newGame function
    function newGame() {
        //document.location.reload();

        // Part 6 - No reload ehile starting new game
        // Have to reset all the variables and clear canvas
        resetCanvas(num);

        resultWord.innerText = "Come and play for fun!";
        resultWord.style.color = "#fff";
        resultWord.style.fontWeight = "400";
        resultWord.style.letterSpacing = "2px";
        num;
        box;
        ctx;
        turn = 1;
        filled = [false, false, false, false, false, false, false, false, false];
        symbol = ["", "", "", "", "", "", "", "", ""];
        winner;
        gameOver = false;
    }

    // clear canvas function
    function resetCanvas() {
        for (let i = 1; i <= 9; i++) {
            //let numBox = i;
            // let numString = numBox.toString();
            // The above line of code is not needed because a string + number = string. That's how concatenation works. 

            box = document.getElementById("canvas" + i);
            ctx = box.getContext("2d");
            ctx.clearRect(0, 0, 100, 100);
            ctx.beginPath();
            document.getElementById("canvas" + i).classList.remove("winning-canvas");
            document.getElementById("canvas" + i).classList.add("canvas-box");
        }
    }

    // Part 3 - Canvas click = retrieving the box's number
    // canvas click event
    document.getElementById("tic").addEventListener("click", function (event) {
        boxClick(event.target.id);
    });

    // Function for select box and winner check
    function boxClick(numId) {
        box = document.getElementById(numId);
        ctx = box.getContext("2d");

        switch (numId) {
            case "canvas1":
                num = 1;
                break;
            case "canvas2":
                num = 2;
                break;
            case "canvas3":
                num = 3;
                break;
            case "canvas4":
                num = 4;
                break;
            case "canvas5":
                num = 5;
                break;
            case "canvas6":
                num = 6;
                break;
            case "canvas7":
                num = 7;
                break;
            case "canvas8":
                num = 8;
                break;
            case "canvas9":
                num = 9;
                break;
        }

        // Part 4 - Drawing the shapes on the canvases
        if (filled[num - 1] === false) {
            if (gameOver === false) {
                if (turn % 2 !== 0) {
                    ctx.beginPath();
                    ctx.moveTo(15, 15);
                    ctx.lineTo(85, 85);
                    //-----------------
                    ctx.moveTo(85, 15);
                    ctx.lineTo(15, 85);
                    //-----------------
                    ctx.moveTo(25, 15);
                    ctx.lineTo(50, 40);
                    ctx.lineTo(75, 15);
                    //-----------------
                    ctx.moveTo(25, 85);
                    ctx.lineTo(50, 60);
                    ctx.lineTo(75, 85);
                    //-----------------
                    ctx.moveTo(15, 25);
                    ctx.lineTo(40, 50);
                    ctx.lineTo(15, 75);
                    //-----------------
                    ctx.moveTo(85, 25);
                    ctx.lineTo(60, 50);
                    ctx.lineTo(85, 75);
                    //-----------------
                    ctx.strokeStyle = "#fff";
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    ctx.closePath();
                    //-----------------
                    symbol[num - 1] = "X";
                    resultWord.innerText = "Turn for Player 'O'!";
                    resultWord.style.color = "#fff";
                } else {
                    ctx.beginPath();
                    ctx.arc(50, 50, 42.5, 0, 2 * Math.PI, false);
                    ctx.strokeStyle = "#fff";
                    ctx.stroke();
                    ctx.closePath();
                    //-----------------
                    ctx.beginPath();
                    ctx.arc(50, 50, 35.5, 0, 2 * Math.PI, false);
                    ctx.strokeStyle = "#fff";
                    ctx.stroke();
                    ctx.closePath();
                    //-----------------
                    ctx.beginPath();
                    ctx.arc(50, 50, 28.5, 0, 2 * Math.PI, false);
                    ctx.strokeStyle = "#fff";
                    ctx.stroke();
                    ctx.closePath();
                    //-----------------
                    symbol[num - 1] = "O";
                    resultWord.innerText = "Turn for Player 'X'!";
                    resultWord.style.color = "#fff";
                }
                turn++;
                filled[num - 1] = true;

                // Part 5 - Winner check
                let s = symbol[num - 1];
                for (let j = 0; j < winner.length; j++) {
                    // winner[0] = [0, 1, 2]
                    // symbol[0], symbol[1], symbol[2]
                    // and operator -  condition 1 && condition 2
                    if ((symbol[winner[j][0]] === s) && (symbol[winner[j][1]] === s) && (symbol[winner[j][2]] === s)) {
                        resultWord.innerText = "Player '" + s + "' won!";
                        resultWord.style.color = "#01ba01";
                        resultWord.style.fontWeight = "900";
                        resultWord.style.letterSpacing = "3px";

                        //document.getElementById("canvas1").classList.add("winning-canvas");

                        // Part 7 - Store winning score
                        // score variable have to be global variable
                        if (s === "X") {
                            scoreX++;
                            document.getElementById("score-x").innerText = scoreX;
                        } else {
                            scoreO++;
                            document.getElementById("score-o").innerText = scoreO;
                        }

                        // Part 8 - Hightlight the winner winning canvases
                        let winnerHighlight = [
                            winner[j][0],
                            winner[j][1],
                            winner[j][2]
                        ];

                        highlightCanvas(winnerHighlight[0], winnerHighlight[1], winnerHighlight[2]);

                        gameOver = true;
                    }
                }

                // DRAW condition
                // turn > 0 gameOver == false
                if (turn > 9 && gameOver !== true) {
                    resultWord.innerText = "GAME OVER. It was a draw!";
                    resultWord.style.color = "red";
                    resultWord.style.fontWeight = "900";
                    resultWord.style.letterSpacing = "3px";
                    gameOver = true;
                }
            } else {
                alert("Game is over. Please click the NEW GAME button to start a new game!");
            }
        } else {
            if (gameOver !== true) {
                alert("This box was already filled. Please click on another one!");
            } else {
                alert("Game is over. Please click the NEW GAME button to start a new game!");
            }

        }
    }

    // Function to select winning boxes
    function highlightCanvas(box1, box2, box3) {
        let canvasHighlight = [box1, box2, box3]
        for (i = 0; i < canvasHighlight.length; i++) {
            selectCanvas(canvasHighlight[i] + 1);
        }
    }

    // Function for box to turn green & remove hover effect after winning boxes highlighted
    function selectCanvas(num) {
        let winningBoxes = document.getElementById("canvas" + num);
        winningBoxes.classList.add("winning-canvas");
        winningBoxes.classList.remove("canvas-box");
    }

    //Part 9 - Sliding game rules
    // change to less rule button
    let buttonGameRules = document.getElementById("rules");
    buttonGameRules.addEventListener("click", gameRules);

    let gameRulesText = document.getElementById("rules-text");

    let textButtonRules;

    //sliding function
    function gameRules() {
        if (textButtonRules === "Game Rules") {
            buttonGameRules.innerText = "Hide Rules";
            buttonGameRules.style.fontWeight = "700";
            // alert("Yes");
            gameRulesText.style.opacity = 1;
            gameRulesText.style.visibility = "visible";
            gameRulesText.style.transition = "all .5s";
            textButtonRules = "Hide Rules";
        } else {
            buttonGameRules.innerText = "Game Rules";
            buttonGameRules.style.fontWeight = "700";
            //alert("No");
            gameRulesText.style.opacity = 0;
            gameRulesText.style.visibility = "hidden";
            gameRulesText.style.transition = "all .5s";
            textButtonRules = "Game Rules";
        };
    }

}