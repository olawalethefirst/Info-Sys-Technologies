import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import HeartIcon from './HeartIcon';
import PropTypes from 'prop-types';

export default function LikeButton({
    fontFactor,
    uid,
    setLiked,
    toggleCallToAuthModal,
    liked,
}) {
    const styles2 = StyleSheet.create({
        button: {
            width: fontFactor * wp(12),
            height: fontFactor * wp(12),
        },
    });

    return (
        <TouchableOpacity
            onPress={() =>
                uid ? setLiked((liked) => !liked) : toggleCallToAuthModal()
            }
            style={[styles.button, styles2.button]}
        >
            <HeartIcon
                containerProp={{
                    width: fontFactor * wp(6.36),
                    height: fontFactor * wp(6.36),
                }}
                iconProp={
                    liked
                        ? { fill: 'red', stroke: 'red' }
                        : { fill: 'none', stroke: 'black' }
                }
            />
        </TouchableOpacity>
    );
}

LikeButton.propTypes = {
    fontFactor: PropTypes.number,
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
