const cells = document.querySelectorAll(".cell")
const statusText = document.querySelector("#statusText")
const restart = document.querySelector("#restart")
const undo = document.querySelector("#undo");
const winConditions = [
    [0,1,2],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [3,4,5],
    [6,7,8],
    [6,4,2]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
let history = [];

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click",cellClicked));
    undo.addEventListener("click", undoMove);
    restart.addEventListener("click",restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true ;
}

function cellClicked(){
    const cellIndex =this.getAttribute("cellIndex");

    if (options[cellIndex] !== "" || !running){
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell (cell,index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    history.push({ index, player: currentPlayer });
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;

    for (let i=0; i< winConditions.length;i++){
        const condition =winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == ""){
        continue;
    } 
    if (cellA == cellB && cellB == cellC){
        roundWon = true;
        break
    }
}
    if (roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        statusText.style.fontSize = "4em";
        running = false;
    }
    else if (!options.includes("")){
        statusText.textContent = `Draw!`;
        statusText.style.fontSize = "4em";
        running = false;
    }
    else{
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    history = [];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    statusText.style.fontSize = "2em";
    running = true;
}

function undoMove() {
    if (!history.length || !running) {
        return;
    }
    const lastMove = history.pop();
    options[lastMove.index] = "";
    cells[lastMove.index].textContent = "";
    currentPlayer = lastMove.player;
    statusText.textContent = `${currentPlayer}'s turn`;
}


initializeGame();