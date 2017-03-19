function School() {

   this.pos = createVector();
   this.vel = createVector();
   this.acc = createVector();
   this.fish = [];
   this.color = [3];
   this.size = 15;

   this.color[0] = floor(random(50, 255));
   this.color[1] = floor(random(50, 255));
   this.color[2] = floor(random(50, 255));

   var edge = floor(random(4));
   switch (edge) {
      case 0:
         this.pos.x = random(-100, width + 100);
         this.pos.y = -200;
         break;
      case 1:
         this.pos.x = width + 200;
         this.pos.y = random(-100, width + 100);
         break;
      case 2:
         this.pos.x = random(-100, width + 100);
         this.pos.y = height + 200;
         break;
      case 3:
         this.pos.x = -200;
         this.pos.y = random(-100, height + 100);
         break;
   }
   
   this.target = this.pos.copy();

   var numFish = floor(random(FISHDENSITY - (FISHDENSITY/4), FISHDENSITY + (FISHDENSITY/4)));
   for (var i = 0; i < numFish; i++) {
      this.fish.push(new Fish(this));
   }

   this.update = function() {
      
      this.vel.mult(.95);
      
      var attract = createVector(this.target.x, this.target.y);
      //check if shark is close, move away
      //check if too close to another school, move away
      //move towards goal

      attract.sub(this.pos);

      this.pos.add(this.vel);
      this.vel.add(this.acc);
      this.acc = attract.mult(.001);

      //shift target position
      if (random(1) < SCHOOLMOVESPEED) {
         this.target.x += random(-30, 30);
         this.target.y += random(-30, 30);
      }

      for (var i = this.fish.length - 1; i >= 0; i--) {
         if (this.fish[i].isOutside()) {
            console.log("removing fish");
            this.fish.splice(i);
         }
         else{
            this.fish[i].update();
         }
      }

      return true;
   };

   this.isOutside = function() {
      return (this.pos.x < -300 || this.pos.x > width + 300 || this.pos.y < -300 || this.pos.y > height + 300);
   };

   this.display = function() {
      fill(this.color[0], this.color[1], this.color[2]);
      ellipse(this.pos.x, this.pos.y, this.size, this.size);
      for (let f of this.fish) {
         f.display();
      }
   };

}