import { UPDATE_ACTIVE_FORUM_ACTION } from './actionTypes';

const updateActiveForumAction = (data) => {
    return {
        type: UPDATE_ACTIVE_FORUM_ACTION,
        payload: data,
    };
};

export default updateActiveForumAction;
