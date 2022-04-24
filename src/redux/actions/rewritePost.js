import { RESET_POST_FAILED } from './actionTypes';
import { v1 as uuidv1 } from 'uuid';
import { auth } from '../../helperFunctions/initializeFirebase';
import postOperation from './postOperation';

const rewritePost = () => async (dispatch, getState) => {
    if (auth.currentUser.displayName && auth.currentUser.uid) {
        const data = getState().forumTempState.postData;
        dispatch({
            type: RESET_POST_FAILED, //after retrieving data cos action resets stored data
        });
        const docObj = {
            ...data,
            owner: auth.currentUser.uid,
            username: auth.currentUser.displayName,
            likes: {},
            createdAt: Date.now(),
        };
        const postID = uuidv1();
        postOperation(dispatch, docObj, postID, data);
    }
};

export default rewritePost;
