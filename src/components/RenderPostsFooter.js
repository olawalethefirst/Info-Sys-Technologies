import React from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import processErrorString, {
    noPost,
} from '../helperFunctions/processErrorString';
import PropTypes from 'prop-types';
import MarginVertical from './MarginVertical';

export default function RenderPostsFooter({
    loadingPosts,
    fontFactor,
    loadingPostsError,
    searching,
    showFooter,
    retryLoadMorePosts,
    posts,
    searchResult,
}) {
    const styles2 = StyleSheet.create({
        container: {
            minHeight: wp(4.4) * fontFactor,
            paddingVertical: wp(4) * fontFactor,
        },
        fontSizeL1: { fontSize: fontFactor * wp(4) },
        fontSizeL2: { fontSize: fontFactor * wp(5) },
    });
    //only render footer when there's an intersection in the set of "length smaller than screen" and "not loading post"

    const noPostError = loadingPostsError === noPost;
    const showError = loadingPostsError && !noPostError;
    const noSearchResult = searching && noPostError && !searchResult.length;
    const noPostResult = !posts.length && noPostError;

    if (loadingPosts) {
        return (
            <View style={styles2.container}>
                <ActivityIndicator size="small" color="#1A91D7" />
            </View>
        );
    }

    if (showError) {
        return (
            <View style={styles2.container}>
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
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={retryLoadMorePosts}
                    >
                        <Text
                            style={[
                                styles2.fontSizeL1,
                                styles.poppins400Font,
                                styles.alignTextCenter,
                                styles.fontColor808080,
                            ]}
                        >
                            Retry
                        </Text>
                    </TouchableOpacity>
                </>
            </View>
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

    if (noPostResult) {
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

RenderPostsFooter.propTypes = {
    fontFactor: PropTypes.number,
    loadingPostsError: PropTypes.string,
    loadingPosts: PropTypes.bool,
    searching: PropTypes.bool,
    showFooter: PropTypes.bool,
    retryLoadMorePosts: PropTypes.func,
    posts: PropTypes.array,
    searchResult: PropTypes.array,
};

const styles = StyleSheet.create({
    alignTextCenter: { textAlign: 'center' },
    karla400Font: { fontFamily: 'Karla_400Regular' },
    karla500Font: { fontFamily: 'Karla_500Medium' },
    poppins400Font: { fontFamily: 'Poppins_400Regular' },
    fontColor808080: { color: '#808080' },
});
