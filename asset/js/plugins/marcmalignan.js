window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_marcmalignan'];
}
function vt_imaging_plg_marcmalignan(VT_Obj, VT_Imaging, VT_Audio, VT_Element_Slide)
{
	VT_Obj.onStartPlugin(true);
	/**
	*
	* Feel want to make print function VT_Obj.print_values.printFunction = function(){}
	*
	**/
	VT_Element_Slide.css({
		'background': 'radial-gradient(#888, #444)'
	});
	VT_Obj.loadStyle(VT_Obj.options.url_plugin_folder+'/libraries/marcmalignan.css');
	VT_Element_Slide.append('<div id="marcmalignan-loader">'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
	+'</div>');
	VT_Obj.onCompletePlugin("vt_imaging_plg_marcmalignan", "noneimage");
}