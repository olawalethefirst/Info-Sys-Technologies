import {
    UPDATE_HEADER_SIZE,
    UPDATE_MARGIN,
    UPDATE_DEVICE_WIDTH_CLASS,
    UPDATE_BODY_HEIGHT,
    UPDATE_FONT_FACTOR,
    UPDATE_EFFECTIVE_BODY_HEIGHT,
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
    effectiveBodyHeight: 0,
    tabBarHeight: 0,
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
        case UPDATE_EFFECTIVE_BODY_HEIGHT:
            return {
                ...state,
                effectiveBodyHeight: action.payload.effectiveBodyHeight,
                tabBarHeight: action.payload.tabBarHeight,
            };
        default:
            return state;
    }
}
