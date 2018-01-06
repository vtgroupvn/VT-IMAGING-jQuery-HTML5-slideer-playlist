window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_marcmalignan'];
}
function vt_imaging_plg_marcmalignan(_self, imaging, audio, div_slide)
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
		'background': 'radial-gradient(#888, #444)'
	});
	jQuery('<link>')
	  .appendTo('head')
	  .attr({
		  type: 'text/css', 
		  rel: 'stylesheet',
		  href: _self.options.url_plugin_folder+'/libraries/marcmalignan.css'
	  });
	div_slide.append('<div id="marcmalignan-loader">'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
		+'<div class="marcmalignan-bar"></div>'
	+'</div>');
	_self.onCompletePlugin("vt_imaging_plg_marcmalignan", "none");
	_self.resizeFix();
	_self.clearScreenLoading();
	audio.unbind("ended").bind("ended", function(){
		_self.setActiveImaging(_self.currently_active_imaging+1);
		_self.loadImaging();
	});
}