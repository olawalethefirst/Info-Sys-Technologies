import { firestore } from './initializeFirebase';
import {
    collection,
    orderBy,
    limit,
    query,
    doc,
    startAfter,
    getDocFromServer,
    getDocsFromServer,
} from 'firebase/firestore';

export default async function getPostsSnapshot(lastPostID) {
    if (lastPostID) {
        query(
            collection(firestore, 'posts'),
            orderBy('createdAt', 'desc'),
            limit(20)
        );

        const lastPostSnapshot = await getDocFromServer(
            doc(firestore, 'posts', lastPostID)
        );
        const postsQuery = query(
            collection(firestore, 'posts'),
            orderBy('createdAt', 'desc'),
            startAfter(lastPostSnapshot),
            limit(20)
        );
        return getDocsFromServer(postsQuery);
    } else {
        const postsQuery = query(
            collection(firestore, 'posts'),
            orderBy('createdAt', 'desc'),
            limit(20)
        );
        return getDocsFromServer(postsQuery);
    }
}
