// Bouncy
// Your Name
// Date
let the_balls = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // spawn_ball();
}

function draw() {
  background(220);
  noStroke()
  move_balls();
  display_balls();
  ball_torture();
}


function mousePressed(){
  spawn_ball();
}


function move_balls(){
  for (let i = 0; i < the_balls.length; i++){
    the_balls[i].x += the_balls[i].dx;
    the_balls[i].y += the_balls[i].dy;


    if (the_balls[i].x+the_balls[i].radius > width||the_balls[i].x-the_balls[i].radius< 0){
      the_balls[i].dx *= -1;
      the_balls[i].bounce_count ++
    }
    if (the_balls[i].y+the_balls[i].radius > height||the_balls[i].y-the_balls[i].radius< 0){
      the_balls[i].dy *= -1;
      the_balls[i].bounce_count ++
    }
    
  }

}
function display_balls(){
  for (let ball of the_balls){
    fill(ball.the_color);
    circle(ball.x, ball.y, ball.radius*2);
  }

}

function spawn_ball(){
  let ball = {
    x: mouseX,
    y: mouseY,
    dx: random(-5, 5),
    dy: random(-5, 5),
    radius: random(30, 75),
    the_color: color(random(255),random(255),random(255),random(255)),
    bounce_count: 0
  }
  the_balls.push(ball)
}

function ball_torture(){
  for (let i = the_balls.length-1; i >= 0; i--){
    if (the_balls[i].bounce_count > 10){
      the_balls.splice([i], 1);
    }
    
  }
}