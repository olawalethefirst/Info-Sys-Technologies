import { firebase } from './initializeFirebase';

const signOutUser = async () => {
    try {
        await firebase.auth().signOut();
        return { successful: true };
    } catch (err) {
        return { successful: false };
    }
};

export default signOutUser;
