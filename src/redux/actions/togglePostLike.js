import { TOGGLE_POST_LIKE } from './actionTypes';

export default function togglePostLike(payload) {
    return {
        type: TOGGLE_POST_LIKE,
        payload,
    };
}
