import { firebase } from './initializeFirebase';
import likePostAsync from './likePostAsync';
import makeQueryablePromise from './makeQueryablePromise';

const onLikePost = (postID) => {
    console.log('started again');
    const postRef = `/posts/${postID}`;
    const postObj = {};
    postObj[`likes.${firebase.auth().currentUser.uid}`] = true;

    const request = makeQueryablePromise(likePostAsync(postRef, postObj));
    request.then(
        () => console.log('write passed', Date.now()),
        () => console.log('write failed')
    );
    setTimeout(() => {
        if (request.isPending()) {
            console.log('delete action');
            postObj[`likes.${firebase.auth().currentUser.uid}`] =
                firebase.firestore.FieldValue.delete();
            likePostAsync(postRef, postObj).then(
                () => console.log('delete passed'),
                () => console.log('delete failed')
            );
        }
    }, 5000);
};

export default onLikePost;
