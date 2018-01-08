window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_nobitagit'];
}
function vt_imaging_plg_nobitagit(VT_Obj, VT_Imaging, VT_Audio, VT_Element_Slide)
{
	VT_Obj.onStartPlugin(true);
	/**
	*
	* Feel want to make print function VT_Obj.print_values.printFunction = function(){}
	*
	**/
	VT_Element_Slide.css({
		'background': '#333'
	});
	jQuery('<link>')
	  .appendTo('head')
	  .attr({
		  type: 'text/css', 
		  rel: 'stylesheet',
		  href: VT_Obj.options.url_plugin_folder+'/libraries/nobitagit.css'
	  });
	VT_Element_Slide.append('<div class="nobitagit"></div><div class="nobitagit"></div><div class="nobitagit"></div><div class="nobitagit"></div>');
	VT_Obj.onCompletePlugin("vt_imaging_plg_nobitagit", "noneimage");
}