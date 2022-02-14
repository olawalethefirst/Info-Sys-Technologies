import { auth } from './initializeFirebase';

// eslint-disable-next-line no-undef
export default signOutUser = () => {
    return auth.signOut();
};
