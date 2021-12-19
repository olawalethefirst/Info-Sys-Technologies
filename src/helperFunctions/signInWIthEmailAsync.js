import { firebase } from './initializeFirebase';

const signInWithEmail = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
};

export default signInWithEmail;
