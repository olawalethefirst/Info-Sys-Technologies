import createDocAsync from '../../helperFunctions/createDocAsync';
import {
    POST_SUCCESSFUL,
    CLEAR_POST_SUCCESSFUL,
    POST_FAILED,
} from './actionTypes';
import timerPromiseAsync from '../../helperFunctions/timerPromiseAsync';

export default async function writeOperation(dispatch, docObj, postID, data) {
    try {
        await createDocAsync(docObj, ['posts', postID]);
        dispatch({
            type: POST_SUCCESSFUL,
            payload: {
                ...docObj,
                postID,
                searchField:
                    docObj.category + '. ' + docObj.title + '. ' + docObj.body,
            },
        });
        await timerPromiseAsync(2000);
        dispatch({
            type: CLEAR_POST_SUCCESSFUL,
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: POST_FAILED,
            payload: data,
        });
    }
}
