import {
    UPDATE_HEADER_SIZE,
    UPDATE_MARGIN,
    ASSETS_LOADED,
    UPDATE_DEVICE_WIDTH_CLASS,
    UPDATE_BODY_HEIGHT,
    UPDATE_FONT_FACTOR,
    UPDATE_SERVICES_SCROLL_POSITION,
    UPDATE_CONTACT_SCROLL_POSITION,
    UPDATE_CONTACT_CONTENT_SIZE,
    UPDATE_VIEW_POST_FOOTER_POSITION,
    UPDATE_VIEW_POST_FLATLIST_SCREEN_HEIGHT,
} from '../actions/actionTypes';

//Initial States
const initialState = {
    headerSize: null,
    margin: null,
    assetsLoaded: null,
    deviceWidthClass: null,
    bodyHeight: null,
    fontFactor: null,
    modalEnabled: false,
    servicesScrollViewOffset: 0,
    contactScrollViewOffset: 0,
    contactFormContentSize: 0,
    viewPostFooterPosition: 0,
    viewPostFlatListScreenHeight: 0,
};

export default function settingsReducer(state = initialState, action) {
    switch (action.type) {
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
        case UPDATE_SERVICES_SCROLL_POSITION:
            return { ...state, servicesScrollViewOffset: action.payload };
        case UPDATE_CONTACT_SCROLL_POSITION:
            return { ...state, contactScrollViewOffset: action.payload };
        case UPDATE_CONTACT_CONTENT_SIZE:
            return { ...state, contactFormContentSize: action.payload };
        case UPDATE_VIEW_POST_FOOTER_POSITION:
            return { ...state, viewPostFooterPosition: action.payload };
        case UPDATE_VIEW_POST_FLATLIST_SCREEN_HEIGHT:
            return { ...state, viewPostFlatListScreenHeight: action.payload };
        default:
            return state;
    }
}
