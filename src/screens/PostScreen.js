import React, { useRef, useCallback } from 'react';
import {
    StyleSheet,
    Animated,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    RefreshControl,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import CommentInput from '../components/CommentInput';
import Constants from 'expo-constants';
import CallToAuth from '../components/CallToAuth';
import SecondaryHeader from '../components/SecondaryHeader';
import { stickyHeaderHeight } from '../constants';
import RenderSeparator from '../components/RenderSeparator';
import UsernameModal from '../components/UsernameModal';
import Post from '../components/Post';
import Comment from '../components/Comment';
import moment from 'moment';
import { auth } from '../helperFunctions/initializeFirebase';
import PostResultModal from '../components/PostResultModal';
import CommentResultModal from '../components/CommentResultModal';
import usePostDetails from '../hooks/usePostDetails';
import RenderPostFooter from '../components/RenderPostFooter';
import { useIsFocused } from '@react-navigation/native';
import useScrollToItemBottom from '../hooks/useScrollToItemBottom';
import toggleCallToAuthModal from '../redux/actions/toggleCallToAuthModal';
import checkColumnMode from '../helperFunctions/checkColumnMode';
import PropTypes from 'prop-types';

function PostScreen({
    //add tabListener to scroll to Top here and forum screen
    margin,
    fontFactor,
    headerSize,
    deviceWidthClass,
    effectiveBodyHeight,
    route: { params }, //maybe update postMini to send only this
    uid,
    toggleCallToAuthModal,
    bodyHeight,
    username,
}) {
    const isFocused = useIsFocused();
    const [scrollToItemBottom] = useScrollToItemBottom();
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
    const columnMode = checkColumnMode(deviceWidthClass);

    const onReply = useCallback(
        (itemRef) => {
            if (uid) {
                if (!commentInputRef.current?.isFocused()) {
                    commentInputRef.current?.focus();
                    scrollToItemBottom(
                        itemRef,
                        containerRef,
                        scrollRef,
                        bodyHeight - headerSize,
                        true
                    );
                }
            } else {
                toggleCallToAuthModal();
            }
        },
        [uid, scrollToItemBottom, toggleCallToAuthModal, bodyHeight, headerSize]
    );
    const onLike = useCallback(
        (category) => (liked, id) => {
            if (uid) {
                if (category) {
                    updatePostLikes(liked);
                } else {
                    updateCommentLikes(liked, id);
                }
            } else {
                toggleCallToAuthModal();
            }
        },
        [uid, toggleCallToAuthModal, updateCommentLikes, updatePostLikes]
    );
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
            // eslint-disable-next-line no-prototype-builtins
            const liked = likes.hasOwnProperty(auth.currentUser?.uid);

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
                        liked={liked}
                        scrollToItemBottom={scrollToItemBottom}
                        onReply={onReply}
                        onLike={onLike(category)}
                        columnMode={columnMode}
                    />
                );
            }
            return (
                <Comment
                    scrollRef={scrollRef}
                    containerRef={containerRef}
                    commentInputRef={commentInputRef}
                    updateCommentLikes={updateCommentLikes}
                    liked={liked}
                    likes={likes}
                    comment={comment}
                    commentID={commentID}
                    createdAt={moment(new Date(createdAt)).fromNow()}
                    username={username}
                    scrollToItemBottom={scrollToItemBottom}
                    onReply={onReply}
                    onLike={onLike(category)}
                    columnMode={columnMode}
                />
            );
        },
        [
            scrollRef,
            containerRef,
            commentInputRef,
            updatePostLikes,
            updateCommentLikes,
            scrollToItemBottom,
            onReply,
            onLike,
            columnMode,
        ]
    );
    const listContentContainer = useRef({
        minHeight: Platform.select({
            android: effectiveBodyHeight + stickyHeaderHeight,
            ios: effectiveBodyHeight,
        }),
        paddingTop: Platform.select({
            android: stickyHeaderHeight,
            ios: 0,
        }),
        paddingBottom: headerSize,
    }).current;

    return (
        <SafeAreaView ref={containerRef} style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                keyboardVerticalOffset={Platform.select({
                    ios: headerSize + statusBarHeight,
                    android: null,
                })}
                behavior={Platform.select({ ios: 'padding', android: null })}
            >
                <View style={styles.stickyHeaderContainer}>
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
                    style={styles.list}
                    scrollEventThrottle={16}
                    onScroll={handleScroll}
                    contentContainerStyle={listContentContainer}
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
                            emptyComment={postDetails?.length === 1}
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
                    height={headerSize}
                    fontFactor={fontFactor}
                    margin={margin}
                    commentInputRef={commentInputRef}
                    writeComment={writeComment}
                    postID={postID}
                />
                {!uid && <CallToAuth />}
                {uid && (
                    <>
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
                )}
                {!username && <UsernameModal />}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

PostScreen.propTypes = {
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
    headerSize: PropTypes.number,
    deviceWidthClass: PropTypes.string,
    effectiveBodyHeight: PropTypes.number,
    params: PropTypes.object,
    uid: PropTypes.string,
    toggleCallToAuthModal: PropTypes.func,
    bodyHeight: PropTypes.number,
    username: PropTypes.string,
    route: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    stickyHeaderContainer: {
        zIndex: 1,
    },
    list: {
        zIndex: -1,
    },
});

const mapStateToProps = ({
    settingsState: {
        margin,
        fontFactor,
        headerSize,
        deviceWidthClass,
        effectiveBodyHeight,
        bodyHeight,
    },
    forumTempState: { uid, username },
}) => ({
    margin,
    fontFactor,
    headerSize,
    deviceWidthClass,
    effectiveBodyHeight,
    uid,
    bodyHeight,
    username,
});

export default connect(mapStateToProps, { toggleCallToAuthModal })(PostScreen);
