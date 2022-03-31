import React, {
    useRef,
    useState,
    useEffect,
    useCallback,
    useReducer,
} from 'react';
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
import { auth } from '../helperFunctions/initializeFirebase';
import PostResultModal from '../components/PostResultModal';
import CommentResultModal from '../components/CommentResultModal';
import writeComment from '../redux/actions/writeComment';
import usePostDetails from '../hooks/usePostDetails';

function PostScreen({
    margin,
    fontFactor,
    headerSize,
    deviceWidthClass,
    navigation: { addListener, setParams },
    effectiveBodyHeight,
    route: { params }, //maybe update postMini to send only this
    uid,
    writeComment,
}) {
    const [navigationFocussed, setNavigationFocussed] = useState(false);
    const [postDetails, updatePostLikes, updateCommentLikes] =
        usePostDetails(params);

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

    const toggleNavigationFocussed = (payload) => {
        setNavigationFocussed(payload);
    };

    const { statusBarHeight } = Constants;
    const { postID } = params;

    const renderItem = useCallback(
        ({ item, index }) => {
            const {
                body,
                category,
                title,
                username,
                likes,
                createdAt,
                postID,
                owner,
            } = item;

            if (category) {
                return (
                    <Post
                        scrollRef={scrollRef}
                        containerRef={containerRef}
                        commentInputRef={commentInputRef}
                        username={username}
                        createdAt={moment(new Date(createdAt)).fromNow()}
                        likes={likes}
                        category={category}
                        title={title}
                        body={body}
                        postID={postID}
                        index={index}
                        updatePostLikes={updatePostLikes}
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
        [scrollRef, containerRef, commentInputRef, updatePostLikes]
    );

    useEffect(() => {
        const events = ['focus', 'blur'];

        const unsubscribers = events.map((event) =>
            addListener(event, () =>
                toggleNavigationFocussed(event === events[0])
            )
        );

        return () => {
            unsubscribers.forEach((unsubscribe) => unsubscribe());
        };
    }, [addListener]);

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
                        //footerBehavior - if empty, show loading
                        nestedScrollEnabled
                        style={{ zIndex: -1 }}
                        scrollEventThrottle={16}
                        onScroll={handleScroll}
                        contentContainerStyle={{
                            minHeight: effectiveBodyHeight + stickyHeaderHeight,
                            marginTop: stickyHeaderHeight,
                            paddingBottom: headerSize,
                        }}
                        data={postDetails}
                        bounces={false}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => 'keyExtractor' + index}
                        ref={scrollRef}
                        keyboardDismissMode={Platform.select({
                            ios: 'interactive',
                            android: 'none',
                        })}
                        keyboardShouldPersistTaps="never"
                        ItemSeparatorComponent={RenderSeparator}
                    />
                    <CommentInput
                        headerSize={headerSize}
                        fontFactor={fontFactor}
                        margin={margin}
                        commentInputRef={commentInputRef}
                        writeComment={writeComment}
                        postID={postID}
                    />
                    {!uid && <CallToAuth />}
                    {
                        uid && (
                            <>
                                <UsernameModal />
                                <PostResultModal
                                    name={'postResultModal2'}
                                    navigationFocussed={navigationFocussed}
                                />
                                <CommentResultModal />
                            </>
                        ) //switch to availabilty of username
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

export default connect(mapStateToProps, {
    writeComment,
})(PostScreen);
