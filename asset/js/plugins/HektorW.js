var canvas, ctx, intervalDraw;
let width, height;
function HektorW_render(t) {

  ctx.clearRect(0, 0, width, height);
  
  ctx.lineWidth = 2;
  ctx.shadowColor = ctx.strokeStyle = '#ebc148';
  ctx.shadowBlur = 3;
  
  const startY = height * .5;
  const startX = width * .2;
  const lineWidth = width * .6;
  const heightOffset = width * .25;
  const speed = 0.004;
  
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.bezierCurveTo(
    startX + lineWidth * .5,
    startY + Math.sin(t * speed) * heightOffset,
    startX + lineWidth * .5,
    startY + Math.cos(t * speed) * heightOffset,
    startX + lineWidth,
    startY
  );
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.bezierCurveTo(
    startX + lineWidth * .3,
    startY + Math.cos(t * speed * 1.2) * heightOffset,
    startX + lineWidth * .7,
    startY + Math.sin(t * speed * 1.2) * heightOffset,
    startX + lineWidth,
    startY
  );
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.bezierCurveTo(
    startX + lineWidth * .4,
    startY + Math.cos(t * speed * 1.05) * heightOffset,
    startX + lineWidth * .6,
    startY + Math.cos(t * speed * 1.05) * heightOffset,
    startX + lineWidth,
    startY
  );
  ctx.stroke();
  
}
window.vt_imaging_delete_app = function(){
	clearInterval(intervalDraw);
	delete window['vt_imaging_plg_HektorW'];
}
function vt_imaging_plg_HektorW(_self, imaging, audio, div_slide)
{
	_self.onStartPlugin(true);
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	div_slide.css({
		'background': '#1C1C1C',
		'overflow': 'hidden'
	});
	div_slide.append('<canvas id="HektorW" width="'+imaging.width()+'" height="'+imaging.height()+'"></canvas>');
	canvas = div_slide.find('canvas#HektorW')[0];
	ctx = canvas.getContext('2d');
	canvas.width = width = imaging.width();
	canvas.height = height = imaging.height();
	intervalDraw = setInterval(function(){
		HektorW_render(performance.now());
	}, 15);
	_self.onCompletePlugin("vt_imaging_plg_HektorW", "noneimage");
}