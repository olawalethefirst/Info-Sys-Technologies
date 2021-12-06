import { UPDATE_VIEW_POST_FLATLIST_SCREEN_HEIGHT } from './actionTypes';

const updateViewPostFlatListScreenHeight = (payload) => {
    return {
        type: UPDATE_VIEW_POST_FLATLIST_SCREEN_HEIGHT,
        payload,
    };
};

export default updateViewPostFlatListScreenHeight;
