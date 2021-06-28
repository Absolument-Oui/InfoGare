const database = firebase.database().ref();

function loadTrain(uid) {
    var params = new URLSearchParams(location.search);
    database.child("users").child(uid).child("gares").child(params.get('gid')).child("trains").child(params.get('tid')).get().then((snapshot) => {
        document.getElementById('train_number').innerText = snapshot.val().number;
        document.getElementById('train_type').innerText = snapshot.val().type;
        document.getElementById('train_dest').innerText = snapshot.val().destination;

        var logo = document.getElementById('logo');
        var train_type = snapshot.val().type;
        
        if (train_type === 'TER') {
            logo.setAttribute('class', 'train-logo train-logo-ter');
        } else if (train_type === 'TGV') {
            logo.setAttribute('class', 'train-logo train-logo-tgv');
        } else if (train_type === 'OuiGo') {
            logo.setAttribute('class', 'train-logo train-logo-ouigo');
        } else if (train_type === 'inOui') {
            logo.setAttribute('class', 'train-logo train-logo-inoui');
        } else if (train_type === 'Thalys') {
            logo.setAttribute('class', 'train-logo train-logo-thalys');
        } else if (train_type === 'Eurostar') {
            logo.setAttribute('class', 'train-logo train-logo-eurostar');
        } else if (train_type === 'TGV Lyria') {
            logo.setAttribute('class', 'train-logo train-logo-lyria');
        } else if (train_type === 'ICE') {
            logo.setAttribute('class', 'train-logo train-logo-ice');
        } else if (train_type === 'Fluo Grand Est') {
            logo.setAttribute('class', 'train-logo train-logo-fluo');
        } else if (train_type === 'TER Occitanie') {
            logo.setAttribute('class', 'train-logo train-logo-occitanie');
        } else if (train_type === 'Intercité') {
            logo.setAttribute('class', 'train-logo train-logo-intercite');
        } else if (train_type === 'Aléop') {
            logo.setAttribute('class', 'train-logo train-logo-aleop');
        } else if (train_type === 'TER Auvergne') {
            logo.setAttribute('class', 'train-logo train-logo-ter-auvergne');
        } else if (train_type === 'BreizhGo') {
            logo.setAttribute('class', 'train-logo train-logo-breizhgo');
        } else if (train_type === 'DB') {
            logo.setAttribute('class', 'train-logo train-logo-db');
        } else if (train_type === 'TER Hauts de France') {
            logo.setAttribute('class', 'train-logo train-logo-hauts-de-france');
        } else if (train_type === 'Lio') {
            logo.setAttribute('class', 'train-logo train-logo-lio');
        } else if (train_type === 'Mobigo') {
            logo.setAttribute('class', 'train-logo train-logo-mobigo');
        } else if (train_type === 'Nomad') {
            logo.setAttribute('class', 'train-logo train-logo-nomad');
        } else if (train_type === 'TER Metrolor') {
            logo.setAttribute('class', 'train-logo train-logo-ter-metrolor');
        } else if (train_type === 'Rémi') {
            logo.setAttribute('class', 'train-logo train-logo-remi');
        } else if (train_type === 'Renfe Ave') {
            logo.setAttribute('class', 'train-logo train-logo-renfe-ave');
        } else if (train_type === 'SBB') {
            logo.setAttribute('class', 'train-logo train-logo-sbb');
        } else if (train_type === 'SNCF (logo 1958)') {
            logo.setAttribute('class', 'train-logo train-logo-sncf-1985');
        } else if (train_type === 'SNCF (logo 1992)') {
            logo.setAttribute('class', 'train-logo train-logo-sncf-1992');
        } else if (train_type === 'TER Alsace') {
            logo.setAttribute('class', 'train-logo train-logo-ter-alsace');
        } else if (train_type === 'TER Aquitaine') {
            logo.setAttribute('class', 'train-logo train-logo-ter-aquitaine');
        } else if (train_type === 'TER Basse Normandie') {
            logo.setAttribute('class', 'train-logo train-logo-ter-basse-normandie');
        } else if (train_type === 'TER Bourgogne') {
            logo.setAttribute('class', 'train-logo train-logo-ter-bourgogne');
        } else if (train_type === 'TER Bretagne') {
            logo.setAttribute('class', 'train-logo train-logo-ter-bretagne');
        } else if (train_type === 'TER Centre') {
            logo.setAttribute('class', 'train-logo train-logo-ter-centre');
        } else if (train_type === 'TER Nord pas de Calais') {
            logo.setAttribute('class', 'train-logo train-logo-ter-nord-pas-de-calais');
        } else if (train_type === 'TER Poitou Charentes') {
            logo.setAttribute('class', 'train-logo train-logo-ter-poitou-charentes');
        } else if (train_type === 'Thello') {
            logo.setAttribute('class', 'train-logo train-logo-thello');
        } else if (train_type === 'Tram train') {
            logo.setAttribute('class', 'train-logo train-logo-tram-train');
        } else if (train_type === 'Zou') {
            logo.setAttribute('class', 'train-logo train-logo-zou');
        } else {            
            logo.setAttribute('class', 'train-logo train-logo-sncf');
        }
        
        if (snapshot.val().retardtype === 'alheure') {
            var hour = document.createElement('div');
            var alheure = document.createElement('div');
            hour.innerText = snapshot.val().hourdepart.replace(':', 'h');
            hour.setAttribute('class', 'text-time-hours');
            alheure.innerText = 'à l\'heure';
            alheure.setAttribute('class', 'text-time-ontime');
            document.getElementById('train_ret').appendChild(hour);
            document.getElementById('train_ret').appendChild(alheure);
        } else if (snapshot.val().retardtype === 'retindet') {
            var animblink = document.createElement('div');
            var animblink1 = document.createElement('div');
            var animblink2 = document.createElement('div');
            var hour = document.createElement('div');
            var ontime = document.createElement('div');
            var retindet = document.createElement('div');
            animblink.setAttribute('class', 'col-second-merged animation-blink');
            animblink1.setAttribute('class', 'animation-blink-1');
            hour.innerText = snapshot.val().hourdepart.replace(':', 'h');
            hour.setAttribute('class', 'text-time-hours');
            ontime.setAttribute('class', 'text-time-ontime');
            animblink2.setAttribute('class', 'animation-blink-2');
            retindet.innerText = 'retard indet.';
            retindet.setAttribute('class', 'text-time-features');
            animblink2.appendChild(retindet);
            animblink1.appendChild(hour);
            animblink1.appendChild(ontime);
            animblink.appendChild(animblink1);
            animblink.appendChild(animblink2);
            document.getElementById('train_ret').appendChild(animblink);
        } else if (snapshot.val().retardtype === 'ret') {
            var animblink = document.createElement('div');
            var animblink1 = document.createElement('div');
            var animblink2 = document.createElement('div');
            var hour = document.createElement('div');
            var ontime = document.createElement('div');
            var retindet = document.createElement('div');
            animblink.setAttribute('class', 'col-second-merged animation-blink');
            animblink1.setAttribute('class', 'animation-blink-1');
            hour.innerText = snapshot.val().hourdepart.replace(':', 'h');
            hour.setAttribute('class', 'text-time-hours');
            ontime.setAttribute('class', 'text-time-ontime');
            animblink2.setAttribute('class', 'animation-blink-2');
            retindet.innerText = 'retard ' + snapshot.val().retardtime + ' min.';
            retindet.setAttribute('class', 'text-time-features');
            animblink2.appendChild(retindet);
            animblink1.appendChild(hour);
            animblink1.appendChild(ontime);
            animblink.appendChild(animblink1);
            animblink.appendChild(animblink2);
            document.getElementById('train_ret').appendChild(animblink);
        } else {
            var animblink = document.createElement('div');
            var animblink1 = document.createElement('div');
            var animblink2 = document.createElement('div');
            var hour = document.createElement('div');
            var ontime = document.createElement('div');
            var retindet = document.createElement('div');
            animblink.setAttribute('class', 'col-second-merged animation-blink');
            animblink1.setAttribute('class', 'animation-blink-1');
            hour.innerText = snapshot.val().hourdepart.replace(':', 'h');
            hour.setAttribute('class', 'text-time-hours');
            ontime.setAttribute('class', 'text-time-ontime');
            animblink2.setAttribute('class', 'animation-blink-2');
            retindet.innerText = 'supprimé';
            retindet.setAttribute('class', 'text-time-features');
            animblink2.appendChild(retindet);
            animblink1.appendChild(hour);
            animblink1.appendChild(ontime);
            animblink.appendChild(animblink1);
            animblink.appendChild(animblink2);
            document.getElementById('train_ret').appendChild(animblink);
        }
        var gares = snapshot.val().gares.substr(0, snapshot.val().gares.length - 1).split("|");
        gares.forEach((item, index) => { 
            var tr = document.createElement('tr');
            var trainstationcolumn = document.createElement('td');
            var trainstationstation = document.createElement('td');
            var spanstation = document.createElement('span');
            trainstationcolumn.setAttribute('class', 'trains-stations-column');
            trainstationstation.setAttribute('class', 'trains-stations-station');
            spanstation.setAttribute('title', item);
            spanstation.innerText = item;
            trainstationstation.appendChild(spanstation);
            if (index === (gares.length - 1)) {
                tr.setAttribute('class', 'train-stations-last-departures');
            }
            tr.appendChild(trainstationcolumn);
            tr.appendChild(trainstationstation);
            document.getElementById('gares').appendChild(tr);
        });
    });
    
    database.child("users").child(uid).child("gares").child(params.get('gid')).get().then((snapshot) => {
        document.getElementById('infos').innerHTML = snapshot.val().infos.replace('\n', ' &nbsp;');    
        
        document.getElementById('loader').style.display = 'none';
        
        scrollX();
        scrollY(75);

    });
}