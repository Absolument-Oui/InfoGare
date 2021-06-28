firebase.auth().languageCode = 'fr';

var user = undefined;

var SecretCode = null;

function login(email, password) {
    document.getElementById('checkemail').hidden = true;
    document.getElementById('checkpassword').hidden = true;
    document.getElementById('emailexists').hidden = true;
    document.getElementById('passwordweak').hidden = true;
    document.getElementById('checkusername').hidden = true;
    document.getElementById('error').hidden = true;
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    firebase.database().ref('users/'+user.uid).get().then((snapshot) => {
      if (snapshot.val().tfa) {
        SecretCode = snapshot.val().tfacode;
        $('#tfa').modal('show');
      } else {
        window.location.href='index.htm';
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
        if (location.host === 'beta.infogare.fr') {
          checkBeta(user.uid);
        }
        this.user = user;
      } else {
        document.getElementById('mnu_login').hidden = false;
        document.getElementById('mnu_gares').hidden = true;
        document.getElementById('mnu_compte').hidden = true;
        document.getElementById('mnu_username').innerText = 'Non connecté';
        if (location.host === 'beta.infogare.fr') {
          checkBeta(user.uid);
        }
      }
    });
}

function sendPass(email) {
  firebase.auth().sendPasswordResetEmail(email).then(() => {
    alert('Un email de réinitialisation de votre mot de passe viens d\'être envoyé  à' + email + '!');
  });
}

function logout() {
    firebase.auth().signOut().then(() => {
      window.location.href="index.htm";
    }).catch((error) => {
      console.error(error.message);
    });
}

function checkTfa() {
  var pin = document.getElementById('tfa_code').value;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://www.authenticatorApi.com/Validate.aspx", true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send("pin="+pin+"&secretCode="+SecretCode);
  alert(xhr.reponseText);
}

function checkBeta(userid) {
  firebase.database().ref('users/'+userid).get().then((snapshot) => {
    if (!snapshot.val().beta) {
      window.location.replace('beta_access_refused.htm');
    }
  })
}