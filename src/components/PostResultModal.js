import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import Constants from 'expo-constants';
import updateModalStatus from '../redux/actions/updateModalStatus';
import ModalButton from './ModalButton';
import ModalTextBlock from './ModalTextBlock';
import rewritePost from '../redux/actions/rewritePost';
import closePostResultModal from '../redux/actions/closePostResultModal';
import PropTypes from 'prop-types'

const PostResultModal = ({
    postSuccessful,
    postFailed,
    margin,
    activeModal,
    updateModalStatus,
    name,
    postResultModalVisible,
    rewritePost,
    navigationFocussed,
    closePostResultModal,
}) => {
    const [isVisible, setIsVisible] = useState(false);

    const { statusBarHeight } = Constants;
    const modalNotificationString = postSuccessful
        ? 'Posted successfully'
        : postFailed
        ? 'Post failed'
        : null;
    const fontColor = postSuccessful ? '#fff' : postFailed ? 'red' : null;
    const deactivateActiveModal = useCallback(
        () => updateModalStatus(null),
        [updateModalStatus]
    );
    const activateActiveModal = useCallback(
        () => updateModalStatus(name),
        [updateModalStatus, name]
    );

    const styles2 = StyleSheet.create({
        modal: {
            marginTop: Platform.select({
                ios: statusBarHeight,
                android: 0,
            }),
            paddingHorizontal: margin,
        },
    });

    useEffect(() => {
        if (navigationFocussed) {
            if (
                postResultModalVisible &&
                (!activeModal || activeModal === name) &&
                !isVisible
            ) {
                setIsVisible(true);
            }
        }
        if (!postResultModalVisible && isVisible) {
            setIsVisible(false);
        }
    }, [
        navigationFocussed,
        postResultModalVisible,
        isVisible,
        activeModal,
        name,
    ]);

    return (
        <Modal
            useNativeDriverForBackdrop
            isVisible={isVisible}
            onModalWillShow={activateActiveModal}
            onModalHide={deactivateActiveModal}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            onBackButtonPress={closePostResultModal}
            useNativeDriver
            hideModalContentWhileAnimating
            backdropOpacity={0.8}
            style={[styles.modal, styles2.modal]}
        >
            <ModalTextBlock text={modalNotificationString} color={fontColor} />
            {postFailed && (
                <ModalButton text="retry" submit onPress={rewritePost} />
            )}
            <ModalButton text="close" onPress={closePostResultModal} />
        </Modal>
    );
};

PostResultModal.propTypes= {
    postSuccessful: PropTypes.bool,
    postFailed: PropTypes.bool,
    margin: PropTypes.number,
    activeModal: PropTypes.string,
    updateModalStatus: PropTypes.func,
    name: PropTypes.string,
    postResultModalVisible: PropTypes.bool,
    rewritePost: PropTypes.func,
    navigationFocussed: PropTypes.bool,
    closePostResultModal: PropTypes.func,
}

const mapStateToProps = ({
    settingsState: { margin },
    settingsTempState: { activeModal, postResultModalVisible },
    forumTempState: { postSuccessful, postFailed },
}) => ({
    margin,
    activeModal,
    postResultModalVisible,
    postSuccessful,
    postFailed,
});

export default connect(mapStateToProps, {
    updateModalStatus,
    rewritePost,
    closePostResultModal,
})(PostResultModal);

const styles = StyleSheet.create({
    modal: { padding: 0, margin: 0 },
});
