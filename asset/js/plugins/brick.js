jQuery.fn.rotateElement = function(){
	var self = this;
	self.swivel_n=0;
	self.swivel_rotINT = null;
	self.sub_rotate = 20;
	self.rotate_complete = false;
	self.compile = function()
	{
		clearInterval(self.swivel_rotINT);
		self.swivel_rotINT=setInterval(function(){
			self.startRotate();
		},10);
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
			jQuery(self).animate({
				'width': '100%',
				'height': '100%'
			}, 500, function(){
				setTimeout(function(){
					self.rotate_complete = true;
					//jQuery(self).hide();
				}, 1000);
			});
			clearInterval(self.swivel_rotINT);
		}
	};
	self.rotateComplete = function(){
		return self.rotate_complete;
	};
	return self;
};
window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_brick'];
}
function vt_imaging_plg_brick(_self, imaging, audio, div_slide)
{
	_self.createScreenLoading();
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	audio.find('source').attr('src', _self.getCurrentImage().audio_src);
	audio.find('source').attr('type', 'audio/mpeg');
	audio[0].load();
	audio[0].play();
	var old_height = imaging.find('img').height();
	imaging.find('img').attr('src', 'none');
	imaging.css({
		'height': old_height,
		'background':'#FFF',
		'display':'inline-block'
	});
	if (_self.options.skin == 1){
		var element_width = 100, element_height = 48;
	}else{
		var element_width = 77, element_height = 58;
	}
	
	var width = div_slide.width()/element_width;
	var height = div_slide.height()/element_height;
	var elements = new Array();
	var new_src = _self.getCurrentImage().src;
	for(var i=0; i < height; i++){
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
				'background-image': "url('"+new_src+"')",
				'background-size': (imaging.width()+'px')+' '+ (imaging.height()+'px'),
				'float': 'left',
				'height': '50%',
				'width': '50%',
				'display': 'block',
				'opacity': 1,
				'z-index': '999',
				'background-position':('-'+position_width+'px')+' '+('-'+position_height+'px')
			});
			elements[i][n].append(child_element);
			div_slide.append(elements[i][n]);
			var rotate = child_element.rotateElement();
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
			div_slide.hide();
			clearInterval(interValCheck);
			jQuery(document).trigger("slide_next_complete", ['vt-imaging-app']);			
		}
	}, 100);
	_self.clearScreenLoading();
	
	audio.unbind("ended").bind("ended", function(){
		_self.setActiveImaging(_self.currently_active_imaging+1);
		_self.loadImaging();
	});
}