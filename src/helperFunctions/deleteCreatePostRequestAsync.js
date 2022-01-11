import { firebase } from './initializeFirebase';

export default function deleteCreatePostRequestAsync(postID) {
    return firebase.firestore().doc(`/posts/${postID}/`).delete();
}
