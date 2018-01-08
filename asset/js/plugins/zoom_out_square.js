window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_zoom_out_square'];
}
function vt_imaging_plg_zoom_out_square(VT_Obj, VT_Imaging, VT_Audio, VT_Element_Slide)
{
	VT_Obj.onStartPlugin();
	/**
	*
	* Feel want to make print function VT_Obj.print_values.printFunction = function(){}
	*
	**/
	VT_Element_Slide.css({
		'position': 'absolute',
		'display': 'inline-block',
		'overflow-x': 'hidden',
		'overflow-y': 'hidden',
		'overflow':'hidden',
		'background': "url('"+VT_Obj.getOldImaging().src+"') no-repeat center",
		'text-align': 'center','margin':'auto',
		'vertical-align': 'middle',
		'background-color':'none'
			
	});
	VT_Element_Slide.attr('align', 'center');
	VT_Imaging.find('img').attr('src', VT_Obj.getOldImaging().src);
	var center = jQuery('<center/>');
	var img = jQuery('<div />');
	img.css({
		'width': '5px', 
		'height': '5px',
		'z-index': '99',
		'position': 'relative',
		'-ms-interpolation-mode': 'bicubic',
		'background': "url('"+VT_Obj.getCurrentImaging().src+"') no-repeat center",	
		'margin':'auto',
		'vertical-align': 'middle',
		'margin-top': VT_Element_Slide.height()/2,
		'margin-left': VT_Element_Slide.width()/2,
		'margin-bottom': VT_Element_Slide.height()/2,
		'margin-right': VT_Element_Slide.height()/2
	});
	VT_Element_Slide.append(img);
	VT_Element_Slide.find('div').stop()
	.animate({
			width: VT_Imaging.width()+200, 
			height: VT_Imaging.height()+200,
			'margin-top': '-100px',
			'margin-left': '-100px',
			'margin-right': '-100px',
			'margin-bottom': '-100px'
		}, 1000, function(){
			VT_Obj.onCompletePlugin("vt_imaging_plg_zoom_out", undefined);
			VT_Element_Slide.hide();
	});	
}