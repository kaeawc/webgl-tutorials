function WebGLBuffer(webglContext, vertices) {
	if(!vertices) return console.log('Cannot create buffer without vertices');
	this.vpb = webglContext.createBuffer();
	webglContext.bindBuffer(this.gl.ARRAY_BUFFER, this.vpb);
	webglContext.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), webglContext.STATIC_DRAW);
	this.vpb.itemSize = 3;
    this.vpb.numItems = vertices.length / 3;
	return vpb;
}