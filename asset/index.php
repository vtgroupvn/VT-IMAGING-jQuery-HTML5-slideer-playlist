<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>HTML5 & jQuery - AUDIO SLIDE PLAYER</title>
<script type="text/javascript" src="asset/js/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="asset/js/vt-imaging.js"></script>
<script type="text/javascript">
	<?php 
		error_reporting(0);
		$skin = (int) $_REQUEST['select_skin'];
		if ($skin > 3 || $skin < 0){
			$skin = 1;
		}
		$color = (string) $_REQUEST['select_color'];
		if ($color == ''){
			$color = '#2C3D82';
		}
	?>
	
	jQuery(document).ready(function(){
		var player_color = '<?php echo $color;?>';
		var fn_vt_imaging = jQuery('div#vt-imaging').vt_imaging({
			form_height: '700',
			form_width: '900',
			form_imaging_audio_height: '20',
			form_imaging_description_height: '100',
			form_imaging_list_height: '100',
			form_imaging_list_width: '120',
			form_extra_style : {
				'background':+player_color,
				'margin': 'auto',
				'margin-top': '20px',
				'border': '1px solid '+player_color,
				'border-radius': '60%',
				'-webkit-box-shadow': '0px 0px 1px 2px '+player_color,
				'-moz-box-shadow':    '0px 0px 1px 2px '+player_color,
				'box-shadow':         '0px 0px 1px 2px '+player_color,
				'-webkit-border-radius': '6px',
				'-moz-border-radius': '6px',
				'padding': '10px'
			},
			imaging_list:[			
				{name:'default', title: 'Description', description: 'Description<br />Description<br />Description<br />Description', thumbnail:'asset/images/1-t.jpg', src: 'asset/images/1.jpg', audio_src: 'asset/musics/duongdendinhvinhquang.mp3'},
				{name:'transform_yscale', title: 'Description', description: 'Description', thumbnail:'asset/images/2-t.jpg', src: 'asset/images/2.jpg', audio_src: 'asset/musics/KhocTrongMua.mp3'},
				{name:'transform_swivel', title: 'Description', description: 'Description', thumbnail:'asset/images/3-t.jpg', src: 'asset/images/3.jpg', audio_src: 'asset/musics/duongdendinhvinhquang.mp3'},
				{name:'bribbles', title: 'Description', description: 'Description', thumbnail:'asset/images/4-t.jpg', src: 'asset/images/4.jpg', audio_src: 'asset/musics/KhocTrongMua.mp3'},
				{name:'lines', title: 'Description', description: 'Description', thumbnail:'asset/images/5-t.jpg', src: 'asset/images/5.jpg', audio_src: 'asset/musics/duongdendinhvinhquang.mp3'},
				{name:'louvers', title: 'Description', description: 'Description', thumbnail:'asset/images/6-t.jpg', src: 'asset/images/6.jpg', audio_src: 'asset/musics/KhocTrongMua.mp3'},
				{name:'broken', title: 'Description', description: 'Description', thumbnail:'asset/images/2-t.jpg', src: 'asset/images/2.jpg', audio_src: 'asset/musics/KhocTrongMua.mp3'},
				{name:'brick', title: 'Description', description: 'Description', thumbnail:'asset/images/4-t.jpg', src: 'asset/images/4.jpg', audio_src: 'asset/musics/KhocTrongMua.mp3'},
			],
			url_plugin_folder:'asset/js/plugins/',
			player_color: player_color,
			skin: <?php echo $skin;?>,//[1,2,3]-have 3 skin
		});
		fn_vt_imaging.compile();
		//fn_vt_imaging.addNewItem({name:'default', title: 'Description', description: 'Description<br />Description<br />Description<br />Description', thumbnail:'asset/images/3-t.jpg', src: 'asset/images/3.jpg', audio_src: 'asset/musics/duongdendinhvinhquang.mp3'});
	});
</script>
</head>
<body>
<form action="index.php" method="post">
<center><img src="asset/images/jquery-plugins.jpg" alt="jQuery Plugins"/></center>
<center>
	<select name="select_skin" onChange="this.form.submit();">
		<option value="0" selected="selected">--Select Skin--</option>
		<option value="1" <?php if ($skin == 1){echo 'selected="selected"';}?>>TOP to BOTTOM</option>
		<option value="2" <?php if ($skin == 2){echo 'selected="selected"';}?>>LEFT to RIGHT</option>
		<option value="3" <?php if ($skin == 3){echo 'selected="selected"';}?>>RIGHT to LEFT</option>
	</select>
	<select name="select_color" onChange="this.form.submit();">
		<option value="" selected="selected">--Select Color--</option>
		<option value="#2C3D82" <?php if ($color == '#2C3D82'){echo 'selected="selected"';}?>>Blue</option>
		<option value="#FFAA00" <?php if ($color == '#FFAA00'){echo 'selected="selected"';}?>>Yellow</option>
		<option value="#A60000" <?php if ($color == '#A60000'){echo 'selected="selected"';}?>>Red</option>
	</select>
</center>
<div id="vt-imaging"></div>
</form>
</body>
</html>
