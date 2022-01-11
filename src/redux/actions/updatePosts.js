import { UPDATE_POSTS } from './actionTypes';

const updatePosts = (payload) => ({
    type: UPDATE_POSTS,
    payload,
});

export default updatePosts;
