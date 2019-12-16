import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
// censored :)
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const storageRef = firebase.storage().ref();
