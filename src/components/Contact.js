import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Platform,
    ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ModalSelector from 'react-native-modal-selector';
import ContactForm from '../components/ContactForm';
import PropTypes from 'prop-types';

function Contact({ bodyHeight, headerSize, margin, fontFactor }) {
    const { statusBarHeight } = Constants;
    const styles2 = {
        paragraph: {
            fontSize: fontFactor * wp(4.55),
            lineHeight: fontFactor * wp(5.78),
        },
        contactOption: {
            fontSize: fontFactor * wp(4.55),
            lineHeight: fontFactor * wp(5.78),
            color: '#fff',
            backgroundColor: '#1A91D7',
            textAlign: 'center',
            padding: fontFactor * wp(4.55),
        },
    };
    const [contactOption, setContactOption] = useState(null);
    let contactOptionReference = 0;
    const contactOptionData = [
        {
            key: contactOptionReference++,
            label: 'Hire Us',
        },
        {
            key: contactOptionReference++,
            label: 'Inquiry',
        },
    ];

    return (
        <ScrollView
            contentContainerStyle={[
                styles.container,
                {
                    minHeight: bodyHeight - headerSize + statusBarHeight,
                    paddingHorizontal: margin,
                },
            ]}
        >
            <MarginVertical size={2} />
            <Text style={[styles.allText, styles2.paragraph]}>
                Do you want to get in touch or hire us ?
            </Text>
            <MarginVertical />
            <ModalSelector
                data={contactOptionData}
                supportedOrientations={['portrait']}
                accessible
                scrollViewAccessibilityLabel={'Scrollable options'}
                cancelButtonAccessibilityLabel={'Cancel Button'}
                onChange={(option) => setContactOption(option.label)}
                overlayStyle={{
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    marginTop: Platform.select({
                        ios: statusBarHeight,
                        android: 0,
                    }),
                }}
                backdropPressToClose={true}
                optionTextStyle={{ color: 'black' }}
                cancelTextStyle={{ color: 'red' }}
            >
                <TextInput
                    style={[styles.contactOption, styles2.contactOption]}
                    placeholder="Select Option"
                    placeholderTextColor="#fff"
                    editable={false}
                    value={contactOption}
                />
            </ModalSelector>
            <ContactForm
                fontFactor={fontFactor}
                contactOption={contactOption}
            />
        </ScrollView>
    );
}

Contact.propTypes = {
    bodyHeight: PropTypes.number,
    headerSize: PropTypes.number,
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
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
