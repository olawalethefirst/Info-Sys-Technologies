import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import FIREBASE_CONFIG from '../../config';

firebase.apps.length ? firebase.app() : firebase.initializeApp(FIREBASE_CONFIG);

export { firebase };
