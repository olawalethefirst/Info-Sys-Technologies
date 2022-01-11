import { UPDATE_POSTS_DATA_SOURCE } from './actionTypes';

const updatePostsDataSource = (payload) => ({
    type: UPDATE_POSTS_DATA_SOURCE,
    payload,
});

export default updatePostsDataSource;
