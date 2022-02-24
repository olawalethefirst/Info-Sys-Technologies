import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    // Modal,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import toggleCallToAuthModal from '../redux/actions/toggleCallToAuthModal';
import { connect } from 'react-redux';

const CalltoAuth = ({
    margin,
    fontFactor,
    callToAuthModalVisible,
    toggleCallToAuthModal,
}) => {
    const { statusBarHeight } = Constants;
    const navigation = useNavigation();
    const [navigate, setNavigate] = useState(false);
    const toggleNavigate = () => setNavigate((oldState) => !oldState);

    return (
        <Modal
            backdropOpacity={0.8}
            isVisible={callToAuthModalVisible}
            // animationOutTiming={300}
            useNativeDriver
            hideModalContentWhileAnimating
            onModalHide={() => {
                navigate &&
                    navigation.navigate('Auth', {
                        viewAnimatedValue: 0,
                    });
                navigate && toggleNavigate();
            }}
            style={{
                padding: 0,
                margin: 0,
                marginTop: Platform.select({
                    ios: statusBarHeight,
                    android: 0,
                }),
            }}
            onBackButtonPress={toggleCallToAuthModal}
            onBackdropPress={toggleCallToAuthModal}
        >
            <View style={{ paddingHorizontal: margin }}>
                <View
                    style={{
                        width: '100%',
                        alignItems: 'center',
                        padding: wp(2.2),
                        borderRadius: wp(1.35),
                        marginBottom: wp(2.2),
                    }}
                >
                    <Text
                        style={{
                            fontSize: fontFactor * wp(4.5),
                            lineHeight: fontFactor * wp(5.72),
                            fontFamily: 'Karla_500Medium',
                            textAlign: 'center',
                            color: '#fff',
                            textShadowOffset: {
                                width: 0.1,
                                height: 0.1,
                            },
                            textShadowColor: '#fff',
                            textShadowRadius: 0.1,
                        }}
                    >
                        You need to be logged in to perform this action
                    </Text>
                </View>

                <TouchableOpacity
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        backgroundColor: '#1A91D7',
                        padding: wp(2.2),
                        borderRadius: wp(1.35),
                        marginBottom: wp(2.2),
                    }}
                    onPress={() => {
                        toggleNavigate();
                        toggleCallToAuthModal();
                    }}
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
                        Join now
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        backgroundColor: '#ddd',
                        padding: wp(2.2),
                        borderRadius: wp(1.35),
                        marginBottom: wp(2.2),
                    }}
                    onPress={toggleCallToAuthModal}
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
        </Modal>
    );
};

const mapStateToProps = ({
    settingsTempState: { callToAuthModalVisible },
    settingsState: { margin, fontFactor },
}) => ({ callToAuthModalVisible, margin, fontFactor });

export default connect(mapStateToProps, { toggleCallToAuthModal })(CalltoAuth);

const styles = StyleSheet.create({});
