window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_broken'];
}
function vt_imaging_plg_broken(_self, imaging, audio, div_slide)
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
	if (_self.options.skin == 1){
		var element_width = 90, element_height = 48;
	}else{
		var element_width = 77, element_height = 58;
	}
	imaging.find('img').attr('src', _self.getCurrentImage().src);
	var width = div_slide.width()/element_width;
	var height = div_slide.height()/element_height;
	var elements = new Array();
	var new_src = _self.getOldImage().src;
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
				'opacity': 1,
				'background-position':('-'+position_width+'px')+' '+('-'+position_height+'px')
			});
			div_slide.append(elements[i][n]);
		}
	}
	_self.clearScreenLoading();
	_self.print_values.spiralPrintHide(elements, 50);
	
	audio.unbind("ended").bind("ended", function(){
		_self.setActiveImaging(_self.currently_active_imaging+1);
		_self.loadImaging();
	});
}