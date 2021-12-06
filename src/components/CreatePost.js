import React, { useRef, useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    KeyboardAvoidingView,
    Animated,
    TextInput,
    Keyboard,
    Pressable,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ModalCloseIcon from './ModalCloseIcon';
import MarginVertical from './MarginVertical';
import { useForm, Controller } from 'react-hook-form';
import ModalSelector from 'react-native-modal-selector';
import Modal from 'react-native-modal';
import KeyboardViewContainer from './KeyboardViewContainer';

const CreatePost = ({
    visible,
    headerSize,
    margin,
    newPost,
    title,
    body,
    category,
    fontFactor,
    toggleModal,
}) => {
    const { statusBarHeight } = Constants;
    const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
    const AnimatedTouchableOpacity =
        Animated.createAnimatedComponent(TouchableOpacity);
    const postTitleAnimatedValue = useRef(new Animated.Value(0)).current;
    const postTitleBorder = postTitleAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['#808080', '#1A91D7'],
    });
    const postCategoryAnimatedValue = useRef(new Animated.Value(0)).current;
    const postCategoryBorder = postCategoryAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['#808080', '#1A91D7'],
    });
    const postBodyAnimatedValue = useRef(new Animated.Value(0)).current;
    const postBodyBorder = postBodyAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['#808080', '#1A91D7'],
    });
    const createPostButtonAnimatedValue = useRef(new Animated.Value(1)).current;
    const cancelButtonAnimatedValue = useRef(new Animated.Value(1)).current;
    const onFocusInput = (animatedValue) => {
        return animatedValue.setValue(1);
    };
    const onBlurInput = (animatedValue) => {
        return animatedValue.setValue(0);
    };
    const onPressInButton = (animatedValue) => {
        return Animated.timing(animatedValue, {
            toValue: 0.8,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };
    const onPressOutButton = (animatedValue) => {
        return Animated.timing(animatedValue, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };
    let index = 0;
    const postCategoryData = [
        { key: index++, section: true, label: 'Categories' },
        { key: index++, label: 'Computer Maintenance' },
        { key: index++, label: 'Audit' },
        { key: index++, label: 'Accounting' },
        { key: index++, label: 'Networking' },
    ];
    const defaultValues = {
        postTitle: newPost ? '' : title,
        postBody: newPost ? '' : body,
        postCategory: newPost ? '' : category,
    };
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        defaultValues,
    });
    const onCancel = () => {
        toggleModal();
        reset({ postTitle: '', postBody: '', postCategory: '' });
    };
    const scrollViewRef = useRef(null);
    const modalSelectorRef = useRef(null);
    const [multiLineInputPosition, setMultiLineInputPosition] = useState(null);
    const [disableModalPressables, setDisableModalPressables] = useState(true);
    const onSubmitSuccessful = (data) => {
        console.log(data);
    };
    const onSubmitFailed = (errors) => {
        console.log(errors);
    };

    return (
        <Modal
            onModalWillShow={() => setDisableModalPressables(false)}
            onModalWillHide={() => setDisableModalPressables(true)}
            propagateSwipe
            isVisible={visible}
            onBackButtonPress={toggleModal}
            // swipeDirection="down"
            // onSwipeComplete={toggleModal}
            animationType="slide"
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
            style={{
                margin: headerSize / 3,
                marginTop: Platform.select({
                    ios: statusBarHeight + headerSize / 3,
                    android: headerSize / 3,
                }),
            }}
        >
            <Pressable
                onPress={Keyboard.dismiss}
                style={{
                    flex: 1,
                    backgroundColor: '#f7f7f7',
                    paddingHorizontal: margin,
                    paddingTop: headerSize,
                }}
            >
                <View style={{ position: 'absolute', right: 0, top: 0 }}>
                    <ModalCloseIcon
                        closeModal={onCancel}
                        iconHeight={headerSize}
                        iconWidth={headerSize}
                        color="#000000"
                    />
                </View>
                <KeyboardViewContainer>
                    <KeyboardAvoidingView
                        behavior={Platform.select({
                            ios: 'padding',
                            android: undefined,
                        })}
                        keyboardVerticalOffset={Platform.select({
                            ios: statusBarHeight + headerSize + headerSize / 3,
                            android: 0,
                        })}
                        style={{ flex: 1 }}
                    >
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                            }}
                        >
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                // keyboardDismissMode={'on-drag'}
                                keyboardDismissMode={Platform.select({
                                    ios: 'interactive',
                                    android: 'on-drag',
                                })}
                                ref={scrollViewRef}
                                bounces={false}
                                contentContainerStyle={{
                                    alignItems: 'center',
                                    flexGrow: 1,
                                    justifyContent: 'center',
                                }}
                            >
                                <Pressable
                                    onPress={Keyboard.dismiss}
                                    style={{
                                        width: `${fontFactor * 100}%`,
                                    }}
                                >
                                    <View style={{ marginBottom: headerSize }}>
                                        <Text
                                            style={{
                                                fontFamily: 'Poppins_500Medium',
                                                fontSize: fontFactor * wp(6),
                                                lineHeight:
                                                    fontFactor * wp(7.7),
                                                color: '#000000',
                                            }}
                                        >
                                            {newPost
                                                ? 'New Post'
                                                : 'Update Post'}
                                        </Text>
                                        <MarginVertical size={2} />
                                        <Controller
                                            control={control}
                                            rules={{
                                                required: true,
                                            }}
                                            render={({
                                                field: {
                                                    onChange,
                                                    onBlur,
                                                    value,
                                                },
                                            }) => (
                                                <View>
                                                    <AnimatedTextInput
                                                        placeholder="Post Title"
                                                        placeholderTextColor="#808080"
                                                        autoCapitalize="sentences"
                                                        onBlur={() => {
                                                            onBlurInput(
                                                                postTitleAnimatedValue
                                                            );
                                                            onBlur();
                                                        }}
                                                        onFocus={(e) => {
                                                            e.preventDefault();
                                                            onFocusInput(
                                                                postTitleAnimatedValue
                                                            );
                                                        }}
                                                        onChangeText={onChange}
                                                        value={value}
                                                        style={{
                                                            borderWidth:
                                                                wp(0.5),
                                                            borderColor:
                                                                postTitleBorder,
                                                            padding: wp(4),
                                                            fontSize:
                                                                fontFactor *
                                                                wp(4.5),
                                                            lineHeight:
                                                                fontFactor *
                                                                wp(5.72),
                                                            fontFamily:
                                                                'Poppins_400Regular',
                                                            color: '#000000',
                                                        }}
                                                        editable={
                                                            !disableModalPressables
                                                        }
                                                    />
                                                    <MarginVertical
                                                        size={0.3}
                                                    />

                                                    <Text
                                                        style={{
                                                            opacity:
                                                                errors.postTitle
                                                                    ? 1
                                                                    : 0,
                                                            fontSize:
                                                                fontFactor *
                                                                wp(4),
                                                            lineHeight:
                                                                fontFactor *
                                                                wp(5.08),
                                                            fontFamily:
                                                                'Karla_400Regular',
                                                            color: 'red',
                                                        }}
                                                    >
                                                        This is required
                                                    </Text>
                                                    <MarginVertical
                                                        size={0.3}
                                                    />
                                                </View>
                                            )}
                                            name="postTitle"
                                        />
                                        {/* <MarginVertical size={1.5} /> */}
                                        <Controller
                                            control={control}
                                            name="postCategory"
                                            rules={{ required: true }}
                                            render={({
                                                field: {
                                                    onChange,
                                                    onBlur,
                                                    value,
                                                    ref,
                                                },
                                            }) => (
                                                <View>
                                                    <ModalSelector
                                                        customSelector={
                                                            <Pressable
                                                                onPress={() => {
                                                                    modalSelectorRef.current.open();
                                                                }}
                                                                onPressIn={() => {
                                                                    onFocusInput(
                                                                        postCategoryAnimatedValue
                                                                    );
                                                                }}
                                                                onPressOut={() =>
                                                                    onBlurInput(
                                                                        postCategoryAnimatedValue
                                                                    )
                                                                }
                                                                disabled={
                                                                    disableModalPressables
                                                                }
                                                            >
                                                                <AnimatedTextInput
                                                                    pointerEvents={
                                                                        'none'
                                                                    }
                                                                    editable={
                                                                        false
                                                                    }
                                                                    t
                                                                    placeholder="Select Category!"
                                                                    placeholderTextColor="#808080"
                                                                    value={
                                                                        value
                                                                    }
                                                                    style={{
                                                                        borderWidth:
                                                                            wp(
                                                                                0.5
                                                                            ),
                                                                        borderColor:
                                                                            postCategoryBorder,
                                                                        padding:
                                                                            wp(
                                                                                3
                                                                            ),
                                                                        fontSize:
                                                                            fontFactor *
                                                                            wp(
                                                                                4.5
                                                                            ),
                                                                        lineHeight:
                                                                            fontFactor *
                                                                            wp(
                                                                                5.72
                                                                            ),
                                                                        fontFamily:
                                                                            'Poppins_400Regular',
                                                                        color: 'black',
                                                                    }}
                                                                />
                                                            </Pressable>
                                                        }
                                                        ref={(reference) => {
                                                            modalSelectorRef.current =
                                                                reference;
                                                            ref(reference);
                                                        }}
                                                        data={postCategoryData}
                                                        supportedOrientations={[
                                                            'portrait',
                                                        ]}
                                                        accessible={true}
                                                        onChange={({ label }) =>
                                                            onChange(label)
                                                        }
                                                        touchableActiveOpacity={
                                                            0.6
                                                        }
                                                        onModalOpen={() =>
                                                            onFocusInput(
                                                                postCategoryAnimatedValue
                                                            )
                                                        }
                                                        onModalClose={() => {
                                                            onBlurInput(
                                                                postCategoryAnimatedValue
                                                            );
                                                            onBlur();
                                                        }}
                                                        overlayStyle={{
                                                            backgroundColor:
                                                                'rgba(0,0,0,0.9)',
                                                            marginTop:
                                                                Platform.select(
                                                                    {
                                                                        ios: statusBarHeight,
                                                                        android: 0,
                                                                    }
                                                                ),
                                                        }}
                                                        sectionTextStyle={{
                                                            fontSize:
                                                                fontFactor *
                                                                wp(4.5),
                                                            lineHeight:
                                                                fontFactor *
                                                                wp(5.72),
                                                            fontFamily:
                                                                'Karla_500Medium',
                                                        }}
                                                        optionTextStyle={{
                                                            color: 'black',
                                                            fontSize:
                                                                fontFactor *
                                                                wp(4.5),
                                                            lineHeight:
                                                                fontFactor *
                                                                wp(5.72),
                                                            fontFamily:
                                                                'Karla_400Regular',
                                                        }}
                                                        cancelTextStyle={{
                                                            color: 'red',
                                                            fontSize:
                                                                fontFactor *
                                                                wp(4.5),
                                                            lineHeight:
                                                                fontFactor *
                                                                wp(5.72),
                                                            fontFamily:
                                                                'Karla_500Medium',
                                                        }}
                                                        backdropPressToClose={
                                                            true
                                                        }
                                                    />
                                                    <MarginVertical
                                                        size={0.3}
                                                    />

                                                    <Text
                                                        style={{
                                                            opacity:
                                                                errors.postCategory
                                                                    ? 1
                                                                    : 0,
                                                            fontSize:
                                                                fontFactor *
                                                                wp(4),
                                                            lineHeight:
                                                                fontFactor *
                                                                wp(5.08),
                                                            fontFamily:
                                                                'Karla_400Regular',
                                                            color: 'red',
                                                        }}
                                                    >
                                                        This is required.
                                                    </Text>
                                                    <MarginVertical
                                                        size={0.3}
                                                    />
                                                </View>
                                            )}
                                        />

                                        {/* <MarginVertical size={1.5} /> */}

                                        <Controller
                                            control={control}
                                            rules={{
                                                required: true,
                                            }}
                                            render={({
                                                field: {
                                                    onChange,
                                                    onBlur,
                                                    value,
                                                },
                                            }) => (
                                                <View
                                                    onLayout={(e) => {
                                                        if (e) {
                                                            const {
                                                                nativeEvent: {
                                                                    layout: {
                                                                        x,
                                                                        y,
                                                                        height,
                                                                    },
                                                                },
                                                            } = e;
                                                            setMultiLineInputPosition(
                                                                {
                                                                    x,
                                                                    y,
                                                                    height,
                                                                }
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <AnimatedTextInput
                                                        multiline
                                                        placeholder="Post Body"
                                                        placeholderTextColor="#808080"
                                                        autoCapitalize="sentences"
                                                        onBlur={() => {
                                                            if (
                                                                Platform.OS ===
                                                                'ios'
                                                            ) {
                                                                Keyboard.removeAllListeners(
                                                                    'keyboardDidShow'
                                                                );
                                                            }
                                                            onBlurInput(
                                                                postBodyAnimatedValue
                                                            );
                                                            onBlur();
                                                        }}
                                                        onFocus={() => {
                                                            onFocusInput(
                                                                postBodyAnimatedValue
                                                            );
                                                            //Implement for IOS alone
                                                            if (
                                                                Platform.OS ===
                                                                'ios'
                                                            ) {
                                                                Keyboard.addListener(
                                                                    'keyboardDidShow',
                                                                    () =>
                                                                        scrollViewRef.current.scrollTo(
                                                                            {
                                                                                ...multiLineInputPosition,
                                                                                y: multiLineInputPosition.height,
                                                                                animated: true,
                                                                            }
                                                                        )
                                                                );
                                                            }

                                                            onFocusInput(
                                                                postBodyAnimatedValue
                                                            );
                                                        }}
                                                        onChangeText={onChange}
                                                        value={value}
                                                        style={{
                                                            borderWidth:
                                                                wp(0.5),
                                                            borderColor:
                                                                postBodyBorder,
                                                            padding: wp(4),
                                                            fontSize:
                                                                fontFactor *
                                                                wp(4.5),
                                                            lineHeight:
                                                                fontFactor *
                                                                wp(5.72),
                                                            fontFamily:
                                                                'Poppins_400Regular',
                                                            color: '#000000',
                                                            textAlignVertical:
                                                                'top',
                                                            height: wp(25.16),
                                                        }}
                                                        editable={
                                                            !disableModalPressables
                                                        }
                                                    />
                                                    <MarginVertical
                                                        size={0.3}
                                                    />

                                                    <Text
                                                        style={{
                                                            opacity:
                                                                errors.postBody
                                                                    ? 1
                                                                    : 0,
                                                            fontSize:
                                                                fontFactor *
                                                                wp(4),
                                                            lineHeight:
                                                                fontFactor *
                                                                wp(5.08),
                                                            fontFamily:
                                                                'Karla_400Regular',
                                                            color: 'red',
                                                        }}
                                                    >
                                                        This is required
                                                    </Text>
                                                    <MarginVertical
                                                        size={0.3}
                                                    />
                                                </View>
                                            )}
                                            name="postBody"
                                        />
                                        {/* <MarginVertical size={1.5} /> */}
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <AnimatedTouchableOpacity
                                                activeOpacity={1}
                                                disabled={
                                                    disableModalPressables ||
                                                    !!Object.keys(errors).length
                                                }
                                                onPressIn={() => {
                                                    console.log('works');
                                                    onPressInButton(
                                                        createPostButtonAnimatedValue
                                                    );
                                                }}
                                                onPressOut={() =>
                                                    onPressOutButton(
                                                        createPostButtonAnimatedValue
                                                    )
                                                }
                                                onPress={handleSubmit(
                                                    onSubmitSuccessful,
                                                    onSubmitFailed
                                                )}
                                                style={{
                                                    backgroundColor: '#1A91D7',
                                                    padding:
                                                        fontFactor * wp(4.55),
                                                    // width: wp(40),
                                                    alignItems: 'center',
                                                    borderColor: '#1A91D7',
                                                    borderWidth: wp(0.25),
                                                    transform: [
                                                        {
                                                            scale: createPostButtonAnimatedValue,
                                                        },
                                                    ],
                                                    flex: 4,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: 'white',
                                                        fontFamily:
                                                            'Poppins_600SemiBold',
                                                        fontSize:
                                                            fontFactor *
                                                            wp(4.55),
                                                        lineHeight:
                                                            fontFactor *
                                                            wp(5.78),
                                                    }}
                                                >
                                                    {newPost
                                                        ? 'Create Post'
                                                        : 'Update Post'}
                                                </Text>
                                            </AnimatedTouchableOpacity>
                                            <View style={{ flex: 1 }}></View>
                                            <AnimatedTouchableOpacity
                                                activeOpacity={1}
                                                onPressIn={() =>
                                                    onPressInButton(
                                                        cancelButtonAnimatedValue
                                                    )
                                                }
                                                onPressOut={() =>
                                                    onPressOutButton(
                                                        cancelButtonAnimatedValue
                                                    )
                                                }
                                                onPress={onCancel}
                                                style={{
                                                    backgroundColor: '#ffffff',
                                                    padding:
                                                        fontFactor * wp(4.55),
                                                    flex: 4,
                                                    // width: wp(40),
                                                    alignItems: 'center',
                                                    borderColor: '#1A91D7',
                                                    borderWidth: wp(0.25),
                                                    transform: [
                                                        {
                                                            scale: cancelButtonAnimatedValue,
                                                        },
                                                    ],
                                                }}
                                                disabled={
                                                    disableModalPressables
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        color: '#1A91D7',
                                                        fontFamily:
                                                            'Poppins_600SemiBold',
                                                        fontSize:
                                                            fontFactor *
                                                            wp(4.55),
                                                        lineHeight:
                                                            fontFactor *
                                                            wp(5.78),
                                                    }}
                                                >
                                                    Cancel
                                                </Text>
                                            </AnimatedTouchableOpacity>
                                        </View>
                                    </View>
                                </Pressable>
                            </ScrollView>
                        </View>
                    </KeyboardAvoidingView>
                </KeyboardViewContainer>
            </Pressable>
        </Modal>
    );
};

export default CreatePost;

const styles = StyleSheet.create({});
