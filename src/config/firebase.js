import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyBfG3yrOOKbBPdCjvSs6zrp_PMw1Fh07ik",
    authDomain: "amnis-bc042.firebaseapp.com",
    databaseURL: "https://amnis-bc042.firebaseio.com",
    projectId: "amnis-bc042",
    storageBucket: "amnis-bc042.appspot.com",
    messagingSenderId: "643844816586",
    appId: "1:643844816586:web:47e10121fe3bd40503be33"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;