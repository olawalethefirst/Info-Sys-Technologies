import createPostWithTimerAsync from '../../helperFunctions/createPostWithTimerAsync';
import {
    POST_SUCCESSFUL,
    CLEAR_POST_SUCCESSFUL,
    POST_FAILED,
    RESET_POST_FAILED,
} from './actionTypes';
import deletePostAsync from '../../helperFunctions/deletePostAsync';
import { v4 as uuidv4 } from 'uuid';
import timerPromiseAsync from '../../helperFunctions/timerPromiseAsync';

const rewritePost = () => async (dispatch, getState) => {
    dispatch({
        type: RESET_POST_FAILED,
    });
    const postID = uuidv4();
    try {
        await createPostWithTimerAsync(
            { ...getState().forumTempState.postData, postID },
            3000
        );
        dispatch({ type: POST_SUCCESSFUL });
        await timerPromiseAsync(2000);
        dispatch({
            type: CLEAR_POST_SUCCESSFUL,
        });
    } catch {
        deletePostAsync(postID);
        dispatch({
            type: POST_FAILED,
        });
    }
};

export default rewritePost;
