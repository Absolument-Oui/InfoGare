firebase.auth().languageCode = 'fr';

var user = undefined;

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
    window.location.href='index.htm';
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
            window.location.href = 'index.htm';
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
        }else if (errorCode == 'invelid-email') {
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
        this.user = user
      } else {
        document.getElementById('mnu_login').hidden = false;
      }
    });
}