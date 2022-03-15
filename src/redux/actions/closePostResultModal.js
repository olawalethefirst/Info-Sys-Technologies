import { CLEAR_POST_FAILED, CLEAR_POST_SUCCESSFUL } from './actionTypes';

const closePostResultModal = () => (dispatch, getState) => {
    const { postSuccessful, postFailed } = getState().forumTempState ;
    if (postSuccessful) {
        dispatch({ type: CLEAR_POST_SUCCESSFUL });
    } else if (postFailed) {
        dispatch({ type: CLEAR_POST_FAILED });
    }
};
export default closePostResultModal;
