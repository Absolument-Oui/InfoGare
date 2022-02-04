// GARE
const database = firebase.database().ref();
var uid = undefined;

var gare_id = null;
var id = null;
var openmethod = true;
var autoopenpanel = false;

function setUid(val) {
    uid = val;
}

function loadParams() {
    database.child("users").child(uid).get().then((snapshot) => {
        openmethod = snapshot.val().openmethod;
        autoopenpanel = snapshot.val().autoopenpanel;
        if (!openmethod) {
            if (autoopenpanel) {
                document.getElementById('showdeparts').setAttribute('onclick', 'window.open("departs.htm' + window.location.search + '&panel");');
                document.getElementById('showarrives').setAttribute('onclick', 'window.open("arrives.htm' + window.location.search + '");');
            } else {
                document.getElementById('showdeparts').setAttribute('onclick', 'window.open("departs.htm' + window.location.search + '");');
                document.getElementById('showarrives').setAttribute('onclick', 'window.open("arrives.htm' + window.location.search + '");');
            }
        } else {
            if (autoopenpanel) {
                document.getElementById('showdeparts').setAttribute('onclick', 'window.open("departs.htm' + document.location.search + '&panel", "", "height=500,width=750");');
            }
        }
    });
}

function createGareLink(gid) {
    var glink = "https://link.infogare.fr/?link=https://infogare.fr/gare.htm?uid=" + uid + "%26id=" + gid;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyCWi0EChm97lofJrhqBp6wRRtgQGKq8IEg", false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        longDynamicLink: glink
    }));
    var data = JSON.parse(xhr.responseText);
    var link = data['shortLink'];
    console.log(link);
    database.child('users').child(uid).child('gares').child(gid).update({
        link: link
    }).then(() => {
        document.getElementById('share_link').value = link;
        loadQR(link);
    })
}

function loadGares(userid) {
    uid = userid;
    database.child("users").child(userid).child("gares").get().then((snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((childsnapshot) => {
                var name = childsnapshot.val().name;
                var id = childsnapshot.val().id;
                var trains = childsnapshot.child('trains').numChildren();
                var type = childsnapshot.val().type;
                var link = childsnapshot.val().link;
                var listgroupitem = document.createElement('li');
                var managmentitemcontent = document.createElement('div');
                var managmentitemsymbol = document.createElement('div');
                var icon = document.createElement('i');
                var managmentitemmain = document.createElement('div');
                var title = document.createElement('h2');
                var metalist = document.createElement('ul');
                var id_div = document.createElement('li');
                var trains_div = document.createElement('li');
                var type_div = document.createElement('li');
                var managmentitemaction = document.createElement('div');
                var btn_del = document.createElement('button');
                var btn_del_i = document.createElement('i');
                var btn_del_span = document.createElement('span');
                var btn_modify = document.createElement('button');
                var btn_modify_i = document.createElement('i');
                var btn_modify_span = document.createElement('span');
                var btn_public = document.createElement('button');
                var btn_public_i = document.createElement('i');
                var btn_public_span = document.createElement('span');

                title.appendChild(document.createTextNode(name));
                id_div.appendChild(document.createTextNode('ID : ' + id));
                trains_div.appendChild(document.createTextNode(trains + ' trains'));
                if (type === 'neutral') {
                    type_div.appendChild(document.createTextNode('Gare normale'));
                } else {
                    type_div.appendChild(document.createTextNode('Gare RER'));
                }

                id_div.setAttribute('class', 'meta-list-item');
                trains_div.setAttribute('class', 'meta-list-item separator');
                type_div.setAttribute('class', 'meta-list-item separator separator');

                metalist.setAttribute('class', 'meta-list font-weight-medium');
                metalist.appendChild(id_div);
                metalist.appendChild(trains_div);
                metalist.appendChild(type_div);

                managmentitemmain.setAttribute('class', 'management-item-main');
                managmentitemmain.setAttribute('style', 'cursor: pointer;');
                if (type === 'neutral') {
                    managmentitemmain.setAttribute('onclick', 'window.location.href="gare.htm?id=' + id + '"');
                } else {
                    managmentitemmain.setAttribute('onclick', 'window.location.href="gare_rer.htm?id=' + id + '"');
                }
                managmentitemmain.appendChild(title);
                managmentitemmain.appendChild(metalist);

                icon.setAttribute('class', 'icons-itinerary-train-station icons-size-1x25');
                icon.setAttribute('aria-hidden', 'true');

                managmentitemsymbol.setAttribute('class', 'management-item-symbol');
                managmentitemsymbol.appendChild(icon);

                btn_del_i.setAttribute('class', 'icons-circle-delete');
                btn_del_i.setAttribute('aria-hidden', 'true');

                btn_del_span.setAttribute('class', 'sr-only');
                btn_del_span.appendChild(document.createTextNode('Supprimer'));

                btn_del.setAttribute('class', 'btn btn-options dropdown-toggle');
                btn_del.setAttribute('data-toggle', 'modal');
                btn_del.setAttribute('data-target', '#del');
                btn_del.setAttribute('onclick', 'setGare(' + id + '); document.getElementById("del_gare_name").appendChild(document.createTextNode("' + name + '"));');
                btn_del.setAttribute('title', 'Supprimer la gare');
                btn_del.appendChild(btn_del_i);
                btn_del.appendChild(btn_del_span);

                btn_modify_i.setAttribute('class', 'icons-pencil');
                btn_modify_i.setAttribute('aria-hidden', 'true');

                btn_modify_span.setAttribute('class', 'sr-only');
                btn_modify_span.appendChild(document.createTextNode('Modifier'));

                btn_modify.setAttribute('class', 'btn btn-options dropdown-toggle');
                btn_modify.setAttribute('data-toggle', 'modal')
                btn_modify.setAttribute('data-target', '#modif_gare');
                btn_modify.setAttribute('onclick', 'prepModifGare(' + id + ');');
                btn_modify.setAttribute('title', 'Modifier la gare');
                btn_modify.appendChild(btn_modify_i);
                btn_modify.appendChild(btn_modify_span);

                btn_public_i.setAttribute('class', 'icons-share');
                btn_public_i.setAttribute('aria-hidden', 'true');

                btn_public_span.setAttribute('class', 'sr-only');
                btn_public_span.appendChild(document.createTextNode('Partager'));

                btn_public.setAttribute('class', 'btn btn-options dropdown-toggle');
                btn_public.setAttribute('data-toggle', 'modal');
                btn_public.setAttribute('data-target', '#share');
                btn_public.setAttribute('onclick', 'prepSharing(' + id + ');');
                btn_public.setAttribute('title', 'Partager la gare');
                btn_public.appendChild(btn_public_i);
                btn_public.appendChild(btn_public_span);

                managmentitemaction.setAttribute('class', 'management-item-action');
                managmentitemaction.appendChild(btn_public);
                managmentitemaction.appendChild(btn_modify);
                managmentitemaction.appendChild(btn_del);

                managmentitemcontent.setAttribute('class', 'management-item-content');
                managmentitemcontent.appendChild(managmentitemsymbol);
                managmentitemcontent.appendChild(managmentitemmain);
                managmentitemcontent.appendChild(managmentitemaction);

                listgroupitem.setAttribute('class', 'list-group-item management-item');
                listgroupitem.appendChild(managmentitemcontent);

                document.getElementById('gares').appendChild(listgroupitem);
            });
            document.getElementById('gares').hidden = false;
            document.getElementById('loader').style.display = 'none';
        } else {
            document.getElementById('gares_div').appendChild(document.createTextNode('Aucune gare pour le moment ;)'));
            document.getElementById('loader').style.display = 'none';
        }
    }).catch((error) => {
        setError("Chargement des gares", error.stack);
        document.getElementById('error_loading').hidden = false;
        document.getElementById('loader').style.display = 'none';
    })
}

function prepModifGare(gid) {
    database.child("users").child(uid).child("gares").child(gid).get().then((snapshot) => {
        document.getElementById('modif_gare_name').value = snapshot.val().name;
        document.getElementById('modify_gare_btn').setAttribute('onclick', 'modifyGare(' + snapshot.val().id + ');');
        document.getElementById('modif_gare_infos').value = snapshot.val().infos;
        if (snapshot.val().infostype === 'flash') {
            document.getElementById('modif_gare_infos_type_2').checked = true;
        } else {
            document.getElementById('modif_gare_infos_type_1').checked = true;
        }
        document.getElementById('modify_gare_edit_time_1').value = snapshot.val().timebeforeshow;
        document.getElementById('modify_gare_edit_time_2').value = snapshot.val().timeafterhide;
    }).catch((error) => {
        setError('Préparation de la modification de la gare', error.stack);
        document.getElementById('error_loading').hidden = false;
    })
}

function prepSharing(gid) {
    database.child("users").child(uid).child("gares").child(gid).get().then((snapshot) => {
        document.getElementById('share_public').checked = snapshot.val().public;
        if (snapshot.val().link === undefined) {
            createGareLink(snapshot.val().id);
        } else {
            loadQR(snapshot.val().link);
            document.getElementById('share_link').value = snapshot.val().link;
        }
        document.getElementById('share_validate').setAttribute('onclick', 'modifSharing(' + snapshot.val().id + ');');
    });
}

function modifSharing(gid) {
    database.child("users").child(uid).child("gares").child(gid).update({
        public: document.getElementById('share_public').checked
    });
}

