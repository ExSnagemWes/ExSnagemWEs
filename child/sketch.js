// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let sudoku, backup ;
let GRIDBIG = 9

let cell_size;

function preload(){
  sudoku = loadStrings("assets/1.txt")
  backup = loadStrings("assets/1.txt")
  GRIDBIG = sudoku.length;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i<sudoku.length; i++){
    sudoku[i] = sudoku[i].split(",");
    backup[i] = backup[i].split(",");
  }
  // for(let y = 0; y< GRIDBIG; y++){
  //   for(let x = 0; x< GRIDBIG; x++){
  //     sudoku[y][x] = int(sudoku[y][x])
  //     backup[y][x] = int(backup[y][x])
  //   }
  // }

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

function change_cell(sell_y, sell_x){
  if ((sudoku[sell_y][sell_x] !== backup[sell_y][sell_x])|| (sudoku[sell_y][sell_x] === 0)){
    sudoku[sell_y][sell_x] = (sudoku[sell_y][sell_x] +1)%10
}
}