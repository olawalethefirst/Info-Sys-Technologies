import {
    SEARCH_POSTS_INITIATED,
    SEARCH_POSTS_SUCCESSFUL,
    SEARCH_POSTS_FAILED,
} from './actionTypes';
import Fuse from 'fuse.js';
import { noPost } from '../../helperFunctions/processErrorString';

export default function searchPosts(str) {
    return (dispatch, getState) => {
        const strWithoutWhitespaces = str.trim();
        dispatch({
            type: SEARCH_POSTS_INITIATED,
            payload: strWithoutWhitespaces,
        });
        //searches only when str is only whitespaces
        if (strWithoutWhitespaces) {
            const posts = getState().forumState.posts;
            const fuse = new Fuse(posts, {
                keys: ['searchField'],
                ignoreLocation: true,
                ignoreFieldNorm: true,
                useExtendedSearch: true,
                threshold: 0.2,
                minMatchCharLength: 2,
            });
            const res = fuse.search(str);

            if (!res.length) {
                dispatch({
                    type: SEARCH_POSTS_FAILED,
                    payload: noPost,
                });
            } else {
                const latestStr = getState().forumTempState.searchString;
                if (strWithoutWhitespaces === latestStr) {
                    const searchArray = res.map((e) => e.item);
                    dispatch({
                        type: SEARCH_POSTS_SUCCESSFUL,
                        payload: searchArray,
                    });
                }
            }
        }
    };
}
