import { firebase } from '../helperFunctions/initializeFirebase';

const createPostAsync = (postID, category, title, body) => {
    return firebase.firestore().doc(`/posts/${postID}/`).set({
        owner: firebase.auth().currentUser.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        title,
        body,
        category,
        edited: false,
    });
};

export default createPostAsync;
