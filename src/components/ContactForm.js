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
    Karla_600SemiBold,
    useFonts,
} from '@expo-google-fonts/karla';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';
import ModalSelector from 'react-native-modal-selector';
import DatePickerModal from 'react-native-modal-datetime-picker';
import InputField from './InputField';
import validator from 'validator';
import ContactFormErrorModal from './ContactFormErrorModal';

export default function ContactForm({ fontFactor, hireUs, inquiry }) {
    const [loaded] = useFonts({
        Karla_400Regular,
        Karla_500Medium,
        Poppins_500Medium,
        Karla_600SemiBold,
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
                return {
                    ...state,
                    projectDeadline: action.payload,
                    defaultDate: action.payload,
                };
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
            case 'UPDATE_FORM_ERROR':
                return { ...state, formError: action.payload };
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
        projectDeadline: '',
        projectDetails: '',
        inquiryTitle: '',
        inquiryDetails: '',
        defaultDate: new Date(),
        formError: null,
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
        defaultDate,
        formError,
    } = state;
    const styles2 = {
        baseFontSize: {
            fontSize: fontFactor * wp(4.55),
            lineHeight: fontFactor * wp(5.78),
        },
        input: {
            padding: fontFactor * wp(2),
            justifyContent: 'center',
        },
        subParagraph: {
            fontSize: fontFactor * wp(3.64),
            lineHeight: fontFactor * wp(4.62),
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
    const buttonRef = useRef(null);
    const buttonDisabled = !hireUs && !inquiry;
    const validateForm = () => {
        let errorArray = [
            {
                field: 'Email',
                error: !validator.isEmail(validator.trim(email)),
            },
            {
                field: 'Name',
                error: validator.isEmpty(name, {
                    ignore_whitespace: true,
                }),
            },
            inquiry
                ? {
                      field: 'Inquiry Details',
                      error: validator.isEmpty(inquiryDetails, {
                          ignore_whitespace: true,
                      }),
                  }
                : {
                      field: 'Project Details',
                      error: validator.isEmpty(projectDetails, {
                          ignore_whitespace: true,
                      }),
                  },
        ];
        errorArray = errorArray.filter((el) => el.error);
        if (errorArray.length > 0) {
            return errorArray;
        } else return null;
    };
    const handleSubmit = () => {
        const error = validateForm();
        if (error) {
            dispatch({
                type: 'UPDATE_FORM_ERROR',
                payload: error,
            });
        } else {
            dispatch({
                type: 'UPDATE_FORM_ERROR',
                payload: null,
            });
        }
    };
    const clearError = () => {
        dispatch({
            type: 'UPDATE_FORM_ERROR',
            payload: null,
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
                                styles.whiteText,
                                styles.karla500Font,
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
                        textData={{
                            label: 'Your Name',
                            subParagraph: 'e.g Olawale Bashiru',
                            important: true,
                        }}
                    />
                    <MarginVertical />

                    <InputField
                        storeData={{
                            dispatch,
                            fieldValue: email,
                            actionType: 'UPDATE_EMAIL',
                        }}
                        fontFactor={fontFactor}
                        textData={{
                            label: 'E-mail Address',
                            subParagraph: 'e.g olawalebashiru@gmail.com',
                            important: true,
                        }}
                    />

                    <MarginVertical />
                    <InputField
                        storeData={{
                            dispatch,
                            fieldValue: phone,
                            actionType: 'UPDATE_PHONE',
                        }}
                        fontFactor={fontFactor}
                        textData={{
                            label: 'Contact Number',
                            subParagraph: 'Mobile number or skype ID',
                        }}
                    />
                    <MarginVertical />
                    <View>
                        <Text style={[styles.whiteText]}>
                            How did you hear about us?
                        </Text>
                        <MarginVertical size={0.2} />
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
                                    styles.karla400Font,
                                    styles2.baseFontSize,
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
                                textData={{
                                    label: 'Please state',
                                    subParagraph:
                                        'Please specify how you learnt about us',
                                }}
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
                                    styles.whiteText,
                                    styles.karla500Font,
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
                            textData={{
                                label: 'Your Budget',
                                subParagraph: 'e.g \u20A6500,000 or $1,000',
                            }}
                            fontFactor={fontFactor}
                        />

                        <MarginVertical />
                        <View>
                            <Text style={[styles.whiteText]}>
                                Project Deadline
                            </Text>
                            <MarginVertical size={0.2} />
                            <Pressable onPress={toggleDatePickerModal}>
                                <View pointerEvents="none">
                                    <TextInput
                                        editable={false}
                                        value={
                                            projectDeadline
                                                ? projectDeadline.toDateString()
                                                : projectDeadline
                                        }
                                        placeholder="Choose date"
                                        style={[
                                            styles.input,
                                            styles2.input,
                                            styles.karla400Font,
                                            styles2.baseFontSize,
                                        ]}
                                    />
                                </View>
                            </Pressable>
                            <MarginVertical size={0.2} />
                            <Text
                                style={[
                                    styles2.subParagraph,
                                    styles.blueText,
                                    styles.karla400Font,
                                ]}
                            >
                                Please specify in days, weeks or months
                            </Text>
                            <DatePickerModal
                                isVisible={datePickerVisible}
                                mode="date"
                                onConfirm={onProjectDeadlineChange}
                                onCancel={toggleDatePickerModal}
                                display="spinner"
                                textColor="white"
                                themeVariant="dark"
                                isDarkModeEnabled
                                date={defaultDate}
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
                            megaSize
                            textData={{
                                label: 'Project Details',
                                subParagraph:
                                    "Please tell me about what you'll like to achieve, provide as much information as relavant",
                                important: true,
                            }}
                        />
                        <MarginVertical />
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
                                    styles.whiteText,
                                    styles.karla500Font,
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
                            textData={{
                                label: 'Inquiry Title',
                                subParagraph:
                                    'Please specify in few words, what inquiry is about',
                            }}
                        />
                        <MarginVertical />
                        <InputField
                            storeData={{
                                dispatch,
                                fieldValue: inquiryDetails,
                                actionType: 'UPDATE_INQUIRY_DETAILS',
                            }}
                            fontFactor={fontFactor}
                            textData={{
                                label: 'Inquiry Details',
                                subParagraph:
                                    'Please provide more detailed information on inquiry',
                                important: true,
                            }}
                            megaSize
                        />
                        <MarginVertical />
                    </View>
                )}
                <View>
                    <Text
                        style={[
                            styles2.subParagraph,
                            styles.yellowFontColor,
                            styles.karla500Font,
                        ]}
                    >
                        You should get a reply within 24 hours.
                    </Text>
                    <MarginVertical />
                    <Pressable
                        ref={buttonRef}
                        disabled={buttonDisabled}
                        style={[styles.button, styles2.button]}
                        onPress={
                            // () => {}
                            handleSubmit
                        }
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                styles.poppins600Font,
                                styles2.buttonText,
                                styles.whiteText,
                                buttonDisabled && styles.buttonDisabled,
                            ]}
                        >
                            Submit
                        </Text>
                    </Pressable>
                    <ContactFormErrorModal
                        isVisible={formError ? true : false}
                        formError={formError}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    whiteText: {
        color: '#fff',
    },
    input: {
        backgroundColor: '#fff',
        color: 'black',
    },
    button: {
        backgroundColor: '#1A91D7',
    },
    buttonText: {
        textAlign: 'center',
    },
    poppins600Font: {
        fontFamily: 'Karla_600SemiBold',
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    karla500Font: {
        fontFamily: 'Poppins_500Medium',
    },
    blueText: {
        color: '#1A91D7',
    },
    yellowFontColor: { color: '#f8b526' },
    karla400Font: {
        fontFamily: 'Karla_400Regular',
    },
});
