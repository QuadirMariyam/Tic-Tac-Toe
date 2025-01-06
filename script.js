let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGame = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-div");
let msg = document.querySelector("#msg");
let count = 0;

let turnO =  true; //if false = playerX, if ture = playerO

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            box.innerText = "O";
            box.style.color = "#FFC0CB";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "#ADD8E6";
            turnO = true;
        }
        box.disabled = true;
        count++;

        checkWinner();
    })
});


const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};


const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        count = 0;
        if(count%2 == 0) {
            document.querySelector(".box").style.color = "#005377";
        }
    }
};


const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes()
};

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != "") {
            if(pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
            } 

            if(count == 9 && [pos1, pos2, pos3] != pattern) {
                msg.innerText = `Oops! Its a tie`;
                msgContainer.classList.remove("hide");
                disableBoxes()
            }
        }
    }
};

newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);