import { UPDATE_POST_SCREEN_OFFSET } from '../actions/actionTypes';

const initialState = {
    postScreenOffset: 0,
};

export default function settingsTempReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_POST_SCREEN_OFFSET:
            return { ...state, postScreenOffset: action.payload };
        default:
            return { ...state };
    }
}
