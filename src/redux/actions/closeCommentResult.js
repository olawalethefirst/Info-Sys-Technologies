import { CLEAR_COMMENT_FAILED, CLEAR_COMMENT_SUCCESSFUL } from './actionTypes';

const closeCommentResult = () => (dispatch, getState) => {
    const { commentSuccessful, commentFailed } = getState().forumTempState ;
    if (commentSuccessful) {
        dispatch({ type: CLEAR_COMMENT_SUCCESSFUL });
    } else if (commentFailed) {
        dispatch({ type: CLEAR_COMMENT_FAILED });
    }
};
export default closeCommentResult;
