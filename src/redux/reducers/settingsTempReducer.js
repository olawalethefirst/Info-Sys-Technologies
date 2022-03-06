import {
    UPDATE_MODAL_STATUS,
    TOGGLE_CALL_TO_AUTH_MODAL,
    TOGGLE_OFF_USERNAME_MODAL,
    TOGGLE_ON_USERNAME_MODAL,
    AUTH_WITH_EMAIL_INITIALIZED,
    TOGGLE_OFF_AUTH_MODAL,
    CLEAR_AUTH,
} from '../actions/actionTypes';

const initialState = {
    activeModal: null,
    callToAuthModalVisible: false,
    usernameModalVisible: false,
    authModalVisible: false,
};

export default function settingsTempReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_MODAL_STATUS:
            return { ...state, activeModal: action.payload };
        case TOGGLE_CALL_TO_AUTH_MODAL:
            console.log('reached');
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
        // case TOGGLE_OFF_AUTH_MODAL:
        //     return { ...state, authModalVisible: false };
        case CLEAR_AUTH:
            return { ...state, authModalVisible: false };
        default:
            return state;
    }
}
