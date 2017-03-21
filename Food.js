function Food(_x, _y) {

    this.x = _x;
    this.y = _y;
    lifeSpan = 300;

    this.update = function() {

        this.x += random(-.4, .4);
        this.y += random(-.4, .4);

    };

    this.display = function() {

        fill(50);
        ellipse(this.x, this.y, 4, 4);

    };

}