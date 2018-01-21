function vt_imaging_plg_marcmalignan(_self)
{
	_self.onStartPlugin('show-loading');
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	_self.getImagingOverlay().css({
		'background': 'radial-gradient(#888, #444)'
	});
	_self.loadStyle('libraries/marcmalignan.css');
	_self.getImagingOverlay().append('<div id="marcmalignan-loader">'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
	+'</div>');
	_self.onCompletePlugin("noneimage");
}