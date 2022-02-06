import {
    REFRESHING_POSTS_INITIATED,
    REFRESHING_POSTS_SUCCESSFUL,
    REFRESHING_POSTS_FAILED,
} from './actionTypes';
import fetchPostsAsync from '../../helperFunctions/fetchPostsAsync';

export default function () {
    return async (dispatch) => {
        try {
            dispatch({ type: REFRESHING_POSTS_INITIATED });
            const posts = await fetchPostsAsync();
            dispatch({ type: REFRESHING_POSTS_SUCCESSFUL, payload: posts });
        } catch (err) {
            dispatch({ type: REFRESHING_POSTS_FAILED, payload: err.message });
        }
    };
}
