import { firebase } from './initializeFirebase';

// eslint-disable-next-line no-undef
export default signOutUser = () => {
    return firebase.auth().signOut();
};
