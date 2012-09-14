var program = new WebGL('webgl-canvas');

var mvMatrix = mat4.create();
var pMatrix = mat4.create();

program.init();
program.draw();