import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import MarginVertical from './MarginVertical';
import ServiceTemplate from './ServiceTemplate';
import { connect } from 'react-redux';

function ServicesMini({
    margin,
    fontFactor,
    data: { title, body, index },
    spacing,
}) {
    return (
        <View style={[styles.container, { paddingHorizontal: margin, }]}>
            <ServiceTemplate
                fontFactor={fontFactor}
                title={title}
                body={body}
                index={index}
            />
            <MarginVertical size={spacing} />
        </View>
    );
}

ServicesMini.propTypes = {
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
    data: PropTypes.object,
    spacing: PropTypes.number,
};

const mapStateToProps = ({ settingsState: { margin, fontFactor } }) => ({
    margin,
    fontFactor,
});

const ConnectedServicesMini = connect(mapStateToProps)(ServicesMini);

export default React.memo(ConnectedServicesMini);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#161B26',
    },
});
