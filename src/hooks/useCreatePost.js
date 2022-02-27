import { useReducer, useRef, useEffect, useCallback } from 'react';
import createPostAsync from '../helperFunctions/createPostAsync';
import deletePostAsync from '../helperFunctions/deletePostAsync';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import updateModalStatus from '../redux/actions/updateModalStatus';

export default function useCreatePost() {
    //Actions
    const POST_SUCCESSFUL = 'POST_SUCCESSFUL';
    const POST_FAILED = 'POST_FAILED';
    const UPDATE_POST = 'UPDATE_POST';
    const RESET_SUCCESSFUL_POST_ACTION = 'RESET_SUCCESSFUL_POST_ACTION';
    const RESET_FAILED_POST_ACTION = 'RESET_FAILED_POST_ACTION';
    const INITIATE_ACTIVITY = 'ACTIVATE_ACTIVITY';
    const CLEAR_POST_ERROR = 'CLEAR_POST_ERROR';

    //Reducer
    const reducer = (state, action) => {
        switch (action.type) {
            case POST_SUCCESSFUL:
                return { ...state, postSuccessful: true, postData: null };
            case POST_FAILED:
                return { ...state, postError: true };
            case UPDATE_POST:
                return { ...state, postData: action.payload };
            case RESET_SUCCESSFUL_POST_ACTION:
                return {
                    ...state,
                    activityIndicator: false,
                    postSuccessful: false,
                };
            case RESET_FAILED_POST_ACTION:
                return {
                    ...state,
                    activityIndicator: false,
                    postData: null,
                    postError: false,
                };
            case CLEAR_POST_ERROR:
                return { ...state, postError: false };
            default:
                return state;
        }
    };

    //State & Dispatch
    const [state, dispatch] = useReducer(reducer, {
        activityIndicator: false,
        postData: null,
        postSuccessful: false,
        postError: false,
    });
    const reduxDispatch = useDispatch();

    //State Ref
    const postRef = useRef(null);
    postRef.current = state.postData;
    const postSuccessfulRef = useRef(null);
    postSuccessfulRef.current = state.postSuccessful;

    //Action Creators
    const updatePost = (payload) => dispatch({ type: UPDATE_POST, payload });
    const updatePostStatus = (passed) =>
        dispatch({ type: passed ? POST_SUCCESSFUL : POST_FAILED });
    const resetSuccessfulPostAction = useCallback(() => {
        dispatch({ type: RESET_SUCCESSFUL_POST_ACTION });
        reduxDispatch(updateModalStatus());
    }, [reduxDispatch]);
    const timedResetSuccessfulPostAction = useCallback(
        (active) =>
            setTimeout(
                () =>
                    active &&
                    postSuccessfulRef.current &&
                    resetSuccessfulPostAction(),
                2000
            ),
        [resetSuccessfulPostAction]
    );
    const resetFailedPostAction = () => {
        dispatch({ type: RESET_FAILED_POST_ACTION });
        reduxDispatch(updateModalStatus());
    };
    const initiateActivity = () => dispatch({ type: INITIATE_ACTIVITY });
    const clearPostError = () => dispatch({ type: CLEAR_POST_ERROR });

    //Helper fns
    const createPostWithTimer = async (data, timer) =>
        new Promise((resolve, reject) => {
            createPostAsync(data).then((res) => resolve(res));
            setTimeout(() => {
                if (postRef.current) {
                    reject();
                }
            }, timer);
        });

    const writePost = async (data) => {
        initiateActivity();
        updatePost(data);
        const postID = uuidv4();
        try {
            await createPostWithTimer({ ...data, postID }, 5000);
            // await createPostAsync({ ...data, postID });
            updatePostStatus(true);
        } catch (err) {
            deletePostAsync(postID);
            updatePostStatus(false);
        }
    };
    const retryWrite = async () => {
        clearPostError();
        const postID = uuidv4();
        try {
            await createPostWithTimer({ ...state.postData, postID }, 3000);
            updatePostStatus(true);
        } catch {
            deletePostAsync(postID);
            updatePostStatus(false);
        }
    };

    useEffect(() => {
        let active = true;
        if (state.postSuccessful) {
            timedResetSuccessfulPostAction(active);
        }
        return () => {
            active = false;
        };
    }, [state.postSuccessful, timedResetSuccessfulPostAction]);

    return [
        state.postSuccessful,
        state.postError,
        state.activityIndicator,
        writePost,
        resetFailedPostAction,
        resetSuccessfulPostAction,
        retryWrite,
    ];
}
