import { firebase } from './initializeFirebase';

const updateUserDatabaseAsync = (lastSeenNotification) => {
    return firebase
        .firestore()
        .doc(`/users/${firebase.auth().currentUser.uid}`)
        .update({
            lastSeenNotification,
        });
};

export default updateUserDatabaseAsync;
