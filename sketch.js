var ocean;
var font;
var shark;
const SHARKSIZE = 20;
const SCHOOLLIMIT = 20;
const SCHOOLMOVESPEED = .05;
const FISHMOVESPEED = .05;
const FISHDENSITY = 30;

function preload() {
   font = loadFont('data/SourceCodePro-Light.otf');
}

function setup() {

   createCanvas(windowWidth, windowHeight);
   textFont(font);
   textSize(200);
   textAlign(CENTER);

   noStroke();
   makeOcean();

}

function draw() {

   background(255, 50);

   if (millis() < 3000) {
      fill(0, map(millis(0, 3000, 255, 0)));
      text("Fish", 0, height / 2 - 200, width, height);
   }

   //sometimes add fish
   if (random(1) < .01 && ocean.length < SCHOOLLIMIT) {
      addSchool();
   }

   for (var i = ocean.length - 1; i >= 0; i--) {
      if (ocean[i].isOutside()) {
         ocean.splice(i, 1);
      }
      else {
         ocean[i].update();
         ocean[i].display();
      }
   }
   // shark.update();
   // shark.display();

}

function makeOcean() {

   ocean = [];
   addSchool();
   addSchool();
   addSchool();
   //shark = new Shark(width / 2, height / 2, SHARKSIZE);

}

function addSchool() {
   ocean.push(new School());
}

function mousePressed() {
   makeOcean();
}

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}