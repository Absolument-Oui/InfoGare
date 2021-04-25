const database = firebase.database().ref();
var uid = undefined;

var gare_id = null;
var id = null;
var openmethod = true;

function loadParams() {
    database.child("users").child(uid).get().then((snapshot) => {
        openmethod = snapshot.val().openmethod;
        if (!openmethod) {
            document.getElementById('showdeparts').setAttribute('onclick', 'window.open("departs.htm'+window.location.search+'");');
        }
    });
}

function prepModifTrain(tid) {
    database.child("users").child(uid).child("gares").child(gare_id).child("trains").child(tid).get().then((snapshot) => {
        document.getElementById('modif_train_number').value = snapshot.val().number;
        document.getElementById('modif_train_dest').value = snapshot.val().destination;
        document.getElementById('modif_train_type').value = snapshot.val().type;
        document.getElementById('modif_train_hour').value = snapshot.val().hour;
        document.getElementById('modif_train_retard_time').value = snapshot.val().retardtime;
        document.getElementById('modif_train_mission').value = snapshot.val().mission;
        if (snapshot.val().retardtype === 'alheure') {
            document.getElementById('modif_train_alheure').checked = true;
        } else if (snapshot.val().retardtype === 'retindet') {
            document.getElementById('modif_train_retindet').checked = true;
        } else if (snapshot.val().retardtype === 'ret') {
            document.getElementById('modif_train_retindet').checked = true;
        } else {
            document.getElementById('modif_train_suppr').checked = true;
        }
        if(snapshot.val().length === 'traincourt') {
            document.getElementById('modiftraincourt').checked = true;
        } else {
            document.getElementById('modiftrainlong').checked = true;
        }
        var gares = snapshot.val().gares;
        gares = gares.substr(0, gares.length - 1).split('|');
        gares.forEach((item, index) => {
            var chips_group = document.createElement('div');
            var option = document.createElement('option');
            var text_span = document.createElement('span');
            var btn_close = document.createElement('button');
            var btn_close_span = document.createElement('span');
            var bnt_close_i = document.createElement('i');
            
            text_span.setAttribute('class', 'chips chips-label');
            text_span.innerText = item;
            
            btn_close_span.setAttribute('class', 'sr-only');
            
            bnt_close_i.setAttribute('class', 'icons-close');
            bnt_close_i.setAttribute('aria-hidden', 'true');
            
            btn_close.setAttribute('class', 'chips chips-btn chips-only-icon');
            btn_close.appendChild(btn_close_span);
            btn_close.appendChild(bnt_close_i);
            
            chips_group.appendChild(text_span);
            chips_group.appendChild(btn_close);
            
            option.value = item;
            option.innerText = item;
            option.selected = true;
            chips_group.setAttribute('class', 'chips-group');
            //document.getElementById('chips').insertBefore(chips_group, document.getElementById('addreceivers2'));
            //document.getElementById('modif_train_gares').appendChild(option);
        });
        
        document.getElementById('validate2').setAttribute('onclick', 'modifTrain('+tid+');');
    });
}

function modifTrain(tid) {
    var retardtype;
    
    if (document.getElementById('modif_train_alheure').checked == true) {
        retardtype = 'alheure';
    } else if (document.getElementById('modif_train_retindet').checked == true) {
        retardtype = 'retindet';
    } else if (document.getElementById('modif_train_ret').checked == true) {
        retardtype = 'ret';
    } else {
        retardtype = 'suppr';
    }
    
    var lng;
    
    if (document.getElementById('modiftrainlong').checked === true) {
        lng = 'trainlong';
    } else {
        lng = 'trainlong';
    }
    
    database.child("users").child(uid).child("gares").child(gare_id).child("trains").child(tid).update({
        number: document.getElementById('modif_train_number').value,
        dest: document.getElementById('modif_train_dest').value,
        hour: document.getElementById('modif_train_hour').value.replace(':', 'h'),
        type: document.getElementById('modif_train_type').value,
        retardtime: document.getElementById('modif_train_retard_time').value,
        mission: document.getElementById('modif_train_mission').value,
        retardtype: retardtype,
        length: lng
    }).then((snapshot) => {
        document.getElementById('modified').hidden = false;
    });
}

function setGare(gid) {
    id = gid;
}

function getGare() {
    return id;
}

function delTrain(tid) {
    database.child("users").child(uid).child("gares").child(gare_id).child("trains").child(tid).remove().then(() => {
        document.getElementById('train_del').hidden = false;
    });
}

