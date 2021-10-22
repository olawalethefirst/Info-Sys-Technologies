import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ServiceTemplate from './ServiceTemplate';
import CAIcon from './CAIcon';
import FBPIcon from './FBPIcon';
import ASFMIcon from './ASFMIcon';
import ITIcon from './ITIcon';
import MTDIcon from './MTDIcon';
import FAMIcon from './FAMIcon';
import ICCAIcon from './ICCAIcon';
import checkColumnMode from '../helperFunctions/checkColumnMode';
import {
    generalInformationTechnologyConsulting,
    accountingSoftwareAndFinancialManagementSystem,
    internalControlAndComplianceAudit,
    fixedAssetsManagement,
    feasibilityAndBusinessPlanning,
    technologyAndManagementDevelopmentTraining,
    cloudAccounting,
} from '../serviceDetails';

function ServicesMini({ margin, fontFactor, deviceWidthClass }) {
    const columnMode = checkColumnMode(deviceWidthClass);

    return (
        <View style={[styles.container, { paddingHorizontal: margin }]}>
            <MarginVertical size={4} />
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
                <MarginVertical />
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

            <View style={[columnMode && styles.servicePairContainerColumnMode]}>
                <ServiceTemplate
                    columnMode={columnMode}
                    fontFactor={fontFactor}
                    serviceTitle={`Cloud Accounting`}
                    serviceBody={cloudAccounting}
                >
                    <CAIcon />
                </ServiceTemplate>
                {!columnMode && <MarginVertical size={2} />}
                {columnMode && <View style={{ flex: 0.1 }} />}
                <ServiceTemplate
                    columnMode={columnMode}
                    fontFactor={fontFactor}
                    serviceTitle={`Technology & Management\nDevelopment Training`}
                    serviceBody={technologyAndManagementDevelopmentTraining}
                >
                    <MTDIcon />
                </ServiceTemplate>
            </View>
            <MarginVertical size={2} />

            <View style={[columnMode && styles.servicePairContainerColumnMode]}>
                <ServiceTemplate
                    columnMode={columnMode}
                    fontFactor={fontFactor}
                    serviceTitle={`Feasibility &\nBusiness Planning`}
                    serviceBody={feasibilityAndBusinessPlanning}
                >
                    <FBPIcon />
                </ServiceTemplate>
                {!columnMode && <MarginVertical size={2} />}
                {columnMode && <View style={{ flex: 0.1 }} />}
                <ServiceTemplate
                    columnMode={columnMode}
                    fontFactor={fontFactor}
                    serviceTitle={`Accounting Software &\nFinancial Management`}
                    serviceBody={accountingSoftwareAndFinancialManagementSystem}
                >
                    <ASFMIcon />
                </ServiceTemplate>
            </View>
            <MarginVertical size={2} />

            <View style={[columnMode && styles.servicePairContainerColumnMode]}>
                <ServiceTemplate
                    columnMode={columnMode}
                    fontFactor={fontFactor}
                    serviceTitle={`Fixed Assets \nManagement (FAM)`}
                    serviceBody={fixedAssetsManagement}
                >
                    <FAMIcon />
                </ServiceTemplate>
                {!columnMode && <MarginVertical size={2} />}
                {columnMode && <View style={{ flex: 0.1 }} />}
                <ServiceTemplate
                    columnMode={columnMode}
                    fontFactor={fontFactor}
                    serviceTitle={`Internal Control &\nCompliance Audit`}
                    serviceBody={internalControlAndComplianceAudit}
                >
                    <ICCAIcon />
                </ServiceTemplate>
            </View>
            <MarginVertical size={2} />

            <View style={[columnMode && styles.servicePairContainerColumnMode]}>
                <ServiceTemplate
                    columnMode={columnMode}
                    fontFactor={fontFactor}
                    serviceTitle={`General Information\nTechnology Consulting`}
                    serviceBody={generalInformationTechnologyConsulting}
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
            <MarginVertical size={4} />
        </View>
    );
}

ServicesMini.propTypes = {
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
    deviceWidthClass: PropTypes.string,
};

export default React.memo(ServicesMini);

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
