const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

// Constantes de click para el movimiento del jugador para que se pueda mover dentro del videojuego :3

const buttonUp = document.querySelector("#up")
const buttonDown = document.querySelector("#down")
const buttonLeft = document.querySelector("#left")
const buttonRight = document.querySelector("#right")

let canvasSize
let elementsSize
let playerPosition = {
  x: undefined,
  y: undefined
}


window.addEventListener("load", setCanvasSize)
window.addEventListener("resize", setCanvasSize)

function setCanvasSize() {
  if(window.innerWidth > window.innerHeight) {
    canvasSize = window.innerHeight * 0.8;
  } else {
    canvasSize = window.innerWidth * 0.8;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);
  
   elementsSize  = canvasSize / 10;
   startGame()
}

function startGame() {
  console.log({canvasSize, elementsSize});
  
  game.font = elementsSize + "px Verdana"
  game.textAlign = "end"

  const map = maps[2];
  const mapRows = map.trim().split("\n")
  const mapRowCols = mapRows.map(row => row.trim().split(""))
  
  game.clearRect(0,0, canvasSize, canvasSize);

  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const positionX = elementsSize * (colI + 1);
      const positionY = elementsSize * (rowI + 1)
      game.fillText(emoji, positionX, positionY)
        
    if(col == "O") {
      if (!playerPosition.x && !playerPosition.y) {
      playerPosition.x = positionX
      playerPosition.y = positionY
      console.log({playerPosition});
      }
      
    }
    });

  });
  movePlayer();
}

  function movePlayer() {
     game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
  }

window.addEventListener("keydown", (e) => {
  let tecla = e.key;

  switch (tecla) {
    case "ArrowUp":
        moveUp(); 
      break;
    case "ArrowDown":
        moveDown();
        break;
    case "ArrowRight":
      moveRight();
        break;
      case "ArrowLeft":
        moveLeft();
      break;
      default:
      break;
  }
});



buttonUp.addEventListener("click", moveUp);
buttonDown.addEventListener("click", moveDown);
buttonRight.addEventListener("click", moveRight);
buttonLeft.addEventListener("click", moveLeft);



function moveUp() {
  console.log("Me quiero mover hacia arriba");

  if((playerPosition.y - elementsSize) < 0) {
    console.log("OUT");
  } else {
    playerPosition.y -= elementsSize
    startGame()
  }
}

function moveDown() {
  console.log("Me quiero mover hacia abajo");
  playerPosition.y += elementsSize
  if (withInTheMargin()) {
    startGame()
  } else {
    playerPosition.y -= elementsSize
  }

}

function moveRight() {
  console.log("Me quiero mover hacia la derecha"); 
  playerPosition.x += elementsSize
  if (withInTheMargin()) {
    startGame()
  } else {
    playerPosition.x -= elementsSize
  }
  
}

function moveLeft() {
  console.log("Me quiero mover hacia la izquierda"); 
  playerPosition.x -= elementsSize
  if (withInTheMargin()) {
    startGame()
  } else {
    playerPosition.x += elementsSize
  }
}

