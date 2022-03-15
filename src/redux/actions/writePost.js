import createPostWithTimerAsync from '../../helperFunctions/createPostWithTimerAsync';
import {
    POST_SUCCESSFUL,
    CLEAR_POST_SUCCESSFUL,
    POST_FAILED,
    INITIATE_POST,
} from './actionTypes';
import deletePostAsync from '../../helperFunctions/deletePostAsync';
import { v4 as uuidv4 } from 'uuid';
import timerPromiseAsync from '../../helperFunctions/timerPromiseAsync';

const writePost = (data) => async (dispatch) => {
    dispatch({
        type: INITIATE_POST,
        payload: data,
    });
    const postID = uuidv4();
    try {
        await createPostWithTimerAsync({ ...data, postID }, 5000);
        dispatch({ type: POST_SUCCESSFUL });
        await timerPromiseAsync(2000);
        dispatch({
            type: CLEAR_POST_SUCCESSFUL,
        });
    } catch (err) {
        deletePostAsync(postID);
        dispatch({
            type: POST_FAILED,
        });
    }
};

export default writePost;
