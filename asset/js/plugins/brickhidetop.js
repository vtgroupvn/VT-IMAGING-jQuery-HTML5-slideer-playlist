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
function vt_imaging_plg_brickhidetop(_self)
{
	_self.onStartPlugin();
	_self.registerVariables(window['jQuery']['fn']['vt_animateElement']);
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	_self.getImaging().find('img').attr('src', _self.getCurrentImaging().src);
	var mod = false;
	var element_width = 49;
	while(!mod){
		element_width++;
		var extend = _self.getImagingOverlay().width()%element_width;
		if (extend == 0){
			mod = true;
		}
	}
	var mod = false;
	var element_height = 30;
	while(!mod){
		element_height++;
		var extend = _self.getImagingOverlay().width()%element_height;
		if (extend == 0){
			mod = true;
		}
	}
	var width = _self.getImagingOverlay().width()/element_width;
	var height = _self.getImagingOverlay().height()/element_height;
	var elements = new Array();
	var old_src = _self.getOldImaging().src;
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
				'background-size': (_self.getImaging().width()+'px')+' '+ (_self.getImaging().height()+'px'),
				'float': 'left',
				'height': element_height,
				'width': element_width,
				'display': 'block',
				'opacity': 1,
				'z-index': '999',
				'background-position':('-'+position_width+'px')+' '+('-'+position_height+'px')
			});
			elements[i][n].append(child_element);
			_self.getImagingOverlay().append(elements[i][n]);
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
			_self.getImagingOverlay().hide();
			clearInterval(interValCheck);
			_self.onCompletePlugin();
		}
	}, 100);
}