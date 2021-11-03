import { firebase } from './initializeFirebase';
import likePostAsync from './likePostAsync';
import makeQueryablePromise from './makeQueryablePromise';
import deletePostAsync from './deletePostAsync';

const onLikePost = (postRef) => {
    const likeRef = `${postRef}/likes/${firebase.auth().currentUser.uid}`;
    const request = makeQueryablePromise(likePostAsync(likeRef));
    request.then(
        () => console.log('passed'),
        () => console.log('failed')
    );
    setTimeout(() => {
        if (request.isPending()) {
            console.log('delete action');
            deletePostAsync(likeRef).then(
                () => console.log('delete passed'),
                () => console.log('delete failed')
            );
        }
    }, 10000);
};

export default onLikePost;
