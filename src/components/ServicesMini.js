import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useFonts } from '@expo-google-fonts/poppins';
import Poppins_600SemiBold from '@expo-google-fonts/poppins/Poppins_600SemiBold.ttf';
import Karla_400Regular from '@expo-google-fonts/karla/Karla_400Regular.ttf';
import ServiceTemplate from './ServiceTemplate';
import ACIcon from './ACIcon';
import FBPIcon from './FBPIcon';
import FMSIcon from './FMSIcon';
import ITIcon from './ITIcon';
import MTDIcon from './MTDIcon';
import checkColumnMode from '../helperFunctions/checkColumnMode';

function ServicesMini({ margin, fontFactor, deviceWidthClass, bodyHeight }) {
    const [loaded] = useFonts({
        Poppins_600SemiBold,
        Karla_400Regular,
    });

    const columnMode = checkColumnMode(deviceWidthClass);

    if (!loaded) {
        return <View />;
    }

    return (
        <View
            style={[
                styles.container,
                { minHeight: bodyHeight, paddingHorizontal: margin },
            ]}
        >
            <MarginVertical size={3} />
            <View style={[]}>
                <Text
                    style={[
                        styles.heading,
                        {
                            fontSize: fontFactor * wp(9.2),
                            lineHeight: fontFactor * wp(11.7),
                        },
                    ]}
                >
                    Services
                </Text>
                <MarginVertical size={0.5} />
                <Text
                    style={[
                        styles.paragraph,
                        {
                            fontSize: fontFactor * wp(6),
                            lineHeight: fontFactor * wp(7.6),
                        },
                    ]}
                >
                    From Financial Management solutions, to Information
                    Technology services, Management Training to Feasibility
                    planning or Accounting Services; We execute every project
                    brilliantly.
                </Text>
            </View>
            <MarginVertical size={3} />

            <View
                style={[
                    styles.servicePairContainer,
                    columnMode && styles.servicePairContainerColumnMode,
                ]}
            >
                <ServiceTemplate
                    columnMode={columnMode}
                    fontFactor={fontFactor}
                    serviceTitle={`Accounting\nConsultation`}
                    serviceBody=""
                >
                    <ACIcon />
                </ServiceTemplate>
                {!columnMode && <MarginVertical size={3} />}
                {columnMode && <View style={{ flex: 0.1 }} />}
                <ServiceTemplate
                    columnMode={columnMode}
                    fontFactor={fontFactor}
                    serviceTitle={`Management Training\n& Development`}
                    serviceBody=""
                >
                    <MTDIcon />
                </ServiceTemplate>
            </View>
            <MarginVertical size={3} />

            <View
                style={[
                    styles.servicePairContainer,
                    columnMode && styles.servicePairContainerColumnMode,
                ]}
            >
                <ServiceTemplate
                    columnMode={columnMode}
                    fontFactor={fontFactor}
                    serviceTitle={`Feasibility &\nBusiness Planning`}
                    serviceBody=""
                >
                    <FBPIcon />
                </ServiceTemplate>
                {!columnMode && <MarginVertical size={3} />}
                {columnMode && <View style={{ flex: 0.1 }} />}
                <ServiceTemplate
                    columnMode={columnMode}
                    fontFactor={fontFactor}
                    serviceTitle={`Financial Management\nSoftware Consultation`}
                    serviceBody=""
                >
                    <FMSIcon />
                </ServiceTemplate>
            </View>
            <MarginVertical size={3} />

            <View
                style={[
                    styles.servicePairContainer,
                    columnMode && styles.servicePairContainerColumnMode,
                ]}
            >
                <ServiceTemplate
                    columnMode={columnMode}
                    fontFactor={fontFactor}
                    serviceTitle={`Information Technology\n& Business Consultation`}
                    serviceBody=""
                >
                    <ITIcon />
                </ServiceTemplate>
                {columnMode && <View style={{ flex: 0.1 }} />}
                <View
                    style={[
                        styles.servicePairContainer,
                        columnMode && { flex: 1 },
                        {
                            paddingHorizontal: 30,
                            paddingTop: 30,
                            paddingBottom: 20,
                        },
                    ]}
                />
            </View>
            <MarginVertical size={3} />
        </View>
    );
}

ServicesMini.propTypes = {
    margin: PropTypes.number,
    bodyHeight: PropTypes.number,
    fontFactor: PropTypes.number,
    deviceWidthClass: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#161B26',
    },
    servicePairContainer: {
        // flex: 1,
    },
    servicePairContainerColumnMode: {
        flexDirection: 'row',
    },
    contentContainer1: {},
    contentContainer2: {},
    contentContainer2ColumnMode: {},
    heading: {
        color: '#fff',
        fontFamily: 'Poppins_600SemiBold',
    },
    paragraph: {
        color: '#fff',
        fontFamily: 'Karla_400Regular',
    },
});

const mapStateToProps = (state) => ({
    margin: state.settingsState.margin,
    fontFactor: state.settingsState.fontFactor,
    deviceWidthClass: state.settingsState.deviceWidthClass,
    bodyHeight: state.settingsState.bodyHeight,
});

export default connect(mapStateToProps)(ServicesMini);