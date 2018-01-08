window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_nobitagit'];
}
function vt_imaging_plg_nobitagit(_self, imaging, audio, div_slide)
{
	_self.onStartPlugin(true);
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	div_slide.css({
		'background': '#333'
	});
	jQuery('<link>')
	  .appendTo('head')
	  .attr({
		  type: 'text/css', 
		  rel: 'stylesheet',
		  href: _self.options.url_plugin_folder+'/libraries/nobitagit.css'
	  });
	div_slide.append('<div class="nobitagit"></div><div class="nobitagit"></div><div class="nobitagit"></div><div class="nobitagit"></div>');
	_self.onCompletePlugin("vt_imaging_plg_nobitagit", "noneimage");
}