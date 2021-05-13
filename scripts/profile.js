var uid = undefined;
const database = firebase.database().ref();

function modifParams() {
    database.child("users").child(uid).update({
        openmethod: document.getElementById('openinwindow').checked
    }).then((snapshot) => {
        
    });
}

function loadInfos() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            uid = user.uid;
            document.getElementById('username').innerText = user.displayName;
            document.getElementById('email').innerText = user.email;
            loadParams();
            firebase.database().ref('users/'+uid+'/gares').get().then((snapshot) => {
                var childs = 0;
                document.getElementById('gares_nbr').innerText = snapshot.numChildren();
                snapshot.forEach((child) => {
                    childs +=  child.child('trains').numChildren();
                });
                document.getElementById('trains_nbr').innerText = childs;
            });
        }
    });
}

function loadParams() {
    database.child("users").child(uid).get().then((snapshot) => {
        if (snapshot.val().openmethod) {
            document.getElementById('openinwindow').checked = true;
        } else {
            document.getElementById('openintab').checked = true;
        }
    });
}

function chgPass(oldpass, newpass) {
    var email = firebase.auth().currentUser.email;
    var credential = firebase.auth.EmailAuthProvider.credential(email, oldpass);
    firebase.auth().currentUser.reauthenticateWithCredential(credential).then(function() {
        firebase.auth().currentUser.updatePassword(newpass).then(() => {
            window.location.reload();
        });
    });
}