import { UPDATE_POSTS_FIRST_BATCH } from './actionTypes';

export default function updatePostsFirstBatch(payload) {
    return {
        type: UPDATE_POSTS_FIRST_BATCH,
        payload,
    };
}
