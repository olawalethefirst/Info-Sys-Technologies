import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import ContactForm from '../components/ContactForm';
import PropTypes from 'prop-types';

function Contact({ bodyHeight, headerSize, margin, fontFactor, scrollRef }) {
    const { statusBarHeight } = Constants;

    return (
        <View
            style={[
                styles.container,
                {
                    minHeight: bodyHeight - headerSize - statusBarHeight,
                    paddingHorizontal: margin,
                },
            ]}
        >
            <ContactForm fontFactor={fontFactor} scrollRef={scrollRef} />
        </View>
    );
}

Contact.propTypes = {
    bodyHeight: PropTypes.number,
    headerSize: PropTypes.number,
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
    scrollViewOffset: PropTypes.number,
    scrollRef: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    allText: {
        color: '#fff',
        fontFamily: 'Poppins_500Medium',
    },
    contactOption: {
        fontFamily: 'Poppins_600SemiBold',
    },
});

export default React.memo(Contact);
