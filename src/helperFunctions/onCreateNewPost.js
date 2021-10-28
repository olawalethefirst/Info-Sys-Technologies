import { store } from '../redux/store';
import updateActiveForumAction from '../redux/actions/updateActiveForumAction';
import resetActiveForumAction from '../redux/actions/resetActiveForumAction';
import makeQueryablePromise from './makeQueryablePromise';
import createPostAsync from './createPostAsync';

const onCreateNewPost = (postID, category, title, body) => {
    store.dispatch(updateActiveForumAction({ type: 'createPost' }));
    const postRef = `/posts/${postID}`;
    store.dispatch(updateActiveForumAction({ postRef }));
    const request = makeQueryablePromise(
        createPostAsync(postRef, category, title, body)
    );
    store.dispatch(
        updateActiveForumAction({
            queryableRequest: request,
        })
    );
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

export default onCreateNewPost;
