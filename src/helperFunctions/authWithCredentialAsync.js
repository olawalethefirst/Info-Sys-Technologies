import { signInWithCredential } from 'firebase/auth';
import { auth } from './initializeFirebase';

// eslint-disable-next-line no-undef
export default authWithGoogleCredentialAsync = async (credential) => {
    return signInWithCredential(auth, credential);
};
