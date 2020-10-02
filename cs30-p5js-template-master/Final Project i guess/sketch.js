// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//Convenience. Pressing shift constantly really slows me down
let normal = "Normal";
let bug = "Bug";
let grass = "Grass";
let water = "Water";
let fire = "Fire";
let ice = "Ice";
let dragon = "Dragon";
let steel = "Steel";
let fairy = "Fairy";
let fighting = "Fighting";
let dark = "Dark";
let ghost = "Ghost";
let psychic = "Psychic";
let poison = "Poison";
let ground = "Ground";
let rock = "Rock";
let flying = "Flying";
let electric = "Electric";
let none = "---"




let damage = 0;
pokemon = {
  dragonite: {
  sprites: [loadImage("sprites/dragonite_front.png"), loadImage("sprites/dragonite_back.png")],
  hp: 91,
  attack: 404,
  defense: 95,
  sp_attack: 266,
  sp_def: 100,
  //128 speed IVS
  speed: 80,
  type_1: dragon,
  type_2: flying,
  move_1: moves_list.dragon_claw,
  move_2: moves_list.hurricane,
  move_3: moves_list.extreme_speed,
  move_4: moves_list.roost
},
garchomp: {
  sprites: [loadImage("sprites/garchomp_front.png"), loadImage("sprites/garchomp_back.png")],
  hp: 421,
  attack: 359,
  defense: 95,
  sp_attack: 80,
  sp_def: 85,
  speed: 333,
  type_1: dragon,
  type_2: ground,
  move_1: moves_list.dragon_claw,
  move_2: moves_list.earthquake,
  move_3: moves_list.iron_head,
  move_4: moves_list.swords_dance
},
charizard: {
  sprites: [loadImage("sprites/charizard_front.png"), loadImage("sprites/charizard_back.png")],
  hp: 78,
  attack: 84,
  defense: 75,
  sp_attack: 109,
  sp_def: 85,
  speed: 328,
  type_1: fire,
  type_2: flying,
  move_1: moves_list.flamethrower,
  move_2: moves_list.dragon_pulse,
  move_3: moves_list.air_slash,
  move_4: moves_list.focus_blast
},
blastoise: {
  sprites: [loadImage("sprites/blastoise_front.png"), loadImage("sprites/blastoise_back.png")],
  hp: 82,
  attack:78,
  defense: 100,
  sp_attack: 85,
  sp_def: 105,
  speed: 78,
  type_1: water,
  type_2: none,
  move_1: moves_list.hydro_pump,
  move_2: moves_list.dragon_pulse,
  move_3: moves_list.ice_beam,
  move_4: moves_list.aura_sphere
}
}


let moves_list = {
  dragon_claw: {
    type: dragon, 
    power: 80, 
    accuracy: 100, 
    pp: 15, 
    category: physical,
    priority: 0,
    effect: [0, 0]},

  hurricane: {
    type: flying,
    power: 110,
    accuracy: 70,
    pp: 10,
    category: special,
    priority: 0,
    effect: [1, 30]},

  extreme_speed: {
    type: normal,
    power: 80,
    accuracy: 100,
    pp: 5,
    category: physical,
    priority: 2,
    effect: [0,0]},

  roost: {
    type: flying,
    power: 0,
    accuracy: 0,
    pp: 10,
    category: healing,
    priority: 0,
    effect: [2, 50]},

  earthquake: {
    type: ground,
    power: 100,
    accuracy: 100,
    pp: 10,
    category: physical,
    priority: 0,
    effect: [0,0]},

  iron_head: {
    type: steel,
    power: 80,
    accuracy: 100,
    pp: 15,
    category: physical,
    priority: 0,
    effect: [3, 30]},

  swords_dance: {
    type: normal,
    power: 0,
    accuracy: 0,
    pp: 30,
    category: boost,
    priority: 0,
    effect: [4, 2]},

  flamethrower: {
      type: fire,
      power: 95,
      accuracy: 100,
      pp: 15,
      category: special,
      priority: 0,
      effect: [5, 20]},

  focus_blast: {
    type: fighting,
    power: 120,
    accuracy: 70,
    pp: 5,
    category: special,
    priority: 0,
    effect: [6, 20]},

  air_slash: {
    type: flying,
    power: 75,
    accuracy: 95,
    pp: 15,
    category: special,
    priority: 0,
    effect: [3, 30]},

  dragon_pulse: {
    type: dragon,
    power: 85,
    accuracy: 100,
    pp: 10,
    category: special,
    priority: 0,
    effect: [0,0]},

  aura_sphere: {
    type: fighting,
    power: 80,
    accuracy: 0,
    pp: 20,
    category: special,
    priority: 0,
    effect: [0,0]},
  
  hydro_pump: {
    type: water,
    power: 120,
    accuracy: 80,
    pp: 5,
    category: special,
    priority: 0,
    effect: [0,0]},
  ice_beam: {
    type: icce,
    power: 90,
    accuracy: 100,
    pp: 10,
    category: special,
    priority: 0,
    effect: [7,20]},
  }

