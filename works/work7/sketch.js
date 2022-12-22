let outerCell, innerCell;
let r, sz, unit;
let bg = 0;

function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");

  strokeWeight(3);
  stroke("rgb(0,255,0)");
  fill(bg);
  r = 0.3;
  sz = 10;
  outerCell = 75;
  innerCell = outerCell * 0.4;
  unit = innerCell / 2;
  initStuff();
}

function draw() {}

function drawPatternA(x, y) {
  if (random(1) > r) {
    strokeCap(SQUARE);
  } else {
    strokeCap(PROJECT);
  }

  push();
  translate(x, y);
  cross();

  centerSymbol();

  symbolsAtEdges();

  pop();
}

function triangles() {
  let unit3 = unit * 0.35;
  for (let i = 0; i < 8; i++) {
    push();
    rotate(radians(45) * i);
    push();
    translate(-unit * 1.5, 0);
    if (random(1) > r + 0.3) triangle(-unit3, 0, unit3, -unit3, unit3, unit3);
    pop();
    pop();
  }
}

function cross() {
  if (random(1) > r) {
    if (random(1) > r) line(-unit, 0, unit, 0);
    if (random(1) > r) line(0, -unit, 0, unit);
  } else {
    if (random(1) > r) line(-unit, -unit, unit, unit);
    if (random(1) > r) line(-unit, unit, unit, -unit);
  }
}

function centerSymbol() {
  if (random(1) > r) {
    if (random(1) > r + 0.2) {
      rectMode(CENTER);
      if (random(1) > r) rectMode(CORNER);
      push();
      rect(0, 0, sz * 2, sz * 2);
      pop();
    } else {
      let unit2 = unit * 2.75;
      if (random(1) > r) {
        if (random(1) > r + 0.3) ellipse(0, 0, unit2, unit2);
        if (random(1) > r) ellipse(0, 0, unit2 * 0.66, unit2 * 0.66);
      } else {
        noFill();
        for (let i = 0; i < 4; i++) {
          let start = i * HALF_PI;
          if (random(1) > r) arc(0, 0, unit2, unit2, start, start + HALF_PI);
        }
        fill(bg);
      }
    }
  }
}

function symbolsAtEdges() {
  if (random(1) > r) ellipse(0, 0, sz, sz);
  var unit3 = unit * 0.35;
  for (var i = 0; i < 4; i++) {
    rotate(i * HALF_PI);
    if (random(1) > r + 0.3) {
      if (random(1) > r) {
        ellipse(-unit * 1.4, 0, sz, sz);
      } else {
        push();
        translate(-unit * 1.5, 0);
        if (random(1) > r + 0.3)
          triangle(-unit3, 0, unit3, -unit3, unit3, unit3);
        pop();
      }
    }
  }
}

function initStuff() {
  background(bg);
  strokeWeight(3);
  stroke("rgb(0,255,0)");
  for (var x = outerCell / 2; x < width; x += outerCell) {
    for (var y = outerCell / 2; y < height; y += outerCell) {
      drawPatternA(x, y);
    }
  }
}

function mouseReleased() {
  initStuff();
}

function keyTyped() {
  if (key === "s") save(random(123) + ".png");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 4);
  initStuff();
}
