var swivel_x,swivel_n=0,swivel_rotINT, sub_rotate = 1;
function rotateDIV(el)
{
	swivel_x=el[0];
	clearInterval(swivel_rotINT);
	swivel_rotINT=setInterval(function(){
		if (typeof startRotate == 'undefined'){
			clearInterval(swivel_rotINT);
		}else{
			startRotate();
		}
	},10);
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
function vt_imaging_plg_transform_swivel(_self)
{
	_self.onStartPlugin();
	_self.registerClearVariables('startRotate;rotateDIV;swivel_x;swivel_n;clearInterval(swivel_rotINT);sub_rotate');
	swivel_n=0;
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	_self.getImagingOverlay().css({
		'background-color':'none'
	});
	_self.getImaging().css({opacity: 0.5});
	_self.getImaging().find('img').attr('src', _self.getCurrentImaging().src);
	_self.getImaging().find('img').css({'width':'200px'});
	_self.getImaging().find('img').css({'height':'200px'});
	_self.getImaging().find('img').css({
		'margin-top':'100px'
	});
	jQuery(document).unbind('rotate_complete').on('rotate_complete', function(){
		_self.getImaging().find('img').animate({
			'height': _self.getImaging().height(),
			'width': _self.form_imaging.width(),
			'opacity': '1',
			'margin-top':'0px'
		}, 500, function(){
			_self.getImaging().css({opacity: 1});
			_self.onCompletePlugin();
		});
	});
	rotateDIV(_self.getImaging().find('img'));
}