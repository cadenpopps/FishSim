function School(_x, _y) {

   this.pos = createVector();
   this.vel = createVector();
   this.acc = createVector();
   this.fish = [];
   this.color = [3];
   this.size = 50;
   this.speed = random(.1, 1);

   this.color[0] = floor(random(50, 255));
   this.color[1] = floor(random(50, 255));
   this.color[2] = floor(random(50, 255));

   if (_x == -1 && _y == -1) {

      var edge = floor(random(4));
      switch (edge) {
         case 0:
            this.pos.x = random(-100, width + 100);
            this.pos.y = -50;
            break;
         case 1:
            this.pos.x = width + 50;
            this.pos.y = random(-100, width + 100);
            break;
         case 2:
            this.pos.x = random(-100, width + 100);
            this.pos.y = height + 50;
            break;
         case 3:
            this.pos.x = -50;
            this.pos.y = random(-100, height + 100);
            break;
      }
   }
   else {
      this.pos.x = _x;
      this.pos.y = _y;
   }

   this.target = this.pos.copy();

   var numFish = floor(random(SCHOOLPOPULATION - (SCHOOLPOPULATION / 2), SCHOOLPOPULATION + (SCHOOLPOPULATION / 2)));
   for (var i = 0; i < numFish; i++) {
      this.fish.push(new Fish(this));
   }

   this.update = function() {

      this.vel.mult(.95);

      var food = false;
      var closestFood = 1000000;

      for (let f of foods) {
         var distFood = pow(this.pos.x - f.x, 2) + pow(this.pos.y - f.y, 2);
         if (distFood < closestFood) {
            food = true;
            closestFood = distFood;
            this.target = createVector(f.x, f.y);
         }
      }

      var attract = createVector(this.target.x, this.target.y);

      attract.sub(this.pos);
      this.pos.add(this.vel);
      this.vel.add(this.acc);
      this.acc = attract.mult(.001);

      //shift target position
      if (random(1) < SCHOOLMOVESPEED) {
         this.target.x += random(-40, 40);
         this.target.y += random(-40, 40);
      }

      for (let f of this.fish) {
         f.update();
      }
      this.constrainPos();

      return true;

   };

   this.constrainPos = function() {
      this.pos.x = constrain(this.pos.x, -50, width + 50);
      this.pos.y = constrain(this.pos.y, -50, height + 50);
   };

   this.display = function() {
      // fill(this.color[0], this.color[1], this.color[2]);
      // rect(this.pos.x, this.pos.y, this.size, this.size);
      for (let f of this.fish) {
         f.display();
      }
   };

}