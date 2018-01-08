window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_srekoble'];
}
function vt_imaging_plg_srekoble(_self, imaging, audio, div_slide)
{
	_self.onStartPlugin(true);
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	div_slide.css({
		'background': '#1C1C1C',
		'overflow': 'hidden'
	});
	jQuery('<link>')
	  .appendTo('head')
	  .attr({
		  type: 'text/css', 
		  rel: 'stylesheet',
		  href: _self.options.url_plugin_folder+'/libraries/srekoble.css'
	  });
	div_slide.append('<div class="srekoble-wrap"><ul><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul></div>');
	_self.onCompletePlugin("vt_imaging_plg_srekoble", "noneimage");
}