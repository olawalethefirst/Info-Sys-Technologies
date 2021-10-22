import { firebase } from './initializeFirebase';

const signUpWihthEmail = async (email, password) => {
    //error code - auth/weak-password (password too weak)
    //error code - auth/invalid-email (invalid email presented)
    // error code - auth/email-already-in-use (email in use) --- tried  existing gmail & traditional email (check if Provider === @gmail suggest gmail sign in method else, suggest traditional signin)
    try {
        await firebase
            .auth()
            .createUserWithEmailAndPassword('emxssxasaail@email.com', '');
        return { successful: true };
    } catch (err) {
        console.log(err.code);
        return {
            successful: false,
            error: err.code ? err.code : 'unknown',
        };
    }
};

export default signUpWihthEmail;
