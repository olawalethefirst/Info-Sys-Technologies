import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import Constants from 'expo-constants';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import updateModalStatus from '../redux/actions/updateModalStatus';

const PostResultModal = ({
    postSuccessful,
    postError,
    resetSuccessfulPostAction,
    resetFailedPostAction,
    retryWrite,
    fontFactor,
    margin,
    activeModal,
    updateModalStatus,
}) => {
    const visible = useRef(false);
    const isVisible = useRef(false);

    const { statusBarHeight } = Constants;
    const cancelAction = postSuccessful
        ? resetSuccessfulPostAction
        : postError
        ? resetFailedPostAction
        : null;
    const modalNotificationString = postSuccessful
        ? 'Posted successfully'
        : postError
        ? 'Post failed'
        : null;
    const fontColor = postSuccessful ? '#fff' : postError ? 'red' : null;
    const modalName = 'postResult';
    const deactivateActiveModal = useCallback(
        () => updateModalStatus(null),
        [updateModalStatus]
    );
    visible.current = postError || postSuccessful;
    isVisible.current =
        visible.current && (!activeModal || activeModal === modalName);

    useEffect(() => {
        if (visible.current && !activeModal) {
            updateModalStatus(modalName);
        }
    }, [postSuccessful, postError, isVisible, activeModal, updateModalStatus]);

    return (
        <Modal
            isVisible={isVisible.current}
            onModalHide={deactivateActiveModal}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            onBackdropPress={cancelAction}
            onBackButtonPress={cancelAction}
            useNativeDriver
            hideModalContentWhileAnimating
            backdropOpacity={0.8}
            style={{
                padding: 0,
                margin: 0,
                marginTop: Platform.select({
                    ios: statusBarHeight,
                    android: 0,
                }),
            }}
        >
            <View
                style={{
                    paddingHorizontal: margin,
                    flex: 1,
                    justifyContent: 'center',
                }}
            >
                <View
                    style={{
                        width: '100%',
                        alignItems: 'center',
                        padding: wp(2.2),
                        marginBottom: wp(2.2),
                    }}
                >
                    <Text
                        style={{
                            fontSize: fontFactor * wp(4.5),
                            lineHeight: fontFactor * wp(5.72),
                            fontFamily: 'Karla_400Regular',
                            textAlign: 'center',
                            textShadowOffset: {
                                width: 0.1,
                                height: 0.1,
                            },
                            textShadowColor: fontColor,
                            textShadowRadius: 0.1,
                            color: fontColor,
                        }}
                    >
                        {modalNotificationString}
                    </Text>
                </View>
                {postError && (
                    <>
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
                                retryWrite();
                            }}
                            activeOpacity={0.7}
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
                                padding: wp(2.2),
                                borderRadius: wp(1.35),
                                marginBottom: wp(2.2),
                            }}
                            onPress={resetFailedPostAction}
                            activeOpacity={0.7}
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
                    </>
                )}
            </View>
        </Modal>
    );
};

const mapStateToProps = ({
    settingsState: { fontFactor, margin },
    settingsTempState: { activeModal },
}) => ({ fontFactor, margin, activeModal });

export default connect(mapStateToProps, { updateModalStatus })(PostResultModal);

const styles = StyleSheet.create({});
