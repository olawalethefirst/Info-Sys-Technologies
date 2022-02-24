import { useState } from 'react';
import signUpWithEmailAsync from '../helperFunctions/signUpWithEmailAsync';
import signInWithEmailAsync from '../helperFunctions/signInWIthEmailAsync';
import fetchAccountProvider from '../helperFunctions/fetchAccountProviderAsync';

const useAuth = (createAccount) => {
    //states
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState('');
    const [navigate, setNavigate] = useState(false);
    const [activityIndicator, setActivityIndicator] = useState(false);
    const firebaseNetworkError =
        'A network error (such as timeout, interrupted connection or unreachable host) has occurred.';
    const invalidPassword =
        'The password is invalid or the user does not have a password.';
    const retryAbleError = error === firebaseNetworkError;

    //helper functions
    const activateModal = () => setModalVisible((oldState) => !oldState);
    const resetError = () => setError('');
    const auth = (email, password) =>
        createAccount
            ? signUpWithEmailAsync(email, password)
            : signInWithEmailAsync(email, password);
    const dismissModal = () => {
        setModalVisible((oldState) => !oldState);
    };
    const deactivateModal = () => {
        setActivityIndicator(false);
        setTimeout(() => {
            dismissModal();
        }, 1000);
    };
    const persistAuthWithError = (message) => {
        setError(message);
        setActivityIndicator(false);
    };
    const processInvalidPassword = async (email) => {
        try {
            console.log('about to try with email', `...${email}...`);
            const providers = await fetchAccountProvider(email);
            if (providers.length === 1 && providers[0] === 'google.com') {
                persistAuthWithError('Login with Google instead.');
            } else {
                persistAuthWithError(invalidPassword);
            }
        } catch {
            persistAuthWithError(firebaseNetworkError);
        }
    };
    const processError = (message, email) => {
        switch (message) {
            case invalidPassword:
                return processInvalidPassword(email);
            default:
                return persistAuthWithError(message);
        }
    };
    const connectAuth = async (email, password) => {
        try {
            await auth(email, password);
            setNavigate(true);
            deactivateModal();
        } catch ({ message }) {
            processError(message, email);
        }
    };
    const retryAuth = (email, password) => () => {
        resetError();
        setActivityIndicator(true);
        connectAuth(email, password);
    };
    const initiateAuth = (email, password) => {
        setNavigate((oldValue) => {
            if (oldValue) {
                return !oldValue;
            }
        });
        resetError();
        setActivityIndicator(true);
        activateModal();
        connectAuth(email, password);
    };

    return [
        modalVisible,
        error,
        resetError,
        activityIndicator,
        dismissModal,
        retryAbleError,
        retryAuth,
        initiateAuth,
        navigate,
    ];
};

export default useAuth;
