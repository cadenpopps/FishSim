function Fish(_parentSchool) {

    this.parentSchool = _parentSchool;
    this.pos = createVector();
    this.vel = createVector();
    this.acc = createVector();
    this.off = createVector();

    this.off.x = random(-200, 200);
    this.off.y = random(-200, 200);

    this.pos.x = this.parentSchool.pos.x + this.off.x;
    this.pos.y = this.parentSchool.pos.y + this.off.y;

    this.size = random(5, 10);

    this.color = [];
    this.color[0] = this.parentSchool.color[0] + floor(random(-15, 15));
    this.color[1] = this.parentSchool.color[1] + floor(random(-15, 15));
    this.color[2] = this.parentSchool.color[2] + floor(random(-15, 15));

    this.update = function() {

        this.vel.mult(.95);

        if (random(1) < FISHMOVESPEED) {
            this.off.x = constrain(this.off.x + random(-10, 10), -200, 200);
            this.off.y = constrain(this.off.y + random(-10, 10), -200, 200);
        }

        var nearFood = false;
        var closestFood = 10000;

        for (let f of foods) {
            var distFood = dist(this.pos.x, this.pos.y, f.x, f.y)
            if (distFood < 100 && distFood < closestFood) {
                nearFood = true;
                closestFood = distFood;
                var attract = createVector(f.x, f.y);
            }
        }
        if (!nearFood) {
            var attract = createVector(this.parentSchool.pos.x + this.off.x, this.parentSchool.pos.y + this.off.y);
        }

        attract.sub(this.pos);

        this.pos.add(this.vel);
        this.vel.add(this.acc);
        if (millis() % 10 < 5) {
            this.vel.x += 1;
        }
        else {
            this.vel.y += 1;
        }
        this.acc = attract.mult(.001);

    };

    this.isOutside = function() {
        return (this.pos.x < -500 || this.pos.x > width + 500 || this.pos.y < -500 || this.pos.y > height + 500);
    };

    this.display = function() {
        fill(this.color[0], this.color[1], this.color[2]);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    };

}