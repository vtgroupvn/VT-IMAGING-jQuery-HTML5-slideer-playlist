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
function vt_imaging_plg_syropian(_self)
{
	_self.onStartPlugin('show-loading');
	_self.register('canvas;ctx;time;interValCall;circles;max;getRandomArbitrary;getRandomInt;circle;createCircles;updateCircles;renderCircles;draw_syropian;analyser;setup_AudioContext;getLevelVolume');
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	_self.getImagingOverlay().css({
		'display':'block',
		'background-color':'hsl(195, 100%, 7%)'
	});
	_self.getImagingOverlay().append('<canvas id="syropian" width="'+_self.getImaging().width()+'" height="'+_self.getImaging().height()+'"></canvas>');
	canvas = document.getElementById("syropian");
	ctx = canvas.getContext("2d");
	setup_AudioContext(_self.getAudio().get(0));
	draw_syropian();
	_self.onCompletePlugin("noneimage");
}