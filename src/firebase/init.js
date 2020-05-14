import firebase from "firebase/app"
import 'firebase/analytics' 

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey // HIDDEN SECRETS
    authDomain: // HIDDEN SECRETS
    databaseURL: // HIDDEN SECRETS
    projectId: // HIDDEN SECRETS
    storageBucket: // HIDDEN SECRETS
    messagingSenderId: // HIDDEN SECRETS
    appId: // HIDDEN SECRETS
    measurementId: // HIDDEN SECRETS    
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebaseApp.firestore().settings({ timestampsInSnapshots: true })
firebase.analytics();

export default firebaseApp.firestore()