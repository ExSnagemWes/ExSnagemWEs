// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
const sudoku = [[5,3,0,0,7,0,0,0,0],
              [6,0,0,1,9,5,0,0,0],
              [0,9,8,0,0,0,0,6,0],
              [8,0,0,0,6,0,0,0,3],
              [4,0,0,8,0,3,0,0,1],
              [7,0,0,0,2,0,0,0,5],
              [0,6,0,0,0,0,2,8,0],
              [0,0,0,4,1,9,0,0,5],
              [0,0,0,0,8,0,0,7,9]];

const backup = [[5,3,0,0,7,0,0,0,0],
              [6,0,0,1,9,5,0,0,0],
              [0,9,8,0,0,0,0,6,0],
              [8,0,0,0,6,0,0,0,3],
              [4,0,0,8,0,3,0,0,1],
              [7,0,0,0,2,0,0,0,5],
              [0,6,0,0,0,0,2,8,0],
              [0,0,0,4,1,9,0,0,5],
              [0,0,0,0,8,0,0,7,9]];
const GRIDBIG = sudoku.length
let cell_size;


function setup() {
  createCanvas(windowWidth, windowHeight);
if (width < height){
  cell_size = width/GRIDBIG
}
else{
  cell_size = height/GRIDBIG
}
  
}

function draw() {
  background(220);
  display_grid();
  strokeWeight(5)
  line(0, cell_size*3, cell_size*GRIDBIG, cell_size*3);
  line(0, cell_size*6, cell_size*GRIDBIG, cell_size*6);
  line(cell_size*3, 0, cell_size*3, cell_size*GRIDBIG);
  line(cell_size*6, 0, cell_size*6, cell_size*GRIDBIG);
  line(cell_size*9, 0, cell_size*9, cell_size*GRIDBIG);
  line(0, cell_size*9, cell_size*GRIDBIG, cell_size*9);
}

function display_grid(){
  //let temp_grid = []
  for (let y = 0; y < GRIDBIG; y++){
    for (let x = 0; x < GRIDBIG; x++){
      strokeWeight(1)
      fill("white")

      rect(cell_size*x, cell_size*y, cell_size, cell_size)
      if (sudoku[y][x] !== 0){
        fill("red")
        textAlign(RIGHT, BOTTOM)
        textFont("courier new")
        //textStyle("bold")
        textSize(cell_size)
        text(sudoku[y][x], (cell_size*x)+cell_size, (cell_size*y)+cell_size)
      }
    }
  }

}

function mousePressed(){
  let cell_x = floor(mouseX/cell_size)
  let cell_y = floor(mouseY/cell_size)
  
  change_cell(cell_y, cell_x);
}

function change_cell(cell_y, cell_x){
 
}
  if ((sudoku[cell_y][cell_x] !== backup[cell_y][cell_x])|| (sudoku[cell_y][cell_x] === 0)){
    sudoku[cell_y][cell_x] = (sudoku[cell_y][cell_x] +1)%10
}