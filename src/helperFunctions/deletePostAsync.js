import { firebase } from './initializeFirebase';

const deletePostAsync = (postRef) => {
    return firebase.firestore().doc(postRef).delete();
};

export default deletePostAsync;
