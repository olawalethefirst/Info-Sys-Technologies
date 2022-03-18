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
import onLikeAsync from '../helperFunctions/onLikeAsync';
import onUnlikeAsync from '../helperFunctions/onUnlikeAsync';
import { List } from 'immutable';
import PostResultModal from '../components/PostResultModal';
import CommentResultModal from '../components/CommentResultModal';
import writeComment from '../redux/actions/writeComment';

function PostScreen({
    margin,
    fontFactor,
    headerSize,
    deviceWidthClass,
    navigation,
    effectiveBodyHeight,
    route: { params }, //maybe update postMini to send only this
    uid,
    writeComment,
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

    //action types
    const UPDATE_POST = 'UPDATE_POST';
    const REMOVE_LIKE = 'REMOVE_LIKE';
    const ADD_LIKE = 'ADD_LIKE';
    const TOGGLE_NAVIGATION_FOCUSSED = 'TOGGLE_NAVIGATION_FOCUSSED';

    //reducer
    const reducer = (state, action) => {
        switch (action.type) {
            case UPDATE_POST:
                return {
                    ...state,
                    data: state.data.map((el, ind) => {
                        if (ind === 0) {
                            return action.payload;
                        }
                        return el;
                    }),
                };
            case ADD_LIKE:
                return {
                    ...state,
                    data: state.data.map((el, index) => {
                        if (index === action.payload) {
                            return {
                                ...el,
                                likes: [...el.likes, auth.currentUser.uid],
                            };
                        }
                        return el;
                    }),
                };
            case REMOVE_LIKE:
                return {
                    ...state,
                    data: state.data.map((el, index) => {
                        if (index === action.payload) {
                            return {
                                ...el,
                                likes: el.likes.filter(
                                    (uid) => uid !== auth.currentUser.uid
                                ),
                            };
                        }
                        return el;
                    }),
                };
            case TOGGLE_NAVIGATION_FOCUSSED:
                return { ...state, navigationFocussed: action.payload };
            default:
                return state;
        }
    };

    //state & dispatch
    const [state, dispatch] = useReducer(reducer, {
        data: [{ ...params }],
        shouldRefreshList: false,
        navigationFocussed: false,
    });

    //actions
    const updateLike = async (liked, payload, postID) => {
        if (liked) {
            try {
                dispatch({ type: REMOVE_LIKE, payload });
                await onUnlikeAsync(postID);
            } catch {
                dispatch({ type: ADD_LIKE, payload });
            }
        } else {
            try {
                dispatch({ type: ADD_LIKE, payload });
                await onLikeAsync(postID);
            } catch {
                dispatch({ type: REMOVE_LIKE, payload });
            }
        }
    };
    const updatePost = (payload) => {
        dispatch({ type: UPDATE_POST, payload });
    };
    const toggleNavigationFocussed = (payload) => {
        dispatch({ type: TOGGLE_NAVIGATION_FOCUSSED, payload });
    };

    const { statusBarHeight } = Constants;
    const post = state.data[0];

    const renderItem = useCallback(
        ({ item, index }) => {
            const {
                body,
                category,
                title,
                username,
                likes,
                createdAt: { nanoseconds, seconds },
                postID,
                owner,
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
                        postID={postID}
                        index={index}
                        updateLike={updateLike}
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
    const onComment = (comment) => {
        writeComment({
            comment,
            parentPostID: params.postID,
        });
    };

    useEffect(() => {
        const listenToUpdatedData = () => {
            const listener = onSnapshot(
                doc(firestore, 'posts', params.postID),
                (snapshot) => {
                    const data = snapshot.data();
                    if (data) {
                        if (!List(data.likes).equals(List(post.likes))) {
                            const { category, title, body } = data;
                            const updatedPost = {
                                postID: snapshot.id,
                                searchField:
                                    category + '. ' + title + '. ' + body,
                                ...data,
                            }; //may be updated to only include required data
                            updatePost(updatedPost);
                        } else {
                            console.log('failed update test');
                        }
                    }
                }
            );
            return listener;
        };
        const listener = listenToUpdatedData();
        return listener;
    }, [params.postID, post]);

    useEffect(() => {
        const events = ['focus', 'blur'];

        const unsubscribers = events.map((event) =>
            navigation.addListener(event, () =>
                toggleNavigationFocussed(event === events[0])
            )
        );

        return () => {
            unsubscribers.forEach((unsubscribe) => unsubscribe());
        };
    }, [navigation]);

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
                            minHeight: effectiveBodyHeight + stickyHeaderHeight,
                            marginTop: stickyHeaderHeight,
                            paddingBottom: headerSize,
                        }}
                        extraData={state.shouldRefreshList}
                        data={state.data}
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
                        ListHeaderComponent={RenderSeparator}
                    />
                    <CommentInput
                        headerSize={headerSize}
                        fontFactor={fontFactor}
                        margin={margin}
                        commentInputRef={commentInputRef}
                        onComment={onComment}
                    />
                    {!uid && <CallToAuth />}
                    {
                        uid && (
                            <>
                                <UsernameModal />
                                <PostResultModal
                                    name={'postResultModal2'}
                                    navigationFocussed={
                                        state.navigationFocussed
                                    }
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

export default connect(mapStateToProps, { writeComment })(PostScreen);
