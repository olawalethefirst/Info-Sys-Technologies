import React from 'react';
import useGoogleAuth from '../hooks/useGoogleAuth';
import AuthModal from './AuthModal';

// eslint-disable-next-line no-undef
const GoogleAuthContainer = ({ native, children }) => {
    const [
        activateModal, //1
        modalVisible, //2
        activityIndicator, //3
        error, //4
        retryAuth, //5
        dismissModal, //6
        resetError, //7
        retryAbleError, //8
        navigate, //9
        ...extraArray
        // eslint-disable-next-line react-hooks/rules-of-hooks
    ] = useGoogleAuth(native);

    const [authenticateUserAsync] = native ? extraArray : [null];
    const [request, initiatePromptAsync] = !native ? extraArray : [null, null];
    const onPress = () => {
        if (native) {
            activateModal();
            authenticateUserAsync();
        } else {
            activateModal();
            initiatePromptAsync();
        }
    };
    const disabled = native ? activityIndicator : !request || activityIndicator;

    return (
        <>
            {children(onPress, disabled)}
            {/* <AuthModal
                modalVisible={modalVisible}
                activityIndicator={activityIndicator}
                error={error}
                retryFirebaseAuth={retryAuth}
                dismissModal={dismissModal}
                resetError={resetError}
                retryAuth={retryAuth}
                retryAbleError={retryAbleError}
                navigate={navigate}
            /> */}
        </>
    );
};

export default GoogleAuthContainer;
