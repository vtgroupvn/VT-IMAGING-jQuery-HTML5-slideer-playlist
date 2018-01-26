/**
* License: GPLv2 or later
* License URI: http://www.gnu.org/licenses/gpl-2.0.html
* Donate link: http://vt-group.vn/donate.html
**/
(function($){
	"use strict"
	jQuery.fn.vt_imaging = function(fn_options){
		var self = this;
		if (typeof this == undefined){
			return;
		}else{
			jQuery(self).attr('class', 'vt-imaging');
		}
		self.constructor = function(fn_options){
			self.audio_events = ['abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'ended', 'error', 'loadeddata', 'loadedmetadata', 'loadstart', 'pause', 'play', 'playing', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting'];
			self.registerMethods = new Array();
			self.print_values ={};
			self.old_active_imaging = 0;
			self.currently_active_imaging = 0;
			self.queue_slide_new_events = new Array()
			self.options = jQuery.extend({
				form_height: '500',
				form_width: '700',
				form_imaging_control_height: '40',
				form_imaging_height: '400',
				form_imaging_description_height: '100',
				form_imaging_list_height: '100',
				form_imaging_list_width: '100',
				form_extra_style : {
					'margin': 'auto',
					'margin-top': '200px',
					'border': '1px solid #2C3D82',
					'border-radius': '60%',
					'-webkit-box-shadow': '0px 0px 5px -1px #2C3D82',
					'-moz-box-shadow':    '0px 0px 5px -1px #2C3D82',
					'box-shadow':         '0px 0px 5px -1px #2C3D82',
					'-webkit-border-radius': '6px',
					'-moz-border-radius': '6px',
				},
				imaging_list:[
					{name:'default', title: 'imaging 1', description: 'imaging 1', thumbnail:'', src: 'http://vt-gropup.vn', audio_src: ''},
					{name:'default', title: 'imaging 1', description: 'imaging 1', thumbnail:'', src: 'http://vt-gropup.vn', audio_src: ''},
					{name:'default', title: 'imaging 1', description: 'imaging 1', thumbnail:'', src: 'http://vt-gropup.vn', audio_src: ''},
					{name:'default', title: 'imaging 1', description: 'imaging 1', thumbnail:'', src: 'http://vt-gropup.vn', audio_src: ''},
					{name:'default', title: 'imaging 1', description: 'imaging 1', thumbnail:'', src: 'http://vt-gropup.vn', audio_src: ''}
				],
				url_plugin_folder:'asset/js/plugins/',
				player_color: '#2C3D82',
				skin: 1
			}, fn_options);
			return self;
		};
		self.loadPluginSource = function(name){
			var time = new Date();
			if (window['vt_imaging_plg_'+name] == undefined){
				jQuery.getScript(self.options.url_plugin_folder+name+'.js?time='+time.getTime()).done(function(){
					if (window['vt_imaging_plg_'+name] == undefined){
						jQuery(document).trigger('vt_loaded_plg', ['vt_imaging_plg_default']);
					}else{
						jQuery(document).trigger('vt_loaded_plg', ['vt_imaging_plg_'+name]);
					}
				}).fail(function(){
					if (window['vt_imaging_plg_default'] == undefined){
						jQuery.getScript(self.options.url_plugin_folder+'default.js?time='+time.getTime()).done(function(){
							jQuery(document).trigger('vt_loaded_plg', ['vt_imaging_plg_default']);
						});
					}
				});
			}else{
				jQuery(document).trigger('vt_loaded_plg', ['vt_imaging_plg_'+name]);
			}
		};
		self.loadScript = function(src){
			return jQuery.getScript(self.options.url_plugin_folder+'/'+src);
		};
		self.loadStyle = function(href){
			jQuery('<link>')
			.appendTo('head')
			.attr({
				type: 'text/css', 
				rel: 'stylesheet',
				href: self.options.url_plugin_folder+'/'+href
			});
		};
		self.register = function(methods){
			self.registerMethods = new Array();
			self.registerMethods[self.registerMethods.length] = 'vt_imaging_plg_'+self.options.imaging_list[self.currently_active_imaging].name;
			methods = String(methods);
			var vars = methods.split(';');
			for(var k in vars){
				self.registerMethods[self.registerMethods.length] = vars[k];
			}
		};
		self.clearRegister = function(){
			for(var k in self.registerMethods){
				if (self.registerMethods[k].indexOf('function[') != -1){
					var execute_func = self.registerMethods[k].replace('function[', '');
					execute_func = execute_func.replace(']', '');
					eval(execute_func);
				}else{
					if (typeof window[self.registerMethods[k]] != 'undefined'){
						delete(window[self.registerMethods[k]]);
					}else if(typeof self.registerMethods[k] != 'undefined'){
						delete(self.registerMethods[k]);
					}
				}
			}
		};
		self.onStartPlugin = function(condition){
			if (condition == 'show-loading'){
				self.createScreenLoading();
			}	
			for(var k in self.audio_events){
				self.removeAudioEvent(self.audio_events[k], function(_this){});
			}
			self.form_imaging_audio.find('source').attr('src', self.getCurrentImaging().audio_src);
			self.form_imaging_audio.find('source').attr('type', 'audio/mpeg');
			self.form_imaging_audio.get(0).load();
			self.form_imaging_audio.get(0).play();
			self.form_imaging_show.find('img').attr('src', 'none');
			self.form_imaging_show.find('img').attr('alt', '');
			if (self.options.skin == 1){
				self.form_imaging_show.css({
					'height': (parseInt(self.options.form_height)-parseInt(self.options.form_imaging_audio_height) - parseInt(self.options.form_imaging_description_height)-parseInt(self.options.form_imaging_list_height))+'px', 
					'width': '100%',
					'background':'#FFF',
					'display':'inline-block'
				});
			}else{
				self.form_imaging_show.css({
					'height': self.options.form_height - self.options.form_imaging_description_height - self.options.form_imaging_audio_height, 
					'width': '100%',
					'background':'#FFF',
					'display':'inline-block'					
				});
			}			
		};
		self.onCompletePlugin = function(condition){
			self.addAudioEvent("ended", function(_this){
				self.setActiveImaging(self.currently_active_imaging+1);
				self.loadImaging();
			});
			jQuery(document).trigger("slide_next_complete", ["vt-imaging-app", self.options.imaging_list[self.currently_active_imaging].name, condition]);
			self.resizeFix();
			self.clearScreenLoading();
		};
		self.getAudio = function(){
			return self.form_imaging_audio;
		};
		self.getImaging = function(){
			return self.form_imaging_show;
		};
		self.getImagingOverlay = function(){
			return self.form_imaging_over_display;
		};
		self.removeAudioEvent = function(eventName, _callback){
			self.form_imaging_audio.unbind(eventName, function(){_callback(self.form_imaging_audio.get(0));});
		}
		self.addAudioEvent = function(eventName, _callback){
			self.removeAudioEvent(eventName, function(_this){});
			self.form_imaging_audio.bind(eventName, function(){_callback(self.form_imaging_audio.get(0));});
		};
		self.setActiveImaging = function(index){
			self.clearRegister();
			self.old_active_imaging = self.currently_active_imaging;
			if (index >= self.options.imaging_list.length || index < 0){
				self.currently_active_imaging = 0;
			}else{
				self.currently_active_imaging = index;
			}
		};
		self.getOldImaging = function(){
			return self.options.imaging_list[self.old_active_imaging];
		};
		self.getCurrentImaging = function(){
			return self.options.imaging_list[self.currently_active_imaging];
		};
		self.loadImaging = function(){
			if (self.form_imaging_show != undefined){
				if (self.currently_active_imaging >= self.options.imaging_list.length || self.currently_active_imaging < 0){
					self.currently_active_imaging = 0;
				}
				jQuery(document).unbind("slide_next_complete").on("slide_next_complete", function(event, trigger_from, from_name, img_none){
					if (self.queue_slide_new_events.length > 0)
					{
						if (self.queue_slide_new_events[self.queue_slide_new_events.length-1].replace('vt_imaging_plg_','') == from_name){
							self.queue_slide_new_events = new Array();
							if (trigger_from != 'vt-imaging-app'){return;}
							if (img_none == undefined){
								self.form_imaging_show.find('img').attr('src', self.getCurrentImaging().src);
							}
							self.form_imaging_titlte.html(self.getCurrentImaging().title);
							self.form_imaging_description.html(self.getCurrentImaging().description);
							self.resizeFix();
							self.form_imaging_over_display.hide();
						}
					}
				});
				self.loadPluginSource(self.options.imaging_list[self.currently_active_imaging].name);
				jQuery(document).unbind("vt_loaded_plg").on('vt_loaded_plg', function(event, func_name){
					self.form_imaging_over_display.html('');
					self.overlay_resize();
					self.queue_slide_new_events[self.queue_slide_new_events.length] = func_name;
					if (window[func_name] != undefined){
						window[func_name](self);
					}
				});
				jQuery(self).find('div.imaging-hover').hide();
				jQuery(self).find('div#over-imaging-item-'+(self.currently_active_imaging+1)).show();
				return;
			}
			self.clearScreenLoading();
			self.form_imaging.html('');
			self.form_imaging.hide();
			self.form_imaging_show = jQuery('<div />');
			self.form_imaging_show_img = jQuery('<img />');
			if (self.options.skin == 1){
				self.form_imaging_show_img.css({
					'height': (parseInt(self.options.form_height)-parseInt(self.options.form_imaging_audio_height) - parseInt(self.options.form_imaging_description_height)-parseInt(self.options.form_imaging_list_height))+'px', 
					'width': self.options.form_width+'px',
					'cursor': 'pointer'
				});
			}else{
				self.form_imaging_show_img.css({
					'height': self.options.form_height - self.options.form_imaging_description_height - self.options.form_imaging_audio_height, 
					'width':  '100%',
					'cursor': 'pointer'					
				});
			}
			self.form_imaging_show_img.attr('id', 'imaging-show');
			self.form_imaging_show_img.attr('src', self.options.imaging_list[self.currently_active_imaging].src);
			self.form_imaging_show.append(self.form_imaging_show_img);
			self.form_imaging.append(self.form_imaging_show);
			self.form_imaging_audio = jQuery('<audio />');
			self.form_imaging_audio.css({
				'height': self.options.form_imaging_audio_height,
				'width': '100%'
			});
			self.form_imaging_audio.attr('controls', 'controls');
			self.form_imaging_audio.attr('crossOrigin', 'anonymous');
			self.form_imaging_audio_source = jQuery('<source />');
			self.form_imaging_audio_source.attr('src', self.options.imaging_list[self.currently_active_imaging].audio_src);
			self.form_imaging_audio_source.attr('type', 'audio/mpeg');
			self.form_imaging_audio.append(self.form_imaging_audio_source);
			self.form_imaging_audio.get(0).play();			
			self.form_imaging.append(self.form_imaging_audio);			
			self.form_imaging_text = jQuery('<div />');
			self.form_imaging_text.css({
				'height': 'auto',
				'width': '100%',
				'text-align': 'left',
				'margin-top': '0px',
				'display':'inline-block',
				'color': self.options.player_color
			});
			self.form_imaging_titlte = jQuery('<span />');
			self.form_imaging_titlte.css({
				'height': '30px',
				'line-height': '30px',
				'width': '100%',
				'text-align': 'left',
				'font-size': '14px',
				'font-weight': 'bold',
				'clear': 'both',
				'display': 'inline-block',
				'color': self.options.player_color
			});
			self.form_imaging_titlte.html(self.options.imaging_list[self.currently_active_imaging].title);
			self.form_imaging_text.append(self.form_imaging_titlte);
			self.form_imaging_description = jQuery('<span />');
			self.form_imaging_description.css({
				'height': '30px',
				'line-height': '30px',
				'width': '100%',
				'text-align': 'left',
				'font-size': '14px',
				'clear': 'both',
				'font-style': 'italic',
				'color': self.options.player_color,
				'padding-left':'8px'
			});
			self.form_imaging_description.html(self.options.imaging_list[self.currently_active_imaging].description);
			self.form_imaging_text.append(self.form_imaging_description);
			self.form_imaging.append(self.form_imaging_text);
			self.resizeFix();
			self.form_imaging_over_display = jQuery('<div />');
			self.form_imaging.append(self.form_imaging_over_display);
			self.form_imaging_over_display.css({
				'height': self.form_imaging_show.height(), 
				'width': self.form_imaging_show.width(),
				'cursor': 'pointer',
				'position': 'absolute',
				'display': 'inline-block',
				'top': self.form_imaging_show.position().top,
				'left': self.form_imaging_show.position().left,
				'text-align': 'center',
				'background':'red',
				'overflow':'hidden'
			});
			if (self.checkBrowser() == 'Chrome'){
				self.form_imaging_over_display.css({'height': self.form_imaging_show.height()-12});
			}
			jQuery(self).find('div.imaging-hover').hide();
			jQuery(self).find('div#over-imaging-item-'+(self.currently_active_imaging+1)).show();
			self.loadPluginSource(self.options.imaging_list[self.currently_active_imaging].name);
			jQuery(document).unbind("vt_loaded_plg").on('vt_loaded_plg', function(event, func_name){
				self.overlay_resize();
				self.form_imaging_over_display.html('');
				self.queue_slide_new_events[self.queue_slide_new_events.length] = func_name;
				window[func_name](self);
			});
		};
		self.createForm = function(){
			if (self.options.skin == undefined || self.options.skin > 3 || self.options.skin < 1){
				self.options.skin = 1;
			}
			self.main_form = jQuery('<div />');
			self.main_form.css({
				'width': self.options.form_width,
				'height': self.options.form_height,
				'text-align': 'center'
			});
			self.main_form.css(self.options.form_extra_style);
			if (self.options.skin == 1){
				self.main_imaging = jQuery('<div />');
				self.main_imaging_list = jQuery('<div />');
				self.main_imaging_list.css({
					'width': '100%',
					'height': self.options.form_imaging_list_height
				});
				self.main_form.append(self.main_imaging);
				self.main_form.append(self.main_imaging_list);
			}else if (self.options.skin == 2){
				self.main_imaging = jQuery('<div />');
				self.main_imaging.css({
					'width': self.options.form_width-self.options.form_imaging_list_width-10,
					'height': self.options.form_height - self.options.form_imaging_list_height,
					'float': 'left',
					'margin-left': '10px'
				});
				self.main_imaging_list = jQuery('<div />');
				self.main_imaging_list.css({
					'width': self.options.form_imaging_list_width,
					'height': self.options.form_height,
					'float': 'left'
				});
				self.main_form.append(self.main_imaging_list);
				self.main_form.append(self.main_imaging);
			}else if(self.options.skin == 3){
				self.main_imaging_list = jQuery('<div />');
				self.main_imaging_list.css({
					'width': self.options.form_imaging_list_width,
					'height': self.options.form_height,
					'float': 'left'
				});
				self.main_imaging = jQuery('<div />');
				self.main_imaging.css({
					'width': self.options.form_width-self.options.form_imaging_list_width-10,
					'height': self.options.form_height,
					'float': 'left',
					'margin-right': '10px'
				});
				self.main_form.append(self.main_imaging);
				self.main_form.append(self.main_imaging_list);
			}
			self.form_imaging = jQuery('<div />');
			self.form_imaging.attr('class', 'form-imaging');
			self.form_imaging.css({
				'width': '100%',
				'height': parseInt(self.options.form_height) - parseInt(self.options.form_imaging_audio_height) - parseInt(self.options.form_imaging_description_height)- parseInt(self.options.form_imaging_list_height),
				'display':'inline-block'
			});
			if (self.options.skin > 1){
				self.form_imaging.css({'height': parseInt(self.options.form_height) - parseInt(self.options.form_imaging_audio_height) - parseInt(self.options.form_imaging_description_height) - parseInt(self.options.form_imaging_list_height)});
			}
			self.main_imaging.append(self.form_imaging);
			self.form_imaging_list = jQuery('<div />');
			self.form_imaging_list.css({
				'width': '100%',
				'height': self.options.form_imaging_list_height,
				'text-align': 'center'
			});
			self.form_imaging.append(self.form_imaging_list);			
			jQuery(self).append(self.main_form);
		};
		self.createFormList = function(){
			if (self.options.imaging_list.length > 0){
				self.slide_imaging = jQuery('<div />');
				self.slide_imaging.css({
					'width': '100%',
					'height': self.options.form_imaging_list_height,
					'text-align': 'center',
					'position': 'relative',
					'border-radius': '22px',
					'border-top-right-radius': '0px',
					'border-top-left-radius': '0px',
					'border-right':'none',
					'display':'inline-block'
				});
				if (self.options.skin == 1){
					self.prev_imaging = jQuery('<div />');
					self.prev_imaging.attr('class', 'prev-imaging');
					self.prev_imaging.css({
						'float': 'left',
						'background':'url(asset/images/'+self.options.player_color.replace('#', '')+'-prev-imaging-slide.png) no-repeat center',
						'width': '30px',
						'height': '30px',
						'cursor': 'pointer',
						'margin-top': '40px'
					});
					self.prev_imaging.html('&nbsp;');
					self.slide_imaging.append(self.prev_imaging);
				}else{
					self.slide_imaging.css({'height':'100%', 'margin-top': '0px'});
				}
				self.list_imaging = jQuery('<div />');
				if (self.options.skin == 1){
					self.list_imaging.css({
						'position': 'relative',
						'float': 'left',
						'height': self.options.form_imaging_list_height,
						'padding': '0px 8px',
						'width': (self.main_form.width() - 80) + 'px',
						'overflow-x': 'hidden',
						'overflow-y': 'hidden'
					});
				}else{
					self.list_imaging.css({
						'float': 'left',
						'height': '100%',
						'width': self.options.form_imaging_list_width + 'px',
						'overflow-x': 'hidden',
						'overflow-y': 'scroll'
					});
				}				
				for(var n = 0; n < self.options.imaging_list.length; n++){
					var imaging = jQuery('<div />');
					imaging.attr('class', 'imaging-item');
					imaging.attr('id', 'imaging-item-'+(n+1));
					imaging.attr('data-imaging-id', n);
					if (self.options.skin == 1){
						imaging.css({
							'width': '100px',
							'height': self.options.form_imaging_list_height,
							'left': n*100+'px',
							'position': 'absolute',
							'cursor': 'pointer',
							'margin': '0px 3px',
							'display': 'inline-block',
							'text-align': 'center'
						});
					}else{
						imaging.css({
							'width': self.options.form_imaging_list_width,
							'height': '100px',
							'position': 'relative',
							'cursor': 'pointer',
							'float': 'none',
							'margin-bottom': '10px',
							'display': 'inline-block',
							'text-align': 'center'
						});
					}
					self.list_imaging.append(imaging);
					var imaging_thum = jQuery('<img />');
					imaging_thum.attr('src', self.options.imaging_list[n].thumbnail);
					imaging_thum.attr('alt', self.options.imaging_list[n].description);
					imaging_thum.css({
						'width': '80px',
						'height': '100px',
						'-webkit-border-radius': '8px',
						'-moz-border-radius': '8px',
						'margin-top':'2px'
					});
					imaging.append(imaging_thum);
					var div_over = jQuery('<div />');
					div_over.attr('class', 'imaging-hover');
					div_over.attr('id', 'over-imaging-item-'+(n+1));
					if (self.options.skin == 1){
						div_over.css({
							'position':'absolute',
							'width': '100px',
							'height': '0px',
							'cursor': 'pointer',
							'margin': '0px 3px',
							'display': 'inline-block',
							'text-align': 'center',
							'opacity': 0.8,
							'display':'none',
							'top': 30
						});
					}else{
						div_over.css({
							'position':'absolute',
							'width': self.options.form_imaging_list_width,
							'height': '0px',
							'top':32,
							'cursor': 'pointer',
							'float': 'none',
							'display': 'inline-block',
							'text-align': 'center',
							'opacity': 0.8,
							'display':'none'
						});
					}
					imaging.get(0).addEventListener("mouseover", function(){
						jQuery(self).find('div.imaging-hover').hide();
						jQuery(this).find('div.imaging-hover').css({
							'height': '100px'
						}).show();
					});
					imaging.mouseout(function(){
						jQuery(this).find('div.imaging-hover').css({
							'height': '0px'
						}).hide();
						jQuery(self).find('div#over-imaging-item-'+(self.currently_active_imaging+1)).show();
					});
					var overlay_img = jQuery('<img />');
					overlay_img.attr('src', 'asset/images/'+self.options.player_color.replace('#', '')+'-play-button.png');
					overlay_img.attr('width', '40px');
					overlay_img.attr('height', '40px');
					if (self.options.skin > 1){
						overlay_img.css({'margin-left':'-3px'});
					}else{
						overlay_img.css({'margin-left':'-8px'});
					}
					div_over.append(overlay_img);
					imaging.append(div_over);
					imaging.click(function(){
						self.setActiveImaging(parseInt(jQuery(this).attr('data-imaging-id')));
						self.loadImaging();
					});
				}
				self.slide_imaging.append(self.list_imaging);
				if (self.options.skin == 1){
					self.next_imaging = jQuery('<div />');
					self.next_imaging.html('&nbsp;');
					self.next_imaging.attr('class', 'next-imaging');
					self.next_imaging.css({
						'float': 'right',
						'background':'url(asset/images/'+self.options.player_color.replace('#', '')+'-next-imaging-slide.png) no-repeat center',
						'width': '30px',
						'height': '30px',
						'cursor': 'pointer',
						'margin-top': '40px'
					});
					self.slide_imaging.append(self.next_imaging);
				}
				if (self.options.skin == 1){
					self.prev_imaging.click(function(){
						var total_imaging = jQuery(self).find('div.imaging-item').length;
						if (jQuery('#imaging-item-'+total_imaging).position().left <= 0){
							jQuery(self).find('div.imaging-item').each(function(n){
								jQuery(this).css({
									'left': (self.slide_imaging.width()+n*100)+'px'
								});
							});
						}else{
							jQuery(self).find('div.imaging-item').each(function(n){
								jQuery(this).css({
									'left': (jQuery(this).position().left-100)+'px'
								});
							});
						}
					});
					self.next_imaging.click(function(){
						var total_imaging = jQuery(self).find('div.imaging-item').length;
						if (jQuery('#imaging-item-1').position().left >= ((self.main_form.width() - 60))){
							jQuery(self).find('div.imaging-item').each(function(n){
								jQuery(this).css({
									'left': ((n-total_imaging+1)*100)+'px'
								});
							});
						}else{
							jQuery(self).find('div.imaging-item').each(function(n){
								jQuery(this).css({
									'left': (jQuery(this).position().left+100)+'px'
								});
							});
						}
					});
				}
				self.main_imaging_list.append(self.slide_imaging);
			}
		};
		self.addNewItem = function(imaging_details)
		{
			if (imaging_details.name == undefined || imaging_details.title == undefined || imaging_details.description == undefined || imaging_details.thumbnail == undefined || imaging_details.src == undefined){
				alert('Error Data Input');
				return;
			}
			self.options.imaging_list.push(imaging_details);
			var imaging = jQuery('<div />');
			imaging.attr('class', 'imaging-item');
			imaging.attr('id', 'imaging-item-'+(self.options.imaging_list.length));
			imaging.attr('data-imaging-id', self.options.imaging_list.length-1);
			if (self.options.skin == 1){
				imaging.css({
					'width': '100px',
					'height': self.options.form_imaging_list_height-5,
					'left': (self.options.imaging_list.length-1)*100+'px',
					'position': 'absolute',
					'cursor': 'pointer',
					'margin': '0px 3px',
					'display': 'inline-block',
					'text-align': 'center'
				});
			}else{
				imaging.css({
					'width': self.options.form_imaging_list_width,
					'height': '100px',
					'position': 'relative',
					'cursor': 'pointer',
					'float': 'none',
					'margin-bottom': '10px',
					'display': 'inline-block',
					'text-align': 'center'
				});
			}
			self.list_imaging.append(imaging);
			var imaging_thum = jQuery('<img />');
			imaging_thum.attr('src', self.options.imaging_list[self.options.imaging_list.length-1].thumbnail);
			imaging_thum.attr('alt', self.options.imaging_list[self.options.imaging_list.length-1].description);
			imaging_thum.css({
				'width': '80px',
				'height': '100px',
				'-webkit-border-radius': '8px',
				'-moz-border-radius': '8px',
				'margin-top':'2px'
			});
			
			var div_over = jQuery('<div />');
			div_over.attr('class', 'imaging-hover');
			div_over.attr('id', 'over-imaging-item-'+(self.options.imaging_list.length));
			if (self.options.skin == 1){
				div_over.css({
					'position':'absolute',
					'width': '100px',
					'height': '0px',
					'cursor': 'pointer',
					'margin': '0px 3px',
					'display': 'inline-block',
					'text-align': 'center',
					'opacity': 0.8,
					'display':'none',
					'top': 30
				});
			}else{
				div_over.css({
					'position':'absolute',
					'width': self.options.form_imaging_list_width,
					'height': '0px',
					'top':32,
					'cursor': 'pointer',
					'float': 'none',
					'display': 'inline-block',
					'text-align': 'center',
					'opacity': 0.8,
					'display':'none'
				});
			}
			var overlay_img = jQuery('<img />');
			overlay_img.attr('src', 'asset/images/'+self.options.player_color.replace('#', '')+'-play-button.png');
			overlay_img.attr('width', '40px');
			overlay_img.attr('height', '40px');
			if (self.options.skin > 1){
				overlay_img.css({'margin-left':'-3px'});
			}else{
				overlay_img.css({'margin-left':'-8px'});
			}
			div_over.append(overlay_img);
			imaging.append(div_over);
			imaging.append(imaging_thum);
			imaging.get(0).addEventListener("mouseover", function(){
				jQuery(self).find('div.imaging-hover').hide();
				jQuery(this).find('div.imaging-hover').css({
					'height': '100px'
				}).show();
			})
			imaging.mouseout(function(){
				jQuery(this).find('div.imaging-hover').css({
					'height': '0px'
				}).hide();
				jQuery(self).find('div#over-imaging-item-'+(self.currently_active_imaging+1)).show();
			});
			imaging.click(function(){
				self.setActiveImaging(parseInt(jQuery(this).attr('data-imaging-id')));
				self.loadImaging();
			});
		};
		self.overlay_resize = function(){
			if (self.form_imaging_over_display != undefined)
			{
				self.form_imaging_over_display.css({
					'height': self.form_imaging_show.height(), 
					'width': self.form_imaging_show.width(),
					'cursor': 'pointer',
					'position': 'absolute',
					'display': 'inline-block',
					'top': self.form_imaging_show.position().top,
					'left': self.form_imaging_show.position().left,
					'text-align': 'center',
					'background':'none',
					'display': 'inline-block',
					'overflow-x': 'none',
					'overflow-y': 'none',
					'overflow':'hidden',
					'margin-top': '0px',
					'background':''
					
				});
				if (self.checkBrowser() == 'Chrome'){
					self.form_imaging_over_display.css({'height': self.form_imaging_show.height()-12});
				}
				if (self.getCurrentImaging().name == 'stefanweck'){
					self.form_imaging_over_display.css({
						'background-color':'hsl(195, 100%, 7%)'
					});
				}
			}
		};
		self.resizeForm = function(){
			if (jQuery(self).parents('div').length == 0){
				if (self.options.skin == 1){
					self.options.form_height = jQuery(window).height()-50;
				}else{
					self.options.form_height = jQuery(window).height()-60;
				}
				self.options.form_width = jQuery(window).width() - 70;
			}else{
				if (self.options.skin == 1){
					self.options.form_height = jQuery(self).height()-50;
				}else{
					self.options.form_height = jQuery(self).height()-60;
				}
				self.options.form_width = jQuery(self).width() - 70;
			}
			self.main_form.css({
				'width': self.options.form_width,
				'height': self.options.form_height,
				'text-align': 'center'
			});
			if (self.options.skin == 1){
				self.main_imaging_list.css({
					'width': '100%',
					'height': self.options.form_imaging_list_height
				});
				self.main_form.append(self.main_imaging);
				self.main_form.append(self.main_imaging_list);
			}else if (self.options.skin == 2){
				self.main_imaging.css({
					'width': self.options.form_width-self.options.form_imaging_list_width-10,
					'height': self.options.form_height - self.options.form_imaging_list_height,
					'float': 'left',
					'margin-left': '10px'
				});
				self.main_imaging_list.css({
					'width': self.options.form_imaging_list_width,
					'height': self.options.form_height,
					'float': 'left'
				});
			}else if(self.options.skin == 3){
				self.main_imaging_list.css({
					'width': self.options.form_imaging_list_width,
					'height': self.options.form_height,
					'float': 'left'
				});
				self.main_imaging.css({
					'width': self.options.form_width-self.options.form_imaging_list_width-10,
					'height': self.options.form_height,
					'float': 'left',
					'margin-right': '10px'
				});
			}
			self.form_imaging.css({
				'width': '100%',
				'height': parseInt(self.options.form_height) - parseInt(self.options.form_imaging_audio_height) - parseInt(self.options.form_imaging_description_height)- parseInt(self.options.form_imaging_list_height),
				'display':'inline-block'
			});
			if (self.options.skin > 1){
				self.form_imaging.css({'height': parseInt(self.options.form_height) - parseInt(self.options.form_imaging_audio_height) - parseInt(self.options.form_imaging_description_height) - parseInt(self.options.form_imaging_list_height)});
			}
			self.form_imaging_list.css({
				'width': '100%',
				'height': self.options.form_imaging_list_height,
				'text-align': 'center'
			});
			self.slide_imaging.css({
				'width': '100%',
				'height': self.options.form_imaging_list_height,
				'text-align': 'center',
				'position': 'relative',
				'border-radius': '22px',
				'border-top-right-radius': '0px',
				'border-top-left-radius': '0px',
				'border-right':'none',
				'display':'inline-block'
			});
			if (self.options.skin == 1){
				self.prev_imaging.css({
					'float': 'left',
					'background':'url(asset/images/'+self.options.player_color.replace('#', '')+'-prev-imaging-slide.png) no-repeat center',
					'width': '30px',
					'height': '30px',
					'cursor': 'pointer',
					'margin-top': '40px'
				});
			}else{
				self.slide_imaging.css({'height':'100%', 'margin-top': '0px'});
			}
			if (self.options.skin == 1){
				self.list_imaging.css({
					'position': 'relative',
					'float': 'left',
					'height': self.options.form_imaging_list_height,
					'padding': '0px 8px',
					'width': (self.main_form.width() - 80) + 'px',
					'overflow-x': 'hidden',
					'overflow-y': 'hidden'
				});
			}else{
				self.list_imaging.css({
					'float': 'left',
					'height': '100%',
					'width': self.options.form_imaging_list_width + 'px',
					'overflow-x': 'hidden',
					'overflow-y': 'scroll'
				});
			}
			self.form_imaging_show.css({
				'height': (parseInt(self.options.form_height)-parseInt(self.options.form_imaging_audio_height) - parseInt(self.options.form_imaging_description_height)-parseInt(self.options.form_imaging_list_height))+'px', 
				'width': self.options.form_width+'px',
				'background':'#FFF',
				'display':'inline-block'
			});
			self.form_imaging_over_display.css({
				'height': (parseInt(self.options.form_height)-parseInt(self.options.form_imaging_audio_height) - parseInt(self.options.form_imaging_description_height)-parseInt(self.options.form_imaging_list_height))+'px', 
				'width': self.options.form_width+'px'
			});
			if (self.options.skin == 1){
				self.form_imaging_show_img.css({
					'height': (parseInt(self.options.form_height)-parseInt(self.options.form_imaging_audio_height) - parseInt(self.options.form_imaging_description_height)-parseInt(self.options.form_imaging_list_height))+'px', 
					'width': self.options.form_width+'px',
					'cursor': 'pointer'
				});
			}else{
				self.form_imaging_show_img.css({
					'height': self.options.form_height - self.options.form_imaging_description_height - self.options.form_imaging_audio_height, 
					'width':  '100%',
					'cursor': 'pointer'					
				});
			}
			self.loadImaging();
		};
		self.resizeFix = function(){
			self.form_imaging.css({'display':'inline-block'});
			if (self.options.skin > 1)
			{
				jQuery(self).css({
					'clear': 'both',
					'display': 'inline-block',
					'text-align': 'center'
				});
				self.slide_imaging.css({
					'height': self.form_imaging_show.height()+self.form_imaging_text.outerHeight()+self.form_imaging_audio.height()
				});
				self.main_form.css({
					'height': self.form_imaging_show.height()+self.form_imaging_text.outerHeight()+self.form_imaging_audio.height()
				});
				
				jQuery(self).css({'display': 'block'});
			}else{
				self.main_imaging.css({
					'height': self.form_imaging_show.height()+self.form_imaging_text.outerHeight()+self.form_imaging_audio.height()
				});
				self.form_imaging.css({
					'height': self.form_imaging_show.height()+self.form_imaging_text.outerHeight()+self.form_imaging_audio.height()
				});
				self.main_form.css({
					'height': self.form_imaging_show.height()+self.form_imaging_text.outerHeight()+self.slide_imaging.outerHeight()+self.form_imaging_audio.height()
				});
			}
			self.overlay_resize();
		};
		self.checkBrowser = function(){
			var c = navigator.userAgent.search("Chrome");
			var f = navigator.userAgent.search("Firefox");
			var m8 = navigator.userAgent.search("MSIE 8.0");
			var m9 = navigator.userAgent.search("MSIE 9.0");
			if (c > -1) {
				var browser = "Chrome";
			} else if (f > -1) {
				var browser = "Firefox";
			} else if (m9 > -1) {
				var browser ="MSIE 9.0";
			} else if (m8 > -1) {
				var browser ="MSIE 8.0";
			}
			return browser;
		};
		self.createScreenLoading = function()
		{
			var bg_load = jQuery('<div />');
			bg_load.attr('id', 'pre-load');
			bg_load.css({
				'position': 'absolute',
				'width': self.form_imaging_show.width(),
				'height': self.form_imaging_show.height(),
				'opacity': 1,
				'top': self.form_imaging_show.offset().top,
				'left': self.form_imaging_show.offset().left
			});
			if (self.options.skin == 2){
				bg_load.css({
					'position': 'absolute',
					'width': self.form_imaging_show.width(),
					'height': self.form_imaging_show.height(),
					'opacity': 1,
					'top': self.form_imaging_show.offset().top,
					'left': self.form_imaging_show.offset().left
				});
			}
			if (self.options.skin == 3){
				bg_load.css({
					'position': 'absolute',
					'width': self.form_imaging_show.width(),
					'height': self.form_imaging_show.height(),
					'opacity': 1,
					'top': self.form_imaging_show.offset().top,
					'left': self.form_imaging_show.offset().left
				});
			}
			var container_load = jQuery('<div />');
			container_load.css({
				'background': '#FFF',
				'width': '70px',
				'height': '70px',
				'position': 'absolute',
				'-webkit-box-shadow': '0px 0px 3px 0px '+self.options.player_color,
				'-moz-box-shadow':    '0px 0px 3px 0px '+self.options.player_color,
				'box-shadow':         '0px 0px 3px 0px '+self.options.player_color,
				'-webkit-border-radius': '6px',
				'-moz-border-radius': '6px',
				'left': self.form_imaging_show.offset().left + self.form_imaging_show.width()/2-100,
				'top': self.form_imaging_show.position().top+self.form_imaging_show.height()/2-100,
				'text-align': 'center'
			});
			if (self.options.skin == 2){
				container_load.css({'left': self.form_imaging_show.offset().left+ self.form_imaging_show.width()/2-200});
			}
			if (self.options.skin == 3){
				container_load.css({'left': self.form_imaging_show.offset().left+self.form_imaging_show.width()/2-50});
			}
			var container_img = jQuery('<img />');
			container_img.attr('src', 'asset/images/'+self.options.player_color.replace('#', '')+'-ajax-loader.gif');
			container_img.attr('width', '50px');
			container_img.css({'margin-top':'10px'});
			container_load.append(container_img);
			bg_load.append(container_load);
			self.form_imaging.append(bg_load);
		};
		self.clearScreenLoading = function()
		{
			if (jQuery(self).find('div#pre-load').length > 0){
				jQuery(self).find('div#pre-load').remove();
			}
		};
		self.compile = function(){
			jQuery(window).unbind("resize").resize(function(){		
				//self.resizeForm();
			});
			self.createForm();
			self.createFormList();
			self.loadImaging();			
			self.resizeFix();
		};
		return self.constructor(fn_options);
	};
})(jQuery);