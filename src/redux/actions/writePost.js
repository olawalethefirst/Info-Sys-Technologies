import { INITIATE_POST } from './actionTypes';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '../../helperFunctions/initializeFirebase';
import postOperation from './postOperation';

const writePost = (data) => async (dispatch) => {
    if (auth.currentUser.displayName && auth.currentUser.uid) {
        dispatch({
            type: INITIATE_POST,
        });
        const docObj = {
            ...data,
            owner: auth.currentUser.uid,
            username: auth.currentUser.displayName,
            likes: {},
            createdAt: Date.now(),
        };
        const postID = uuidv4();
        postOperation(dispatch, docObj, postID, data);
    }
};

export default writePost;
