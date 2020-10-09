// Pokemon Map Generator
// Trent Hatzel
// Friday, October 9th, 2020
//
// Extra for Experts:
//I encorporated a 2nd map with a functioning switch, as well as sound effects and visual overlaps, none of which have any proper effect elsewise on the function except for sensory benefits


let map_1, collisionMap_1, map_2, collisionMap_2, active_map, active_collision, MAPX, MAPY, tile_size, wes_front, wes_back, wes_left, wes_right, grass, tall_grass, ledge, ledge_left, ledge_right, ledge_right_corner, ledge_right_middle, ledge_right_top, big_tree_bottom_left, big_tree_bottom_right, big_tree_middle_left, big_tree_middle_right, big_tree_top_left, big_tree_top_right, water_bottom, water, water_center_left, water_center_right, water_top_left, water_top_middle, water_top_right, tree_bottom, tree_top, bump;
//lot of variables that need to be created yet are unusable at this point
let playerX = 6;
let playerY = 5;
let playerIsFacing = "down";
let spriteFrame = 0;
let flower_frame = 0;
let left_map = true
let shouldMapSwitch = false;
let playerIsMoving = false;
let moveCounter = 0;
let moveDelay = 130;
let run = false;
function preload() { 
  // Loads all files used in the program before usage to prevent potential future issues with loading and callbacks, setting them to the blank variables listed above
  map_1 = loadStrings("tiles/map_1.txt");
  map_2 = loadStrings("tiles/map_2.txt");
  collisionMap_1 = loadStrings("tiles/map_1_collision.txt");
  collisionMap_2 = loadStrings("tiles/map_2_collision.txt");
  wes_front = [loadImage("sprites/wes_ow_front.png"), loadImage("sprites/wes_ow_front_1.png"),loadImage("sprites/wes_ow_front.png"), loadImage("sprites/wes_ow_front_2.png")];
  wes_back = [loadImage("sprites/wes_ow_back.png"), loadImage("sprites/wes_ow_back_1.png"),loadImage("sprites/wes_ow_back.png"), loadImage("sprites/wes_ow_back_2.png")];
  wes_left = [loadImage("sprites/wes_ow_left.png"), loadImage("sprites/wes_ow_left_1.png")];
  wes_right = [loadImage("sprites/wes_ow_right.png"), loadImage("sprites/wes_ow_right_1.png")];
  grass = loadImage("tiles/grass.png");
  tall_grass = loadImage("tiles/tall_grass.png");
  grass_layer = loadImage("tiles/grass_layer.png");
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
  water_top_right = loadImage("tiles/water_top_right.png")
  tree_top = loadImage("tiles/tree_top.png");
  tree_bottom = loadImage("tiles/tree_bottom.png");
  flowers = [loadImage("tiles/flowers.png"), loadImage("tiles/flowers_1.png"), loadImage("tiles/flowers_2.png"), loadImage("tiles/flowers_3.png")];
  flower_2 = loadImage("tiles/flower.png");
  bump = createAudio("audio/bump.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // converts string list to tileset
  for (let i=0; i<map_1.length; i++) {
    map_1[i] = map_1[i].split(",");
    collisionMap_1[i] = collisionMap_1[i].split(",");
    map_2[i] = map_2[i].split(",");
    collisionMap_2[i] = collisionMap_2[i].split(",");

    
  }
  //defines the length and width of the grid
  MAPY = map_1[0].length; //16
  MAPX = map_1.length; //12


  //loop through the whole tileset, turning the stings into more usable numeric values
  for (let x=0; x<MAPX; x++) {
    for (let y=0; y<MAPY; y++) {
      map_1[x][y] = int(map_1[x][y]);
      collisionMap_1[x][y] = int(collisionMap_1[x][y]);
      map_2[x][y] = int(map_2[x][y]);
      collisionMap_2[x][y] = int(collisionMap_2[x][y]);
    }
  }
  if (width < height) {
    tile_size = width / MAPY;
  }
  else {
    tile_size = height / MAPX;
  }
  frameRate(8);
  noSmooth();
  active_map = map_1;
  active_collision = collisionMap_1;
  
}

function draw() {
  map_configure();
  background(0);
  displayGroundTiles();
  displayPlayer();
  moveTimer();
  displayPlayerOverlapTiles();
}
function displayGroundTiles(){
  for (let y=0; y<MAPY; y++) {
    for (let x=0; x<MAPX; x++) {
      //Displays the appropriate tile for the number on the displayed map_#.txt file
      //All tiles have a base grass texture
      image(grass, y*tile_size, x*tile_size, tile_size, tile_size);


      //Displays Tall Grass at location
      if (active_map[x][y] === 1) {
        image(tall_grass, y*tile_size, x*tile_size, tile_size, tile_size);
        }

      //Displays a Ledge at location
      else if (active_map[x][y] === 2) {
        image(ledge, y*tile_size, x*tile_size, tile_size, tile_size);
        }

      //Displays a Tree Bottom at location
      else if (active_map[x][y] === 3) {
        image(tree_bottom, y*tile_size, x*tile_size, tile_size, tile_size);
      }

      //Displays a Tree Bottom with a Tree Top overlapping at location
      else if (active_map[x][y] === 5) {
        image(tree_bottom, y*tile_size, x*tile_size, tile_size, tile_size);
        image(tree_top, y*tile_size, x*tile_size, tile_size, tile_size);
      }

      //Displays Flowers shifting through loops
      else if (active_map[x][y] === 8) {
        image(grass, y*tile_size, x*tile_size, tile_size, tile_size);
        image(flowers[Math.floor(flower_frame)], y*tile_size, x*tile_size, tile_size, tile_size);
        if (flower_frame < 3){
          flower_frame += 0.5;
        }
        else{
          flower_frame = 0;
        }
      }

      //Displays a solid state flower
      else if (active_map[x][y] === 9) {
        image(grass, y*tile_size, x*tile_size, tile_size, tile_size);
        image(flower_2, y*tile_size, x*tile_size, tile_size, tile_size);
        }

      //Displays a Left End Ledge at location
      else if (active_map[x][y] === 21) {
        image(ledge_left, y*tile_size, x*tile_size, tile_size, tile_size);
        }

      //Displays a Right End Ledge at location
      else if (active_map[x][y] === 22) {
        image(ledge_right, y*tile_size, x*tile_size, tile_size, tile_size);
        }

      //Displays a Right Ledge Corner
      else if (active_map[x][y] === 23) {
        image(ledge_right_corner, y*tile_size, x*tile_size, tile_size, tile_size);
        }

      //Displays a Right Ledge Middle
      else if (active_map[x][y] === 24) {
        image(ledge_right_middle, y*tile_size, x*tile_size, tile_size, tile_size);
        }

      //Displays a Right Ledge Top
      else if (active_map[x][y] === 25) {
        image(ledge_right_top, y*tile_size, x*tile_size, tile_size, tile_size);
        }

      //Displays a Water Top Left
      else if (active_map[x][y] === 41) {
        image(water_top_left, y*tile_size, x*tile_size, tile_size, tile_size);
        }

      //Displays a Water Top Middle
      else if (active_map[x][y] === 42) {
        image(water_top_middle, y*tile_size, x*tile_size, tile_size, tile_size);
        }

      //Displays a Water Top Right
      else if (active_map[x][y] === 43) {
        image(water_top_right, y*tile_size, x*tile_size, tile_size, tile_size);
        }

      //Displays a Water Center Left
      else if (active_map[x][y] === 44) {
        image(water_center_left, y*tile_size, x*tile_size, tile_size, tile_size);
        }
      
      //Displays a plain Water tile
      else if (active_map[x][y] === 45) {
        image(water, y*tile_size, x*tile_size, tile_size, tile_size);
        }

      //Displays a Water Center Right
      else if (active_map[x][y] === 46) {
        image(water_center_right, y*tile_size, x*tile_size, tile_size, tile_size);
        }

      //Displays a Water Bottom
      else if (active_map[x][y] === 48) {
        image(water_bottom, y*tile_size, x*tile_size, tile_size, tile_size);
        image(tall_grass, y*tile_size, x*tile_size, tile_size, tile_size);
              
        }
        
      //Displays Big Tree Middle Left
      else if (active_map[x][y] === 53) {
        image(big_tree_middle_left, y*tile_size, x*tile_size, tile_size, tile_size);
        }

      //Displays Big Tree Middle Right
      else if (active_map[x][y] === 54) {
        image(big_tree_middle_right, y*tile_size, x*tile_size, tile_size, tile_size);
        }

      //Displays Big Tree Bottom Left
      else if (active_map[x][y] === 55) {
        image(big_tree_bottom_left, y*tile_size, x*tile_size, tile_size, tile_size);
        }

      //Displays Big Tree Bottom Right
      else if (active_map[x][y] === 56) {
        image(big_tree_bottom_right, y*tile_size, x*tile_size, tile_size, tile_size);
        }

      //Displays Big Tree Right Overlap tile
      else if (active_map[x][y] === 57) {
        image(big_tree_bottom_right, y*tile_size, x*tile_size, tile_size, tile_size);
        image(big_tree_top_right, y*tile_size, x*tile_size, tile_size, tile_size);
        }

      //Displays Big Tree Left Overlap Tile
      else if (active_map[x][y] === 58) {
        image(big_tree_bottom_left, y*tile_size, x*tile_size, tile_size, tile_size);
        image(big_tree_top_left, y*tile_size, x*tile_size, tile_size, tile_size);
        }
    }
  }
}


function displayPlayerOverlapTiles() {
  for (let y=0; y<MAPY; y++) {
    for (let x=0; x<MAPX; x++) {
      //Displays the appropriate tile for the number on the map_1.txt files

      //Displays a player overlap Tree Top
      if (active_map[x][y] === 4) {
        image(tree_top, y*tile_size, x*tile_size, tile_size, tile_size);
        }
      
      //Displays a player overlap Big Tree Top Left
      else if (active_map[x][y] === 51) {
        image(big_tree_top_left, y*tile_size, x*tile_size, tile_size, tile_size);
        }

      //Displays a player overlap Big Tree Top Right
      else if (active_map[x][y] === 52) {
        image(big_tree_top_right, y*tile_size, x*tile_size, tile_size, tile_size);
        }
      }
  }
  
}            

function keyPressed(){
  let player_faced = playerIsFacing;
  //Pressing SPACEBAR toggles run

  //Checks if Space was pressed
  if (key === " "){
    run = !run;
    //Toggles run, and checks what it is set to to change movement speed appropriately
    if (run === true){
      moveDelay = 80;
    }
    else{
      moveDelay = 130;
    }
  }
  //Moves Left
  if (key === "a"){
    move_left();
  }

  //Moves Right
  if (key === "d"){
    move_right();
  }

  //Moves Up
  if (key === "w"){
    move_up();
  }
  
  //Moves Down
  if (key === "s"){
    move_down();
  }
  //Checks if player is facing the same direction as when they started the move sequence. If they are not, the spriteFrame variable is reset to 0 to prevent visual errors
  if (player_faced !== playerIsFacing){
    spriteFrame = 0;
  }

}

function displayPlayer(){
  //Checks which direction the player is facing, and clarifies they are not moving already
  //A gradual movement procedure (so not visually teleporting from tile to tile) was planned but cut for time to work on Final Project as it would have little value overall
  //Note: If a key is pressed (IE [a]) and another key is pressed (IE [d]), [d] can be released with [a] pressed and keep moving in the direction left. This is not an oversight or error in the code, as the RPG overwold system in Pokemon I am replicating follows this same mechanic
  if (playerIsFacing === "down"){
    if (!(playerIsMoving)){
      //Checks if "s" is being pressed at the present moment
      if (keyIsPressed && key === "s"){
        //Checks where in the animation the sprite is, if it is far enough, it will move again
        if (spriteFrame < 3){
          if (spriteFrame ===1){
            move_down();
          }
          spriteFrame ++;}
        else{
          spriteFrame = 0;
          move_down();
        }
      }
      //Checks if the Key has been released. If so, it resets the animation back to base
      else{
        spriteFrame = 0;
      }
    }
    //Displays the current frame
    image(wes_front[spriteFrame], playerY*tile_size, playerX*tile_size-(tile_size*0.3), tile_size, tile_size*1.3)
  }
  //Mirror Code: Up
  else if (playerIsFacing === "up"){
    if (keyIsPressed && key === "w"){
      if (spriteFrame < 3){
        if (spriteFrame ===1){
          move_up();
        }
        spriteFrame ++;}
        else{
          spriteFrame = 0;
          move_up();
      }
    }
    else{
      spriteFrame = 0;
    }
    image(wes_back[spriteFrame], playerY*tile_size, playerX*tile_size-(tile_size*0.3), tile_size, tile_size*1.3)
   }
  //Mirror Code: Right
  else if (playerIsFacing === "right"){
    if (keyIsPressed && key === "d"){
      
      if (active_collision[playerX][playerY+1]===5){
        shouldMapSwitch = true;
      }
      if (spriteFrame < 1){
        spriteFrame ++;}
      else{
        spriteFrame = 0;
        move_right();
      }
    }
    else{
      spriteFrame = 0;
    }
    image(wes_right[spriteFrame], playerY*tile_size, playerX*tile_size-(tile_size*0.3), tile_size, tile_size*1.3)
  }

  //Mirror Code: Left
  else if (playerIsFacing === "left"){
    if (keyIsPressed && key === "a"){
      
      if (active_collision[playerX][playerY-1]===5){
        shouldMapSwitch = true;
      }
      if (spriteFrame < 1){
        spriteFrame ++;}
      else{
        spriteFrame = 0;
        move_left();
      }
    }
    else{
      spriteFrame = 0;
    }
    image(wes_left[spriteFrame], playerY*tile_size, playerX*tile_size-(tile_size*0.3), tile_size, tile_size*1.3)
  }
  //Checks if Player is on a Tall Grass tile and adds the grass overlay ontop of player sprite if they are
  if (active_map[playerX][playerY] === 1 || active_map[playerX][playerY] === 48){
    image(grass_layer, playerY*tile_size, playerX*tile_size, tile_size, tile_size)
  }
}

//Moves the player left
function move_left(){
  //Checks to make sure the player is not in the process of moving already
  if (!(playerIsMoving)){
    //Clarifies player is facing the direction first to prevent multiple directions being moved at once
    if (playerIsFacing === "left"){
      //Checks the players coordinates on the active Collision Map to see if they are able to move in the selected direction
      if (active_collision[playerX][playerY-1]===0 || active_collision[playerX][playerY-1]===4 || active_collision[playerX][playerY-1]===5){
        playerY--;
        playerIsMoving = true;
        moveCounter = millis();
      }
      else{
      //If player wants to move to a tile they cannot move to, they will instead just play the animation and a bumping sound
        bump.play()
      }
    }
    else{
      //If player was not already facing left, now they are
      playerIsFacing = "left";
    }
  }
}
function move_right(){
  if (!(playerIsMoving)){
    if (playerIsFacing === "right"){

      //Checks the players coordinates on the active Collision Map to see if they are able to move in the selected direction
      if (active_collision[playerX][playerY+1]===0 || active_collision[playerX][playerY+1]===3 || active_collision[playerX][playerY+1]===4 || active_collision[playerX][playerY+1]===5){
        playerY++;
        playerIsMoving = true;
        moveCounter = millis();
        //Checks if the player hopped onto another ledge tile, and keeps moving if they have
        while (active_collision[playerX][playerY]===3){
          playerY++;
          }
      }
      else{
        bump.play()
      }
      
    }
    else{
      playerIsFacing = "right";
    }
  }
}
function move_up(){
  if (!(playerIsMoving)){
    if (playerIsFacing === "up"){
      if(active_collision[playerX-1][playerY]===0 || active_collision[playerX-1][playerY]===4 || active_collision[playerX-1][playerY]===5){
        playerX--;
        playerIsMoving = true;
        moveCounter = millis();
      }
      else{
        bump.play()
      }
    }
    else{
    playerIsFacing = "up";
   }
  }
}
function move_down(){
  if (!(playerIsMoving)){
    if (playerIsFacing === "down"){
      if (active_collision[playerX+1][playerY]===0 || active_collision[playerX+1][playerY]===2 || active_collision[playerX+1][playerY]===4 || active_collision[playerX+1][playerY]===5){
        playerX++;
        playerIsMoving = true;
        moveCounter = millis();
        while (active_collision[playerX][playerY]===2){
          playerX++;
        }
      }
      else{
        bump.play()
      }
  }
    else{
    playerIsFacing = "down";
    }
  }
}

function map_configure(){
  //To prevent the entire map being re-loaded every frame, it has a switch to check if it is supposed to switch or not
  if (shouldMapSwitch){
    //Checks which map the player is switching to, then switches to it
      if (playerIsFacing === "left"){
        playerY = 15
        active_map = map_1;
        active_collision = collisionMap_1;
        shouldMapSwitch = false;
      }
    else if (playerIsFacing === "right"){
      playerY = 0
      active_map = map_2;
      active_collision = collisionMap_2;
      shouldMapSwitch = false;
    }
  }
    
}


function moveTimer(){
  //Checks the speed the player should be moving at, and checks if enough time has passed for the player to move again
  if (millis()>(moveCounter+moveDelay)){
    playerIsMoving = false;
    }
 }