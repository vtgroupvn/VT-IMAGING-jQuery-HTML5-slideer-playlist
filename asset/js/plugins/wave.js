var analyser;
function setup_AudioContext(VT_Audio)
{
	window.context = new AudioContext();
	video = context.createMediaElementSource(VT_Audio[0]);
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
function vt_imaging_plg_wave(VT_Obj, VT_Imaging, VT_Audio, VT_Element_Slide)
{
	VT_Obj.onStartPlugin(true);
	/**
	*
	* Feel want to make print function VT_Obj.print_values.printFunction = function(){}
	*
	**/
	setup_AudioContext(VT_Audio);
	jQuery.getScript(VT_Obj.options.url_plugin_folder+'/libraries/siriwave.js').done(function(){
		var container = jQuery('<div />');
		container.attr('id', 'wave-container');
		container.css({
			'height': VT_Element_Slide.height(),
			'width': VT_Element_Slide.width()
		});
		VT_Element_Slide.append(container);
		var SW = new SiriWave({
			style: 'ios9',
			speed: VT_Audio[0].volume,
			amplitude: VT_Audio[0].volume,
			container: container[0],
			autostart: true,
		});
		VT_Audio[0].addEventListener('timeupdate', function(){
			SW.setSpeed(VT_Audio[0].volume);
			SW.setAmplitude(getLevelVolume());
		});
		VT_Obj.onCompletePlugin("vt_imaging_plg_wave", "noneimage");
	});
}