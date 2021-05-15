﻿const database = firebase.database().ref();

function loadArrives(user_id, id){
    var ref = database.child("users").child(user_id).child("gares").child(id).child("trains");
    ref.get().then((snapshot) => {
        snapshot.forEach((child) => {
            if (child.val().hourarrive != "") {
                list.push({
                    number: child.val().number,
                    provenance: child.val().provenance,
                    hourarrive: child.val().hourarrive,
                    type: child.val().type,
                    from: child.val().from,
                    retardtime: child.val().retardtime,
                    retardtype: child.val().retardtype,
                    voie: child.val().voie
                });
            }
        });
        list.sort((a, b) => {
            var x = a.hourarrive.toLowerCase();
            var y = b.hourarrive.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });
        var i = 0;
        list.forEach((value, index, array) => {
            if (i < 7) {
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
                const train_destination = value["provenance"];
                const train_hour = value["hourarrive"];
                const train_number = value["number"];
                const train_type = value["type"];
                const train_gares = value["from"];
                const train_retard_type = value["retardtype"];
                const train_retard_time = value["retardtime"];
                const train_voie = value["voie"];
                
                var gares_split = train_gares.substr(0, train_gares.length - 1).split("|");
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
                } else {            
                    logo.setAttribute('class', 'train-logo train-logo-sncf');
                }
                
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
            }            
        });
        
        database.child("users").child(user_id).child("gares").child(id).get().then((snapshot) => {
            document.getElementById('infos').innerHTML = snapshot.val().infos.replace('\n', ' &nbsp;');
        });
        scrollX();
    });
}