function prepModifTrain(tid) {
    database.child("users").child(uid).child("gares").child(gare_id).child("trains").child(tid).get().then((snapshot) => {
        document.getElementById('train_number').value = snapshot.val().number;
        document.getElementById('train_dest').value = snapshot.val().destination;
        document.getElementById('train_prov').value = snapshot.val().provenance;
        document.getElementById('train_type').value = snapshot.val().type;
        document.getElementById('train_hour_depart').value = snapshot.val().hourdepart;
        document.getElementById('train_hour_arrive').value = snapshot.val().hourarrive;
        document.getElementById('train_retard_time').value = snapshot.val().retardtime;
        document.getElementById('train_dynamic').value = snapshot.val().alternance;
        document.getElementById('train_hall').value = snapshot.val().hall;
        if (snapshot.val().retardtype === 'alheure') {
            document.getElementById('train_alheure').checked = true;
        } else if (snapshot.val().retardtype === 'retindet') {
            document.getElementById('train_retindet').checked = true;
        } else if (snapshot.val().retardtype === 'ret') {
            document.getElementById('train_ret').checked = true;
        } else {
            document.getElementById('train_suppr').checked = true;
        }
        document.getElementById('train_voie').value = snapshot.val().voie;
        var gares = snapshot.val().gares;
        var from = snapshot.val().from;

        document.getElementById('from_modify').value = from;
        document.getElementById('gares_modify').value = gares;

        document.getElementById('from_modify_div').hidden = false;
        document.getElementById('gares_modify_div').hidden = false;
        document.getElementById('chips').hidden = true;
        document.getElementById('chips2').hidden = true;

        if (snapshot.val().alternancetype === 'normal') {
            document.getElementById('train_dynamic_type_2').checked = true;
        } else {
            document.getElementById('train_dynamic_type_1').checked = true;
        }

        if (snapshot.val().compo !== undefined) {

            snapshot.val().compo.forEach((childSnapshot) => {
                var compo_wagon = document.createElement('div');
                compo_wagon.setAttribute('class', 'train-wagons-train-wagon ' + childSnapshot);
                compo_wagon.onclick = () => {
                    document.getElementById('compo_area').removeChild(compo_wagon);
                    writeCompo();
                }
                document.getElementById('compo_area').appendChild(compo_wagon);
                writeCompo();
            });

        }

        var days = snapshot.val().days.split(',');

        days.forEach(element => {
            if (element === '1') {
                document.getElementById('train_days_monday').checked = true;
            } else if (element === '2') {
                document.getElementById('train_days_tuesday').checked = true;
            } else if (element === '3') {
                document.getElementById('train_days_wednesday').checked = true;
            } else if (element === '4') {
                document.getElementById('train_days_thursday').checked = true;
            } else if (element === '5') {
                document.getElementById('train_days_friday').checked = true;
            } else if (element === '6') {
                document.getElementById('train_days_saturday').checked = true;
            } else if (element === '7') {
                document.getElementById('train_days_sunday').checked = true;
            }
        });


        document.getElementById('validate').setAttribute('onclick', 'modifTrain(' + tid + ');');
        document.getElementById('validate').innerText = 'Modifier';

        document.getElementById('loader').style.display = 'none';
    }).catch((error) => {
        setError('Préparation de la modification du train', error.stack);
        document.getElementById('error_loading').hidden = false;
        document.getElementById('loader').style.display = 'none';
    })
}

function modifTrain(tid) {
    var retardtype;

    if (document.getElementById('train_alheure').checked == true) {
        retardtype = 'alheure';
    } else if (document.getElementById('train_retindet').checked == true) {
        retardtype = 'retindet';
    } else if (document.getElementById('train_ret').checked == true) {
        retardtype = 'ret';
    } else {
        retardtype = 'suppr';
    }

    var infodynatype;

    if (document.getElementById('train_dynamic_type_1').checked) {
        infodynatype = 'flashcircu';
    } else {
        infodynatype = 'normal';
    }

    var days = new Array();

    if (document.getElementById('train_days_monday').checked) {
        days.push('1');
    }

    if (document.getElementById('train_days_tuesday').checked) {
        days.push('2');
    }

    if (document.getElementById('train_days_wednesday').checked) {
        days.push('3');
    }

    if (document.getElementById('train_days_thursday').checked) {
        days.push('4');
    }

    if (document.getElementById('train_days_friday').checked) {
        days.push('5');
    }

    if (document.getElementById('train_days_saturday').checked) {
        days.push('6');
    }

    if (document.getElementById('train_days_sunday').checked) {
        days.push('7');
    }

    database.child("users").child(uid).child("gares").child(gare_id).child("trains").child(tid).update({
        number: document.getElementById('train_number').value,
        destination: document.getElementById('train_dest').value,
        provenance: document.getElementById('train_prov').value,
        hourdepart: document.getElementById('train_hour_depart').value.replace(':', 'h'),
        hourarrive: document.getElementById('train_hour_arrive').value.replace(':', 'h'),
        type: document.getElementById('train_type').value,
        retardtime: document.getElementById('train_retard_time').value,
        retardtype: retardtype,
        voie: document.getElementById('train_voie').value,
        gares: document.getElementById('gares_modify').value,
        from: document.getElementById('from_modify').value,
        alternance: document.getElementById('train_dynamic').value,
        hall: document.getElementById('train_hall').value,
        alternancetype: infodynatype,
        compo: compo_list,
        days: days.toString()
    }).then((snapshot) => {
        window.close();
    }).catch((error) => {
        setError('Application des modifications au train', error.stack);
        document.getElementById('error_loading').hidden = false;
    });
}

function modifyGare(gid) {
    var hm;
    if (document.getElementById('gare_rer_edit_hour_1').checked) {
        hm = 'showhour';
    } else {
        hm = 'showremaining';
    }

    var it;
    if (document.getElementById('modif_gare_infos_type_1').checked) {
        it = 'informations'
    } else {
        it = 'flash';
    }

    database.child("users").child(uid).child("gares").child(gid).update({
        name: document.getElementById('modif_gare_name').value,
        infos: document.getElementById('modif_gare_infos').value,
        infostype: it,
        alapproche: document.getElementById('modif_alapproche').value,
        aquai: document.getElementById('modif_aquai').value,
        hourmode: hm,
        timebeforeshow: document.getElementById('modify_gare_edit_time_1').value,
        timeafterhide: document.getElementById('modify_gare_edit_time_2').value
    }).then((snapshot) => {
        document.location.reload();
    }).catch((error) => {
        setError('Application des modifications à la gare', error.stack)
        document.getElementById('error_loading').hidden = false;
        document.getElementById('loader').style.display = 'none';
    })
}

function setGare(gid) {
    id = gid;
    gare_id = gid;
}

function getGare() {
    return id;
}

function delGare(gid) {
    database.child("users").child(uid).child("gares").child(gid).remove().then(() => {
        document.location.reload();
    });
}

function delTrain(tid) {
    database.child("users").child(uid).child("gares").child(gare_id).child("trains").child(tid).remove().then(() => {
        document.location.reload();
    });
}

function createGare(name) {
    var id = Math.round(Math.random() * 1000000000)
    var gare_type = document.getElementById('gare_type').value;
    var hm;
    if (document.getElementById('gare_rer_edit_hour_1').checked) {
        hm = 'showhour';
    } else {
        hm = 'showremaining';
    }
    var it;
    if (document.getElementById('gare_infos_type_1').checked) {
        it = 'informations';
    } else {
        it = 'flash';
    }
    database.child("users").child(uid).child("gares").child(id).set({
        id: id,
        name: name,
        infos: document.getElementById('gare_infos').value,
        infostype: it,
        type: gare_type,
        alapproche: document.getElementById('alapproche').value,
        aquai: document.getElementById('aquai').value,
        hourmode: hm,
        timebeforeshow: document.getElementById('gare_edit_time_1').value,
        timeafterhide: document.getElementById('gare_edit_time_2').value
    }).then((snapshot) => {
        document.location.reload();
    });
}

function loadGare(userid) {
    var params = new URLSearchParams(window.location.search);
    gare_id = params.get("id");
    database.child("users").child(userid).child("gares").child(params.get("id")).get().then((snapshot) => {
        if (snapshot.exists()) {
            document.title = 'InfoGare - ' + snapshot.val().name;
            database.child("users").child(userid).child("gares").child(params.get("id")).child("trains").get().then((snapshot) => {
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
                        var btndupli = document.createElement('button');
                        var btndupliicon = document.createElement('i');
                        var spandupli = document.createElement('span');

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

                        var train_hourarrive = childsnapshot.val().hourarrive;
                        var train_hourdepart = childsnapshot.val().hourdepart;

                        if (train_hourarrive === "") {
                            train_hourarrive = undefined;
                        }

                        if (train_hourdepart === "") {
                            train_hourdepart = undefined;
                        }

                        if (openmethod) {
                            if (userid == uid) {
                                if (train_hourarrive != undefined && train_hourdepart != undefined) {
                                    managmentitemmain.setAttribute('onclick', 'loadChooser(' + gare_id + ', ' + id + ');');
                                } else if (train_hourdepart != undefined) {
                                    managmentitemmain.setAttribute('onclick', 'window.open("train.htm?gid=' + gare_id + '&tid=' + id + '&instance=departures", "", "height=500,width=750");');
                                } else {
                                    managmentitemmain.setAttribute('onclick', 'window.open("train.htm?gid=' + gare_id + '&tid=' + id + '&instance=arrivals", "", "height=500,width=750");');
                                }
                            } else {
                                if (train_hourdepart != undefined && train_hourarrive != undefined) {
                                    managmentitemmain.setAttribute('onclick', 'loadChooser(' + gare_id + ', ' + id + ');');
                                } else if (train_hourdepart != undefined) {
                                    managmentitemmain.setAttribute('onclick', 'window.open("train.htm?uid=' + userid + '&gid=' + gare_id + '&tid=' + id + '&instance=departures", "", "height=500,width=750");');
                                } else {
                                    managmentitemmain.setAttribute('onclick', 'window.open("train.htm?uid=' + userid + '&gid=' + gare_id + '&tid=' + id + '&instance=arrivals", "", "height=500,width=750");');
                                }
                            }
                        } else {
                            if (userid == uid) {
                                if (train_hourarrive != undefined && train_hourdepart != undefined) {
                                    managmentitemmain.setAttribute('onclick', 'loadChooser(' + gare_id + ', ' + id + ');');
                                } else if (train_hourdepart != undefined) {
                                    managmentitemmain.setAttribute('onclick', 'window.open("train.htm?gid=' + gare_id + '&tid=' + id + '&instance=departures");');
                                } else {
                                    managmentitemmain.setAttribute('onclick', 'window.open("train.htm?gid=' + gare_id + '&tid=' + id + '&instance=arrivals");');
                                }
                            } else {
                                if (train_hourdepart != undefined && train_hourarrive != undefined) {
                                    managmentitemmain.setAttribute('onclick', 'loadChooser(' + gare_id + ', ' + id + ');');
                                } else if (train_hourdepart != undefined) {
                                    managmentitemmain.setAttribute('onclick', 'window.open("train.htm?uid=' + userid + '&gid=' + gare_id + '&tid=' + id + '&instance=departures");');
                                } else {
                                    managmentitemmain.setAttribute('onclick', 'window.open("train.htm?uid=' + userid + '&gid=' + gare_id + '&tid=' + id + '&instance=arrivals");');
                                }
                            }
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
                        btnmodify.setAttribute('onclick', 'window.open("modif_train.htm?gid=' + gare_id + '&tid=' + id + '&action=modify", "", "height=500,width=750");');
                        btnmodify.setAttribute('data-toggle', 'modal');
                        btnmodify.setAttribute('data-target', '#train');

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

                        btndupli.setAttribute('class', 'btn btn-options dropdown-toggle');
                        btndupli.setAttribute('type', 'button');
                        btndupli.setAttribute('title', 'Dupliquer le train');
                        btndupli.setAttribute('onclick', 'window.open("modif_train.htm?gid=' + gare_id + '&tid=' + id + '&action=duplicate", "", "height=500,width=750");');
                        btndupli.setAttribute('data-toggle', 'modal');
                        btndupli.setAttribute('data-target', '#train');

                        btndupliicon.setAttribute('class', 'icons-distribution');
                        btndupliicon.setAttribute('aria-hidden', 'true');

                        spandupli.setAttribute('class', 'sr-only');
                        spandupli.appendChild(document.createTextNode('Dupliquer'));

                        btndupli.appendChild(btndupliicon);
                        btndupli.appendChild(spandupli);

                        managmentitemaction.setAttribute('class', 'managerment-item-action');
                        managmentitemaction.appendChild(btnmodify);
                        managmentitemaction.appendChild(btndupli);
                        managmentitemaction.appendChild(btndel);

                        managmentitemcontent.setAttribute('class', 'management-item-content');
                        managmentitemcontent.appendChild(managmentitemsymbol);
                        managmentitemcontent.appendChild(managmentitemmain);
                        if (userid == uid) {
                            managmentitemcontent.appendChild(managmentitemaction);
                        }

                        listgroupitem.setAttribute('class', 'list-group-item management-item');
                        listgroupitem.appendChild(managmentitemcontent);

                        document.getElementById('trains').appendChild(listgroupitem);
                    });
                    document.getElementById('trains').hidden = false;
                    document.getElementById('loader').style.display = 'none';
                } else {
                    document.getElementById('trains_div').appendChild(document.createTextNode('Il n\'y a pas de trains ;)'));
                    document.getElementById('loader').style.display = 'none';
                }
            });
        } else {
            //window.location.href = "gares.htm";
        }
    }).catch((error) => {
        setError('Chargement de la gare', error.stack);
        document.getElementById('error_loading').hidden = false;
        document.getElementById('loader').style.display = 'none';
    });
}

