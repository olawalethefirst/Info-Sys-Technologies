import { useState, useRef } from 'react';
import createPostAsync from '../helperFunctions/createPostAsync';
import deleteCreatePostRequestAsync from '../helperFunctions/deleteCreatePostRequestAsync';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { Keyboard } from 'react-native';

export default function useCreatePost(toggleModal) {
    //States
    const [postData, setPostData] = useState(null);
    const [postSuccessful, setPostSuccessful] = useState(false);
    const [postError, setPostError] = useState(false);
    const activityIndicator = useRef(false);
    activityIndicator.current =
        (postData && !postError) || (postData && !postSuccessful);

    //Helper Functions
    const updatePostState = (postData) => setPostData(postData);
    const resetPostSuccessful = () => {
        setPostData(null);
        setPostSuccessful(false);
    };
    const resetPostError = () => {
        setPostData(null);
        setPostError(false);
    };
    const createPost = ({ title, body, category }) => {
        Keyboard.dismiss();
        toggleModal();
        const postID = uuidv4();
        const data = { title, body, category, postID };
        console.log(data);
        updatePostState(data);
        createPostAsync(title, body, category, postID)
            .then(() => {
                console.log('posted successfully');
                updatePostState(null);
            })
            .catch(() => console.log('failed'));
        const timer = new Promise((resolve) =>
            setTimeout(() => resolve(true), 5000)
        );
        timer.then(() => {
            let postData;
            setPostData((oldState) => {
                postData = oldState;
                return oldState;
            });
            console.log('postData current data verification', postData);
            if (postData) {
                deleteCreatePostRequestAsync(postID)
                    .then(() => console.log('delete successful'))
                    .catch(() => console.log('delete failed'));
                setPostError(true);
            } else {
                console.log('post confirmed successful');
                setPostSuccessful(true);
                setTimeout(() => {
                    resetPostSuccessful();
                }, 2000);
            }
        });
    };
    const retryCreatePost = () => {
        setPostError(false);
        const { title, body, category, postID } = postData;
        createPostAsync(title, body, category, postID)
            .then(() => updatePostState(null))
            .catch(() => console.log('failed'));
        const timer = new Promise((resolve) =>
            setTimeout(() => resolve(true), 3000)
        );
        timer.then(() => {
            let postData;
            setPostData((oldState) => {
                postData = oldState;
                return oldState;
            });
            console.log('postData current data verification', postData);
            if (postData) {
                deleteCreatePostRequestAsync(postID)
                    .then(() => console.log('delete successful'))
                    .catch(() => console.log('delete failed'));
                setPostError(true);
            } else {
                console.log('post confirmed successful');
                setPostSuccessful(true);
                setTimeout(() => {
                    resetPostSuccessful();
                }, 2000);
            }
        });
    };

    return [
        postSuccessful,
        postError,
        activityIndicator,
        createPost,
        resetPostError,
        resetPostSuccessful,
        retryCreatePost,
    ];
}
