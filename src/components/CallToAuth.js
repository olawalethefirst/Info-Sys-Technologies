import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';

const CalltoAuth = ({ toggleAuth, visible, margin, fontFactor }) => {
    const { statusBarHeight } = Constants;
    const navigation = useNavigation();

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    paddingHorizontal: margin,
                    marginTop: Platform.select({
                        ios: statusBarHeight,
                        android: 0,
                    }),
                }}
            >
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
                        setTimeout(
                            () =>
                                navigation.navigate('Auth', {
                                    viewAnimatedValue: 0,
                                }),
                            200
                        );
                        toggleAuth();
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
                    onPress={toggleAuth}
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
