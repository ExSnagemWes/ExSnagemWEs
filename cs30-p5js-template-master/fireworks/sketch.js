// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let fireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  //frameRate(10)
  }

function draw() {
  background(0);
  for (let i = fireworks.length-1; i>=0; i --){
    if (fireworks[i].is_dead()){
      fireworks.splice(i, 1)
    }
    else{
      fireworks[i].fly();
      fireworks[i].display();}
  }
}


function mousePressed(){
  uchiage_hanabi()
}

function uchiage_hanabi(){
  let r = random(30, 255);
  let g = random(30, 255);
  let b = random(30, 255);
  let theta = 0;
  let flare_count = 100;
  let angle_increase = 2*PI/flare_count
  let angle = random(-1, 1)
  let fuse = random(3,4)
  for (let i = 0; i<flare_count; i++){
    let dx = cos(theta) + random(-0.7, 0.7);
    let dy = sin(theta) + random(-0.7, 0.7);
    let hanabi = new Flare(mouseX, mouseY, r, g, b, dx, dy, angle, fuse)
    fireworks.push(hanabi);
    theta += angle_increase;
  }
}





class Flare{
  constructor(x, y, r, g, b, dx, dy, angle, fuse, stro_color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.g = g;
    this.b = b;
    this.alpha = 255;
    this.radius = 3;
    this.gravity = 0.04;
    this.height = 0;
    this.angle = angle;
    this.fuse = fuse;
  }

  display(){
        fill(this.r, this.b, this.g, this.alpha)
    circle(this.x, this.y, this.radius*2)
  }
  fly(){
    if (this.height < height/this.fuse){
      this.y -= 4
      this.height += this.fuse/2
      this.x += this.angle;
      this.angle *= 1.015
      if (this.angle>0){
        this.height += this.angle;
      }
      else{
        this.height -= this.angle;
      }
    }
    else{
      this.burst()
    }
  }
  burst(){
    this.x += this.dx;
    this.y += this.dy;
    this.radius -= 0.015;
    this.alpha -= 2.5;
    this.dy += this.gravity;
  }

  is_dead(){
    return (this.alpha <= 0)
  }


}