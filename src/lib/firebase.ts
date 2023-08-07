import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDmu7Nyn2QwPm0-z2W8p3uSWZyU4bAA1wU",
    authDomain: "changelingvr-web.firebaseapp.com",
    projectId: "changelingvr-web",
    storageBucket: "changelingvr-web.appspot.com",
    messagingSenderId: "296491725010",
    appId: "1:296491725010:web:0312e0677ac3514f1efd0b",
    measurementId: "G-QTK10Z84J1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
