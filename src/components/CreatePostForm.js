import React, { useRef, useEffect, useCallback } from 'react';
import {
    Text,
    View,
    Platform,
    TextInput,
    Keyboard,
    Dimensions,
    TouchableWithoutFeedback,
    StyleSheet,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolateColor,
} from 'react-native-reanimated';
import Constants from 'expo-constants';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MarginVertical from './MarginVertical';
import { useForm, Controller } from 'react-hook-form';
import ModalSelector from 'react-native-modal-selector';
import multilineKeyboardAvoidingFn from '../helperFunctions/multilineKeyboardAvoidingFn';
import { modalSelectorStyles } from '../constants';
import PropTypes from 'prop-types';

export default function CreatePostForm({
    fontFactor,
    onSubmitSuccessful,
    toggleModal,
    headerSize,
    disableModalPressables,
    onCancel,
    modalVisible,
    containerRef,
    scrollViewRef,
}) {
    const AnimatedTouchableWithoutFeedback = Animated.createAnimatedComponent(
        TouchableWithoutFeedback
    );
    
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful, isDirty },
    } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange',
        defaultValues: {
            title: '',
            body: '',
            category: '',
        },
    });

    const modalSelectorRef = useRef(null);
    const multilineInputRef = useRef(null);
    
    const animatedTitle = useSharedValue(0);
    const animatedCategory = useSharedValue(0);
    const animatedBody = useSharedValue(0);
    const animatedCreatePostButton = useSharedValue(1);
    const animatedCloseModalButton = useSharedValue(1);

    const FOCUS = 'FOCUS';
    const BLUR = 'BLUR';
    const TITLE = 'TITLE';
    const CATEGORY = 'CATEGORY';
    const BODY = 'BODY';
    const SUBMIT = 'SUBMIT';
    const CLOSE = 'CLOSE';
    const PRESS_IN = 'PRESS_IN';
    const PRESS_OUT = 'PRESS_OUT';

    const toggleBorderColorOn = useCallback((animatedValue) => {
        'worklet';
        animatedValue.value = withTiming(1, { duration: 150 });
    }, []);
    const toggleBorderColorOff = useCallback((animatedValue) => {
        'worklet';
        animatedValue.value = withTiming(0, { duration: 150 });
    }, []);
    const toggleAnimatedInput = useCallback(
        (animatedInput, action) => {
            switch (action) {
                case FOCUS:
                    return toggleBorderColorOn(animatedInput);
                case BLUR:
                    return toggleBorderColorOff(animatedInput);
                default:
                    return;
            }
        },
        [toggleBorderColorOn, toggleBorderColorOff]
    );
    const generateAnimateToggler = useCallback(
        (action) => {
            switch (action.type) {
                case TITLE:
                    return toggleAnimatedInput(animatedTitle, action.payload);
                case CATEGORY:
                    return toggleAnimatedInput(
                        animatedCategory,
                        action.payload
                    );
                case BODY:
                    return toggleAnimatedInput(animatedBody, action.payload);
                default:
                    return;
            }
        },
        [animatedTitle, animatedCategory, animatedBody, toggleAnimatedInput]
    );
    const onPressButtonIn = useCallback((animatedValue) => {
        'worklet';
        animatedValue.value = withTiming(0.9, { duration: 150 });
    }, []);
    const onPressButtonOut = useCallback((animatedValue) => {
        'worklet';
        animatedValue.value = withTiming(1, { duration: 150 });
    }, []);
    const animatedButtonToggler = useCallback(
        (animatedValue, action) => {
            switch (action) {
                case PRESS_IN:
                    return onPressButtonIn(animatedValue);
                case PRESS_OUT:
                    return onPressButtonOut(animatedValue);
                default:
                    return;
            }
        },
        [onPressButtonIn, onPressButtonOut]
    );
    const generateAnimatedButtonToggler = useCallback(
        (action) => {
            switch (action.type) {
                case SUBMIT:
                    return animatedButtonToggler(
                        animatedCreatePostButton,
                        action.payload
                    );
                case CLOSE:
                    return animatedButtonToggler(
                        animatedCloseModalButton,
                        action.payload
                    );
                default:
                    return;
            }
        },
        [
            animatedCreatePostButton,
            animatedCloseModalButton,
            animatedButtonToggler,
        ]
    );

    const animatedTitleStyle = useAnimatedStyle(() => ({
        borderColor: interpolateColor(
            animatedTitle.value,
            [0, 1],
            ['#000', '#1A91D7']
        ),
    }));
    const animatedCategoryStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            animatedCategory.value,
            [0, 1],
            ['#fff', '#ccc']
        ),
    }));
    const animatedBodyStyle = useAnimatedStyle(() => ({
        borderColor: interpolateColor(
            animatedBody.value,
            [0, 1],
            ['#000', '#1A91D7']
        ),
    }));
    const animatedCreatePostButtonStyle = useAnimatedStyle(() => ({
        transform: [{ scale: animatedCreatePostButton.value }],
    }));
    const animatedCloseModalButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: animatedCloseModalButton.value }],
        };
    });

    const { statusBarHeight } = Constants;
    const windowHeight = Dimensions.get('window').height;
    const modalHeight = Platform.select({
        ios: windowHeight - statusBarHeight - (headerSize / 3) * 2,
        android: windowHeight - (headerSize / 3) * 2,
    });
    let index = 0;
    const postCategoryData = [
        { key: index++, section: true, label: 'Categories' },
        { key: index++, label: 'Computer Maintenance' },
        { key: index++, label: 'Audit' },
        { key: index++, label: 'Accounting' },
        { key: index++, label: 'Networking' },
    ];
    const disableCreatePost = !!Object.keys(errors).length;
    const onSubmitFailed = (errors) => {
        Keyboard.dismiss();
        console.log(errors);
    };
    const onSubmit =handleSubmit((data) => {
        Keyboard.dismiss();
        toggleModal();
        onSubmitSuccessful(data);
    }, onSubmitFailed)

    const styles2 = StyleSheet.create({
        buttonText: {
            fontSize: fontFactor * wp(4.55),
            lineHeight: fontFactor * wp(5.78),
        },
        buttonContainer: {
            borderWidth: wp(0.25),
            paddingVertical: fontFactor * wp(4.55),
        },
        disableCreatePostButtonText: {
            opacity: disableCreatePost ? 0.7 : 1,
        },
        errorText: (error) => ({
            opacity: error ? 1 : 0,
            fontSize: fontFactor * wp(4),
            lineHeight: fontFactor * wp(5.08),
        }),
        multilineInput: {
            padding: wp(4),
            fontSize: fontFactor * wp(4.5),
            lineHeight: fontFactor * wp(5.72),
            height: wp(25.16),
        },
        inputContainer: {
            borderWidth: wp(0.5),
        },
        singleLineInput: {
            padding: wp(4),
            fontSize: fontFactor * wp(4.5),
            lineHeight: fontFactor * wp(5.72),
        },
        header: {
            fontSize: fontFactor * wp(6),
            lineHeight: fontFactor * wp(7.7),
        },
        container: {
            marginBottom: headerSize, //counter balances height of closeModalIcon offset
        },
    });

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

    useEffect(() => {
        if (!modalVisible && isDirty) {
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
    }, [modalVisible, reset, isDirty]);

    return (
        <View style={styles2.container}>
            <Text style={[styles2.header, styles.header]}>New Post</Text>
            <MarginVertical size={2} />
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                }) => (
                    <View>
                        <Animated.View
                            style={[styles2.inputContainer, animatedTitleStyle]}
                        >
                            <TextInput
                                placeholder="Post Title"
                                placeholderTextColor="#808080"
                                autoCapitalize="sentences"
                                onChangeText={onChange}
                                value={value}
                                style={[
                                    styles2.singleLineInput,
                                    styles.singleLineInput,
                                ]}
                                editable={!disableModalPressables}
                                onFocus={() =>
                                    generateAnimateToggler({
                                        type: TITLE,
                                        payload: FOCUS,
                                    })
                                }
                                onBlur={() => {
                                    generateAnimateToggler({
                                        type: TITLE,
                                        payload: BLUR,
                                    });
                                    onBlur();
                                }}
                            />
                        </Animated.View>

                        <MarginVertical size={0.3} />

                        <Text
                            style={[styles2.errorText(error), styles.errorText]}
                        >
                            This is required
                        </Text>
                        <MarginVertical size={0.3} />
                    </View>
                )}
                name="title"
            />
            <Controller
                control={control}
                name="category"
                rules={{ required: true }}
                render={({
                    field: { onChange, onBlur, value, ref },
                    fieldState: { error },
                }) => (
                    <View>
                        <ModalSelector
                            customSelector={
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        modalSelectorRef.current.open();
                                    }}
                                    disabled={disableModalPressables}
                                    onPressIn={() =>
                                        generateAnimateToggler({
                                            type: CATEGORY,
                                            payload: FOCUS,
                                        })
                                    }
                                    onPressOut={() =>
                                        generateAnimateToggler({
                                            type: CATEGORY,
                                            payload: BLUR,
                                        })
                                    }
                                >
                                    <Animated.View
                                        style={[
                                            styles2.inputContainer,
                                            animatedCategoryStyle,
                                        ]}
                                    >
                                        <TextInput
                                            pointerEvents={'none'}
                                            editable={false}
                                            t
                                            placeholder="Select Category!"
                                            placeholderTextColor="#808080"
                                            value={value}
                                            style={[
                                                styles2.singleLineInput,
                                                styles.singleLineInput,
                                            ]}
                                        />
                                    </Animated.View>
                                </TouchableWithoutFeedback>
                            }
                            ref={(reference) => {
                                modalSelectorRef.current = reference;
                                ref(reference);
                            }}
                            data={postCategoryData}
                            supportedOrientations={['portrait']}
                            accessible={true}
                            onChange={({ label }) => {
                                onChange(label);
                            }}
                            onModalClose={onBlur}
                            backdropPressToClose={true}
                            {...modalSelectorStyles(fontFactor)}
                        />
                        <MarginVertical size={0.3} />

                        <Text
                            style={[styles2.errorText(error), styles.errorText]}
                        >
                            This is required.
                        </Text>
                        <MarginVertical size={0.3} />
                    </View>
                )}
            />
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                }) => (
                    <View>
                        <Animated.View
                            style={[styles2.inputContainer, animatedBodyStyle]}
                        >
                            <TextInput
                                ref={multilineInputRef}
                                onFocus={() => {
                                    multilineKeyboardAvoidingFn(
                                        true,
                                        multilineInputRef,
                                        containerRef,
                                        scrollViewRef,
                                        modalHeight
                                    );
                                    generateAnimateToggler({
                                        type: BODY,
                                        payload: FOCUS,
                                    });
                                }}
                                multiline
                                placeholder="Post Body"
                                placeholderTextColor="#808080"
                                autoCapitalize="sentences"
                                onBlur={() => {
                                    generateAnimateToggler({
                                        type: BODY,
                                        payload: BLUR,
                                    });
                                    onBlur();
                                }}
                                onChangeText={onChange}
                                value={value}
                                style={[
                                    styles2.multilineInput,
                                    styles.multilineInput,
                                ]}
                                editable={!disableModalPressables}
                            />
                        </Animated.View>
                        <MarginVertical size={0.3} />

                        <Text
                            style={[styles2.errorText(error), styles.errorText]}
                        >
                            This is required
                        </Text>
                        <MarginVertical size={0.3} />
                    </View>
                )}
                name="body"
            />
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <AnimatedTouchableWithoutFeedback
                    disabled={disableModalPressables || disableCreatePost}
                    onPress={onSubmit}
                    onPressIn={() =>
                        generateAnimatedButtonToggler({
                            type: SUBMIT,
                            payload: PRESS_IN,
                        })
                    }
                    onPressOut={() =>
                        generateAnimatedButtonToggler({
                            type: SUBMIT,
                            payload: PRESS_OUT,
                        })
                    }
                >
                    <Animated.View
                        style={[
                            styles2.buttonContainer,
                            styles.createPostButtonContainer,
                            animatedCreatePostButtonStyle,
                        ]}
                    >
                        <Text
                            style={[
                                styles2.buttonText,
                                styles.createPostButtonText,
                                styles2.disableCreatePostButtonText,
                            ]}
                        >
                            Create Post
                        </Text>
                    </Animated.View>
                </AnimatedTouchableWithoutFeedback>
                <View style={{ flex: 1 }}></View>
                <AnimatedTouchableWithoutFeedback
                    onPress={onCancel}
                    onPressIn={() =>
                        generateAnimatedButtonToggler({
                            type: CLOSE,
                            payload: PRESS_IN,
                        })
                    }
                    onPressOut={() =>
                        generateAnimatedButtonToggler({
                            type: CLOSE,
                            payload: PRESS_OUT,
                        })
                    }
                    disabled={disableModalPressables}
                >
                    <Animated.View
                        style={[
                            styles2.buttonContainer,
                            animatedCloseModalButtonStyle,
                            styles.closeButtonContainer,
                        ]}
                    >
                        <Text
                            style={[styles.closeButtonText, styles2.buttonText]}
                        >
                            Close
                        </Text>
                    </Animated.View>
                </AnimatedTouchableWithoutFeedback>
            </View>
        </View>
    );
}

