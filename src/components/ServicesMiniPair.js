import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import MarginVertical from './MarginVertical';
import ServiceTemplate from './ServiceTemplate';
import ServicesMiniIcon from './ServicesMiniIcon';
import { connect } from 'react-redux';

function ServicesMiniPair({ margin, fontFactor, data1, data2, spacing }) {
    return (
        <View style={[styles.container, { paddingHorizontal: margin }]}>
            <View style={[styles.servicePairContainerColumnMode]}>
                <ServiceTemplate
                    fontFactor={fontFactor}
                    serviceTitle={data1.title}
                    serviceBody={data1.body}
                    index={data1.index}
                >
                    <ServicesMiniIcon type={data1.title} />
                </ServiceTemplate>
                <View style={{ flex: 0.1 }} />
                {data2 ? (
                    <ServiceTemplate
                        fontFactor={fontFactor}
                        serviceTitle={data2.title}
                        serviceBody={data2.body}
                        index={data2.index}
                    >
                        <ServicesMiniIcon type={data2.title} />
                    </ServiceTemplate>
                ) : (
                    <View
                        style={[
                            styles.servicePairContainer,
                            // {
                            //     paddingHorizontal: 30,
                            //     paddingTop: 30,
                            //     paddingBottom: 20,
                            // },
                        ]}
                    />
                )}
            </View>
            <MarginVertical size={spacing} />
        </View>
    );
}

ServicesMiniPair.propTypes = {
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
    deviceWidthClass: PropTypes.string,
    data1: PropTypes.object,
    data2: PropTypes.object,
    spacing: PropTypes.number,
};

const mapStateToProps = ({ settingsState: { margin, fontFactor } }) => ({
    margin,
    fontFactor,
});

const ConnectedServicesMiniPair = connect(mapStateToProps)(ServicesMiniPair);

export default React.memo(ConnectedServicesMiniPair);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#161B26',
    },
    servicePairContainer: {
        flex: 1,
    },
    servicePairContainerColumnMode: {
        flexDirection: 'row',
    },
});
