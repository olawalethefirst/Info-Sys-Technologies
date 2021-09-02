import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { INITIALIZED_FIREBASE } from './actionTypes';
import config from '../../../config';

//Initialize Firebase
export function initializeFirebase() {
    return (dispatch) => {
        const firebaseConfig = config.FIREBASE_CONFIG;
        firebase.apps.length
            ? firebase.app()
            : firebase.initializeApp(firebaseConfig);
        dispatch({ type: INITIALIZED_FIREBASE });
    };
}

//Get current logged in user
