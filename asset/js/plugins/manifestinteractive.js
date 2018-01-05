var wave_height = 150,      // Height of wave
    wave_shift = 0.02,      // Alter how wave shifs
    ball_count = 75,        // Number of balls in the wave
    ball_size = 10,         // How big should each ball be
    base_color = '#05527f', // Base color for ball before bightness is applied
    max_brightness = 75,    // Max brightness ( 0 = No Brigthness, 100 = Max Brightness )
    max_blur = 2,           // How much blur to add during moving
    period_factor = 2,      // Period Factor
    count = 0;              // This just keeps track of where we are in the wave formation

function manifestinteractive_load(){

  var wave = document.getElementById('manifestinteractive');
  wave.style.width = (ball_size*ball_count) + 'px';
  wave.style.height = wave_height + 'px';
  
  for(var i=0; i<ball_count; i++)
  {
    var ball = document.createElement('div');
    ball.id = 'ball' + i;
    ball.className = 'ball';
    ball.style.width = ball_size + 'px';
    ball.style.height = ball_size + 'px';
    ball.style.backgroundColor = base_color;
    ball.style.left = (i*ball_size) +'px';
    ball.style.top = (( wave_height / 2 ) - (ball_size / 2)) +'px';
    
    wave.appendChild(ball);
  }
  
	move();
};


function move()
{
  count++;
  for(var i=0; i<ball_count; i++)
  {
    var top = wave_height / 2 * ( 1 + Math.sin( ( count / period_factor * ( i / ( ball_size * ball_count ) + wave_shift ) ) % period_factor * Math.PI ) );
    var bg_color = increase_brightness( base_color, max_brightness - Math.floor( ( ( top / wave_height ) * max_brightness ) ) );
    var blur = max_blur - Math.abs( max_blur * ( (wave_height /2 ) - ( wave_height * ( top / wave_height ) ) ) / ( wave_height / 2 ) );
    var ball = document.getElementById('ball' + i);
    ball.style.top = top +'px';
    ball.style.backgroundColor = bg_color;
    ball.style.filter = 'blur('+blur+'px)';
    ball.style.webkitFilter = 'blur('+blur+'px)';
  }
    
  if(count == (( 2 * period_factor ) * ( ball_size * ball_count )))
  {
    count = 0;
  }
  
  requestAnimationFrame(move);
}

function increase_brightness(hex, percent){
  // strip the leading # if it's there
  hex = hex.replace(/^\s*#|\s*$/g, '');

  if(percent > 99) percent = 99;

  if(hex.length == 3){
    hex = hex.replace(/(.)/g, '$1$1');
  }

  var r = parseInt(hex.substr(0, 2), 16),
      g = parseInt(hex.substr(2, 2), 16),
      b = parseInt(hex.substr(4, 2), 16);

  return '#' +
    ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
    ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
    ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
}
window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_manifestinteractive'];
}
function vt_imaging_plg_manifestinteractive(_self, imaging, audio, div_slide)
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
	jQuery('<link>')
	  .appendTo('head')
	  .attr({
		  type: 'text/css', 
		  rel: 'stylesheet',
		  href: _self.options.url_plugin_folder+'/libraries/manifestinteractive.css'
	  });
	div_slide.append('<div id="manifestinteractive"></div>');
	manifestinteractive_load();
	jQuery(document).trigger("slide_next_complete", ['vt-imaging-app']);
	_self.resizeFix();
	_self.clearScreenLoading();
	audio.unbind("ended").bind("ended", function(){
		_self.setActiveImaging(_self.currently_active_imaging+1);
		_self.loadImaging();
	});
}