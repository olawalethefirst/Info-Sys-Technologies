import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import RetryLoad from './RetryLoad';
import { noComment as noCommentErr } from '../helperFunctions/processErrorString';
import PropTypes from 'prop-types';

function RenderPostFooter({
    postNotLoaded,
    emptyComment,
    fontFactor,
    loading,
    loadError,
    onRetryLoadComment,
}) {
    const noCommentError = loadError === noCommentErr;
    const showError = loadError && !noCommentError;

    const styles2 = StyleSheet.create({
        container: {
            paddingVertical: wp(2.2) * fontFactor,
        },
        noComment: {
            fontSize: fontFactor * wp(5),
        },
    });

    if (postNotLoaded || loading) {
        return (
            <View style={styles2.container}>
                <ActivityIndicator
                    size={wp(4) * fontFactor}
                    color={'#1A91D7'}
                />
            </View>
        );
    }

    if (showError) {
        return (
            <RetryLoad
                fontFactor={fontFactor}
                error={loadError}
                onRetry={onRetryLoadComment}
            />
        );
    }

    if (emptyComment && noCommentError) {
        return (
            <View style={styles2.container}>
                <Text style={[styles.noComment, styles.noComment]}>
                    No Comment
                </Text>
            </View>
        );
    }

    return <View style={styles2.container} />;
}

RenderPostFooter.propTypes = {
    postNotLoaded: PropTypes.bool,
    emptyComment: PropTypes.bool,
    fontFactor: PropTypes.number,
    loading: PropTypes.bool,
    loadError: PropTypes.string,
    onRetryLoadComment: PropTypes.func,
};

const mapStateToProps = ({ settingsState: { fontFactor } }) => ({
    fontFactor,
});

const styles = StyleSheet.create({
    noComment: {
        textAlign: 'center',
        fontFamily: 'Karla_400Regular',
    },
});

export default connect(mapStateToProps)(RenderPostFooter);
