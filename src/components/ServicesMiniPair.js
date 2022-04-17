import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import MarginVertical from './MarginVertical';
import ServiceTemplate from './ServiceTemplate';
import { connect } from 'react-redux';

function ServicesMiniPair({ margin, fontFactor, data1, data2, spacing }) {
    return (
        <View style={[styles.container, { paddingHorizontal: margin }]}>
            <View style={[styles.servicePairContainerColumnMode]}>
                <ServiceTemplate
                    fontFactor={fontFactor}
                    title={data1.title}
                    body={data1.body}
                    index={data1.index}
                />
                <View style={{ flex: 0.1 }} />
                {data2 ? (
                    <ServiceTemplate
                        fontFactor={fontFactor}
                        title={data2.title}
                        body={data2.body}
                        index={data2.index}
                    />
                ) : (
                    <View style={[styles.servicePairContainer]} />
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
