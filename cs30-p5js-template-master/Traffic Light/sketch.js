// Traffic Light
// Your Name
// Date
//
let which_color_to_display = "red";
let colors = ["red", "yellow", "green"];
let active_light = 0;

let last_switch = 0;
let green_duration = 4000;
let yellow_duration = 1000;
let red_duration = 4000;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  
  draw_outline_of_lights();
  choose_which_light_to_display();
  for (let i = 0; i < 3; i++){
    //which_color_to_display = colors[i]
    show_correct_light();
  }
}

function draw_outline_of_lights(){
  //box
  rectMode(CENTER)
  fill("black")
  rect(width/2, height/2, 75, 200, 10)

  //ligts
  
  circle(width/2, height/2-60, 50)

  circle(width/2, height/2, 50)

  circle(width/2, height/2+60, 50)
}

function show_correct_light(){
  
  fill(which_color_to_display)
  if (which_color_to_display === "red"){
    circle(width/2, height/2-60, 50)

  }
  else if (which_color_to_display === "yellow"){
    circle(width/2, height/2, 50)
  }
  else if (which_color_to_display === "green"){
    circle(width/2, height/2+60, 50)
  }
}

function choose_which_light_to_display(){

  if (which_color_to_display === "green"){
    if (millis()>(last_switch+green_duration)){
      which_color_to_display = "yellow"
      last_switch = millis()
    }
  }
  else if (which_color_to_display === "yellow"){
    if (millis()>(last_switch+yellow_duration)){
      which_color_to_display = "red"
      last_switch = millis()
    }
  }
  else if (which_color_to_display === "red"){
    if (millis()>(last_switch+red_duration)){
      which_color_to_display = "green"
      last_switch = millis()
    }
  }
}
