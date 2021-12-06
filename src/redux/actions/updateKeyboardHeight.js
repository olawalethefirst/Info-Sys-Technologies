import { UPDATE_KEYBOARD_HEIGHT } from './actionTypes';

const updateKeyboardHeight = (payload) => {
    return {
        type: UPDATE_KEYBOARD_HEIGHT,
        payload,
    };
};

export default updateKeyboardHeight;
