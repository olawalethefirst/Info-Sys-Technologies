import React from 'react';
import {
    Modal,
    Text,
    View,
    ActivityIndicator,
    Platform,
    TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

// eslint-disable-next-line no-undef
const AuthModal = ({
    modalVisible,
    activityIndicator,
    error,
    retryAuth,
    dismissModal,
    user,
    resetError,
    fontFactor,
    margin,
    retryAbleError,
}) => {
    const { statusBarHeight } = Constants;
    const generateError = (message) => {
        switch (message) {
            //err.code - auth/user-not-found (User not found) -- suggest sign up (This may be avoided by confirming provider before initiating flow - will not require to account for in response)
            //err.code - auth/wrong-password (invalid password) - report invalid email or password
            case 'Password should be at least 6 characters':
                return 'Password should be at least 6 characters';
            case 'The email address is badly formatted.':
                return 'Invalid email format.';
            case 'There is no user record corresponding to this identifier. The user may have been deleted.':
                return 'Invalid username or password.';
            case 'The email address is already in use by another account.':
                return 'User already exists, please sign in instead.';
            case 'Login with Google instead.':
                return 'Login with Google instead.';
            case 'The password is invalid or the user does not have a password.':
                return 'Invalid username or password.';
            default:
                return 'An error occured, please try again';
        }
    };

    return (
        <Modal
            visible={modalVisible}
            // visible={true}
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
                    backgroundColor: 'rgba(22, 27, 38, 0.8)',
                    marginTop: Platform.select({
                        ios: statusBarHeight,
                        android: 0,
                    }),
                    paddingHorizontal: margin,
                }}
            >
                {activityIndicator ? (
                    <ActivityIndicator color="#1A91D7" />
                ) : (
                    <View
                        style={{
                            opacity: error ? 0 : 1,
                            width: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            alignItems: 'center',
                            padding: fontFactor * wp(2.2),
                            borderRadius: fontFactor * wp(1.35),
                            marginBottom: fontFactor * wp(2.2),
                        }}
                    >
                        <Text
                            style={[
                                {
                                    fontSize: fontFactor * wp(4.5),
                                    lineHeight: fontFactor * wp(5.72),
                                    fontFamily: 'Karla_400Regular',
                                    textAlign: 'center',
                                },
                                user ? { color: 'black' } : { color: 'red' },
                            ]}
                        >
                            {user ? 'Successful!' : 'Failed!'}
                        </Text>
                    </View>
                )}

                <View
                    style={{
                        opacity: error ? 1 : 0,
                        width: '100%',
                    }}
                >
                    <View
                        style={{
                            width: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            alignItems: 'center',
                            padding: fontFactor * wp(2.2),
                            borderRadius: fontFactor * wp(1.35),
                            marginBottom: fontFactor * wp(2.2),
                        }}
                    >
                        <Text
                            style={[
                                {
                                    color: 'red',
                                    fontSize: fontFactor * wp(4.5),
                                    lineHeight: fontFactor * wp(5.72),
                                    fontFamily: 'Karla_400Regular',
                                    textAlign: 'center',
                                },
                            ]}
                        >
                            {generateError(error)}
                        </Text>
                    </View>
                    {retryAbleError && (
                        <TouchableOpacity
                            style={{
                                width: '100%',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                padding: fontFactor * wp(2.2),
                                borderRadius: fontFactor * wp(1.35),
                                marginBottom: fontFactor * wp(2.2),
                                // opacity: retryAbleError ? 1 : 0,
                            }}
                            onPress={retryAuth}
                            // disabled={retryAbleError ? false : true}
                        >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    color: 'black',
                                    fontSize: fontFactor * wp(4.5),
                                    lineHeight: fontFactor * wp(5.72),
                                    fontFamily: 'Karla_500Medium',
                                }}
                            >
                                Retry
                            </Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        style={{
                            width: '100%',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            padding: fontFactor * wp(2.2),
                            borderRadius: fontFactor * wp(1.35),
                            marginBottom: fontFactor * wp(2.2),
                        }}
                        onPress={() => {
                            dismissModal();
                            resetError();
                        }}
                        disabled={error ? false : true}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                color: 'black',
                                fontSize: fontFactor * wp(4.5),
                                lineHeight: fontFactor * wp(5.72),
                                fontFamily: 'Karla_500Medium',
                            }}
                        >
                            Cancel
                        </Text>
                    </TouchableOpacity>
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
    user: PropTypes.object,
};

const mapStateToProps = ({
    forumState: { user },
    settingsState: { fontFactor, margin },
}) => {
    return { user, fontFactor, margin };
};

export default connect(mapStateToProps)(AuthModal);