function loadChooser(gid, tid) {
    if (openmethod) {
        document.getElementById('departure_btn').setAttribute('onclick', 'window.open("train.htm?gid=' + gid + '&tid=' + tid + '&instance=departures", "", "height=500,width=750");');
        document.getElementById('arrival_btn').setAttribute('onclick', 'window.open("train.htm?gid=' + gid + '&tid=' + tid + '&instance=arrivals", "", "height=500,width=750");');
    } else {
        document.getElementById('departure_btn').setAttribute('onclick', 'window.open("train.htm?gid=' + gid + '&tid=' + tid + '&instance=departures");');
        document.getElementById('arrival_btn').setAttribute('onclick', 'window.open("train.htm?gid=' + gid + '&tid=' + tid + '&instance=arrivals");');
    }
    $('#choose_instance').modal('show');
}

function prepDupliTrain(tid) {
    database.child('users').child(uid).child('gares').child(gare_id).child('trains').child(tid).get().then((snapshot) => {
        document.getElementById('train_number').value = snapshot.val().number;
        document.getElementById('train_prov').value = snapshot.val().provenance;
        document.getElementById('train_dest').value = snapshot.val().destination;
        document.getElementById('train_type').value = snapshot.val().type;
        document.getElementById('train_hour_arrive').value = snapshot.val().hourarrive.replace('h', ':');
        document.getElementById('train_hour_depart').value = snapshot.val().hourdepart.replace('h', ':');
        if (snapshot.val().retardtype === 'ret') {
            document.getElementById('train_ret').checked = true;
        } else if (snapshot.val().retardtype === 'alheure') {
            document.getElementById('train_alheure').checked = true;
        } else if (snapshot.val().retardtype === 'retindet') {
            document.getElementById('train_retindet').checked = true;
        } else if (snapshot.val().retardtype === 'suppr') {
            document.getElementById('train_suppr').checked == true;
        }
        document.getElementById('train_retard_time').value = snapshot.val().retardtime;
        document.getElementById('train_voie').value = snapshot.val().voie;
        document.getElementById('from_modify').value = snapshot.val().from;
        document.getElementById('gares_modify').value = snapshot.val().gares;
        document.getElementById('train_dynamic').value = snapshot.val().alternance;
        document.getElementById('train_hall').value = snapshot.val().hall;
        document.getElementById('from_modify_div').hidden = false;
        document.getElementById('gares_modify_div').hidden = false;
        document.getElementById('chips').hidden = true;
        document.getElementById('chips2').hidden = true;
        document.getElementById('train_hall').value = snapshot.val().hall;
        if (snapshot.val().alternancetype === 'normal') {
            document.getElementById('train_dynamic_type_2').checked = true;
        } else {
            document.getElementById('train_dynamic_type_1').checked = true;
        }

        document.getElementById('validate').setAttribute('onclick', 'dupliTrain()');
        document.getElementById('validate').innerText = 'Dupliquer';

        document.getElementById('loader').style.display = 'none';
    }).catch((error) => {
        setError('Préparation de la duplication du train', error.stack);
        document.getElementById('error_loading').hidden = false;
    })
}

function dupliTrain() {
    var trainid = Math.round(Math.random() * 1000000000);

    var rtype = undefined;

    if (document.getElementById('train_alheure').checked) {
        rtype = 'alheure';
    } else if (document.getElementById('train_retindet').checked) {
        rtype = 'retindet';
    } else if (document.getElementById('train_ret').checked) {
        rtype = 'ret';
    } else if (document.getElementById('train_suppr').checked) {
        rtype = 'suppr';
    }

    var infodynatype;

    if (document.getElementById('train_dynamic_type_1').checked) {
        infodynatype = 'flash';
    } else {
        infodynatype = 'normal';
    }

    database.child('users').child(uid).child('gares').child(gare_id).child('trains').child(trainid).set({
        id: trainid,
        number: document.getElementById('train_number').value,
        provenance: document.getElementById('train_prov').value,
        destination: document.getElementById('train_dest').value,
        type: document.getElementById('train_type').value,
        retardtype: rtype,
        retardtime: document.getElementById('train_retard_time').value,
        voie: document.getElementById('train_voie').value,
        from: document.getElementById('train_gares_prov').value,
        gares: document.getElementById('train_gares_dest').value,
        hourdepart: document.getElementById('train_hour_depart').value,
        hourarrive: document.getElementById('train_hour_arrive').value,
        alternance: document.getElementById('train_alternance').value,
        hall: document.getElementById('train_hall').value,
        alternancetype: infodynatype
    }).then(() => {
        window.location.reload();
    }).catch((error) => {
        setError('Duplication du train', error.stack);
        document.getElementById('error_loading').hidden = false;
    })
}

function createTrain() {
    var params = new URLSearchParams(window.location.search);
    gare_id = params.get("id");

    var trainid = Math.round(Math.random() * 1000000000);
    var e = document.getElementById('train_type');
    var rettype = undefined;
    if (document.getElementById('train_alheure').checked == true) {
        rettype = 'alheure';
    } else if (document.getElementById('train_retindet').checked == true) {
        rettype = 'retindet';
    } else if (document.getElementById('train_ret').checked == true) {
        rettype = 'ret';
    } else {
        rettype = 'suppr';
    }
    var gares = "";
    var from = "";

    var infodynatype;
    if (document.getElementById('train_dynamic_type').checked) {
        infodynatype = 'flash';
    } else {
        infodynatype = 'normal';
    }

    var x = document.getElementById('gares');
    var y = document.getElementById('from');
    var i, j;

    for (i = 0; i < x.length; i++) {
        gares = gares + x.options[i].value + "|";
    }

    for (j = 0; j < y.length; j++) {
        from = from + y.options[j].value + "|";
    }

    var days = new Array(7);

    if (document.getElementById('train_days_monday').checked) {
        days.push('1');
    }

    if (document.getElementById('train_days_tuesday').checked) {
        days.push('2');
    }

    if (document.getElementById('train_days_wednesday').checked) {
        days.push('3');
    }

    if (document.getElementById('train_days_thursday').checked) {
        days.push('4');
    }

    if (document.getElementById('train_days_friday').checked) {
        days.push('5');
    }

    if (document.getElementById('train_days_saturday').checked) {
        days.push('6');
    }

    if (document.getElementById('train_days_sunday').checked) {
        days.push('7');
    }

    // Verification

    if (document.getElementById('train_dest').value === "" && document.getElementById('train_prov').value === "") {
        alert('Vous devez entrer une provenance/destination !');
        return false;
    }

    if (document.getElementById('train_number').value === "") {
        alert('Vous devez entrer un numéro de train !');
        return false;
    }

    if (document.getElementById('train_hour_depart').value === "" && document.getElementById('train_hour_arrive').value === "") {
        alert('Vous devez entrer une heure de départ/d\'arrivée !');
        return false;
    }

    if (document.getElementById('train_ret').checked === true && document.getElementById('train_retard_time').value === 0) {
        alert('Vous devez entrer un temps de retard !');
        return false;
    }

    database.child("users").child(uid).child("gares").child(gare_id).child("trains").child(trainid).set({
        id: trainid,
        destination: document.getElementById('train_dest').value,
        provenance: document.getElementById('train_prov').value,
        number: document.getElementById('train_number').value,
        type: e.options[e.selectedIndex].text,
        hourdepart: document.getElementById('train_hour_depart').value.replace(':', 'h'),
        hourarrive: document.getElementById('train_hour_arrive').value.replace(':', 'h'),
        retardtype: rettype,
        retardtime: document.getElementById('train_retard_time').value,
        from: from,
        gares: gares,
        voie: document.getElementById('train_voie').value,
        alternance: document.getElementById('train_dynamic').value,
        hall: document.getElementById('train_hall').value,
        alternancetype: infodynatype,
        compo: compo_list,
        days: days.toString()
    }).then((snapshot) => {
        document.location.reload();
    }).catch((error) => {
        setError('Création du train', error.stack);
        document.getElementById('error_loading').hidden = false;
    })
}

var active_train;

function loadTrainModification(id) {
    active_train = id;

}

function checkGare(state) {
    document.getElementById('gare_rer_edit').hidden = state;
    document.getElementById('gare_edit').hidden = !state;
}


// ACCES QUAI
function loadQuais(userid, pairId, gid) {
    var quais = new Array();
    var quai1pos, quai2pos, quai1, quai2;
    database.child(userid).child('gares').child(gid).child('quais').child(pairId).get().then((snapshot) => {
        quai1pos = snapshot.val().quai1pos;
        quai2pos = snapshot.val().quai2pos;

        quai1 = snapshot.val().quai1;
        quai2 = snapshot.val().quai2;
    })
    database.child(userid).child('gares').child(gid).child('trains').get().then((snapshot) => {
        snapshot.forEach((child) => {
            if (child.val().pairid === pairId) {
                quais.push({
                    id: child.key,
                    number: child.val().number,
                    destination: child.val().destination,
                    hour: child.val().hourdepart,
                    retard: child.val().ret,
                    type: child.val().type,
                    voie: child.val().voie
                });

                quais.sort((a, b) => {
                    var x = a.hourdepart.toLowerCase();
                    var y = b.hourdepart.toLowerCase();
                    if (x < y) { return -1; }
                    if (x > y) { return 1; }
                    return 0;
                });

                quais.forEach((value, index, array) => {
                    if (value['voie'] === quai1) {
                        var row = document.createElement('div');
                        var col_first = document.createElement('div');
                        var col_second_first = document.createElement('div');
                        var train_logo = document.createElement('div');
                        var text_number = document.createElement('span');
                        var col_second_second = document.createElement('div');
                    }
                });
            }
        });
    });
}


