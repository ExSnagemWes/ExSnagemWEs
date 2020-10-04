


let map;
let initialState;

let MAPSIZE;
let tile_size;
let grass, tall_grass, ledge, ledge_left, ledge_right, ledge_right_corner, ledge_right_middle, ledge_right_top, big_tree_bottom_left, big_tree_bottom_right, big_tree_middle_left, big_tree_middle_right, big_tree_top_left, big_tree_top_right, water_bottom, water, water_center_left, water_center_right, water_top_left, water_top_middle, water_top_right, tree_bottom, tree_top;
// Tile list
// 0 = grass
// 1 = tall_grass
// 2 = ledge
// 3 = tall_tree_bottom
// 4 = tall_tree_top
// 8 = flowers
// 21 = ledge_left
// 22 = ledge_right
// 23 = ledge_right_corner
// 24 = ledge_right_middle
// 25 = ledge_right_top
// 41 = water_up_left
// 42 = water_up_center
// 43 = water_up_right
// 44 = water_middle_left
// 45 = water_neutral
// 46 = water_middle_right
// 48 = water_bottom
// 51 = big_tree_top_left
// 52 = big_tree_top_right
// 53 = big_tree_middle_left
// 54 = big_tree_middle_right
// 55 = big_tree_bottom_left
// 56 = big_tree_bottom_right
function preload() {
  map = loadStrings("tiles/map_1.txt");
  grass = loadImage("tiles/grass.png");
  tall_grass = loadImage("tiles/tall_grass.png");
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
  flowers = loadImage("tiles/flowers.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // converts string list to tileset
  for (let i=0; i<map.length; i++) {
    map[i] = map[i].split(",");
    //initialState[i] = initialState[i].split(",");
  }
  MAPY = map[0].length; //16
  MAPX = map.length; //12

3
  //loop through the whole 2d array, and turn everything to numbers
  for (let x=0; x<MAPX; x++) {
    for (let y=0; y<MAPY; y++) {
      map[x][y] = int(map[x][y]);
      //initialState[x][y] = int(initialState[x][y]);
    }
  }

  if (width < height) {
    tile_size = width / MAPX;
  }
  else {
    tile_size = height / MAPX;
  }
}

function draw() {
  background(220);
  displayGrid();
}

function displayGrid() {
  //squares and numbers
  for (let y=0; y<MAPY; y++) {
    for (let x=0; x<MAPX; x++) {
      //rect(x*tile_size, y*tile_size, tile_size, tile_size);


// 51 = big_tree_top_left
// 52 = big_tree_top_right
// 53 = big_tree_middle_left
// 54 = big_tree_middle_right
// 55 = big_tree_bottom_left
// 56 = big_tree_bottom_right
      if (map[x][y] === 0) {
        image(grass, y*tile_size, x*tile_size, tile_size, tile_size)
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
        image(tree_bottom, y*tile_size, x*tile_size, tile_size, tile_size)
        //no walk code
        }
      else if (map[x][y] === 4) {
        image(tree_top, y*tile_size, x*tile_size, tile_size, tile_size)
        }
      else if (map[x][y] === 8) {
        image(flowers, y*tile_size, x*tile_size, tile_size, tile_size)
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

// function mousePressed() {
//   let cellX = floor(mouseX / tile_size);
//   let cellY = floor(mouseY / tile_size);

//   changeCell(cellX, cellY);
// }

// function changeCell(x, y) {
//   if (map[x][y] !== initialState[x][y] || map[x][y] === 0) {
//     //don't go into double digits
//     map[x][y] = (map[x][y] + 1) % 10;
//   }
// }