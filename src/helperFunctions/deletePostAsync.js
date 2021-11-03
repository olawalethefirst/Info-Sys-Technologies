import { firebase } from './initializeFirebase';

const deletePostAsync = (postID) => {
    return firebase.firestore().doc(`posts/${postID}`).delete();
};

export default deletePostAsync;
