window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_marcmalignan'];
}
function vt_imaging_plg_marcmalignan(_self, imaging, audio, div_slide)
{
	_self.onStartPlugin(true);
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	div_slide.css({
		'background': 'radial-gradient(#888, #444)'
	});
	jQuery('<link>')
	  .appendTo('head')
	  .attr({
		  type: 'text/css', 
		  rel: 'stylesheet',
		  href: _self.options.url_plugin_folder+'/libraries/marcmalignan.css'
	  });
	div_slide.append('<div id="marcmalignan-loader">'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
	+'</div>');
	_self.onCompletePlugin("vt_imaging_plg_marcmalignan", "noneimage");
}