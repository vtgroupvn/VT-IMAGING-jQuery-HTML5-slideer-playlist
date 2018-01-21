function vt_imaging_plg_zoom_bottomright(_self)
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
		'background-color':'none'
	});
	_self.getImaging().find('img').attr('src', _self.getCurrentImaging().src);
	var img = jQuery('<img />');
	img.css({
		'width': _self.getImaging().width(), 
		'height': _self.getImaging().height(),
		'z-index': '99',
		'position': 'absolute',
		'left': 0,
		'top': 0,
		'-ms-interpolation-mode': 'bicubic',
		'background': "url('"+_self.getCurrentImaging().src+"') no-repeat center"
	});
	img.attr('src', _self.getOldImaging().src);
	_self.getImagingOverlay().append(img);
	_self.getImagingOverlay().find('img').stop()
	.animate({
			width: '0px',
			height: '0px',
			top: _self.getImaging().position().top + _self.getImaging().height(),
			left: _self.getImaging().position().left + _self.getImaging().width()
		}, 1500, function(){
			_self.onCompletePlugin();
	}); 
}