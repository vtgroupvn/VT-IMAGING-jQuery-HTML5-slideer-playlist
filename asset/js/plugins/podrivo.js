function vt_imaging_plg_podrivo(_self)
{
	_self.onStartPlugin('show-loading');
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	_self.loadStyle('libraries/podrivo.css');
	_self.getImagingOverlay().append('<div class="podrivo-part ex">'
	+'<div><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p></div>'
	+'<div><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p></div>'
	+'<div><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p></div>'
	+'<div><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p></div>'
	+'<div><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p></div>'
	+'<div><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p></div>'
	+'<div><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p></div>'
	+'<div><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p></div>'
	+'</div>');
	_self.onCompletePlugin("noneimage");
}