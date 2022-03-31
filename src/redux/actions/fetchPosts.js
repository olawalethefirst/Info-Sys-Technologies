import {
    LOADING_POSTS_INITIATED,
    LOADING_POSTS_FAILED,
    LOADING_POSTS_SUCCESSFUL,
    LOADING_POSTS_FIRST_BATCH_SUCCESSFUL,
} from './actionTypes';
import fetchPostsAsync from './fetchPostsAsync';

export default function fetchPosts(lastPost) {
    return async (dispatch) => {
        try {
            dispatch({ type: LOADING_POSTS_INITIATED });
            const posts = await fetchPostsAsync(lastPost, dispatch);
            dispatch({
                type: lastPost
                    ? LOADING_POSTS_SUCCESSFUL
                    : LOADING_POSTS_FIRST_BATCH_SUCCESSFUL,

                payload: posts,
            });
        } catch (e) {
            dispatch({ type: LOADING_POSTS_FAILED, payload: e.code });
        }
    };
}
