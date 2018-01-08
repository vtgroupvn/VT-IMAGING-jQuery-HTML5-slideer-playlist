window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_louvers'];
}
function vt_imaging_plg_louvers(VT_Obj, VT_Imaging, VT_Audio, VT_Element_Slide)
{
	VT_Obj.onStartPlugin();
	/**
	*
	* Feel want to make print function VT_Obj.print_values.printFunction = function(){}
	*
	**/
	VT_Obj.print_values.louversPrintShow = function(print_array, sub_interval){
		var animate_time = 500;
		var loadingInterVal = null;
		for(var n = 0; n < print_array.length; n++){
			animate_time += sub_interval;
			print_array[n].find('div.louvers-child-element').animate({						
				width: '100%'
			}, animate_time, function(){
				//jQuery(this).parent().remove();
			});
			clearInterval(loadingInterVal);
			loadingInterVal = setInterval(function(){
				clearInterval(loadingInterVal);
				VT_Obj.onCompletePlugin("vt_imaging_plg_louvers", undefined);
			}, animate_time);
		}
	};
	var mod = false;
	var element_width = 49;
	while(!mod){
		element_width++;
		var extend = VT_Element_Slide.width()%element_width;
		if (extend == 0){
			mod = true;
		}
	}
	VT_Element_Slide.css({
		'height': imaging.height(), 
		'width': imaging.width(),
		'cursor': 'pointer',
		'position': 'absolute',
		'display': 'inline-block',
		'top': imaging.position().top,
		'left': imaging.position().left,
		'text-align': 'center',
		'background':'none',
		'display': 'inline-block',
		'overflow-x': 'none',
		'overflow-y': 'none',
		'overflow':'none',
		'margin-top': '0px',
		'background-color':'none'
	});
	var width = imaging.width()/element_width;
	var height = imaging.height();
	var elements = new Array();
	var new_src = VT_Obj.getCurrentImaging().src;
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
			'background-size': (imaging.width()+'px')+' '+ (imaging.height()+'px'),
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
		VT_Element_Slide.append(elements[i]);
	}
	VT_Obj.print_values.louversPrintShow(elements, 500);
}