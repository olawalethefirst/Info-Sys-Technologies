import { GoogleAuthProvider } from 'firebase/auth';

// eslint-disable-next-line no-undef
export default createCredential = (idToken) => {
    return GoogleAuthProvider.credential(idToken);
};
