import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import FIREBASE_CONFIG from '../../config';

initializeApp(FIREBASE_CONFIG);

const auth = getAuth();
const firestore = getFirestore();

console.log(auth.currentUser);

export { firestore, auth };
