var iSawTheSin = 0, interValCall;
function nsharmon_render() {
  var c=document.getElementById('nsharmon');
  var ctx=c.getContext('2d');
  ctx.fillStyle = "rgba(255,255,255,.1)";
  ctx.fillRect(0, 0, c.width, c.height);
  
  for(var i=0; i<c.width/50; ++i){
	  for(var j=0; j<c.width/50; ++j){
      var timeVal = (1+Math.sin(i+j+iSawTheSin))*5;
	  	ctx.beginPath();
		  ctx.arc(j*50, i*50, j+i+timeVal, 0, 2*Math.PI);
	  	ctx.stroke()
  	}
  }
  iSawTheSin+= 0.1;
  if(iSawTheSin > 2*Math.PI) {
    iSawTheSin -= 2*Math.PI;
  }
  clearInterval(interValCall);
  interValCall = setInterval(function(){
	  if (typeof nsharmon_render == 'undefined'){
		  clearInterval(interValCall);
	  }else{
		nsharmon_render();
	  }
  }, 15);
}
function vt_imaging_plg_nsharmon(_self)
{
	_self.onStartPlugin('show-loading');
	_self.registerClearVariables('iSawTheSin;clearInterval(interValCall);nsharmon_render');
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	_self.resizeFix();
	_self.getImagingOverlay().append('<canvas id="nsharmon" width="'+_self.getImaging().width()+'" height="'+_self.getImaging().height()+'"></canvas>');
	nsharmon_render();
	_self.onCompletePlugin("noneimage");
}