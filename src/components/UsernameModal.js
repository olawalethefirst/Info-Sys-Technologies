import React from 'react';
import {
    Text,
    View,
    Modal,
    StyleSheet,
    Pressable,
    Platform,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Constants from 'expo-constants';
import KeyboardViewContainer from './KeyboardViewContainer';

function UsernameModal({ headerSize, margin }) {
    const { statusBarHeight } = Constants;
    console.log(statusBarHeight);

    return (
        <View>
            <Modal transparent={true} visible={true}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        marginTop: Platform.select({
                            ios: statusBarHeight,
                            android: 0,
                        }),
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            marginTop: Platform.select({
                                ios: headerSize,
                                android: headerSize,
                            }),
                        }}
                    >
                        <KeyboardViewContainer>
                            <Pressable
                                onPress={Keyboard.dismiss}
                                style={{ flex: 1 }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        marginHorizontal: margin,
                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: 'blue',
                                        }}
                                    >
                                        <Text>Please choose a name</Text>
                                        <Text>
                                            aware that BackHandler events will
                                            not be emitted as long as the modal
                                            is open. On iOS, this callback is
                                            called when a Modal is being
                                            dismissed using a drag gesture when
                                            presentationStyle is pageSheet or
                                            formSheetThe onRequestClose callback
                                            is called when the user taps the
                                            hardware back button on Android or
                                            the menu button on Apple TV. Because
                                            of this required prop, be aware that
                                            BackHandler events will not be
                                            emitted as long as the modal is
                                            open. On iOS, this callback is
                                            called when a Modal is being
                                            dismissed using a drag gesture when
                                            presentationStyle is pageSheet or
                                            formSheetThe onRequestClose callback
                                            is called when the user taps the
                                            hardware back button on Android or
                                            the menu button on Apple TV. Because
                                            of this required prop, be aware that
                                            BackHandler events will not be
                                            emitted as long as the modal is
                                            open. On iOS, this callback is
                                            called when a Modal is being
                                            dismissed using a drag gesture when
                                            presentationStyle is pageSheet or
                                            formSheetThe onRequestClose callback
                                            is called when the user taps the
                                            hardware back button on Android or
                                            the menu button on Apple TV. Because
                                            of this required prop, be aware that
                                            BackHandler events will not be
                                            emitted as long as the modal is
                                            open. On iOS, this callback is
                                            called when a Modal is being
                                            dismissed using a drag gesture when
                                            presentationStyle is pageSheet or
                                            formSheet
                                        </Text>
                                        <Pressable>
                                            <TextInput
                                                style={{
                                                    backgroundColor: 'black',
                                                }}
                                            />
                                        </Pressable>
                                    </View>
                                </View>
                            </Pressable>
                        </KeyboardViewContainer>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const mapStateToProps = ({ settingsState: { headerSize, margin } }) => ({
    headerSize,
    margin,
});

export default connect(mapStateToProps)(UsernameModal);
