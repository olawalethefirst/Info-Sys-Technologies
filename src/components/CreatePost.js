import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    View,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import ModalCloseIcon from './ModalCloseIcon';
import Modal from 'react-native-modal';
import KeyboardViewContainer from './KeyboardViewContainer';
import { connect } from 'react-redux';
import CreatePostForm from './CreatePostForm';
import updateModalStatus from '../redux/actions/updateModalStatus';

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

    useEffect(() => {
        if (visible && !activeModal) {
            updateModalStatus(modalName);
        }
    }, [activeModal, visible, updateModalStatus]);

    return (
        <Modal
            onShow={toggleModalPressables}
            onModalWillHide={toggleModalPressables}
            onModalHide={disableActiveModal}
            propagateSwipe
            isVisible={isVisible.current}
            onBackButtonPress={toggleModal}
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
            style={{
                margin: headerSize / 3,
                marginTop: Platform.select({
                    ios: statusBarHeight + headerSize / 3,
                    android: headerSize / 3,
                }),
            }}
        >
            <View
                ref={containerRef}
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    paddingHorizontal: margin,
                    paddingTop: headerSize,
                }}
            >
                <View style={{ position: 'absolute', right: 0, top: 0 }}>
                    <ModalCloseIcon
                        closeModal={onCancel}
                        iconHeight={headerSize}
                        iconWidth={headerSize}
                        color="#000000"
                    />
                </View>
                <KeyboardViewContainer>
                    <KeyboardAvoidingView
                        behavior={Platform.select({
                            ios: 'padding',
                            android: undefined,
                        })}
                        keyboardVerticalOffset={Platform.select({
                            ios: statusBarHeight + headerSize / 3,
                            android: null,
                        })}
                        style={{ flex: 1 }}
                    >
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                            }}
                        >
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                keyboardDismissMode={'none'}
                                keyboardShouldPersistTaps="never"
                                ref={scrollViewRef}
                                bounces={false}
                                contentContainerStyle={{
                                    alignItems: 'center',
                                    flexGrow: 1,
                                    justifyContent: 'center',
                                }}
                            >
                                <View
                                    style={{
                                        width: `${fontFactor * 100}%`,
                                    }}
                                >
                                    <CreatePostForm
                                        fontFactor={fontFactor}
                                        onSubmitSuccessful={onSubmitSuccessful}
                                        toggleModal={toggleModal}
                                        headerSize={headerSize}
                                        disableModalPressables={
                                            disableModalPressables
                                        }
                                        onCancel={onCancel}
                                        modalVisible={visible}
                                        containerRef={containerRef}
                                        scrollViewRef={scrollViewRef}
                                    />
                                </View>
                            </ScrollView>
                        </View>
                    </KeyboardAvoidingView>
                </KeyboardViewContainer>
            </View>
        </Modal>
    );
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

const styles = StyleSheet.create({});
