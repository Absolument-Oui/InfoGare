const database = firebase.database().ref();
var uid = undefined;

var gare_id = null;

function loadGares(userid) {
    uid = userid;
    database.child("users").child(userid).child("gares").get().then((snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((childsnapshot) => {
                var name = childsnapshot.val().name;
                var id = childsnapshot.val().id;
                var listgroupitem = document.createElement('li');
                var managmentitemcontent = document.createElement('div');
                var managmentitemsymbol = document.createElement('div');
                var icon = document.createElement('i');
                var managmentitemmain = document.createElement('div');
                var title = document.createElement('h2');
                
                title.appendChild(document.createTextNode(name));
                
                managmentitemmain.setAttribute('class', 'management-item-main');
                managmentitemmain.appendChild(title);
                
                icon.setAttribute('class', 'icons-itinerary-train-station icons-size-1x25');
                icon.setAttribute('aria-hidden', 'true');
                
                managmentitemsymbol.setAttribute('class', 'management-item-symbol');
                managmentitemsymbol.appendChild(icon);
                
                managmentitemcontent.setAttribute('class', 'management-item-content');
                managmentitemcontent.appendChild(managmentitemsymbol);
                managmentitemcontent.appendChild(managmentitemmain);
                
                listgroupitem.setAttribute('class', 'list-group-item management-item');
                listgroupitem.setAttribute('style', 'cursor: pointer;');
                listgroupitem.setAttribute('onclick', 'window.location.href="gare.htm?id='+id+'"');
                listgroupitem.appendChild(managmentitemcontent);
                
                document.getElementById('gares').appendChild(listgroupitem);
            });
            document.getElementById('gares').hidden = false;
        }else{
            document.getElementById('gares_div').appendChild(document.createTextNode('Aucune gare pour le moment ;)'));
        }
    });
}

function createGare(name) {
    var id = Math.round(Math.random() * 1000000000)
    database.child("users").child(uid).child("gares").child(id).set({
        id: id,
        name: name
    }).then((snapshot) => {
        document.getElementById('gare_added').hidden = false;
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
                        
                        title.appendChild(document.createTextNode(dest));
                        traintypeli.appendChild(document.createTextNode(traintype));
                        hourli.appendChild(document.createTextNode(hour));
                        
                        hourli.setAttribute('class', 'meta-list-item');
                                                
                        traintypeli.setAttribute('class', 'meta-list-item separator');
                        
                        metalist.setAttribute('class', 'meta-list font-weight-medium');
                        metalist.appendChild(hourli);
                        metalist.appendChild(traintypeli);
                        
                        managmentitemmain.setAttribute('class', 'management-item-main');
                        managmentitemmain.appendChild(title);
                        managmentitemmain.appendChild(metalist);
                        
                        icon.setAttribute('class', 'icons-itinerary-train icons-size-1x25');
                        icon.setAttribute('aria-hidden', 'true');
                        
                        managmentitemsymbol.setAttribute('class', 'management-item-symbol');
                        managmentitemsymbol.appendChild(icon);
                        
                        btnmodify.setAttribute('class', 'btn btn-options dropdown-toggle');
                        btnmodify.setAttribute('type', 'button');
                        btnmodify.setAttribute('title', 'Modifier la gare');
                        btnmodify.setAttribute('data-toggle', 'dropdown');
                        
                        btnmodifyicon.setAttribute('class', 'icons-pencil');
                        btnmodifyicon.setAttribute('aria-hidden', 'true');
                        
                        spanmodify.setAttribute('class', 'sr-only');
                        spanmodify.appendChild(document.createTextNode('Modifier'));
                        
                        btnmodify.appendChild(btnmodifyicon);
                        btnmodify.appendChild(spanmodify);
                        
                        managmentitemaction.appendChild(btnmodify);
                                                
                        managmentitemaction.setAttribute('class', 'managerment-item-action');
                        
                        
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
        hour: document.getElementById('train_hour').value,
        retardtype: rettype,
        retardtime: document.getElementById('retard_time').value,
        gares: gares,
        voie: document.getElementById('train_voie').value
    }).then((snapshot) => {
        document.getElementById('created').hidden = false;
    });
}

var active_train;

function loadTrainModification(id){
    active_train = id;
    
}