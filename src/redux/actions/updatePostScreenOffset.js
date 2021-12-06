import { UPDATE_POST_SCREEN_OFFSET } from './actionTypes';

const updatePostScreenOffset = (payload) => {
    return {
        type: UPDATE_POST_SCREEN_OFFSET,
        payload,
    };
};

export default updatePostScreenOffset;
