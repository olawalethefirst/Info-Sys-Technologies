import React from 'react';
import { Button, View } from 'react-native';
import useGoogleAuth from '../hooks/useGoogleAuth';
import AuthModal from './AuthModal';

// eslint-disable-next-line no-undef
const GoogleAuthButton = ({ native }) => {
    if (native) {
        const [
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
            // eslint-disable-next-line react-hooks/rules-of-hooks
        ] = useGoogleAuth(native);
        return (
            <View>
                <Button
                    title="Toggle Auth"
                    onPress={() => {
                        setError('');
                        setAuthorized(false);
                        activateModal();
                        authenticateUserAsync();
                    }}
                />
                <AuthModal
                    modalVisible={modalVisible}
                    activityIndicator={activityIndicator}
                    authorized={authorized}
                    error={error}
                    firebaseNetworkError={firebaseNetworkError}
                    retryFirebaseAuth={retryFirebaseAuth}
                    dismissModal={dismissModal}
                />
            </View>
        );
    } else {
        const [
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
            // eslint-disable-next-line react-hooks/rules-of-hooks
        ] = useGoogleAuth(native);
        return (
            <View>
                <Button
                    title="Toggle"
                    onPress={() => {
                        setError('');
                        setAuthorized(false);
                        activateModal();
                        promptAsync({ useProxy: true });
                    }}
                    //disabled when !request because cannot promptAsync without request
                    // disabled when !activityIndicator because cannot have multiple requests at a go
                    disabled={!request || activityIndicator}
                />
                <AuthModal
                    modalVisible={modalVisible}
                    activityIndicator={activityIndicator}
                    authorized={authorized}
                    error={error}
                    firebaseNetworkError={firebaseNetworkError}
                    retryFirebaseAuth={retryFirebaseAuth}
                    dismissModal={dismissModal}
                />
            </View>
        );
    }
};

export default GoogleAuthButton;
