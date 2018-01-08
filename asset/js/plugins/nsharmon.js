var iSawTheSin = 0, interValCall;
function nsharmon_render() {
  var c=document.getElementById('nsharmon');
  var ctx=c.getContext('2d');
  ctx.fillStyle = "rgba(255,255,255,.1)";
  ctx.fillRect(0, 0, c.width, c.height);
  
  for(var i=0; i<22; ++i){
	  for(var j=0; j<22; ++j){
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
	  nsharmon_render();
  }, 15);
}
window.vt_imaging_delete_app = function(){
	clearInterval(interValCall);
	delete window['vt_imaging_plg_nsharmon'];
}
function vt_imaging_plg_nsharmon(VT_Obj, VT_Imaging, VT_Audio, VT_Element_Slide)
{
	VT_Obj.onStartPlugin(true);
	/**
	*
	* Feel want to make print function VT_Obj.print_values.printFunction = function(){}
	*
	**/
	VT_Obj.resizeFix();
	VT_Element_Slide.append('<canvas id="nsharmon" width="'+VT_Imaging.width()+'" height="'+VT_Imaging.height()+'"></canvas>');
	nsharmon_render();
	VT_Obj.onCompletePlugin("vt_imaging_plg_nsharmon", "noneimage");
}