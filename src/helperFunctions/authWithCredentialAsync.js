import { firebase } from '../helperFunctions/initializeFirebase';

// eslint-disable-next-line no-undef
export default authWithGoogleCredentialAsync = async (credential) => {
    return firebase.auth().signInWithCredential(credential);
};
