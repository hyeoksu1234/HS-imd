var spacing = 30; // Distance between each horizontal and vertical location
var theta = 0.0; // Start angle at 0
var amplitude = 15; // default height of wave
var period = 200.0; // How many pixels before the wave repeats
var dx; // Value for incrementing x
var dots = []; // Using an array to store height values and size for each dot

function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");

  dx = (TWO_PI / period) * spacing;
  dots = new Array(15);
}

function draw() {
  amplitude = map(mouseY, 0, windowHeight, 15, 75);
  background(0);
  calcWave();
  renderWave();
}

function calcWave() {
  // Increment theta (try different values for
  // 'angular velocity' here)
  theta += 0.05;

  // For every x value, calculate a y value with sine function
  var x = theta;
  for (var i = 0; i < dots.length; i++) {
    var dot = {};
    dot.yvalue = sin(x) * amplitude;
    dot.size = 16 * cos(x);
    x += dx;
    dots[i] = dot;
  }
}

function renderWave() {
  noStroke();

  // place the wave at the center
  translate(
    (width - (dots.length - 1) * spacing) / 2,
    (height - 9 * spacing) / 2
  );

  for (var x = 0; x < dots.length; x++) {
    for (var y = 0; y < 10; y++) {
      dots[x].hue = map(x * spacing, 0, windowWidth, 0, 255);
      fill("rgb(0,255,0)");
      ellipse(
        x * spacing,
        dots[x].yvalue + y * spacing,
        dots[x].size,
        dots[x].size
      );
    }
  }
}

function windowResized() {
  // this function executes everytime the window size changes

  // set the sketch width and height to the windowWidth and windowHeight. This gets rid of the scroll bars.
  resizeCanvas(windowWidth, windowHeight);
  // set background to gray
  background(50);
}
