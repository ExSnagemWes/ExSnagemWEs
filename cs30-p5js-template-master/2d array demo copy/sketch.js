// 2d Array Demo

let grid;
let cellWidth;
let cellHeight;
const GRID_SIZE =4;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateEmptyGrid(GRID_SIZE);
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
  grid[cellY][cellX] *= -1
  toggle(cellY-1, cellX);
  toggle(cellY+1, cellX);
  toggle(cellY, cellX-1);
  toggle(cellY, cellX+1);
}

function toggle(cellX, cellY){
  if (cellX >= 0 && cellX < GRID_SIZE && cellY >= 0 && cellY < GRID_SIZE  ){
    grid[cellY][(cellX+1)] *= -1}
}
function keyPressed() {
  if (key === " ") {
    grid = generateRandomGrid(GRID_SIZE);
  }
}

function displayGrid() {
  for (let y=0; y<grid.length; y++) {
    for (let x=0; x<grid[y].length; x++) {
      if (grid[y][x] === 1) {
        fill("black");
      }
      else {
        fill("white");
      }

      rect(cellWidth*x, cellHeight*y, cellWidth, cellHeight);
    }
  }
}


function generateEmptyGrid(gridSize) {
  let grid = [];
  for (let i=0; i<gridSize; i++) {
    grid.push([]);
    for (let j=0; j<gridSize; j++) {
      grid[i].push(-1);
      }
    }
  return grid;
}

