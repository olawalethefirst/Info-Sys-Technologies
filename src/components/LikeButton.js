import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import HeartIcon from './HeartIcon';
import PropTypes from 'prop-types';

export default function LikeButton({ fontFactor, liked, onLike }) {
    const styles2 = StyleSheet.create({
        button: {
            width: fontFactor * wp(12),
            height: fontFactor * wp(12),
        },
    });

    return (
        <TouchableOpacity
            onPress={onLike}
            style={[styles.button, styles2.button]}
        >
            <HeartIcon liked={liked} fontFactor={fontFactor} />
        </TouchableOpacity>
    );
}

LikeButton.propTypes = {
    fontFactor: PropTypes.number,
    liked: PropTypes.bool,
    onLike: PropTypes.func,
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
