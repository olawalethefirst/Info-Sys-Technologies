import { useState, useCallback, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import updateLikeAsync, { comment } from '../helperFunctions/updateLikeAsync';
import { auth,firestore } from '../helperFunctions/initializeFirebase';
import togglePostLike from '../redux/actions/togglePostLike';
import { onSnapshot, doc } from 'firebase/firestore';
import updatePost from '../redux/actions/updatePost';

export default function usePostDetails(initialPostData) {
    const isMounted = useRef(false);
    const postID = useRef(initialPostData.postID).current;
    const [postDetails, setPostDetails] = useState([initialPostData]);
    const dispatch = useDispatch();

    const _updatePost = useCallback((newPostData) => {
        setPostDetails((postDetails) => [newPostData, ...postDetails.slice(1)]);
    }, []);

    const _togglePostLikes = useCallback(
        () =>
            setPostDetails((postDetails) => {
                const post = postDetails[0];
                const postLikes = post.likes;
                return [
                    {
                        ...post,
                        likes: postLikes.includes(auth.currentUser?.uid)
                            ? postLikes.filter(
                                  (uid) => uid !== auth.currentUser?.uid
                              )
                            : [...postLikes, auth.currentUser?.uid],
                    },
                    ...postDetails.slice(1),
                ];
            }),
        []
    );
    const _toggleCommentLikes = useCallback(
        (commentID) =>
            setPostDetails((postDetails) =>
                postDetails.map((postDetail) => {
                    if (postDetail.commentID === commentID) {
                        const postDetailLikes = postDetail.likes;
                        return {
                            ...postDetail,
                            likes: postDetailLikes.includes(
                                auth.currentUser?.uid
                            )
                                ? postDetailLikes.filter(
                                      (uid) => uid !== auth.currentUser?.uid
                                  )
                                : [...postDetailLikes, auth.currentUser?.uid],
                        };
                    }
                    return postDetails;
                })
            ),
        []
    );

    const updatePostLikes = useCallback(
        async (postID) => {
            try {
                _togglePostLikes();
                await updateLikeAsync(postID);
                dispatch(
                    togglePostLike({
                        uid: auth.currentUser?.uid,
                        postID,
                    })
                );
            } catch {
                if (isMounted.current) {
                    _togglePostLikes();
                }
            }
        },
        [dispatch, _togglePostLikes]
    );

    const updateCommentLikes = useCallback(
        async (commentID) => {
            try {
                _toggleCommentLikes(commentID);
                await updateLikeAsync(commentID, comment);
            } catch {
                if (isMounted.current) {
                    _toggleCommentLikes(commentID);
                }
            }
        },
        [_toggleCommentLikes]
    );

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    });

    useEffect(() => {
        const listener = onSnapshot(
            doc(firestore, 'posts', postID),
            (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    const { category, title, body } = data;

                    _updatePost({
                        ...data,
                        postID,
                    });

                    dispatch(
                        updatePost({
                            postID,
                            searchField: category + '. ' + title + '. ' + body,
                            ...data,
                        })
                    );
                }
            }
        );
        return listener;
    }, [dispatch, _updatePost, postID]);

    return [postDetails, updatePostLikes, updateCommentLikes];
}
