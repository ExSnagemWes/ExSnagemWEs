


let map, MAPX, MAPY, tile_size, wes_front, wes_back, wes_left, wes_right, grass, tall_grass, ledge, ledge_left, ledge_right, ledge_right_corner, ledge_right_middle, ledge_right_top, big_tree_bottom_left, big_tree_bottom_right, big_tree_middle_left, big_tree_middle_right, big_tree_top_left, big_tree_top_right, water_bottom, water, water_center_left, water_center_right, water_top_left, water_top_middle, water_top_right, tree_bottom, tree_top;
//lot of variables that need to be created yet are unusable at this point
let playerX = 6;
let playerY = 5;
let player_faces = "down";
let frame = 0;
let flower_frame = 0;

function preload() { 
  // Loads all files used in the program before usage to prevent potential future issues with loading and callbacks, setting them to the blank variables listed above
  map = loadStrings("tiles/map_1.txt");
  col_map = loadStrings("tiles/map_1_collision.txt")
  wes_front = [loadImage("sprites/wes_ow_front.png"), loadImage("sprites/wes_ow_front_1.png"),loadImage("sprites/wes_ow_front.png"), loadImage("sprites/wes_ow_front_2.png")];
  wes_back = [loadImage("sprites/wes_ow_back.png"), loadImage("sprites/wes_ow_back_1.png"),loadImage("sprites/wes_ow_back.png"), loadImage("sprites/wes_ow_back_2.png")]
  wes_left = [loadImage("sprites/wes_ow_left.png"), loadImage("sprites/wes_ow_left_1.png")]
  wes_right = [loadImage("sprites/wes_ow_right.png"), loadImage("sprites/wes_ow_right_1.png")]
  grass = loadImage("tiles/grass.png");
  tall_grass = loadImage("tiles/tall_grass.png");
  grass_layer = loadImage("tiles/grass_layer.png")
  ledge = loadImage("tiles/ledge_center.png");
  ledge_left = loadImage("tiles/ledge_left.png");
  ledge_right = loadImage("tiles/ledge_right.png");
  ledge_right_corner = loadImage("tiles/ledge_right_corner.png");
  ledge_right_middle = loadImage("tiles/ledge_right_middle.png");
  ledge_right_top = loadImage("tiles/ledge_right_top.png");
  big_tree_bottom_left = loadImage("tiles/big_tree_bottom_left.png");
  big_tree_bottom_right = loadImage("tiles/big_tree_bottom_right.png");
  big_tree_middle_left = loadImage("tiles/big_tree_middle_left.png");
  big_tree_middle_right = loadImage("tiles/big_tree_middle_right.png");
  big_tree_top_left = loadImage("tiles/big_tree_top_left.png");
  big_tree_top_right = loadImage("tiles/big_tree_top_right.png");
  water = loadImage("tiles/water.png");
  water_bottom = loadImage("tiles/water_bottom.png");
  water_center_left = loadImage("tiles/water_center_left.png");
  water_center_right = loadImage("tiles/water_center_right.png");
  water_top_left = loadImage("tiles/water_top_left.png");
  water_top_middle = loadImage("tiles/water_top_middle.png");
  tree_top = loadImage("tiles/tree_top.png");
  tree_bottom = loadImage("tiles/tree_bottom.png");
  flowers = [loadImage("tiles/flowers.png"), loadImage("tiles/flowers_1.png"), loadImage("tiles/flowers_2.png"), loadImage("tiles/flowers_3.png")];

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(10)
  // converts string list to tileset
  for (let i=0; i<map.length; i++) {
    map[i] = map[i].split(",");
    col_map[i] = col_map[i].split(",");

    
  }
  //defines the length and width of the grid
  MAPY = map[0].length; //16
  MAPX = map.length; //12


  //loop through the whole tileset, turning the stings into more usable numeric values
  for (let x=0; x<MAPX; x++) {
    for (let y=0; y<MAPY; y++) {
      map[x][y] = int(map[x][y]);
      col_map[x][y] = int(col_map[x][y]);
      
    }
  }
  if (width < height) {
    tile_size = width / MAPY;
  }
  else {
    tile_size = height / MAPX;
  }
}

function draw() {
  background(255);
  displayGrid();
  displayPlayer();
}

