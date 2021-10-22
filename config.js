import {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
    googleClientID,
} from '@env';

const FIREBASE_CONFIG = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
};

const clientId = { googleClientID };

export default FIREBASE_CONFIG;
export { clientId };
