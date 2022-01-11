import { firebase } from '../helperFunctions/initializeFirebase';

const createPostAsync = (title, body, category, postID) => {
    return firebase.firestore().doc(`/posts/${postID}/`).set({
        owner: firebase.auth().currentUser.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        title,
        body,
        category,
    });
};

export default createPostAsync;
