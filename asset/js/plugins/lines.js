window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_lines'];
}
function vt_imaging_plg_lines(_self, imaging, audio, div_slide)
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
		var element_width = 90;
	}else{
		var element_width = 77;
	}
	imaging.find('img').attr('src', _self.getCurrentImage().src);
	var width = imaging.width()/element_width;
	var height = imaging.height();
	var elements = new Array();
	var new_src = _self.getOldImage().src;
	for(var i=0; i < width; i++){
		
		elements[i] = jQuery('<div />');
		var child_element = jQuery('<div />');
		child_element.attr('class' ,'lines-child-element');
		elements[i].attr('class', 'over-lay-slide');
		elements[i].attr('id', 'over-lay-slide-louvers-'+i);
		elements[i].css({
			'float': 'left',
			'height': height,
			'width': element_width,
			'display': 'block',
			'opacity': 1,
			'z-index': '999'
		});
		child_element.css({
			'background-image': "url('"+new_src+"')",
			'background-size': (imaging.width()+'px')+' '+ (imaging.height()+'px'),
			'float': 'left',
			'height': height,
			'width': element_width,
			'display': 'block',
			'opacity': 1,
			'z-index': '999',
			'background-position':('-'+(element_width * i)+'px')+' '+('-'+height+'px')
		});
		elements[i].append(child_element);
		div_slide.append(elements[i]);
	}
	_self.clearScreenLoading();
	_self.print_values.linesPrintShow(elements, 500);
	
	audio.unbind("ended").bind("ended", function(){
		_self.setActiveImaging(_self.currently_active_imaging+1);
		_self.loadImaging();
	});
}