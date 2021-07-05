var uid = undefined;
const database = firebase.database().ref();

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

function loadInfos() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            uid = user.uid;
            document.getElementById('username').innerText = user.displayName;
            document.getElementById('email').innerText = user.email;
            loadParams();
            getLivree();
            firebase.database().ref('users/'+uid+'/gares').get().then((snapshot) => {
                var childs = 0;
                document.getElementById('gares_nbr').innerText = snapshot.numChildren();
                snapshot.forEach((child) => {
                    childs +=  child.child('trains').numChildren();
                });
                document.getElementById('trains_nbr').innerText = childs;
            }).catch((error) => {
                document.getElementById('error_loading').hidden = false;
            });
            firebase.database().ref('users/'+uid).update({
                email: user.email
            });
        }
        document.getElementById('content').hidden = false;
        document.getElementById('loader').style.display = 'none';
    });
}

function loadParams() {
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
        document.getElementById('error_loading').hidden = false;
    })
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

function joinBeta() {
    database.child("users").child(uid).update({
        beta: true
    }).then((snapshot) => {
        alert('Merci d\'avoir rejoint le programme bêta ! \nVous allez être redirigé vers la version bêta !');
        window.location.href = "https://beta.infogare.fr";
    });
}