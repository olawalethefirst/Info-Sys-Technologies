import React, { useRef } from 'react';
import { StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import Contact from '../components/Contact';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';
import { useScrollToTop } from '@react-navigation/native';

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
            <Contact
                fontFactor={fontFactor}
                headerSize={headerSize}
                margin={margin}
                scrollRef={scrollRef}
            />
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
