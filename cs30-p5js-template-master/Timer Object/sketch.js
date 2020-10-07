// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let blink;

function setup() {
  createCanvas(windowWidth, windowHeight);
  blink = new Timer(1500);
}

function draw() {
  if (blink.isDone){
    background("red")
    blink.ichi_byo_keka(3000)
    blink.reset()
  }
  else{
    background("cyan")
  }
}
class Timer{
  constructor(byo_keka){
    this.byo_keka = byo_keka
    this.za_warudo = millis();
    this.toki_wa_ugoki_dasu = this.za_warudo + this.byo_keka;
  }

  isDone(){
    return (millis() >= this.toki_wa_ugoki_dasu);
  }
  reset(){
    this.za_warudo = millis()
    this.toki_wa_ugoki_dasu = this.za_warudo + this.byo_keka;
  }

  ichi_byo_keka(byo_keka){
    this.byo_keka = byo_keka;
  }
}