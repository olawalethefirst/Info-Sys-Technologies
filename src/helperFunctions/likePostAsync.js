import { firebase } from './initializeFirebase';

const likePostAsync = (likeRef) => {
    return firebase.firestore().doc(likeRef).set({
        username: firebase.auth().currentUser.displayName,
    });
};

export default likePostAsync;
