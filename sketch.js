let grid;
let score = 0;

function setup() {
  createCanvas(400, 400);
  noLoop();
  grid = blankGrid();
  addNumber();
  addNumber();
  updateCanvas();
}

// one "move"
function keyPressed() {
  console.log(keyCode);
  let flipped = false;
  let rotated = false;
  let played = true;
  if (keyCode === DOWN_ARROW) {
// do nothing
  } else if (keyCode === UP_ARROW) {
    grid = flipGrid(grid);
    flipped = true;
  } else if (keyCode === RIGHT_ARROW) {
    grid = rotateGrid(grid);
    rotated = true;
  } else if (keyCode === LEFT_ARROW) {
    grid = rotateGrid(grid);
    grid = flipGrid(grid);
    rotated = true;
    flipped = true;
  } else {
    played = false;
  }


  if (played) {
    let past = copyGrid(grid);
    for (let i = 0; i < 4; i++) {
      grid[i] = operate(grid[i]);
   }
    let changed = compare(past, grid);

    if (flipped) {
      grid = flipGrid(grid);
    }

    if (rotated) {
      grid = rotateGrid(grid);
      grid = rotateGrid(grid);
      grid = rotateGrid(grid);
    }

    if (changed) {
      addNumber();
    }
    updateCanvas();

    let gameover = isGameOver();
    if (gameover) {
      console.log("GAME OVER");
    }

    let gamewon = isGameWon();
    if (gamewon) {
      console.log("Game Won!");
    }
  }
}

function updateCanvas() {
  background(255);
  drawGrid();
  select("#score").html(score);
}

function drawGrid() {
  let w = 100;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      noFill();
      strokeWeight(2);
      let val = grid[i][j];
      let s = val.toString();
      stroke(0);
      if (val != 0) {
        fill(colorSize[s].color);
      } else {
        noFill();
      }
      rect(i*w, j*w, w, w);
      if (val !== 0) {
        textAlign(CENTER, CENTER);
        noStroke();
        fill(0);
        textSize(colorSize[s].size);
        text(val, i * w + w / 2, j * w + w / 2);
      }
    }
  }
}