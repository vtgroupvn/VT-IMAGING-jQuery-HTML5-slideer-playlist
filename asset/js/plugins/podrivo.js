window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_podrivo'];
}
function vt_imaging_plg_podrivo(_self, imaging, audio, div_slide)
{
	_self.onStartPlugin(true);
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	jQuery('<link>')
	  .appendTo('head')
	  .attr({
		  type: 'text/css', 
		  rel: 'stylesheet',
		  href: _self.options.url_plugin_folder+'/libraries/podrivo.css'
	  });
	div_slide.append('<div class="podrivo-part ex">'
	+'<div><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p></div>'
	+'<div><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p></div>'
	+'<div><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p></div>'
	+'<div><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p></div>'
	+'<div><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p></div>'
	+'<div><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p></div>'
	+'<div><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p></div>'
	+'<div><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p></div>'
	+'</div>');
	_self.onCompletePlugin("vt_imaging_plg_podrivo", "noneimage");
}