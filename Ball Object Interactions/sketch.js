// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ball_god = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  //spawn my balls

  for (let i = 0; i<25; i++){
    ball_god.push(new Ball(random(100, width-100), random(100, height-100)));
  }
}

function draw() {
  background(0);

  for (let i = 0; i<ball_god.length; i++){
    ball_god[i].move()
    for (let j = 0; j<ball_god.length; j++){
      if (i !== j){
        ball_god[i].col_check(ball_god[j])}
    }
    ball_god[i].display()
  }
}

class Ball{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.radius = random(10, 20);
    this.color = "white"
    //[random(255), random(255), random(255)]
  }
  move(){
    if (this.x > width-this.radius || this.x <= this.radius){
      this.dx *= -1;
    }
    if (this.y > height-this.radius || this.y <= this.radius){
      this.dy *= -1;
    }
    this.x += this.dx*0.99;
    this.y += this.dy*0.99;

  }

  display(){
    fill(this.color);
    circle(this.x, this.y, this.radius*2);
  }

  col_check(other_ball){
    let distance_apart = dist(this.x, this.y, other_ball.x, other_ball.y);
    let sum_of_radius = this.radius + other_ball.radius
    if (distance_apart<=sum_of_radius){
      let backup_dy = this.dy*0.99
      let backup_dx = this.dx*0.99
      this.color = "red";
      this.dy = other_ball.dy*0.99
      this.dx = other_ball.dx*0.99
      other_ball.dy = backup_dy
      other_ball.dx = backup_dx
    }
    //else{
    //  this.color = "white"
    //}
  }
}