function createSVGElement(tagName, attributes){
  let el = document.createElementNS("http://www.w3.org/2000/svg", tagName);
  for(let key in attributes){
    el.setAttribute(key, attributes[key])
  }
  return el;
}
function run_nchevobbe()
{
var svg = document.querySelector('svg');

let y = 50;
let arcNumber = 21;
let width = 100;
let padding = 5;// so the most outer arc doesn't get cutoff
let increment = width / arcNumber / 2;
for(let i=0; i < arcNumber; i ++) {
  let x1 = (padding / 2) + (i * increment);
  let x2 = width - x1;
  let size = (x1 -x2) / 2;
  let pathCommands = [
    `M ${x1},${y}`,//start point
    `A ${size},${size}`,//size
    "0",//angle
    "0", //large arc flag
    "1",//sweep flag
    `${x2},${y}`,//end point
  ];

  let arc = createSVGElement("path", {
    d: pathCommands.join(" "),
    stroke: "url(#grad)",
    "stroke-linecap": "round"
  });

  let length = arc.getTotalLength();

  arc.setAttribute("stroke-dasharray",length);  
  svg.appendChild(arc);

  var anim = arc.animate([{
      "strokeDashoffset" : length
    },{
      "strokeDashoffset" : 0
    }], {
    duration: 1500,
    delay: i * 100,
    fill: 'forwards',
    direction: 'alternate-reverse',
    easing: 'ease-in',
    iterations: 'Infinity'
  });

}
}
function vt_imaging_plg_nchevobbe(_self)
{
	_self.onStartPlugin('show-loading');
	_self.registerVariables(['createSVGElement','run_nchevobbe']);
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	_self.getImagingOverlay().css({
		'height': _self.getImaging().height(),
		'width': _self.getImaging().width(),
		'background': '#000',
		'overflow': 'hidden'
	});
	_self.loadStyle('libraries/nchevobbe.css');
	_self.getImagingOverlay().append('<figure>'
	+'<svg viewBox="0 0 100 60">'
	  +'<defs>'
	  +'<linearGradient id="grad">'
		+'<stop stop-color="#005A66"/>'
		+'<stop offset="100%" stop-color="#D7E1E1"/>'
	  +'</linearGradient>'
	  +'</defs>'
	+'</svg>'
	+'</figure>');
	run_nchevobbe();
	_self.onCompletePlugin("noneimage");
}