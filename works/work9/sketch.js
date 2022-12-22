var izzms = [],
  sizer = 10;

function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");

  var prox = 20,
    row = ceil(width / prox) + 1,
    column = ceil(height / prox) + 1;

  for (var j = 0; j < column; j++) {
    for (var i = 0; i < row; i++) {
      izzms.push(new p5.Vector(prox * i, prox * j));
    }
  }
}

function draw() {
  background(0);
  noFill();
  stroke("rgb(0,255,0)");
  strokeWeight(15);
  for (var i = izzms.length - 1; i >= 0; i--) {
    var h = calcVec(izzms[i].x - mouseX, izzms[i].y - mouseY);
    line(
      izzms[i].x,
      izzms[i].y,
      izzms[i].x + sizer * cos(h.heading()),
      izzms[i].y + sizer * sin(h.heading())
    );
  }
}

function calcVec(x, y) {
  return new p5.Vector(y - x, -x - y);
}
