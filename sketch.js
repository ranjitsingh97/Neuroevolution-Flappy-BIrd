const TOTAL = 500;
let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;
let cycles = 100;
let slider;
var cnv;

function keyPressed() {
    if(key === 'S') {
        let bird = birds[0];
    //    let json = bird.brain.serialize();
        saveJSON(bird.brain,'bird.json');
    }
}

function setup() {
  cnv = createCanvas(600,400);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  fill(120);
  input = createP('Slider to speed up the Training');
  input.position((windowWidth / 2) - 250,(windowHeight/2) + 210 );
  //speedup = createElement('h2', 'Slider to spped up the training');
  slider = createSlider(1, 1000, 1);
  slider.position((windowWidth / 2) - 250,(windowHeight/2) + 250 );
  input = createP('(Shift + s) - to save the best agent');
  input.position((windowWidth / 2) - 250,(windowHeight/2) + 270 );
  for(let i = 0; i<TOTAL; i++) {
    birds[i] = new Bird();
  }
  //pipes.push(new Pipe());
}

function draw() {
  
  
  for(let n = 0; n<slider.value(); n++) {
    if(counter % 50 == 0) {
      pipes.push(new Pipe());
    }
    
    counter++;
    
    for(var i = pipes.length-1; i>=0; i--) {
      //pipes[i].show();
      pipes[i].update();
      
      for(let j = birds.length - 1; j>=0; j--) {
        if(pipes[i].hits(birds[j])) {
          savedBirds.push(birds.splice(j, 1)[0]);
        }
      }
      
      if(pipes[i].offscreen()) {
        pipes.splice(i,1);
      }
    }
    
    for(let i = birds.length - 1; i>=0; i--) {
        if(birds[i].offScreen()) {
          savedBirds.push(birds.splice(i, 1)[0]);
        }
      }
    
    for(let bird of birds) {
      bird.think(pipes);
      bird.update();
      //bird.show();
    }
    
    if(birds.length === 0) {
      counter = 0;
      nextGeneration();
      pipes = [];
    }
  }
  
  //All the drawing Stuff here
  background(0);
    
  //fill(0);
  //text( 'Slider to spped up the training'  , (windowWidth / 2) - 250,(windowHeight/2) + 100  );
  
  for(let bird of birds) {
    bird.show();
  }
  
  for(let pipe of pipes) {
    pipe.show();
  }
  
}

//function keyPressed() {
//  if(key == ' ') {
//    bird.up();
//    //console.log("Space");
//  }
//}
