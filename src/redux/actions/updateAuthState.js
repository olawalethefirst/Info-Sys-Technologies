import { onAuthStateChanged } from 'firebase/auth';
import { UPDATE_USER } from './actionTypes';
import { auth } from '../../helperFunctions/initializeFirebase';

const updateAuthState = (dispatch) => {
    onAuthStateChanged(auth, (user) => {
        dispatch({
            type: UPDATE_USER,
            payload: {
                uid: user?.uid,
                username: user?.displayName,
            },
        });
    });
};

export default updateAuthState;