// APPAREANCE
// Moved to appareance.js


// ARRIVES
var list = new Array();

function loadArrives(user_id, id) {
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
                    voie: child.val().voie,
                    alternance: child.val().alternance,
                    hall: child.val().hall
                });
            }
        });
        list.sort((a, b) => {
            var x = a.hourarrive.toLowerCase();
            var y = b.hourarrive.toLowerCase();
            if (x < y) { return -1; }
            if (x > y) { return 1; }
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
                var col_hide = document.createElement('div');

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

                //Col Hide
                var col_hide_inner = document.createElement('div');
                var alternance = document.createElement('div');

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
                const train_alternance = value["alternance"];
                const train_hall = value["hall"];

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
                    retard = 'retard ' + train_retard_time + ' min.';
                    textfeature = 3;
                } else {
                    retard = 'supprimé';
                    textfeature = 3;
                }

                col_hide.setAttribute('class', 'col-hide');

                if (train_alternance === "") {

                } else if (train_alternance === undefined) {

                } else {
                    alternance.setAttribute('class', 'train-information-dynamic train-information-dynamic-yellow animation-dynamic');
                    alternance.innerText = train_alternance;

                    col_hide_inner.setAttribute('class', 'col-hide-inner');
                    col_hide_inner.appendChild(alternance);

                    col_hide.appendChild(col_hide_inner);
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

                firstcol_firstrow.setAttribute('class', 'col-first');
                firstcol_firstrow.appendChild(logo);

                animationblink.setAttribute('class', 'animation-blink');
                animationblink1.setAttribute('class', 'animation-blink-1');
                type.setAttribute('class', 'text-type');
                if (train_type === 'SNCF (logo 1985)') {
                    type.appendChild(document.createTextNode('Train SNCF'));
                } else if (train_type === 'SNCF (logo 1992)') {
                    type.appendChild(document.createTextNode('Train SNCF'));
                } else if (train_type === 'SNCF (carmillon)') {
                    type.appendChild(document.createTextNode('Train SNCF'));
                } else {
                    type.appendChild(document.createTextNode(train_type));
                }
                number.setAttribute('class', 'text-number');
                number.appendChild(document.createTextNode(train_number));
                animationblink2.setAttribute('class', 'animation-blink-2 text-features-' + textfeature);
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

                if (value['hall'] === undefined) {
                    voie.appendChild(document.createTextNode(train_voie));

                    track.appendChild(voie);
                    track.setAttribute('class', 'train-track train-track-view voie');

                    if (value['showvoie']) {
                        thirdcol_firstrow.appendChild(track);
                    }

                    thirdcol_firstrow.setAttribute('class', 'col-third');
                } else if (value['hall'] === "") {
                    voie.appendChild(document.createTextNode(train_voie));

                    track.appendChild(voie);
                    track.setAttribute('class', 'train-track train-track-view voie');

                    if (value['showvoie']) {
                        thirdcol_firstrow.appendChild(track);
                    }

                    thirdcol_firstrow.setAttribute('class', 'col-third');
                } else {
                    var anim1 = document.createElement('div');
                    var anim2 = document.createElement('div');

                    anim1.setAttribute('class', 'animation-blink-1');

                    anim2.setAttribute('class', 'animation-blink-2');


                    var hall = document.createElement('div');
                    var hall_1 = document.createElement('small');
                    var hall_2 = document.createElement('h1');
                    var br = document.createElement('br');
                    var br1 = document.createElement('br');

                    hall.setAttribute('class', 'train-track train-track-h animation-blink-2');
                    hall_1.appendChild(document.createTextNode('hall'));
                    hall_2.appendChild(document.createTextNode(train_hall));

                    hall.appendChild(hall_1);
                    hall.appendChild(br);
                    hall.appendChild(br1);
                    hall.appendChild(hall_2);

                    voie.appendChild(document.createTextNode(train_voie));

                    track.appendChild(voie);
                    track.setAttribute('class', 'train-track train-track-view voie animation-blink-1');

                    if (value['showvoie']) {
                        thirdcol_firstrow.appendChild(track);
                        thirdcol_firstrow.appendChild(hall);
                    }

                    thirdcol_firstrow.setAttribute('class', 'col-third animation-blink');
                }

                firstrow.appendChild(firstcol_firstrow);
                firstrow.appendChild(secondfirstcol_firstrow);
                firstrow.appendChild(secondsecondcol_firstrow);
                firstrow.appendChild(secondthirdcol_firstrow);
                firstrow.appendChild(col_hide);
                firstrow.appendChild(thirdcol_firstrow);

                if (i < 2) {
                    firstcol_secondrow.setAttribute('class', 'col-first');

                    if (train_gares.length < 30) {
                        gares.setAttribute('class', 'train-stations text-scroll-x');
                        gares.setAttribute('style', 'padding-left: 0%;');
                    } else {
                        gares.setAttribute('class', 'train-stations text-scroll-x scroll-x animation-scroll-x');
                        gares.setAttribute('style', 'animation-duration: ' + animation_time + 's; padding-left: 100%;');
                    }
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
                if (i < 2) {
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
            if (snapshot.val().infos.length > 35) {
                document.getElementById('infos').setAttribute('class', 'bar-informations');
            }

            document.getElementById('infos').innerHTML = snapshot.val().infos.replace('\n', ' &nbsp;');

            document.getElementById('bg').hidden = false;
            document.getElementById('loader').style.display = 'none';

            scrollX();
            clock();
        });
    }).catch((error) => {
        setError("Chargement des arrivés", error.stack);
        document.getElementById('error_loading').hidden = false;
        document.getElementById('loader').style.display = 'none';
    })
}


// DEPARTS RER
var list = new Array();

var uid;

function loadTrainsRer(user_id, id) {
    uid = user_id;
    var ref = database.child("users").child(user_id).child("gares").child(id).child("trains");
    ref.get().then((snapshot) => {
        snapshot.forEach((child) => {
            if (child.val().hourdepart != "") {
                list.push({
                    number: child.val().number,
                    destination: child.val().destination,
                    hourdepart: child.val().hourdepart,
                    type: child.val().type,
                    gares: child.val().gares,
                    retardtime: child.val().retardtime,
                    retardtype: child.val().retardtype,
                    mission: child.val().mission,
                    length: child.val().length,
                    hourmode: child.val().hourmode
                });
            }
        });
        list.sort((a, b) => {
            var x = a.hourdepart.toLowerCase();
            var y = b.hourdepart.toLowerCase();
            if (x < y) { return -1; }
            if (x > y) { return 1; }
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
                const train_destination = value["destination"];
                const train_number = value["number"];
                const train_type = value["type"];
                const train_gares = value["gares"];
                const train_retard_type = value["retardtype"];
                const train_retard_time = value["retardtime"];
                const train_mission = value["mission"];
                const train_length = value["length"];
                const train_hour = value["hourdepart"];
                const train_hour_mode = value["hourmode"];

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
                    retard = 'retard ' + train_retard_time + ' min.';
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

                if (train_type === 'RER A') {
                    logo.setAttribute('class', 'train-logo train-logo-rer-a');
                } else if (train_type === 'RER B') {
                    logo.setAttribute('class', 'train-logo train-logo-rer-b');
                } else if (train_type === 'RER C') {
                    logo.setAttribute('class', 'train-logo train-logo-rer-c');
                } else if (train_type === 'RER D') {
                    logo.setAttribute('class', 'train-logo train-logo-rer-d');
                } else if (train_type === 'RER E') {
                    logo.setAttribute('class', 'train-logo train-logo-rer-e');
                } else {
                    logo.setAttribute('class', 'train-logo train-logo-sncf');
                }

                firstcol_firstrow.setAttribute('class', 'col-first');
                firstcol_firstrow.appendChild(logo);

                animationblink.setAttribute('class', 'animation-blink');
                animationblink1.setAttribute('class', 'animation-blink-1');
                type.setAttribute('class', 'text-type');
                type.appendChild(document.createTextNode(train_mission));
                number.setAttribute('class', 'text-number');
                number.appendChild(document.createTextNode(train_number));
                animationblink2.setAttribute('class', 'animation-blink-2 text-features-' + textfeature);
                animationblink2.appendChild(document.createTextNode(retard));
                animationblink1.appendChild(type);
                animationblink1.appendChild(br);
                animationblink1.appendChild(number);
                animationblink.appendChild(animationblink1);
                animationblink.appendChild(animationblink2);

                secondfirstcol_firstrow.appendChild(animationblink);
                secondfirstcol_firstrow.setAttribute('class', 'col-second-first');

                secondsecondcol_firstrow.setAttribute('class', 'col-second-second animation-blink');

                if (train_hour_mode === 'Heure') {
                    secondsecondcol_firstrow.setAttribute('class', 'col-second-second text-time');
                    secondsecondcol_firstrow.appendChild(document.createTextNode(train_hour));
                } else {
                    var second_animationblink1 = document.createElement('div');
                    var second_animationblink2 = document.createElement('div');

                    second_animationblink1.setAttribute('class', 'rer-hour-mode animation-blink-1');
                    if (train_hour_mode === 'A quai') {
                        second_animationblink1.appendChild(document.createTextNode('à quai'));
                    } else {
                        second_animationblink1.appendChild(document.createTextNode('à l\'approche'));
                    }

                    second_animationblink2.setAttribute('class', 'text-time animation-blink-2');
                    second_animationblink2.appendChild(document.createTextNode(train_hour.replace(':', 'h')));

                    secondsecondcol_firstrow.appendChild(second_animationblink1);
                    secondsecondcol_firstrow.appendChild(second_animationblink2);
                }


                dest.appendChild(document.createTextNode(train_destination));
                dest.setAttribute('class', '');

                secondthirdcol_firstrow.appendChild(dest);
                secondthirdcol_firstrow.setAttribute('class', 'col-second-third');

                if (train_length === 'trainlong') {
                    track.setAttribute('class', 'rer train-lng train-long');
                } else {
                    track.setAttribute('class', 'rer train-lng train-court');
                }

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
                    gares.setAttribute('style', 'animation-duration: ' + animation_time + 's; padding-left: 100%;');
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
                if (i < 2) {
                    rowgroup.setAttribute('class', 'row-group row-train row-group-2');
                } else {
                    rowgroup.setAttribute('class', 'row-group row-train');
                }
                rowgroup.appendChild(firstrow);
                if (i < 2) {
                    rowgroup.appendChild(secondrow);
                }

                var now = new Date();
                var date_to_add = value["hourdepart"].split(':');
                var depart_date = new Date(now.getFullYear, now.getMonth, now.getDay, date_to_add[0], date_to_add[1], 0, 0);

                rowgroup.setAttribute('data-time', '');

                document.getElementById('rows').appendChild(rowgroup);

                i++;
            }
        });

        database.child("users").child(user_id).child("gares").child(id).get().then((snapshot) => {
            if (snapshot.val().infos.length > 35) {
                document.getElementById('infos').setAttribute('class', 'bar-informations');
            }

            document.getElementById('infos').innerHTML = snapshot.val().infos.replace('\n', ' &nbsp;');

            document.getElementById('bg').hidden = false;
            document.getElementById('loader').style.display = 'none';

            scrollX();
            getInfos(id);
            clock();
        });
    }).catch((error) => {
        setError("Chargement des départs RER", error.stack);
        document.getElementById('error_loading').hidden = false;
        document.getElementById('loader').style.display = 'none';

        console.error(error);
    });
}

