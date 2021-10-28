import React from 'react';
import { Modal, Text, Button, View, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-undef
const AuthModal = ({
    modalVisible,
    activityIndicator,
    authorized,
    error,
    firebaseNetworkError,
    retryFirebaseAuth,
    dismissModal,
}) => {
    const { statusBarHeight } = Constants;

    return (
        <Modal
            visible={modalVisible}
            onRequestClose={null}
            supportedOrientations={['portrait']}
            transparent={true}
            animationType="fade"
            statusBarTranslucent={true}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(22, 27, 38, 0.95)',
                    marginTop: statusBarHeight,
                }}
            >
                {activityIndicator ? (
                    <ActivityIndicator color="#1A91D7" />
                ) : (
                    <Text
                        style={[
                            {
                                fontSize: 18,
                                fontWeight: '500',
                                opacity: error ? 0 : 1,
                            },
                            authorized ? { color: 'white' } : { color: 'red' },
                        ]}
                    >
                        {authorized ? 'Successful!' : 'Failed!'}
                    </Text>
                )}

                <View
                    style={{
                        opacity: error === firebaseNetworkError ? 1 : 0,
                    }}
                >
                    <Text
                        style={[
                            {
                                fontSize: 18,
                                fontWeight: '500',
                                color: 'red',
                                opacity: error ? 1 : 0,
                            },
                        ]}
                    >
                        An error occured, please try again
                    </Text>
                    <Button
                        title="Retry"
                        onPress={retryFirebaseAuth}
                        disabled={error === firebaseNetworkError ? false : true}
                    />
                    <Button
                        title="Cancel"
                        onPress={dismissModal}
                        disabled={error === firebaseNetworkError ? false : true}
                    />
                </View>
            </View>
        </Modal>
    );
};

AuthModal.propTypes = {
    modalVisible: PropTypes.bool,
    activityIndicator: PropTypes.bool,
    authorized: PropTypes.bool,
    error: PropTypes.string,
    firebaseNetworkError: PropTypes.string,
    retryFirebaseAuth: PropTypes.func,
    dismissModal: PropTypes.func,
};

export default AuthModal;
