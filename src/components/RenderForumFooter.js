import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { noPost } from '../helperFunctions/processErrorString';
import PropTypes from 'prop-types';
import RetryLoad from './RetryLoad';

export default function RenderForumFooter({
    loadingPosts,
    fontFactor,
    loadingPostsError,
    searching,
    showFooter,
    retryLoadMorePosts,
    postsEmpty,
    searchResultEmpty,
}) {
    const styles2 = StyleSheet.create({
        container: {
            paddingVertical: wp(2.2) * fontFactor,
        },
        fontSizeL1: { fontSize: fontFactor * wp(4) },
        fontSizeL2: { fontSize: fontFactor * wp(5) },
    });

    const noPostError = loadingPostsError === noPost;
    const showError = loadingPostsError && !noPostError;
    const noSearchResult = searching && noPostError && searchResultEmpty;

    if (loadingPosts) {
        return (
            <View style={styles2.container}>
                <ActivityIndicator size={wp(4) * fontFactor} color="#1A91D7" />
            </View>
        );
    }

    if (showError) {
        return (
            <RetryLoad
                error={loadingPostsError}
                fontFactor={fontFactor}
                onRetry={retryLoadMorePosts}
            />
        );
    }

    if (noSearchResult) {
        return (
            <View style={styles2.container}>
                <Text
                    style={[
                        styles2.fontSizeL2,
                        styles.karla400Font,
                        styles.alignTextCenter,
                    ]}
                >
                    No search result
                </Text>
            </View>
        );
    }

    if (postsEmpty) {
        return (
            <View style={styles2.container}>
                <Text
                    style={[
                        styles2.fontSizeL2,
                        styles.karla400Font,
                        styles.alignTextCenter,
                    ]}
                >
                    No post
                </Text>
            </View>
        );
    }

    if (showFooter) {
        return <View style={styles2.container} />;
    }

    return <></>;
}

RenderForumFooter.propTypes = {
    fontFactor: PropTypes.number,
    loadingPostsError: PropTypes.string,
    loadingPosts: PropTypes.bool,
    searching: PropTypes.bool,
    showFooter: PropTypes.bool,
    retryLoadMorePosts: PropTypes.func,
    postsEmpty: PropTypes.bool,
    searchResultEmpty: PropTypes.bool,
};

const styles = StyleSheet.create({
    alignTextCenter: { textAlign: 'center' },
    karla400Font: { fontFamily: 'Karla_400Regular' },
    karla500Font: { fontFamily: 'Karla_500Medium' },
    poppins400Font: { fontFamily: 'Poppins_400Regular' },
    fontColor808080: { color: '#808080' },
});
