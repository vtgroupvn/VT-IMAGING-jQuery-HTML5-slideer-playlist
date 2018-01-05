var analyser;
function setupAudioContext(audio)
{
	window.context = new AudioContext();
	video = context.createMediaElementSource(audio[0]);
	analyser = context.createAnalyser(); //we create an analyser
	analyser.smoothingTimeConstant = 0.9;
	analyser.fftSize = 512; //the total samples are half the fft size.
	video.connect(analyser);
	analyser.connect(context.destination);
}
function getLevelVolume(){
	var array = new Uint8Array(analyser.fftSize);
	analyser.getByteTimeDomainData(array);
	var average = 0;
	var max = 0;
	for (i = 0; i < array.length; i++) {
		a = Math.abs(array[i] - 128);
		average += a;
		max = Math.max(max, a);
	}

	average /= array.length;
	return average;
}
window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_wave'];
}
function vt_imaging_plg_wave(_self, imaging, audio, div_slide)
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
	setupAudioContext(audio);
	jQuery.getScript(_self.options.url_plugin_folder+'/libraries/siriwave.js').done(function(){
		var container = jQuery('<div />');
		container.attr('id', 'wave-container');
		container.css({
			'height': div_slide.height(),
			'width': div_slide.width()
		});
		div_slide.append(container);
		var SW = new SiriWave({
			style: 'ios9',
			speed: audio[0].volume,
			amplitude: audio[0].volume,
			container: container[0],
			autostart: true,
		});
		audio[0].addEventListener('timeupdate', function(){
			SW.setSpeed(audio[0].volume);
			SW.setAmplitude(getLevelVolume());
		});
		jQuery(document).trigger("slide_next_complete", ['vt-imaging-app', 'none']);
		_self.clearScreenLoading();		
	});
	audio.unbind("ended").bind("ended", function(){
		_self.setActiveImaging(_self.currently_active_imaging+1);
		_self.loadImaging();
	});
}