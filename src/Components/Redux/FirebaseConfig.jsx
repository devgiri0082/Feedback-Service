import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyAPvOfz8f9yLrJUcuvlTGtkwg0ubnkHt1M",
    authDomain: "feedback-service-47977.firebaseapp.com",
    projectId: "feedback-service-47977",
    storageBucket: "feedback-service-47977.appspot.com",
    messagingSenderId: "1006284922631",
    appId: "1:1006284922631:web:3bdf9cb053fefa1709efa2"
};

firebase.initializeApp(firebaseConfig);

export let db = firebase.firestore();