let effects_list = [0,
  //1 Confuses target
  (target.status = confused),
  //2 Heals 1/2 Max Health
  (user.hp += (user.base_hp/2)),
  //3 Flinches target
  (target.flinch = true),
  //4 Increases Attack
  (user.stat_changes.attack += 1),
  //5 Burns Target
  (target.status = burned),
  //6 Lowers Sp. Def of target
  (target.stat_changes.sp_def -= 1),
  //7 Freezes Target
  (target.status = frozen)
]


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}

function damage_check(user, target, move){

  if (move.type in user){
    damage += damage/2
  }
}

function type_effect(pokemon_type, move_type){
  if (pokemon_type === normal){
    if (move_type === fighting){
      return 2;
    }
    else if (move_type === ghost){
      return 0;
    }
    return 1;
  }

  if (pokemon_type === bug){

    if (move_type === fire || move_type === rock || move_type === flying){
      return 2;
    }
    else if (move_type === fighting || move_type === grass || move_type === ground){
      return 0.5;
    }
    return 1;
  }

  if (pokemon_type === electric){
    if (move_type === ground){
      return 2;
    }
    else if (move_type === flying || move_type === steel || move_type === electric){
      return 0.5;
    }
    return 1;
  }

  if (pokemon_type === flying){
    if (move_type === ice || move_type === rock || move_type === electric){
      return 2;
    }
    else if (move_type === bug || move_type === grass || move_type === fighting){
      return 0.5;
    }
    else if (move_type === ground){
      return 0;
    }
    else{
      return 1;
    }
  }
  
  if (pokemon_type === dragon){
    if (move_type === fairy || move_type === dragon || move_type === ice){
      return 2;
    }
    else if (move_type === grass || move_type === fire || move_type ===  water || move_type === electric){
      return 0.5;
    }
    else{
      return 1;
    }
  }

  if (pokemon_type === ice){
    if (move_type === rock || move_type === steel || move_type === fire || move_type === fighting){
      return 2;
    }
    else if (move_type === ice){
      return 0.5;
    }
    else{
      return 1;
    }
  }
  
  if (pokemon_type === fairy){
    if (move_type === poison || move_type === steel){
      return 2;
    }
    else if (move_type === fighting || move_type === bug || move_type === dark){
      return 0.5;
    }
    else if (move_type === dragon){
      return 0;
    }
    return 1;
  }

  if (pokemon_type === water){
    if (move_type === electric || move_type === grass){
      return 2;
    }
    else if (move_type === fire|| move_type === ice || move_type === water || move_type === steel){
      return 0.5;
    }
    return 1;
  }

  if (pokemon_type === fire){
    if (move_type === water || move_type === rock || move_type === ground){
      return  2;
    }
    else if (move_type === ice || move_type === steel || move_type === bug || move_type === grass || move_type === fire){
      return 0.5;
    }
    return 1;
  }

  if (pokemon_type === steel){
    if (move_type === fighting || move_type === fire || move_type === ground){
      return 2;
    }
    else if (move_type === normal || move_type === rock || move_type === fairy || move_type === dragon || move_type === flying || move_type === bug || move_type === steel || move_type === psychic || move_type === grass ){
      return 0.5;
    }

    else if (move_type === poison){
      return 0;
    }
    return 1;
  }

  if (pokemon_type === psychic){
    if (move_type === dark || move_type === ghost || move_type === bug){
      return 2;
    }
    else if (move_type === fighting || move_type === psychic){
      return 0.5;
    }
    return 1;
  }

  if (pokemon_type === dark){
    if (move_type === fairy || move_type === fighting || move_type === bug){
      return 2;
    }
    else if (move_type === dark || move_type === ghost){
      return 0.5;
    }
    else if (move_type === psychic){
      return 0;
    }
    return 1;
  }

  if (pokemon_type === fighting){
    if (move_type === psychic || move_type === flying || move_type === fairy){
      return 2;
    }
    if (move_type === bug || move_type === dark){
      return 0.5;
    }
    return 1;
  }

  if (pokemon_type === ghost){
    if (move_type === ghost || move_type === dark){
      return 2;
    }
    else if (move_type === bug){
      return 0.5;
    }
    else if (move_type === normal || move_type === fighting){
      return 0;
    }
  }

  if (pokemon_type === poison){
    if (move_type === ground || move_type === psychic){
      return 2;
    }
    else if (move_type === grass || move_type === bug || move_type === fighting || move_type === fairy){
      return 0.5;
    }
    return 1;
  }

  if (pokemon_type === grass){
    if (move_type === fire || move_type === ice || move_type === bug || move_type === poison || move_type === flying){
      return 2;
    }

    else if (move_type === ground || move_type === grass || move_type === electric){
      return 0.5;
    }
  }

  if (pokemon_type === ground){
    if (move_type === water || move_type === grass || move_type === ice){
      return 2;
    }
    
    else if (move_type === rock || move_type === poison){
      return 0.5;
    }

    else if (move_type === electric){
      return 0;
    }
    return 1;
  }

  if (pokemon_type === rock){
    if (move_type === steel || move_type === ground || move_type === grass || move_type === water || move_type === fighting){
      return 0;
    }
    else if (move_type === normal || move_type === flying || move_type === fire){
      return 0.5;
    }
    return 1;
  }
  if (pokemon_type === none){
    return 1;
  }
  console.log("Error: TYPE data unknown");

}

