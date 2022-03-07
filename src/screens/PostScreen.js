import React, { useRef, useState, useEffect, useCallback } from 'react';
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
import UsernameModal from '../components/UsernameModal';
import Post from '../components/Post';
import Comment from '../components/Comment';
import { Timestamp } from 'firebase/firestore';
import moment from 'moment';

function PostScreen({
    margin,
    fontFactor,
    headerSize,
    deviceWidthClass,
    navigation,
    effectiveBodyHeight,
    route: { params }, //maybe update postMini to send only this
    uid,
}) {
    const scrollRef = useRef(null);
    const containerRef = useRef(null);
    const commentInputRef = useRef(null);

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
    const [data, setData] = useState([
        { ...params },
        // { comment: 'comment' },
        // { comment: 'comment' },
        // { comment: 'comment' },
    ]);
    const { statusBarHeight } = Constants;

    const renderItem = useCallback(
        ({ item }) => {
            const {
                body,
                category,
                title,
                username,
                likes,
                createdAt: { nanoseconds, seconds },
                owner,
                postID,
                searchField,
            } = item;
            const timestampString = moment(
                new Timestamp(seconds, nanoseconds).toDate()
            ).fromNow();

            if (category) {
                return (
                    <Post
                        scrollRef={scrollRef}
                        containerRef={containerRef}
                        commentInputRef={commentInputRef}
                        username={username}
                        createdAt={timestampString}
                        likes={likes}
                        category={category}
                        title={title}
                        body={body}
                    />
                );
            }
            return (
                <Comment
                    scrollRef={scrollRef}
                    containerRef={containerRef}
                    commentInputRef={commentInputRef}
                />
            );
        },
        [scrollRef, containerRef, commentInputRef]
    );

    useEffect(() => {
        const listenToUpdatedData = () => {
            const listener = onSnapshot(
                doc(firestore, 'posts', params.postID),
                (snapshot) => {
                    console.log('offlineSource: ', snapshot.metadata.fromCache);
                }
            );
            return listener;
        };
        const listener = listenToUpdatedData();
        return listener;
    }, [params.postID]);

    console.log('params: ', params);

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
                        renderItem={renderItem}
                        keyExtractor={(item, index) => 'keyExtractor' + index}
                        ref={scrollRef}
                        keyboardDismissMode={'none'}
                        keyboardShouldPersistTaps="never"
                        ItemSeparatorComponent={RenderSeparator}
                        ListHeaderComponent={RenderSeparator}
                    />
                    <CommentInput
                        headerSize={headerSize}
                        scrollY={scrollY}
                        scrollRef={scrollRef}
                        fontFactor={fontFactor}
                        margin={margin}
                        commentInputRef={commentInputRef}
                    />
                    {!uid && <CallToAuth />}
                    {
                        uid && <UsernameModal /> //switch to availabilty of username
                    }
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
    forumTempState: { uid },
}) => ({
    margin,
    fontFactor,
    headerSize,
    deviceWidthClass,
    effectiveBodyHeight,
    uid,
});

export default connect(mapStateToProps, {})(PostScreen);
