import getPostsSnapshot from './getPostsSnapshot';
import { noPost } from './processErrorString';

export default async function fetchPostsAsync(lastPost) {
    const postsSnapshot = await getPostsSnapshot(lastPost);
    if (postsSnapshot.size) {
        return postsSnapshot.docs.map((doc) => ({
            postID: doc.ref.id,
            ...doc.data(),
        }));
    } else {
        throw new Error(noPost);
    }
}