var nowhour, nowminutes, trainhour, trainminutes;
var alapproche, aquai;

function getInfos(gid) {
    database.child("users").child(uid).child("gares").child(gid).get().then((snapshot) => {
        database.child("users").child(uid).child("gares").child(gid).child("trains").get().then((snapshot) => {
            snapshot.forEach((child) => {
                nowhour = new Date().getHours();
                nowminutes = new Date().getMinutes();

                trainhour = child.val().hourdepart.substr(0, 2);
                trainminutes = child.val().hourdepart.substr(3, 5);

                console.info(nowhour + ' : ' + nowminutes + ' > ' + trainhour + ' : ' + trainminutes);
            });
        });
        alapproche = snapshot.val().alapproche;
        aquai = snapshot.val().aquai;
    });
}


// DEPARTS
var list = new Array();
var time_before_show = 0;
var time_after_hide = 0;

function loadTrains(user_id, id) {

    database.child('users').child(user_id).child('gares').child(id).get().then((snapshot) => {
        time_before_show = snapshot.val().timebeforeshow;
        time_after_hide = snapshot.val().timeafterhide;
    });

    var group = document.createElement('div');
    group.setAttribute('id', 'group');
    var ref = firebase.database().ref("users/" + user_id + "/gares/" + id + "/trains");
    var infos = firebase.database().ref("users/" + user_id + "/gares/" + id);

    infos.on('child_changed', (snapshot) => {
        var txt = snapshot.val();
        document.getElementById('infos').innerHTML = txt.replaceAll('\n', ' &nbsp;');
    });

    ref.on('child_changed', (snapshot) => {
        location.href = "departs.htm?id=" + id;
    });

    ref.get().then((snapshot) => {
        snapshot.forEach((child) => {
            if (child.val().hourdepart != "") {
                var showed;
                if (child.val().show === undefined) {
                    showed = true;
                } else {
                    showed = child.val().show;
                }

                var voieshowed;

                if (child.val().showvoie === undefined) {
                    voieshowed = true;
                } else {
                    voieshowed = child.val().showvoie;
                }

                list.push({
                    number: child.val().number,
                    destination: child.val().destination,
                    hourdepart: child.val().hourdepart,
                    type: child.val().type,
                    gares: child.val().gares,
                    retardtime: child.val().retardtime,
                    retardtype: child.val().retardtype,
                    voie: child.val().voie,
                    show: showed,
                    showvoie: voieshowed,
                    alternance: child.val().alternance,
                    hall: child.val().hall,
                    alternancetype: child.val().alternancetype,
                    days: child.val().days
                });
            }
        });
        list.sort((a, b) => {
            var x = a.hourdepart.toLowerCase();
            var y = b.hourdepart.toLowerCase();
            if (x < y) { return -1; }
            if (x > y) { return 1; }
            return 0;
        });
        var i = 0;
        list.forEach((value, index, array) => {
            if (i != 7) {
                if (value["show"]) {
                    // Root
                    var firstrow = document.createElement('div');
                    var secondrow = document.createElement('div');

                    // First Row
                    var firstcol_firstrow = document.createElement('div');
                    var secondfirstcol_firstrow = document.createElement('div');
                    var secondsecondcol_firstrow = document.createElement('div');
                    var secondthirdcol_firstrow = document.createElement('div');
                    var thirdcol_firstrow = document.createElement('div');
                    var col_hide = document.createElement('div');

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

                    // Col Hide
                    var col_hide_inner = document.createElement('div');
                    var alternance = document.createElement('div');

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
                    const train_destination = value["destination"];
                    const train_hour = value["hourdepart"];
                    const train_number = value["number"];
                    const train_type = value["type"];
                    const train_gares = value["gares"];
                    const train_retard_type = value["retardtype"];
                    const train_retard_time = value["retardtime"];
                    const train_voie = value["voie"];
                    const train_alternance = value["alternance"];
                    const train_hall = value["hall"];
                    const alternance_type = value["alternancetype"];
                    const days = value["days"];

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
                        retard = 'retard ' + train_retard_time + ' min.';
                        textfeature = 3;
                    } else {
                        retard = 'supprimé';
                        textfeature = 3;
                    }

                    col_hide.setAttribute('class', 'col-hide');

                    if (train_alternance === "") {

                    } else if (train_alternance === undefined) {

                    } else {
                        alternance.setAttribute('class', 'train-information-dynamic train-information-dynamic-yellow animation-dynamic');
                        alternance.innerText = train_alternance;

                        col_hide_inner.setAttribute('class', 'col-hide-inner');
                        col_hide_inner.appendChild(alternance);

                        col_hide.appendChild(col_hide_inner);
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
                    } else if (train_type === 'TER Occitanie') {
                        logo.setAttribute('class', 'train-logo train-logo-occitanie');
                    } else if (train_type === 'Intercité') {
                        logo.setAttribute('class', 'train-logo train-logo-intercite');
                    } else if (train_type === 'Aléop') {
                        logo.setAttribute('class', 'train-logo train-logo-aleop');
                    } else if (train_type === 'TER Auvergne Rhône Alpes') {
                        logo.setAttribute('class', 'train-logo train-logo-auvergne-rhone-alpes');
                    } else if (train_type === 'BreizhGo') {
                        logo.setAttribute('class', 'train-logo train-logo-breizhgo');
                    } else if (train_type === 'DB') {
                        logo.setAttribute('class', 'train-logo train-logo-db');
                    } else if (train_type === 'TER Hauts de France') {
                        logo.setAttribute('class', 'train-logo train-logo-hauts-de-france');
                    } else if (train_type === 'Lio') {
                        logo.setAttribute('class', 'train-logo train-logo-lio');
                    } else if (train_type === 'TER Languedoc Roussillon') {
                        logo.setAttribute('class', 'train-logo train-logo-ter-languedoc-roussillon');
                    } else if (train_type === 'Mobigo') {
                        logo.setAttribute('class', 'train-logo train-logo-mobigo');
                    } else if (train_type === 'Nomad') {
                        logo.setAttribute('class', 'train-logo train-logo-nomad');
                    } else if (train_type === 'TER Metrolor') {
                        logo.setAttribute('class', 'train-logo train-logo-ter-metrolor');
                    } else if (train_type === 'TER Midi Pyrénées') {
                        logo.setAttribute('class', 'train-logo train-logo-ter-midi-pyrenees');
                    } else if (train_type === 'Rémi') {
                        logo.setAttribute('class', 'train-logo train-logo-remi');
                    } else if (train_type === 'Renfe Ave') {
                        logo.setAttribute('class', 'train-logo train-logo-renfe-ave');
                    } else if (train_type === 'SBB') {
                        logo.setAttribute('class', 'train-logo train-logo-sbb');
                    } else if (train_type === 'SNCF (logo 1985)') {
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

                    firstcol_firstrow.setAttribute('class', 'col-first');
                    firstcol_firstrow.appendChild(logo);

                    animationblink.setAttribute('class', 'animation-blink');
                    animationblink1.setAttribute('class', 'animation-blink-1');
                    type.setAttribute('class', 'text-type');
                    if (train_type === 'SNCF (logo 1985)') {
                        type.appendChild(document.createTextNode('Train SNCF'));
                    } else if (train_type === 'SNCF (logo 1992)') {
                        type.appendChild(document.createTextNode('Train SNCF'));
                    } else if (train_type === 'SNCF (carmillon)') {
                        type.appendChild(document.createTextNode('Train SNCF'));
                    } else {
                        type.appendChild(document.createTextNode(train_type));
                    }
                    number.setAttribute('class', 'text-number');
                    number.appendChild(document.createTextNode(train_number));
                    animationblink2.setAttribute('class', 'animation-blink-2 text-features-' + textfeature);
                    animationblink2.appendChild(document.createTextNode(retard));
                    animationblink1.appendChild(type);
                    animationblink1.appendChild(br);
                    animationblink1.appendChild(number);
                    animationblink.appendChild(animationblink1);
                    animationblink.appendChild(animationblink2);

                    secondfirstcol_firstrow.appendChild(animationblink);
                    secondfirstcol_firstrow.setAttribute('class', 'col-second-first');

                    if (train_retard_type === 'alheure') {
                        secondsecondcol_firstrow.appendChild(document.createTextNode(train_hour.replace(':', 'h')));
                        secondsecondcol_firstrow.setAttribute('class', 'col-second-second text-time');
                    } else {
                        secondsecondcol_firstrow.setAttribute('class', 'col-second-second text-time-retard animation-blink');
                        var hour = Math.floor(train_hour.substr(0, 2));
                        var minutes = Math.floor(train_hour.substr(3, 4));
                        var retard = Math.floor(train_retard_time);
                        var hourandret = Math.floor(minutes + retard);

                        if (hourandret > 59) {
                            var quotient = Math.floor(hourandret / 60);
                            var rest = hourandret % 60;
                            hour += quotient;
                            hourandret = rest;
                        }

                        if (hourandret < 10) {
                            hourandret = '0' + hourandret;
                        }

                        var second_animationblink1 = document.createElement('div');
                        var second_animationblink2 = document.createElement('div');

                        second_animationblink2.setAttribute('class', 'text-time retard animation-blink-2');
                        second_animationblink2.appendChild(document.createTextNode(hour + "h" + hourandret));

                        second_animationblink1.setAttribute('class', 'text-time animation-blink-1');
                        second_animationblink1.appendChild(document.createTextNode(train_hour.replace(':', 'h')));

                        secondsecondcol_firstrow.appendChild(second_animationblink2);
                        secondsecondcol_firstrow.appendChild(second_animationblink1);
                    }

                    dest.appendChild(document.createTextNode(train_destination));
                    dest.setAttribute('class', '');

                    secondthirdcol_firstrow.appendChild(dest);
                    secondthirdcol_firstrow.setAttribute('class', 'col-second-third');


                    if (train_type === 'Car TER') {
                        voie.setAttribute('class', 'train-track train-track-car');

                        track.appendChild(voie);
                        track.setAttribute('class', 'train-track train-track-car voie');
                    } else {
                        if (value['hall'] === undefined) {
                            voie.appendChild(document.createTextNode(train_voie));

                            track.appendChild(voie);
                            track.setAttribute('class', 'train-track train-track-view voie');

                            if (value['showvoie']) {
                                thirdcol_firstrow.appendChild(track);
                            }

                            thirdcol_firstrow.setAttribute('class', 'col-third');
                        } else if (value['hall'] === "") {
                            voie.appendChild(document.createTextNode(train_voie));

                            track.appendChild(voie);
                            track.setAttribute('class', 'train-track train-track-view voie');

                            if (value['showvoie']) {
                                thirdcol_firstrow.appendChild(track);
                            }

                            thirdcol_firstrow.setAttribute('class', 'col-third');
                        } else {
                            var anim1 = document.createElement('div');
                            var anim2 = document.createElement('div');

                            anim1.setAttribute('class', 'animation-blink-1');

                            anim2.setAttribute('class', 'animation-blink-2');


                            var hall = document.createElement('div');
                            var hall_1 = document.createElement('small');
                            var hall_2 = document.createElement('h1');
                            var br = document.createElement('br');
                            var br1 = document.createElement('br');

                            hall.setAttribute('class', 'train-track train-track-h animation-blink-2');
                            hall_1.appendChild(document.createTextNode('hall'));
                            hall_2.appendChild(document.createTextNode(train_hall));

                            hall.appendChild(hall_1);
                            hall.appendChild(br);
                            hall.appendChild(br1);
                            hall.appendChild(hall_2);

                            voie.appendChild(document.createTextNode(train_voie));

                            track.appendChild(voie);
                            track.setAttribute('class', 'train-track train-track-view voie animation-blink-1');

                            if (value['showvoie']) {
                                thirdcol_firstrow.appendChild(track);
                                thirdcol_firstrow.appendChild(hall);
                            }

                            thirdcol_firstrow.setAttribute('class', 'col-third animation-blink');
                        }
                    }


                    if (train_alternance === "") {

                    } else if (train_alternance === undefined) {

                    } else {
                        if (alternance_type === 'normal') {
                            alternance.setAttribute('class', ' train-information-dynamic animation-dynamic');
                        } else {
                            alternance.setAttribute('class', ' train-information-dynamic train-information-dynamic-yellow animation-dynamic');
                        }
                        alternance.innerText = train_alternance;

                        col_hide_inner.setAttribute('class', 'col-hide-inner');
                        col_hide_inner.appendChild(alternance);

                        col_hide.appendChild(col_hide_inner);
                    }

                    firstrow.appendChild(firstcol_firstrow);
                    firstrow.appendChild(secondfirstcol_firstrow);
                    firstrow.appendChild(secondsecondcol_firstrow);
                    firstrow.appendChild(secondthirdcol_firstrow);
                    firstrow.appendChild(col_hide);
                    firstrow.appendChild(thirdcol_firstrow);

                    if (i < 2) {
                        firstcol_secondrow.setAttribute('class', 'col-first');

                        if (train_gares.length < 30) {
                            gares.setAttribute('class', 'train-stations text-scroll-x');
                            gares.setAttribute('style', 'padding-left: 0%;');
                        } else {
                            gares.setAttribute('class', 'train-stations text-scroll-x scroll-x animation-scroll-x');
                            gares.setAttribute('style', 'animation-duration: ' + animation_time + 's; padding-left: 100%;');
                        }
                        secondcol_secondrow.appendChild(gares);
                        secondcol_secondrow.setAttribute('class', 'col-second');

                        thirdcol_secondrow.setAttribute('class', 'col-third');

                        secondrow.appendChild(firstcol_secondrow);
                        secondrow.appendChild(secondcol_secondrow);
                        secondrow.appendChild(thirdcol_secondrow);
                    }

                    firstrow.setAttribute('class', 'row');
                    secondrow.setAttribute('class', 'row');

                    var data_time = new Date();
                    var data_time2 = new Date();

                    data_time.setHours(train_hour.substr(0, 2), train_hour.substr(3, 2) + time_before_show);
                    data_time2.setHours(train_hour.substr(0, 2), train_hour.substr(3, 2) + time_after_hide);
                    var rowgroup = document.createElement('div');
                    if (i < 2) {
                        rowgroup.setAttribute('class', 'row-group row-train row-group-2');
                    } else {
                        rowgroup.setAttribute('class', 'row-group row-train');
                    }
                    rowgroup.setAttribute('data-day', days);
                    rowgroup.setAttribute('data-timeshow', data_time.getTime() / 1000);
                    rowgroup.setAttribute('data-timehide', data_time2.getTime() / 1000)
                    rowgroup.appendChild(firstrow);
                    if (i < 2) {
                        rowgroup.appendChild(secondrow);
                    }

                    group.appendChild(rowgroup);

                    i++;
                }
            }
        });
        document.getElementById('group').remove();
        document.getElementById('rows').appendChild(group);

        database.child("users").child(user_id).child("gares").child(id).get().then((snapshot) => {
            if (snapshot.val().infos.length > 35) {
                document.getElementById('infos').setAttribute('class', 'bar-informations');
            }
            document.getElementById('infos').innerHTML = snapshot.val().infos.replace('\n', ' &nbsp;');

            document.getElementById('bg').hidden = false;
            //document.getElementById('loader').style.display = 'none';

            scrollX();
            checkDay();
            clock();
        });
    }).catch((error) => {
        setError("Chargement des départs", error.stack);
        document.getElementById('error_loading').hidden = false;
        console.error(error);
    });
}

