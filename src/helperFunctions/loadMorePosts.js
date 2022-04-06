export const ON_END_REACHED = 'ON_END_REACHED';
export const RETRY_LOAD_MORE_POSTS = 'RETRY_LOAD_MORE_POSTS';
import { noPost } from './processErrorString';

export default function onEndOfPostsReached(
    action,
    loadingPosts,
    loadingPostsError,
    fetchPosts,
    lastPostID,
    searching,
    postsNotEmpty
) {
    const loadingPostsErrorNotNoPosts =
        loadingPostsError && loadingPostsError !== noPost;

    switch (action) {
        case RETRY_LOAD_MORE_POSTS:
            !searching &&
                !loadingPosts &&
                loadingPostsErrorNotNoPosts &&
                fetchPosts(lastPostID);
            return;
        case ON_END_REACHED:
            !searching &&
                !loadingPosts &&
                !loadingPostsError &&
                postsNotEmpty &&
                fetchPosts(lastPostID);
            return;
        default:
            return;
    }
}
