import React, { useRef, useEffect, useCallback } from 'react';
import {
    Text,
    View,
    Platform,
    TextInput,
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
import scrollToComponentBottom from '../helperFunctions/scrollToComponentBottom';
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

    const toggleBorderColorOn = useCallback(
        (type) => {
            'worklet';
            switch (type) {
                case TITLE:
                    console.log('called');
                    animatedTitle.value = withTiming(1, {
                        duration: 150,
                    });
                    return;
                case BODY:
                    animatedBody.value = withTiming(1, {
                        duration: 150,
                    });
                    return;
                case CATEGORY:
                    animatedCategory.value = withTiming(1, {
                        duration: 150,
                    });
                    return;
                default:
                    return;
            }
        },
        [animatedTitle, animatedBody, animatedCategory]
    );
    const toggleBorderColorOff = useCallback(
        (type) => {
            'worklet';
            switch (type) {
                case TITLE:
                    animatedTitle.value = withTiming(0, {
                        duration: 150,
                    });
                    return;
                case BODY:
                    animatedBody.value = withTiming(0, {
                        duration: 150,
                    });
                    return;
                case CATEGORY:
                    animatedCategory.value = withTiming(0, {
                        duration: 150,
                    });
                    return;
                default:
                    return;
            }
        },
        [animatedTitle, animatedBody, animatedCategory]
    );
    const toggleAnimatedInput = useCallback(
        (action) => {
            switch (action.type) {
                case FOCUS:
                    return toggleBorderColorOn(action.payload);
                case BLUR:
                    return toggleBorderColorOff(action.payload);
                default:
                    return;
            }
        },
        [toggleBorderColorOn, toggleBorderColorOff]
    );
    const onPressButtonIn = useCallback(
        (type) => {
            'worklet';
            switch (type) {
                case CLOSE:
                    return (animatedCloseModalButton.value = withTiming(0.9, {
                        duration: 150,
                    }));
                case SUBMIT:
                    return (animatedCreatePostButton.value = withTiming(0.9, {
                        duration: 150,
                    }));
                default:
                    return;
            }
        },
        [animatedCloseModalButton, animatedCreatePostButton]
    );
    const onPressButtonOut = useCallback(
        (type) => {
            'worklet';
            switch (type) {
                case CLOSE:
                    return (animatedCloseModalButton.value = withTiming(1, {
                        duration: 150,
                    }));
                case SUBMIT:
                    return (animatedCreatePostButton.value = withTiming(1, {
                        duration: 150,
                    }));
                default:
                    return;
            }
        },
        [animatedCloseModalButton, animatedCreatePostButton]
    );
    const animatedButtonToggler = useCallback(
        (action) => {
            switch (action.type) {
                case PRESS_IN:
                    return onPressButtonIn(action.payload);
                case PRESS_OUT:
                    return onPressButtonOut(action.payload);
                default:
                    return;
            }
        },
        [onPressButtonIn, onPressButtonOut]
    );

    const animatedTitleStyle = useAnimatedStyle(() => {
        return {
            borderColor: interpolateColor(
                animatedTitle.value,
                [0, 1],
                ['#000', '#1A91D7']
            ),
        };
    });
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
        console.log(errors);
    };
    const onSubmit = handleSubmit((data) => {
        toggleModal();
        onSubmitSuccessful(data);
    }, onSubmitFailed);

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
                                    toggleAnimatedInput({
                                        type: FOCUS,
                                        payload: TITLE,
                                    })
                                }
                                onBlur={() => {
                                    toggleAnimatedInput({
                                        type: BLUR,
                                        payload: TITLE,
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
                                        toggleAnimatedInput({
                                            type: FOCUS,
                                            payload: CATEGORY,
                                        })
                                    }
                                    onPressOut={() =>
                                        toggleAnimatedInput({
                                            type: BLUR,
                                            payload: CATEGORY,
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
                                    scrollToComponentBottom(
                                        multilineInputRef,
                                        containerRef,
                                        scrollViewRef,
                                        modalHeight
                                    );
                                    toggleAnimatedInput({
                                        type: FOCUS,
                                        payload: BODY,
                                    });
                                }}
                                multiline
                                placeholder="Post Body"
                                placeholderTextColor="#808080"
                                autoCapitalize="sentences"
                                onBlur={() => {
                                    toggleAnimatedInput({
                                        type: BLUR,
                                        payload: BODY,
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
                        animatedButtonToggler({
                            type: PRESS_IN,
                            payload: SUBMIT,
                        })
                    }
                    onPressOut={() =>
                        animatedButtonToggler({
                            type: PRESS_OUT,
                            payload: SUBMIT,
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
                        animatedButtonToggler({
                            type: PRESS_IN,
                            payload: CLOSE,
                        })
                    }
                    onPressOut={() =>
                        animatedButtonToggler({
                            type: PRESS_OUT,
                            payload: CLOSE,
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
