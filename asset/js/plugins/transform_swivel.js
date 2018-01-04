var swivel_x,swivel_n=0,swivel_rotINT, sub_rotate = 1;
function rotateDIV(el)
{
	swivel_x=el[0];
	clearInterval(swivel_rotINT);
	swivel_rotINT=setInterval("startRotate()",10);
}

function startRotate()
{
	swivel_n=swivel_n+sub_rotate;
	if(swivel_n >= 360){
		swivel_n = 360;
	}
	swivel_x.style.transform="rotate(" + swivel_n + "deg)";
	swivel_x.style.webkitTransform="rotate(" + swivel_n + "deg)";
	swivel_x.style.OTransform="rotate(" + swivel_n + "deg)";
	swivel_x.style.MozTransform="rotate(" + swivel_n + "deg)";
	if (swivel_n <= 100){
		sub_rotate = 5;
		jQuery(swivel_x).find('img').css({'width':swivel_n});
	}
	if (swivel_n==360)
	{
		jQuery(document).trigger('rotate_complete');
		clearInterval(swivel_rotINT);
	}
}

function vt_imaging_plg_transform_swivel(_self, imaging, audio, div_slide)
{
	_self.createScreenLoading();
	swivel_n=0;
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	audio.find('source').attr('src', _self.getCurrentImage().audio_src);
	audio.find('source').attr('type', 'audio/mpeg');
	audio[0].load();
	audio[0].play();
	div_slide.html('');
	div_slide.show();
	imaging.css({opacity: 0.5});
	imaging.find('img').attr('src', _self.getCurrentImage().src);
	imaging.find('img').css({'width':'0px'});
	jQuery(document).unbind('rotate_complete').on('rotate_complete', function(){
		imaging.find('img').animate({
			'height': imaging.height(),
			'width': imaging.width(),
			'opacity': '1'
		}, 500, function(){
			imaging.css({opacity: 1});
			jQuery(document).trigger("slide_next_complete");
		});
	});
	rotateDIV(imaging);
	_self.clearScreenLoading();
	audio.unbind("ended").bind("ended", function(){
		_self.setActiveImaging(_self.currently_active_imaging+1);
		_self.loadImaging();
	});
}