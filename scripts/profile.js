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