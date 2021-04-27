const database = firebase.database().ref();

function loadTrain(uid) {
    var params = new URLSearchParams(location.search);
    database.child("users").child(uid).child("gares").child(params.get('gid')).child("trains").child(params.get('tid')).get().then((snapshot) => {
        document.getElementById('train_number').innerText = snapshot.val().number;
        document.getElementById('train_type').innerText = snapshot.val().type;
        document.getElementById('train_dest').innerText = snapshot.val().destination;
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
    });
    
    scrollX();
    scrollY();
}