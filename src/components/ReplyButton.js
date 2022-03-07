import React from 'react';
import { TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ReplyIcon from './ReplyIcon';

export default function ReplyButton({
    fontFactor,
    uid,
    toggleCallToAuthModal,
    onPress,
}) {
    return (
        <TouchableOpacity
            style={{
                width: fontFactor * wp(12),
                height: fontFactor * wp(12),
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onPress={() => (uid ? onPress() : toggleCallToAuthModal())}
        >
            <ReplyIcon
                width={fontFactor * wp(6.36)}
                height={fontFactor * wp(6.36)}
            />
        </TouchableOpacity>
    );
}
