import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    Animated,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Pressable,
    Keyboard,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import CommentInput from '../components/CommentInput';
import Constants from 'expo-constants';
import PostDetail from '../components/PostDetail';
import updatePostScreenOffset from '../redux/actions/updatePostScreenOffset';
import CallToAuth from '../components/CallToAuth';
import SecondaryHeader from '../components/SecondaryHeader';
import { stickyHeaderHeight } from '../constants';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

function PostScreen({
    margin,
    fontFactor,
    headerSize,
    deviceWidthClass,
    navigation,
    updatePostScreenOffset,
    bodyHeight,
    route: { params },
}) {
    const [callToAuthModalVisible, setCallToAuthModalVisible] = useState(false);
    const tabBarHeight = useBottomTabBarHeight();
    const scrollRef = useRef(null);
    const containerRef = useRef(null);
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
    const clampedScrollY = Animated.diffClamp(
        scrollY.current,
        0,
        stickyHeaderHeight
    );
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
    const effectiveBodyHeight = bodyHeight - tabBarHeight;
    const commentInputRef = useRef(null);
    console.log(params);

    return (
        <View
            ref={containerRef}
            style={{
                flex: 1,
            }}
        >
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                }}
                keyboardVerticalOffset={Platform.select({
                    ios: headerSize + statusBarHeight,
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
                            minHeight: bodyHeight + headerSize,
                            paddingTop: stickyHeaderHeight,
                            paddingBottom: headerSize,
                        }}
                        data={postData}
                        bounces={false}
                        renderItem={({ item, index }) => {
                            return (
                                <PostDetail
                                    item={item}
                                    lastComment={index === postData.length - 1}
                                    toggleCallToAuth={toggleCallToAuth}
                                    index={index}
                                    scrollRef={scrollRef}
                                    containerRef={containerRef}
                                    effectiveBodyHeight={effectiveBodyHeight}
                                    commentInputRef={commentInputRef}
                                />
                            );
                        }}
                        keyExtractor={(item, index) => 'keyExtractor' + index}
                        ref={scrollRef}
                        keyboardDismissMode={'none'}
                        keyboardShouldPersistTaps="never"
                    />
                    <CommentInput
                        headerSize={headerSize}
                        scrollY={scrollY}
                        scrollRef={scrollRef}
                        fontFactor={fontFactor}
                        margin={margin}
                        commentInputRef={commentInputRef}
                    />
                    <CallToAuth
                        visible={callToAuthModalVisible}
                        toggleCallToAuth={toggleCallToAuth}
                        margin={margin}
                        fontFactor={fontFactor}
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({});

const mapStateToProps = ({
    settingsState: {
        margin,
        fontFactor,
        headerSize,
        deviceWidthClass,
        bodyHeight,
    },
}) => ({
    margin,
    fontFactor,
    headerSize,
    deviceWidthClass,
    bodyHeight,
});

export default connect(mapStateToProps, {
    updatePostScreenOffset,
})(PostScreen);
