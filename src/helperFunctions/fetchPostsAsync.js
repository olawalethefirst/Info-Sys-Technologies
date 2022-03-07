import getPostsSnapshot from './getPostsSnapshot';
import { noPost } from './processErrorString';

export default async function fetchPostsAsync(lastPost) {
    const postsSnapshot = await getPostsSnapshot(lastPost);
    if (postsSnapshot.size) {
        return postsSnapshot.docs.map((doc) => {
            const data = doc.data();
            const { category, title, body } = data;
            return {
                postID: doc.ref.id,
                searchField: category + '. ' + title + '. ' + body,
                ...data,
            };
        });
    } else {
        throw new Error(noPost);
    }
}
