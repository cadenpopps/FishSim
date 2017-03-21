var ocean;
var foods;
var font;
var shark;
var SHARKSIZE = 20;
var SCHOOLLIMIT = 10;
var SCHOOLMOVESPEED = .15;
const FISHMOVESPEED = .20;
const FISHDENSITY = 50;

function preload() {
    //font = loadFont('data/SourceCodePro-Light.otf');
}

function setup() {

    createCanvas(windowWidth, windowHeight);
    //textFont(font);
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

    for (var i = foods.length - 1; i >= 0; i--) {
        foods[i].update();
        if (foods[i].lifeSpan == 0) {
            foods.splice(i, 1);
        }
        else {
            foods[i].display();
        }

    }
    // shark.update();
    // shark.display();

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
    ocean.push(new School());
}

function addFood() {
    foods.push(new Food(mouseX, mouseY));
}

function mousePressed() {
    addFood();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
