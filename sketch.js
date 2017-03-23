var ocean;
var foods;
var font;
var shark;
var SHARKSIZE = 20;
var SCHOOLLIMIT = 10;
var SCHOOLMOVESPEED = .2;
var FISHMOVESPEED = .2;
var FISHSPEEDLIMIT = 20;
var SCHOOLPOPULATION = 30;
var FISHDENSITY = 30;
var schoolLimitSlider;
var schoolMoveSpeedSlider;
var fishMoveSpeedSlider;
var fishSpeedLimitSlider;
var fishDensitySlider;
var schoolPopulation;
const sliderDistance = 8;

function preload() {
   //font = loadFont('data/SourceCodePro-Light.otf');
}

function setup() {

   createCanvas(windowWidth, windowHeight);
   //textFont(font);
   textAlign(CENTER);

   schoolLimitSlider = createSlider(1, 30, 10);
   schoolLimitSlider.position(20, 1 * (height / sliderDistance));

   schoolMoveSpeedSlider = createSlider(0, 100, 20);
   schoolMoveSpeedSlider.position(20, 2 * (height / sliderDistance));

   fishMoveSpeedSlider = createSlider(0, 100, 20);
   fishMoveSpeedSlider.position(20, 3 * (height / sliderDistance));

   fishSpeedLimitSlider = createSlider(1, 50, 20);
   fishSpeedLimitSlider.position(20, 4 * (height / sliderDistance));

   fishDensitySlider = createSlider(1, 100, 30);
   fishDensitySlider.position(20, 5 * (height / sliderDistance));

   schoolPopulation = createSlider(1, 100, 30);
   schoolPopulation.position(20, 6 * (height / sliderDistance));

   noStroke();
   makeOcean();

}

function draw() {

   background(255, 50);

   if (ocean.length > SCHOOLLIMIT) {
      ocean.splice(ocean.length - 1);
   }

   if (millis() < 3000) {
      fill(0);
      textSize(200);
      textAlign(CENTER);
      text("Fish", width/5, height / 2 - 100, width, height);
   }

   //sometimes add fish
   if (random(1) < .01 && ocean.length < SCHOOLLIMIT) {
      addSchool();
   }

   for (let s of ocean) {
      s.update();
      s.display();
   }

   for (let f of foods) {
      f.update();
      f.display();
   }
   // shark.update();
   // shark.display();

   fill(50);
   rect(0, 0, width / 5, height);

   textAlign(LEFT);
   textSize(width/80);
   fill(255);
   SCHOOLLIMIT = schoolLimitSlider.value();
   text("School limit: " + SCHOOLLIMIT, 20, 1.5 * (height / sliderDistance));
   schoolLimitSlider.position(20, 1 * (height / sliderDistance));

   SCHOOLMOVESPEED = schoolMoveSpeedSlider.value() / 100;
   text("School move frequency: " + SCHOOLMOVESPEED, 20, 2.5 * (height / sliderDistance));
   schoolMoveSpeedSlider.position(20, 2 * (height / sliderDistance));

   FISHMOVESPEED = fishMoveSpeedSlider.value() / 100;
   text("Fish move frequency " + FISHMOVESPEED, 20, 3.5 * (height / sliderDistance));
   fishMoveSpeedSlider.position(20, 3 * (height / sliderDistance));

   FISHSPEEDLIMIT = fishSpeedLimitSlider.value();
   text("Fish speed: " + FISHSPEEDLIMIT, 20, 4.5 * (height / sliderDistance));
   fishSpeedLimitSlider.position(20, 4 * (height / sliderDistance));

   FISHDENSITY = fishDensitySlider.value();
   text("Fish density: " + FISHDENSITY, 20, 5.5 * (height / sliderDistance));
   fishDensitySlider.position(20, 5 * (height / sliderDistance));

   SCHOOLPOPULATION = schoolPopulation.value();
   text("School population: " + SCHOOLPOPULATION, 20, 6.5 * (height / sliderDistance));
   schoolPopulation.position(20, 6 * (height / sliderDistance));

}

function makeOcean() {

   ocean = [];
   foods = [];
   addSchool();
   addSchool();
   addSchool();
   //shark = new Shark(width / 2, height / 2, SHARKSIZE);

}

function addSchool() {
   ocean.push(new School(-1, -1));
}

function addFood() {
   foods.push(new Food(mouseX, mouseY));
}

function keyTyped() {
   if (key == 's') {
      console.log(ocean.length);
      ocean.push(new School(mouseX, mouseY));
   }
}

function mousePressed() {
   if (mouseX > width / 5) {
      addFood();
   }

}

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}
