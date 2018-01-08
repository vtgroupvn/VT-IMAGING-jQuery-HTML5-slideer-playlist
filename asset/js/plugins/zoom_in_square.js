window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_zoom_in_square'];
}
function vt_imaging_plg_zoom_in_square(_self, imaging, audio, div_slide)
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
		'text-align': 'center','margin':'auto',
		'vertical-align': 'middle',
		'background-color':'none'
			
	});
	div_slide.attr('align', 'center');
	imaging.find('img').attr('src', _self.getCurrentImage().src);
	var center = jQuery('<center/>');
	var img = jQuery('<div />');
	img.css({
		'width': imaging.width(), 
		'height': imaging.height(),
		'z-index': '99',
		'position': 'relative',
		'-ms-interpolation-mode': 'bicubic',
		'background': "url('"+_self.getOldImage().src+"') no-repeat center",	
		'margin':'auto',
		'vertical-align': 'middle'		
	});
	div_slide.append(img);
	div_slide.find('div').stop()
	.animate({
			width: '0px', 
			height: '0px',
			'margin-top': div_slide.height()/2,
			'margin-bottom': div_slide.height()/2
		}, 1000, function(){
			_self.onCompletePlugin("vt_imaging_plg_zoom_in", undefined);
			div_slide.hide();
	}); 
}