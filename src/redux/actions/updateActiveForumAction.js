import { UPDATE_ACTIVE_FORUM_ACTION } from './actionTypes';

const updateActiveForumAction = (payload) => {
    return {
        type: UPDATE_ACTIVE_FORUM_ACTION,
        payload,
    };
};

export default updateActiveForumAction;
