import { ADD_POST_LIKE, REMOVE_POST_LIKE } from './actionTypes';

export default function togglePostLike(liked, payload) {
    return {
        type: liked ? REMOVE_POST_LIKE : ADD_POST_LIKE,
        payload,
    };
}
