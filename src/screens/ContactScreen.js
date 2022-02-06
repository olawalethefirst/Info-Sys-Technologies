import React, { useRef } from 'react';
import { StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import SubScreenTemplate from '../components/SubScreenTemplate';
import { connect } from 'react-redux';
import Contact from '../components/Contact';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';
import { useScrollToTop } from '@react-navigation/native';

function ContactScreen({ margin, headerSize, fontFactor }) {
    const scrollRef = useRef(null);
    useScrollToTop(scrollRef);
    const { statusBarHeight } = Constants;
    const sectionComponents = [
        {
            key: '0',
            data: (
                <Contact
                    margin={margin}
                    fontFactor={fontFactor}
                    key="0"
                    scrollRef={scrollRef}
                />
            ),
        },
    ];

    return (
        <KeyboardAvoidingView
            behavior={Platform.select({ ios: 'padding', android: null })}
            style={styles.container}
            keyboardVerticalOffset={Platform.select({
                ios: headerSize + statusBarHeight,
                android: null,
            })}
        >
            <SubScreenTemplate
                sectionComponents={sectionComponents}
                heading="Contact Us"
                margin={margin}
                fontFactor={fontFactor}
                headerSize={headerSize}
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
