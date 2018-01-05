window.requestAnimFrame = (function(){
return window.requestAnimationFrame   ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    function( callback ){
      window.setTimeout(callback, 1000 / 60);
    };
})();

var iSawTheSin = 0;
function nsharmon_render() {
  var c=document.getElementById('nsharmon');
  var ctx=c.getContext('2d');
  ctx.fillStyle = "rgba(255,255,255,.1)";
  ctx.fillRect(0, 0, c.width, c.height);
  
  for(var i=0; i<22; ++i){
	  for(var j=0; j<22; ++j){
      var timeVal = (1+Math.sin(i+j+iSawTheSin))*5;
	  	ctx.beginPath();
		  ctx.arc(j*50, i*50, j+i+timeVal, 0, 2*Math.PI);
	  	ctx.stroke()
  	}
  }
  iSawTheSin+= 0.1;
  if(iSawTheSin > 2*Math.PI) {
    iSawTheSin -= 2*Math.PI;
  }
  window.requestAnimFrame(nsharmon_render);
}
window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_nsharmon'];
}
function vt_imaging_plg_nsharmon(_self, imaging, audio, div_slide)
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
	_self.resizeFix();
	div_slide.append('<canvas id="nsharmon" width="'+imaging.width()+'" height="'+imaging.height()+'"></canvas>');
	nsharmon_render();
	_self.clearScreenLoading();
	audio.unbind("ended").bind("ended", function(){
		_self.setActiveImaging(_self.currently_active_imaging+1);
		_self.loadImaging();
	});
}