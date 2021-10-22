import { firebase } from './initializeFirebase';

const signInWithEmail = async () => {
    //Check users provider before initiating flow

    //err.code - auth/user-not-found (User not found) -- suggest sign up (This may be avoided by confirming provider before initiating flow - will not require to account for in response)
    //err.code - auth/wrong-password (invalid password) - report invalid email or password
    //err.code - auth/invalid-email (invalid email) - report invalid email or password

    const auth = firebase.auth();

    try {
        await auth.signInWithEmailAndPassword('emxssxasaail@email.co', 'pa');
        return { successful: true };
    } catch (err) {
        console.log(err.code);
        return { successful: false, error: err.code };
    }
};

export default signInWithEmail;
