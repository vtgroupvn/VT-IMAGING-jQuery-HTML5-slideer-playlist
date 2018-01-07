window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_anshulbansal'];
}
function vt_imaging_plg_anshulbansal(_self, imaging, audio, div_slide)
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
	var old_height = imaging.height();
	var old_width = imaging.width();
	imaging.find('img').attr('src', 'none');
	imaging.find('img').attr('alt', '');
	imaging.css({
		'height': old_height,
		'width': old_width,
		'background':'#FFF',
		'display':'inline-block'
	});
	div_slide.css({
		'height': old_height,
		'width': old_width,
		'background': '#1C1C1C',
		'overflow': 'hidden'
	});
	jQuery('<link>')
	  .appendTo('head')
	  .attr({
		  type: 'text/css', 
		  rel: 'stylesheet',
		  href: _self.options.url_plugin_folder+'/libraries/anshulbansal.css'
	  });
	div_slide.append('<section id="anshulbansal">'
	  +'<div class="anshulbansal-loader">'
		+'<div class="anshulbansal-load a"></div>'
		+'<div class="anshulbansal-load b"></div>'
		+'<div class="anshulbansal-load c"></div>'
		+'<div class="anshulbansal-load d"></div>'
		+'<div class="anshulbansal-load e"></div>'
		+'<div class="anshulbansal-load f"></div>'
		+'<div class="anshulbansal-load g"></div>'
		+'<div class="anshulbansal-load h"></div>'
		+'<div class="anshulbansal-load i"></div>'
		+'<div class="anshulbansal-load j"></div>'
	  +'</div>'
	+'</section>');
	_self.onCompletePlugin("vt_imaging_plg_anshulbansal", "noneimage");
	_self.resizeFix();
	_self.clearScreenLoading();
	audio.unbind("ended").bind("ended", function(){
		_self.setActiveImaging(_self.currently_active_imaging+1);
		_self.loadImaging();
	});
}