import { useCallback, useRef, useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import updateLikeAsync, { comment } from '../helperFunctions/updateLikeAsync';
import { auth, firestore } from '../helperFunctions/initializeFirebase';
import togglePostLike from '../redux/actions/togglePostLike';
import {
    onSnapshot,
    doc,
    getDocFromServer,
    getDocsFromServer,
    query,
    collection,
    where,
    orderBy,
    limit,
    startAfter,
} from 'firebase/firestore';
import updatePost from '../redux/actions/updatePost';
import { noComment } from '../helperFunctions/processErrorString';
import createDocAsync from '../helperFunctions/createDocAsync';
import timerPromiseAsync from '../helperFunctions/timerPromiseAsync';
import { v1 as uuidv1 } from 'uuid';

export default function usePostDetails(initialPostData) {
    const isMounted = useRef(false);
    const loadCanceled = useRef(false);
    const postID = useRef(initialPostData.postID).current;

    const UPDATE_POST = 'UPDATE_POST';
    const INITIATE_LOADING = 'INITIATE_LOADING';
    const ACTIVATE_LOAD_ERROR = 'ACTIVATE_LOAD_ERROR';
    const UPDATE_COMMENTS = 'UPDATE_COMMENT';
    const TOGGLE_POST_LIKE = 'TOGGLE_POST_LIKE';
    const TOGGLE_COMMENT_LIKE = 'TOGGLE_COMMENT_LIKE';
    const INITIATE_COMMENT = 'INITIATE_COMMENT';
    const COMMENT_SUCCESSFUL = 'COMMENT_SUCCESSFUL';
    const COMMENT_FAILED = 'COMMENT_FAILED';
    const RESET_COMMENT_FAILED = 'RESET_COMMENT_FAILED';
    const CLEAR_COMMENT_SUCCESSFUL = 'CLEAR_COMMENT_SUCCESSFUL';
    const CLEAR_COMMENT_FAILED = 'CLEAR_COMMENT_FAILED';
    const INITIATE_REFRESHING = 'INITIATE_REFRESHING';
    const REFRESHING_FAILED = 'REFRESHING_FAILED';
    const REFRESHING_SUCCESSFUL = 'REFRESHING_SUCCESSFUL';

    const _toggleLike = useCallback(
        (likes) =>
            likes.includes(auth.currentUser?.uid)
                ? likes.filter((uid) => uid !== auth.currentUser?.uid)
                : [...likes, auth.currentUser?.uid],

        []
    );
    const _reducer = (state, action) => {
        switch (action.type) {
            case UPDATE_POST:
                return {
                    ...state,
                    postDetails: [
                        action.payload,
                        ...state.postDetails.slice(1),
                    ],
                };
            case INITIATE_LOADING:
                return {
                    ...state,
                    loading: true,
                    loadError: false,
                };
            case ACTIVATE_LOAD_ERROR:
                return { ...state, loadError: action.payload, loading: false };
            case UPDATE_COMMENTS:
                return {
                    ...state,
                    postDetails: [...state.postDetails, ...action.payload],
                    loading: false,
                };
            case TOGGLE_POST_LIKE: {
                const post = state.postDetails[0];
                const postLikes = post.likes;
                return {
                    ...state,
                    postDetails: [
                        {
                            ...post,
                            likes: _toggleLike(postLikes),
                        },
                        ...state.postDetails.slice(1),
                    ],
                };
            }
            case TOGGLE_COMMENT_LIKE:
                return {
                    ...state,
                    postDetails: state.postDetails.map((postDetail) => {
                        if (postDetail.commentID === action.payload) {
                            const postDetailLikes = postDetail.likes;
                            return {
                                ...postDetail,
                                likes: _toggleLike(postDetailLikes),
                            };
                        }
                        return postDetail;
                    }),
                };
            case INITIATE_COMMENT:
                return {
                    ...state,
                    commentResultVisible: true,
                    commenting: true,
                    comment: action.payload,
                };
            case COMMENT_SUCCESSFUL:
                return {
                    ...state,
                    commenting: false,
                    commentSuccessful: true,
                    comment: null,
                    postDetails: [
                        ...state.postDetails.slice(0, 1),
                        action.payload,
                        ...state.postDetails.slice(1),
                    ],
                };
            case CLEAR_COMMENT_SUCCESSFUL:
                return {
                    ...state,
                    commentSuccessful: false,
                    commentResultVisible: false,
                };
            case COMMENT_FAILED:
                return { ...state, commentFailed: true, commenting: false };
            case RESET_COMMENT_FAILED:
                return { ...state, commentFailed: false, commenting: true };
            case CLEAR_COMMENT_FAILED:
                return {
                    ...state,
                    commentFailed: false,
                    commentResultVisible: false,
                    comment: null,
                };
            case INITIATE_REFRESHING:
                return {
                    ...state,
                    refreshing: true,
                    loading: false,
                };
            case REFRESHING_SUCCESSFUL:
                return {
                    ...state,
                    postDetails: [
                        ...state.postDetails.slice(0, 1),
                        ...action.payload,
                    ],
                    refreshing: false,
                };
            case REFRESHING_FAILED:
                return {
                    ...state,
                    refreshing: false,
                    loadError: action.payload,
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(_reducer, {
        postDetails: [initialPostData], //initialize with only needed data
        loading: false,
        loadError: null,
        comment: null,
        commenting: false,
        commentSuccessful: false,
        commentFailed: false,
        commentResultVisible: false,
        refreshing: false,
    });

    const reduxDispatch = useDispatch();

    const _isMounted = useCallback(() => isMounted.current, []);
    const _updateLoadCanceled = useCallback(
        (val) => (loadCanceled.current = val),
        []
    );
    const _isLoadCanceled = useCallback(() => loadCanceled.current, []);
    const _togglePostLikes = useCallback(
        () =>
            dispatch({
                type: TOGGLE_POST_LIKE,
            }),
        []
    );
    const _toggleCommentLikes = useCallback(
        (commentID) =>
            dispatch({
                type: TOGGLE_COMMENT_LIKE,
                payload: commentID,
            }),
        []
    );
    const _initializeLoading = useCallback(
        () =>
            dispatch({
                type: INITIATE_LOADING,
            }),
        []
    );
    const _mapComment = useCallback((doc) => {
        const commentID = doc.id;
        return { commentID, ...doc.data() };
    }, []);
    const _updateLoadError = useCallback(
        (payload) =>
            dispatch({
                type: ACTIVATE_LOAD_ERROR,
                payload,
            }),
        []
    );
    const _updateComments = useCallback((payload) => {
        dispatch({
            type: UPDATE_COMMENTS,
            payload,
        });
    }, []);
    const updatePostLikes = useCallback(async () => {
        try {
            _togglePostLikes();
            await updateLikeAsync(postID);
            reduxDispatch(
                togglePostLike({
                    uid: auth.currentUser?.uid,
                    postID,
                })
            );
        } catch (err) {
            console.log('error', err);
            if (_isMounted()) {
                _togglePostLikes();
            }
        }
    }, [reduxDispatch, _togglePostLikes, _isMounted, postID]);
    const updateCommentLikes = useCallback(
        async (commentID) => {
            try {
                _toggleCommentLikes(commentID);
                await updateLikeAsync(commentID, comment);
            } catch (err) {
                console.log('error', err);
                if (_isMounted()) {
                    _toggleCommentLikes(commentID);
                }
            }
        },
        [_toggleCommentLikes, _isMounted]
    );
    const _fetchFirstComments = useCallback(async () => {
        _updateLoadCanceled(false);
        _initializeLoading();
        try {
            const commentsSnapshot = await getDocsFromServer(
                query(
                    collection(firestore, 'comments'),
                    where('parentPostID', '==', postID),
                    orderBy('createdAt', 'desc'),
                    limit(5)
                )
            );
            if (_isMounted() && !_isLoadCanceled()) {
                if (commentsSnapshot.empty) {
                    throw new Error(noComment);
                } else {
                    _updateComments(commentsSnapshot.docs.map(_mapComment));
                }
            }
        } catch (err) {
            console.log('error', err);
            if (_isMounted() && !_isLoadCanceled) {
                _updateLoadError(err.code ?? err.message);
            }
        }
    }, [
        _isMounted,
        _mapComment,
        _updateLoadError,
        _initializeLoading,
        postID,
        _updateComments,
        _isLoadCanceled,
        _updateLoadCanceled,
    ]);
    const _fetchComments = useCallback(async () => {
        _updateLoadCanceled(false);
        _initializeLoading();
        try {
            const postDetails = state.postDetails;
            const commentsSnapshot = await getDocsFromServer(
                query(
                    collection(firestore, 'comments'),
                    where('parentPostID', '==', postID),
                    orderBy('createdAt', 'desc'),
                    startAfter(
                        await getDocFromServer(
                            doc(
                                firestore,
                                'comments',
                                postDetails[postDetails.length - 1].commentID
                            )
                        )
                    ),
                    limit(5)
                )
            );
            if (_isMounted() && !_isLoadCanceled()) {
                if (commentsSnapshot.empty) {
                    throw new Error(noComment);
                } else {
                    _updateComments(commentsSnapshot.docs.map(_mapComment));
                }
            }
        } catch (err) {
            console.log('error', err);
            if (_isMounted() && !_isLoadCanceled()) {
                _updateLoadError(err.code ?? err.message);
            }
        }
    }, [
        _mapComment,
        _isMounted,
        _updateLoadError,
        _initializeLoading,
        postID,
        state.postDetails,
        _updateComments,
        _isLoadCanceled,
        _updateLoadCanceled,
    ]);
    const fetchComments = useCallback(() => {
        if (!state.loading && !state.loadError && !state.refreshing) {
            if (state.postDetails.length > 2) {
                _fetchComments();
            } else {
                _fetchFirstComments();
            }
        }
    }, [
        state.loadError,
        _fetchComments,
        state.postDetails,
        _fetchFirstComments,
        state.loading,
        state.refreshing,
    ]);
    const onRetryLoadComment = useCallback(() => {
        if (state.postDetails.length < 2) {
            _fetchFirstComments();
        } else {
            _fetchComments();
        }
    }, [_fetchComments, _fetchFirstComments, state.postDetails]);
    const _commentOperation = useCallback(
        async (comment, commentID) => {
            try {
                const docObj = {
                    comment,
                    parentPostID: postID,
                    owner: auth.currentUser.uid,
                    createdAt: Date.now(),
                    username: auth.currentUser.displayName,
                    likes: [],
                };
                await createDocAsync(docObj, ['comments', commentID]);
                if (_isMounted()) {
                    dispatch({
                        type: COMMENT_SUCCESSFUL,
                        payload: { ...docObj, commentID },
                    });
                }
                await timerPromiseAsync(1000);
                if (_isMounted()) {
                    dispatch({ type: CLEAR_COMMENT_SUCCESSFUL });
                }
            } catch (err) {
                console.log('error', err);
                if (_isMounted()) {
                    dispatch({
                        type: COMMENT_FAILED,
                    });
                }
            }
        },
        [postID, _isMounted]
    );
    const writeComment = useCallback(
        (comment) => {
            dispatch({ type: INITIATE_COMMENT, payload: comment });
            _commentOperation(comment, uuidv1());
        },
        [_commentOperation]
    );
    const rewriteComment = useCallback(() => {
        dispatch({ type: RESET_COMMENT_FAILED });
        _commentOperation(state.comment, uuidv1());
    }, [state.comment, _commentOperation]);
    const closeCommentResult = useCallback(() => {
        if (state.commentSuccessful) {
            dispatch({
                type: CLEAR_COMMENT_SUCCESSFUL,
            });
        } else if (state.commentFailed) {
            dispatch({
                type: CLEAR_COMMENT_FAILED,
            });
        }
    }, [state.commentSuccessful, state.commentFailed]);
    const onRefresh = useCallback(async () => {
        _updateLoadCanceled(true);
        dispatch({
            type: INITIATE_REFRESHING,
        });
        try {
            const commentsSnapshot = await getDocsFromServer(
                query(
                    collection(firestore, 'comments'),
                    where('parentPostID', '==', postID),
                    orderBy('createdAt', 'desc'),
                    limit(5)
                )
            );
            if (_isMounted()) {
                if (commentsSnapshot.empty) {
                    throw new Error(noComment);
                } else {
                    dispatch({
                        type: REFRESHING_SUCCESSFUL,
                        payload: commentsSnapshot.docs.map(_mapComment),
                    });
                }
            }
        } catch (err) {
            console.log('error', err);
            if (_isMounted()) {
                dispatch({
                    type: REFRESHING_FAILED,
                    payload: err.code ?? err.message,
                });
            }
        }
    }, [_isMounted, _mapComment, postID, _updateLoadCanceled]);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    });
    useEffect(() => {
        const unsubscribe = onSnapshot(
            doc(firestore, 'posts', postID),
            (snapshot) => {
                if (!_isMounted()) {
                    unsubscribe();
                } else {
                    if (snapshot.exists()) {
                        const data = snapshot.data();
                        const { category, title, body } = data;

                        dispatch({
                            type: UPDATE_POST,
                            payload: {
                                ...data,
                                postID,
                            },
                        });

                        reduxDispatch(
                            updatePost({
                                postID,
                                searchField:
                                    category + '. ' + title + '. ' + body,
                                ...data,
                            })
                        );
                    }
                }
            }
        );
    }, [reduxDispatch, postID, _isMounted]);

    return [
        state.postDetails,
        updatePostLikes,
        updateCommentLikes,
        state.loading,
        state.loadError,
        fetchComments,
        onRetryLoadComment,
        writeComment,
        rewriteComment,
        closeCommentResult,
        state.commentResultVisible,
        state.commenting,
        state.commentSuccessful,
        state.commentFailed,
        state.refreshing,
        onRefresh,
    ];
}
