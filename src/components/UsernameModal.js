import React, { useRef, useReducer, useEffect, useCallback } from 'react';
import Modal from 'react-native-modal';
import {
    StyleSheet,
    Pressable,
    Platform,
    TextInput,
    ScrollView,
    Keyboard,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import updateUsernameAsync from '../helperFunctions/updateUsernameAsync';
import { auth } from '../helperFunctions/initializeFirebase';
import updateUsername from '../redux/actions/updateUsername';
import toggleOffUsernameModal from '../redux/actions/toggleOffUsernameModal';
import processErrorString, {usernameMinLimit} from '../helperFunctions/processErrorString';
import ModalTextBlock from './ModalTextBlock';
import ModalButton from './ModalButton';
import PropTypes from 'prop-types';


function UsernameModal({
    margin,
    fontFactor,
    updateUsername,
    toggleOffUsernameModal,
    usernameModalVisible,
    initialAction,
}) {
    //actions
    const UPDATE_INPUT = 'UPDATE_INPUT';
    const CLEAR_STATE = 'CLEAR_STATE';
    const SUBMITTED = 'SUBMITTED';
    const FAILED = 'FAILED';
    const SUBMITTING = 'SUBMITTING';
    const UPDATE_KEYBOARD_STATE = 'UPDATE_KEYBOARD_STATE';

    //Reducer
    const reducer = (state, action) => {
        switch (action.type) {
            case UPDATE_INPUT:
                return { ...state, input: action.payload };
            case SUBMITTING:
                return {
                    ...state,
                    currentAction: SUBMITTING,
                    errorMessage: null,
                };
            case SUBMITTED:
                return { ...state, currentAction: SUBMITTED };
            case FAILED:
                return {
                    ...state,
                    currentAction: FAILED,
                    errorMessage: action.payload,
                };
            case CLEAR_STATE:
                return {
                    input: '',
                    currentAction: null,
                    activeAction: false,
                };
            case UPDATE_KEYBOARD_STATE:
                return { ...state, keyboardActive: action.payload };
            default:
                return state;
        }
    };

    //State & Dispatch
    const [state, dispatch] = useReducer(reducer, {
        input: '',
        currentAction: null,
        activeAction: false,
        errorMessage: null,
        keyboardActive: false,
    });

    // //Current State references - Reliabale because they update during state update and updates components (limitations - dont have any effect on useEffect hooks)
    const isSubmitted = useRef(false);
    const isFailed = useRef(false);
    const isLoading = useRef(false);
    isSubmitted.current = state.currentAction === SUBMITTED;
    isFailed.current = state.currentAction === FAILED;
    isLoading.current = state.currentAction === SUBMITTING;

    //helper functions
    const updateInput = useCallback(
        (payload) => dispatch({ type: UPDATE_INPUT, payload }),
        []
    );
    const onSubmit = useCallback(async () => {
        state.keyboardActive && Keyboard.dismiss();
        dispatch({ type: SUBMITTING });
        try {
            if (state.input.trim().length > 2) {
                await updateUsernameAsync(state.input);
                updateUsername(auth.currentUser.displayName);
                dispatch({ type: SUBMITTED });
            } else throw new Error(usernameMinLimit);
        } catch (err) {
            const payload = err.code ? err.code : err.message;
            dispatch({ type: FAILED, payload });
        }
    }, [updateUsername, state.keyboardActive, state.input]);
    const clearState = useCallback(() => dispatch({ type: CLEAR_STATE }), []);
    const closeModal = useCallback(() => {
        usernameModalVisible && toggleOffUsernameModal();
    }, [usernameModalVisible, toggleOffUsernameModal]);
    const onUpdateSuccessful = useCallback(
        (active) => {
            setTimeout(() => {
                active && closeModal();
            }, 2000); //active prevents multiple calls
        },
        [closeModal]
    );
    const onModalHide = useCallback(() => {
        clearState();
        initialAction && initialAction();
    }, [initialAction, clearState]);
    const updateKeyboardState = useCallback((payload) => {
        dispatch({ type: UPDATE_KEYBOARD_STATE, payload });
    }, []);
    const backAction = useCallback(() => {
        if (state.keyboardActive) {
            Keyboard.dismiss();
        } else {
            state.currentAction != SUBMITTING && closeModal(); //only allow close when not loading
        }
    }, [closeModal, state.currentAction, state.keyboardActive]);
    const closeAction = useCallback(() => {
        state.keyboardActive && Keyboard.dismiss();
        state.currentAction != SUBMITTING && closeModal(); //only allow close when not loading
    }, [closeModal, state.currentAction, state.keyboardActive]);

    const { statusBarHeight } = Constants;
    const errorString = processErrorString(state.errorMessage);
    const inputRef = useRef(null);

    const styles2 = StyleSheet.create({
        textInput: {
            fontSize: fontFactor * wp(4.5),
            lineHeight: fontFactor * wp(5.72),
        },
        inputButton: { padding: wp(4.4), marginBottom: wp(2.2) },
        activityIndicator: {
            marginBottom: wp(2.2),
            paddingVertical: wp(0.61), //maintain similar bottom margin to text(lineHeight-fontSize)
        },
        modal: {
            margin: 0,
            marginTop: Platform.select({
                ios: statusBarHeight,
                android: 0,
            }),
        },
        scrollView: {
            flexGrow: 1,
        },
        viewContainer: {
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: margin,
        },
    });

    useEffect(() => {
        let active = true;
        if (state.currentAction === SUBMITTED) {
            setTimeout(() => {
                active && closeModal();
            }, 2000);
        }
        return () => {
            active = false;
        };
    }, [onUpdateSuccessful, state.currentAction, closeModal]);

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () =>
            updateKeyboardState(true)
        );
        Keyboard.addListener('keyboardDidHide', () =>
            updateKeyboardState(false)
        );
        return () => {
            Keyboard.removeAllListeners('keyboardDidShow');
            Keyboard.removeAllListeners('keyboardDidHide');
        };
    }, [updateKeyboardState]);

    return (
        <Modal
            style={styles2.modal}
            hideModalContentWhileAnimating
            useNativeDriver
            useNativeDriverForBackdrop
            backdropOpacity={0.8}
            isVisible={usernameModalVisible}
            onModalHide={onModalHide}
            onBackButtonPress={backAction}
            avoidKeyboard
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles2.scrollView}
            >
                <Pressable // acts like backdrop
                    onPress={backAction}
                    style={styles2.viewContainer}
                >
                    <Pressable //disables backdrop from acting around content
                    > 
                        <ModalTextBlock text="Welcome, please choose a forum name" />
                        {isLoading.current && (
                            <ActivityIndicator
                                size="small"
                                color="#fff"
                                style={styles.activityIndicator}
                            />
                        )}
                        {isSubmitted.current && (
                            <ModalTextBlock text="Successful!" />
                        )}
                        {isFailed.current && (
                            <ModalTextBlock text={errorString} color="red" />
                        )}
                        <Pressable
                            onPress={() => inputRef.current.focus()}
                            disabled={isLoading.current}
                            style={[styles.inputButton, styles2.inputButton]}
                        >
                            <TextInput
                                autoCapitalize={'words'}
                                ref={inputRef}
                                placeholder="Minimum of three characters"
                                placeholderTextColor="#808080"
                                style={[styles.textInput, styles2.textInput]}
                                value={state.input}
                                onChangeText={updateInput}
                                editable={
                                    !isLoading.current && !isSubmitted.current
                                }
                            />
                        </Pressable>
                        {!isSubmitted.current && (
                            <ModalButton
                                text="Submit"
                                submit
                                onPress={onSubmit}
                                disabled={isLoading.current}
                            />
                        )}
                        <ModalButton
                            text="Close"
                            onPress={closeAction}
                            disabled={isLoading.current}
                        />
                    </Pressable>
                </Pressable>
            </ScrollView>
        </Modal>
    );
}

UsernameModal.propTypes = {
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
    updateUsername: PropTypes.func,
    toggleOffUsernameModal: PropTypes.func,
    usernameModalVisible: PropTypes.bool,
    initialAction: PropTypes.func,
};

const mapStateToProps = ({
    settingsState: { margin, fontFactor },
    settingsTempState: { usernameModalVisible },
}) => ({
    margin,
    fontFactor,
    usernameModalVisible,
});

const styles = StyleSheet.create({
    textInput: {
        fontFamily: 'Karla_400Regular',
        textAlign: 'center',
    },
    inputButton: {
        backgroundColor: '#fff',
    },
});

export default connect(mapStateToProps, {
    updateUsername,
    toggleOffUsernameModal,
})(UsernameModal);
