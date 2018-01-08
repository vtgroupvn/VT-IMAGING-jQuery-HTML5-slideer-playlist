var transform_set = false,transform_y,transform_ny=0,transform_rotYINT;
function rotateYDIV(el)
{
	transform_y = el[0];
	clearInterval(transform_rotYINT);
	transform_rotYINT=setInterval("startYRotate()",10);
}
function startYRotate()
{
	transform_ny=transform_ny+1;
	transform_y.style.transform="rotateY(" + transform_ny + "deg)";
	transform_y.style.webkitTransform="rotateY(" + transform_ny + "deg)";
	transform_y.style.OTransform="rotateY(" + transform_ny + "deg)";
	transform_y.style.MozTransform="rotateY(" + transform_ny + "deg)";
	if (transform_ny==90 && !transform_set){
		jQuery(document).trigger('rotate_complete');
		transform_ny = 269;
		transform_set = true;
	}else if(transform_ny==360){
		clearInterval(transform_rotYINT);
	}
}
window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_transform_yscale'];
}
function vt_imaging_plg_transform_yscale(VT_Obj, VT_Imaging, VT_Audio, VT_Element_Slide)
{
	VT_Obj.onStartPlugin();
	transform_ny = 0;
	/**
	*
	* Feel want to make print function VT_Obj.print_values.printFunction = function(){}
	*
	**/
	VT_Element_Slide.css({
		'background-color':'none'
	});
	transform_set = false;
	jQuery(document).unbind('rotate_complete').on('rotate_complete', function(){
		VT_Obj.onCompletePlugin("vt_imaging_plg_transform_yscale", undefined);
	});
	rotateYDIV(VT_Imaging);
}