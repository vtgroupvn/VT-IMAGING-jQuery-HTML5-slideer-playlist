var canvas, ctx, W, H, pixels = [], interValCall, requestID;
function m4terial_render(ts) {
  var imageData = ctx.getImageData(0, 0, W, H),
      len = pixels.length,
      fov = 60,
      pixel, scale,
      x2d, y2d, c;

  for (var i = 0; i < len; i++) {
    pixel = pixels[i];
    scale = fov / (fov + pixel.z);
    x2d = pixel.x * scale + W / 2;
    y2d = pixel.y * scale + H / 2;
    if(x2d >= 0 && x2d <= W && y2d >= 0 && y2d <= H) {
      c = (Math.round(y2d) * imageData.width + Math.round(x2d)) * 4;
      imageData.data[c] = 0;
      imageData.data[c + 1] = 255;
      imageData.data[c + 12] = 250;
      imageData.data[c + 4] = 225;
    }
    pixel.z -= 0.4;
    pixel.y = H / 20 + Math.sin(i / len * 450 + (ts / 2250)) * 210;
    if (pixel.z < -fov) pixel.z += 2 * fov;
  }
  ctx.putImageData(imageData, 0, 0);
}

function m4terial_drawFrame(ts){
  requestID = requestAnimationFrame(m4terial_drawFrame, canvas);
  ctx.fillStyle = '#17293a';
  ctx.fillRect(0, 0, W, H);
  m4terial_render(ts);
}
function cancelAnimation()
{
	if (requestID){
		window.cancelAnimationFrame(requestID);
	}
}
function vt_imaging_plg_m4terial(_self)
{
	_self.onStartPlugin('show-loading');
	_self.registerClearVariables('cancelAnimation();canvas;ctx;W;H;pixels;clearInterval(interValCall);m4terial_render;m4terial_drawFrame');
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	_self.getImagingOverlay().css({
		'background': '#1C1C1C',
		'overflow': 'hidden'
	});
	_self.getImagingOverlay().append('<canvas id="m4terial" width="'+_self.getImaging().width()+'" height="'+_self.getImaging().height()+'"></canvas>');
	
	canvas = document.getElementById('m4terial'),
		ctx = canvas.getContext('2d'),
		W = canvas.width = _self.getImaging().width(),
		H = canvas.height = _self.getImaging().height(),
		pixels = [];

	for (var x = -300; x < 400; x += 6) {
	  for (var z = -250; z < 350; z += 5) {
		pixels.push({x: x, y: 500, z: z});
	  }  
	}
	if (typeof m4terial_drawFrame == 'function'){
		m4terial_drawFrame(canvas);
	}
	_self.onCompletePlugin("noneimage");
}