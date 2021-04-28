$(document).ready(function() { 
	$(document.body).dblclick(function() { 
		fullScreen();
	}); 
}); 


/* -- sidebar -- */

function toggleSidebar(direction, id){
	if($("body").hasClass("acvs")) return;
	if(direction == null){
		$(document.body).removeClass('toggle-left toggle-right');
	}else{
		if(direction == 'right'){
			$(document.body).removeClass('toggle-left');
		}
		$(document.body).toggleClass('toggle-'+direction);
	}
}

/* -- scrollX -- */

function scrollX(){

	$('.scroll-x').each(function(){
	
		var distance = $(this).width()+$(this).parent().width() + 10;
		
		if($(this).width()>$(this).parent().width()){
			$(this).addClass('animation-scroll-x');
			$(this).css({
				'-webkit-animation-duration' : (distance/150)+'s',
				'animation-duration' : (distance/150)+'s',
				'padding-left' : '100%'
			});
		}else{
			$(this).css({
				'padding-left' : '100%'
			});
		}
	});
}

scrollX();

/* -- scrollY -- */

function scrollY(limit){

	var elem = $('.scroll-y');
	var elemHeight = elem.height();
	var parentHeight = elem.parent().height();
	var elemHeightRelative  = elemHeight/parentHeight*100;
	
	if (elemHeightRelative>limit && limit < 100){
		var distance = (elemHeight-(parentHeight/1.1))/$(window).height()*100;
		var time     = distance/6+10;
		var delay    = 5/time*100;
		
		$("<style type='text/css'> @keyframes scrollY{ 0%, "+delay+"%{ transform:translateY(0%); } "+(100-delay)+"%, 100%{ transform:translateY(-"+distance+"vh); } } </style>").appendTo("head");
		$(elem).css({
			'animation' : 'scrollY '+time+'s linear infinite 0s'
		});
	}else{
		$(elem).css({
			'animation' : 'none'
		});
	}
}

/* -- fullScreen -- */

function fullScreen(){
	if(
		(document.fullScreenElement && document.fullScreenElement !== null) ||
		(!document.mozFullScreen && !document.webkitIsFullScreen)){
			if(document.documentElement.requestFullScreen){  
				document.documentElement.requestFullScreen();  
			}else if(document.documentElement.mozRequestFullScreen){  
				document.documentElement.mozRequestFullScreen();  
			}else if(document.documentElement.webkitRequestFullScreen){  
				document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
			}  
	}else{  
		if(document.cancelFullScreen){
			document.cancelFullScreen();
		}else if(document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		}else if(document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}
	}
}

/* -- clock -- */

function clock(){
	date = new Date;
	date.setHours(date.getHours()+(date.getTimezoneOffset()/-60));
	
	h = date.getUTCHours();
	if(h<10){
		h = '0'+h;
	}
	$('#clock-hours').html(h);
	m = date.getUTCMinutes();
	if(m<10){
		m = '0'+m;
	}
	$('#clock-minutes').html(m);
	s = date.getUTCSeconds();
	if(s<10){
		s = '0'+s;
	}
	$('#clock-seconds').html(s);
	setTimeout('clock("clock");','1000');
	return true;
}

clock();