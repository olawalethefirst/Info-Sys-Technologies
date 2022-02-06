export default function onEndOfPostsReached(
    loadingPosts,
    loadingPostsError,
    fetchPosts,
    lastPostID,
    searching,
    onEndReached
) {
    //adding conditions for fetching is important to avoid repetitive fetchs
    if (onEndReached) {
        return (
            !searching &&
            !loadingPosts &&
            !loadingPostsError &&
            fetchPosts(lastPostID)
        );
    } else return !searching && !loadingPosts && fetchPosts(lastPostID);
}
