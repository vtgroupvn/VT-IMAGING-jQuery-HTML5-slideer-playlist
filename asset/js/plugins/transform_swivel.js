var swivel_x,swivel_n=0,swivel_rotINT, sub_rotate = 1;
function rotateDIV(el)
{
	swivel_x=el[0];
	clearInterval(swivel_rotINT);
	swivel_rotINT=setInterval("startRotate()",10);
}

function startRotate()
{
	swivel_n=swivel_n+sub_rotate;
	if(swivel_n >= 360){
		swivel_n = 360;
	}
	swivel_x.style.transform="rotate(" + swivel_n + "deg)";
	swivel_x.style.webkitTransform="rotate(" + swivel_n + "deg)";
	swivel_x.style.OTransform="rotate(" + swivel_n + "deg)";
	swivel_x.style.MozTransform="rotate(" + swivel_n + "deg)";
	if (swivel_n <= 100){
		sub_rotate = 5;
		jQuery(swivel_x).find('img').css({'width':swivel_n});
	}
	if (swivel_n==360)
	{
		jQuery(document).trigger('rotate_complete');
		clearInterval(swivel_rotINT);
	}
}
window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_transform_swivel'];
}
function vt_imaging_plg_transform_swivel(VT_Obj, VT_Imaging, VT_Audio, SLIDE_Element)
{
	VT_Obj.onStartPlugin();
	swivel_n=0;
	/**
	*
	* Feel want to make print function VT_Obj.print_values.printFunction = function(){}
	*
	**/
	SLIDE_Element.css({
		'background-color':'none'
	});
	VT_Imaging.css({opacity: 0.5});
	VT_Imaging.find('img').attr('src', VT_Obj.getCurrentImage().src);
	VT_Imaging.find('img').css({'width':'200px'});
	VT_Imaging.find('img').css({'height':'200px'});
	VT_Imaging.find('img').css({
		'margin-top':'100px'
	});
	jQuery(document).unbind('rotate_complete').on('rotate_complete', function(){
		VT_Imaging.find('img').animate({
			'height': VT_Imaging.height(),
			'width': VT_Obj.form_imaging.width(),
			'opacity': '1',
			'margin-top':'0px'
		}, 500, function(){
			VT_Imaging.css({opacity: 1});
			VT_Obj.onCompletePlugin("vt_imaging_plg_transform_swivel", undefined);
		});
	});
	rotateDIV(imaging.find('img'));
}