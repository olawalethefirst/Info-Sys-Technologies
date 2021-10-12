import {
    INITIALIZED_FIREBASE,
    UPDATE_HEADER_SIZE,
    UPDATE_MARGIN,
    ASSETS_LOADED,
    UPDATE_DEVICE_WIDTH_CLASS,
    UPDATE_BODY_HEIGHT,
    UPDATE_FONT_FACTOR,
    UPDATE_SCROLL_POSITION,
    UPDATE_USER_STATE,
} from '../actions/actionTypes';

//Initial States
const initialState = {
    firebaseLoaded: false,
    headerSize: null,
    margin: null,
    assetsLoaded: null,
    deviceWidthClass: null,
    bodyHeight: null,
    fontFactor: null,
    modalEnabled: false,
    scrollViewOffset: 0,
    user: null,
};

export default function settingsReducer(state = initialState, action) {
    switch (action.type) {
        case INITIALIZED_FIREBASE:
            return {
                ...state,
                firebaseLoaded: true,
            };
        case UPDATE_HEADER_SIZE:
            return {
                ...state,
                headerSize: action.payload,
            };
        case UPDATE_MARGIN:
            return {
                ...state,
                margin: action.payload,
            };
        case ASSETS_LOADED:
            return {
                ...state,
                assetsLoaded: true,
            };
        case UPDATE_DEVICE_WIDTH_CLASS:
            return {
                ...state,
                deviceWidthClass: 'type' + action.payload,
            };
        case UPDATE_BODY_HEIGHT:
            return {
                ...state,
                bodyHeight: action.payload,
            };
        case UPDATE_FONT_FACTOR:
            return {
                ...state,
                fontFactor: action.payload,
            };
        case UPDATE_SCROLL_POSITION:
            return { ...state, scrollViewOffset: action.payload };
        case UPDATE_USER_STATE:
            return { ...state, user: action.payload };
        default:
            return state;
    }
}
