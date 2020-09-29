// live version at https://editor.p5js.org/schellenberg/sketches/eEMkFLoAR

let shrekx, shreky, ground, size, shrek, bad_word, walks, walkbacks, idle_on, jump_0, jump_1, jump_2, jump_3, punch_0, punch_1, punch_2, punch_3, punch_4, jump_landed, reset, edges, icon, bgm, nng, shrek_died, haha, bonk, left_bonk, right_bonk, punches, punchbacks, jumpbacks;
let thenomions = []
let speed = 6; //speed of walking
let jump_power = 6; //speed of elevation when jumping
let jump_height = 30;//height and length of jump
let jump = true;
let jump_stage = 0;
let gravity = 12; //
let walk_anim = false;
let frame = 0;
let punch_stage = 0;
let uwu_log = "";
let uwu_active = false;
let nomion_speed = 3;
let nomion_left = false;
let damage_modifier = 1;
let shrek_lives = 10;
let attack_start = 0;
let attack_use = false;
let attack_delay = 300;
let direction = "right";
let points = 0;
let delay = 0;
let spawn_counter = 2000;
let spawn_delay = 2000;


function preload() {
  bonk = loadImage("bonk.png");
  bgm = createAudio("music.mp3");
  nng = createAudio("ow.mp3");
  haha = createAudio("haha.mp3");
  dead = loadImage("no shrek no life.png");
  icon = loadImage("shrek icon.png");
  swamp = loadImage("the swamp.png");
  walks = [loadImage("walk0.png"), loadImage("walk1.png"), loadImage("walk2.png"), loadImage("walk3.png"), loadImage("walk4.png"), loadImage("walk5.png")];
  jumps = [loadImage("jump0.png"), loadImage("jump1.png"), loadImage("jump2.png"), loadImage("jump3.png")];
  jumpbacks = [loadImage("jumpback0.png"), loadImage("jumpback1.png"), loadImage("jumpback2.png"), loadImage("jumpback3.png")];
  shrek = loadImage("walk0.png");
  walkbacks = [loadImage("walkback0.png"), loadImage("walkback1.png"), loadImage("walkback2.png"), loadImage("walkback3.png"), loadImage("walkback4.png"), loadImage("walkback5.png")];
  punches = [loadImage("punch0.png"), loadImage("punch1.png"), loadImage("punch2.png"), loadImage("punch3.png"), loadImage("punch4.png")];
  punchbacks = [loadImage("punchback0.png"), loadImage("punchback1.png"), loadImage("punchback2.png"), loadImage("punchback3.png"), loadImage("punchback4.png")];
  nomions = [loadImage("nomion left.png"), loadImage("nomion right.png")]
}

