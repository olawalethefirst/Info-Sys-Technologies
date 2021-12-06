import {
    UPDATE_POST_SCREEN_OFFSET,
    UPDATE_KEYBOARD_HEIGHT,
} from '../actions/actionTypes';

const initialState = {
    postScreenOffset: 0,
    keyboardHeight: 0,
};

export default function settingsTempReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_POST_SCREEN_OFFSET:
            return { ...state, postScreenOffset: action.payload };
        case UPDATE_KEYBOARD_HEIGHT:
            return { ...state, keyboardHeight: action.payload };
        default:
            return state;
    }
}
