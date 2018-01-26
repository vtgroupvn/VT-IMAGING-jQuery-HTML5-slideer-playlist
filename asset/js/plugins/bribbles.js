function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
function randomIn(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
function vt_imaging_plg_bribbles(_self)
{
	_self.onStartPlugin();
	_self.register('getRandomColor', 'randomIn');
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	_self.print_values.bribblesPrintShow = function(spiral_array, sub_interval){
		var animate_time = 50;
		var loadingInterVal = null;
		var sub = 5;
		for(var i = 0; i < spiral_array.length; i++){
			sub += 10;
			for (var j = 0; j < spiral_array[0].length; j++){
				animate_time += sub_interval;
				if (typeof spiral_array[i] == 'object'){
					if (typeof spiral_array[i][j] == 'object'){
						spiral_array[i][j].show();
						spiral_array[i][j].animate({
							height: -sub,
							width: -sub
						}, animate_time, function(){
							jQuery(this).remove();
						});
					}
				}
				clearInterval(loadingInterVal);
				loadingInterVal = setInterval(function(){
					clearInterval(loadingInterVal);
					_self.onCompletePlugin();
				}, animate_time);
			}
		}
	};
	_self.getImagingOverlay().css({
		'position': 'relative',
		'margin-top': '-'+(_self.getImaging().height()+_self.form_imaging_text.outerHeight()+_self.form_imaging_audio.height())+'px',
		'top':'-160px',
		'left':'0px',
		'display': 'inline-block',
		'overflow-x': 'hidden',
		'overflow-y': 'hidden',
		'overflow':'hidden',
		'background-color':'none'
	});
	if (_self.options.skin == 1){
		var element_width = 90, element_height = 48;
	}else{
		var element_width = 77, element_height = 58;
	}
	_self.getImaging().find('img').attr('src', _self.getCurrentImaging().src);
	var width = _self.getImagingOverlay().width()/element_width;
	var height = _self.getImagingOverlay().height()/element_height;
	var elements = new Array();
	var new_src = _self.getCurrentImaging().src;
	for(var i=0; i < height; i++){
		elements[i] = new Array();
		var position_height = i*element_height;
		var ran_width = Math.floor((Math.random() * 350) + 1);
		for(var n = 0; n < width; n++){
			var position_width = n*element_width;
			elements[i][n] = jQuery('<div />');
			elements[i][n].attr('class', 'over-lay-slide');
			elements[i][n].attr('id', 'over-lay-slide-'+i+'-'+n);
			var top = randomIn(_self.getImagingOverlay().offset().top - 250, _self.getImagingOverlay().offset().top + _self.getImagingOverlay().height()-ran_width);
			if (_self.options.skin == 2){
				var left = randomIn(_self.getImagingOverlay().offset().left-_self.options.form_imaging_list_width - 350, _self.getImagingOverlay().offset().left + _self.getImagingOverlay().width());
			}else{
				var left = randomIn(_self.getImagingOverlay().offset().left-300, _self.getImagingOverlay().offset().left + _self.getImagingOverlay().width());
			}
			elements[i][n].css({
				'float': 'left',
				'height': ran_width,
				'width': ran_width,
				'border-radius': '60%',
				'display': 'block',
				'opacity': 1,
				'z-index': '999',
				'position':'absolute',
				'top': top,
				'left': left,
				'background':getRandomColor()
			});
			_self.getImagingOverlay().append(elements[i][n]);
		}
	}
	_self.print_values.bribblesPrintShow(elements, 100);
}