let rows = 0,
  cols = 0,
  cellSize = 27;
let sz = 0,
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
  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j < cols; j++) {
      let offSet = PI + (PI / rows) * i + (PI / cols) * j;
      let x = (i + 0.5) * cellSize;
      let y = (j + 0.5) * cellSize;
      let dx = mouseX - x;
      let dy = mouseY - y;
      noStroke();
      fill("rgb(0,255,0)");
      let r = atan2(dy, dx);
      let arcSize = map(sin(theta / 4 + offSet), -1, 1, radians(30), PI);
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
