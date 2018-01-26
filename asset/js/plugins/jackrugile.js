var canvas, interValCall;
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
	clearInterval(interValCall);
	interValCall = setInterval(function(){
		loop();
	}, 15);
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
function vt_imaging_plg_jackrugile(_self)
{
	_self.onStartPlugin('show-loading');
	_self.register('canvas;interValCall;jackrugile_loader');
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	_self.getImagingOverlay().append('<canvas id="syropian" width="'+_self.getImaging().width()+'" height="'+_self.getImaging().height()+'"></canvas>');
	canvas = _self.getImagingOverlay().find('canvas#syropian')[0];
	jackrugile_loader(_self.getImaging().width(), _self.getImaging().height(), '#ea80b0');
	_self.onCompletePlugin("noneimage");
}