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
window.vt_imaging_delete_app = function(){
	delete window['randomIn'];
	delete window['getRandomColor'];
	delete window['vt_imaging_plg_bribbles'];
}
function vt_imaging_plg_bribbles(VT_Obj, VT_Imaging, VT_Audio, VT_Element_Slide)
{
	VT_Obj.onStartPlugin();
	/**
	*
	* Feel want to make print function VT_Obj.print_values.printFunction = function(){}
	*
	**/
	VT_Obj.print_values.bribblesPrintShow = function(spiral_array, sub_interval){
		var animate_time = 50;
		var loadingInterVal = null;
		var sub = 5;
		for(var i = 0; i < spiral_array[0].length; i++){
			sub += 10;
			for (var j = 0; j < spiral_array.length; j++){
				animate_time += sub_interval;
				spiral_array[i][j].show();
				spiral_array[i][j].animate({
					height: -sub,
					width: -sub
				}, animate_time, function(){
					jQuery(this).remove();
				});
				clearInterval(loadingInterVal);
				loadingInterVal = setInterval(function(){
					clearInterval(loadingInterVal);
					VT_Obj.onCompletePlugin("vt_imaging_plg_bribbles", undefined);
				}, animate_time);
			}
		}
	};
	VT_Element_Slide.css({
		'position': 'relative',
		'margin-top': '-'+(VT_Obj.form_imaging_show.height()+VT_Obj.form_imaging_text.outerHeight()+VT_Obj.form_imading_VT_Audio.height())+'px',
		'top':'-160px',
		'left':'0px',
		'display': 'inline-block',
		'overflow-x': 'hidden',
		'overflow-y': 'hidden',
		'overflow':'hidden',
		'background-color':'none'
	});
	if (VT_Obj.options.skin == 1){
		var element_width = 90, element_height = 48;
	}else{
		var element_width = 77, element_height = 58;
	}
	VT_Imaging.find('img').attr('src', VT_Obj.getCurrentImaging().src);
	var width = VT_Element_Slide.width()/element_width;
	var height = VT_Element_Slide.height()/element_height;
	var elements = new Array();
	var new_src = VT_Obj.getCurrentImaging().src;
	for(var i=0; i < height; i++){
		elements[i] = new Array();
		var position_height = i*element_height;
		var ran_width = Math.floor((Math.random() * 350) + 1);
		for(var n = 0; n < width; n++){
			var position_width = n*element_width;
			elements[i][n] = jQuery('<div />');
			elements[i][n].attr('class', 'over-lay-slide');
			elements[i][n].attr('id', 'over-lay-slide-'+i+'-'+n);
			var top = randomIn(VT_Element_Slide.offset().top - 250, VT_Element_Slide.offset().top + VT_Element_Slide.height()-ran_width);
			if (VT_Obj.options.skin == 2){
				var left = randomIn(VT_Element_Slide.offset().left-VT_Obj.options.form_imaging_list_width - 350, VT_Element_Slide.offset().left + VT_Element_Slide.width());
			}else{
				var left = randomIn(VT_Element_Slide.offset().left-300, VT_Element_Slide.offset().left + VT_Element_Slide.width());
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
			VT_Element_Slide.append(elements[i][n]);
		}
	}
	VT_Obj.print_values.bribblesPrintShow(elements, 100);
}