import createCommentWithTimerAsync from '../../helperFunctions/createCommentWithTimerAsync';
import {
    COMMENT_SUCCESSFUL,
    CLEAR_COMMENT_SUCCESSFUL,
    COMMENT_FAILED,
    INITIATE_COMMENT,
} from './actionTypes';
import deleteCommentAsync from '../../helperFunctions/deleteCommentAsync';
import { v4 as uuidv4 } from 'uuid';
import timerPromiseAsync from '../../helperFunctions/timerPromiseAsync';

const writeComment = (data) => async (dispatch) => {
    dispatch({
        type: INITIATE_COMMENT,
        payload: data,
    });
    const commentID = uuidv4();
    try {
        await createCommentWithTimerAsync({ ...data, commentID }, 3000);
        dispatch({ type: COMMENT_SUCCESSFUL });
        await timerPromiseAsync(1000);
        dispatch({
            type: CLEAR_COMMENT_SUCCESSFUL,
        });
    } catch (err) {
        console.log(err)
        deleteCommentAsync(commentID);
        dispatch({
            type: COMMENT_FAILED,
        });
    }
};

export default writeComment;
