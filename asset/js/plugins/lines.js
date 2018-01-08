window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_lines'];
}
function vt_imaging_plg_lines(VT_Obj, VT_Imaging, VT_Audio, VT_Element_Slide)
{
	VT_Obj.onStartPlugin();
	/**
	*
	* Feel want to make print function VT_Obj.print_values.printFunction = function(){}
	*
	**/
	VT_Obj.print_values.linesPrintShow = function(print_array, sub_interval){
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
				VT_Obj.onCompletePlugin("vt_imaging_plg_lines", undefined);
			}, animate_time);
		}
	};
	var element_width = 49;
	var mod = false;
	while(!mod){
		element_width++;
		var extend = VT_Element_Slide.width()%element_width;
		if (extend == 0){
			mod = true;
		}
	}
	VT_Imaging.find('img').attr('src', VT_Obj.getCurrentImaging().src);
	var width = VT_Imaging.width()/element_width;
	var height = VT_Imaging.height();
	var elements = new Array();
	var new_src = VT_Obj.getOldImaging().src;
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
			'background-size': (VT_Imaging.width()+'px')+' '+ (VT_Imaging.height()+'px'),
			'float': 'left',
			'height': height,
			'width': element_width,
			'display': 'block',
			'opacity': 1,
			'z-index': '999',
			'background-position':('-'+(element_width * i)+'px')+' '+('-'+height+'px')
		});
		elements[i].append(child_element);
		VT_Element_Slide.append(elements[i]);
	}
	VT_Obj.print_values.linesPrintShow(elements, 500);
}