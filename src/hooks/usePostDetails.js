import { useCallback, useRef, useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import updateLikeAsync from '../helperFunctions/updateLikeAsync';
import { comment } from '../constants';
import { auth, firestore } from '../helperFunctions/initializeFirebase';
import togglePostLike from '../redux/actions/togglePostLike';
import {
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
import { commentsLimit } from '../constants';

export default function usePostDetails(initialPostData) {
    const isMounted = useRef(false);
    const loadCanceled = useRef(false);
    const postID = useRef(initialPostData.postID).current;
    const post = useRef({
        ...initialPostData,
        likedTimestamp:
            initialPostData.likes[auth.currentUser?.uid] ?? Date.now(),
    }).current;

    const INITIATE_LOADING = 'INITIATE_LOADING';
    const ACTIVATE_LOAD_ERROR = 'ACTIVATE_LOAD_ERROR';
    const UPDATE_COMMENTS = 'UPDATE_COMMENT';
    const INITIATE_COMMENT = 'INITIATE_COMMENT';
    const COMMENT_SUCCESSFUL = 'COMMENT_SUCCESSFUL';
    const COMMENT_FAILED = 'COMMENT_FAILED';
    const RESET_COMMENT_FAILED = 'RESET_COMMENT_FAILED';
    const CLEAR_COMMENT_SUCCESSFUL = 'CLEAR_COMMENT_SUCCESSFUL';
    const CLEAR_COMMENT_FAILED = 'CLEAR_COMMENT_FAILED';
    const INITIATE_REFRESHING = 'INITIATE_REFRESHING';
    const REFRESHING_FAILED = 'REFRESHING_FAILED';
    const REFRESHING_SUCCESSFUL = 'REFRESHING_SUCCESSFUL';
    const ADD_POST_LIKE = 'ADD_POST_LIKE';
    const REMOVE_POST_LIKE = 'REMOVE_POST_LIKE';
    const ADD_COMMENT_LIKE = 'ADD_COMMENT_LIKE';
    const REMOVE_COMMENT_LIKE = 'REMOVE_COMMENT_LIKE';
    const ADD = 'ADD';
    const REMOVE = 'REMOVE';

    const _toggleLike = useCallback((type, uid, likes, timestamp) => {
        const newLikes = { ...likes };
        switch (type) {
            case ADD: {
                if (newLikes[uid] !== timestamp) {
                    newLikes[uid] = timestamp;
                    return newLikes;
                }
                return likes;
            }
            case REMOVE: {
                if (likes[uid]) {
                    delete newLikes[uid];
                    return newLikes;
                }
                return likes;
            }
            default:
                return likes;
        }
    }, []);
    const _reducer = (state, action) => {
        switch (action.type) {
            case INITIATE_LOADING:
                return {
                    ...state,
                    loading: true,
                    loadError: null,
                };
            case ACTIVATE_LOAD_ERROR:
                return { ...state, loadError: action.payload, loading: false };
            case UPDATE_COMMENTS:
                return {
                    ...state,
                    postDetails: [...state.postDetails, ...action.payload],
                    loading: false,
                    loadError: action.payload.length < commentsLimit ? noComment : null,
                };
            case ADD_POST_LIKE: {
                const post = state.postDetails[0];
                const postLikes = post.likes;
                const { timestamp, uid } = action.payload;
                const oldTimestamp = post.likedTimestamp;
                const shouldUpdate = timestamp >= oldTimestamp;
                return {
                    ...state,
                    postDetails: [
                        {
                            ...post,
                            likes: shouldUpdate
                                ? _toggleLike(ADD, uid, postLikes, timestamp)
                                : postLikes,
                            likedTimestamp: shouldUpdate
                                ? timestamp
                                : oldTimestamp,
                        },
                        ...state.postDetails.slice(1),
                    ],
                };
            }
            case REMOVE_POST_LIKE: {
                const post = state.postDetails[0];
                const postLikes = post.likes;
                const { timestamp, uid } = action.payload;
                const oldTimestamp = post.likedTimestamp;
                const shouldUpdate = timestamp >= oldTimestamp;
                return {
                    ...state,
                    postDetails: [
                        {
                            ...post,
                            likes: shouldUpdate
                                ? _toggleLike(REMOVE, uid, postLikes)
                                : postLikes,
                            likedTimestamp: shouldUpdate
                                ? timestamp
                                : oldTimestamp,
                        },
                        ...state.postDetails.slice(1),
                    ],
                };
            }
            case ADD_COMMENT_LIKE: {
                const {
                    payload: { timestamp, commentID, uid },
                } = action;

                return {
                    ...state,
                    postDetails: state.postDetails.map((postDetail) => {
                        if (postDetail.commentID === commentID) {
                            const postDetailLikes = postDetail.likes;
                            const oldTimestamp = postDetail.likedTimestamp;
                            const shouldUpdate = timestamp >= oldTimestamp;

                            return {
                                ...postDetail,
                                likes: shouldUpdate
                                    ? _toggleLike(
                                          ADD,
                                          uid,
                                          postDetailLikes,
                                          timestamp
                                      )
                                    : postDetailLikes,
                                likedTimestamp: shouldUpdate
                                    ? timestamp
                                    : oldTimestamp,
                            };
                        }
                        return postDetail;
                    }),
                };
            }
            case REMOVE_COMMENT_LIKE: {
                const {
                    payload: { timestamp, commentID, uid },
                } = action;
                return {
                    ...state,
                    postDetails: state.postDetails.map((postDetail) => {
                        if (postDetail.commentID === commentID) {
                            const postDetailLikes = postDetail.likes;
                            const oldTimestamp = postDetail.likedTimestamp;
                            const shouldUpdate = timestamp >= oldTimestamp;
                            return {
                                ...postDetail,
                                likes: shouldUpdate
                                    ? _toggleLike(REMOVE, uid, postDetailLikes)
                                    : postDetailLikes,
                                likedTimestamp: shouldUpdate
                                    ? timestamp
                                    : oldTimestamp,
                            };
                        }
                        return postDetail;
                    }),
                };
            }
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
                    postDetails: [...action.payload],
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
        postDetails: [post], //initialize with only needed data
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
    const _togglePostLikes = useCallback((liked, timestamp, uid) => {
        dispatch({
            type: liked ? REMOVE_POST_LIKE : ADD_POST_LIKE,
            payload: { timestamp, uid },
        });
    }, []);
    const _toggleCommentLikes = useCallback(
        (liked, commentID, uid, timestamp) =>
            dispatch({
                type: liked ? REMOVE_COMMENT_LIKE : ADD_COMMENT_LIKE,
                payload: { commentID, timestamp, uid },
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
        const data = doc.data();
        return {
            commentID,
            ...data,
            likedTimestamp: data.likes[auth.currentUser?.uid] ?? Date.now(),
        };
    }, []);
    const _updateLoadError = useCallback((payload) => {
        dispatch({
            type: ACTIVATE_LOAD_ERROR,
            payload,
        });
    }, []);
    const _updateComments = useCallback((payload) => {
        dispatch({
            type: UPDATE_COMMENTS,
            payload,
        });
    }, []);
    const updatePostLikes = useCallback(
        async (liked) => {
            const uid = auth.currentUser?.uid;
            if (uid) {
                const timestamp = Date.now();
                try {
                    _togglePostLikes(liked, timestamp, uid);
                    await updateLikeAsync(postID, timestamp, liked, uid);
                    reduxDispatch(
                        togglePostLike(liked, {
                            uid,
                            postID,
                            timestamp,
                        })
                    );
                } catch (err) {
                    console.log('error', err);
                    if (_isMounted()) {
                        _togglePostLikes(!liked, timestamp, uid);
                    }
                }
            }
        },
        [reduxDispatch, _togglePostLikes, _isMounted, postID]
    );
    const updateCommentLikes = useCallback(
        async (liked, commentID) => {
            const uid = auth.currentUser?.uid;
            if (uid) {
                const timestamp = Date.now();
                try {
                    _toggleCommentLikes(liked, commentID, uid, timestamp);
                    await updateLikeAsync(
                        commentID,
                        timestamp,
                        liked,
                        uid,
                        comment
                    );
                } catch (err) {
                    console.log('error', err);
                    if (_isMounted() && !_isLoadCanceled()) {
                        _toggleCommentLikes(!liked, commentID, uid, timestamp);
                    }
                }
            }
        },
        [_toggleCommentLikes, _isMounted, _isLoadCanceled]
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
                    limit(commentsLimit)
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
            const last = await getDocFromServer(
                doc(
                    firestore,
                    'comments',
                    postDetails[postDetails.length - 1].commentID
                )
            );
            const commentsSnapshot = await getDocsFromServer(
                query(
                    collection(firestore, 'comments'),
                    where('parentPostID', '==', postID),
                    orderBy('createdAt', 'desc'),
                    startAfter(last),
                    limit(commentsLimit)
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
            if (state.postDetails.length === 1) {
                _fetchFirstComments();
            } else {
                _fetchComments();
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
                    owner: auth.currentUser?.uid,
                    createdAt: Date.now(),
                    username: auth.currentUser?.displayName,
                    likes: {},
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
            const postSnapshot = await getDocFromServer(
                doc(firestore, 'posts', postID)
            );
            const commentsSnapshot = await getDocsFromServer(
                query(
                    collection(firestore, 'comments'),
                    where('parentPostID', '==', postID),
                    orderBy('createdAt', 'desc'),
                    limit(commentsLimit)
                )
            );
            const post = postSnapshot.data();
            const { category, title, body } = post;
            reduxDispatch(
                updatePost({
                    postID,
                    searchField: category + '. ' + title + '. ' + body,
                    ...post,
                })
            );

            if (_isMounted()) {
                if (commentsSnapshot.empty) {
                    dispatch({
                        type: REFRESHING_SUCCESSFUL,
                        payload: [
                            {
                                ...post,
                                postID,
                                likedTimestamp:
                                    // eslint-disable-next-line no-prototype-builtins
                                    post.likes.hasOwnProperty(
                                        auth.currentUser?.uid
                                    ) ?? Date.now(),
                            },
                        ],
                    });
                    throw new Error(noComment);
                } else {
                    dispatch({
                        type: REFRESHING_SUCCESSFUL,
                        payload: [
                            {
                                ...post,
                                postID,
                                likedTimestamp:
                                    // eslint-disable-next-line no-prototype-builtins
                                    post.likes.hasOwnProperty(
                                        auth.currentUser?.uid
                                    ) ?? Date.now(),
                            },
                            ...commentsSnapshot.docs.map(_mapComment),
                        ],
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
    }, [_isMounted, _mapComment, postID, _updateLoadCanceled, reduxDispatch]);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    });

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
