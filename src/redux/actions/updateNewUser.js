import { UPDATE_NEW_USER } from './actionTypes';

const updateNewUser = (newUser) => {
    return { type: UPDATE_NEW_USER, payload: newUser };
};

export default updateNewUser;
