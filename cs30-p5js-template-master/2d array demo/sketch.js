// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let grid_holder;
let k = 10;



function setup() {
  createCanvas(windowWidth, windowHeight);
  grid_holder = grid_generator(10)
}

function draw() {
  let cell_width = width/grid_holder[0].length;
  let cell_height = height/grid_holder.length;
  
  background(127.5);
  noStroke()
  for (let y = 0; y<k; y++){
    for(let x = 0; x<k; x++){
      
      rect(cell_width*x, cell_height*y, cell_width, cell_height)
      collidePointRect(mouseX,mouseY,x,y,cell_width,cell_height)
      if (grid_holder[y][x]===0){
        fill("white")
      }
      else{
        fill("black")
      }
      
    }
  }
}

function keyPressed(){
  if(key === " "){
    grid_holder = grid_generator(10)
  }
}

function grid_generator(grid_size){
  let grid = [];
  for (let i = 0; i<grid_size; i++){
    grid.push([]);
    for (let j = 0; j<grid_size; j ++){
      if(random(100)<50){
        grid[i].push(0);
      }
      else{
        grid[i].push(1);
      }
    }
  }
  return grid;
}

