import { UPDATE_EFFECTIVE_BODY_HEIGHT } from './actionTypes';

export default function (payload) {
    return {
        type: UPDATE_EFFECTIVE_BODY_HEIGHT,
        payload,
    };
}
