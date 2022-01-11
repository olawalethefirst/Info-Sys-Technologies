import { UPDATE_USER_STATE } from '../actions/actionTypes';

// inital State
const initialState = {
    user: null,
};

export default function forumReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER_STATE:
            return { ...state, user: action.payload };
        default:
            return { ...state };
    }
}