function autoRow() {
    var timestamp = Date.now() / 1000;

    $('.row-group').each(function () {
        console.log($(this).data('timehide') + ' <=> ' + timestamp);
        if ($(this).data('timehide') <= timestamp) {
            clearInterval('autoRowRun');

            $(this).addClass('row-group-hidden');
            $(this).removeClass('row-group');

            autoRowRun = setInterval(autoRow, 10000, 0);
            return false;
        } else if ($(this).data('timeshow') >= timestamp) {
            clearInterval('autoRowRun');

            $(this).addClass('row-group');
            $(this).removeClass('row-group-hidden');

            autoRowRun = setInterval(autoRow, 10000, 0);
            return false;
        }
    });
}


// ERROR MANAGEMENT
function setError(caused_by, stacktrace) {
    document.getElementById('error_caused_by').value = caused_by;
    document.getElementById('error_stacktrace').innerText = stacktrace;
}

// GARE RER
var uid = undefined;

var gare_id = null;
var id = null;
var openmethod = true;

function loadParams() {
    database.child("users").child(uid).get().then((snapshot) => {
        openmethod = snapshot.val().openmethod;
        if (!openmethod) {
            document.getElementById('showdeparts').setAttribute('onclick', 'window.open("departs_rer.htm' + window.location.search + '");');
        }
    });
}

function prepModifTrainRer(tid) {
    database.child("users").child(uid).child("gares").child(gare_id).child("trains").child(tid).get().then((snapshot) => {
        document.getElementById('modif_train_number').value = snapshot.val().number;
        document.getElementById('modif_train_dest').value = snapshot.val().destination;
        document.getElementById('modif_train_type').value = snapshot.val().type;
        document.getElementById('modif_train_hour').value = snapshot.val().hourdepart;
        document.getElementById('modif_train_retard_time').value = snapshot.val().retardtime;
        document.getElementById('modif_train_mission').value = snapshot.val().mission;
        document.getElementById('modif_train_hour_mode').value = snapshot.val().hourmode;
        if (snapshot.val().retardtype === 'alheure') {
            document.getElementById('modif_train_alheure').checked = true;
        } else if (snapshot.val().retardtype === 'retindet') {
            document.getElementById('modif_train_retindet').checked = true;
        } else if (snapshot.val().retardtype === 'ret') {
            document.getElementById('modif_train_retindet').checked = true;
        } else {
            document.getElementById('modif_train_suppr').checked = true;
        }
        if (snapshot.val().length === 'traincourt') {
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

        document.getElementById('validate2').setAttribute('onclick', 'modifTrain(' + tid + ');');
    });
}

function modifTrainRer(tid) {
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
        hourdepart: document.getElementById('modif_train_hour').value.replace(':', 'h'),
        type: document.getElementById('modif_train_type').value,
        retardtime: document.getElementById('modif_train_retard_time').value,
        mission: document.getElementById('modif_train_mission').value,
        retardtype: retardtype,
        length: lng,
        hourmode: document.getElementById('modif_train_hour_mode').value
    }).then((snapshot) => {
        document.getElementById('modified').hidden = false;
    });
}

function setGareRer(gid) {
    id = gid;
}

function getGareRer() {
    return id;
}

function delTrainRer(tid) {
    database.child("users").child(uid).child("gares").child(gare_id).child("trains").child(tid).remove().then(() => {
        document.getElementById('train_del').hidden = false;
    });
}

function loadGareRer(userid) {
    uid = userid;
    var params = new URLSearchParams(window.location.search);
    gare_id = params.get("id");
    database.child("users").child(uid).child("gares").child(params.get("id")).get().then((snapshot) => {
        if (snapshot.exists()) {
            document.title = 'InfoGare - ' + snapshot.val().name;
            database.child("users").child(uid).child("gares").child(params.get("id")).child("trains").get().then((snapshot) => {
                if (snapshot.exists()) {
                    snapshot.forEach((childsnapshot) => {
                        var dest = childsnapshot.val().destination;
                        var id = childsnapshot.val().id;
                        var hour = childsnapshot.val().hourdepart;
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
                            managmentitemmain.setAttribute('onclick', 'window.open("rer.htm?gid=' + gare_id + '&tid=' + id + '", "", "height=500,width=750");');
                        } else {
                            managmentitemmain.setAttribute('onclick', 'window.open("rer.htm?gid=' + gare_id + '&tid=' + id + '");');
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
                        btnmodify.setAttribute('onclick', 'prepModifTrain(' + id + ');');
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
                    document.getElementById('loader').style.display = 'none';
                } else {
                    document.getElementById('trains_div').appendChild(document.createTextNode('Il n\'y a pas de trains ;)'));
                    document.getElementById('loader').style.display = 'none';
                }
            });
        } else {
            window.location.href = "gares.htm";
        }
    }).catch((error) => {
        setError('Chargemment de la gare RER', error.stack);
        document.getElementById('error_loading').hidden = false;
        document.getElementById('loader').style.display = 'none';
    });
}

function createTrainRer() {

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
        hourdepart: document.getElementById('train_hour').value.replace(':', 'h'),
        retardtype: rettype,
        retardtime: document.getElementById('retard_time').value,
        gares: gares,
        mission: document.getElementById('train_mission').value,
        length: lng,
        hourmode: document.getElementById('train_hour_mode').value
    }).then((snapshot) => {
        document.getElementById('created').hidden = false;
    });
}

var active_train;

function loadTrainModification(id) {
    active_train = id;

}


// IMPORT
function importCSV(file) {
    Papa.parse(file, {
        complete: function (results) {
            console.log(results.data);
        }
    });
}


