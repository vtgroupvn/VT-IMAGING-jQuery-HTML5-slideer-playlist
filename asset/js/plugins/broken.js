jQuery.fn.vt_imaging_plg_spiral_hide_loading = function(intervalTime){
	var self = this;
	self.animate_complete = false;
	self.run_interval = function()
	{
		jQuery(self).animate({
			opacity: 0
		}, intervalTime, function(){
			self.animate_complete = true;
		});
	};
	self.is_animate_complete = function(){
		return self.animate_complete;
	};
	return self;
}
function vt_imaging_plg_broken(_self)
{
	_self.onStartPlugin();
	_self.registerClearVariables('jQuery.fn.vt_imaging_plg_spiral_hide_loading');
	/**
	*
	* Feel want to make print function _self.print_values.printFunction = function(){}
	*
	**/
	_self.print_values.spiralPrintHide = function(spiral_array, sub_interval){
		var over_load = new Array(), over_load_item = 0, i = 0,k = 0,l = 0,m = 0,n = 0;
		m = spiral_array.length;
		n = spiral_array[0].length;

		/*  k - starting row index
			m - ending row index
			l - starting column index
			n - ending column index
			i - iterator
		*/
		var intervalTime = 10000;
		while (k < m && l < n) {
			/* Print the first row from the remaining rows */
			for (i = l; i < n; ++i) {
				intervalTime -= sub_interval;
				over_load[over_load_item] =spiral_array[k][i].vt_imaging_plg_spiral_hide_loading(intervalTime);					
				over_load[over_load_item].run_interval();
				over_load_item++;
			}
			k++;

			/* Print the last column from the remaining columns */
			for (i = k; i < m; ++i) {
				intervalTime -= sub_interval;
				over_load[over_load_item] = spiral_array[i][n - 1].vt_imaging_plg_spiral_hide_loading(intervalTime);					
				over_load[over_load_item].run_interval();
				over_load_item++;
			}
			n--;

			/* Print the last row from the remaining rows */
			if (k < m) {
				for (i = n - 1; i >= l; --i) {
					intervalTime -= sub_interval;
					over_load[over_load_item] = spiral_array[m - 1][i].vt_imaging_plg_spiral_hide_loading(intervalTime);					
					over_load[over_load_item].run_interval();
					over_load_item++;
				}
				m--;
			}

			/* Print the first column from the remaining columns */
			if (l < n) {
				for (i = m - 1; i >= k; --i) {
					intervalTime -= sub_interval;
					over_load[over_load_item] = spiral_array[i][l].vt_imaging_plg_spiral_hide_loading(intervalTime);					
					over_load[over_load_item].run_interval();
					over_load_item++;
				}
				l++;
			}
		}
		if (over_load.length > 0){
			var check_complete = setInterval(function(){
				var is_complete = true;
				for(var i = 0; i < over_load.length; i++){
					is_complete = is_complete && over_load[i].is_animate_complete();
				}
				if (is_complete){
					clearInterval(check_complete);
					_self.onCompletePlugin();
				}
			}, 50);
		}
	};

	var mod = false;
	var element_width = 49;
	while(!mod){
		element_width++;
		var extend = _self.getImagingOverlay().width()%element_width;
		if (extend == 0){
			mod = true;
		}
	}
	var mod = false;
	var element_height = 30;
	while(!mod){
		element_height++;
		var extend = _self.getImagingOverlay().width()%element_height;
		if (extend == 0){
			mod = true;
		}
	}
	_self.getImaging().find('img').attr('src', _self.getCurrentImaging().src);
	var width = _self.getImagingOverlay().width()/element_width;
	var height = _self.getImagingOverlay().height()/element_height;
	var elements = new Array();
	var new_src = _self.getOldImaging().src;
	for(var i=0; i < height; i++){
		elements[i] = new Array();
		var position_height = i*element_height;
		for(var n = 0; n < width; n++){
			var position_width = n*element_width;
			elements[i][n] = jQuery('<div />');
			elements[i][n].attr('class', 'over-lay-slide');
			elements[i][n].attr('id', 'over-lay-slide-'+i+'-'+n);
			elements[i][n].css({
				'background-image': "url('"+new_src+"')",
				'background-size': (_self.getImaging().width()+'px')+' '+ (_self.getImaging().height()+'px'),
				'float': 'left',
				'height': element_height,
				'width': element_width,
				'display': 'block',
				'opacity': 1,
				'background-position':('-'+position_width+'px')+' '+('-'+position_height+'px')
			});
			_self.getImagingOverlay().append(elements[i][n]);
		}
	}
	_self.print_values.spiralPrintHide(elements, 50);
}