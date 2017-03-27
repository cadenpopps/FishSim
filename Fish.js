function Fish(_parentSchool) {

    this.parentSchool = _parentSchool;
    this.pos = createVector();
    this.vel = createVector();
    this.acc = createVector();
    this.off = createVector();

    this.off.x = random(-50, 50);
    this.off.y = random(-50, 50);

    this.pos.x = this.parentSchool.pos.x + this.off.x;
    this.pos.y = this.parentSchool.pos.y + this.off.y;

    this.size = random(5, 10);
    this.speed = this.parentSchool.speed * FISHSPEEDLIMIT / this.size;
    this.wiggleOffset = floor(random(250));

    this.color = [];
    this.color[0] = this.parentSchool.color[0] + floor(random(-15, 15));
    this.color[1] = this.parentSchool.color[1] + floor(random(-15, 15));
    this.color[2] = this.parentSchool.color[2] + floor(random(-15, 15));

    this.update = function() {

        this.vel.mult(.95);
        this.speed = this.parentSchool.speed * FISHSPEEDLIMIT / this.size;
        this.vel.x = constrain(this.vel.x, -this.speed, this.speed);
        this.vel.y = constrain(this.vel.y, -this.speed, this.speed);

        if (random(1) < FISHMOVESPEED) {
            this.off.x = constrain(this.off.x + random(-10, 10), -FISHDENSITY * 3, FISHDENSITY * 3) + random(-FISHDENSITY, FISHDENSITY);
            this.off.y = constrain(this.off.y + random(-10, 10), -FISHDENSITY * 3, FISHDENSITY * 3) + random(-FISHDENSITY, FISHDENSITY);
        }

        var food = false;
        var closestFood = 1000000;

        for (var i = foods.length - 1; i >= 0; i--) {
            var distFood = abs(this.pos.x - foods[i].x, 2) + abs(this.pos.y - foods[i].y, 2);
            if (distFood < closestFood) {
                food = true;
                closestFood = distFood;
                var attract = createVector(foods[i].x + random(-150, 150), foods[i].y + random(-150, 150));
            }
            if (distFood < this.size) {
                if (Math.hypot(abs(this.pos.x - foods[i].x), abs(this.pos.y - foods[i].y)) < this.size) {
                    foods.splice(i, 1);
                    this.size += 5;
                }
            }
        }
        if (!food) {
            var attract = createVector(this.parentSchool.pos.x + this.off.x, this.parentSchool.pos.y + this.off.y);
        }

        if ((millis() + this.wiggleOffset) % 500 < 250) {
            attract.x = this.pos.x;
        }
        else {
            attract.y = this.pos.y;
        }

        attract.sub(this.pos);
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        if (food) {
            this.acc = attract.mult(.005 * (FISHSPEEDLIMIT / 20));
        }
        else {
            this.acc = attract.mult(.001 * (FISHSPEEDLIMIT / 20));
        }

        if (this.size > 60) {
            for (var i = 0; i < 10; i++) {
                this.parentSchool.fish.push(new Fish(this.parentSchool));
            }

            this.size = 10;
        }

    };

    this.display = function() {
        fill(this.color[0], this.color[1], this.color[2]);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    };

}