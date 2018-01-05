window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();
var canvas;
function jackrugile_loader(canvas_width, canvas_height, color) {
  var ctx = canvas.getContext( '2d' ),
      cw = canvas.width = canvas_width,
      ch = canvas.height = canvas_height,
      twoPi = Math.PI * 2,
      tick = 0,
      ot = Date.now(),
      dt = 1,
      fps = 1000 / 60,
      count = cw / 50,
      spacing = cw / count,
      circles = [];
  
    ctx.fillStyle = color;  
  
  
  function Circle( opt ) {
    for( var key in opt ) {
      this[ key ] = opt[ key ];
    }
  }

  Circle.prototype.update = function() {
    this.x = this.xBase + Math.sin( ( tick + this.tickOffset ) / this.tickDiv ) * this.xRange;
    this.y = this.yBase + Math.sin( ( tick + this.tickOffset ) / this.tickDiv ) * this.yRange;
    this.radius = this.radiusBase + Math.cos( ( tick + this.tickOffset  ) / this.tickDiv ) * this.radiusRange;
  };

  loop = function() {
    requestAnimFrame( loop )
    var now = Date.now(),
    dt = ( now - ot ) / fps;
    ot = now ;
    tick += dt;
    ctx.clearRect( 0, 0, cw, ch );
    var i = circles.length;
    ctx.beginPath();
    while( i-- ){
      var circle = circles[ i ];
      circle.update();
      ctx.moveTo( circle.x, circle.y )
      ctx.arc( circle.x, circle.y, circle.radius, 0, twoPi );
    }
    ctx.fill();
  }

  for( var i = 0; i < count; i++ ){
    circles.push( new Circle( {
      xBase: ( cw / 2 ) + ( i * spacing ) - ( ( ( count - 1 ) * spacing ) / 2 ),
      xRange: 0,
      yBase: ch / 2,
      yRange: 75,
      radiusBase: 10,
      radiusRange: 10,
      tickDiv: 15,
      tickOffset: i * 10
    } ) );  
  }
  
  for( var i = 0; i < count; i++ ){
    circles.push( new Circle( {
      xBase: ( cw / 2 ) + ( i * spacing ) - ( ( ( count - 1 ) * spacing ) / 2 ),
      xRange: 20,
      yBase: ch / 2,
      yRange: 0,
      radiusBase: 3,
      radiusRange: 3,
      tickDiv: 15,
      tickOffset: i * 10
    } ) );  
  }
  
  loop();    
}
window.vt_imaging_delete_app = function(){
	delete window['vt_imaging_plg_jackrugile'];
}
function vt_imaging_plg_jackrugile(_self, imaging, audio, div_slide)
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
	div_slide.append('<canvas style="margin-top:-'+(old_height/2)+'px;" id="syropian" width="'+imaging.width()+'" height="'+imaging.height()+'"></canvas>');
	canvas = div_slide.find('canvas#syropian')[0];
	jackrugile_loader(old_width, old_width, '#ea80b0');
	jQuery(document).trigger("slide_next_complete", ['vt-imaging-app']);
	_self.clearScreenLoading();
	audio.unbind("ended").bind("ended", function(){
		_self.setActiveImaging(_self.currently_active_imaging+1);
		_self.loadImaging();
	});
}