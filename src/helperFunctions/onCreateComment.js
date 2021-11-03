import { store } from '../redux/store';
import updateActiveForumAction from '../redux/actions/updateActiveForumAction';
import resetActiveForumAction from '../redux/actions/resetActiveForumAction';
import makeQueryablePromise from './makeQueryablePromise';
import createCommentAsync from './createCommentAsync';

const onCreateComment = (parentID, postID, comment) => {
    store.dispatch(updateActiveForumAction({ type: 'createComment' }));
    const postRef = `/posts/${parentID}/comments/${postID}`;
    store.dispatch(updateActiveForumAction({ postRef }));
    const request = makeQueryablePromise(createCommentAsync(postRef, comment));
    store.dispatch(updateActiveForumAction({ queryableRequest: request }));
    request.then(
        (res) => {
            store.dispatch(
                updateActiveForumAction({
                    resolved: true,
                    successful: true,
                })
            );
            setTimeout(() => store.dispatch(resetActiveForumAction()), 300);
            console.log('passed', res);
        },
        (e) => {
            store.dispatch(
                updateActiveForumAction({
                    resolved: true,
                    successful: false,
                })
            );
            setTimeout(() => store.dispatch(resetActiveForumAction()), 300);
            console.log('failed', e.message);
        }
    );
};

export default onCreateComment;
