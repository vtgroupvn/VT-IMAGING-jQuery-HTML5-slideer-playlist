jQuery.fn.rotateElement = function(waitTime, width, height){
	var self = this;
	self.width = width;
	self.height = height;
	self.swivel_n=0;
	self.swivel_rotINT = null;
	self.sub_rotate = 50;
	self.rotate_complete = false;
	self.compile = function()
	{
		clearInterval(self.swivel_rotINT);
		self.swivel_rotINT=setInterval(function(){
			self.startRotate();
		},1);
	};
	self.startRotate = function()
	{
		self.swivel_n = self.swivel_n + self.sub_rotate;
		if(self.swivel_n >= 360){
			self.swivel_n = 360;
		}
		jQuery(self).get(0).style.transform="rotate(" + self.swivel_n + "deg)";
		jQuery(self).get(0).style.webkitTransform="rotate(" + self.swivel_n + "deg)";
		jQuery(self).get(0).style.OTransform="rotate(" + self.swivel_n + "deg)";
		jQuery(self).get(0).style.MozTransform="rotate(" + self.swivel_n + "deg)";
		if (self.swivel_n == 360)
		{
			setTimeout(function(){
				jQuery(self).css({
					'width': self.width,
					'height': self.height
				});
				self.rotate_complete = true;
				clearInterval(self.swivel_rotINT);
			}, waitTime);
			
		}
	};
	self.rotateComplete = function(){
		return self.rotate_complete;
	};
	return self;
};
function vt_imaging_plg_brick(_self)
{
	_self.onStartPlugin();
	_self.registerClearVariables('jQuery.fn.rotateElement');
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
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
	var new_src = _self.getCurrentImaging().src;
	waitTime = 50;
	for(var i=0; i < height; i++){
		elements[i] = new Array();
		var position_height = i*element_height;
		waitTime += 5;
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
				'background-image': "url('"+new_src+"')",
				'background-size': (_self.getImaging().width()+'px')+' '+ (_self.getImaging().height()+'px'),
				'float': 'left',
				'height': '50%',
				'width': '50%',
				'display': 'block',
				'opacity': 1,
				'z-index': '999',
				'background-position':('-'+position_width+'px')+' '+('-'+position_height+'px')
			});
			elements[i][n].append(child_element);
			_self.getImagingOverlay().append(elements[i][n]);
			waitTime += 5;
			var rotate = child_element.rotateElement(waitTime, element_width, element_height);
			rotate.compile();
			elements[i][n].data('rotate_obj', rotate);
		}
	}
	var interValCheck = setInterval(function(){
		var completed = true;
		for(var i=0; i < height; i++){
			for(var n = 0; n < width; n++){
				var rotate = elements[i][n].data('rotate_obj');
				if (rotate != undefined){
					completed = completed & rotate.rotateComplete();
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