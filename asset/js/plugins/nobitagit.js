function vt_imaging_plg_nobitagit(_self)
{
	_self.onStartPlugin('show-loading');
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	_self.getImagingOverlay().css({
		'background': '#333'
	});
	_self.loadStyle('libraries/nobitagit.css');
	_self.getImagingOverlay().append('<div class="nobitagit"></div><div class="nobitagit"></div><div class="nobitagit"></div><div class="nobitagit"></div>');
	_self.onCompletePlugin("noneimage");
}