function loadGare(userid){
    uid = userid;
    var params = new URLSearchParams(window.location.search);
    gare_id = params.get("id");
    database.child("users").child(uid).child("gares").child(params.get("id")).get().then((snapshot) => {
        if (snapshot.exists()) {
            document.title = 'InfoGares - '+snapshot.val().name;
            database.child("users").child(uid).child("gares").child(params.get("id")).child("trains").get().then((snapshot) => {
                if (snapshot.exists()) {
                    snapshot.forEach((childsnapshot) => {
                        var dest = childsnapshot.val().destination;
                        var id = childsnapshot.val().id;
                        var hour = childsnapshot.val().hour;
                        var traintype = childsnapshot.val().type;
                        var listgroupitem = document.createElement('li');
                        var managmentitemcontent = document.createElement('div');
                        var managmentitemsymbol = document.createElement('div');
                        var icon = document.createElement('i');
                        var managmentitemmain = document.createElement('div');
                        var managmentitemaction = document.createElement('div');
                        var btnmodify = document.createElement('button');
                        var btnmodifyicon = document.createElement('i');
                        var spanmodify = document.createElement('span');
                        var title = document.createElement('h2');
                        var metalist = document.createElement('ul');
                        var traintypeli = document.createElement('li');
                        var hourli = document.createElement('li');
                        var btndel = document.createElement('button');
                        var btndelicon = document.createElement('i');
                        var spandel = document.createElement('span');
                        
                        title.appendChild(document.createTextNode(dest));
                        traintypeli.appendChild(document.createTextNode(traintype));
                        hourli.appendChild(document.createTextNode(hour));
                        
                        hourli.setAttribute('class', 'meta-list-item');
                                                
                        traintypeli.setAttribute('class', 'meta-list-item separator');
                        
                        metalist.setAttribute('class', 'meta-list font-weight-medium');
                        metalist.appendChild(hourli);
                        metalist.appendChild(traintypeli);
                        
                        managmentitemmain.setAttribute('class', 'management-item-main');
                        if (openmethod) {
                            managmentitemmain.setAttribute('onclick', 'window.open("rer.htm?gid='+gare_id+'&tid='+id+'", "", "height=500,width=750");');
                        } else {
                            managmentitemmain.setAttribute('onclick', 'window.open("rer.htm?gid='+gare_id+'&tid='+id+'");');
                        }
                        managmentitemmain.setAttribute('style', 'cursor: pointer;');
                        managmentitemmain.appendChild(title);
                        managmentitemmain.appendChild(metalist);
                        
                        icon.setAttribute('class', 'icons-itinerary-train icons-size-1x25');
                        icon.setAttribute('aria-hidden', 'true');
                        
                        managmentitemsymbol.setAttribute('class', 'management-item-symbol');
                        managmentitemsymbol.appendChild(icon);
                        
                        btnmodify.setAttribute('class', 'btn btn-options dropdown-toggle');
                        btnmodify.setAttribute('type', 'button');
                        btnmodify.setAttribute('title', 'Modifier le train');
                        btnmodify.setAttribute('onclick', 'prepModifTrain('+id+');');
                        btnmodify.setAttribute('data-toggle', 'modal');
                        btnmodify.setAttribute('data-target', '#modif_train');
                        
                        btnmodifyicon.setAttribute('class', 'icons-pencil');
                        btnmodifyicon.setAttribute('aria-hidden', 'true');
                        
                        spanmodify.setAttribute('class', 'sr-only');
                        spanmodify.appendChild(document.createTextNode('Modifier'));
                        
                        btnmodify.appendChild(btnmodifyicon);
                        btnmodify.appendChild(spanmodify);
                        
                        btndel.setAttribute('class', 'btn btn-options dropdown-toggle');
                        btndel.setAttribute('type', 'button');
                        btndel.setAttribute('title', 'Supprimer le train');
                        btndel.setAttribute('onclick', 'document.getElementById("btn_del").setAttribute("onclick", "delTrain(' + id + ');");');
                        btndel.setAttribute('data-toggle', 'modal');
                        btndel.setAttribute('data-target', '#del_train');
                        
                        btndelicon.setAttribute('class', 'icons-circle-delete');
                        btndelicon.setAttribute('aria-hidden', 'true');
                        
                        spandel.setAttribute('class', 'sr-only');
                        spandel.appendChild(document.createTextNode('Supprimer'));
                        
                        btndel.appendChild(btndelicon);
                        btndel.appendChild(spandel);
                                          
                        managmentitemaction.setAttribute('class', 'managerment-item-action');
                        managmentitemaction.appendChild(btnmodify);
                        managmentitemaction.appendChild(btndel);

                        managmentitemcontent.setAttribute('class', 'management-item-content');
                        managmentitemcontent.appendChild(managmentitemsymbol);
                        managmentitemcontent.appendChild(managmentitemmain);
                        managmentitemcontent.appendChild(managmentitemaction);
                        
                        listgroupitem.setAttribute('class', 'list-group-item management-item');
                        listgroupitem.appendChild(managmentitemcontent);
                        
                        document.getElementById('trains').appendChild(listgroupitem);
                    });
                    document.getElementById('trains').hidden = false;
                } else {
                    document.getElementById('trains_div').appendChild(document.createTextNode('Il n\'y a pas de trains ;)'));
                }
            });
        } else {
            window.location.href = "gares.htm";
        }
    }).catch((error) => {
        // alert(error.message);
    });
}

function createTrain() {
    var params = new URLSearchParams(window.location.search);
    gare_id = params.get("id");

    var trainid = Math.round(Math.random() * 1000000000);
    var e = document.getElementById('train_type');
    var rettype = undefined;
    if (document.getElementById('alheure').checked == true) {
        rettype = 'alheure';
    } else if (document.getElementById('retindet').checked == true) {
        rettype = 'retindet';
    } else if (document.getElementById('ret').checked == true) {
        rettype = 'ret';
    } else {
        rettype = 'suppr';
    }
    
    var lng = undefined;
    if (document.getElementById('traincourt').checked == true) {
        lng = 'traincourt';
    } else {
        lng = 'trainlong';
    }
    
    var gares = "";
    
    var x = document.getElementById('gares');
    var i;
    
    for (i = 0; i < x.length; i++) {
        gares = gares + x.options[i].value + "|";
    }
    
    database.child("users").child(uid).child("gares").child(gare_id).child("trains").child(trainid).set({
        id: trainid,
        destination: document.getElementById('train_dest').value,
        number: document.getElementById('train_number').value,
        type: e.options[e.selectedIndex].text,
        hour: document.getElementById('train_hour').value.replace(':', 'h'),
        retardtype: rettype,
        retardtime: document.getElementById('retard_time').value,
        gares: gares,
        mission: document.getElementById('train_mission').value,
        length: lng
    }).then((snapshot) => {
        document.getElementById('created').hidden = false;
    });
}

var active_train;

function loadTrainModification(id){
    active_train = id;
    
}