import React, { useRef, useReducer } from 'react';
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
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Constants from 'expo-constants';
import KeyboardViewContainer from './KeyboardViewContainer';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

function UsernameModal({ headerSize, margin, fontFactor }) {
    const { statusBarHeight } = Constants;
    const inputRef = useRef(null);
    console.log(useReducer, 'snsjnsj');

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
                            <KeyboardAvoidingView
                                style={{ flex: 1 }}
                                behavior={
                                    Platform.OS === 'ios' ? 'padding' : 'null'
                                }
                                keyboardVerticalOffset={
                                    headerSize + statusBarHeight
                                }
                            >
                                <ScrollView
                                    contentContainerStyle={{
                                        flexGrow: 1,
                                    }}
                                >
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
                                                    // backgroundColor: '#fff',
                                                    padding: wp(2.2),
                                                    // borderRadius: wp(1.35),
                                                    marginBottom: wp(2.2),
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize:
                                                            fontFactor *
                                                            wp(4.5),
                                                        lineHeight:
                                                            fontFactor *
                                                            wp(5.72),
                                                        fontFamily:
                                                            'Karla_500Medium',
                                                        textAlign: 'center',
                                                        color: '#fff',
                                                        textShadowOffset: {
                                                            width: 0.1,
                                                            height: 0.1,
                                                        },
                                                        textShadowColor: '#fff',
                                                        textShadowRadius: 0.1,
                                                    }}
                                                >
                                                    Welcome, please choose a
                                                    forum name
                                                </Text>
                                            </View>
                                            <Pressable
                                                onPress={() =>
                                                    inputRef.current.focus()
                                                }
                                                style={{
                                                    backgroundColor: '#fff',
                                                    padding: wp(4.4),
                                                    marginBottom: wp(2.2),
                                                }}
                                            >
                                                <TextInput
                                                    autoCorrect={false}
                                                    autoCapitalize={'words'}
                                                    ref={inputRef}
                                                    placeholder="input name"
                                                    placeholderTextColor="#808080"
                                                    style={{
                                                        fontSize:
                                                            fontFactor *
                                                            wp(4.5),
                                                        lineHeight:
                                                            fontFactor *
                                                            wp(5.72),
                                                        fontFamily:
                                                            'Karla_400Regular',
                                                        textAlign: 'center',
                                                        
                                                    }}
                                                />
                                            </Pressable>
                                            <TouchableOpacity
                                                style={{
                                                    width: '100%',
                                                    justifyContent: 'center',
                                                    backgroundColor: '#1A91D7',
                                                    padding: wp(2.2),
                                                    borderRadius: wp(1.35),
                                                    marginBottom: wp(2.2),
                                                }}
                                                onPress={() => {}}
                                            >
                                                <Text
                                                    style={{
                                                        textAlign: 'center',
                                                        color: '#fff',
                                                        fontSize:
                                                            fontFactor *
                                                            wp(4.5),
                                                        lineHeight:
                                                            fontFactor *
                                                            wp(5.72),
                                                        fontFamily:
                                                            'Karla_400Regular',
                                                        
                                                    }}
                                                >
                                                    Submit
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
                                                    alignSelf: 'center',
                                                }}
                                                onPress={() => {}}
                                            >
                                                <Text
                                                    style={{
                                                        textAlign: 'center',
                                                        color: 'red',
                                                        fontSize:
                                                            fontFactor *
                                                            wp(4.5),
                                                        lineHeight:
                                                            fontFactor *
                                                            wp(5.72),
                                                        fontFamily:
                                                            'Karla_400Regular',
                                                    }}
                                                >
                                                    Cancel
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </Pressable>
                                </ScrollView>
                            </KeyboardAvoidingView>
                        </KeyboardViewContainer>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const mapStateToProps = ({
    settingsState: { headerSize, margin, fontFactor },
}) => ({
    headerSize,
    margin,
    fontFactor,
});

export default connect(mapStateToProps)(UsernameModal);
