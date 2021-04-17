function clock(){
	date = new Date;
	date.setHours(date.getHours()+(date.getTimezoneOffset()/-60));
	
	h = date.getUTCHours();
	if(h<10){
		h = '0'+h;
	}
	$('.rows.rows-departures #clock-hours, .rows.rows-arrivals #clock-hours').html(h);
	m = date.getUTCMinutes();
	if(m<10){
		m = '0'+m;
	}
	$('.rows.rows-departures #clock-minutes, .rows.rows-arrivals #clock-minutes').html(m);
	s = date.getUTCSeconds();
	if(s<10){
		s = '0'+s;
	}
	$('.rows.rows-departures #clock-seconds, .rows.rows-arrivals #clock-seconds').html(s);
	setTimeout('clock("clock");','1000');
	return true;
}

function loadTrains(id){
    
}

clock();