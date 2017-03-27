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
const sliderDistance = 7;

function preload() {
    //font = loadFont('data/SourceCodePro-Light.otf');
}

function setup() {

    createCanvas(windowWidth, windowHeight);
    //textFont(font);
    textAlign(CENTER);

    schoolLimitSlider = createSlider(0, 30, 10);
    //schoolLimitSlider.position(1 * (width / sliderDistance) - 100, height - 50);

    schoolMoveSpeedSlider = createSlider(0, 100, 20);
    //schoolMoveSpeedSlider.position(2 * (width / sliderDistance) - 100, height - 50);

    fishMoveSpeedSlider = createSlider(0, 100, 20);
    //fishMoveSpeedSlider.position(3 * (width / sliderDistance) - 100, height - 50);

    fishSpeedLimitSlider = createSlider(0, 50, 20);
    //fishSpeedLimitSlider.position(4 * (width / sliderDistance) - 100, height - 50);

    fishDensitySlider = createSlider(0, 100, 30);
    //fishDensitySlider.position(5 * (width / sliderDistance) - 100, height - 50);

    schoolPopulation = createSlider(1, 100, 30);
    //schoolPopulation.position(6 * (width / sliderDistance) - 100, height - 50);

    noStroke();
    makeOcean();

}

function draw() {

    background(255, 50);

    if (ocean.length > SCHOOLLIMIT) {
        ocean.splice(ocean.length - 1);
    }

    if (millis() < 2000) {
        fill(20, 150);
        textSize(200);
        textAlign(CENTER);
        text("Fish", 0, height / 2 - 150, width, height);
    }
    else if (millis() < 2500) {
        fill(20, map(millis(), 2000, 2500, 150, 0));
        textSize(200);
        textAlign(CENTER);
        text("Fish", 0, height / 2 - 150, width, height);
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

    drawUI();

}

function drawUI() {

    fill(100, 150);
    rect(100, height - 90, width - 200, 70);

    textAlign(CENTER);
    textSize(width / 100);
    fill(255);
    SCHOOLLIMIT = schoolLimitSlider.value();
    text("School limit", 1 * (width / sliderDistance) - 10, height - 65);
    schoolLimitSlider.position(1 * (width / sliderDistance) - 75, height - 60);

    SCHOOLMOVESPEED = schoolMoveSpeedSlider.value() / 100;
    text("School pathing", 2 * (width / sliderDistance) - 10, height - 65);
    schoolMoveSpeedSlider.position(2 * (width / sliderDistance) - 75, height - 60);

    FISHMOVESPEED = fishMoveSpeedSlider.value() / 100;
    text("Fish pathing", 3 * (width / sliderDistance) - 10, height - 65);
    fishMoveSpeedSlider.position(3 * (width / sliderDistance) - 75, height - 60);

    FISHSPEEDLIMIT = fishSpeedLimitSlider.value();
    text("Fish speed", 4 * (width / sliderDistance) - 10, height - 65);
    fishSpeedLimitSlider.position(4 * (width / sliderDistance) - 75, height - 60);

    FISHDENSITY = fishDensitySlider.value();
    text("Fish density", 5 * (width / sliderDistance) - 10, height - 65);
    fishDensitySlider.position(5 * (width / sliderDistance) - 75, height - 60);

    SCHOOLPOPULATION = schoolPopulation.value();
    text("School population", 6 * (width / sliderDistance) - 10, height - 65);
    schoolPopulation.position(6 * (width / sliderDistance) - 75, height - 60);

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
    if (mouseY < height - 80 || mouseY > height - 20) {
        addFood();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
