import { firebase } from '../helperFunctions/initializeFirebase';

const createPostAsync = (postRef, category, title, body) => {
    return firebase.firestore().doc(postRef).set({
        postOwner: firebase.auth().currentUser.uid,
        category,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        title: title,
        body: body,
    });
};

export default createPostAsync;
