function Food(_x, _y) {

	var pos = createVector(_x, _y);
	var originalPos = createVector(_x, _y);
	var size = floor(random(12, 22));
	var floatOffset = millis()+floor(random(0,100));
	var floatSpeed = floor(random(830, 850)) - (size * 3);

	this.getPos = function() {
		return pos;
	};
	
	this.getSize = function() {
		return size;
	};

	this.update = function() {
		pos.x = originalPos.x + sin((millis() - floatOffset) / floatSpeed) * 10;
		pos.y = originalPos.y - abs(sin((millis() - floatOffset) / floatSpeed) * 8);
	};

	this.display = function() {
		stroke(240);
		strokeWeight(size);
		point(pos.x, pos.y);
		noStroke();
	};

}