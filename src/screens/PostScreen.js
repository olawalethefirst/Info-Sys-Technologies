import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    Animated,
    ImageBackground,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Pressable,
    Keyboard,
    TouchableWithoutFeedback,
    View,
    ScrollView,
    TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import CommentInput from '../components/CommentInput';
import updateViewPostFooterPosition from '../redux/actions/updateViewPostFooterPosition';
import Constants from 'expo-constants';
import PostDetail from '../components/PostDetail';
import updatePostScreenOffset from '../redux/actions/updatePostScreenOffset';
import CallToAuth from '../components/CallToAuth';
import SecondaryHeader from '../components/SecondaryHeader';
import {stickyHeaderHeight} from '../constants'

function PostScreen({
    margin,
    fontFactor,
    headerSize,
    deviceWidthClass,
    updateViewPostFooterPosition,
    navigation,
    updatePostScreenOffset,
}) {
    const [callToAuthModalVisible, setCallToAuthModalVisible] = useState(false);
    const AnimatedImageBackground =
        Animated.createAnimatedComponent(ImageBackground);
    const scrollRef = useRef(null);
    const scrollY = useRef(new Animated.Value(0));
    const handleScroll = Animated.event(
        [
            {
                nativeEvent: {
                    contentOffset: { y: scrollY.current },
                },
            },
        ],
        {
            useNativeDriver: true,
            listener: ({
                nativeEvent: {
                    contentOffset: { y },
                },
            }) => updatePostScreenOffset(y),
        }
    );
    const clampedScrollY = Animated.diffClamp(scrollY.current, 0, stickyHeaderHeight);
    const translateY = clampedScrollY.interpolate({
        inputRange: [0, stickyHeaderHeight],
        outputRange: [0, -stickyHeaderHeight],
    });
    const postData = [
        { post: 'post' },
        { comment: 'comment' },
        { comment: 'comment' },
        { comment: 'comment' },
    ];
    const { statusBarHeight } = Constants;
    const toggleCallToAuth = () => {
        setCallToAuthModalVisible((oldState) => !oldState);
    };

    return (
        <Pressable
            style={{
                flex: 1,
            }}
            // onStartShouldSetResponder=
            onPress={() => Keyboard.dismiss()}
            onStartShouldSetResponder={() => {
                console.log('tracked move');
                return true;
            }}
        >
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    // backgroundColor: 'green',
                }}
                keyboardVerticalOffset={Platform.select({
                    ios: stickyHeaderHeight + statusBarHeight,
                    android: null,
                })}
                behavior={Platform.select({ ios: 'padding', android: null })}
            >
                <SafeAreaView
                    style={{
                        flex: 1,
                    }}
                >
                    <SecondaryHeader
                        heading={'Post'}
                        headerSize={headerSize}
                        margin={margin}
                        translateY={translateY}
                        fontFactor={fontFactor}
                        deeplyNestedScreen
                    />

                    <Animated.FlatList
                        nestedScrollEnabled
                        style={{ zIndex: -1 }}
                        scrollEventThrottle={16}
                        onScroll={handleScroll}
                        contentContainerStyle={{
                            paddingTop: stickyHeaderHeight,
                            paddingBottom: headerSize
                        }}
                        data={postData}
                        bounces={false}
                        renderItem={({ item, index }) => {
                            return (
                                <PostDetail
                                    {...item}
                                    lastComment={index === postData.length - 1}
                                    toggleCallToAuth={toggleCallToAuth}
                                />
                            );
                        }}
                        keyExtractor={(item, index) => 'keyExtractor' + index}
                        ref={scrollRef}
                        keyboardDismissMode={'none'}
                        keyboardShouldPersistTaps="handled"
                    />
                    <CommentInput
                        headerSize={headerSize}
                        scrollY={scrollY}
                        scrollRef={scrollRef}
                        fontFactor={fontFactor}
                        margin={margin}
                    />
                    <CallToAuth
                        visible={callToAuthModalVisible}
                        toggleCallToAuth={toggleCallToAuth}
                        margin={margin}
                        fontFactor={fontFactor}
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </Pressable>
    );
}

const styles = StyleSheet.create({});

const mapStateToProps = ({
    settingsState: { margin, fontFactor, headerSize, deviceWidthClass },
}) => ({
    margin,
    fontFactor,
    headerSize,
    deviceWidthClass,
});

export default connect(mapStateToProps, {
    updateViewPostFooterPosition,
    updatePostScreenOffset,
})(PostScreen);
