var canvas, ctx, W, H, pixels = [];
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
  requestAnimationFrame(m4terial_drawFrame, canvas);
  ctx.fillStyle = '#17293a';
  ctx.fillRect(0, 0, W, H);
  m4terial_render(ts);
}
window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_m4terial'];
}
function vt_imaging_plg_m4terial(_self, imaging, audio, div_slide)
{
	_self.createScreenLoading();
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	audio.find('source').attr('src', _self.getCurrentImage().audio_src);
	audio.find('source').attr('type', 'audio/mpeg');
	audio[0].load();
	audio[0].play();
	var old_height = imaging.height();
	var old_width = imaging.width();
	imaging.find('img').attr('src', 'none');
	imaging.find('img').attr('alt', '');
	imaging.css({
		'height': old_height,
		'width': old_width,
		'background':'#FFF',
		'display':'inline-block'
	});
	div_slide.css({
		'background': '#1C1C1C',
		'overflow': 'hidden'
	});
	div_slide.append('<canvas id="m4terial" width="'+imaging.width()+'" height="'+imaging.height()+'"></canvas>');
	
	canvas = document.getElementById('m4terial'),
		ctx = canvas.getContext('2d'),
		W = canvas.width = imaging.width(),
		H = canvas.height = imaging.height(),
		pixels = [];

	for (var x = -300; x < 400; x += 6) {
	  for (var z = -250; z < 350; z += 5) {
		pixels.push({x: x, y: 500, z: z});
	  }  
	}
	m4terial_drawFrame();
	jQuery(document).trigger("slide_next_complete", ['vt-imaging-app']);
	_self.resizeFix();
	_self.clearScreenLoading();
	audio.unbind("ended").bind("ended", function(){
		_self.setActiveImaging(_self.currently_active_imaging+1);
		_self.loadImaging();
	});
}