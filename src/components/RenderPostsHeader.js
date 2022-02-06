import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MarginVertical from './MarginVertical';
import processErrorString from '../helperFunctions/processErrorString';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { errorMessages } from '../helperFunctions/fetchPostsAsync';
import PropTypes from 'prop-types';

export default function RenderPostsHeader({
    fontFactor,
    loadingPostsError,
    showHeader, //renders when list not empty
}) {
    const styles2 = StyleSheet.create({
        fontSizeL1: {
            fontSize: fontFactor * wp(4),
        },
        fontSizeL2: {
            fontSize: fontFactor * wp(5),
        },
        container: {
            minHeight: wp(4.4) * fontFactor,
            paddingVertical: wp(4) * fontFactor,
        },
    });
    const showError =
        loadingPostsError && loadingPostsError !== errorMessages.noPost;

    if (showHeader) {
        return (
            <View style={[styles2.container]}>
                {showError && (
                    <>
                        <Text
                            style={[
                                styles2.fontSizeL2,
                                styles.karla500Font,
                                styles.alignTextCenter,
                            ]}
                        >
                            {processErrorString(loadingPostsError)}
                        </Text>
                        <MarginVertical size={0.2} />
                        <Text
                            style={[
                                styles2.fontSizeL1,
                                styles.karla400Font,
                                styles.fontColor808080,
                                styles.alignTextCenter,
                            ]}
                        >
                            pull to refresh
                        </Text>
                    </>
                )}
            </View>
        );
    }
    return null;
}

RenderPostsHeader.propTypes = {
    fontFactor: PropTypes.number,
    loadingPostsError: PropTypes.string,
    showHeader: PropTypes.bool,
};

const styles = StyleSheet.create({
    alignTextCenter: { textAlign: 'center' },
    karla400Font: { fontFamily: 'Karla_400Regular' },
    karla500Font: { fontFamily: 'Karla_500Medium' },
    fontColor808080: { color: '#808080' },
});
