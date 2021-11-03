import { firebase } from './initializeFirebase';

const createCommentAsync = (commentID, mention, parentPost, comment) => {
    // mention is an object containing a mention field and uid value else empty
    return firebase
        .firestore()
        .doc(`/comments/${commentID}`)
        .set({
            ...mention,
            parentPost,
            owner: firebase.auth().currentUser.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            comment,
        });
};

export default createCommentAsync;
