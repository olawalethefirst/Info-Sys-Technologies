import { UPDATE_USER_STATE } from './actionTypes';

// eslint-disable-next-line no-undef
const updateUser = (user) => {
    return {
        type: UPDATE_USER_STATE,
        payload: user,
    };
};

export default updateUser;
