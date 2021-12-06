import { UPDATE_VIEW_POST_FOOTER_POSITION } from './actionTypes';

function updateViewPostFooterPosition(payload) {
    return {
        type: UPDATE_VIEW_POST_FOOTER_POSITION,
        payload: payload,
    };
}
export default updateViewPostFooterPosition;
