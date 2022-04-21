import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ModalSelector from 'react-native-modal-selector';
import DatePickerModal from 'react-native-modal-datetime-picker';
import PropTypes from 'prop-types';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import { modalSelectorStyles } from '../constants';
import toggleContactModal from '../redux/actions/toggleContactModal';
import { connect } from 'react-redux';
import InputField from './InputField';
import useScrollToItemBottom from '../hooks/useScrollToItemBottom';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

function ContactForm({ fontFactor, scrollRef, toggleContactModal, margin }) {
    const [scrollToItemBottom] = useScrollToItemBottom();
    const animatedSubmit = useSharedValue(1);
    const styles2 = {
        container: { paddingHorizontal: margin },
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
    const animatedSubmitStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: withTiming(animatedSubmit.value, { duration: 150 }) },
        ],
    }));
    const { resetField, control, handleSubmit, reset } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange',
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
    const { errors, isSubmitSuccessful, isSubmitted } = useFormState({
        control,
    });
    const isFormError = !!Object.keys(errors).length;
    const disableSubmit = isFormError && isSubmitted;
    const contactOption = useWatch({ name: 'contactOption', control });
    const inquiry = contactOption === 'Inquiry';
    const hireUs = contactOption === 'Hire Us';
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    let referralChannelIndex = 0;
    const referralChannelData = [
        {
            key: referralChannelIndex++,
            label: 'How did you hear about us?',
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
            label: 'Do you want to get in touch or hire us?',
            section: true,
        },
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
    const onPressInButton = useCallback(() => {
        'worklet';
        animatedSubmit.value = 0.9;
    }, [animatedSubmit]);
    const onPressOutButton = useCallback(() => {
        'worklet';
        animatedSubmit.value = 1;
    }, [animatedSubmit]);
    const otherOptionReferralChannel = useWatch({
        name: 'referralChannel',
        control,
    });
    const otherOptionReferralChannelEnabled =
        otherOptionReferralChannel === 'Other';
    const toggleDatePickerModal = () => {
        setDatePickerVisible((oldState) => !oldState);
    };
    const contactOptionSelectorRef = useRef(null);
    const contactFormRef = useRef(null);

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset(null, {
                keepErrors: false,
                keepDirty: false,
                keepValues: false,
                keepDefaultValues: true,
                keepIsSubmitted: false,
                keepTouched: false,
                keepSubmitCount: false,
                keepIsValid: false,
            });
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <View ref={contactFormRef}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles2.container}>
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
                                        backdropPressToClose={true}
                                        {...modalSelectorStyles(fontFactor)}
                                        customSelector={
                                            <>
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
                                                        placeholder="Select Option"
                                                        placeholderTextColor="#1CB8F3"
                                                        pointerEvents="none"
                                                        editable={false}
                                                    />
                                                </TouchableOpacity>
                                                <Text
                                                    style={[
                                                        styles.redText,
                                                        styles.karla400Font,
                                                        styles2.subParagraph,
                                                        {
                                                            marginTop:
                                                                wp(0.88) *
                                                                fontFactor,
                                                            opacity: error
                                                                ? 1
                                                                : 0,
                                                        },
                                                    ]}
                                                >
                                                    Please choose an option
                                                </Text>
                                            </>
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
                                    scrollToItemBottom={scrollToItemBottom}
                                    contactFormRef={contactFormRef}
                                    scrollRef={scrollRef}
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
                                    scrollToItemBottom={scrollToItemBottom}
                                    contactFormRef={contactFormRef}
                                    scrollRef={scrollRef}
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
                                    scrollToItemBottom={scrollToItemBottom}
                                    contactFormRef={contactFormRef}
                                    scrollRef={scrollRef}
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
                                        {...modalSelectorStyles(fontFactor)}
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
                                            scrollToItemBottom={
                                                scrollToItemBottom
                                            }
                                            contactFormRef={contactFormRef}
                                            scrollRef={scrollRef}
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
                                            scrollToItemBottom={
                                                scrollToItemBottom
                                            }
                                            contactFormRef={contactFormRef}
                                            scrollRef={scrollRef}
                                        />
                                    )}
                                />

                                <MarginVertical />
                            </View>
                        )}
                    </View>

                    {hireUs ? (
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
                                        scrollToItemBottom={scrollToItemBottom}
                                        contactFormRef={contactFormRef}
                                        scrollRef={scrollRef}
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
                                            scrollToItemBottom={
                                                scrollToItemBottom
                                            }
                                            contactFormRef={contactFormRef}
                                            scrollRef={scrollRef}
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
                                        megaSize
                                        label={'Project Details'}
                                        contactFormRef={contactFormRef}
                                        required
                                        scrollRef={scrollRef}
                                        contactOption={contactOption}
                                        scrollToItemBottom={scrollToItemBottom}
                                    />
                                )}
                            />
                            <MarginVertical />
                        </View>
                    ) : null}
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
                                        scrollToItemBottom={scrollToItemBottom}
                                        contactFormRef={contactFormRef}
                                        scrollRef={scrollRef}
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
                                        required
                                        megaSize
                                        contactFormRef={contactFormRef}
                                        scrollRef={scrollRef}
                                        contactOption={contactOption}
                                        scrollToItemBottom={scrollToItemBottom}
                                    />
                                )}
                            />
                            <MarginVertical />
                        </View>
                    )}
                    <View>
                        {disableSubmit ? (
                            <Text
                                style={[
                                    styles2.subParagraph,
                                    styles.redText,
                                    styles.poppins500Font,
                                ]}
                            >
                                Check form fields
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

                        <TouchableWithoutFeedback
                            onPressIn={onPressInButton}
                            onPressOut={onPressOutButton}
                            onPress={handleSubmit(
                                () => {
                                    console.log('submitted successfully');
                                    toggleContactModal();
                                },
                                () => console.log('failed')
                            )}
                            disabled={disableSubmit}
                        >
                            <Animated.View
                                style={[
                                    styles.button,
                                    styles2.button,
                                    animatedSubmitStyle,
                                ]}
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
                            </Animated.View>
                        </TouchableWithoutFeedback>

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
    margin: PropTypes.number,
    toggleContactModal: PropTypes.func,
};

const mapStateToProps = ({ settingsState: { fontFactor, margin } }) => ({
    fontFactor,
    margin,
});

export default connect(mapStateToProps, { toggleContactModal })(ContactForm);

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
