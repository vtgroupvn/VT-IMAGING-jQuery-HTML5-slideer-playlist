window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_zoom_topright'];
}
function vt_imaging_plg_zoom_topright(_self, imaging, audio, div_slide)
{
	//_self.createScreenLoading();
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
		'background': "url('"+_self.getCurrentImage().src+"') no-repeat center",
		'background-color':'none'
	});
	imaging.find('img').attr('src', _self.getCurrentImage().src);
	var img = jQuery('<img />');
	img.css({
		'width': imaging.width(), 
		'height': imaging.height(),
		'z-index': '99',
		'position': 'absolute',
		'right': 0,
		'top': 0,
		'-ms-interpolation-mode': 'bicubic',
		'background': "url('"+_self.getCurrentImage().src+"') no-repeat center"
	});
	img.attr('src', _self.getOldImage().src);
	div_slide.append(img);
	div_slide.find('img').stop()
	.animate({
			width: '0px', 
			height: '0px'
		}, 1500, function(){
			jQuery(document).trigger("slide_next_complete", ["vt-imaging-app"]);
	}); 
	audio.unbind("ended").bind("ended", function(){
		_self.setActiveImaging(_self.currently_active_imaging+1);
		_self.loadImaging();
	});
}