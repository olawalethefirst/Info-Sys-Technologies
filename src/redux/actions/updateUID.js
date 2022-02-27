import { UPDATE_USER } from './actionTypes';

// eslint-disable-next-line no-undef
const updateUser = (user) => {
    return {
        type: UPDATE_USER,
        payload: user,
    };
};

export default updateUser;
