function loadInfos() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            document.getElementById('username').innerText = user.displayName;
            document.getElementById('email').innerText = user.email;
        }
    });
}