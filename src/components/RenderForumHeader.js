import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MarginVertical from './MarginVertical';
import processErrorString from '../helperFunctions/processErrorString';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { noPost } from '../helperFunctions/processErrorString';
import PropTypes from 'prop-types';

export default function RenderForumHeader({
    fontFactor,
    loadingPostsError,
    showFooter,
    searching,
    postsEmpty,
    searchResultEmpty,
}) {
    const styles2 = StyleSheet.create({
        fontSizeL1: {
            fontSize: fontFactor * wp(4),
        },
        fontSizeL2: {
            fontSize: fontFactor * wp(5),
        },
        container: {
            paddingVertical: wp(2.2) * fontFactor,
        },
    });
    const noPostError = loadingPostsError === noPost;
    const showError = loadingPostsError && !noPostError && showFooter; //showFooter indicates length of list greater than view hence multiple error message can be displayed at top and bottom
    const showHeaderSpacer = searching ? !searchResultEmpty : !postsEmpty; //renders when list not empty

    if (showHeaderSpacer) {
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

RenderForumHeader.propTypes = {
    fontFactor: PropTypes.number,
    loadingPostsError: PropTypes.string,
    postsEmpty: PropTypes.bool,
    searchResultEmpty: PropTypes.bool,
    showFooter: PropTypes.bool,
    searching: PropTypes.bool,
};

const styles = StyleSheet.create({
    alignTextCenter: { textAlign: 'center' },
    karla400Font: { fontFamily: 'Karla_400Regular' },
    karla500Font: { fontFamily: 'Karla_500Medium' },
    fontColor808080: { color: '#808080' },
});
