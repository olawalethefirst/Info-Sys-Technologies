import {
    UPDATE_MODAL_STATUS,
    TOGGLE_CALL_TO_AUTH_MODAL,
    TOGGLE_OFF_USERNAME_MODAL,
    TOGGLE_ON_USERNAME_MODAL,
    AUTH_WITH_EMAIL_INITIALIZED,
    POST_SUCCESSFUL,
    CLEAR_AUTH,
    CLEAR_POST_SUCCESSFUL,
    CLEAR_POST_FAILED,
    POST_FAILED, RESET_POST_FAILED
} from '../actions/actionTypes';

const initialState = {
    activeModal: null,
    callToAuthModalVisible: false,
    usernameModalVisible: false,
    authModalVisible: false,
    postResultModalVisible: false,
};

export default function settingsTempReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_MODAL_STATUS:
            return { ...state, activeModal: action.payload };
        case TOGGLE_CALL_TO_AUTH_MODAL:
            return {
                ...state,
                callToAuthModalVisible: !state.callToAuthModalVisible,
            };
        case TOGGLE_ON_USERNAME_MODAL:
            return {
                ...state,
                usernameModalVisible: true,
            };
        case TOGGLE_OFF_USERNAME_MODAL:
            return { ...state, usernameModalVisible: false };
        case AUTH_WITH_EMAIL_INITIALIZED:
            return { ...state, authModalVisible: true };
        case CLEAR_AUTH:
            return { ...state, authModalVisible: false };
        case POST_SUCCESSFUL:
            return { ...state, postResultModalVisible: true };
        case CLEAR_POST_SUCCESSFUL:
            return { ...state, postResultModalVisible: false };
        case POST_FAILED:
            return { ...state, postResultModalVisible: true };
        case RESET_POST_FAILED:
            return {...state, postResultModalVisible: false}
        case CLEAR_POST_FAILED:
            return { ...state, postResultModalVisible: false };
        default:
            return state;
    }
}
