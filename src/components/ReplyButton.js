import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ReplyIcon from './ReplyIcon';
import PropTypes from 'prop-types';

export default function ReplyButton({ fontFactor, onReply }) {
    const styles2 = StyleSheet.create({
        button: {
            width: fontFactor * wp(12),
            height: fontFactor * wp(12),
        },
    });
    return (
        <TouchableOpacity
            style={[styles.button, styles2.button]}
            onPress={onReply}
        >
            <ReplyIcon
                width={fontFactor * wp(6.36)}
                height={fontFactor * wp(6.36)}
            />
        </TouchableOpacity>
    );
}

ReplyButton.propTypes = {
    fontFactor: PropTypes.number,
    onReply: PropTypes.func,
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
