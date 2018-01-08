window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_zoom_bottomright'];
}
function vt_imaging_plg_zoom_bottomright(VT_Obj, VT_Imaging, VT_Audio, VT_Element_Slide)
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
		'background': "url('"+VT_Obj.getCurrentImage().src+"') no-repeat center",
		'background-color':'none'
	});
	VT_Imaging.find('img').attr('src', VT_Obj.getCurrentImage().src);
	var img = jQuery('<img />');
	img.css({
		'width': VT_Imaging.width(), 
		'height': VT_Imaging.height(),
		'z-index': '99',
		'position': 'absolute',
		'left': 0,
		'top': 0,
		'-ms-interpolation-mode': 'bicubic',
		'background': "url('"+VT_Obj.getCurrentImage().src+"') no-repeat center"
	});
	img.attr('src', VT_Obj.getOldImage().src);
	VT_Element_Slide.append(img);
	VT_Element_Slide.find('img').stop()
	.animate({			
			width: '0px',
			height: '0px',
			top: VT_Imaging.position().top + VT_Imaging.height(),
			left: VT_Imaging.position().left + VT_Imaging.width()
		}, 1500, function(){
			VT_Obj.onCompletePlugin("vt_imaging_plg_zoom_bottomright", undefined);
	}); 
}