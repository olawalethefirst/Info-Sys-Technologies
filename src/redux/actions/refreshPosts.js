import {
    REFRESHING_POSTS_INITIATED,
    REFRESHING_POSTS_SUCCESSFUL,
    REFRESHING_POSTS_FAILED,
} from './actionTypes';
import fetchPostsAsync from './fetchPostsAsync';

export default function refreshPosts() {
    console.log('refreshing');
    return async (dispatch) => {
        try {
            dispatch({ type: REFRESHING_POSTS_INITIATED });
            const posts = await fetchPostsAsync(null, dispatch);
            console.log('returned');
            dispatch({ type: REFRESHING_POSTS_SUCCESSFUL, payload: posts });
        } catch (e) {
            dispatch({ type: REFRESHING_POSTS_FAILED, payload: e.code });
        }
    };
}
