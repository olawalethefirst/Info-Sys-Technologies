import {
    UPDATE_USER,
    LOADING_POSTS_INITIATED,
    LOADING_POSTS_SUCCESSFUL,
    LOADING_POSTS_FAILED,
    REFRESHING_POSTS_INITIATED,
    REFRESHING_POSTS_SUCCESSFUL,
    REFRESHING_POSTS_FAILED,
    LOADING_POSTS_FIRST_BATCH_SUCCESSFUL,
    SEARCH_ACTIVE,
    SEARCH_NOT_ACTIVE,
    SHOW_FOOTER,
    SEARCH_POSTS_INITIATED,
    SEARCH_POSTS_SUCCESSFUL,
    SEARCH_POSTS_FAILED,
    UPDATE_USERNAME,
    AUTH_WITH_EMAIL_INITIALIZED,
    AUTH_WITH_EMAIL_SUCCESSFUL,
    CLEAR_AUTH,
    AUTH_WITH_EMAIL_FAILED,
    RETRY_AUTH_WITH_EMAIL,
    INITIATE_POST,
    POST_SUCCESSFUL,
    POST_FAILED,
    CLEAR_POST_SUCCESSFUL,
    RESET_POST_FAILED,
    CLEAR_POST_FAILED,
    INITIATE_COMMENT,
    COMMENT_SUCCESSFUL,
    COMMENT_FAILED,
    CLEAR_COMMENT_SUCCESSFUL,
    RESET_COMMENT_FAILED,
    CLEAR_COMMENT_FAILED,
    SET_POST_TITLE,
    RESET_POST_TITLE,
    TOGGLE_COMMENT_LIKE,
    TOGGLE_POST_LIKE,
    UPDATE_POST,
} from '../actions/actionTypes';
import { auth } from '../../helperFunctions/initializeFirebase';
import { noPost } from '../../helperFunctions/processErrorString';

// inital State
const initialState = {
    uid: null,
    loadingPosts: false,
    loadingPostsError: null,
    refreshingPosts: false,
    searching: false,
    searchResult: [],
    showFooter: false,
    searchString: '',
    username: null,
    authData: null,
    authorizing: false,
    authSuccessful: false,
    authError: null,
    postData: null,
    postSuccessful: false,
    postFailed: false,
    posting: false,
    commentData: null,
    commentSuccessful: false,
    commentFailed: false,
    commenting: false,
    postsLimit: 20,
    postDetails: [],
};

const forumTempReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                uid: action.payload?.uid ?? null,
                username: action.payload?.username ?? null,
            };
        case LOADING_POSTS_INITIATED:
            return { ...state, loadingPosts: true, loadingPostsError: null };
        case LOADING_POSTS_FIRST_BATCH_SUCCESSFUL:
            return {
                ...state,
                loadingPosts: false,
                loadingPostsError: !action.payload.length ? noPost : null,
            };
        case LOADING_POSTS_SUCCESSFUL:
            return {
                ...state,
                loadingPosts: false,
                loadingPostsError: !action.payload.length ? noPost : null,
            };
        case LOADING_POSTS_FAILED:
            return {
                ...state,
                loadingPosts: false,
                loadingPostsError: action.payload,
            };
        case REFRESHING_POSTS_INITIATED:
            return { ...state, refreshingPosts: true, loadingPostsError: null };
        case REFRESHING_POSTS_SUCCESSFUL: {
            return {
                ...state,
                refreshingPosts: false,
            };
        }
        case REFRESHING_POSTS_FAILED:
            return {
                ...state,
                refreshingPosts: false,
                loadingPostsError: action.payload,
            };
        case SEARCH_ACTIVE: {
            return { ...state, searching: true };
        }
        case SEARCH_NOT_ACTIVE:
            return {
                ...state,
                searching: false,
                searchResult: [],
                searchString: '',
                loadingPosts: false,
                loadingPostsError: null,
            };
        case SHOW_FOOTER:
            return { ...state, showFooter: action.payload };
        case SEARCH_POSTS_INITIATED:
            return {
                ...state,
                searchString: action.payload,
                loadingPosts: action.payload ? true : false,
                loadingPostsError: null,
            };
        case SEARCH_POSTS_SUCCESSFUL:
            return {
                ...state,
                loadingPosts: false,
                searchResult: action.payload,
            };
        case SEARCH_POSTS_FAILED:
            return {
                ...state,
                loadingPosts: false,
                loadingPostsError: action.payload,
                searchResult: [],
            };
        case UPDATE_USERNAME:
            return { ...state, username: action.payload };
        case AUTH_WITH_EMAIL_INITIALIZED:
            return { ...state, authData: action.payload, authorizing: true };
        case AUTH_WITH_EMAIL_SUCCESSFUL:
            return { ...state, authSuccessful: true, authorizing: false };
        case CLEAR_AUTH:
            return {
                ...state,
                authData: null,
                authSuccessful: false,
                authError: null,
            };
        case AUTH_WITH_EMAIL_FAILED:
            return {
                ...state,
                authError: action.payload,
                authorizing: false,
            };
        case RETRY_AUTH_WITH_EMAIL:
            return { ...state, authorizing: true, authError: null };
        case INITIATE_POST:
            return { ...state, posting: true };
        case POST_SUCCESSFUL:
            return {
                ...state,
                postSuccessful: true,
                posting: false,
                loadingPostsError: null, //think about if this is necessary later
            };
        case CLEAR_POST_SUCCESSFUL:
            return {
                ...state,
                postSuccessful: false,
            };
        case POST_FAILED:
            return {
                ...state,
                postFailed: true,
                posting: false,
                postData: action.payload,
            };
        case RESET_POST_FAILED:
            return {
                ...state,
                postFailed: false,
                posting: true,
                postData: null,
            };
        case CLEAR_POST_FAILED:
            return {
                ...state,
                postFailed: false,
                posting: false,
                postData: null,
            };
        case INITIATE_COMMENT:
            return { ...state, commenting: true };
        case COMMENT_SUCCESSFUL:
            return { ...state, commentSuccessful: true, commenting: false };
        case COMMENT_FAILED:
            return {
                ...state,
                commentFailed: true,
                commenting: false,
                commentData: action.payload,
            };
        case CLEAR_COMMENT_SUCCESSFUL:
            return { ...state, commentSuccessful: false };
        case RESET_COMMENT_FAILED:
            return {
                ...state,
                commentFailed: false,
                commenting: true,
                commentData: null,
            };
        case CLEAR_COMMENT_FAILED:
            return { ...state, commentFailed: false, commentData: null };
        // case SET_POST_TITLE:
        //     return { ...state, postDetails: [action.payload] };
        // case RESET_POST_TITLE:
        //     return { ...state, postDetails: [] };
        // case TOGGLE_POST_LIKE:
        //     return {
        //         ...state,
        //         postDetails: state.postDetails.map((postDetail) => {
        //             if (postDetail.postID === action.payload) {
        //                 return {
        //                     ...postDetail,
        //                     likes: postDetail.likes.includes(
        //                         auth.currentUser.uid
        //                     )
        //                         ? postDetail.likes.filter(
        //                               (val) => val !== auth.currentUser.uid
        //                           )
        //                         : [...postDetail.likes, auth.currentUser.uid],
        //                 };
        //             }
        //             return postDetail;
        //         }),
        //     };
        // case TOGGLE_COMMENT_LIKE:
        //     return {
        //         ...state,
        //         postDetails: state.postDetails.map((postDetail) => {
        //             if (postDetail.commentID === action.payload) {
        //                 return {
        //                     ...postDetail,
        //                     likes: postDetail.likes.includes(
        //                         auth.currentUser.uid
        //                     )
        //                         ? postDetail.likes.filter(
        //                               (val) => val !== auth.currentUser.uid
        //                           )
        //                         : [...postDetail.likes, auth.currentUser.uid],
        //                 };
        //             }
        //             return postDetail;
        //         }),
        //     };
        // case UPDATE_POST:
        //     return {
        //         ...state,
        //         postDetails: state.postDetails.map((postDetail) => {
        //             if (postDetail.postID === action.payload.postID) {
        //                 console.log('returning this', action.payload);
        //                 return action.payload;
        //             }
        //             return postDetail;
        //         }),
        //     };
        default:
            return state;
    }
};

export default forumTempReducer;
