import {
    INITIATE_COMMENT,
} from './actionTypes';
import { v1 as uuidv1 } from 'uuid';
import { auth } from '../../helperFunctions/initializeFirebase';
import commentOperation from './commentOperation';

const writeComment = (data) => async (dispatch) => {
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
        commentOperation(dispatch, data, docObj, commentID );
    }
};

export default writeComment;
