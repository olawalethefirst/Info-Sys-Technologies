import React, { useRef } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Text,
    View,
    KeyboardAvoidingView,
} from 'react-native';
import SubScreenTemplate from '../components/SubScreenTemplate';
import ContactTemplate from '../components/ContactTemplate';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import scrollToTop from '../helperFunctions/scrollToTop';
import Contact from '../components/Contact';

function ContactScreen({ margin, headerSize, fontFactor, bodyHeight }) {
    const scrollRef = useRef(null);

    const sectionComponents = [
        {
            key: 0,
            data: (
                <Contact
                    bodyHeight={bodyHeight}
                    headerSize={headerSize}
                    margin={margin}
                >
                    <ContactTemplate fontFactor={fontFactor} />
                </Contact>
            ),
        },
        {
            key: 1,
            data: (
                <Footer
                    headerSize={headerSize}
                    darkMode={true}
                    margin={margin}
                    fontFactor={fontFactor}
                    scrollToTop={scrollToTop}
                    scrollRef={scrollRef}
                />
            ),
        },
    ];
    return (
        <KeyboardAvoidingView
            behavior="padding"
            style={styles.container}
            keyboardVerticalOffset={headerSize}
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
