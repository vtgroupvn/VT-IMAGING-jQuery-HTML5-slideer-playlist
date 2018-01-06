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
function vt_imaging_plg_transform_yscale(_self, imaging, audio, div_slide)
{
	_self.createScreenLoading();
	transform_ny = 0;
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	audio.find('source').attr('src', _self.getCurrentImage().audio_src);
	audio.find('source').attr('type', 'audio/mpeg');
	audio[0].load();
	audio[0].play();
	div_slide.css({
		'background-color':'none'
	});
	transform_set = false;
	jQuery(document).unbind('rotate_complete').on('rotate_complete', function(){
		_self.onCompletePlugin("vt_imaging_plg_transform_yscale", undefined);
	});
	rotateYDIV(imaging);
	_self.clearScreenLoading();
	audio.unbind("ended").bind("ended", function(){
		_self.setActiveImaging(_self.currently_active_imaging+1);
		_self.loadImaging();
	});
}