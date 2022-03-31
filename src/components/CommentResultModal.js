import React from 'react';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import ModalButton from './ModalButton';
import ModalTextBlock from './ModalTextBlock';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import ModalActivityIndicator from './ModalActivityIndicator';
import { Platform, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import closeCommentResult from '../redux/actions/closeCommentResult';
import rewriteComment from '../redux/actions/rewriteComment';

function CommentResultModal({
    commentSuccessful,
    commentFailed,
    commentResultVisible,
    commenting,
    margin,
    closeCommentResult,
    rewriteComment,
}) {
    const result = commentSuccessful
        ? 'Comment sent'
        : commentFailed
        ? 'Comment not sent'
        : null;
    const resultColor = commentSuccessful
        ? '#fff'
        : commentFailed
        ? 'red'
        : null;
    const { statusBarHeight } = Constants;

    const styles2 = StyleSheet.create({
        modal: {
            marginTop: Platform.select({
                ios: statusBarHeight,
                android: 0,
            }),
            paddingHorizontal: margin,
        },
    });

    return (
        <Modal
            isVisible={commentResultVisible}
            useNativeDriverForBackdrop
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            onBackButtonPress={closeCommentResult}
            useNativeDriver
            hideModalContentWhileAnimating
            backdropOpacity={0.8}
            style={[styles.modal, styles2.modal]}
        >
            {commenting && (
                <Animated.View entering={FadeIn} exiting={FadeOut}>
                    <ModalActivityIndicator />
                </Animated.View>
            )}
            {result && (
                <Animated.View entering={FadeIn} exiting={FadeOut}>
                    <ModalTextBlock text={result} color={resultColor} />
                </Animated.View>
            )}
            {commentFailed && (
                <Animated.View entering={FadeIn} exiting={FadeOut}>
                    <ModalButton
                        text={'retry'}
                        submit
                        onPress={rewriteComment}
                    />
                </Animated.View>
            )}
            {result && (
                <Animated.View entering={FadeIn} exiting={FadeOut}>
                    <ModalButton text={'cancel'} onPress={closeCommentResult} />
                </Animated.View>
            )}
        </Modal>
    );
}

const mapStateToProps = ({
    forumTempState: { commentSuccessful, commentFailed, commenting },
    settingsTempState: { commentResultVisible },
    settingsState: { margin },
}) => ({
    commentSuccessful,
    commentFailed,
    commentResultVisible,
    commenting,
    margin,
});

const styles = StyleSheet.create({
    modal: { padding: 0, margin: 0 },
});

export default connect(mapStateToProps, { closeCommentResult, rewriteComment })(
    CommentResultModal
);
