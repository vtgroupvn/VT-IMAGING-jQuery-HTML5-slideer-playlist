window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_podrivo'];
}
function vt_imaging_plg_podrivo(VT_Obj, VT_Imaging, VT_Audio, VT_Element_Slide)
{
	VT_Obj.onStartPlugin(true);
	/**
	*
	* Feel want to make print function VT_Obj.print_values.printFunction = function(){}
	*
	**/
	VT_Obj.loadStyle(VT_Obj.options.url_plugin_folder+'/libraries/podrivo.css');
	VT_Element_Slide.append('<div class="podrivo-part ex">'
	+'<div><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p></div>'
	+'<div><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p></div>'
	+'<div><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p></div>'
	+'<div><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p></div>'
	+'<div><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p></div>'
	+'<div><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p></div>'
	+'<div><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p></div>'
	+'<div><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p><p><b></b></p></div>'
	+'</div>');
	VT_Obj.onCompletePlugin("vt_imaging_plg_podrivo", "noneimage");
}