var params = new URLSearchParams(window.location.search);
var gare_id = params.get('id');
var db;

function setDb(user_id) {
    db = firebase.database().ref("users/"+user_id+"/gares/"+gare_id);
}

function closePanel() {
    window.close();
}

function changeInfos() {
    var new_infos = document.getElementById('infos').value;
    db.update({
        infos: new_infos
    });
}

function loadTrains() {
    gare_id = params.get("id");
    db.get().then((snapshot) => {
        if (snapshot.exists()) {
            document.getElementById('infos').value = snapshot.val().infos;
            db.child("trains").get().then((snapshot) => {
                if (snapshot.exists()) {
                    snapshot.forEach((childsnapshot) => {
                        var dest = childsnapshot.val().destination;
                        var prov = childsnapshot.val().provenance;
                        var id = childsnapshot.val().id;
                        var hourdepart = childsnapshot.val().hourdepart;
                        var hourarrive = childsnapshot.val().hourarrive;
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
                        var provli = document.createElement('li');
                        var btndel = document.createElement('button');
                        var btndelicon = document.createElement('i');
                        var spandel = document.createElement('span');
                        
                        title.appendChild(document.createTextNode(dest));
                        provli.appendChild(document.createTextNode('Provenance : ' + prov));
                        traintypeli.appendChild(document.createTextNode(traintype));
                        hourli.appendChild(document.createTextNode(hourarrive + ' > ' + hourdepart));
                        
                        provli.setAttribute('class', 'meta-list-item');
                        
                        hourli.setAttribute('class', 'meta-list-item separator');
                                                
                        traintypeli.setAttribute('class', 'meta-list-item separator');
                        
                        metalist.setAttribute('class', 'meta-list font-weight-medium');
                        metalist.appendChild(provli);
                        metalist.appendChild(hourli);
                        metalist.appendChild(traintypeli);
                        
                        managmentitemmain.setAttribute('class', 'management-item-main');
                        managmentitemmain.setAttribute('style', 'cursor: pointer;');
                        managmentitemmain.appendChild(title);
                        managmentitemmain.appendChild(metalist);
                        
                        icon.setAttribute('class', 'icons-itinerary-train icons-size-1x25');
                        icon.setAttribute('aria-hidden', 'true');
                        
                        managmentitemsymbol.setAttribute('class', 'management-item-symbol');
                        managmentitemsymbol.appendChild(icon);
                        
                        btnmodify.setAttribute('class', 'btn btn-options dropdown-toggle');
                        btnmodify.setAttribute('type', 'button');
                        btnmodify.setAttribute('title', 'Modifier le retard');
                        btnmodify.setAttribute('onclick', 'prepModifRet('+id+');');
                        btnmodify.setAttribute('data-toggle', 'modal');
                        btnmodify.setAttribute('data-target', '#modif_ret');
                        
                        btnmodifyicon.setAttribute('class', 'icons-clock');
                        btnmodifyicon.setAttribute('aria-hidden', 'true');
                        
                        spanmodify.setAttribute('class', 'sr-only');
                        spanmodify.appendChild(document.createTextNode('Modifier le retard'));
                        
                        btnmodify.appendChild(btnmodifyicon);
                        btnmodify.appendChild(spanmodify);
                        
                        btndel.setAttribute('class', 'btn btn-options dropdown-toggle');
                        btndel.setAttribute('type', 'button');
                        btndel.setAttribute('title', 'Modifier l\'affichage');
                        btndel.setAttribute('onclick', 'prepModifAff('+id+');');
                        btndel.setAttribute('data-toggle', 'modal');
                        btndel.setAttribute('data-target', '#modif_aff');
                        
                        btndelicon.setAttribute('class', 'icons-filters');
                        btndelicon.setAttribute('aria-hidden', 'true');
                        
                        spandel.setAttribute('class', 'sr-only');
                        spandel.appendChild(document.createTextNode('Modifier l\'affichage'));
                        
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
            //window.location.href = "gares.htm";
        }
    }).catch((error) => {
        // alert(error.message);
    });
}

function prepModifRet(tid) {
    db.child("trains").child(tid).get().then((snapshot) => {
        if (snapshot.val().retardtype === 'ret') {
            document.getElementById('ret').checked = true;
        } else if (snapshot.val().retardtype === 'retindet') {
            document.getElementById('retindet').checked = true;
        } else if (snapshot.val().retardtype === 'alheure') {
            document.getElementById('alheure').checked = true;
        } else if (snapshot.val().retardtype === 'supprimé') {
            document.getElementById('suppr').checked = true;
        }

        document.getElementById('modif_ret_time').value = snapshot.val().retardtime;

        document.getElementById('modif_ret_val').setAttribute('onclick', 'modifRet('+tid+');');
    });
}

function modifRet(tid) {
    var rettype;

    if (document.getElementById('ret').checked) {
        rettype = 'ret';
    } else if (document.getElementById('retindet').checked) {
        rettype = 'retindet';
    } else if (document.getElementById('alheure').checked) {
        rettype = 'alheure';
    } else if (document.getElementById('suppr').checked) {
        rettype = 'suppr';
    }

    db.child("trains").child(tid).update({
        retardtype: rettype,
        retardtime: document.getElementById('modif_ret_time').value
    });
}

function prepModifAff(tid) {
    db.child('trains').child(tid).get().then((snapshot) => {
        if (snapshot.val().show === undefined) {
            document.getElementById('modif_aff_train').checked = true;
        } else {
            document.getElementById('modif_aff_train').checked = snapshot.val().show;
        }

        if (snapshot.val().showvoie === undefined) {
            document.getElementById('modif_aff_voie_div').hidden = false;
            document.getElementById('modif_aff_voie').checked = true;
        } else {
            document.getElementById('modif_aff_voie_div').hidden = !snapshot.val().showvoie;
            document.getElementById('modif_aff_voie').checked = snapshot.val().showvoie;
        }

        document.getElementById('modif_aff_voie_voie').value = snapshot.val().voie;

        document.getElementById('modif_aff_val').setAttribute('onclick', 'modifAff('+tid+');');
    });
}

function modifAff(tid) {
    db.child('trains').child(tid).update({
        show: document.getElementById('modif_aff_train').checked,
        showvoie: document.getElementById('modif_aff_voie').checked,
        voie: document.getElementById('modif_aff_voie_voie').value
    });
}