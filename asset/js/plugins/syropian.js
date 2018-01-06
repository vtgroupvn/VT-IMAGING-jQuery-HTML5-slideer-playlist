var canvas, ctx, time, interValCall;
var circles = [];
var max = 70;
function getRandomArbitrary (min, max) {
    return Math.random() * (max - min) + min;
}
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var circle = {
  x: 0,
  y: Math.sin(this.x*Math.PI/180),
}
var createCircles = function(){
  var randCol = "rgb("+getRandomInt(0, 255)+","+getRandomInt(0, 255)+","+getRandomInt(0, 255)+")";
  var randA = getRandomArbitrary(30,200);
  var radius = getRandomInt(5,15);
  var x = getRandomInt(0, canvas.width);
	if(circles.length < max){
		circles.push({
			x: x,
			y: circle.y,
			r: radius,
			c: randCol,
			a: randA
		});
	}
}

var updateCircles = function(){
	var i = circles.length;
	while(i--){
		var c = circles[i];
		c.y = Math.sin(c.x*Math.PI/180);
		if(c.y >= 0){
			c.y = canvas.height/2 - (c.y-0) * c.a;
		}
		if(c.y < 0){
			c.y = canvas.height/2 + (0 - c.y) * c.a;
		}
		c.x++;
		if(c.x > canvas.width-30){
			circles.splice(i, 1);
      

		}
	}
}

var renderCircles = function(){
	var i = circles.length;
	while(i--){
		var c = circles[i];
		ctx.beginPath();
		ctx.arc(c.x,c.y, c.r, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fillStyle = c.c;
		ctx.shadowBlur = 20;
		ctx.shadowColor = c.c;
		ctx.fill();
	}
}

function draw_syropian(){
	ctx.globalCompositeOperation = "source-over";
	ctx.clearRect(0,0,canvas.width, canvas.height);
	ctx.globalCompositeOperation = 'lighter';
	//Call our super awesome animation method, because setTimeout is for suckers

	/*var now = new Date().getTime();
	var dt = now - (time || now);
	time = now;
		*/
	time = getLevelVolume();
	createCircles();
	updateCircles();
	renderCircles();
	clearInterval(interValCall);
	interValCall = setInterval(function(){
		draw_syropian();
	}, 15);
}
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
	clearInterval(interValCall);
	delete window['vt_imaging_plg_syropian'];
}
function vt_imaging_plg_syropian(_self, imaging, audio, div_slide)
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
	_self.resizeFix();
	div_slide.append('<canvas id="syropian" width="'+imaging.width()+'" height="'+imaging.height()+'"></canvas>');
	canvas = document.getElementById("syropian");
	ctx = canvas.getContext("2d");
	setupAudioContext(audio);
	draw_syropian();
	_self.clearScreenLoading();
	vt_imaging_application = new Application();
	audio.unbind("ended").bind("ended", function(){
		vt_imaging_application.deleteApp();
		_self.setActiveImaging(_self.currently_active_imaging+1);
		_self.loadImaging();
	});
    //vt_imaging_application the CircleContainer objects
    vt_imaging_application.initializeCircleContainers();
	
    //Start the initial loop function for the first time
    vt_imaging_application.loop();
	_self.onCompletePlugin("vt_imaging_plg_syropian", "none");
	div_slide.show();
	div_slide.css({
		'background-color':'hsl(195, 100%, 7%)'
	});
}