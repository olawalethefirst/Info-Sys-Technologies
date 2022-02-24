import React, { useRef, useState, useEffect } from 'react';
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
import CallToAuth from '../components/CallToAuth';
import SecondaryHeader from '../components/SecondaryHeader';
import { stickyHeaderHeight } from '../constants';
import { firestore } from '../helperFunctions/initializeFirebase';
import { onSnapshot, doc } from 'firebase/firestore';
import MarginVertical from '../components/MarginVertical';
import RenderSeparator from '../components/RenderSeparator';

function PostScreen({
    margin,
    fontFactor,
    headerSize,
    deviceWidthClass,
    navigation,
    effectiveBodyHeight,
    route: {
        params: { body, category, createdAt, owner, postID, title },
    }, //maybe update postMini to send only this
}) {
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
    const data = [
        { body, category, createdAt, owner, postID, title },
        { comment: 'comment' },
        { comment: 'comment' },
        { comment: 'comment' },
    ];
    const { statusBarHeight } = Constants;
    
    const commentInputRef = useRef(null);

    useEffect(() => {
        const listenToUpdatedData = () => {
            const listener = onSnapshot(
                doc(firestore, 'posts', postID),
                (snapshot) => {
                    console.log(snapshot.data());
                }
            );
            return listener;
        };
        const listener = listenToUpdatedData();
        return listener;
    }, [postID]);

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
                            minHeight: effectiveBodyHeight + headerSize,
                            paddingTop: stickyHeaderHeight,
                            paddingBottom: headerSize,
                        }}
                        data={data}
                        bounces={false}
                        renderItem={({ item }) => {
                            return (
                                <PostDetail
                                    item={item}
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
                        ItemSeparatorComponent={() => (
                            <RenderSeparator size={1} />
                        )}
                        ListHeaderComponent={() => <RenderSeparator size={1} />}
                    />
                    <CommentInput
                        headerSize={headerSize}
                        scrollY={scrollY}
                        scrollRef={scrollRef}
                        fontFactor={fontFactor}
                        margin={margin}
                        commentInputRef={commentInputRef}
                    />
                    <CallToAuth />
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
        effectiveBodyHeight,
    },
}) => ({
    margin,
    fontFactor,
    headerSize,
    deviceWidthClass,
    effectiveBodyHeight,
});

export default connect(mapStateToProps, {})(PostScreen);
