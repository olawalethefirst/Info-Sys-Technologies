import { auth } from './initializeFirebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const signUpWihthEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export default signUpWihthEmail;
