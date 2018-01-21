function vt_imaging_plg_anshulbansal(_self)
{
	_self.onStartPlugin('show-loading');
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	_self.getImagingOverlay().css({
		'height': _self.getImaging().height(),
		'width': _self.getImaging().width(),
		'background': '#1C1C1C',
		'overflow': 'hidden'
	});
	_self.loadStyle('libraries/anshulbansal.css');
	_self.getImagingOverlay().append('<section id="anshulbansal">'
	  +'<div class="anshulbansal-loader">'
		+'<div class="anshulbansal-load a"></div>'
		+'<div class="anshulbansal-load b"></div>'
		+'<div class="anshulbansal-load c"></div>'
		+'<div class="anshulbansal-load d"></div>'
		+'<div class="anshulbansal-load e"></div>'
		+'<div class="anshulbansal-load f"></div>'
		+'<div class="anshulbansal-load g"></div>'
		+'<div class="anshulbansal-load h"></div>'
		+'<div class="anshulbansal-load i"></div>'
		+'<div class="anshulbansal-load j"></div>'
	  +'</div>'
	+'</section>');
	_self.onCompletePlugin("noneimage");
}