CreatePostForm.propTypes = {
    fontFactor: PropTypes.number,
    onSubmitSuccessful: PropTypes.func,
    toggleModal: PropTypes.func,
    headerSize: PropTypes.number,
    disableModalPressables: PropTypes.bool,
    onCancel: PropTypes.func,
    modalVisible: PropTypes.bool,
    containerRef: PropTypes.object,
    scrollViewRef: PropTypes.object,
};

const styles = StyleSheet.create({
    closeButtonText: {
        color: '#1A91D7',
        fontFamily: 'Poppins_500Medium',
    },
    closeButtonContainer: {
        backgroundColor: '#ffffff',
        flex: 4,
        alignItems: 'center',
        borderColor: '#1A91D7',
    },
    createPostButtonText: {
        color: 'white',
        fontFamily: 'Poppins_500Medium',
    },
    createPostButtonContainer: {
        backgroundColor: '#1A91D7',
        flex: 4,
        alignItems: 'center',
        borderColor: '#1A91D7',
    },
    errorText: {
        fontFamily: 'Karla_400Regular',
        color: 'red',
    },
    multilineInput: {
        fontFamily: 'Poppins_400Regular',
        color: '#000000',
        textAlignVertical: 'top',
    },
    singleLineInput: {
        fontFamily: 'Poppins_400Regular',
        color: 'black',
    },
    header: {
        fontFamily: 'Poppins_500Medium',
        color: '#000000',
    },
});
