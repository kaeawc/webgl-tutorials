function WebGLBuffer(webglContext, vertices, origin) {
	this.origin = origin;
	this.gl = webglContext;
	if(!vertices) return console.log('Cannot create buffer without vertices');
	this.vpb = webglContext.createBuffer();
	this.vertices = vertices;
    
	this.vpb.itemSize = 3;
    this.vpb.numItems = vertices.length / 3;
	
	//console.log({size:this.vpb.itemSize,items:this.vpb.numItems});
}

WebGLBuffer.prototype.draw = function(shaderProgram) {
	//console.log(shaderProgram);
	mat4.translate(mvMatrix, this.origin);
	var drawType;
	
	if(this.vpb.numItems < 0)
		return console.log('Cannot render a negative number of vertices');
	
	if(this.vpb.numItems > 3)
		drawType = this.gl.TRIANGLES;
	else
		drawType = this.gl.TRIANGLE_STRIP;
		
	this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vpb);
	this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);
	
	this.gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.vpb.itemSize, this.gl.FLOAT, false, 0, 0);
	this.setMatrixUniforms(shaderProgram);
	//console.log(drawType,this.vpb);
	this.gl.drawArrays(drawType, 0, this.vpb.numItems);
}
WebGLBuffer.prototype.setMatrixUniforms = function (shaderProgram) {
	this.gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
	this.gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
}