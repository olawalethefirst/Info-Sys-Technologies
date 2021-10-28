import {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
    googleClientID,
    databaseURL,
} from '@env';

const FIREBASE_CONFIG = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
    databaseURL,
};

const clientId = { googleClientID };

export default FIREBASE_CONFIG;
export { clientId };
