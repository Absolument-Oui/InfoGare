import React from 'react';
import ReactDOM from 'react-dom/client';

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

import App from './App';


const fbapp = initializeApp({
	apiKey: "AIzaSyCWi0EChm97lofJrhqBp6wRRtgQGKq8IEg",
	authDomain: "infogares-f.firebaseapp.com",
	databaseURL: "https://infogares-f-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "infogares-f",
	storageBucket: "infogares-f.appspot.com",
	messagingSenderId: "984551924335",
	appId: "1:984551924335:web:7a6ba46c0cafd4f8eb639a",
	measurementId: "G-54QXGBEX7E"
});

const analytics = getAnalytics(fbapp);

const db = getDatabase(fbapp);
const auth = getAuth(fbapp);

const root = ReactDOM.createRoot(document.getElementById('root'));

auth.onAuthStateChanged(user => {
	root.render(<App user={user} auth={auth} />);
});

if (document.location.search) {
	const params = new URLSearchParams(document.location.search);
	if (params.has('token')) {
		signInWithCustomToken(auth, params.get('token')).then(() => {
			document.location.href = document.location.pathname;
		}).catch(error => {
			console.error(error);
		});
	}
}