import {
    LOADING_POSTS_SUCCESSFUL,
    REFRESHING_POSTS_SUCCESSFUL,
    LOADING_POSTS_FIRST_BATCH_SUCCESSFUL,
    POST_SUCCESSFUL,
    ADD_POST_LIKE,
    REMOVE_POST_LIKE,
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
        case ADD_POST_LIKE: {
            const {
                payload: { uid, postID, timestamp },
            } = action;
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post.postID === postID) {
                        const postLikes = post.likes;
                        // eslint-disable-next-line no-prototype-builtins
                        if (postLikes[uid] !== timestamp) {
                            const newLikes = { ...post.likes };
                            newLikes[uid] = timestamp;
                            return {
                                ...post,
                                likes: newLikes,
                            };
                        }
                    }
                    return post;
                }),
            };
        }
        case REMOVE_POST_LIKE: {
            const {
                payload: { uid, postID },
            } = action;
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post.postID === postID) {
                        const postLikes = post.likes;
                        // eslint-disable-next-line no-prototype-builtins
                        if (postLikes.hasOwnProperty(uid)) {
                            const newLikes = { ...postLikes };
                            delete newLikes[uid];
                            return {
                                ...post,
                                likes: newLikes,
                            };
                        }
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
