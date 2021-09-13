const database = firebase.database().ref('users');

function loadInfos(userid, gid) {
    database.child(userid).child('gares').child(gid).get().then((snapshot) => {
        document.getElementById('infos').innerText = snapshot.val().infos;

        if (snapshot.val().infostype === 'flash') {
            document.getElementById('row').setAttribute('class', 'row-group row-group-informations row-group-informations-2');
        } else {
            document.getElementById('row').setAttribute('class', 'row-group row-group-informations row-group-informations-1');
        }
    })
}