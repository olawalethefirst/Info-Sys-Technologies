import 'expo-firestore-offline-persistence';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import FIREBASE_CONFIG from '../../config';
// import Constants from 'expo-constants';

initializeApp(FIREBASE_CONFIG);


const auth = getAuth();
const firestore = getFirestore();

enableIndexedDbPersistence(firestore)
    .then(() => console.log('persistence enabled'))
    .catch(() => console.log('failed cos im probelmatic af'));


function updateAuthState(actionCreator) {
    onAuthStateChanged(auth, (user) => {
        actionCreator(
            user ? { uid: user.uid, username: user.displayName } : user
        );
    });
}

export { updateAuthState, firestore, auth };
