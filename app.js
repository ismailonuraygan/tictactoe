const boxes = document.querySelectorAll(".box");
const playerTurn = document.getElementById("playerTurn");
const fail = document.getElementById("fail");

let player = "X";
let winner;
let gameFinished = false 

function startGame() {
    playerTurn.textContent = `${player}'s Turn!`

    boxes.forEach((box)=> {
        box.addEventListener("click", () => markArea(box))
    })
}

function markArea(box) {
    if(box.textContent === ""){
        box.textContent = player
        nextTurn()
    }else {
        fail.textContent= "This box not empty!"
        box.style.border = "3px solid red"
        setTimeout(()=> {
            box.style.border = "1px solid black"
            fail.textContent= ""
        }, 1500)
    }
    checkWin()
    checkTie()
    if(gameFinished) {
        playerTurn.textContent = `Game is over, ${winner} won`
        boxes.forEach( box => box.style.pointerEvents = "none" )
        document.body.style.backgroundColor = "green"
    }
}

function nextTurn() {
    if(player == "X" ) {
        player = "O"
        playerTurn.textContent = `${player}'s Turn!`
        return
    }else if(player = "O"){
        player = "X"
        playerTurn.textContent = `${player}'s Turn!`
    }
}

function checkWin() {
    checkRows()
    checkColumn()
    checkDiag()
}

function checkTie() {
    const values = [];
    boxes.forEach((box)=> values.push(box.textContent))
    console.log(values);
    if(!values.includes("")){
        playerTurn.textContent = "Tie!"
        boxes.forEach( box => box.style.pointerEvents = "none" )
    }
}

function checkRows() {
    let row1 = boxes[0].textContent !== "" && boxes[0].textContent == boxes[1].textContent && boxes[0].textContent == boxes[2].textContent
    let row2 = boxes[3].textContent !== "" && boxes[3].textContent == boxes[4].textContent && boxes[3].textContent == boxes[5].textContent
    let row3 = boxes[6].textContent !== "" && boxes[6].textContent == boxes[7].textContent && boxes[6].textContent == boxes[8].textContent

    if(row1 || row2 || row3) {
        gameFinished = true
    }
    if(row1) return winner = boxes[0].textContent
    if(row2) return winner = boxes[3].textContent
    if(row3) return winner = boxes[6].textContent
}

function checkColumn() {
    let column1 = boxes[0].textContent !== "" && boxes[0].textContent == boxes[3].textContent && boxes[0].textContent == boxes[6].textContent
    let column2 = boxes[1].textContent !== "" && boxes[1].textContent == boxes[4].textContent && boxes[1].textContent == boxes[7].textContent
    let column3 = boxes[2].textContent !== "" && boxes[2].textContent == boxes[5].textContent && boxes[2].textContent == boxes[8].textContent
    if(column1 || column2 || column3) {
        gameFinished = true
    }
    if(column1) return winner = boxes[0].textContent
    if(column2) return winner = boxes[1].textContent
    if(column3) return winner = boxes[2].textContent
}

function checkDiag() {
    let diag1 = boxes[0].textContent !== "" && boxes[0].textContent == boxes[4].textContent && boxes[0].textContent == boxes[8].textContent
    let diag2 = boxes[2].textContent !== "" && boxes[2].textContent == boxes[4].textContent && boxes[2].textContent == boxes[6].textContent
    if(diag1 || diag2) {
        gameFinished = true
    }
    if(diag1) return winner = boxes[0].textContent
    if(diag2) return winner = boxes[2].textContent
}

startGame()
