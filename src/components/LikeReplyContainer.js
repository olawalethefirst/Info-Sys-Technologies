import { StyleSheet, View } from 'react-native';
import React from 'react';
import LikeButton from './LikeButton';
import ReplyButton from './ReplyButton';
import PropTypes from 'prop-types';

const LikeReplyContainer = ({
    liked,
    onPressLike,
    onPressReply,
    fontFactor,
}) => {
    return (
        <View
            style={styles.container}
        >
            <LikeButton
                liked={liked}
                fontFactor={fontFactor}
                onLike={onPressLike}
            />
            <ReplyButton onReply={onPressReply} fontFactor={fontFactor} />
        </View>
    );
};

LikeReplyContainer.propTypes = {
    liked: PropTypes.bool,
    onPressLike: PropTypes.func,
    onPressReply: PropTypes.func,
    fontFactor: PropTypes.number,
};

export default LikeReplyContainer;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});