function displayGrid() {
  //squares and numbers
  for (let y=0; y<MAPY; y++) {
    for (let x=0; x<MAPX; x++) {
      //Displays the appropriate tile for the number on the map_1.txt file
      if (map[x][y] === 0) {
        image(grass, y*tile_size, x*tile_size, tile_size, tile_size);
        }
      else if (map[x][y] === 1) {
        image(grass, y*tile_size, x*tile_size, tile_size, tile_size)
        image(tall_grass, y*tile_size, x*tile_size, tile_size, tile_size)
        }
      else if (map[x][y] === 2) {
        image(ledge, y*tile_size, x*tile_size, tile_size, tile_size)
        //ledge properties go here
        }
      else if (map[x][y] === 3) {
        image(tree_bottom, y*tile_size, x*tile_size, tile_size, tile_size);
        //no move code
        }
      else if (map[x][y] === 4) {
        image(tree_top, y*tile_size, x*tile_size, tile_size, tile_size)
        }
      else if (map[x][y] === 8) {
        image(grass, y*tile_size, x*tile_size, tile_size, tile_size);
        image(flowers[Math.floor(flower_frame)], y*tile_size, x*tile_size, tile_size, tile_size);
        if (flower_frame < 3){
          flower_frame += 0.5
        }
        else{
          flower_frame = 0;
        }
        
        }
      else if (map[x][y] === 21) {
        image(ledge_left, y*tile_size, x*tile_size, tile_size, tile_size)
          }
      else if (map[x][y] === 22) {
        image(ledge_right, y*tile_size, x*tile_size, tile_size, tile_size)
        }
      else if (map[x][y] === 23) {
        image(ledge_right_corner, y*tile_size, x*tile_size, tile_size, tile_size)
        }
      else if (map[x][y] === 24) {
        image(ledge_right_middle, y*tile_size, x*tile_size, tile_size, tile_size)
        }
      else if (map[x][y] === 25) {
        image(ledge_right_top, y*tile_size, x*tile_size, tile_size, tile_size)
        }
      else if (map[x][y] === 41) {
        image(water_top_left, y*tile_size, x*tile_size, tile_size, tile_size)
        }
      else if (map[x][y] === 42) {
        image(water_top_middle, y*tile_size, x*tile_size, tile_size, tile_size)
        }
      else if (map[x][y] === 43) {
        image(water_top_right, y*tile_size, x*tile_size, tile_size, tile_size)
        }
      else if (map[x][y] === 44) {
        image(water_center_left, y*tile_size, x*tile_size, tile_size, tile_size)
        }
      else if (map[x][y] === 45) {
        image(water, y*tile_size, x*tile_size, tile_size, tile_size)
        }
      else if (map[x][y] === 46) {
        image(water_center_right, y*tile_size, x*tile_size, tile_size, tile_size)
        }
      else if (map[x][y] === 48) {
        image(water_bottom, y*tile_size, x*tile_size, tile_size, tile_size)
        }
      else if (map[x][y] === 51) {
        image(big_tree_top_left, y*tile_size, x*tile_size, tile_size, tile_size)
        }
      else if (map[x][y] === 52) {
        image(big_tree_top_right, y*tile_size, x*tile_size, tile_size, tile_size)
        }
      else if (map[x][y] === 53) {
        image(big_tree_middle_left, y*tile_size, x*tile_size, tile_size, tile_size)
        }
      else if (map[x][y] === 54) {
        image(big_tree_middle_right, y*tile_size, x*tile_size, tile_size, tile_size)
        }
      else if (map[x][y] === 55) {
        image(big_tree_bottom_left, y*tile_size, x*tile_size, tile_size, tile_size)
        }
      else if (map[x][y] === 56) {
        image(big_tree_bottom_right, y*tile_size, x*tile_size, tile_size, tile_size)
        }





      }
  }
  
}            

function keyPressed(){
  let player_faced = player_faces;

  if (key === "a"){
    move_left();
  }

  if (key === "d"){
    move_right();
  }

  if (key === "w"){
    move_up();
  }
  
  if (key === "s"){
    move_down();
  }
  if (player_faced !== player_faces){
    frame = 0;
  }

}



function displayPlayer(){
  //imageMode(CENTER)
  if (player_faces === "down"){
    if (keyIsPressed && key === "s"){
      if (frame < 3){
        if (frame ===1){
          move_down();
        }
        frame ++;}
      else{
        frame = 0;
        move_down();
      }
    }
    else{
      frame = 0;
    }
    image(wes_front[frame], playerY*tile_size, playerX*tile_size-(tile_size*0.3), tile_size, tile_size*1.3)
  }
  else if (player_faces === "up"){
    if (keyIsPressed && key === "w"){
      if (frame < 3){
        if (frame ===1){
          move_up();
        }
        frame ++;}
        else{
          frame = 0;
          move_up();
      }
    }
    else{
      frame = 0;
    }
    image(wes_back[frame], playerY*tile_size, playerX*tile_size-(tile_size*0.3), tile_size, tile_size*1.3)
   }
  else if (player_faces === "right"){
    if (keyIsPressed && key === "d"){
      if (frame < 1){
        frame ++;}
      else{
        frame = 0;
        move_right();
      }
    }
    else{
      frame = 0;
    }
    image(wes_right[frame], playerY*tile_size, playerX*tile_size-(tile_size*0.3), tile_size, tile_size*1.3)
  }
  else if (player_faces === "left"){
    if (keyIsPressed && key === "a"){
      if (frame < 1){
        frame ++;}
      else{
        frame = 0;
        move_left();
      }
    }
    else{
      frame = 0;
    }
    image(wes_left[frame], playerY*tile_size, playerX*tile_size-(tile_size*0.3), tile_size, tile_size*1.3)
  }
  if (col_map[playerX][playerY] === 4){
    image(grass_layer, playerY*tile_size, playerX*tile_size, tile_size, tile_size)
  }
}

function move_left(){
  if (player_faces === "left"){
    if (col_map[playerX][playerY-1]===0 || col_map[playerX][playerY-1]===4){
      playerY--;
    }
  }
  else{
    player_faces = "left";
  }
}
function move_right(){
  if (player_faces === "right"){
  if (col_map[playerX][playerY+1]===0 || col_map[playerX][playerY+1]===3 || col_map[playerX][playerY+1]===4){
    playerY++;
    while (col_map[playerX][playerY]===3){
      playerY++;
    }
  }
  }
  else{
    player_faces = "right";
  }
}
function move_up(){
  if (player_faces === "up"){
  if(col_map[playerX-1][playerY]===0 || col_map[playerX-1][playerY]===4){
    playerX--;
  }}
  else{
  player_faces = "up";
}
}
function move_down(){
  if (player_faces === "down"){
  if (col_map[playerX+1][playerY]===0 || col_map[playerX+1][playerY]===2 || col_map[playerX+1][playerY]===4){
    playerX++;
    while (col_map[playerX][playerY]===2){
      playerX++;
    }
  }}
  else{
  player_faces = "down";
}
}