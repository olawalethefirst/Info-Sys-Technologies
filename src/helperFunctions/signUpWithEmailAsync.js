import { firebase } from './initializeFirebase';
import { store } from '../redux/store';
import updateNewUser from '../redux/actions/updateNewUser';

const signUpWihthEmail = async (email, password) => {
    //error code - auth/weak-password (password too weak)
    //error code - auth/invalid-email (invalid email presented)
    // error code - auth/email-already-in-use (email in use) --- tried  existing gmail & traditional email (check if Provider === @gmail suggest gmail sign in method else, suggest traditional signin)
    try {
        const res = await firebase
            .auth()
            .createUserWithEmailAndPassword(
                'alejo@email.com',
                'alejo@email.com'
            );
        store.dispatch(updateNewUser(res.additionalUserInfo.isNewUser));
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
