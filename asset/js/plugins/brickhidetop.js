jQuery.fn.vt_animateElement = function(animateTime){
	var self = this;
	self.animate_complete = false;
	self.animateTime = animateTime;
	self.startAnimate = function()
	{
		jQuery(self).animate({
			width: 'toggle',
			height: 'toggle',
			opacity: 1
		}, self.animateTime, function(){
			setTimeout(function(){
				self.animate_complete = true;
			}, 1000);
		});
	};
	self.animateComplete = function(){
		return self.animate_complete;
	};
	return self;
};
window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_brickhidetop'];
}
function vt_imaging_plg_brickhidetop(VT_Obj, VT_Imaging, VT_Audio, VT_Element_Slide)
{
	VT_Obj.onStartPlugin();
	/**
	*
	* Feel want to make print function VT_Obj.print_values.printFunction = function(){}
	*
	**/
	VT_Imaging.find('img').attr('src', VT_Obj.getCurrentImaging().src);
	var mod = false;
	var element_width = 49;
	while(!mod){
		element_width++;
		var extend = VT_Element_Slide.width()%element_width;
		if (extend == 0){
			mod = true;
		}
	}
	var mod = false;
	var element_height = 30;
	while(!mod){
		element_height++;
		var extend = VT_Element_Slide.width()%element_height;
		if (extend == 0){
			mod = true;
		}
	}
	var width = VT_Element_Slide.width()/element_width;
	var height = VT_Element_Slide.height()/element_height;
	var elements = new Array();
	var old_src = VT_Obj.getOldImaging().src;
	var animateTime = 5000;
	for(var i=0; i < height; i++){
		animateTime -= 30;
		elements[i] = new Array();
		var position_height = i*element_height;
		for(var n = 0; n < width; n++){
			var position_width = n*element_width;
			elements[i][n] = jQuery('<div />');
			var child_element = jQuery('<div />');
			child_element.attr('class' ,'brick-child-element');
			elements[i][n].attr('class', 'over-lay-slide');
			elements[i][n].attr('id', 'over-lay-slide-'+i+'-'+n);
			elements[i][n].css({
				'float': 'left',
				'height': element_height,
				'width': element_width,
				'display': 'block',
				'opacity': 1,
				'z-index': '999'
			});
			child_element.css({
				'background-image': "url('"+old_src+"')",
				'background-size': (VT_Imaging.width()+'px')+' '+ (VT_Imaging.height()+'px'),
				'float': 'left',
				'height': element_height,
				'width': element_width,
				'display': 'block',
				'opacity': 1,
				'z-index': '999',
				'background-position':('-'+position_width+'px')+' '+('-'+position_height+'px')
			});
			elements[i][n].append(child_element);
			VT_Element_Slide.append(elements[i][n]);
			animateTime -= 20;
			var animate = child_element.vt_animateElement(animateTime);
			elements[i][n].data('animate_obj', animate);
		}
	}
	for(var i=elements.length-1; i >= 0; i--){
		for(var n = elements[0].length-1; n >= 0; n--){
			if (elements[i] != undefined){
				var animate = elements[i][n].data('animate_obj');
				animate.startAnimate();
			}
		}
	}
	var interValCheck = setInterval(function(){
		var completed = true;
		for(var i=elements.length-1; i >= 0; i--){
			for(var n = elements[0].length-1; n >= 0; n--){
				if (elements[i] != undefined){
					var animate = elements[i][n].data('animate_obj');
					if (animate != undefined){
						completed = completed & animate.animateComplete();
					}
				}
			}
		}
		if (completed){
			VT_Element_Slide.hide();
			clearInterval(interValCheck);
			VT_Obj.onCompletePlugin("vt_imaging_plg_brickhidetop", undefined);
		}
	}, 100);
}