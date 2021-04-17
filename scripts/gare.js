const database = firebase.database().ref();
var uid = undefined;

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
    database.child("users").child(uid).child("gares").child(params.get("id")).get().then((snapshot) => {
        if (snapshot.exists()) {
            document.title = 'InfoGares - '+snapshot.val().name;
            database.child("users").child(uid).child("gares").child(params.get("id")).child("trains").get().then((snapshot) => {
                if (snapshot.exists()) {
                    
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