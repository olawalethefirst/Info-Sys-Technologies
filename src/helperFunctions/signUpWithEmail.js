import { firebase } from './initializeFirebase';

const signUpWihthEmail = async (email, password) => {
    try {
        await firebase
            .auth()
            .createUserWithEmailAndPassword(
                'emxssxasaail@email.com',
                'password'
            );
        return { successful: true };
    } catch (err) {
        const errorCode = err.code;
        if (
            errorCode == 'auth/weak-password' ||
            errorCode == 'auth/email-already-in-use'
        ) {
            return { successful: false, message: err.message };
        } else {
            return {
                successful: false,
                message: 'An error occurred, please try again',
            };
        }
    }
};

export default signUpWihthEmail;
