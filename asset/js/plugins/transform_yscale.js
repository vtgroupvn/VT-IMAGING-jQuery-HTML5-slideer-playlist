var transform_set = false,transform_y,transform_ny=0,transform_rotYINT;
function rotateYDIV(el)
{
	transform_y = el[0];
	clearInterval(transform_rotYINT);
	transform_rotYINT=setInterval(function(){
		if (typeof startYRotate == 'undefined'){
			clearInterval(transform_rotYINT);
		}else{
			startYRotate();
		}
	},10);
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
function vt_imaging_plg_transform_yscale(_self)
{
	_self.onStartPlugin();
	_self.registerClearVariables('transform_set;transform_y;transform_ny;clearInterval(transform_rotYINT);startYRotate');
	transform_ny = 0;
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	_self.getImaging().find('img').attr('src', _self.getOldImaging().src);
	_self.getImagingOverlay().css({
		'background-color':'none'
	});
	transform_set = false;
	jQuery(document).unbind('rotate_complete').on('rotate_complete', function(){
		_self.getImaging().find('img').attr('src', _self.getCurrentImaging().src);
		_self.onCompletePlugin();
	});
	rotateYDIV(_self.getImaging());
}