// INFOS
function loadInfos(userid, gid) {
    database.child('users').child(userid).child('gares').child(gid).get().then((snapshot) => {
        document.getElementById('infos').innerText = snapshot.val().infos;

        if (snapshot.val().infostype === 'flash') {
            document.getElementById('row').setAttribute('class', 'row-group row-group-informations row-group-informations-2');
        } else {
            document.getElementById('row').setAttribute('class', 'row-group row-group-informations row-group-informations-1');
        }

        clock();
    });
}


// LOADER
function createLoader() {
    var caisses_list = [
        {
            "caisse-1": "CoradiaLiner_L.gif",
            "caisse-2": "CoradiaLiner_M.gif",
            "caisse-3": "CoradiaLiner_R.gif"
        },
        {
            "caisse-1": "Regiolis_L.gif",
            "caisse-2": "Regiolis_M.gif",
            "caisse-3": "Regiolis_R.gif"
        },
        {
            "caisse-1": "X72500_L.gif",
            "caisse-2": "X72500_M.gif",
            "caisse-3": "X72500_R.gif"
        },
        {
            "caisse-1": "X73500_L.gif",
            "caisse-2": "X73500_M.gif",
            "caisse-3": "X73500_R.gif"
        },
        {
            "caisse-1": "Z24500_L.gif",
            "caisse-2": "Z24500_M.gif",
            "caisse-3": "Z24500_R.gif"
        },
        {
            "caisse-1": "ZGC_L.gif",
            "caisse-2": "ZGC_M.gif",
            "caisse-3": "ZGC_R.gif"
        }
    ];

    var rdom = Math.floor((Math.random() * 6));
    var livree = localStorage.getItem('livree');

    if (livree === null) {
        livree = "Neutre";
    }

    document.getElementById('caisse-1').src = 'images/loading/' + livree + '/caisse-1/' + caisses_list[rdom]['caisse-1'];
    document.getElementById('caisse-2').src = 'images/loading/' + livree + '/caisse-2/' + caisses_list[rdom]['caisse-2'];
    document.getElementById('caisse-3').src = 'images/loading/' + livree + '/caisse-3/' + caisses_list[rdom]['caisse-3'];
}


// LOGIN
firebase.auth().languageCode = 'fr';

var user = undefined;

document.getElementById('login_btn').onclick = function () {
    location.href = 'https://auth.infogare.fr/redirect.htm?returnurl=' + encodeURIComponent(location.href) + '&service=infogare&version=beta';
}

function loginWithToken(token) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
            firebase.auth().signInWithCustomToken(token).then((user) => {
                console.log(user.user.displayName);
                window.location.href = location.pathname;
            });
        });
}

function checkLogin() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            document.getElementById('mnu_login').hidden = true;
            document.getElementById('mnu_gares').hidden = false;
            document.getElementById('mnu_compte').hidden = false;
            document.getElementById('mnu_username').innerText = user.displayName;
            document.getElementById('mnu_users').hidden = false;
            document.getElementById('mnu_logout').hidden = false;
            if (user.photoURL) {
                document.getElementById('mnu_user_photo').src = user.photoURL;
                document.getElementById('mnu_user_photo').style.display = 'block';
                document.getElementById('mnu_user_no_photo').style.display = 'none';
            }
            if (location.host === 'beta.infogare.fr') {
                checkBeta(user.uid);
            }
            this.user = user;
        } else {
            document.getElementById('mnu_login').hidden = false;
            document.getElementById('mnu_gares').hidden = true;
            document.getElementById('mnu_compte').hidden = true;
            document.getElementById('mnu_username').innerText = 'Non connecté';
            document.getElementById('mnu_users').hidden = true;
            document.getElementById('mnu_logout').hidden = true;
            if (location.host === 'beta.infogare.fr') {
                checkBeta(user.uid);
            }
        }
    });
}

function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "index.htm";
    }).catch((error) => {
        setError("Déconnexion", error.stack);
        document.getElementById('error_loading').hidden = false;
        document.getElementById('loader').style.display = 'none';
    });
}

function checkBeta(userid) {
    firebase.database().ref('users/' + userid).get().then((snapshot) => {
        if (!snapshot.val().beta) {
            logout();
            window.location.replace('beta_access_refused.htm');
        }
    })
}


// NOTIFICATIONS
var messages = firebase.messaging();

messages.onMessage((payload) => {
    console.log('Nouveau message' + payload)
});


// PANEL
var params = new URLSearchParams(window.location.search);
var gare_id = params.get('id');
var db;

function setDb(user_id) {
    gare_id = params.get('id');
    db = firebase.database().ref("users/" + user_id + "/gares/" + gare_id);
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

function loadPanelTrains() {
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
                        btnmodify.setAttribute('onclick', 'prepModifRet(' + id + ');');
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
                        btndel.setAttribute('onclick', 'prepModifAff(' + id + ');');
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
        setError("Chargement des trains", error.stack);
        document.getElementById('error_loading').hidden = false;
        document.getElementById('loader').style.display = 'none';
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

        document.getElementById('modif_ret_val').setAttribute('onclick', 'modifRet(' + tid + ');');
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

        document.getElementById('modif_aff_val').setAttribute('onclick', 'modifAff(' + tid + ');');
    });
}

function modifAff(tid) {
    db.child('trains').child(tid).update({
        show: document.getElementById('modif_aff_train').checked,
        showvoie: document.getElementById('modif_aff_voie').checked,
        voie: document.getElementById('modif_aff_voie_voie').value
    });
}


// PROFILE
var uid = undefined;
function modifParams() {
    database.child("users").child(uid).update({
        openmethod: document.getElementById('openinwindow').checked,
        autoopenpanel: document.getElementById('activated').checked,
        newsletter: document.getElementById('newsletteryes').checked,
    }).then((snapshot) => {

    });
}

function setLivree() {
    localStorage.setItem('livree', document.getElementById('param3').value);
}

function getLivree() {
    document.getElementById('param3').value = localStorage.getItem('livree');
}

function loadUserInfos() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            uid = user.uid;
            loadParams();
            getLivree();
            firebase.database().ref('users/' + uid + '/gares').get().then((snapshot) => {
                var childs = 0;
                document.getElementById('gares_nbr').innerText = snapshot.numChildren();
                snapshot.forEach((child) => {
                    childs += child.child('trains').numChildren();
                });
                document.getElementById('trains_nbr').innerText = childs;
            }).catch((error) => {
                setError("Chargement des infos", error.stack);
                document.getElementById('error_loading').hidden = false;
            });
            firebase.database().ref('users/' + uid).update({
                email: user.email
            });
        }
        document.getElementById('content').hidden = false;
        document.getElementById('loader').style.display = 'none';
    });
}

function loadProfileParams() {
    database.child("users").child(uid).get().then((snapshot) => {
        if (snapshot.val().openmethod) {
            document.getElementById('openinwindow').checked = true;
        } else {
            document.getElementById('openintab').checked = true;
        }

        if (snapshot.val().autoopenpanel) {
            document.getElementById('activated').checked = true;
        } else {
            document.getElementById('desactivated').checked = true;
        }

        if (snapshot.val().newsletter) {
            document.getElementById('newsletteryes').checked = true;
        } else {
            document.getElementById('newsletterno').checked = true;
        }
    }).catch((error) => {
        setError("Chargement des paramètres", error.stack);
        document.getElementById('error_loading').hidden = false;
    })
}


// QR CODE
function loadQR(url) {
    document.getElementById('qr').src = 'https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=' + url;
}


// SCREEN
$(document).ready(function () {
    $(document.body).dblclick(function () {
        fullScreen();
    });
});

/* -- scrollX -- */

function scrollX() {

    $('.scroll-x').each(function () {

        var distance = $(this).width() + $(this).parent().width() + 10;

        if ($(this).width() > $(this).parent().width()) {
            $(this).addClass('animation-scroll-x');
            $(this).css({
                '-webkit-animation-duration': (distance / 150) + 's',
                'animation-duration': (distance / 150) + 's',
                'padding-left': '100%'
            });
        } else {
            $(this).css({
                'padding-left': '100%'
            });
        }
    });
}

scrollX();

/* -- scrollY -- */

function scrollY(limit) {

    var elem = $('.scroll-y');
    var elemHeight = elem.height();
    var parentHeight = elem.parent().height();
    var elemHeightRelative = elemHeight / parentHeight * 100;

    if (elemHeightRelative > limit && limit < 100) {
        var distance = (elemHeight - (parentHeight / 1.1)) / $(window).height() * 100;
        var time = distance / 6 + 10;
        var delay = 5 / time * 100;

        $("<style type='text/css'> @keyframes scrollY{ 0%, " + delay + "%{ transform:translateY(0%); } " + (100 - delay) + "%, 100%{ transform:translateY(-" + distance + "vh); } } </style>").appendTo("head");
        $(elem).css({
            'animation': 'scrollY ' + time + 's linear infinite 0s'
        });
    } else {
        $(elem).css({
            'animation': 'none'
        });
    }
}

/* -- fullScreen -- */

