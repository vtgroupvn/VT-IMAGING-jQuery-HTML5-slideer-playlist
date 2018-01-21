function vt_imaging_plg_srekoble(_self)
{
	_self.onStartPlugin('show-loading');
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	_self.getImagingOverlay().css({
		'background': '#1C1C1C',
		'overflow': 'hidden'
	});
	_self.loadStyle('libraries/srekoble.css');
	_self.getImagingOverlay().append('<div class="srekoble-wrap"><ul><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul></div>');
	_self.onCompletePlugin("noneimage");
}