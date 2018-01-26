function vt_imaging_plg_lines(_self)
{
	_self.onStartPlugin();
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	_self.print_values.linesPrintShow = function(print_array, sub_interval){
		var animate_time = 500;
		var loadingInterVal = null;
		for(var n = 0; n < print_array.length; n++){
			animate_time += sub_interval;
			print_array[n].find('div.lines-child-element').animate({						
				width: 'toggle'
			}, animate_time, function(){
				//jQuery(this).parent().remove();
			});
			clearInterval(loadingInterVal);
			loadingInterVal = setInterval(function(){
				clearInterval(loadingInterVal);
				_self.onCompletePlugin();
			}, animate_time);
		}
	};
	var element_width = 49;
	var mod = false;
	while(!mod){
		element_width++;
		var extend = _self.getImagingOverlay().width()%element_width;
		if (extend == 0){
			mod = true;
		}
	}
	_self.getImaging().find('img').attr('src', _self.getCurrentImaging().src);
	var width = _self.getImaging().width()/element_width;
	var height = _self.getImaging().height();
	var elements = new Array();
	var new_src = _self.getOldImaging().src;
	for(var i=0; i < width; i++){
		
		elements[i] = jQuery('<div />');
		var child_element = jQuery('<div />');
		child_element.attr('class' ,'lines-child-element');
		elements[i].attr('class', 'over-lay-slide');
		elements[i].attr('id', 'over-lay-slide-louvers-'+i);
		elements[i].css({
			'float': 'left',
			'height': height,
			'width': element_width,
			'display': 'block',
			'opacity': 1,
			'z-index': '999'
		});
		child_element.css({
			'background-image': "url('"+new_src+"')",
			'background-size': (_self.getImaging().width()+'px')+' '+ (_self.getImaging().height()+'px'),
			'float': 'left',
			'height': height,
			'width': element_width,
			'display': 'block',
			'opacity': 1,
			'z-index': '999',
			'background-position':('-'+(element_width * i)+'px')+' '+('-'+height+'px')
		});
		elements[i].append(child_element);
		_self.getImagingOverlay().append(elements[i]);
	}
	_self.print_values.linesPrintShow(elements, 500);
}