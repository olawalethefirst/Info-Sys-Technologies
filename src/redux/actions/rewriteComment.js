import { RESET_COMMENT_FAILED } from './actionTypes';
import { v1 as uuidv1 } from 'uuid';
import { auth } from '../../helperFunctions/initializeFirebase';
import commentOperation from './commentOperation';

const rewriteComment = () => async (dispatch, getState) => {
    if (auth.currentUser.uid && auth.currentUser.displayName) {
        const data = getState().forumTempState.commentData;
        dispatch({
            type: RESET_COMMENT_FAILED,
        });
        const docObj = {
            ...data,
            owner: auth.currentUser.uid,
            createdAt: Date.now(),
            username: auth.currentUser.displayName,
            likes: [],
        };
        const commentID = uuidv1();
        commentOperation(dispatch, data, docObj, commentID);
    }
};

export default rewriteComment;
