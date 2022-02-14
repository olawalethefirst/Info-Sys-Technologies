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
import processErrorString from '../helperFunctions/processErrorString';

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
}) => {
    const { statusBarHeight } = Constants;
    const errorMessage = error ? processErrorString(error) : null;

    return (
        <Modal //change modal to react-native-modal to enable us naivgate away from screen upon successful authentication
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
                                uid ? { color: 'black' } : { color: 'red' },
                            ]}
                        >
                            {uid ? 'Successful!' : 'Failed!'}
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
                            {errorMessage}
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
    uid: PropTypes.string,
};

const mapStateToProps = ({
    forumTempState,
    settingsState: { fontFactor, margin },
}) => {
    return { uid:forumTempState, fontFactor, margin };
};

export default connect(mapStateToProps)(AuthModal);
