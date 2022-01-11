import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import updateActiveForumAction from '../redux/actions/updateActiveForumAction';
import Modal from 'react-native-modal';
import Constants from 'expo-constants';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const PostErrorModal = ({
    visible,
    toggleModal,
    retryCreatePost,
    fontFactor,
    margin,
}) => {
    const { statusBarHeight } = Constants;

    return (
        <Modal
            isVisible={visible}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            onBackdropPress={toggleModal}
            onBackButtonPress={toggleModal}
            useNativeDriver
            hideModalContentWhileAnimating //animationType="slide" transparent={true}
            style={{
                padding: 0,
                margin: 0,
                marginTop: Platform.select({
                    ios: statusBarHeight,
                    android: 0,
                }),
            }}
            backdropOpacity={0.7}
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
                        Posted failed
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
                        retryCreatePost();
                    }}
                    activeOpacity={0.7}
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
                <TouchableOpacity
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        padding: wp(2.2),
                        borderRadius: wp(1.35),
                        marginBottom: wp(2.2),
                    }}
                    onPress={toggleModal}
                    activeOpacity={0.7}
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

// const mapStateToProps = ({
//     forumTempState: { activeForumAction, createPostModalOpen },
// }) => ({
//     activeForumAction,
//     createPostModalOpen,
// });

export default PostErrorModal;

const styles = StyleSheet.create({});
