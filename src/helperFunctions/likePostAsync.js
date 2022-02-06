import { firebase } from './initializeFirebase'

const likePostAsync = (postRef, postObj) => {
    return firebase.firestore().doc(postRef).update(postObj);
};

export default likePostAsync;
