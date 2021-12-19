import { firebase } from './initializeFirebase';

const signUpWihthEmail = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export default signUpWihthEmail;
