import React from 'react';
import {
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
import processErrorString from '../helperFunctions/processErrorString';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

// eslint-disable-next-line no-undef
const AuthModal = ({
    modalVisible,
    activityIndicator,
    error,
    retryAuth,
    dismissModal,
    uid,
    resetError,
    fontFactor,
    margin,
    retryAbleError,
    navigate,
}) => {
    const { statusBarHeight } = Constants;
    const errorMessage = error ? processErrorString(error) : null;
    const navigation = useNavigation();
    console.log('error: ', error, 'retryAbleError: ', retryAbleError);

    return (
        <Modal //change modal to react-native-modal to enable us naivgate away from screen upon successful authentication
            isVisible={modalVisible}
            hideModalContentWhileAnimating
            useNativeDriver
            useNativeDriverForBackdrop
            style={{ margin: 0 }}
            backdropOpacity={0.8}
            onModalHide={() => {
                navigate && navigation.goBack();
            }}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: Platform.select({
                        ios: statusBarHeight,
                        android: 0,
                    }),
                    paddingHorizontal: margin,
                }}
            >
                {(navigate ||
                    (error && !retryAbleError) ||
                    activityIndicator) && (
                    <View
                        style={{
                            width: '100%',
                            alignItems: 'center',
                            padding: fontFactor * wp(2.2),
                            marginBottom: fontFactor * wp(2.2),
                        }}
                    >
                        {activityIndicator ? (
                            <ActivityIndicator color="#1A91D7" />
                        ) : (
                            <Text
                                style={[
                                    {
                                        fontSize: fontFactor * wp(4.5),
                                        lineHeight: fontFactor * wp(5.72),
                                        fontFamily: 'Karla_500Medium',
                                        textAlign: 'center',
                                        textShadowOffset: {
                                            width: 0.1,
                                            height: 0.1,
                                        },
                                        textShadowColor: navigate
                                            ? '#fff'
                                            : 'red',
                                        textShadowRadius: 0.1,
                                        color: navigate ? '#fff' : 'red',
                                    },
                                ]}
                            >
                                {navigate ? 'Successful!' : 'Failed!'}
                            </Text>
                        )}
                    </View>
                )}

                {retryAbleError && (
                    <View
                        style={{
                            width: '100%',
                        }}
                    >
                        <View
                            style={{
                                width: '100%',
                                alignItems: 'center',
                                padding: fontFactor * wp(2.2),
                                marginBottom: fontFactor * wp(2.2),
                            }}
                        >
                            <Text
                                style={[
                                    {
                                        color: 'red',
                                        fontSize: fontFactor * wp(4.5),
                                        lineHeight: fontFactor * wp(5.72),
                                        fontFamily: 'Karla_500Medium',
                                        textAlign: 'center',
                                        textShadowOffset: {
                                            width: 0.1,
                                            height: 0.1,
                                        },
                                        textShadowColor: 'red',
                                        textShadowRadius: 0.1,
                                    },
                                ]}
                            >
                                {errorMessage}
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={{
                                width: '100%',
                                justifyContent: 'center',
                                backgroundColor: '#1A91D7',
                                padding: fontFactor * wp(2.2),
                                borderRadius: fontFactor * wp(1.35),
                                marginBottom: fontFactor * wp(2.2),
                            }}
                            onPress={retryAuth}
                        >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    color: '#fff',
                                    fontSize: fontFactor * wp(4.5),
                                    lineHeight: fontFactor * wp(5.72),
                                    fontFamily: 'Karla_400Regular',
                                }}
                            >
                                Retry
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                width: '100%',
                                justifyContent: 'center',
                                backgroundColor: '#ddd',
                                padding: fontFactor * wp(2.2),
                                borderRadius: fontFactor * wp(1.35),
                                marginBottom: fontFactor * wp(2.2),
                            }}
                            onPress={() => {
                                dismissModal();
                                resetError();
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    color: 'red',
                                    fontSize: fontFactor * wp(4.5),
                                    lineHeight: fontFactor * wp(5.72),
                                    fontFamily: 'Karla_400Regular',
                                }}
                            >
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
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
    uid: PropTypes.string,
};

const mapStateToProps = ({
    forumTempState: { uid },
    settingsState: { fontFactor, margin },
}) => {
    return {
        uid,
        fontFactor,
        margin,
    };
};

export default connect(mapStateToProps)(AuthModal);
