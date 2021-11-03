import { firebase } from './initializeFirebase';

const createUserDatabaseAsync = (username) => {
    return firebase
        .firestore()
        .doc(`/users/${firebase.auth().currentUser.uid}`)
        .set({
            username: username,
            lastSeenNotification:
                firebase.firestore.FieldValue.serverTimestamp(),
        });
};

export default createUserDatabaseAsync;
