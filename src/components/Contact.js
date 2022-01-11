import React from 'react';
import { StyleSheet, View } from 'react-native';
import ContactForm from '../components/ContactForm';
import PropTypes from 'prop-types';

function Contact({ margin, fontFactor, scrollRef }) {
    return (
        <View
            style={[
                styles.container,
                {
                    paddingHorizontal: margin,
                    flexGrow: 1,
                },
            ]}
        >
            <ContactForm fontFactor={fontFactor} scrollRef={scrollRef} />
        </View>
    );
}

Contact.propTypes = {
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
