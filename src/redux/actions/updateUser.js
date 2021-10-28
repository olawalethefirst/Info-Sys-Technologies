import { UPDATE_USER_STATE } from './actionTypes';

// eslint-disable-next-line no-undef
export default updateUser = (user) => {
    return {
        type: UPDATE_USER_STATE,
        payload: user,
    };
};
