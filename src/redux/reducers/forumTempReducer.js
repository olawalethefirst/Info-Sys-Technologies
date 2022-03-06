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
    RETRY_AUTH_WITH_EMAIL
} from '../actions/actionTypes';

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
};

const forumTempReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                uid: action.payload ? action.payload.uid : null,
                username: action.payload ? action.payload.username : null,
            };
        case LOADING_POSTS_INITIATED:
            return { ...state, loadingPosts: true };
        case LOADING_POSTS_FIRST_BATCH_SUCCESSFUL:
            return { ...state, loadingPosts: false, loadingPostsError: null };
        case LOADING_POSTS_SUCCESSFUL:
            return { ...state, loadingPosts: false, loadingPostsError: null };
        case LOADING_POSTS_FAILED:
            return {
                ...state,
                loadingPosts: false,
                loadingPostsError: action.payload,
            };
        case REFRESHING_POSTS_INITIATED:
            return { ...state, refreshingPosts: true };
        case REFRESHING_POSTS_SUCCESSFUL: {
            return {
                ...state,
                refreshingPosts: false,
                loadingPostsError: null,
            };
        }
        case REFRESHING_POSTS_FAILED:
            return {
                ...state,
                refreshingPosts: false,
                loadingPostsError: action.payload,
            };
        case SEARCH_ACTIVE: {
            return { ...state, searching: true, searchResult: [] };
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
            return {...state, authorizing: true, authError: null}
        default:
            return state;
    }
};

export default forumTempReducer;
