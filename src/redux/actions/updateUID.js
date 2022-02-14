import { UPDATE_UID } from './actionTypes';

// eslint-disable-next-line no-undef
const updateUser = (user) => {
    return {
        type: UPDATE_UID,
        payload: user,
    };
};

export default updateUser;
