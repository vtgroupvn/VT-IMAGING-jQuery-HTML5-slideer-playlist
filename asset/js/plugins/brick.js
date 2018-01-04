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

function vt_imaging_plg_brick(_self, imaging, audio, div_slide)
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
	div_slide.html('');
	div_slide.css({
		'margin-top': '0px'
	});
	if (_self.options.skin == 1){
		var element_width = 90, element_height = 48;
	}else{
		var element_width = 77, element_height = 58;
	}
	
	var width = div_slide.width()/element_width;
	var height = div_slide.height()/element_height;
	var elements = new Array();
	var new_src = _self.getCurrentImage().src;
	for(var i=0; i < height; i++){
		elements[i] = new Array();
		var position_height = i*element_height;
		for(var n = 0; n < width; n++){
			var position_width = n*element_width;
			elements[i][n] = jQuery('<div />');
			elements[i][n].attr('class', 'over-lay-slide');
			elements[i][n].attr('id', 'over-lay-slide-'+i+'-'+n);
			elements[i][n].css({
				'background-image': "url('"+new_src+"')",
				'background-size': (imaging.width()+'px')+' '+ (imaging.height()+'px'),
				'float': 'left',
				'height': element_height,
				'width': element_width,
				'display': 'block',
				'opacity': 0,
				'z-index': '999',
				'background-position':('-'+position_width+'px')+' '+('-'+position_height+'px')
			});
			div_slide.append(elements[i][n]);
			rotateDIV(elements[i][n]);
		}
	}
	_self.clearScreenLoading();
	//_self.print_values.louversPrintShow(elements, 500);
	
	audio.unbind("ended").bind("ended", function(){
		_self.setActiveImaging(_self.currently_active_imaging+1);
		_self.loadImaging();
	});
}