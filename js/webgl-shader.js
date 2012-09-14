function WebGLShader(context, scriptId) {
	this.id = scriptId
	this.type;
	this.script = this.compile(context,scriptId);
}

WebGLShader.prototype.compile = function(context,id) {
  var shaderScript = document.getElementById(id);
  if (!shaderScript) {
      return null;
  }

  var str = "";
  var k = shaderScript.firstChild;
  while (k) {
      if (k.nodeType == 3)
      str += k.textContent;
      k = k.nextSibling;
  }

  var shader;
  if (shaderScript.type == "x-shader/x-fragment") {
      shader = context.createShader(context.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
      shader = context.createShader(context.VERTEX_SHADER);
  } else {
      return null;
  }
  
  this.type = shaderScript.type;

  context.shaderSource(shader, str);
  context.compileShader(shader);

  if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
      alert(context.getShaderInfoLog(shader));
      return null;
  }

  return shader;
}