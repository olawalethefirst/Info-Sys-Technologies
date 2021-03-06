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
    AUTH_INITIALIZED,
    AUTH_SUCCESSFUL,
    CLEAR_AUTH,
    AUTH_FAILED,
    RETRY_AUTH,
    INITIATE_POST,
    POST_SUCCESSFUL,
    POST_FAILED,
    CLEAR_POST_SUCCESSFUL,
    RESET_POST_FAILED,
    CLEAR_POST_FAILED,
} from '../actions/actionTypes';
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
    authDetails: null,
    authorizing: false,
    authSuccessful: false,
    authError: '',
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
                loadingPostsError: action.payload.length < 20 ? noPost : null,
            };
        case LOADING_POSTS_SUCCESSFUL:
            return {
                ...state,
                loadingPosts: false,
                loadingPostsError: action.payload.length < 20 ? noPost : null,
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
        case AUTH_INITIALIZED:
            return { ...state, authDetails: action.payload, authorizing: true };
        case AUTH_SUCCESSFUL:
            return { ...state, authSuccessful: true, authorizing: false };
        case CLEAR_AUTH:
            return {
                ...state,
                authDetails: null,
                authSuccessful: false,
                authError: '',
            };
        case AUTH_FAILED:
            return {
                ...state,
                authError: action.payload,
                authorizing: false,
            };
        case RETRY_AUTH:
            return { ...state, authorizing: true, authError: '' };
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
        default:
            return state;
    }
};

export default forumTempReducer;
