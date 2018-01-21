function vt_imaging_plg_louvers(_self)
{
	_self.onStartPlugin();
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	_self.print_values.louversPrintShow = function(print_array, sub_interval){
		var animate_time = 500;
		var loadingInterVal = null;
		var complete_animate = 0;
		for(var n = 0; n < print_array.length; n++){
			animate_time += sub_interval;
			print_array[n].find('div.louvers-child-element').animate({						
				width: '100%'
			}, animate_time, function(){
				complete_animate++;
			});			
		}
		loadingInterVal = setInterval(function(){
			if (complete_animate == print_array.length){
				clearInterval(loadingInterVal);
				_self.onCompletePlugin();
				_self.getImagingOverlay().css({'display':'none'});
			}
		}, 1);
	};
	var mod = false;
	var element_width = 49;
	while(!mod){
		element_width++;
		var extend = _self.getImagingOverlay().width()%element_width;
		if (extend == 0){
			mod = true;
		}
	}
	_self.getImagingOverlay().css({
		'height': _self.getImaging().height(), 
		'width': _self.getImaging().width(),
		'cursor': 'pointer',
		'position': 'absolute',
		'display': 'inline-block',
		'top': _self.getImaging().position().top,
		'left': _self.getImaging().position().left,
		'text-align': 'center',
		'background':'none',
		'display': 'inline-block',
		'overflow-x': 'none',
		'overflow-y': 'none',
		'overflow':'none',
		'margin-top': '0px',
		'background-color':'none'
	});
	var width = _self.getImaging().width()/element_width;
	var height = _self.getImaging().height();
	var elements = new Array();
	var new_src = _self.getCurrentImaging().src;
	for(var i=0; i < width; i++){
		
		elements[i] = jQuery('<div />');
		var child_element = jQuery('<div />');
		child_element.attr('class' ,'louvers-child-element');
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
			'width': '0px',
			'display': 'block',
			'opacity': 1,
			'z-index': '999',
			'background-position':('-'+(element_width * i)+'px')+' '+('-'+height+'px'),
			'border':'1px solid #000'
		});
		elements[i].append(child_element);
		_self.getImagingOverlay().append(elements[i]);
	}
	_self.print_values.louversPrintShow(elements, 500);
}