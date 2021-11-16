import React, { useReducer, useRef } from 'react';
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
import ModalSelector from 'react-native-modal-selector';
import DatePickerModal from 'react-native-modal-datetime-picker';
import InputField from './InputField';
import validator from 'validator';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';

export default function ContactForm({ fontFactor, contactOption }) {
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
            case 'UPDATE_NAME_FIELD_ERROR':
                return {
                    ...state,
                    nameFieldError: action.payload
                        ? {
                              message: 'Please fill field',
                          }
                        : null,
                };
            case 'UPDATE_EMAIL_FIELD_ERROR':
                return {
                    ...state,
                    emailFieldError: action.payload
                        ? {
                              message: state.email
                                  ? 'Invalid Email'
                                  : 'Please fill field',
                          }
                        : null,
                };
            case 'UPDATE_INQUIRY_DETAILS_FIELD_ERROR':
                return {
                    ...state,
                    inquiryDetailsFieldError: action.payload
                        ? { message: 'Please fill field' }
                        : null,
                };
            case 'UPDATE_PROJECT_DETAILS_FIELD_ERROR':
                return {
                    ...state,
                    projectDetailsFieldError: action.payload
                        ? { message: 'Please fill field' }
                        : null,
                };
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
        formError: '',
        nameFieldError: null,
        emailFieldError: null,
        inquiryDetailsFieldError: null,
        projectDetailsFieldError: null,
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
        nameFieldError,
        emailFieldError,
        inquiryDetailsFieldError,
        projectDetailsFieldError,
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
            label: 'How did you hear about us',
            section: true,
        },
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
    const validateField = (field) => {
        switch (field) {
            case 'email':
                return !validator.isEmail(validator.trim(email));
            case 'name':
                return validator.isEmpty(name, {
                    ignore_whitespace: true,
                });
            case 'inquiryDetails':
                return validator.isEmpty(inquiryDetails, {
                    ignore_whitespace: true,
                });
            case 'projectDetails':
                return validator.isEmpty(projectDetails, {
                    ignore_whitespace: true,
                });
            default:
                return;
        }
    };
    const updateFieldError = (field) => {
        switch (field) {
            case 'name':
                return dispatch({
                    type: 'UPDATE_NAME_FIELD_ERROR',
                    payload: validateField(field),
                });
            case 'email':
                return dispatch({
                    type: 'UPDATE_EMAIL_FIELD_ERROR',
                    payload: validateField(field),
                });
            case 'inquiryDetails':
                return dispatch({
                    type: 'UPDATE_INQUIRY_DETAILS_FIELD_ERROR',
                    payload: validateField(field),
                });
            case 'projectDetails':
                return dispatch({
                    type: 'UPDATE_PROJECT_DETAILS_FIELD_ERROR',
                    payload: validateField(field),
                });
            default:
                return;
        }
    };
    const clearFieldError = (field) => {
        switch (field) {
            case 'name':
                return dispatch({
                    type: 'UPDATE_NAME_FIELD_ERROR',
                    payload: null,
                });
            case 'email':
                return dispatch({
                    type: 'UPDATE_EMAIL_FIELD_ERROR',
                    payload: null,
                });
            case 'inquiryDetails':
                return dispatch({
                    type: 'UPDATE_INQUIRY_DETAILS_FIELD_ERROR',
                    payload: null,
                });
            case 'projectDetails':
                return dispatch({
                    type: 'UPDATE_PROJECT_DETAILS_FIELD_ERROR',
                    payload: null,
                });
            default:
                return;
        }
    };
    const validateForm = () => {
        let errorArray = [
            {
                field: 'Email',
                error: validateField('email'),
            },
            {
                field: 'Name',
                error: validateField('name'),
            },
            inquiry
                ? {
                      field: 'Inquiry Details',
                      error: validateField('inquiryDetails'),
                  }
                : {
                      field: 'Project Details',
                      error: validateField('projectDetails'),
                  },
        ];
        errorArray = errorArray.filter((el) => el.error);
        if (errorArray.length > 0) {
            const arrayLength = errorArray.length;
            const errorReducer = (sum, cur, ind) => {
                if (ind === arrayLength - 1) {
                    return sum + ' ' + cur.field;
                } else {
                    return sum + ' ' + cur.field + ',';
                }
            };
            const formError = errorArray.reduce(errorReducer, '');
            return formError;
        } else return '';
    };
    const clearFormError = () => {
        dispatch({
            type: 'UPDATE_FORM_ERROR',
            payload: null,
        });
    };
    const handleSubmit = () => {
        const formError = validateForm();
        if (formError) {
            dispatch({
                type: 'UPDATE_FORM_ERROR',
                payload: formError,
            });
        } else {
            clearFormError();
        }
    };
    const { statusBarHeight } = Constants;
    const inquiry = contactOption === 'Inquiry';
    const hireUs = contactOption === 'Hire Us';

    //clear formError onFocus of any field
    //test if changing contactOption type clears error text

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
                                styles.poppins500Font,
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
                        onBlur={() => updateFieldError('name')}
                        onFocus={() => {
                            formError && clearFormError();
                            clearFieldError('name');
                        }}
                        fieldError={nameFieldError}
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
                        onBlur={() => updateFieldError('email')}
                        onFocus={() => {
                            formError && clearFormError();
                            clearFieldError('email');
                        }}
                        fieldError={emailFieldError}
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
                                marginTop: Platform.select({
                                    ios: statusBarHeight,
                                    android: 0,
                                }),
                            }}
                            sectionTextStyle={{
                                fontSize: fontFactor * wp(4.5),
                                lineHeight: fontFactor * wp(5.72),
                                fontFamily: 'Karla_500Medium',
                            }}
                            optionTextStyle={{
                                color: 'black',
                                fontSize: fontFactor * wp(4.5),
                                lineHeight: fontFactor * wp(5.72),
                                fontFamily: 'Karla_400Regular',
                            }}
                            cancelTextStyle={{
                                color: 'red',
                                fontSize: fontFactor * wp(4.5),
                                lineHeight: fontFactor * wp(5.72),
                                fontFamily: 'Karla_500Medium',
                            }}
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
                                    styles.poppins500Font,
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
                            onBlur={() => updateFieldError('projectDetails')}
                            onFocus={() => {
                                formError && clearFormError();
                                clearFieldError('projectDetails');
                            }}
                            fieldError={projectDetailsFieldError}
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
                                    styles.poppins500Font,
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
                            onBlur={() => updateFieldError('inquiryDetails')}
                            onFocus={() => {
                                formError && clearFormError();
                                clearFieldError('inquiryDetails');
                            }}
                            fieldError={inquiryDetailsFieldError}
                        />
                        <MarginVertical />
                    </View>
                )}
                <View>
                    {formError ? (
                        <Text
                            style={[
                                styles2.subParagraph,
                                styles.poppins500Font,
                                styles.whiteText,
                            ]}
                        >
                            Error in{' '}
                            <Text style={styles.redText}>{formError}</Text>{' '}
                            field(s)
                        </Text>
                    ) : (
                        <Text
                            style={[
                                styles2.subParagraph,
                                styles.yellowFontColor,
                                styles.poppins500Font,
                            ]}
                        >
                            You should get a reply within 24 hours .
                        </Text>
                    )}
                    <MarginVertical />
                    <Pressable
                        ref={buttonRef}
                        disabled={buttonDisabled}
                        style={[styles.button, styles2.button]}
                        onPress={handleSubmit}
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                styles.karla600Font,
                                styles2.buttonText,
                                styles.whiteText,
                                buttonDisabled && styles.buttonDisabled,
                            ]}
                        >
                            Submit
                        </Text>
                    </Pressable>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

ContactForm.propTypes = {
    fontFactor: PropTypes.number,
    contactOption: PropTypes.string,
};

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
    karla600Font: {
        fontFamily: 'Karla_600SemiBold',
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    poppins500Font: {
        fontFamily: 'Poppins_500Medium',
    },
    blueText: {
        color: '#1A91D7',
    },
    yellowFontColor: { color: '#f8b526' },
    karla400Font: {
        fontFamily: 'Karla_400Regular',
    },
    redText: {
        color: 'red',
    },
});
