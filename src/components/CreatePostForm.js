import React, { useRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    Animated,
    TextInput,
    Keyboard,
    Pressable,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Animated2, {
    useSharedValue,
    useAnimatedProps,
} from 'react-native-reanimated';
import Constants from 'expo-constants';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MarginVertical from './MarginVertical';
import { useForm, Controller } from 'react-hook-form';
import ModalSelector from 'react-native-modal-selector';
import multilineKeyboardAvoidingFn from '../helperFunctions/multilineKeyboardAvoidingFn';
import { modalSelectorStyles } from '../constants';

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
    const { statusBarHeight } = Constants;
    const AnimatedTextInput = Animated2.createAnimatedComponent(TextInput);
    const AnimatedTouchableOpacity =
        Animated.createAnimatedComponent(TouchableOpacity);
    let index = 0;
    const postCategoryData = [
        { key: index++, section: true, label: 'Categories' },
        { key: index++, label: 'Computer Maintenance' },
        { key: index++, label: 'Audit' },
        { key: index++, label: 'Accounting' },
        { key: index++, label: 'Networking' },
    ];
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful, isDirty },
    } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        defaultValues: {
            title: '',
            body: '',
            category: '',
        },
    });
    const modalSelectorRef = useRef(null);
    const multilineInputRef = useRef(null);
    const onSubmitFailed = (errors) => {
        console.log(errors);
    };

    const windowHeight = Dimensions.get('window').height;
    const modalHeight = Platform.select({
        ios: windowHeight - statusBarHeight - (headerSize / 3) * 2,
        android: windowHeight - (headerSize / 3) * 2,
    });

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    useEffect(() => {
        if (!modalVisible && isDirty) {
            reset();
        }
    }, [modalVisible, reset, isDirty]);

    console.log(Animated2.createAnimatedComponent(TextInput));

    return (
        <View
            style={{ marginBottom: headerSize }} //counter balances height of closeModalIcon offset
        >
            <Text
                style={{
                    fontFamily: 'Poppins_500Medium',
                    fontSize: fontFactor * wp(6),
                    lineHeight: fontFactor * wp(7.7),
                    color: '#000000',
                }}
            >
                New Post
            </Text>
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
                        <AnimatedTextInput
                            placeholder="Post Title"
                            placeholderTextColor="#808080"
                            autoCapitalize="sentences"
                            onChangeText={onChange}
                            value={value}
                            style={{
                                padding: wp(4),
                                fontSize: fontFactor * wp(4.5),
                                lineHeight: fontFactor * wp(5.72),
                                fontFamily: 'Poppins_400Regular',
                                color: '#000000',
                                borderWidth: wp(0.5),
                            }}
                            editable={!disableModalPressables}
                            // onFocus={(e) => console.log(e.nativeEvent)}
                            onBlur={(e) => {
                                onBlur();
                                console.log(e.nativeEvent);
                            }}
                        />

                        <MarginVertical size={0.3} />

                        <Text
                            style={{
                                opacity: error ? 1 : 0,
                                fontSize: fontFactor * wp(4),
                                lineHeight: fontFactor * wp(5.08),
                                fontFamily: 'Karla_400Regular',
                                color: 'red',
                            }}
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
                                <Pressable
                                    onPress={() => {
                                        modalSelectorRef.current.open();
                                    }}
                                    disabled={disableModalPressables}
                                >
                                    <AnimatedTextInput
                                        pointerEvents={'none'}
                                        editable={false}
                                        t
                                        placeholder="Select Category!"
                                        placeholderTextColor="#808080"
                                        value={value}
                                        style={{
                                            borderWidth: wp(0.5),
                                            padding: wp(3),
                                            fontSize: fontFactor * wp(4.5),
                                            lineHeight: fontFactor * wp(5.72),
                                            fontFamily: 'Poppins_400Regular',
                                            color: 'black',
                                        }}
                                    />
                                </Pressable>
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
                                onBlur();
                            }}
                            touchableActiveOpacity={0.6}
                            overlayStyle={{
                                backgroundColor: 'rgba(0,0,0,0.9)',
                                marginTop: Platform.select({
                                    ios: statusBarHeight,
                                    android: 0,
                                }),
                            }}
                            backdropPressToClose={true}
                            {...modalSelectorStyles(fontFactor)}
                        />
                        <MarginVertical size={0.3} />

                        <Text
                            style={{
                                opacity: error ? 1 : 0,
                                fontSize: fontFactor * wp(4),
                                lineHeight: fontFactor * wp(5.08),
                                fontFamily: 'Karla_400Regular',
                                color: 'red',
                            }}
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
                        <AnimatedTextInput //still need to implement multiline keyboardAvoiding behavior
                            ref={multilineInputRef}
                            onFocus={() =>
                                multilineKeyboardAvoidingFn(
                                    true,
                                    multilineInputRef,
                                    containerRef,
                                    scrollViewRef,
                                    modalHeight
                                )
                            }
                            multiline
                            placeholder="Post Body"
                            placeholderTextColor="#808080"
                            autoCapitalize="sentences"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            style={{
                                padding: wp(4),
                                fontSize: fontFactor * wp(4.5),
                                lineHeight: fontFactor * wp(5.72),
                                fontFamily: 'Poppins_400Regular',
                                color: '#000000',
                                textAlignVertical: 'top',
                                height: wp(25.16),
                                borderWidth: wp(0.5),
                            }}
                            editable={!disableModalPressables}
                        />
                        <MarginVertical size={0.3} />

                        <Text
                            style={{
                                opacity: error ? 1 : 0,
                                fontSize: fontFactor * wp(4),
                                lineHeight: fontFactor * wp(5.08),
                                fontFamily: 'Karla_400Regular',
                                color: 'red',
                            }}
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
                <AnimatedTouchableOpacity
                    activeOpacity={1}
                    disabled={
                        disableModalPressables || !!Object.keys(errors).length
                    }
                    onPress={handleSubmit((data) => {
                        Keyboard.dismiss();
                        toggleModal();
                        onSubmitSuccessful(data);
                    }, onSubmitFailed)}
                    style={{
                        backgroundColor: '#1A91D7',
                        padding: fontFactor * wp(4.55),
                        alignItems: 'center',
                        borderColor: '#1A91D7',
                        borderWidth: wp(0.25),
                        flex: 4,
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontFamily: 'Poppins_600SemiBold',
                            fontSize: fontFactor * wp(4.55),
                            lineHeight: fontFactor * wp(5.78),
                        }}
                    >
                        Create Post
                    </Text>
                </AnimatedTouchableOpacity>
                <View style={{ flex: 1 }}></View>
                <AnimatedTouchableOpacity
                    activeOpacity={1}
                    onPress={onCancel}
                    style={{
                        backgroundColor: '#ffffff',
                        padding: fontFactor * wp(4.55),
                        flex: 4,
                        alignItems: 'center',
                        borderColor: '#1A91D7',
                        borderWidth: wp(0.25),
                    }}
                    disabled={disableModalPressables}
                >
                    <Text
                        style={{
                            color: '#1A91D7',
                            fontFamily: 'Poppins_600SemiBold',
                            fontSize: fontFactor * wp(4.55),
                            lineHeight: fontFactor * wp(5.78),
                        }}
                    >
                        Cancel
                    </Text>
                </AnimatedTouchableOpacity>
            </View>
        </View>
    );
}
