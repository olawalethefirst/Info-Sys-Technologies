import {
    UPDATE_POSTS_DATA_SOURCE,
    UPDATE_ACTIVE_FORUM_ACTION,
    CREATE_POST_MODAL_STATE,
    UPDATE_POSTS,
    UPDATE_POSTS_FIRST_BATCH,
} from '../actions/actionTypes';

// inital State
const initialState = {
    activeForumAction: null,
    fromCache: true,
    createPostModalOpen: false,
    posts: [],
};

const forumTempReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ACTIVE_FORUM_ACTION:
            return {
                ...state,
                activeForumAction: action.payload,
            };
        case UPDATE_POSTS_DATA_SOURCE:
            return { ...state, fromCache: action.payload };
        case CREATE_POST_MODAL_STATE:
            return { ...state, createPostModalOpen: action.payload };
        case UPDATE_POSTS:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE_POSTS_FIRST_BATCH:
            return { ...state, posts: action.payload };
        default:
            return { ...state };
    }
};

export default forumTempReducer;
