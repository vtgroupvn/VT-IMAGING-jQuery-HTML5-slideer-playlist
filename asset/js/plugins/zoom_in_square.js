function vt_imaging_plg_zoom_in_square(_self)
{
	_self.onStartPlugin();
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	_self.getImagingOverlay().css({
		'position': 'absolute',
		'display': 'inline-block',
		'overflow-x': 'hidden',
		'overflow-y': 'hidden',
		'overflow':'hidden',
		'background': "url('"+_self.getCurrentImaging().src+"') no-repeat center",
		'text-align': 'center','margin':'auto',
		'vertical-align': 'middle',
		'background-color':'none'
			
	});
	_self.getImagingOverlay().attr('align', 'center');
	_self.getImaging().find('img').attr('src', _self.getCurrentImaging().src);
	var center = jQuery('<center/>');
	var img = jQuery('<div />');
	img.css({
		'width': _self.getImaging().width(), 
		'height': _self.getImaging().height(),
		'z-index': '99',
		'position': 'relative',
		'-ms-interpolation-mode': 'bicubic',
		'background': "url('"+_self.getOldImaging().src+"') no-repeat center",	
		'margin':'auto',
		'vertical-align': 'middle'		
	});
	_self.getImagingOverlay().append(img);
	_self.getImagingOverlay().find('div').stop()
	.animate({
			width: '0px', 
			height: '0px',
			'margin-top': _self.getImagingOverlay().height()/2,
			'margin-bottom': _self.getImagingOverlay().height()/2
		}, 1000, function(){
			_self.onCompletePlugin();
			_self.getImagingOverlay().hide();
	}); 
}