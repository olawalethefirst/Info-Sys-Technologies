import React, { useRef } from 'react';
import { StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import SubScreenTemplate from '../components/SubScreenTemplate';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import scrollToTop from '../helperFunctions/scrollToTop';
import Contact from '../components/Contact';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';

function ContactScreen({ margin, headerSize, fontFactor, bodyHeight }) {
    const scrollRef = useRef(null);
    const { statusBarHeight } = Constants;

    const sectionComponents = [
        {
            key: '0',
            data: (
                <Contact
                    bodyHeight={bodyHeight}
                    headerSize={headerSize}
                    margin={margin}
                    fontFactor={fontFactor}
                    key="0"
                    scrollRef={scrollRef}
                />
            ),
        },
        {
            key: '1',
            data: (
                <Footer
                    headerSize={headerSize}
                    darkMode={true}
                    margin={margin}
                    fontFactor={fontFactor}
                    scrollToTop={scrollToTop}
                    scrollRef={scrollRef}
                    key="1"
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
    bodyHeight: PropTypes.number,
    contactScrollViewOffset: PropTypes.number,
};

const mapStateToProps = (state) => ({
    margin: state.settingsState.margin,
    fontFactor: state.settingsState.fontFactor,
    headerSize: state.settingsState.headerSize,
    bodyHeight: state.settingsState.bodyHeight,
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
