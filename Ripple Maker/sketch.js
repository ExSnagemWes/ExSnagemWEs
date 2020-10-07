// 2d Array Demo

let grid;
let cellWidth;
let cellHeight;
const GRIDSIZE = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateRandomGrid(10);
  cellWidth = width / grid[0].length;
  cellHeight = height / grid.length;
}

function draw() {
  background(220);
  displayGrid();
}

function mousePressed() {
  let cellX = floor(mouseX / cellWidth);
  let cellY = floor(mouseY / cellHeight);

  // console.log(cellX, cellY);
  if (grid[cellY][cellX] === 0) {
    grid[cellY][cellX] = 1;
  }
  else {
    grid[cellY][cellX] = 0;
  }
}

function keyPressed() {
  if (key === " ") {
    grid = generateRandomGrid(GRIDSIZE);
  }
  if (key === "c"){
    grid = generateEmptyGrid(GRIDSIZE);
  }
}

function displayGrid() {
  for (let y=0; y<grid.length; y++) {
    for (let x=0; x<grid[y].length; x++) {
      if (grid[y][x] === 0) {
        fill("black");
      }
      else {
        fill("white");
      }

      rect(cellWidth*x, cellHeight*y, cellWidth, cellHeight);
    }
  }
}


function generateRandomGrid(gridSize) {
  let grid = [];
  for (let i=0; i<gridSize; i++) {
    grid.push([]);
    for (let j=0; j<gridSize; j++) {
      if (random(100) < 50) {
        grid[i].push(0);
      }
      else {
        grid[i].push(1);
      }
    }
  }
  return grid;
}

function generateEmptyGrid(gridSize) {
  let grid = [];
  for (let i=0; i<gridSize; i++) {
    grid.push([]);
    for (let j=0; j<gridSize; j++) {
      grid[i].push(1);
    }
  }
  return grid;
}

//Inverts cell (IF within established grid)
function toggleCell(cellX, cellY) {
  if (cellX >= 0 && cellX < GRIDSIZE && cellY >= 0 && cellY < GRIDSIZE) {
    if (grid[cellY][cellX] === 0) {
      grid[cellY][cellX] = 1;
    }
    else {
      grid[cellY][cellX] = 0;
    }
  }
}


for (let y=0; y<GRIDSIZE; y++) {
  for (let x=0; x<GRIDSIZE; x++) {
    

    //checks square around starting point
    for (let i=-1; i<=1; i++) {
      for (let j=-1; j<=1; j++) {
        if (y+i >= 0 && y+i < GRIDSIZE && x+j >=0 && x+j < GRIDSIZE) {
          //
        }
      }
    } 

    
    
    }
  }