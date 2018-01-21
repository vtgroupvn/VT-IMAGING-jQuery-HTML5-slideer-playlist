//vars ******
//grab the stage
var _stage; 				// _sg
var _stageContext; 			// _sc
//turn interval on/off
var intervalDraw; 			//_id
//stage width/height
var _stageWidth=900; 		//_sw
var _stageHeight=400; 		//_sh
//hold the number of balls we want to use
var _ballCountInt = 50;		//_bc
var _ballStartYNum = 160;	//_by
var _ballSpacingNum = 5;	//_bs
//what do we want our FPS to be
var _FPS = 60;
var _milliFPS = 1000/_FPS;	//_mfp
//hold an angle for everything to move by
var _angle = 0;				//_ang
//the speed we should move by
var _speed = 3;				//_sp
var _baseRad = 80;			//_br
var _ranRad = 50;			//_rr
var _radius = _baseRad + (Math.random()*_ranRad);
var vSpace = 0;				//_vs
var _vFriction = .2;		//_vf
var l=50,m=100,n=1;

//**** end vars

//***** functions

//run on an interval
function fEnterFrame(){
	fClearStage();
	fDrawStage();
}

function insidedown_init(){
	_stage = document.getElementById('InsideDown');  
	//set our stage context
	if (_stage.getContext) _stageContext = _stage.getContext('2d'); 
  
	
	//loop to set the balls
	var vCount = -1;
	var holdPos;
	for (i=0;i<_ballCountInt;i++) {
		holdPos = i%5;
		if(holdPos==0) vCount++;
		var vBallName = "ball_"+i;
		window[vBallName] = new Object();
		window[vBallName].name = "ball_"+i;
		window[vBallName].xPos = window[vBallName].xStart = holdPos*125;
		var vRan = Math.random()*100;
		if(Math.random()>.5) vRan = -vRan;
		window[vBallName].yPos = window[vBallName].yStart = _ballStartYNum + (vCount*_ballSpacingNum); 
		
	}
	intervalDraw = setInterval( fEnterFrame,_milliFPS);
}

function fDrawStage(){
	_angle+=_speed;
	
	if(_angle>360){
		_angle = 0;
		_radius = _baseRad + (Math.random()*_ranRad);
	}
	
	_stageContext.save();
	_stageContext.lineWidth = 1;  
	_stageContext.beginPath();
	_stageContext.lineJoin = _stageContext.lineCap = "round";
	//_stageContext.strokeStyle = "#ef3754";
	
	_stageContext.strokeStyle="hsl("+l+", "+m+"%, 65%)";
	l+=0.9*n;
	m-=0.1*n;
	if(l<=50||l>=300)n=-n;
	
	
	var vCount = -1;
	var holdPos;
	var newAngle = _angle;
	var frict = .4;
	for(i=0;i<_ballCountInt;i++){
		holdPos = i%5;
		if(holdPos==0){
			vCount = 0;
			 newAngle+=12;
		}else{
			vCount++;
		}
		var vHoldHandleObj = window["ball_"+i];
		//if we're the lines on the end, behave different
		if(vCount%2==0){
			//move the 2 end handles in opposite directions
			if(vCount==0){ 
				var newY = vHoldHandleObj.yStart + (fSinD(newAngle)*_radius);
				vHoldHandleObj.yPos += (newY - vHoldHandleObj.yPos)*frict;
				_stageContext.moveTo(vHoldHandleObj.xPos, vHoldHandleObj.yPos);
			}else if(vCount==4){
				var newY = vHoldHandleObj.yStart - (fSinD(newAngle)*_radius);	
				vHoldHandleObj.yPos += (newY - vHoldHandleObj.yPos)*frict;
			}else if(vCount==2){
				//get the two side balls
				var vX1 = window["ball_"+(i-1)].xPos;
				var vX2 = window["ball_"+(i+1)].xPos;
				var newX = (vX1+vX2)/2;
				vHoldHandleObj.xPos += (newX - vHoldHandleObj.xPos)*frict;
			}
			//draw
			var nextObj = window["ball_"+(i-1)];
			if(nextObj!=undefined && vCount!=0){ 
				_stageContext.quadraticCurveTo(nextObj.xPos, nextObj.yPos, vHoldHandleObj.xPos,vHoldHandleObj.yPos);
			}
		}else{
			var newX = vHoldHandleObj.xStart - (fCosD(newAngle)*_radius);	
			vHoldHandleObj.xPos += (newX - vHoldHandleObj.xPos)*frict;
			//move the two center handles in the same direction
			if(vCount==1){ 
				vHoldHandleObj.yPos += (window["ball_"+(i+3)].yPos - vHoldHandleObj.yPos)*frict;
			}
			if(vCount==3) vHoldHandleObj.yPos += (window["ball_"+(i-3)].yPos - vHoldHandleObj.yPos)*frict;			
		}
		_stageContext.stroke();
	}
	
	_stageContext.restore();
}


//helpers
function fCosD($angle){
	var finalAngle = Math.cos($angle*Math.PI/180);
	return finalAngle;
}
function fSinD($angle){
	var finalAngle = Math.sin($angle*Math.PI/180);
	return finalAngle;
}

//clear the stage
function fClearStage(){_stageContext.clearRect(0,0,_stageWidth,_stageHeight); // clear canvas
}
function vt_imaging_plg_insidedown(_self)
{
	_self.onStartPlugin('show-loading');
	_self.registerVariables(['_stage','_stageContext','intervalDraw','_stageWidth','_stageHeight','_ballCountInt','_ballStartYNum','_ballSpacingNum','_FPS','_milliFPS','_angle','_speed','_baseRad','_ranRad','_radius','vSpace','_vFriction','l','m','n','fEnterFrame','insidedown_init','fDrawStage','fCosD','fSinD','fClearStage']);
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	_self.getImagingOverlay().css({
		'background': '#1C1C1C',
		'overflow': 'hidden'
	});
	_self.getImagingOverlay().append('<canvas id="InsideDown" width="'+_self.getImaging().width()+'" height="'+_self.getImaging().height()+'"></canvas>');
	insidedown_init();
	_self.onCompletePlugin("noneimage");
}