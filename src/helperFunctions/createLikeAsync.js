import { firebase } from './initializeFirebase';

const createLikeAsync = (parentPostType, parentPostID) => {
    // mention is an object containing a mention field and uid value else empty
    return firebase
        .firestore()
        .doc(
            `/${parentPostType}s/${parentPostID}/likes/${
                firebase.auth().currentUser.uid
            }`
        )
        .set({
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
};

export default createLikeAsync;
