import {
    LOADING_POSTS_SUCCESSFUL,
    REFRESHING_POSTS_SUCCESSFUL,
    LOADING_POSTS_FIRST_BATCH_SUCCESSFUL,
    POST_SUCCESSFUL,
    TOGGLE_POST_LIKE,
    UPDATE_POST,
} from '../actions/actionTypes';

// inital State
const initialState = {
    posts: [],
};

export default function forumReducer(state = initialState, action) {
    switch (action.type) {
        case LOADING_POSTS_FIRST_BATCH_SUCCESSFUL:
            return { ...state, posts: [...action.payload] };
        case LOADING_POSTS_SUCCESSFUL:
            return {
                ...state,
                posts: [...state.posts, ...action.payload],
            };
        case REFRESHING_POSTS_SUCCESSFUL:
            return { ...state, posts: action.payload };
        case POST_SUCCESSFUL:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
            };
        case TOGGLE_POST_LIKE: {
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post.postID === action.payload.postID) {
                        return {
                            ...post,
                            likes: post.likes.includes(action.payload.uid)
                                ? post.likes.filter(
                                      (uid) => uid !== action.payload.uid
                                  )
                                : [...post.likes, action.payload.uid],
                        };
                    }
                    return post;
                }),
            };
        }
        case UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post.postID === action.payload.postID) {
                        return action.payload;
                    }
                    return post;
                }),
            };
        default:
            return state;
    }
}
