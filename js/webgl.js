function WebGL(canvas) {
    this.canvas = document.getElementById(canvas);
    this.gl = this.canvas.getContext('experimental-webgl');
	this.shaders = [];
	this.shaderProgram;
	this.buffers = [];
}

WebGL.prototype.init = function() {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.addShader('shader-fs');
	this.addShader('shader-vs');
	this.linkShaders();
	
	this.addBuffer([
	0.0,	0.0,	0.0,
	-1.0,	-1.0,	0.0,
	1.0,	-1.0,	0.0],
	[-1.5, 0.0, -7.0]);
}

WebGL.prototype.addShader = function(id) {
	this.shaders.push(new WebGLShader(this.gl, id));
}

WebGL.prototype.addBuffer = function(vertices, origin) {
	this.buffers.push(new WebGLBuffer(this.gl, vertices, origin));
}

WebGL.prototype.linkShaders = function() {
	this.shaderProgram = this.gl.createProgram();
	
	for(var i = 0; i < this.shaders.length; i++)
		this.gl.attachShader(this.shaderProgram, this.shaders[i].script);
	
    this.gl.linkProgram(this.shaderProgram);

    if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS))
		return console.log("Could not initialise shaders");

    this.gl.useProgram(this.shaderProgram);
	this.shaderProgram.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
    this.gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
	this.shaderProgram.pMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, "uPMatrix");
    this.shaderProgram.mvMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, "uMVMatrix");
}

WebGL.prototype.linkBuffers = function() {
	for(var i = 0; i < this.buffers.length; i++)
		this.buffers[i].draw(this.shaderProgram);
}

WebGL.prototype.draw = function() {
	
	this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	
    mat4.perspective(45, this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 100.0, pMatrix);
	mat4.identity(mvMatrix);
	
	this.linkBuffers();
}