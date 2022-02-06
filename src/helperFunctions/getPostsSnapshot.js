import { firebase } from './initializeFirebase';

export default async function getPostsSnapshot(lastPostID) {
    if (lastPostID) {
        const lastPostRef = await firebase
            .firestore()
            .doc(`posts/${lastPostID}`)
            .get();
        const postsSnapshot = await firebase
            .firestore()
            .collection('/posts')
            .orderBy('createdAt', 'desc')
            .startAfter(lastPostRef)
            .limit(20)
            .get();
        return postsSnapshot;
    } else {
        const postsSnapshot = await firebase
            .firestore()
            .collection('/posts')
            .orderBy('createdAt', 'desc')
            .limit(20)
            .get()
        return postsSnapshot;
    }
}
