import React, { useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    Platform,
    KeyboardAvoidingView,
    Animated,
    TextInput,
    Keyboard,
    Pressable,
    ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ModalCloseIcon from './ModalCloseIcon';
import MarginVertical from './MarginVertical';

const CreatePost = ({
    visible,
    headerSize,
    margin,
    newPost,
    title,
    body,
    category,
    fontFactor,
    toggleModal,
}) => {
    const { statusBarHeight } = Constants;
    const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const borderAnimatedValue = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['#161B26', '#1CB8F3'],
    });
    console.log('1', wp(0.25));

    return (
        <Modal visible={visible} transparent animationType="slide">
            <Pressable
                onPress={Keyboard.dismiss}
                style={{
                    flex: 1,
                    marginTop: Platform.select({
                        ios: statusBarHeight + headerSize / 3,
                        android: headerSize / 3,
                    }),
                    backgroundColor: '#f7f7f7',
                    paddingHorizontal: margin,
                    paddingTop: headerSize,
                }}
            >
                <View style={{ position: 'absolute', right: 0, top: 0 }}>
                    <ModalCloseIcon
                        closeModal={toggleModal}
                        iconHeight={headerSize}
                        iconWidth={headerSize}
                        color="#000000"
                    />
                </View>
                <KeyboardAvoidingView
                    behavior={Platform.select({
                        ios: 'height',
                        android: null,
                    })}
                    style={{
                        flex: 1,
                    }}
                    keyboardVerticalOffset={Platform.select({
                        ios: statusBarHeight + headerSize + headerSize / 3,
                        android: headerSize + headerSize / 3,
                    })}
                >
                    <ScrollView style={{ flex: 1 }}>
                        <MarginVertical size={4} />

                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignContent: 'center',
                            }}
                        >
                            <View
                                style={{
                                    width: '100%',
                                    maxWidth: `${fontFactor * 100}%`,
                                }}
                            >
                                <View style={{ minHeight: 400, width: '100%' }}>
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins_500Medium',
                                            fontSize: fontFactor * wp(6),
                                            lineHeight: fontFactor * wp(7.7),
                                        }}
                                    >
                                        {newPost ? 'New Post' : 'Update Post'}
                                    </Text>
                                    <MarginVertical size={2} />
                                    <AnimatedTextInput
                                        underlineColorAndroid="transparent"
                                        height={wp(18)}
                                        style={{
                                            borderWidth: wp(0.25),
                                            borderColor: borderAnimatedValue,
                                            paddingHorizontal: wp(4),
                                            // paddingVertical: wp(3),
                                        }}
                                    />
                                    <AnimatedTextInput
                                        underlineColorAndroid="transparent"
                                        height={wp(18)}
                                        style={{
                                            borderWidth: wp(0.25),
                                            borderColor: borderAnimatedValue,
                                            paddingHorizontal: wp(4),
                                            // paddingVertical: wp(3),
                                        }}
                                    />
                                    <AnimatedTextInput
                                        underlineColorAndroid="transparent"
                                        height={wp(18)}
                                        style={{
                                            borderWidth: wp(0.25),
                                            borderColor: borderAnimatedValue,
                                            paddingHorizontal: wp(4),
                                            // paddingVertical: wp(3),
                                        }}
                                    />
                                    <AnimatedTextInput
                                        underlineColorAndroid="transparent"
                                        height={wp(18)}
                                        style={{
                                            borderWidth: wp(0.25),
                                            borderColor: borderAnimatedValue,
                                            paddingHorizontal: wp(4),
                                            // paddingVertical: wp(3),
                                        }}
                                    />
                                    <AnimatedTextInput
                                        underlineColorAndroid="transparent"
                                        height={wp(18)}
                                        style={{
                                            borderWidth: wp(0.25),
                                            borderColor: borderAnimatedValue,
                                            paddingHorizontal: wp(4),
                                            // paddingVertical: wp(3),
                                        }}
                                    />
                                    <AnimatedTextInput
                                        underlineColorAndroid="transparent"
                                        height={wp(18)}
                                        style={{
                                            borderWidth: wp(0.25),
                                            borderColor: borderAnimatedValue,
                                            paddingHorizontal: wp(4),
                                            // paddingVertical: wp(3),
                                        }}
                                    />
                                    <AnimatedTextInput
                                        underlineColorAndroid="transparent"
                                        height={wp(18)}
                                        style={{
                                            borderWidth: wp(0.25),
                                            borderColor: borderAnimatedValue,
                                            paddingHorizontal: wp(4),
                                            // paddingVertical: wp(3),
                                        }}
                                    />
                                    <AnimatedTextInput
                                        underlineColorAndroid="transparent"
                                        height={wp(18)}
                                        style={{
                                            borderWidth: wp(0.25),
                                            borderColor: borderAnimatedValue,
                                            paddingHorizontal: wp(4),
                                            // paddingVertical: wp(3),
                                        }}
                                    />
                                    <AnimatedTextInput
                                        underlineColorAndroid="transparent"
                                        height={wp(18)}
                                        style={{
                                            borderWidth: wp(0.25),
                                            borderColor: borderAnimatedValue,
                                            paddingHorizontal: wp(4),
                                            // paddingVertical: wp(3),
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                        <MarginVertical size={4} />
                    </ScrollView>
                </KeyboardAvoidingView>

                {/* <MarginVertical size={4} /> */}
            </Pressable>
        </Modal>
    );
};

export default CreatePost;

const styles = StyleSheet.create({});
