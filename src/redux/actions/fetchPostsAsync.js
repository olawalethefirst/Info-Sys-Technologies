import getPostsSnapshot from '../../helperFunctions/getPostsSnapshot';
import { noPost } from '../../helperFunctions/processErrorString';
import { EMPTY_POSTS_DATABASE } from './actionTypes';

export default async function fetchPostsAsync(lastPost, dispatch) {
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
        if (!lastPost) {
            dispatch({ type: EMPTY_POSTS_DATABASE });
        }
        throw new Error(noPost);
    }
}
