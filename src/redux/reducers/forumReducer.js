import {
    LOADING_POSTS_SUCCESSFUL,
    REFRESHING_POSTS_SUCCESSFUL,
    LOADING_POSTS_FIRST_BATCH_SUCCESSFUL,
    EMPTY_POSTS_DATABASE,
} from '../actions/actionTypes';

// inital State
const initialState = {
    posts: [],
};

export default function forumReducer(state = initialState, action) {
    switch (action.type) {
        case EMPTY_POSTS_DATABASE:
            return {...state, posts: []}
        case LOADING_POSTS_FIRST_BATCH_SUCCESSFUL:
            return { ...state, posts: [...action.payload] };
        case LOADING_POSTS_SUCCESSFUL:
            return {
                ...state,
                posts: [...state.posts, ...action.payload],
            };
        case REFRESHING_POSTS_SUCCESSFUL:
            return { ...state, posts: action.payload };
        default:
            return state;
    }
}
