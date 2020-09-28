// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let fire
let damage = 0;
let dragonite={
  sprites: [loadImage("dragonite_front.png"), loadImage("dragonite_back.png")],
  hp: 91,
  attack: 134,
  defense: 95,
  sp_attack: 100,
  sp_def: 100,
  speed: 80,
  type_1: dragon,
  type_2: flying,
  move_1: dragon_claw,
  move_2: hurricane,
  move_3: extreme_speed,
  move_4: roost
}
let garchomp={
  sprites: [loadImage("garchomp_front.png"), loadImage("garchomp_back.png")],
  hp: 108,
  attack: 130,
  defense: 95,
  sp_attack: 80,
  sp_def: 85,
  speed: 102,
  type_1: dragon,
  type_2: ground,
  move_1: dragon_claw,
  move_2: earthquake,
  move_3: iron_head,
  move_4: swords_dance
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}

function damage_check(user, terget, move){

  if (move.type in user){
    damage += damage/2
  }
}