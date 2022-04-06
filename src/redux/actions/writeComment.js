import {
    INITIATE_COMMENT,
} from './actionTypes';
import { v1 as uuidv1 } from 'uuid';
import { auth } from '../../helperFunctions/initializeFirebase';
import commentOperation from './commentOperation';

const writeComment = (data, updatePostDetails) => async (dispatch) => {
    if (auth.currentUser.uid && auth.currentUser.displayName) {
        dispatch({
            type: INITIATE_COMMENT,
        });
        const commentID = uuidv1();
        const docObj = {
            ...data,
            owner: auth.currentUser.uid,
            createdAt:  Date.now(),
            username: auth.currentUser.displayName,
            likes: [],
        };
        await commentOperation(dispatch, data, docObj, commentID,  updatePostDetails);
    }
};

export default writeComment;
