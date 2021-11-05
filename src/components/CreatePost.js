import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    Platform,
    KeyboardAvoidingView,
    Animated,
    TextInput,
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
    const AnimatedTextInput = Animated.createAnimatedComponent();

    return (
        <Modal visible={visible} transparent animationType="slide">
            <KeyboardAvoidingView
                behavior={Platform.select({
                    ios: 'padding',
                    android: 'height',
                })}
                style={{
                    flex: 1,
                    backgroundColor: '#f7f7f7',
                    marginTop: Platform.select({
                        ios: statusBarHeight + headerSize / 3,
                        android: headerSize / 3,
                    }),
                    paddingHorizontal: margin,
                    alignContent: 'center',
                    justifyContent: 'center',
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
                <MarginVertical size={3} />
                <View
                    style={{
                        width: '100%',
                        maxWidth: `${fontFactor * 100}%`,
                    }}
                >
                    <View style={{ height: 400, width: '100%' }}>
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
                        <TextInput />
                    </View>
                </View>
                <MarginVertical size={3} />
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default CreatePost;

const styles = StyleSheet.create({});
