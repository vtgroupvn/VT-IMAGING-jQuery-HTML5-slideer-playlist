window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_zoom_topright'];
}
function vt_imaging_plg_zoom_topright(_self, imaging, audio, div_slide)
{
	_self.onStartPlugin();
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	
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
			_self.onCompletePlugin("vt_imaging_plg_zoom_topright", "noneimage");
	});	
}