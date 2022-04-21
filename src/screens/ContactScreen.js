import React, { useRef, lazy, Suspense } from 'react';
import { StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
const Contact = lazy(() => import('../components/Contact'));
import Constants from 'expo-constants';
import PropTypes from 'prop-types';
import { useScrollToTop } from '@react-navigation/native';
import SuspenseFallback from '../components/SuspenseFallback';

function ContactScreen({ margin, headerSize, fontFactor }) {
    const scrollRef = useRef(null);
    useScrollToTop(scrollRef);
    const { statusBarHeight } = Constants;

    return (
        <KeyboardAvoidingView
            behavior={Platform.select({ ios: 'padding', android: null })}
            style={styles.container}
            keyboardVerticalOffset={Platform.select({
                ios: Math.round(headerSize + statusBarHeight),
                android: null,
            })}
        >
            <Suspense fallback={<SuspenseFallback />}>
                <Contact
                    fontFactor={fontFactor}
                    headerSize={headerSize}
                    margin={margin}
                    scrollRef={scrollRef}
                />
            </Suspense>
        </KeyboardAvoidingView>
    );
}

ContactScreen.propTypes = {
    margin: PropTypes.number,
    headerSize: PropTypes.number,
    fontFactor: PropTypes.number,
};

const mapStateToProps = (state) => ({
    margin: state.settingsState.margin,
    fontFactor: state.settingsState.fontFactor,
    headerSize: state.settingsState.headerSize,
});

export default connect(mapStateToProps)(ContactScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161B26',
    },
    heading: {
        color: '#fff',
    },
});
