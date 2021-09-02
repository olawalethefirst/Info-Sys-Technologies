import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AboutMiniSVG from './AboutMiniSVG';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useFonts } from '@expo-google-fonts/poppins';
import Poppins_600SemiBold from '@expo-google-fonts/poppins/Poppins_600SemiBold.ttf';
import Karla_400Regular from '@expo-google-fonts/karla/Karla_400Regular.ttf';
import MarginVertical from './MarginVertical';

function AboutMini({ bodyHeight, fontFactor, margin, deviceWidthClass }) {
    const [loaded] = useFonts({
        Poppins_600SemiBold,
        Karla_400Regular,
    });
    const columnMode = deviceWidthClass === 'type1' ? true : false;

    if (!loaded) {
        return <View />;
    }

    return (
        <View
            style={[
                { minHeight: bodyHeight, paddingHorizontal: margin },
                styles.container,
                columnMode && styles.containerColumnMode,
            ]}
        >
            <View
                style={[
                    styles.contentContainer1,
                    columnMode && styles.contentContainer1ColumnMode,
                ]}
            >
                <MarginVertical size={2} />
                <AboutMiniSVG width={columnMode ? wp(80) / 2 : wp(80)} />
                <MarginVertical size={1} />
            </View>
            <View
                style={[
                    styles.contentContainer2,
                    columnMode && styles.contentContainer2ColumnMode,
                ]}
            >
                <MarginVertical size={1} />
                <Text
                    style={[
                        styles.heading,
                        {
                            fontSize: fontFactor * wp(9.2),
                            lineHeight: fontFactor * wp(11.7),
                        },
                    ]}
                >
                    Who are we?
                </Text>
                <MarginVertical size={1} />
                <Text
                    style={[
                        styles.paragraph,
                        {
                            fontSize: fontFactor * wp(6),
                            lineHeight: fontFactor * wp(7.7),
                        },
                    ]}
                >
                    Info-Sys Technologies was founded in the year 2002 by Mr.
                    G.A Bashiru. The company started as an ICT training
                    institute, but has expanded its services over the years into
                    consultations, proffering high quality solutions in
                    accounting and information Technology areas amongst other
                    services.
                </Text>
                <MarginVertical size={1} />
                <TouchableOpacity
                    style={[styles.button, { padding: fontFactor * wp(3.5) }]}
                    onPress={() => console.log('pressed')}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            { fontSize: fontFactor * wp(3.85) },
                        ]}
                    >
                        Read more
                    </Text>
                </TouchableOpacity>
                <MarginVertical size={2} />
            </View>
        </View>
    );
}

AboutMini.propTypes = {
    bodyHeight: PropTypes.number,
    fontFactor: PropTypes.number,
    margin: PropTypes.number,
    deviceWidthClass: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7F7',
    },
    containerColumnMode: {
        flexDirection: 'row',
    },
    contentContainer1: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer2: {
        justifyContent: 'center',
    },
    contentContainer1ColumnMode: {
        flex: 1,
    },
    contentContainer2ColumnMode: {
        flex: 1,
    },
    heading: {
        color: '#161B26',
        fontFamily: 'Poppins_600SemiBold',
    },
    paragraph: {
        color: '#161B26',
        fontFamily: 'Karla_400Regular',
    },
    button: {
        backgroundColor: '#1A91D7',
        alignItems: 'center',
        // alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Poppins_600SemiBold',
    },
});

const mapStateToProps = (state) => ({
    bodyHeight: state.settingsState.bodyHeight,
    fontFactor: state.settingsState.fontFactor,
    margin: state.settingsState.margin,
    deviceWidthClass: state.settingsState.deviceWidthClass,
});

export default connect(mapStateToProps)(AboutMini);
