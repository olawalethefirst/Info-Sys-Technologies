import React from 'react';
import { TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import HeartIcon from './HeartIcon';

export default function LikeButton({
    fontFactor,
    uid,
    setLiked,
    toggleCallToAuthModal,
    liked,
}) {
    return (
        <TouchableOpacity
            onPress={() =>
                uid ? setLiked((liked) => !liked) : toggleCallToAuthModal()
            }
            style={{
                width: fontFactor * wp(12),
                height: fontFactor * wp(12),
                alignItems: 'center',
                justifyContent: 'center',
            }}
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
