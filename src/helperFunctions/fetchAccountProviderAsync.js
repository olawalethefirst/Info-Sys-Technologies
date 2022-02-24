import { auth } from './initializeFirebase';
import { fetchSignInMethodsForEmail } from 'firebase/auth';

const fetchAccountProvider = async (email) => {
    return fetchSignInMethodsForEmail(auth, email);
};

export default fetchAccountProvider;
