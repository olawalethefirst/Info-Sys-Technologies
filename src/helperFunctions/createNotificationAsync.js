import { firebase } from '../helperFunctions/initializeFirebase';

const createNotificationAsync = (
    type,
    receivers,
    interactionReferenceID,
    ancestryPostIDs
) => {
    return firebase
        .firestore()
        .collection('notification')
        .add({
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            type,
            from: firebase.auth().currentUser.uid,
            receivers,
            interactionReferenceID,
            ...ancestryPostIDs,
        });
};

export default createNotificationAsync;
