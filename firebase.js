import firebase from 'firebase';
import 'firebase/firestore';

class Fire {
    constructor() {
        firebase.initializeApp({
            apiKey: "AIzaSyDvFMj6Li159dxnhmjQJqvLz1Fz2RUQAVI",
            authDomain: "iknknt-gasample-dev.firebaseapp.com",
            databaseURL: "https://iknknt-gasample-dev.firebaseio.com",
            projectId: "iknknt-gasample-dev",
            storageBucket: "gs://iknknt-gasample-dev.appspot.com",
            messagingSenderId: "1036920385462",
            appId: "1:1036920385462:web:480a3ea27f61439b3ddb17",
            measurementId: "G-NKFHNL5Q63"    
        });

        firebase.auth().onAuthStateChanged(user => {
            if(!user) {
                firebase.auth().signInAnonymously();
            }
        });
    }

    getPosts = async () => {
        const querySnapshot => await this.postCollection.get();
        const res = [];
        querySnapshot.forEach(doc => {
            res.push(doc.data());
        });
        return res;
    };

    get userCollection() {
        return firebase.firestore().collection('users');
    }

    get postCollection() {
        return this.userCollection.doc(this.uid).collection('posts');
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
}
Fire.shared = new Fire();
export default Fire;