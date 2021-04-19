const database = firebase.database().ref();

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

function loadTrains(user_id, id){
    database.child("users").child(user_id).child("gares").child(id).child("trains").get().then((snapshot) => {
        var i = 0;
        snapshot.forEach((childsnapshot) => {
            // Root
            var firstrow = document.createElement('div');
            var secondrow = document.createElement('div');
            
            // First Row
            var firstcol_firstrow = document.createElement('div');
            var secondfirstcol_firstrow = document.createElement('div');
            var secondsecondcol_firstrow = document.createElement('div');
            var secondthirdcol_firstrow = document.createElement('div');
            var thirdcol_firstrow = document.createElement('div');
            
            // First Col
            var logo = document.createElement('div');
            
            // Second First Col
            var animationblink = document.createElement('div');
            var animationblink1 = document.createElement('div');
            var animationblink2 = document.createElement('div');
            var type = document.createElement('span');
            var br = document.createElement('br');
            var number = document.createElement('span');
            
            // Second Third Col
            var dest = document.createElement('span');
            
            // Third Col
            var track = document.createElement('div');
            var voie = document.createElement('span');
            
            // Second Row
            var firstcol_secondrow = document.createElement('div');
            var secondcol_secondrow = document.createElement('div');
            var thirdcol_secondrow = document.createElement('div');
            
            // Second Col
            var gares = document.createElement('div');
            
            // Values
            const train_destination = childsnapshot.val().destination;
            const train_hour = childsnapshot.val().hour;
            const train_number = childsnapshot.val().number;
            const train_type = childsnapshot.val().type;
            const train_gares = childsnapshot.val().gares;
            const train_retard_type = childsnapshot.val().retardtype;
            const train_retard_time = childsnapshot.val().retardtime;
            const train_voie = childsnapshot.val().voie;
            
            var gares_split = train_gares.split("|");
            var retard, textfeature;
            var animation_time = 5.30 * gares_split.length;
            
            if (train_retard_type === 'alheure') {
                retard = 'à l\'heure';
                textfeature = 1;
            } else if (train_retard_type === 'retindet') {
                retard = 'ret. indet.';
                textfeature = 3;
            } else if (train_retard_type === 'ret') {
                retard = 'retard '+train_retard_time+' min.';
                textfeature = 3;
            } else {
                retard = 'supprimé';
                textfeature = 3;
            }
            
            gares_split.forEach((item, index) => {
                var span = document.createElement('span');
                span.appendChild(document.createTextNode(item));
                gares.appendChild(span);
            });
            
            logo.setAttribute('class', 'train-logo train-logo-sncf');
            
            firstcol_firstrow.setAttribute('class', 'col-first');
            firstcol_firstrow.appendChild(logo);
            
            animationblink.setAttribute('class', 'animation-blink');
            animationblink1.setAttribute('class', 'animation-blink-1');
            type.setAttribute('class', 'text-type');
            type.appendChild(document.createTextNode(train_type));
            number.setAttribute('class', 'text-number');
            number.appendChild(document.createTextNode(train_number));
            animationblink2.setAttribute('class', 'animation-blink-2 text-features-'+textfeature);
            animationblink2.appendChild(document.createTextNode(retard));
            animationblink1.appendChild(type);
            animationblink1.appendChild(br);
            animationblink1.appendChild(number);
            animationblink.appendChild(animationblink1);
            animationblink.appendChild(animationblink2);
            
            secondfirstcol_firstrow.appendChild(animationblink);
            secondfirstcol_firstrow.setAttribute('class', 'col-second-first');
            
            secondsecondcol_firstrow.appendChild(document.createTextNode(train_hour.replace(':', 'h')));
            secondsecondcol_firstrow.setAttribute('class', 'col-second-second text-time');
            
            dest.appendChild(document.createTextNode(train_destination));
            dest.setAttribute('class', '');
            
            secondthirdcol_firstrow.appendChild(dest);
            secondthirdcol_firstrow.setAttribute('class', 'col-second-third');
            
            voie.appendChild(document.createTextNode(train_voie));
            
            track.appendChild(voie);
            track.setAttribute('class', 'train-track train-track-view voie');
            
            thirdcol_firstrow.appendChild(track);
            thirdcol_firstrow.setAttribute('class', 'col-third');
            
            firstrow.appendChild(firstcol_firstrow);
            firstrow.appendChild(secondfirstcol_firstrow);
            firstrow.appendChild(secondsecondcol_firstrow);
            firstrow.appendChild(secondthirdcol_firstrow);
            firstrow.appendChild(thirdcol_firstrow);
            
            if (i < 2) {
                firstcol_secondrow.setAttribute('class', 'col-first');
                
                gares.setAttribute('class', 'train-stations text-scroll-x scroll-x animation-scroll-x');
                gares.setAttribute('style', 'animation-duration: '+animation_time+'s; padding-left: 100%;');
                secondcol_secondrow.appendChild(gares);
                secondcol_secondrow.setAttribute('class', 'col-second');
                
                thirdcol_secondrow.setAttribute('class', 'col-third');
                
                secondrow.appendChild(firstcol_secondrow);
                secondrow.appendChild(secondcol_secondrow);
                secondrow.appendChild(thirdcol_secondrow);
            }
                
            firstrow.setAttribute('class', 'row');
            secondrow.setAttribute('class', 'row');
            
            var rowgroup = document.createElement('div');
            if (i < 2){
                rowgroup.setAttribute('class', 'row-group row-train row-group-2');
            } else {
                rowgroup.setAttribute('class', 'row-group row-train');
            }
            rowgroup.appendChild(firstrow);
            if (i < 2) {
                rowgroup.appendChild(secondrow);
            }
            
            document.getElementById('rows').appendChild(rowgroup);
            
            i++;
            
        });
        scrollX();
    });
}

clock();