import { firebase } from './initializeFirebase';

const deleteCommentAsync = (commentID) => {
    return firebase.firestore().doc(`comments/${commentID}`).delete();
};

export default deleteCommentAsync;
