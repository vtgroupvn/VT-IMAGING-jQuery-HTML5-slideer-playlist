window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_zoom_in'];
}
function vt_imaging_plg_zoom_in(VT_Obj, VT_Imaging, VT_Audio, VT_Element_Slide)
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
		'background': "url('"+VT_Obj.getCurrentImaging().src+"') no-repeat center",
		'text-align': 'center','margin':'auto',
		'vertical-align': 'middle',
		'background-color':'none'
			
	});
	VT_Element_Slide.attr('align', 'center');
	VT_Imaging.find('img').attr('src', VT_Obj.getCurrentImaging().src);
	var center = jQuery('<center/>');
	var img = jQuery('<div />');
	img.css({
		'width': VT_Imaging.width(), 
		'height': VT_Imaging.height(),
		'z-index': '99',
		'position': 'relative',
		'border-radius': '60%',
		'-ms-interpolation-mode': 'bicubic',
		'background': "url('"+VT_Obj.getOldImaging().src+"') no-repeat center",	
		'margin':'auto',
		'vertical-align': 'middle'		
	});
	VT_Element_Slide.append(img);
	VT_Element_Slide.find('div').stop()
	.animate({
			width: '0px', 
			height: '0px',
			'margin-top': VT_Element_Slide.height()/2,
			'margin-bottom': VT_Element_Slide.height()/2
		}, 1000, function(){
			VT_Obj.onCompletePlugin("vt_imaging_plg_zoom_in", undefined);
	}); 
}