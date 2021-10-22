import { firebase } from '../helperFunctions/initializeFirebase';

const signUpWithGoogleCredential = (id_token) => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const credential = googleProvider.credential(id_token);
    console.log('credential', credential);
    return firebase.auth().signInWithCredential(credential);
};

export default signUpWithGoogleCredential;
