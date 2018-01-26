var analyser;
function setup_AudioContext(VT_Audio)
{
	window.context = new AudioContext();
	video = context.createMediaElementSource(VT_Audio);
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
function vt_imaging_plg_wave(_self)
{
	_self.onStartPlugin('show-loading');
	_self.registerClearVariables('analyser;context;setup_AudioContext;getLevelVolume');
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	
	setup_AudioContext(_self.getAudio().get(0));
	_self.loadScript('libraries/siriwave.js').done(function(){
		var container = jQuery('<div />');
		container.attr('id', 'wave-container');
		container.css({
			'height': _self.getImagingOverlay().height(),
			'width': _self.getImagingOverlay().width()
		});
		_self.getImagingOverlay().append(container);
		var SW = new SiriWave({
			style: 'ios9',
			speed: _self.getAudio().get(0).volume,
			amplitude: _self.getAudio().get(0).volume,
			container: container[0],
			autostart: true,
		});
		_self.addAudioEvent('timeupdate', function(_this){
			SW.setSpeed(_this.volume);
			//SW.setAmplitude(getLevelVolume());
		});
		_self.onCompletePlugin("noneimage");
	});
}