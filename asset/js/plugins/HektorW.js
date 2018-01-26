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
function vt_imaging_plg_HektorW(_self)
{
	_self.onStartPlugin('show-loading');
	_self.register('canvas;ctx;intervalDraw;width;height;HektorW_render');
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	_self.getImagingOverlay().css({
		'background': '#1C1C1C',
		'overflow': 'hidden'
	});
	_self.getImagingOverlay().append('<canvas id="HektorW" width="'+_self.getImaging().width()+'" height="'+_self.getImaging().height()+'"></canvas>');
	canvas = _self.getImagingOverlay().find('canvas#HektorW').get(0);
	ctx = canvas.getContext('2d');
	canvas.width = width = _self.getImaging().width();
	canvas.height = height = _self.getImaging().height();
	intervalDraw = setInterval(function(){
		HektorW_render(performance.now());
	}, 15);
	_self.onCompletePlugin("noneimage");
}