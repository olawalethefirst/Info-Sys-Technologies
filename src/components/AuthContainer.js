import React from 'react';
import useAuth from '../hooks/useAuth';
import AuthModal from './AuthModal';

// eslint-disable-next-line no-undef
const GoogleAuthContainer = ({ createAccount, children, email, password }) => {
    const [
        modalVisible,
        error,
        resetError,
        activityIndicator,
        dismissModal,
        retryAbleError,
        retryAuth,
        initiateAuth,
    ] = useAuth(createAccount);

    const onPress = ({ email, password }) => {
        initiateAuth(email, password);
    };

    return (
        <>
            {children(onPress)}
            <AuthModal
                modalVisible={modalVisible}
                activityIndicator={activityIndicator}
                error={error}
                retryAuth={() => retryAuth(email, password)()}
                dismissModal={dismissModal}
                resetError={resetError}
                retryAbleError={retryAbleError}
            />
        </>
    );
};

export default GoogleAuthContainer;