function setup() {
  //;
  ground = height / 0.2;
  createCanvas(windowWidth, windowHeight);
  shrekx = width / 2;
  shreky = ground / 2;
  size = height * 0.2;
  imageMode(CENTER);
  edges = [width, 0];
  bgm.play();
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|Initializing processes finished--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
function draw() {
  background(0);
  if (millis()>(spawn_counter+spawn_delay)){
    spawn_nomions()
    spawn_counter = millis()
    if (spawn_delay>700){
    spawn_delay -= (nomion_speed*2)
    }
    }
  attack_check();
  //Checks if a  forbidden word has been typed
  if (uwu_active) {
    //bad_word = createVideo("uwu.mp4", profane);
    //^^^ Only activate in final code
    bad_word.size(windowWidth, windowHeight);
    key = 0;
    reset = true;
    clear();
  }
  // Checks if game ending functions have been toggled
  if (!(reset) && (shrek_lives > 0)) {
    image(swamp, width / 2, height / 2, size * 10, size * 5)

    if ((attack_start + attack_delay) < millis()) {
      attack_use = false;
      right_bonk = false;
      left_bonk = false;
      punch_0 = false;
      punch_1 = false;
      punch_2 = false;
      punch_3 = false;
      punch_4 = false;
      punch_stage = 0;
    }
    if (attack_use) {
      if (right_bonk) {
        punch_stage+= 10;
        if (punch_stage < attack_delay) {
          if (!(punch_0)) {
            shrek = punches[0];
            punch_0 = true;
          }
          else if (punch_stage > attack_delay * 0.8) {
            shrek = punches[4];
            punch_4 = true;
          }
          else if (punch_stage > attack_delay * 0.6) {
            shrek = punches[3];
            punch_3 = true;
          }
          else if (punch_stage > attack_delay * 0.4) {
            shrek = punches[2];
            punch_2 = true;
          } 
          else if (punch_stage > attack_delay * 0.2) {
            shrek = punches[1];
            punch_1 = true;
          }

        }
        image(bonk, shrekx + (size / 3), shreky, size / 1.3, size / 1.3);
      }
    }
    if (left_bonk) {
      punch_stage+= 10;
        if (punch_stage < attack_delay) {
          if (!(punch_0)) {
            shrek = punchbacks[0];
            punch_0 = true;
          }
          else if (punch_stage > attack_delay * 0.8) {
            shrek = punchbacks[4];
            punch_4 = true;
          }
          else if (punch_stage > attack_delay * 0.6) {
            shrek = punchbacks[3];
            punch_3 = true;
          }
          else if (punch_stage > attack_delay * 0.4) {
            shrek = punchbacks[2];
            punch_2 = true;
          } 
          else if (punch_stage > attack_delay * 0.2) {
            shrek = punchbacks[1];
            punch_1 = true;
          }

        }
      image(bonk, shrekx - (size / 3), shreky, size / 1.3, size / 1.3);
    }
    displayShrek();
    info();
    movement();
    jump_animate();

    //not jumping
    if (shreky >= ground) {
      jump_stage = 0;
      jump_reset();
    }
    if (walk_anim) {
      walk_animation();
    }
    if (!(keyIsPressed)) {
      idle_anim();
    }
    noms();
  } else {
    bgm.stop();
    if (!(shrek_died)) {
      shrek_died = true;
      nng.play();
    }

    // Checks aspect ratio. If it is wider than it is tall, it scales according to Height. Else, it scales according to width
    if (width < height) {
      imageMode(CORNER);
      image(dead, 0, 0, width, width / 1.3);
    } else {
      imageMode(CENTER);
      image(dead, width / 2, height / 2, height / 0.75, height);
    }
    textSize(200);
    textAlign(CENTER);
    textStyle(BOLD);
    textFont('Verdana');
    fill("#b3d10c");
    text(points, width/2, height/2);
  }
}



function noms() {
  for (let nomion of thenomions) {
    //If the Nomion is alive, it will move towards Shrek. Either hitting Shrek or being hit by Shrek will kill them. Every time a Nomion is killed, future nomions get faster.
    if (nomion.nomion_lives) {
      imageMode(CENTER);
      if (nomion.nomx > shrekx) {
        nomion.nomx -= nomion_speed;
        if (!(nomion.nomion_left)) {

          nomion.nomion_right = false;
          nomion.nomion_pic = nomions[0];
        }
        nomion.nomion_left = true;
        nomion.nomion_nut = true;
      } else if (nomion.nomx < shrekx) {
        nomion.nomx += nomion_speed;
        if (!(nomion.nomion_right)) {

          nomion.nomion_left = false;
          nomion.nomion_pic = nomions[1];
        }
        nomion.nomion_right = true;
        nomion.nomion_nut = true;
      }

      nomion.nomy = ground
      //Checks if it is hitting Shrek, then deals the appropriate damage
      if (collideRectCircle(shrekx - ((width * 0.1) / 4), shreky - ((height * 0.1) / 4), size / 4, size / 4, nomion.nomx, nomion.nomy, size)) {
        nomion.nomion_lives = false;
        shrek_lives -= damage_modifier;
      }

      image(nomion.nomion_pic, nomion.nomx, nomion.nomy, size, size);
    }
    //___________________________________________________________________
    if (attack_use) {
      // Checks if a) Shrek is attacking, and b) Does Shrek's attack overlap the Nomion? If so, it sets the Nomion to NOT alive (dead)
      if (left_bonk) {
        if (collideRectCircle((shrekx - ((width * 0.1) / 4) - (size / 4)), shreky - ((height * 0.1) / 4), size / 4, size / 4, nomion.nomx, nomion.nomy, size)) {
          if (nomion.nomion_lives) {
            nomion.nomion_lives = false;
            nomion_speed += 0.4;
            points++;
          }
        }
      }
      //_____________________|Mirror Code|_______________________________
      if (right_bonk) {
        if (collideRectCircle((shrekx - ((width * 0.1) / 4) + (size / 4)), shreky - ((height * 0.1) / 4), size / 4, size / 4, nomion.nomx, nomion.nomy, size)) {
          if (nomion.nomion_lives) {
            nomion.nomion_lives = false;
            nomion_speed += 0.4;
            points++;
          }
        }
      }
    }
  }
}
// Renders the current Shrek image registered
function displayShrek() {
  imageMode(CENTER);
  image(shrek, shrekx, shreky, size, size);
}
//_______________________________________________________
//______________________Big Code Divider_________________
//Determines if Shrek should move, and sets the appropriate direction for him.
function movement() {
  if ((shreky < ground) && (!(jump))) {
    shreky += gravity;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    direction = "right";
    shrekx += speed;
    if (!(jump)) {
      walk_anim = true;
    }
  }
  if (keyIsDown(LEFT_ARROW)) {
    direction = "left";
    moving_right = false;
    shrekx -= speed;
    if (!(jump)) {
      walk_anim = true;
    }
  }
  if (keyIsDown(UP_ARROW) && (!(jump))) {
    jump = true;
  }
}

//_______________________________________________________
//______________________Big Code Divider_________________
//This increases Y temporarily, shifting between 1 of 4 images as it progresses. It chooses either right or left sprites based off of the determined direction.
function jump_animate() {
  if (direction === "right") {
    if (jump) {
      jump_stage++;
      shreky -= jump_power;

      if (jump_stage > jump_height * 0.7) {
        if (!(jump_2)) {
          shrek = jumps[2];
          jump_2 = true;
        }

      } else if (jump_stage > jump_height * 0.4) {
        if (!(jump_1)) {
          shrek = jumps[1];
          jump_1 = true;
        }

      } else if (jump_stage > 0) {
        if (!(jump_0)) {
          shrek = jumps[0];
          jump_0 = true;
        }
      }
      if (jump_stage > jump_height) {
        if (!(jump_3)) {

          shrek = jumps[3]
          jump_3 = true;
        }
        jump = false;
        jump_landed = true;
        idle_on = true;
      }
    }
  }
  //______________________________________________________
  // ________________| Mirror of above |__________________
  else if (direction === "left") {
    if (jump) {
      jump_stage++;
      shreky -= jump_power;

      if (jump_stage > jump_height * 0.7) {
        if (!(jump_2)) {
          shrek = jumpbacks[2];
          jump_2 = true;
        }

      } else if (jump_stage > jump_height * 0.4) {
        if (!(jump_1)) {
          shrek = jumpbacks[1];
          jump_1 = true;
        }

      } else if (jump_stage > 0) {
        if (!(jump_0)) {
          shrek = jumpbacks[0];
          jump_0 = true;
        }
      }
      if (jump_stage > jump_height) {
        if (!(jump_3)) {

          shrek = jumpbacks[3]
          jump_3 = true;
        }
        jump = false;
        jump_landed = true;
        idle_on = true;
      }
    }
  }

}
//_______________________________________________________
//______________________Big Code Divider_________________
//If Shrek isn't actively walking, sets to an idle sprite
function idle_anim() {
  if (!(idle_on)) {
    if (direction === "right") {
      shrek = walks[1];
    } else if (direction === "left") {
      shrek = walkbacks[1];
    }
  }
  walk_anim = false;
  frame = 0;
  idle_on = true;
}

function walk_animation() {
  idle_on = false;
  if (shreky >= ground) {
    if (direction === "right") {
      if (frame < walks.length * 9) {
        shrek = walks[round(frame / 10)];
        frame++;
      } else {
        frame = 0;
      }
    } else if (direction === "left") {
      if (frame < walkbacks.length * 9) {
        shrek = walkbacks[round(frame / 10)];
        frame++;
      } else {
        frame = 0;
      }
    }
  }
}

function profane() {
  bad_word.loop();
}

function jump_reset() {
  // Resets every "jump" variable to false
  jump_0 = false;
  jump_1 = false;
  jump_2 = false;
  jump_3 = false;
  jump_landed = false;
  if (direction === "right"){
    shrek = walks[1];}
  else if (direction === "left"){
    shrek = walkbacks[1];}
}

function attack_check() {
  key = (key.toUpperCase(key))
  //a sort of workaround in case CAPS LOCK is pressed by mistake
  if (key === "A") {
    attack("left");
    direction = "left"
    key = "p";
  } else if (key === "D") {
    attack("right");
    direction = "right"
    key = "p";
  }
  else if (key === "S"){
    
    attack(direction);
    key = "p";
  }
  if (((key === "U") || (key === "W") || (key === "O")) && (!(keyIsPressed))) {

    uwu_log += key;
    key = "";
    //concatonates either "U", "W", "O" onto uwu_log
    if ((uwu_log === "UWU") || (uwu_log === "OWO")) {
      uwu_active = true;
      bad_word = createVideo("uwu.mp4", profane);
      //^^^Deactivate in final code
    }

  }
  if (key === "M"){
    bgm.stop()
    key = "p"
  }
}

function attack(faces) {
  if (!(reset)) {
    key = "p";
    haha.play()
    if (faces === "right") {
      
        
      if (!(attack_use)) {
        attack_use = true;
        attack_start = millis();
        right_bonk = true;
        } 
      
      
      
    }
    if (faces === "left") {
      if (!(attack_use)) {
        attack_use = true;
        attack_start = millis();
        left_bonk = true;
      }
  }
}
}


function spawn_nomions() {
  if (!(reset)) {
    //If game is not ended, spawns Nomions and gives them properties
    let nomion = {
      nomx: random(edges),
      nomy: ground,
      nomion_pic: nomions[1],
      nomion_right: false,
      nomion_left: false,
      nomion_nut: false,
      nomion_lives: true
    };
    thenomions.push(nomion);
  }
}

function info() {
  // Displays the current data (shrek_lives, points)
  textSize(40);
  textAlign(RIGHT);
  textStyle(BOLD);
  textFont('Verdana');
  fill("#b3d10c");
  text(shrek_lives + " Layers", 200, 40);
  text(points, width - 100, 40);
  image(icon, 300, 20, 158, 30);


}


if (reset) {
  clear();
  createCanvas(0, 0);
  bgm.stop();
  bad_word = createVideo("uwu.mp4")
}