import React, { useRef, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Keyboard,
} from 'react-native';
import moment from 'moment';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ReplyIcon from './ReplyIcon';
import HeartIcon from './HeartIcon';
import checkColumnMode from '../helperFunctions/checkColumnMode';
import { connect } from 'react-redux';
import CommentsHeading from './CommentsHeading';
import Username from './Username';
import CreatedAt from './CreatedAt';
import Likes from './Likes';
import toggleCallToAuthModal from '../redux/actions/toggleCallToAuthModal';
import Body from './Body';
import LikeButton from './LikeButton';
import ReplyButton from './ReplyButton';
import scrollToComponentBottom from '../helperFunctions/scrollToComponentBottom';
import { auth } from '../helperFunctions/initializeFirebase';
import PropTypes from 'prop-types';

const Comment = ({
    fontFactor,
    margin,
    deviceWidthClass,
    uid,
    item,
    scrollRef,
    containerRef,
    bodyHeight,
    commentInputRef,
    username,
    createdAt,
    likes,
    comment,
    toggleCallToAuthModal,
    updateCommentLikes,
    commentID,
    headerSize,
    liked
}) => {
    const columnMode = checkColumnMode(deviceWidthClass);
    const commentRef = useRef(null);

    const onReply = useCallback(() => {
        if (uid) {
            commentInputRef.current?.focus();
            scrollToComponentBottom(
                commentRef,
                containerRef,
                scrollRef,
                bodyHeight - headerSize
            );
        } else {
            toggleCallToAuthModal();
        }
    }, [
        uid,
        toggleCallToAuthModal,
        commentInputRef,
        containerRef,
        commentRef,
        bodyHeight,
        scrollRef,
        headerSize,
    ]);

    const onLike = useCallback(() => {
        if (uid) {
            updateCommentLikes(commentID);
        } else {
            toggleCallToAuthModal();
        }
    }, [updateCommentLikes, uid, toggleCallToAuthModal, commentID]);

    return (
        <View
            ref={commentRef}
            style={{
                borderBottomColor: '#cecece',
                borderBottomWidth: wp(0.25),
                marginHorizontal: margin,
            }}
        >
            <View
                style={{
                    width: columnMode ? '90%' : '100%', // move to postscreen
                    alignSelf: 'center',
                }}
            >
                <View>
                    <Username username={username} fontFactor={fontFactor} />
                    <MarginVertical size={0.2} />
                    <CreatedAt createdAt={createdAt} fontFactor={fontFactor} />
                    <MarginVertical size={0.2} />
                    <Likes likesCount={likes.length} fontFactor={fontFactor} />
                </View>
                <MarginVertical />

                <View>
                    <Body body={comment} fontFactor={fontFactor} />
                </View>
                <MarginVertical />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <LikeButton
                        liked={liked}
                        fontFactor={fontFactor}
                        onLike={onLike}
                    />
                    <ReplyButton onReply={onReply} fontFactor={fontFactor} />
                </View>
                <MarginVertical />
            </View>
        </View>
    );
};

const mapStateToProps = ({
    settingsState: {
        fontFactor,
        margin,
        deviceWidthClass,
        bodyHeight,
        headerSize,
    },
    forumTempState: { uid },
}) => ({
    fontFactor,
    margin,
    deviceWidthClass,
    uid,
    bodyHeight,
    headerSize,
});

export default connect(mapStateToProps, { toggleCallToAuthModal })(Comment);

const styles = StyleSheet.create({});
