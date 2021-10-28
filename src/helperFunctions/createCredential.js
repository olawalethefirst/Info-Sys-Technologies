import { firebase } from '../helperFunctions/initializeFirebase';

// eslint-disable-next-line no-undef
export default createCredential = (idToken) => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return googleProvider.credential(idToken);
};
