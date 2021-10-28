import {
    UPDATE_USER_STATE,
    UPDATE_ACTIVE_FORUM_ACTION,
    RESET_ACTIVE_FORUM_ACTION,
} from '../actions/actionTypes';

// inital State
const initialState = {
    user: null,
    activeForumAction: null,
};

export default function forumReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER_STATE:
            return { ...state, user: action.payload };
        case UPDATE_ACTIVE_FORUM_ACTION:
            return {
                ...state,
                activeForumAction: {
                    ...state.activeForumAction,
                    ...action.payload,
                },
            };
        case RESET_ACTIVE_FORUM_ACTION:
            return {
                ...state,
                activeForumAction: null,
            };
        default:
            return state;
    }
}
