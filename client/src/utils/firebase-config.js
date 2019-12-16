import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCIfbVERIj2Z4QOs4ViuUns9Huv-yNlYbA",
  authDomain: "daw-devart.firebaseapp.com",
  databaseURL: "https://daw-devart.firebaseio.com",
  projectId: "daw-devart",
  storageBucket: "gs://daw-devart.appspot.com/",
  messagingSenderId: "553111564992",
  appId: "1:553111564992:web:3d26b83a1a7b088c"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const storageRef = firebase.storage().ref();