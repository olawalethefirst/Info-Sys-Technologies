export const ON_END_REACHED = 'ON_END_REACHED';
export const RETRY_LOAD_MORE_POSTS = 'RETRY_LOAD_MORE_POSTS';

export default function onEndOfPostsReached(
    action,
    loadingPosts,
    loadingPostsError,
    fetchPosts,
    lastPostID,
    searching,
) {
    switch (action) {
        case RETRY_LOAD_MORE_POSTS:
            !searching && !loadingPosts && fetchPosts(lastPostID);
            return;
        case ON_END_REACHED:
            !searching &&
                !loadingPosts &&
                !loadingPostsError &&
                fetchPosts(lastPostID);
            return;
        default:
            return;
    }
}
