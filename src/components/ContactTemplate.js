import React, { useState, useReducer } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
    Karla_400Regular,
    Karla_500Medium,
    useFonts,
} from '@expo-google-fonts/karla';
import ModalSelector from 'react-native-modal-selector';

export default function ContactTemplate({ fontFactor }) {
    const [loaded] = useFonts({
        Karla_400Regular,
        Karla_500Medium,
    });
    const inputFieldsReducer = (state, action) => {
        switch (action.type) {
            case 'UPDATE_NAME':
                return { ...state, name: action.payload };
            case 'UPDATE_EMAIL':
                return { ...state, email: action.payload };
            case 'UPDATE_PHONE':
                return { ...state, phone: action.payload };
            case 'UPDATE_REFERRAL_CHANNEL':
                return { ...state, referralChannel: action.payload };
            default:
                return state;
        }
    };
    const [state, dispatch] = useReducer(inputFieldsReducer, {
        name: '',
        email: '',
        phone: '',
        referralChannel: null,
    });
    const { name, email, phone, referralChannel } = state;
    const styles2 = {
        allTexts: {
            fontSize: fontFactor * wp(4.55),
            lineHeight: fontFactor * wp(5.78),
            fontFamily: 'Karla_400Regular',
        },
        text: {
            paddingBottom: fontFactor * wp(1),
        },
        input: {
            padding: wp(2),
            borderRadius: wp(3) * fontFactor,
        },
    };
    let referralChannelIndex = 0;
    const referralChannelData = [
        {
            key: referralChannelIndex++,
            label: 'Social Media',
        },
        {
            key: referralChannelIndex++,
            label: 'Referred By Someone',
        },
        {
            key: referralChannelIndex++,
            label: 'Your Business Card',
        },
        {
            key: referralChannelIndex++,
            label: 'Other',
        },
    ];

    if (!loaded) {
        return null;
    }

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            style={{
                flex: 1,
            }}
        >
            <View>
                <MarginVertical />

                <View
                    style={[
                        {
                            borderBottomColor: 'rgba(255,255,255,0.5)',
                            borderBottomWidth: wp(0.1),
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.allTexts,
                            styles.heading,
                            {
                                fontSize: fontFactor * wp(5.5),
                                lineHeight: fontFactor * wp(7),
                            },
                        ]}
                    >
                        About You
                    </Text>
                    <MarginVertical />
                </View>

                <MarginVertical />
                <View>
                    <Text style={[styles.allTexts, styles2.text]}>
                        Your Name
                    </Text>
                    <TextInput
                        value={name}
                        onChangeText={(text) =>
                            dispatch({
                                type: 'UPDATE_NAME',
                                value: text,
                            })
                        }
                        style={[styles.input, styles2.input, styles2.v]}
                    />
                </View>
                <MarginVertical />

                <View>
                    <Text style={[styles.allTexts, styles2.text]}>
                        E-mail Address
                    </Text>
                    <TextInput
                        value={email}
                        onChangeText={(text) =>
                            dispatch({
                                type: 'UPDATE_EMAIL',
                                value: text,
                            })
                        }
                        style={[styles.input, styles2.input, styles2.allTexts]}
                    />
                </View>
                <MarginVertical />
                <View>
                    <Text style={[styles.allTexts, styles2.text]}>
                        Contact Number
                    </Text>
                    <TextInput
                        value={phone}
                        onChangeText={(text) =>
                            dispatch({
                                type: 'UPDATE_PHONE',
                                value: text,
                            })
                        }
                        style={[styles.input, styles2.input, styles2.allTexts]}
                    />
                </View>
                <MarginVertical />
                <View>
                    <Text style={[styles.allTexts, styles2.text]}>
                        How did you hear about us ?
                    </Text>
                    <ModalSelector
                        data={referralChannelData}
                        initValue="Please select an option"
                        supportedOrientations={['portrait']}
                        accessible={true}
                        scrollViewAccessibilityLabel={'Scrollable options'}
                        cancelButtonAccessibilityLabel={'Cancel Button'}
                        onChange={(option) =>
                            dispatch({
                                type: 'UPDATE_REFERRAL_CHANNEL',
                                payload: option.label,
                            })
                        }
                    >
                        <TextInput
                            style={[
                                styles.input,
                                styles2.input,
                                styles2.allTexts,
                            ]}
                            editable={false}
                            placeholder="Please select an option"
                            value={referralChannel}
                        />
                    </ModalSelector>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    allTexts: {
        color: '#fff',
    },
    input: {
        backgroundColor: '#fff',
    },
    heading: {
        fontFamily: 'Karla_500Medium',
    },
});
