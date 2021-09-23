import React, { useState, useReducer, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    Pressable,
    Platform,
} from 'react-native';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
    Karla_400Regular,
    Karla_500Medium,
    useFonts,
} from '@expo-google-fonts/karla';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';
import ModalSelector from 'react-native-modal-selector';
import DatePickerModal from 'react-native-modal-datetime-picker';
import InputField from './InputField';

export default function ContactForm({ fontFactor, hireUs, inquiry }) {
    const [loaded] = useFonts({
        Karla_400Regular,
        Karla_500Medium,
        Poppins_500Medium,
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
            case 'UPDATE_BUDGET':
                return { ...state, budget: action.payload };
            case 'UPDATE_OTHER':
                return { ...state, other: action.payload };
            case 'UPDATE_PROJECT_DEADLINE':
                return { ...state, projectDeadline: action.payload };
            case 'TOGGLE_DATE_PICKER':
                return {
                    ...state,
                    datePickerVisible: !state.datePickerVisible,
                };
            case 'UPDATE_PROJECT_DETAILS':
                return { ...state, projectDetails: action.payload };
            case 'UPDATE_INQUIRY_TITLE':
                return { ...state, inquiryTitle: action.payload };
            case 'UPDATE_INQUIRY_DETAILS':
                return { ...state, inquiryDetails: action.payload };
            default:
                return state;
        }
    };
    const [state, dispatch] = useReducer(inputFieldsReducer, {
        name: '',
        email: '',
        phone: '',
        referralChannel: null,
        budget: '',
        other: '',
        datePickerVisible: false,
        projectDeadline: new Date(),
        projectDetails: '',
        inquiryTitle: '',
        inquiryDetails: '',
    });
    const {
        name,
        email,
        phone,
        referralChannel,
        budget,
        other,
        datePickerVisible,
        projectDeadline,
        projectDetails,
        inquiryTitle,
        inquiryDetails,
    } = state;

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
            padding: fontFactor * wp(2),
            justifyContent: 'center',
        },
        subParagraph: {
            fontSize: fontFactor * wp(3.64),
            lineHeight: fontFactor * wp(4.62),
            color: '#f8b526',
            fontFamily: 'Poppins_500Medium',
        },
        singleLineInput: {
            minHeight: fontFactor * wp(10),
        },
        multilineInput: {
            minHeight: 4 * fontFactor * wp(5.78),
        },
        button: {
            paddingVertical: fontFactor * wp(3.5),
        },
        buttonText: {
            fontSize: fontFactor * wp(5),
            lineHeight: fontFactor * wp(6.35),
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
    const otherOptionReferralChannelEnabled = referralChannel === 'Other';
    const toggleDatePickerModal = () => {
        dispatch({
            type: 'TOGGLE_DATE_PICKER',
        });
    };
    const onProjectDeadlineChange = (date) => {
        toggleDatePickerModal();
        dispatch({
            type: 'UPDATE_PROJECT_DEADLINE',
            payload: date,
        });
    };

    if (!loaded) {
        return null;
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <MarginVertical />
                <View>
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
                    <InputField
                        fontFactor={fontFactor}
                        storeData={{
                            dispatch,
                            fieldValue: name,
                            actionType: 'UPDATE_NAME',
                        }}
                        label="Your Name"
                    />
                    <MarginVertical />

                    <InputField
                        storeData={{
                            dispatch,
                            fieldValue: email,
                            actionType: 'UPDATE_EMAIL',
                        }}
                        fontFactor={fontFactor}
                        label="E-mail Address"
                    />

                    <MarginVertical />
                    <InputField
                        storeData={{
                            dispatch,
                            fieldValue: phone,
                            actionType: 'UPDATE_PHONE',
                        }}
                        fontFactor={fontFactor}
                        label="Contact Number"
                    />
                    <MarginVertical />
                    <View>
                        <Text style={[styles.allTexts, styles2.text]}>
                            How did you hear about us?
                        </Text>
                        <ModalSelector
                            data={referralChannelData}
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
                            overlayStyle={{
                                backgroundColor: 'rgba(0,0,0,0.9)',
                            }}
                            optionTextStyle={{ color: 'black' }}
                            cancelTextStyle={{ color: 'red' }}
                            backdropPressToClose={true}
                        >
                            <TextInput
                                style={[
                                    styles.input,
                                    styles2.input,
                                    styles2.allTexts,
                                    styles2.singleLineInput,
                                ]}
                                editable={false}
                                placeholder="Please select an option"
                                value={referralChannel}
                            />
                        </ModalSelector>
                    </View>
                    <MarginVertical />
                    {otherOptionReferralChannelEnabled && (
                        <View>
                            <InputField
                                storeData={{
                                    dispatch,
                                    fieldValue: other,
                                    actionType: 'UPDATE_OTHER',
                                }}
                                fontFactor={fontFactor}
                                label="Please state"
                            />
                            <MarginVertical />
                        </View>
                    )}
                </View>

                {hireUs && (
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
                                Project Details
                            </Text>
                            <MarginVertical />
                        </View>
                        <MarginVertical />
                        <InputField
                            storeData={{
                                dispatch,
                                fieldValue: budget,
                                actionType: 'UPDATE_BUDGET',
                            }}
                            fontFactor={fontFactor}
                            label="Your Budget"
                        />

                        <MarginVertical />
                        <View>
                            <Text style={[styles.allTexts, styles2.text]}>
                                Project Deadline
                            </Text>
                            <Pressable onPress={toggleDatePickerModal}>
                                <View pointerEvents="none">
                                    <TextInput
                                        editable={false}
                                        value={projectDeadline.toDateString()}
                                        style={[
                                            styles.input,
                                            styles2.input,
                                            styles2.allTexts,
                                        ]}
                                    />
                                </View>
                            </Pressable>

                            <DatePickerModal
                                isVisible={datePickerVisible}
                                mode="date"
                                onConfirm={onProjectDeadlineChange}
                                onCancel={toggleDatePickerModal}
                                display="spinner"
                                textColor="white"
                                themeVariant="dark"
                                isDarkModeEnabled
                                date={projectDeadline}
                                minimumDate={new Date()}
                            />
                        </View>
                        <MarginVertical />
                        <InputField
                            storeData={{
                                dispatch,
                                fieldValue: projectDetails,
                                actionType: 'UPDATE_PROJECT_DETAILS',
                            }}
                            fontFactor={fontFactor}
                            label="Project Details"
                            megaSize
                        />
                    </View>
                )}
                {inquiry && (
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
                                Inquiry
                            </Text>
                            <MarginVertical />
                        </View>
                        <MarginVertical />
                        <InputField
                            storeData={{
                                dispatch,
                                fieldValue: inquiryTitle,
                                actionType: 'UPDATE_INQUIRY_TITLE',
                            }}
                            fontFactor={fontFactor}
                            label="Inquiry Title"
                        />
                        <MarginVertical />
                        <InputField
                            storeData={{
                                dispatch,
                                fieldValue: inquiryDetails,
                                actionType: 'UPDATE_INQUIRY_DETAILS',
                            }}
                            fontFactor={fontFactor}
                            label="Inquiry Details"
                            megaSize
                        />
                    </View>
                )}
                <MarginVertical />
                <View>
                    <Text style={[styles2.subParagraph]}>
                        You should get a reply within 24 hours.
                    </Text>
                    <MarginVertical />
                    <Pressable
                        disabled={true}
                        style={[styles.button, styles2.button]}
                    >
                        <Text style={[styles.buttonText, styles2.buttonText]}>
                            Submit
                        </Text>
                    </Pressable>
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
        color: 'black',
    },
    heading: {
        fontFamily: 'Karla_500Medium',
    },
    button: {
        backgroundColor: '#1A91D7',
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
    },
});
