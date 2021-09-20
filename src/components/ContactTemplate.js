import React, { useReducer } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import MarginVertical from './MarginVertical';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    Karla_400Regular,
    Karla_500Medium,
    useFonts,
} from '@expo-google-fonts/karla';
import { Picker } from '@react-native-picker/picker';

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
            default:
                return state;
        }
    };
    const [state, dispatch] = useReducer(inputFieldsReducer, {
        name: '',
        email: '',
        phone: '',
    });
    const { name, email, phone } = state;

    const styles2 = {
        text: {
            fontSize: fontFactor * wp(4.55),
            lineHeight: fontFactor * wp(5.78),
            fontFamily: 'Karla_400Regular',
            paddingBottom: fontFactor * wp(1),
        },
        input: {
            padding: wp(1),
            borderRadius: wp(3) * fontFactor,
        },
    };

    if (!loaded) {
        return null;
    }

    return (
        <View
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
                        style={[styles.input, styles2.input, styles2.text]}
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
                        style={[styles.input, styles2.input, styles2.text]}
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
                        style={[styles.input, styles2.input, styles2.text]}
                    />
                </View>
                <MarginVertical />
                <View>
                    <Text style={[styles.allTexts, styles2.text]}>
                        How did you hear about us ?
                    </Text>
                    <TextInput
                        value={phone}
                        onChangeText={(text) =>
                            dispatch({
                                type: 'UPDATE_PHONE',
                                value: text,
                            })
                        }
                        style={[styles.input, styles2.input, styles2.text]}
                    />
                </View>
            </View>
        </View>
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
