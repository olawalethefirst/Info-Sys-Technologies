import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import FIREBASE_CONFIG from '../../config';
// import Constants from 'expo-constants';

initializeApp(FIREBASE_CONFIG);

// if (__DEV__) {
//     console.log('Switching to local Firebase instance...');
//     const origin = Constants.manifest.debuggerHost.split(':').shift();

//     console.log(origin);
//     const host = `${origin}:8080`;
//     console.log(host);
//     // firebase.auth().useEmulator(`${origin}:9099/`);
//     firebase.firestore().settings({ host, ssl: false });
//     // firebase.functions().useEmulator(origin, 5001);
// }

const auth = getAuth();
const firestore = getFirestore();

function updateAuthState(actionCreator) {
    onAuthStateChanged(auth, (user) => {
        console.log('auth changed', user);
        actionCreator(
            user ? { uid: user.uid, username: user.displayName } : user
        );
    });
}

export { updateAuthState, firestore, auth };
