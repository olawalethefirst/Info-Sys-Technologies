import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    Platform,
    Animated,
    TouchableOpacity,
} from 'react-native';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ModalSelector from 'react-native-modal-selector';
import DatePickerModal from 'react-native-modal-datetime-picker';
import InputField from './InputField';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';

export default function ContactForm({ fontFactor, scrollRef }) {
    const submitButtonAnimatedValue = useRef(new Animated.Value(1)).current;
    const styles2 = {
        baseFontSize: {
            fontSize: fontFactor * wp(4.55),
            lineHeight: fontFactor * wp(5.78),
        },
        subHeaderFontSize: {
            fontSize: fontFactor * wp(5.5),
            lineHeight: fontFactor * wp(7),
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
            transform: [{ scale: submitButtonAnimatedValue }],
        },
        buttonText: {
            fontSize: fontFactor * wp(5),
            lineHeight: fontFactor * wp(6.35),
        },
        contactOptionSelector: {
            padding: fontFactor * wp(4.55),
            borderWidth: wp(0.25) * fontFactor,
        },
        subHeaderBorderStyle: {
            borderBottomWidth: wp(0.1) * fontFactor,
        },
    };
    const { watch, resetField, control, handleSubmit, formState } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            referralChannel: '',
            budget: '',
            other: '',
            projectDeadline: null,
            inquiryTitle: '',
            contactOption: '',
            contactDetails: '',
        },
    });
    const { errors, isSubmitted, isValid } = formState;
    const contactOption = watch('contactOption');
    const inquiry = contactOption === 'Inquiry';
    const hireUs = contactOption === 'Hire Us';
    const swapErrorStateForMessage = (state) => {
        switch (state) {
            case 'email':
                return 'E-mail Address';
            case 'name':
                return 'Your Name';
            case 'contactOption':
                return 'Contact Option';
            case 'contactDetails':
                return hireUs ? 'Project Details' : 'Inquiry Details';
            default:
                return '';
        }
    };
    const [datePickerVisible, setDatePickerVisible] = useState(false);
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
    let contactOptionReference = 0;
    const contactOptionData = [
        {
            key: contactOptionReference++,
            label: 'Hire Us',
        },
        {
            key: contactOptionReference++,
            label: 'Inquiry',
        },
    ];
    const resetContactOptionState = () => {
        resetField('contactDetails', {
            keepTouched: false,
            keepError: false,
            keepDirty: false,
        });
        resetField('budget', {
            keepTouched: false,
            keepError: false,
            keepDirty: false,
        });
        resetField('projectDeadline', {
            keepTouched: false,
            keepError: false,
            keepDirty: false,
        });
        resetField('inquiryTitle', {
            keepTouched: false,
            keepError: false,
            keepDirty: false,
        });
    };
    const onSubmit = () => {
        setTimeout(() => console.log('submitted'), 5000);
    };
    const otherOptionReferralChannelEnabled =
        watch('referralChannel') === 'Other';
    const toggleDatePickerModal = () => {
        setDatePickerVisible((oldState) => !oldState);
    };
    const contactOptionSelectorRef = useRef(null);
    const { statusBarHeight } = Constants;
    const transformErrorStatetoString = () => {
        return Object.keys(errors).reduce(
            (prev, next) =>
                prev
                    ? prev + ', ' + swapErrorStateForMessage(next)
                    : swapErrorStateForMessage(next),
            ''
        );
    };
    const [isFormError, setIsFormError] = useState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        setIsFormError(!!Object.keys(errors).length);
    });
    const contactFormRef = useRef(null);

    return (
        <View ref={contactFormRef}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <MarginVertical size={2} />
                    <View>
                        <Text
                            style={[
                                styles.whiteText,
                                styles.poppins500Font,
                                styles2.baseFontSize,
                            ]}
                        >
                            Do you want to get in touch or hire us?
                            {<Text style={styles.redText}> *</Text>}
                        </Text>
                        <MarginVertical />

                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            name="contactOption"
                            render={({
                                field: { onChange, onBlur, value, ref },
                                fieldState: { error },
                            }) => {
                                return (
                                    <ModalSelector
                                        ref={(reference) => {
                                            contactOptionSelectorRef.current =
                                                reference;
                                            ref(reference);
                                        }}
                                        onModalClose={onBlur}
                                        data={contactOptionData}
                                        supportedOrientations={['portrait']}
                                        accessible
                                        scrollViewAccessibilityLabel={
                                            'Scrollable options'
                                        }
                                        cancelButtonAccessibilityLabel={
                                            'Cancel Button'
                                        }
                                        onChange={({ label }) => {
                                            resetContactOptionState();
                                            onChange(label);
                                        }}
                                        overlayStyle={{
                                            backgroundColor: 'rgba(0,0,0,0.9)',
                                            marginTop: Platform.select({
                                                ios: statusBarHeight,
                                                android: 0,
                                            }),
                                        }}
                                        backdropPressToClose={true}
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
                                        customSelector={
                                            <TouchableOpacity
                                                activeOpacity={0.5}
                                                onPress={() => {
                                                    contactOptionSelectorRef.current?.open();
                                                }}
                                            >
                                                <TextInput
                                                    error={error}
                                                    value={value}
                                                    style={[
                                                        styles.poppins600Font,
                                                        styles.blueText,
                                                        styles2.baseFontSize,
                                                        styles2.contactOptionSelector,
                                                        styles.contactOptionSelector,
                                                    ]}
                                                    placeholder="Contact Option"
                                                    placeholderTextColor="#1CB8F3"
                                                    pointerEvents="none"
                                                    editable={false}
                                                />
                                            </TouchableOpacity>
                                        }
                                    />
                                );
                            }}
                        />
                    </View>
                    <MarginVertical />
                    <View>
                        <View
                            style={[
                                styles2.subHeaderBorderStyle,
                                styles.subHeaderBorderStyle,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.whiteText,
                                    styles.poppins500Font,
                                    styles2.subHeaderFontSize,
                                ]}
                            >
                                About You
                            </Text>
                            <MarginVertical />
                        </View>

                        <MarginVertical />
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            name="name"
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <InputField
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    error={error}
                                    required
                                    subParagraph="e.g Olawale Bashiru"
                                    label="Your Name"
                                />
                            )}
                        />

                        <MarginVertical />
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                                pattern:
                                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            }}
                            name="email"
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <InputField
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    error={error}
                                    required
                                    subParagraph="e.g olawalebashiru@gmail.com"
                                    label="E-mail Address"
                                />
                            )}
                        />
                        <MarginVertical />
                        <Controller
                            control={control}
                            name="phone"
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <InputField
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    error={error}
                                    subParagraph="Mobile number or skype ID"
                                    label="Contact Number"
                                />
                            )}
                        />
                        <MarginVertical />

                        <View>
                            <Controller
                                control={control}
                                name="referralChannel"
                                render={({
                                    field: { onChange, onBlur, value, ref },
                                }) => (
                                    <ModalSelector
                                        touchableActiveOpacity={0.5}
                                        ref={ref}
                                        data={referralChannelData}
                                        supportedOrientations={['portrait']}
                                        accessible={true}
                                        scrollViewAccessibilityLabel={
                                            'Scrollable options'
                                        }
                                        cancelButtonAccessibilityLabel={
                                            'Cancel Button'
                                        }
                                        onChange={({ label }) =>
                                            onChange(label)
                                        }
                                        onModalClose={onBlur}
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
                                        <InputField
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            subParagraph="Please select an option"
                                            label="How did you hear about us?"
                                            pointerEvents="none"
                                            editable={false}
                                        />
                                    </ModalSelector>
                                )}
                            />
                        </View>
                        <MarginVertical />
                        {otherOptionReferralChannelEnabled && (
                            <View>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    name="other"
                                    render={({
                                        field: { onChange, onBlur, value },
                                        fieldState: { error },
                                    }) => (
                                        <InputField
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            error={error}
                                            subParagraph="Please specify how you learnt about us"
                                            label="Please state"
                                        />
                                    )}
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
                                    styles2.subHeaderBorderStyle,
                                    styles.subHeaderBorderStyle,
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
                            <Controller
                                control={control}
                                name="budget"
                                render={({
                                    field: { onChange, onBlur, value },
                                    fieldState: { error },
                                }) => (
                                    <InputField
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        error={error}
                                        subParagraph={
                                            'e.g \u20A6500,000 or $1,000'
                                        }
                                        label="Your Budget"
                                    />
                                )}
                            />
                            <MarginVertical />
                            <Controller
                                control={control}
                                name="projectDeadline"
                                render={({ field: { onChange, value } }) => (
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        onPress={toggleDatePickerModal}
                                    >
                                        <InputField
                                            value={
                                                value
                                                    ? value.toDateString()
                                                    : value
                                            }
                                            subParagraph={
                                                'Date, indicating day, month and year'
                                            }
                                            label="Project Deadline"
                                            pointerEvents="none"
                                            editable={false}
                                        />
                                        <DatePickerModal
                                            isVisible={datePickerVisible}
                                            mode="date"
                                            onConfirm={(val) => {
                                                toggleDatePickerModal();
                                                onChange(val);
                                            }}
                                            onCancel={toggleDatePickerModal}
                                            display="spinner"
                                            textColor="white"
                                            themeVariant="dark"
                                            isDarkModeEnabled
                                            date={new Date()}
                                            minimumDate={new Date()}
                                        />
                                    </TouchableOpacity>
                                )}
                            />

                            <MarginVertical />
                            <Controller
                                control={control}
                                rules={{
                                    required: hireUs,
                                }}
                                name="contactDetails"
                                render={({
                                    field: { onChange, onBlur, value },
                                    fieldState: { error },
                                }) => (
                                    <InputField
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        error={error}
                                        subParagraph={
                                            "Please tell me about what you'll like to achieve, provide as much information as relavant"
                                        }
                                        label={'Project Details'}
                                        megaSize
                                        contactFormRef={contactFormRef}
                                        required
                                        scrollRef={scrollRef}
                                    />
                                )}
                            />
                            <MarginVertical />
                        </View>
                    )}
                    {inquiry && (
                        <View>
                            <MarginVertical />
                            <View
                                style={[
                                    styles2.subHeaderBorderStyle,
                                    styles.subHeaderBorderStyle,
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
                            <Controller
                                control={control}
                                name="inquiryTitle"
                                render={({
                                    field: { onChange, onBlur, value },
                                    fieldState: { error },
                                }) => (
                                    <InputField
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        error={error}
                                        subParagraph={
                                            'Please specify in few words, what inquiry is about'
                                        }
                                        label={'Inquiry Title'}
                                    />
                                )}
                            />
                            <MarginVertical />
                            <Controller
                                control={control}
                                rules={{
                                    required: inquiry,
                                }}
                                name="contactDetails"
                                render={({
                                    field: { onChange, onBlur, value },
                                    fieldState: { error },
                                }) => (
                                    <InputField
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        error={error}
                                        subParagraph={
                                            'Please provide more detailed information on inquiry'
                                        }
                                        label={'Inquiry Details'}
                                        megaSize
                                        contactFormRef={contactFormRef}
                                        required
                                        scrollRef={scrollRef}
                                    />
                                )}
                            />
                            <MarginVertical />
                        </View>
                    )}
                    <View>
                        {isSubmitted && !isValid && isFormError ? (
                            <Text
                                style={[
                                    styles2.subParagraph,
                                    styles.poppins500Font,
                                    styles.whiteText,
                                ]}
                            >
                                Error in{' '}
                                <Text style={styles.redText}>
                                    {transformErrorStatetoString()}
                                </Text>{' '}
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

                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={[styles.button, styles2.button]}
                            onPress={handleSubmit(onSubmit, () =>
                                console.log('error')
                            )}
                            disabled={isFormError}
                        >
                            <Text
                                style={[
                                    styles.buttonText,
                                    styles.karla600Font,
                                    styles2.buttonText,
                                    styles.whiteText,
                                ]}
                            >
                                Submit
                            </Text>
                        </TouchableOpacity>

                        <MarginVertical />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

ContactForm.propTypes = {
    fontFactor: PropTypes.number,
    scrollRef: PropTypes.object,
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
    poppins600Font: {
        fontFamily: 'Poppins_600SemiBold',
    },
    subHeaderBorderStyle: {
        borderBottomColor: 'rgba(255,255,255,0.5)',
    },
    contactOptionSelector: {
        borderColor: '#1A91D7',
        textAlign: 'center',
        backgroundColor: '#ffffff',
    },
});
