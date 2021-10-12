import { firebase } from './initializeFirebase';

const updateUsername = async (username) => {
    try {
        await firebase.auth().currentUser?.updateProfile({
            displayName: 'AbdulQudusuuuuhu',
        });
        return { successful: true };
    } catch (err) {
        return { successful: false };
    }
};

export default updateUsername;
