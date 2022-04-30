import React, { useRef } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { useScrollToTop } from '@react-navigation/native';
import PropTypes from 'prop-types';
import Forum from '../components/Forum';

function ForumScreen({ effectiveBodyHeight }) {
    const scrollRef = useRef(null);
    useScrollToTop(scrollRef);

    const styles2 = StyleSheet.create({
        containerHeight: {
            height: effectiveBodyHeight,
        },
    });

    return (
        <SafeAreaView style={[styles2.containerHeight, styles.container]}>
            <Forum scrollRef={scrollRef} />
        </SafeAreaView>
    );
}

const mapStateToProps = ({ settingsState: { effectiveBodyHeight } }) => ({
    effectiveBodyHeight,
});

ForumScreen.propTypes = {
    effectiveBodyHeight: PropTypes.number,
};

export default connect(mapStateToProps)(ForumScreen);

const styles = StyleSheet.create({
    flex1: {
        flex: 1,
    },
    container: {
        backgroundColor: '#fff',
    },
});
