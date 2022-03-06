import React from 'react';
import useAuth from '../hooks/useAuth';
import AuthModal from './AuthModal';

const AuthContainer = ({ createAccount, children, email, password }) => {
    const [
        modalVisible,
        error,
        resetError,
        activityIndicator,
        dismissModal,
        retryAbleError,
        retryAuth,
        initiateAuth,
        navigate,
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
                navigate={navigate}
            />
        </>
    );
};

export default AuthContainer;
