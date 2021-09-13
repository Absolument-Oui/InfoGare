const database = firebase.database().ref('users');

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
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
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

                        

                        break;
                    }
                });
            }
        });
    });
}