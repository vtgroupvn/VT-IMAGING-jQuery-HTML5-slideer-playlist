window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_louvers'];
}
function vt_imaging_plg_louvers(_self, imaging, audio, div_slide)
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
	var old_height = imaging.find('img').height();
	var old_width = imaging.find('img').width();
	imaging.find('img').attr('src', 'none');
	if (_self.options.skin == 1){
		var element_width = 90;
	}else{
		var element_width = 77;
	}
	imaging.css({
		'height': old_height,
		'width': old_width,
		'background':'#FFF',
		'display':'inline-block'
	});
	_self.resizeFix();
	div_slide.css({
		'height': imaging.height(), 
		'width': imaging.width(),
		'cursor': 'pointer',
		'position': 'absolute',
		'display': 'inline-block',
		'top': imaging.position().top,
		'left': imaging.position().left,
		'text-align': 'center',
		'background':'none',
		'display': 'inline-block',
		'overflow-x': 'none',
		'overflow-y': 'none',
		'overflow':'none',
		'margin-top': '0px',
		'background-color':'none'
	});
	var width = imaging.width()/element_width;
	var height = imaging.height();
	var elements = new Array();
	var new_src = _self.getCurrentImage().src;
	for(var i=0; i < width; i++){
		
		elements[i] = jQuery('<div />');
		var child_element = jQuery('<div />');
		child_element.attr('class' ,'louvers-child-element');
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
			'width': '0px',
			'display': 'block',
			'opacity': 1,
			'z-index': '999',
			'background-position':('-'+(element_width * i)+'px')+' '+('-'+height+'px'),
			'border':'1px solid #000'
		});
		elements[i].append(child_element);
		div_slide.append(elements[i]);
	}
	_self.clearScreenLoading();
	_self.print_values.louversPrintShow(elements, 500);
	
	audio.unbind("ended").bind("ended", function(){
		_self.setActiveImaging(_self.currently_active_imaging+1);
		_self.loadImaging();
	});
}