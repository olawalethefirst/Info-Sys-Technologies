import {
    UPDATE_MODAL_STATUS,
    TOGGLE_CALL_TO_AUTH_MODAL,
} from '../actions/actionTypes';

const initialState = {
    activeModal: null,
    callToAuthModalVisible: false,
};

export default function settingsTempReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_MODAL_STATUS:
            return { ...state, activeModal: action.payload };
        case TOGGLE_CALL_TO_AUTH_MODAL:
            console.log('reached');
            return { ...state, callToAuthModalVisible: !state.callToAuthModalVisible };
        default:
            return state;
    }
}
