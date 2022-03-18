import createCommentWithTimerAsync from '../../helperFunctions/createCommentWithTimerAsync';
import {
    COMMENT_SUCCESSFUL,
    CLEAR_COMMENT_SUCCESSFUL,
    COMMENT_FAILED,
    RESET_COMMENT_FAILED,
} from './actionTypes';
import deleteCommentAsync from '../../helperFunctions/deleteCommentAsync';
import { v4 as uuidv4 } from 'uuid';
import timerPromiseAsync from '../../helperFunctions/timerPromiseAsync';

const rewriteComment = () => async (dispatch, getState) => {
    dispatch({
        type: RESET_COMMENT_FAILED,
    });
    const commentID = uuidv4();
    try {
        await createCommentWithTimerAsync(
            { ...getState().forumTempState.commentData, commentID },
            1500
        );
        dispatch({ type: COMMENT_SUCCESSFUL });
        await timerPromiseAsync(1000);
        dispatch({
            type: CLEAR_COMMENT_SUCCESSFUL,
        });
    } catch (err) {
        console.log('error: ', err);
        deleteCommentAsync(commentID);
        dispatch({
            type: COMMENT_FAILED,
        });
    }
};

export default rewriteComment;
