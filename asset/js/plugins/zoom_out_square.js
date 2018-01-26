function vt_imaging_plg_zoom_out_square(_self)
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
		'background': "url('"+_self.getOldImaging().src+"') no-repeat center",
		'text-align': 'center;margin':'auto',
		'vertical-align': 'middle',
		'background-color':'none'
			
	});
	_self.getImagingOverlay().attr('align', 'center');
	_self.getImaging().find('img').attr('src', _self.getOldImaging().src);
	var center = jQuery('<center/>');
	var img = jQuery('<div />');
	img.css({
		'width': '5px', 
		'height': '5px',
		'z-index': '99',
		'position': 'relative',
		'-ms-interpolation-mode': 'bicubic',
		'background': "url('"+_self.getCurrentImaging().src+"') no-repeat center",	
		'margin':'auto',
		'vertical-align': 'middle',
		'margin-top': _self.getImagingOverlay().height()/2,
		'margin-left': _self.getImagingOverlay().width()/2,
		'margin-bottom': _self.getImagingOverlay().height()/2,
		'margin-right': _self.getImagingOverlay().height()/2
	});
	_self.getImagingOverlay().append(img);
	_self.getImagingOverlay().find('div').stop()
	.animate({
			width: _self.getImaging().width()+200, 
			height: _self.getImaging().height()+200,
			'margin-top': '-100px',
			'margin-left': '-100px',
			'margin-right': '-100px',
			'margin-bottom': '-100px'
		}, 1000, function(){
			_self.onCompletePlugin();
			_self.getImagingOverlay().hide();
	});	
}