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
    RefreshControl,
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
// import writeComment from '../redux/actions/writeComment';
import usePostDetails from '../hooks/usePostDetails';
import RenderPostFooter from '../components/RenderPostFooter';
import { useIsFocused } from '@react-navigation/native';

function PostScreen({ //add tabListener to scroll to Top here and forum screen
    margin,
    fontFactor,
    headerSize,
    deviceWidthClass,
    navigation: { addListener, setParams },
    effectiveBodyHeight,
    route: { params }, //maybe update postMini to send only this
    uid,
}) {
    const isFocused = useIsFocused();
    const [
        postDetails,
        updatePostLikes,
        updateCommentLikes,
        loading,
        loadError,
        fetchComments,
        onRetryLoadComment,
        writeComment,
        rewriteComment,
        closeCommentResult,
        commentResultVisible,
        commenting,
        commentSuccessful,
        commentFailed,
        refreshing,
        onRefresh,
    ] = usePostDetails(params);

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
    const scrollYClampedToInset = scrollY.current.interpolate({
        inputRange: [-stickyHeaderHeight, -stickyHeaderHeight + 1],
        outputRange: [-stickyHeaderHeight, -stickyHeaderHeight + 1],
        extrapolateLeft: 'clamp',
    });
    const invertedScrollYClampedToInset = Animated.multiply(
        scrollYClampedToInset,
        -1
    );
    const translateY = Animated.diffClamp(
        invertedScrollYClampedToInset,
        -stickyHeaderHeight,
        0
    );

    const { statusBarHeight } = Constants;
    const { postID } = params;

    const renderItem = useCallback(
        ({ item }) => {
            const {
                body,
                category,
                title,
                username,
                likes,
                createdAt,
                postID,
                comment,
                commentID,
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
                        updatePostLikes={updatePostLikes}
                        liked={likes.includes(auth.currentUser?.uid)}
                    />
                );
            }
            return (
                <Comment
                    scrollRef={scrollRef}
                    containerRef={containerRef}
                    commentInputRef={commentInputRef}
                    updateCommentLikes={updateCommentLikes}
                    liked={likes.includes(auth.currentUser?.uid)}
                    likes={likes}
                    comment={comment}
                    commentID={commentID}
                    createdAt={moment(new Date(createdAt)).fromNow()}
                    username={username}
                />
            );
        },
        [
            scrollRef,
            containerRef,
            commentInputRef,
            updatePostLikes,
            updateCommentLikes,
        ]
    );
    console.log('commentResultVisible', commentResultVisible);

    return (
        <SafeAreaView
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
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    {/* view fixes bug(flatview obstructs stickyheader) in android, test with newer device to confirm if it exists in  */}
                    <View style={{ zIndex: 100 }}>
                        <SecondaryHeader
                            heading={'Post'}
                            headerSize={headerSize}
                            margin={margin}
                            translateY={translateY}
                            fontFactor={fontFactor}
                            deeplyNestedScreen
                        />
                    </View>
                    <Animated.FlatList
                        refreshControl={
                            <RefreshControl
                                colors={['#1A91D7']}
                                tintColor={'#1A91D7'}
                                onRefresh={onRefresh}
                                refreshing={refreshing}
                                progressViewOffset={Platform.select({
                                    ios: 0,
                                    android: stickyHeaderHeight,
                                })}
                            />
                        }
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        nestedScrollEnabled
                        style={{ zIndex: -1 }}
                        scrollEventThrottle={16}
                        onScroll={handleScroll}
                        contentContainerStyle={{
                            minHeight: effectiveBodyHeight + stickyHeaderHeight,
                            paddingTop: Platform.select({
                                android: stickyHeaderHeight,
                                ios: 0,
                            }),
                            paddingBottom: headerSize,
                        }}
                        data={postDetails}
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
                        ListFooterComponent={
                            <RenderPostFooter
                                postNotLoaded={!postDetails}
                                emptyComment={postDetails.length === 1}
                                loading={loading}
                                loadError={loadError}
                                onRetryLoadComment={onRetryLoadComment}
                            />
                        }
                        onEndReachedThreshold={1}
                        onEndReached={fetchComments}
                        contentInset={{
                            top: Platform.select({
                                ios: stickyHeaderHeight,
                                android: 0,
                            }),
                        }}
                        contentOffset={{
                            x: 0,
                            y: Platform.select({
                                ios: -stickyHeaderHeight,
                                android: 0,
                            }),
                        }}
                        automaticallyAdjustContentInsets={false}
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
                                    navigationFocussed={isFocused}
                                />
                                <CommentResultModal
                                    rewriteComment={rewriteComment}
                                    closeCommentResult={closeCommentResult}
                                    commentFailed={commentFailed}
                                    commentSuccessful={commentSuccessful}
                                    commenting={commenting}
                                    commentResultVisible={commentResultVisible}
                                />
                            </>
                        ) //switch to availabilty of username
                    }
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
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
