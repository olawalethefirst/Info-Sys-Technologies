import React, { useRef, lazy, Suspense } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { useScrollToTop } from '@react-navigation/native';
import PropTypes from 'prop-types';
import SuspenseFallback from '../components/SuspenseFallback';
const Forum = lazy(() => import('../components/Forum'));

function ForumScreen({ effectiveBodyHeight }) {
    const scrollRef = useRef(null);

    //Variables & Fns
    useScrollToTop(scrollRef);

    const styles2 = StyleSheet.create({
        containerHeight: {
            height: effectiveBodyHeight,
        },
    });

    return (
        <SafeAreaView style={[styles2.containerHeight, styles.container]}>
            <Suspense fallback={<SuspenseFallback color="#1A91D7" />}>
                <Forum scrollRef={scrollRef} />
            </Suspense>
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
