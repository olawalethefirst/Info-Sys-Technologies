import { firebase } from './initializeFirebase';

export default function getPosts(firstBatch, mostRecentUpdate, lastPostRef) {
    if (firstBatch) {
        return firebase
            .firestore()
            .collection('posts')
            .orderBy('createdAt', 'desc')
            .limit(25)
            .get();
    }
    if (mostRecentUpdate) {
        return;
    }
    return firebase
        .firestore()
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .startAfter(lastPostRef)
        .limit(25)
        .get();
}
