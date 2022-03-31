import createDocAsync from '../../helperFunctions/createDocAsync';
import {
    COMMENT_SUCCESSFUL,
    CLEAR_COMMENT_SUCCESSFUL,
    COMMENT_FAILED,
} from './actionTypes';
import timerPromiseAsync from '../../helperFunctions/timerPromiseAsync';

export default async function commentOperation(
    dispatch,
    data,
    docObj,
    commentID
) {
    try {
        await createDocAsync(docObj, ['comments', commentID]);
        dispatch({ type: COMMENT_SUCCESSFUL });
        await timerPromiseAsync(1000);
        dispatch({
            type: CLEAR_COMMENT_SUCCESSFUL,
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: COMMENT_FAILED,
            payload: data,
        });
        
    }
}
