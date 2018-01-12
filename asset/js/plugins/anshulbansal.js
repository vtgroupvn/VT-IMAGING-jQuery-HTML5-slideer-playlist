window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_anshulbansal'];
}
function vt_imaging_plg_anshulbansal(VT_Obj, VT_Imaging, VT_Audio, VT_Element_Slide)
{
	VT_Obj.onStartPlugin(true);
	/**
	*
	* Feel want to make print function VT_Obj.print_values.printFunction = function(){}
	*
	**/
	VT_Element_Slide.css({
		'height': VT_Imaging.height(),
		'width': VT_Imaging.width(),
		'background': '#1C1C1C',
		'overflow': 'hidden'
	});
	VT_Obj.loadStyle(VT_Obj.options.url_plugin_folder+'/libraries/anshulbansal.css');
	VT_Element_Slide.append('<section id="anshulbansal">'
	  +'<div class="anshulbansal-loader">'
		+'<div class="anshulbansal-load a"></div>'
		+'<div class="anshulbansal-load b"></div>'
		+'<div class="anshulbansal-load c"></div>'
		+'<div class="anshulbansal-load d"></div>'
		+'<div class="anshulbansal-load e"></div>'
		+'<div class="anshulbansal-load f"></div>'
		+'<div class="anshulbansal-load g"></div>'
		+'<div class="anshulbansal-load h"></div>'
		+'<div class="anshulbansal-load i"></div>'
		+'<div class="anshulbansal-load j"></div>'
	  +'</div>'
	+'</section>');
	VT_Obj.onCompletePlugin("vt_imaging_plg_anshulbansal", "noneimage");
}