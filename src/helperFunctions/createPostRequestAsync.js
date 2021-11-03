import { firebase } from './initializeFirebase';

const createPostRequestAsync = (postID) => {
    return firebase
        .firestore()
        .doc(`/postRequests/${firebase.auth().currentUser.uid}`)
        .set({
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            postID,
        });
};

export default createPostRequestAsync;
