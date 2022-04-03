// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

var firebaseConfig;

if (location.host === 'infogare.fr') {
    firebaseConfig = {
        apiKey: "AIzaSyCWi0EChm97lofJrhqBp6wRRtgQGKq8IEg",
        authDomain: "infogares-f.firebaseapp.com",
        databaseURL: "https://infogares-f-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "infogares-f",
        storageBucket: "infogares-f.appspot.com",
        messagingSenderId: "984551924335",
        appId: "1:984551924335:web:247f2050a8ac4d68eb639a",
        measurementId: "G-DRFJP2SFJ1"
    };
} else if (location.host === 'beta.infogare.fr' || location.host === 'localhost:8080') {
    firebaseConfig = {
        apiKey: "AIzaSyCWi0EChm97lofJrhqBp6wRRtgQGKq8IEg",
        authDomain: "infogares-f.firebaseapp.com",
        projectId: "infogares-f",
        storageBucket: "infogares-f.appspot.com",
        messagingSenderId: "984551924335",
        appId: "1:984551924335:web:7a6ba46c0cafd4f8eb639a",
        measurementId: "G-DRFJP2SFJ1",
        databaseURL: "https://infogares-f-default-rtdb.europe-west1.firebasedatabase.app/"
    };
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


