import React, { useRef, useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Platform, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import ModalCloseIcon from './ModalCloseIcon';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import CreatePostForm from './CreatePostForm';
import updateModalStatus from '../redux/actions/updateModalStatus';
import PropTypes from 'prop-types';

const CreatePost = ({
    visible,
    headerSize,
    margin,
    fontFactor,
    toggleModal,
    onSubmitSuccessful,
    activeModal,
    updateModalStatus,
}) => {
    const [disableModalPressables, setDisableModalPressables] = useState(true);
    const containerRef = useRef(null);
    const { statusBarHeight } = Constants;
    const onCancel = useCallback(() => {
        toggleModal();
    }, [toggleModal]);
    const toggleModalPressables = useCallback(() => {
        setDisableModalPressables((oldValue) => !oldValue);
    }, []);
    const disableActiveModal = useCallback(
        () => updateModalStatus(null),
        [updateModalStatus]
    );
    const scrollViewRef = useRef(null);
    const modalName = 'createPost';
    const isVisible = useRef(false);
    isVisible.current = visible && (!activeModal || activeModal === modalName);

    const styles2 = StyleSheet.create({
        modalContainer: {
            paddingHorizontal: margin,
            paddingTop: headerSize,
            margin: headerSize / 3,
            marginTop: Platform.select({
                ios: statusBarHeight + headerSize / 3,
                android: headerSize / 3,
            }),
        },
        formContainer:{
            width: `${fontFactor * 100}%`,
        }
    });

    useEffect(() => {
        if (visible && !activeModal) {
            updateModalStatus(modalName);
        }
    }, [activeModal, visible, updateModalStatus]);

    return (
        <Modal
            useNativeDriverForBackdrop
            onShow={toggleModalPressables}
            onModalWillHide={toggleModalPressables}
            onModalHide={disableActiveModal}
            propagateSwipe
            isVisible={isVisible.current}
            onBackButtonPress={toggleModal}
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
            style={styles.modal}
            avoidKeyboard
        >
            <View
                ref={containerRef}
                style={[styles.modalContainer, styles2.modalContainer]}
            >
                <View style={styles.modalCloseIcon}>
                    <ModalCloseIcon
                        closeModal={onCancel}
                        iconHeight={headerSize}
                        iconWidth={headerSize}
                        color="#000000"
                    />
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardDismissMode={'none'}
                    keyboardShouldPersistTaps="handled"
                    ref={scrollViewRef}
                    bounces={false}
                    contentContainerStyle={styles.scrollViewContainer}
                >
                    <View
                        style={styles2.formContainer}
                    >
                        <CreatePostForm
                            fontFactor={fontFactor}
                            onSubmitSuccessful={onSubmitSuccessful}
                            toggleModal={toggleModal}
                            headerSize={headerSize}
                            disableModalPressables={disableModalPressables}
                            onCancel={onCancel}
                            modalVisible={visible}
                            containerRef={containerRef}
                            scrollViewRef={scrollViewRef}
                        />
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};

CreatePost.propTypes = {
    visible: PropTypes.bool,
    headerSize: PropTypes.number,
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
    toggleModal: PropTypes.func,
    onSubmitSuccessful: PropTypes.func,
    activeModal: PropTypes.string,
    updateModalStatus: PropTypes.func,
};

const mapStateToProps = ({
    settingsState: { headerSize, margin, fontFactor },
    settingsTempState: { activeModal },
}) => ({
    headerSize,
    margin,
    fontFactor,
    activeModal,
});

export default connect(mapStateToProps, { updateModalStatus })(CreatePost);

const styles = StyleSheet.create({
    scrollViewContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
    },
    modalCloseIcon: { position: 'absolute', right: 0, top: 0 },
    modalContainer: { flex: 1, backgroundColor: '#fff' },
    modal: {
        margin: 0,
    },
});
