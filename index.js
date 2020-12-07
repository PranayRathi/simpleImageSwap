let players = [];
let turn = 0;
let gameover = false;
let board = [];

const startgame = () => {
  let input1 = document.getElementById("p1");
  let input2 = document.getElementById("p2");
  let startbutton = document.getElementById("game-start");
  let IPsize = document.getElementById("size");

  let size = parseInt(IPsize.value);
  if (size < 3 || size > 100 || isNaN(size)) {
    alert(
      "please fill the neccessary details and This game range is in between 3 and 100"
    );
    return;
  }
  let player1 = input1.value,
    player2 = input2.value;
  if (isEmpty(player1) || isEmpty(player2)) {
    alert("Player name is required..!!");
    return;
  }
  input1.setAttribute("disabled", true);
  input2.setAttribute("disabled", true);
  startbutton.setAttribute("disabled", true);
  IPsize.setAttribute("disabled", true);

  let gamecontainer = document.getElementById("game-container");

  for (let i = 0; i < size; i++) {
    let arr = [];
    let row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < size; j++) {
      arr.push("");
      let cell = document.createElement("div");
      cell.className = "cell";
      cell.setAttribute("onclick", "handleClick(this)");
      cell.setAttribute("id", i.toString() + j.toString());

      row.appendChild(cell);
    }
    board.push(arr);
    gamecontainer.appendChild(row);
  }
  gamecontainer.classList.remove("hide");
  players.push(player1);
  players.push(player2);
  document.getElementById("turn").innerHTML = players[turn % 2] + "'s turn";
  document.getElementById("down").classList.add("hide");
};
const isEmpty = (value) => !value || !value.trim();
//console.log(size);
const handleClick = (el) => {
  if (el.innerHTML !== "" || gameover) {
    return;
  }

  let id = el.id.split("");
  let i = parseInt(id[0]);
  let j = parseInt(id[1]);
  board[i][j] = turn % 2 === 0 ? "X" : "O";
  el.innerHTML = board[i][j];
  if (calculateWinner(i, j)) {
    alert(players[turn % 2] + " Won the game..!!");
    gameover = true;
    document.getElementById("down").classList.remove("hide");
    return;
  }
  turn++;
  if (turn === board.length * board.length) {
    gameover = true;
    alert("Game is Drawn..!");
    document.getElementById("down").classList.remove("hide");
    return;
  }
  document.getElementById("turn").innerHTML = players[turn % 2] + "'s turn";
};
const calculateWinner = (i, j) => {
  if (board[i][j] === "") {
    return false;
  }
  let currelement = board[i][j];
  let won = true;
  //check column
  for (let k = 0; k < board.length; k++) {
    if (board[i][k] !== currelement) {
      won = false;
      break;
    }
  }
  if (won === true) {
    return true;
  }
  //check for row
  won = true;
  for (let k = 0; k < board.length; k++) {
    if (board[k][j] !== currelement) {
      won = false;
      break;
    }
  }
  if (won === true) {
    return true;
  }
  //chech diagonally
  won = true;
  if (i === j) {
    for (let k = 0; k < board.length; k++) {
      let l = k;
      if (board[k][l] !== currelement) {
        won = false;
        break;
      }
    }
    if (won === true) {
      return true;
    }
  }
  //check oppo diagonal
  won = true;
  if (i + j === board.length - 1) {
    for (let k = 0; k < board.length; k++) {
      let l = board.length - 1 - k;
      if (board[l][k] !== currelement) {
        won = false;
        break;
      }
    }
    if (won === true) {
      return true;
    }
  }
  return false;
};

const newGame = () => {
  //document.getElementById('status_main').setAttribute('class', 'hide');
  let el = document.getElementById("game-container");
  el.innerHTML = "<div id='turn'></div>";
  //el.setAttribute("id", "hide");

  turn = 0;
  gameover = false;
  startgame();
  if (el.innerHTML === "") {
    //continue; //break;
    console.log("0");
  }
  //document.getElementById("centerBody").classList.remove("hide");
};
