import { auth } from './initializeFirebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const signInWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export default signInWithEmail;
