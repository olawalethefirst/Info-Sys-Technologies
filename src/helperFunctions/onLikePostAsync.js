import { firebase } from './initializeFirebase';
import likePostAsync from './likePostAsync';
import makeQueryablePromise from './makeQueryablePromise';
import NetInfo from '@react-native-community/netinfo';

const onLikePostAsync = async (postID, tempUID) => {
    return NetInfo.fetch().then((state) => {
        if (state.isConnected) {
            const postRef = `/posts/${postID}`;
            const postObj = {};
            const createdAt = new Date();
            postObj['likes'] = firebase.firestore.FieldValue.arrayUnion({
                // uid: firebase.auth().currentUser.uid,
                uid: tempUID,
                createdAt: firebase.firestore.Timestamp.fromDate(createdAt),
            });
            // record timeStamp at moment user clicks like, and also moment it receives response, if it surpasses 5s duration, reject likeSuccessful, and unlike. apply same logic at firebase secuity rule level

            const request = makeQueryablePromise(
                likePostAsync(postRef, postObj)
            );

            // setTimeout(() => {
            //     if (request.isPending()) {
            //         console.log('delete action');
            //         throw new Error('failed');
            //     }
            // }, 5000);
            return request.then(() => ({ createdAt, resolvedAt: new Date() }));
        } else {
            throw new Error('failed');
        }
    });
};

export default onLikePostAsync;
