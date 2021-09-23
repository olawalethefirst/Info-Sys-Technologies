import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Constants from 'expo-constants';
import MarginVertical from './MarginVertical';
import {
    Poppins_500Medium,
    Poppins_600SemiBold,
    useFonts,
} from '@expo-google-fonts/poppins';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ModalSelector from 'react-native-modal-selector';
import ContactForm from '../components/ContactForm';

export default function Contact({
    bodyHeight,
    headerSize,
    margin,
    fontFactor,
}) {
    const { statusBarHeight } = Constants;
    const [loaded] = useFonts({
        Poppins_500Medium,
        Poppins_600SemiBold,
    });
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

    if (!loaded) {
        return null;
    }

    return (
        <View
            style={[
                styles.container,
                {
                    minHeight: bodyHeight - 2 * headerSize + statusBarHeight,
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
                overlayStyle={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
                backdropPressToClose={true}
                optionTextStyle={{ color: 'black' }}
                cancelTextStyle={{ color: 'red' }}
            >
                <TextInput
                    style={[styles.contactOption, styles2.contactOption]}
                    placeholder="Select Option"
                    placeholderTextColor="#404040"
                    editable={false}
                    value={contactOption}
                />
            </ModalSelector>
            <ContactForm
                fontFactor={fontFactor}
                hireUs={contactOption === 'Hire Us'}
                inquiry={contactOption === 'Inquiry'}
            />
        </View>
    );
}

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
