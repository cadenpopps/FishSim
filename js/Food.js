function Food(_x, _y) {

    this.x = _x;
    this.y = _y;

    this.update = function() {

        this.x += random(-.4, .4);
        this.y += random(-.4, .4);

    };

    this.display = function() {

        fill(50);
        ellipse(this.x, this.y, 6, 6);

    };

}