import React, { useRef,  useCallback } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import checkColumnMode from '../helperFunctions/checkColumnMode';
import { connect } from 'react-redux';
import CommentsHeading from './CommentsHeading';
import Username from './Username';
import CreatedAt from './CreatedAt';
import Likes from './Likes';
import Category from './Category';
import toggleCallToAuthModal from '../redux/actions/toggleCallToAuthModal';
import Title from './Title';
import Body from './Body';
import LikeButton from './LikeButton';
import ReplyButton from './ReplyButton';
import scrollToComponentBottom from '../helperFunctions/scrollToComponentBottom';
import { auth } from '../helperFunctions/initializeFirebase';
import PropTypes from 'prop-types'

const Post = ({
    fontFactor,
    margin,
    uid,
    deviceWidthClass,
    containerRef,
    effectiveBodyHeight,
    commentInputRef,
    scrollRef,
    toggleCallToAuthModal,
    body,
    category,
    title,
    username,
    likes,
    createdAt,
    index,
    updateLike,
    postID,
}) => {
    const columnMode = checkColumnMode(deviceWidthClass);
    const postRef = useRef(null);

    const onReply = useCallback(() => {
        if (uid) {
            commentInputRef.current?.focus();
            scrollToComponentBottom(
                postRef,
                containerRef,
                scrollRef,
                effectiveBodyHeight
            );
        } else {
            toggleCallToAuthModal();
        }
    }, [
        uid,
        toggleCallToAuthModal,
        commentInputRef,
        containerRef,
        postRef,
        effectiveBodyHeight,
        scrollRef,
    ]);
    const liked = likes.includes(auth.currentUser.uid);
    const onLike = useCallback(() => {
        if (uid) {
            updateLike(liked, index, postID);
        } else {
            toggleCallToAuthModal();
        }
    }, [updateLike, index, liked, uid, toggleCallToAuthModal, postID]);

    const styles2 = StyleSheet.create({
        postContainer: {
            borderBottomWidth: wp(0.25),
            paddingHorizontal: margin,
        },
        columnMode: {
            width: columnMode ? '90%' : '100%',
        },
    });

    return (
        <View>
            <View
                ref={postRef}
                style={[styles.postContainer, styles2.postContainer]}
            >
                <View style={[styles.columnMode, styles2.columnMode]}>
                    <View>
                        <Username username={username} fontFactor={fontFactor} />
                        <MarginVertical size={0.2} />

                        <CreatedAt
                            createdAt={createdAt}
                            fontFactor={fontFactor}
                        />
                        <MarginVertical size={0.2} />
                        <Likes
                            likesCount={likes.length}
                            fontFactor={fontFactor}
                        />
                    </View>
                    <MarginVertical />

                    <View>
                        <Category category={category} fontFactor={fontFactor} />
                        <MarginVertical size={0.5} />
                        <Title fontFactor={fontFactor} title={title} />
                        <MarginVertical size={0.3} />
                        <Body fontFactor={fontFactor} body={body} />
                    </View>
                    <MarginVertical />
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <LikeButton
                            fontFactor={fontFactor}
                            liked={liked}
                            onLike={onLike}
                        />
                        <ReplyButton
                            fontFactor={fontFactor}
                            onReply={onReply}
                        />
                    </View>
                    <MarginVertical />
                </View>
            </View>
            <MarginVertical />
            <CommentsHeading />
        </View>
    );
};

Post.propTypes = { fontFactor: PropTypes.number,
    margin: PropTypes.number,
    uid: PropTypes.string,
    deviceWidthClass: PropTypes.string,
    containerRef: PropTypes.object,
    effectiveBodyHeight: PropTypes.number,
    commentInputRef: PropTypes.object,
    scrollRef: PropTypes.object,
    toggleCallToAuthModal: PropTypes.func,
    body: PropTypes.string,
    category: PropTypes.string,
    title: PropTypes.string,
    username: PropTypes.string,
    likes: PropTypes.array,
    createdAt: PropTypes.string,
    index: PropTypes.number,
    updateLike: PropTypes.func,
    postID: PropTypes.string,}

const mapStateToProps = ({
    settingsState: {
        fontFactor,
        margin,
        deviceWidthClass,
        effectiveBodyHeight,
    },
    forumTempState: { uid },
}) => ({
    fontFactor,
    margin,
    deviceWidthClass,
    uid,
    effectiveBodyHeight,
});

export default connect(mapStateToProps, { toggleCallToAuthModal })(Post);

const styles = StyleSheet.create({
    postContainer: {
        borderBottomColor: '#cecece',
    },
    columnMode: {
        alignSelf: 'center',
    },
});
