import { firebase } from './initializeFirebase';

const deleteLikeAsync = (parentPostType, parentPostID) => {
    return firebase
        .firestore()
        .doc(
            `/${parentPostType}s/${parentPostID}/likes/${
                firebase.auth().currentUser.uid
            }`
        )
        .delete();
};

export default deleteLikeAsync;
