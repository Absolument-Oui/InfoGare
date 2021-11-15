firebase.auth().languageCode = 'fr';

var user = undefined;

document.getElementById('login_btn').onclick = function() {
  location.href = 'https://auth.infogare.fr/redirect.htm?returnurl=' + encodeURIComponent(location.href)+'&service=infogare&version=beta';
}

function loginWithToken(token) {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    firebase.auth().signInWithCustomToken(token).then((user) => {
      console.log(user.user.displayName);
      window.location.href = location.pathname;
    });
  });
  location.href = 'https://auth.infogare.fr/redirect.htm?returnurl=' + encodeURIComponent(location.href)+'&service=infogare&version=release';
}

function loginWithToken(token) {
  firebase.auth().signInWithCustomToken(token).then((user) => {
    console.log(user.user.displayName);
    window.location.href = location.pathname;
  });
}

function login(email, password) {
  var params = new URLSearchParams(location.search);
    document.getElementById('checkemail').hidden = true;
    document.getElementById('checkpassword').hidden = true;
    document.getElementById('emailexists').hidden = true;
    document.getElementById('passwordweak').hidden = true;
    document.getElementById('checkusername').hidden = true;
    document.getElementById('error').hidden = true;
    var pers;

    if (document.getElementById('stay_connected').checked) {
      pers = firebase.auth.Auth.Persistence.LOCAL;
    } else {
      pers = firebase.auth.Auth.Persistence.SESSION;
    }

    firebase.auth().setPersistence(pers).then(() => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        firebase.database().ref('users/'+user.uid).get().then((snapshot) => {
          if (snapshot.val().tfa) {
            SecretCode = snapshot.val().tfacode;
            $('#tfa').modal('show');
          } else {
            if (params.has('redirect')) {
              window.location.href = params.get('redirect');
            } else {
              window.location.href='index.htm';
            }
          }
        });
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/invalid-email') {
            document.getElementById('checkemail').hidden = false;
        }else if (errorCode == 'auth/wrong-password') {
            document.getElementById('checkpassword').hidden = false;
        }
        document.getElementById('error').hidden = false;
      });
    });
}

function signin(email, password, username) {
    document.getElementById('checkemail').hidden = true;
    document.getElementById('checkpassword').hidden = true;
    document.getElementById('emailexists').hidden = true;
    document.getElementById('passwordweak').hidden = true;
    document.getElementById('checkusername').hidden = true;
    document.getElementById('error').hidden = true;
    
    if (username == null) {
        document.getElementById('checkusername').hidden = false;
        document.getElementById('error').hidden = false;
    }else{
        firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        
        user.updateProfile({
          displayName: username
        }).then(function() {
            firebase.database().ref('users').child(user.uid).update({
              newsletter: document.getElementById('newsletter').checked
            }).then(() => {
              window.location.href = 'index.htm';
            })
        }).catch(function(error) {
          // An error happened.
        });
        
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/email-already-in-use') {
            document.getElementById('emailexists').hidden = false;
        }else if (errorCode == 'auth/weak-password') {
            document.getElementById('passwordweak').hidden = false;
        }else if (errorCode == 'invalid-email') {
            document.getElementById('checkemail').hidden = false;
        }
        document.getElementById('error').hidden = false;
      });
    }
}

function checkLogin() {
    firebase.auth().onAuthStateChanged(function(user) {
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
      window.location.href="index.htm";
    }).catch((error) => {
      console.error(error.message);
    });
}

function checkBeta(userid) {
  firebase.database().ref('users/'+userid).get().then((snapshot) => {
    if (!snapshot.val().beta) {
      logout();
      window.location.replace('beta_access_refused.htm');
    }
  });
}