function fullScreen() {
    if (
        (document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

/* -- clock -- */

function clock() {
    date = new Date;
    date.setHours(date.getHours() + (date.getTimezoneOffset() / -60));

    h = date.getUTCHours();
    if (h < 10) {
        h = '0' + h;
    }
    $('#clock-hours').html(h);
    m = date.getUTCMinutes();
    if (m < 10) {
        m = '0' + m;
    }
    $('#clock-minutes').html(m);
    s = date.getUTCSeconds();
    if (s < 10) {
        s = '0' + s;
    }
    $('#clock-seconds').html(s);
    setTimeout('clock("clock");', '1000');
    return true;
}

if (location.pathname == ('/train.htm' || '/rer.htm' || '/departs.htm' || '/arrives.htm' || '/departs_rer.htm' || '/infos.htm')) {
    clock();
}


// TRAIN
function loadTrain(uid) {
    var params = new URLSearchParams(location.search);
    database.child("users").child(uid).child("gares").child(params.get('gid')).child("trains").child(params.get('tid')).get().then((snapshot) => {
        let gare;
        database.child("users").child(uid).child("gares").child(params.get('gid')).get().then((snap) => {
            gare = snap.val().name;
            document.getElementById('train_number').innerText = snapshot.val().number;

            var logo = document.getElementById('logo');
            var train_type = snapshot.val().type;

            if (train_type === "SNCF (logo 1985)") {
                document.getElementById('train_type').innerText = "Train SNCF";
            } else if (train_type === "SNCF (logo 1992)") {
                document.getElementById('train_type').innerText = "Train SNCF";
            } else if (train_type === "SNCF (carmillon)") {
                document.getElementById('train_type').innerText = "Train SNCF";
            } else {
                document.getElementById('train_type').innerText = train_type;
            }

            let train_hour;
            let gares;

            if (params.get('instance') === 'arrivals') {
                document.getElementById('row').setAttribute('class', 'rows row-screen rows-arrivals');
                train_hour = snapshot.val().hourarrive.replace(':', 'h');
                gares = snapshot.val().from.substr(0, snapshot.val().from.length).split("|");
                document.getElementById('train_dest').innerText = snapshot.val().provenance;
                gares.push(gare);
            } else {
                train_hour = snapshot.val().hourdepart.replace(':', 'h');
                gares = snapshot.val().gares.substr(0, snapshot.val().gares.length - 1).split("|");
                document.getElementById('train_dest').innerText = snapshot.val().destination;
            }

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
            } else if (train_type === 'TER Auvergne Rhône Alpes') {
                logo.setAttribute('class', 'train-logo train-logo-auvergne-rhone-alpes');
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
            } else if (train_type === 'SNCF (logo 1985)') {
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
                hour.innerText = train_hour;
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
                hour.innerText = train_hour;
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
                hour.innerText = train_hour;
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
                hour.innerText = train_hour;
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

            gares.forEach((item, index) => {
                if (item != "") {
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
                        if (params.get('instance') === 'arrivals') {
                            tr.setAttribute('class', 'train-stations-last-arrivals');
                        } else {
                            tr.setAttribute('class', 'train-stations-last-departures');
                        }
                    }
                    tr.appendChild(trainstationcolumn);
                    tr.appendChild(trainstationstation);
                    document.getElementById('gares').appendChild(tr);
                }

                if (snapshot.val().alternance === undefined) {

                } else if (snapshot.val().alternance === "") {

                } else {
                    if (snapshot.val().alternancetype === 'normal') {
                        document.getElementById('infos').innerHTML = snapshot.val().alternance;
                        document.getElementById('rowgroupbar').setAttribute('class', 'row-group row-group-bar row-group-bar');
                    } else {
                        document.getElementById('infos').innerHTML = snapshot.val().alternance;
                    }
                }
            });
            if (snapshot.val().compo !== undefined) {
                document.getElementById('rowgroup').setAttribute('class', 'row-group row-group-train row-group-train-third');
                document.getElementById('stations').setAttribute('class', 'train-stations train-stations-solo train-stations-reduced scroll-y');
                document.getElementById('compo').style.display = 'table';
                document.getElementById('compo_voie').innerText = snapshot.val().voie;
                document.getElementById('compo_title').innerText = snapshot.val().destination;
                snapshot.val().compo.forEach((childSnapshot) => {
                    var compo_wagon = document.createElement('div');
                    compo_wagon.setAttribute('class', 'train-wagons-train-wagon ' + childSnapshot);
                    document.getElementById('compo_area_area').appendChild(compo_wagon);
                });
            }
        });
    });

    database.child("users").child(uid).child("gares").child(params.get('gid')).get().then((snapshot) => {
        if (snapshot.val().infos.length > 35) {
            document.getElementById('infos').setAttribute('class', 'bar-informations');
        }

        if (document.getElementById('infos').innerHTML === "") {
            document.getElementById('infos').innerHTML = snapshot.val().infos.replace('\n', ' &nbsp;');
        }

        document.getElementById('loader').style.display = 'none';

        scrollX();
        scrollY(80);
        clock();
    });
}


// USERS
var uid = '';

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        uid = user.uid;
    }
});

function getAllUsers() {
    loadConfidentiality();
    database.get().then((snapshot) => {
        var i = 0;
        var j = 0;
        var row = document.createElement('div');
        row.setAttribute('class', 'row');
        snapshot.forEach((child) => {
            if (i == 3) {
                document.getElementById('cards').appendChild(row);
                document.getElementById('cards').appendChild(document.createElement('br'));
                if (j == 3) {
                    var ins = document.createElement('ins');
                    var script = document.createElement('script');
                    ins.setAttribute('class', 'adsbygoogle');
                    ins.setAttribute('style', 'display:inline-block;width:728px;height:90px');
                    ins.setAttribute('data-ad-client', 'ca-pub-3014614649994013');
                    ins.setAttribute('data-ad-slot', '9920869589');

                    script.innerText = '(adsbygoogle = window.adsbygoogle || []).push({});';

                    document.getElementById('cards').appendChild(ins);
                    document.getElementById('cards').appendChild(script);
                    j = 0;
                }
                row = document.createElement('div');
                row.setAttribute('class', 'row');
                i = 0;
                j++;
            }

            if (child.val().public) {
                var col = document.createElement('div');
                var card = document.createElement('div');
                var center = document.createElement('center');
                var photo = document.createElement('i');
                var username = document.createElement('h2');
                var gares = document.createElement('p');
                var content = document.createElement('div');

                card.setAttribute('class', 'card overflow-hidden');
                card.style.cursor = 'pointer';
                card.setAttribute('onclick', 'location.href="user.htm?id=' + child.key + '";');

                col.setAttribute('class', 'col-md-4')

                content.setAttribute('class', 'card-body text-center');

                photo.setAttribute('class', 'icons-circle-account-connected icons-size-90px');

                center.appendChild(photo);

                username.innerText = child.val().username;

                gares.innerText = child.child('gares').numChildren() + ' gares';

                content.appendChild(username);
                content.appendChild(gares);

                card.appendChild(center);
                card.appendChild(content);

                col.appendChild(card);

                row.appendChild(col);

                i++;
            }
        });
        document.getElementById('loader').style.display = 'none';
    }).catch((error) => {
        setError("Chargement des tout les utilisateurs", error.stack);
        document.getElementById('error_loading').hidden = false;
        document.getElementById('loader').style.display = 'none';
    })
}

function setUid(val) {
    uid = val;
}

function getUser(id) {
    database.child(id).get().then((snapshot) => {
        document.getElementById('username').innerText = snapshot.val().username;
        document.title = 'InfoGare - ' + snapshot.val().username;
        snapshot.child("gares").forEach((childsnapshot) => {
            if (snapshot.val().public) {
                var name = childsnapshot.val().name;
                var trains = childsnapshot.child('trains').numChildren();
                var type = childsnapshot.val().type;
                var listgroupitem = document.createElement('li');
                var managmentitemcontent = document.createElement('div');
                var managmentitemsymbol = document.createElement('div');
                var icon = document.createElement('i');
                var managmentitemmain = document.createElement('div');
                var title = document.createElement('h2');
                var metalist = document.createElement('ul');
                var trains_div = document.createElement('li');
                var type_div = document.createElement('li');

                title.appendChild(document.createTextNode(name));
                trains_div.appendChild(document.createTextNode(trains + ' trains'));
                if (type === 'neutral') {
                    type_div.appendChild(document.createTextNode('Gare normale'));
                } else {
                    type_div.appendChild(document.createTextNode('Gare RER'));
                }

                trains_div.setAttribute('class', 'meta-list-item');
                type_div.setAttribute('class', 'meta-list-item separator separator');

                metalist.setAttribute('class', 'meta-list font-weight-medium');
                metalist.appendChild(trains_div);
                metalist.appendChild(type_div);

                managmentitemmain.setAttribute('class', 'management-item-main');
                managmentitemmain.setAttribute('style', 'cursor: pointer;');
                if (type === 'neutral') {
                    managmentitemmain.setAttribute('onclick', 'window.location.href="gare.htm?id=' + childsnapshot.key + '&uid=' + id + '"');
                } else {
                    managmentitemmain.setAttribute('onclick', 'window.location.href="gare_rer.htm?id=' + childsnapshot.key + '&uid=' + id + '"');
                }
                managmentitemmain.appendChild(title);
                managmentitemmain.appendChild(metalist);

                icon.setAttribute('class', 'icons-itinerary-train-station icons-size-1x25');
                icon.setAttribute('aria-hidden', 'true');

                managmentitemsymbol.setAttribute('class', 'management-item-symbol');
                managmentitemsymbol.appendChild(icon);

                managmentitemcontent.setAttribute('class', 'management-item-content');
                managmentitemcontent.appendChild(managmentitemsymbol);
                managmentitemcontent.appendChild(managmentitemmain);

                listgroupitem.setAttribute('class', 'list-group-item management-item');
                listgroupitem.appendChild(managmentitemcontent);

                document.getElementById('gares').appendChild(listgroupitem);
            }
        });
        document.getElementById('loader').style.display = 'none';
    }).catch((error) => {
        setError('Chargement des utilisateurs', error.stack);
        document.getElementById('error_loading').hidden = false;
    })
}

function setUsername(uname) {
    database.child(uid).update({
        username: uname
    });
}

function modifConfidentiality() {
    var profile_public = document.getElementById('public_yes').checked;

    database.child(uid).update({
        public: profile_public
    });
}

function loadConfidentiality() {
    database.child(uid).get().then((snapshot) => {
        document.getElementById('public_yes').checked = snapshot.val().public;
    });
}


// VERSIONNING
const COMMITS_API = "https://api.github.com/repos/Absolument-Oui/InfoGare/commits?per_page=1000";
const COMMITS_API_BETA = "https://api.github.com/repos/Absolument-Oui/InfoGare-Beta/commits?per_page=1000";
var req = new XMLHttpRequest();

function getVersion() {
    if (location.host === "infogare.fr") {
        req.open('GET', COMMITS_API, false);
        req.onload = ((e) => {
            var response = JSON.parse(req.response);
            var item = response[0];
            var message = item.commit.message;
            console.log(message);
            var version = message.split('\n');

            document.getElementById('version').innerText = version[0];
        });
        req.send('');
    }
    if (location.host === "beta.infogare.fr") {
        req.open('GET', COMMITS_API_BETA, false);
        req.onload = ((e) => {
            var response = JSON.parse(req.response);
            var item = response[0];
            var message = item.commit.message;
            console.log(message);
            var version = message.split('\n');

            document.getElementById('version').innerText = version[0];
        });
        req.send('');
    }
}

function getAllVersions() {
    var response = JSON.parse(req.response);
    for (let i = 0; i < response.length; i++) {
        let div = document.createElement('div');
        let h1 = document.createElement('h1');
        let p = document.createElement('p');

        var title = response[i].commit.message.split('\n')[0];
        var message = response[i].commit.message.slice(title.length, response[i].commit.message.length);
        var commit_date = new Date(response[i].commit.author.date);

        h1.innerText = `${title} (${commit_date.toLocaleDateString()})`;
        p.innerText = message;
        div.appendChild(h1);
        div.appendChild(p);

        document.getElementById('versions').appendChild(div);
    };
}

function detectAndroid() {
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf('android') > -1;
    if (isAndroid) {
        $('#mobile_app').modal('show');
    }
}

function checkDay() {
    var today_date = new Date();
    var today = today_date.getDay();

    $('.row-train').each(function(){

        var days1 = $(this).data('day');
        var days = days1.split(',');

        days.forEach(element => {
            console.log(element, today + 1);
            if (element !== 'undefined' && element !== '') {
                if (element !== today + 1) {
                    $(this).addClass('row-group-hidden');
                }
            }    
        });
    });
}