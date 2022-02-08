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

const CalltoAuth = ({ toggleCallToAuth, visible, margin, fontFactor }) => {
    const { statusBarHeight } = Constants;
    const navigation = useNavigation();
    const [navigate, setNavigate] = useState(false);
    const toggleNavigate = () => setNavigate((oldState) => !oldState);

    return (
        <Modal
            isVisible={visible}
            animationIn="fadeIn"
            animationOut="fadeOut"
            animationOutTiming={navigate ? 150 : 300}
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
                justifyContent: 'center',
            }}
            onBackButtonPress={toggleCallToAuth}
            onBackdropPress={toggleCallToAuth}
        >
            <View style={{ paddingHorizontal: margin }}>
                <View
                    style={{
                        width: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
                            fontFamily: 'Karla_400Regular',
                            textAlign: 'center',
                        }}
                    >
                        You need to be logged in to perform this action
                    </Text>
                </View>

                <TouchableOpacity
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        padding: wp(2.2),
                        borderRadius: wp(1.35),
                        marginBottom: wp(2.2),
                    }}
                    onPress={() => {
                        toggleNavigate();
                        toggleCallToAuth();
                    }}
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
                        Join now
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        padding: wp(2.2),
                        borderRadius: wp(1.35),
                        marginBottom: wp(2.2),
                    }}
                    onPress={toggleCallToAuth}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            color: 'red',
                            fontSize: fontFactor * wp(4.5),
                            lineHeight: fontFactor * wp(5.72),
                            fontFamily: 'Karla_500Medium',
                        }}
                    >
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default CalltoAuth;

const styles = StyleSheet.create({});