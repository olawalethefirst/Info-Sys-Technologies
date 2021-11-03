import { useState, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as GoogleSignIn from 'expo-google-sign-in';
import authWithCredentialAsync from '../helperFunctions/authWithCredentialAsync';
import createCredential from '../helperFunctions/createCredential';
import { useDispatch } from 'react-redux';
import updateNewUser from '../redux/actions/updateNewUser';

export default function useGoogleAuth(native) {
    //Universal States
    const [modalVisible, setModalVisible] = useState(false);
    const [activityIndicator, setActivityIndicator] = useState(false);
    const [credential, setCredential] = useState(null);
    const [authorized, setAuthorized] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const firebaseNetworkError =
        'A network error (such as timeout, interrupted connection or unreachable host) has occurred.';

    //Universal Functions
    const activateModal = () => {
        setActivityIndicator(true);
        setModalVisible(true);
    };
    const deactivateModal = () => {
        setActivityIndicator(false);
        setTimeout(() => setModalVisible(false), 400);
    };
    const persistModalWithError = () => {
        setActivityIndicator(false);
    };
    const dismissModal = () => {
        setModalVisible(false);
    };
    const retryFirebaseAuth = () => {
        setError('');
        setActivityIndicator(true);
        authWithCredentialAsync(credential)
            .then((res) => {
                dispatch(updateNewUser(res.additionalUserInfo.isNewUser));
                setAuthorized(true);
                deactivateModal();
            })
            .catch((e) => {
                if (e.message === firebaseNetworkError) {
                    persistModalWithError();
                    setError(e.message);
                } else {
                    deactivateModal();
                }
            });
    };
    const syncGoogleAuthWithFirebaseAsync = (credential) => {
        authWithCredentialAsync(credential)
            .then((res) => {
                dispatch(updateNewUser(res.additionalUserInfo.isNewUser));
                setAuthorized(true);
                deactivateModal();
            })
            .catch((e) => {
                if (e.message === firebaseNetworkError) {
                    persistModalWithError();
                    setError(e.message);
                } else {
                    deactivateModal();
                }
            });
    };

    // Expo Approach
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId:
            '173918698726-gb70pgv7tu67ufqrq73if4i3fv3jvjsi.apps.googleusercontent.com',
    });

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
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [response]);

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
                await initAsync();
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

    if (native) {
        return [
            activateModal,
            modalVisible,
            activityIndicator,
            authorized,
            error,
            authenticateUserAsync,
            retryFirebaseAuth,
            dismissModal,
            firebaseNetworkError,
            setError,
            setAuthorized,
        ];
    } else {
        return [
            activateModal,
            modalVisible,
            activityIndicator,
            authorized,
            error,
            request,
            promptAsync,
            retryFirebaseAuth,
            dismissModal,
            firebaseNetworkError,
            setError,
            setAuthorized,
        ];
    }
}
