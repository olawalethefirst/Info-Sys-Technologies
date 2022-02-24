import { useState, useEffect, useCallback } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as GoogleSignIn from 'expo-google-sign-in';
import authWithCredentialAsync from '../helperFunctions/authWithCredentialAsync';
import createCredential from '../helperFunctions/createCredential';
import { clientId } from '../../config';

export default function useGoogleAuth(native) {
    //Universal States
    const [modalVisible, setModalVisible] = useState(false);
    const [navigate, setNavigate] = useState(false);
    const [activityIndicator, setActivityIndicator] = useState(false);
    const [credential, setCredential] = useState(null);
    const [error, setError] = useState('');
    const [retryAbleError, setRetryAbleError] = useState(false);
    const firebaseNetworkError =
        'A network error (such as timeout, interrupted connection or unreachable host) has occurred.';

    const resetError = () => setError('');
    const activateModal = () => {
        setNavigate((oldValue) => {
            if (oldValue) {
                return !oldValue;
            }
        });
        resetError();
        setActivityIndicator(true);
        setModalVisible(true);
    };
    const deactivateModal = () => {
        setActivityIndicator(false);
        setTimeout(() => {
            setModalVisible(false);
        }, 1000);
    };
    const persistModalWithError = () => {
        setActivityIndicator(false);
    };
    const dismissModal = () => {
        setModalVisible(false);
    };
    const retryAuth = () => {
        resetError();
        setActivityIndicator(true);
        authWithCredentialAsync(credential)
            .then(() => {
                setNavigate(true);
                deactivateModal();
            })
            .catch((e) => {
                if (e.message === firebaseNetworkError) {
                    setError(e.message);
                    persistModalWithError();
                } else {
                    deactivateModal();
                }
            });
    };
    const syncGoogleAuthWithFirebaseAsync = useCallback((credential) => {
        authWithCredentialAsync(credential)
            .then(() => {
                setNavigate(true);
                deactivateModal();
            })
            .catch((e) => {
                setError(e.message);
                if (e.message === firebaseNetworkError) {
                    persistModalWithError();
                } else {
                    deactivateModal();
                }
            });
    }, []);

    //RetryAble Error Update
    useEffect(() => setRetryAbleError(error === firebaseNetworkError), [error]);

    // Expo Approach
    const [request, response, promptAsync] = !native
        ? // eslint-disable-next-line react-hooks/rules-of-hooks
          Google.useIdTokenAuthRequest({
              clientId: clientId.googleClientID,
          })
        : [null, null, null];

    const initiatePromptAsync = () => promptAsync({ useProxy: true });

    !native &&
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (response?.type === 'success') {
                const { id_token } = response.params;
                const credential = createCredential(id_token);
                setCredential(credential);
                syncGoogleAuthWithFirebaseAsync(credential);
            } else if (response) {
                deactivateModal();
            }
        }, [response, syncGoogleAuthWithFirebaseAsync]);

    // Native Approach
    const [initState, setInitState] = useState(null);
    const [googleUser, setGoogleUser] = useState(null);
    const initAsync = async () => {
        try {
            await GoogleSignIn.initAsync();
            setInitState(true);
        } catch {
            setInitState(null);
        }
    };
    const authenticateUserAsync = async () => {
        try {
            if (!initState) {
                await GoogleSignIn.initAsync();
                setInitState(true);
            }
            try {
                await GoogleSignIn.askForPlayServicesAsync();
                const { type, user } = await GoogleSignIn.signInAsync();
                if (type === 'success') {
                    setGoogleUser(user);
                    const credential = createCredential(
                        googleUser.auth.idToken
                    );
                    setCredential(credential);
                    syncGoogleAuthWithFirebaseAsync(credential);
                } else {
                    throw new Error('Canceled');
                }
            } catch ({ message }) {
                deactivateModal();
            }
        } catch ({ message }) {
            deactivateModal();
        }
    };

    native &&
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            initAsync();
        }, []);

    const extraArray = native
        ? [authenticateUserAsync]
        : [request, initiatePromptAsync];

    return [
        activateModal, //1
        modalVisible, //2
        activityIndicator, //3
        error, //4
        retryAuth, //5
        dismissModal, //6
        resetError, //7
        retryAbleError, //8
        navigate, //9
        ...extraArray,
    ];
}
