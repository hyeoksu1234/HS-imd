var rows = 0,
  cols = 0,
  cellSize = 27;
var sz = 0,
  theta = 0,
  edge = 50;

function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");

  rows = (width - 2 * edge) / cellSize;
  cols = (height - 2 * edge) / cellSize;
}

function draw() {
  background(0);
  noStroke();
  for (var i = 0; i <= rows; i++) {
    for (var j = 0; j < cols; j++) {
      var offSet = PI + (PI / rows) * i + (PI / cols) * j;
      var x = (i + 0.5) * cellSize;
      var y = (j + 0.5) * cellSize;
      var dx = mouseX - x;
      var dy = mouseY - y;
      noStroke();
      fill("rgb(0,255,0)");
      var r = atan2(dy, dx);
      var arcSize = map(sin(theta / 4 + offSet), -1, 1, radians(30), PI);
      sz = cellSize * 0.9;
      push();
      translate(x + edge, y + edge);
      rotate(r + theta);
      arc(0, 0, sz, sz, 0, arcSize);
      pop();
    }
  }
  theta += 0.02;
}
