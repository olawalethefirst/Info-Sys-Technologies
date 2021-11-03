import { firebase } from './initializeFirebase';

const updatePostAsync = (postID, body) => {
    return firebase.firestore().doc(`/posts/${postID}`).update({
        body,
    });
};

export default updatePostAsync;
