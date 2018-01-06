jQuery.fn.vt_animateBottomElement = function(animateTime){
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
	delete window['vt_imaging_plg_brickhidebottom'];
}
function vt_imaging_plg_brickhidebottom(_self, imaging, audio, div_slide)
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
	imaging.find('img').attr('src', _self.getCurrentImage().src);
	imaging.find('img').attr('alt', '');
	imaging.css({
		'height': old_height,
		'background':'#FFF',
		'display':'inline-block'
	});
	var mod = false;
	var element_width = 49;
	while(!mod){
		element_width++;
		var extend = div_slide.width()%element_width;
		if (extend == 0){
			mod = true;
		}
	}
	var mod = false;
	var element_height = 30;
	while(!mod){
		element_height++;
		var extend = div_slide.width()%element_height;
		if (extend == 0){
			mod = true;
		}
	}
	var width = div_slide.width()/element_width;
	var height = div_slide.height()/element_height;
	var elements = new Array();
	var old_src = _self.getOldImage().src;
	var animateTime = 500;
	for(var i=0; i < height; i++){
		animateTime += 400;
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
				'background-size': (imaging.width()+'px')+' '+ (imaging.height()+'px'),
				'float': 'left',
				'height': element_height,
				'width': element_width,
				'display': 'block',
				'opacity': 1,
				'z-index': '999',
				'background-position':('-'+position_width+'px')+' '+('-'+position_height+'px')
			});
			elements[i][n].append(child_element);
			div_slide.append(elements[i][n]);
			animateTime += 10;
			var animate = child_element.vt_animateBottomElement(animateTime);
			elements[i][n].data('animate_obj', animate);
		}
	}
	for(var i= 0; i < elements.length; i++){
		for(var n = 0; n < elements[0].length; n++){
			if (elements[i] != undefined){
				var animate = elements[i][n].data('animate_obj');
				animate.startAnimate();
			}
		}
	}
	var interValCheck = setInterval(function(){
		var completed = true;
		for(var i= 0; i < elements.length; i++){
			for(var n = 0; n < elements[0].length; n++){
				if (elements[i] != undefined){
					var animate = elements[i][n].data('animate_obj');
					if (animate != undefined){
						completed = completed & animate.animateComplete();
					}
				}
			}
		}
		if (completed){
			div_slide.hide();
			clearInterval(interValCheck);
			_self.onCompletePlugin("vt_imaging_plg_brickhidebottom", undefined);
		}
	}, 100);
	_self.clearScreenLoading();
	
	audio.unbind("ended").bind("ended", function(){
		_self.setActiveImaging(_self.currently_active_imaging+1);
		_self.loadImaging();
	});
}