window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_zoom_out'];
}
function vt_imaging_plg_zoom_out(_self, imaging, audio, div_slide)
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
	div_slide.css({
		'position': 'absolute',
		'display': 'inline-block',
		'overflow-x': 'hidden',
		'overflow-y': 'hidden',
		'overflow':'hidden',
		'background': "url('"+_self.getOldImage().src+"') no-repeat center",
		'text-align': 'center','margin':'auto',
		'vertical-align': 'middle',
		'background-color':'none'
			
	});
	div_slide.attr('align', 'center');
	imaging.find('img').attr('src', _self.getOldImage().src);
	var center = jQuery('<center/>');
	var img = jQuery('<div />');
	img.css({
		'width': '5px', 
		'height': '5px',
		'z-index': '99',
		'position': 'relative',
		'border-radius': '60%',
		'-ms-interpolation-mode': 'bicubic',
		'background': "url('"+_self.getCurrentImage().src+"') no-repeat center",	
		'margin':'auto',
		'vertical-align': 'middle',
		'margin-top': div_slide.height()/2,
		'margin-left': div_slide.width()/2,
		'margin-bottom': div_slide.height()/2,
		'margin-right': div_slide.height()/2
	});
	div_slide.append(img);
	div_slide.find('div').stop()
	.animate({
			width: imaging.width()+200, 
			height: imaging.height()+200,
			'margin-top': '-100px',
			'margin-left': '-100px',
			'margin-right': '-100px',
			'margin-bottom': '-100px'
		}, 1000, function(){
			jQuery(document).trigger("slide_next_complete", ["vt-imaging-app"]);
	}); 
	audio.unbind("ended").bind("ended", function(){
		_self.setActiveImaging(_self.currently_active_imaging+1);
		_self.loadImaging();
	});
	_self.clearScreenLoading();
}