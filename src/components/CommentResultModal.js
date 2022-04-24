import React from 'react';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import ModalButton from './ModalButton';
import ModalTextBlock from './ModalTextBlock';
import Animated from 'react-native-reanimated';
import ModalActivityIndicator from './ModalActivityIndicator';
import { Platform, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';

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
                <Animated.View>
                    <ModalActivityIndicator />
                </Animated.View>
            )}
            {result && (
                <Animated.View>
                    <ModalTextBlock text={result} color={resultColor} />
                </Animated.View>
            )}
            {commentFailed && (
                <Animated.View>
                    <ModalButton
                        text={'retry'}
                        submit
                        onPress={rewriteComment}
                    />
                </Animated.View>
            )}
            {result && (
                <Animated.View>
                    <ModalButton text={'cancel'} onPress={closeCommentResult} />
                </Animated.View>
            )}
        </Modal>
    );
}

CommentResultModal.propTypes = {
    commentSuccessful: PropTypes.bool,
    commentFailed: PropTypes.bool,
    commentResultVisible: PropTypes.bool,
    commenting: PropTypes.bool,
    margin: PropTypes.number,
    closeCommentResult: PropTypes.func,
    rewriteComment: PropTypes.func,
};

const mapStateToProps = ({ settingsState: { margin } }) => ({
    margin,
});

const styles = StyleSheet.create({
    modal: { padding: 0, margin: 0 },
});

export default connect(mapStateToProps, {})(CommentResultModal);
