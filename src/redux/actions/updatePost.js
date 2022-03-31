import { UPDATE_POST } from './actionTypes';

export default function updatePost(payload) {
    return {
        type: UPDATE_POST,
        payload,
    };
}
