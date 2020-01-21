class Pipe {
  
  constructor() {
//    this.top = random(height/2);
//    this.bottom = random(height/2);
    this.top = random(15,height-205);
    this.bottom = height - this.top - random(90,130)
    this.x = width;
    this.w = 30;
    this.speed = 5;
    this.highlight = false;
  }
  
  hits(bird) {
    if(bird.y - 16 < this.top || bird.y + 16 > height - this.bottom) {
      if(bird.x > this.x && bird.x < this.x + this.w ) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
    
  }
  
  show() {
    fill(255);
    if(this.highlight) {
      fill(255,0,0);
    }
    rect(this.x, 0 , this.w, this.top);
    rect(this.x, height - this.bottom , this.w, this.bottom);
  };
  
  update() {
    this.x -= this.speed;
  }
  
  offscreen() {
    if(this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
  
}
