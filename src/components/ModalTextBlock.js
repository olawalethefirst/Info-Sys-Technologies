import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

function ModalTextBlock({ fontFactor, text, color }) {
    const styles2 = StyleSheet.create({
        text: {
            fontSize: fontFactor * wp(4.5),
            lineHeight: fontFactor * wp(5.72),
            color: color,
            textShadowColor: color,
        },
        container: {
            paddingVertical: wp(2.2) * fontFactor,
            marginBottom: wp(2.2) * fontFactor,
        },
    });
    
    return (
        <View style={styles2.container}>
            <Text style={[styles.text, styles2.text]}>{text}</Text>
        </View>
    );
}

ModalTextBlock.propTypes = {
    fontFactor: PropTypes.number,
    text: PropTypes.string,
    color: PropTypes.string,
};

ModalTextBlock.defaultProps = {
    color: '#fff',
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Karla_500Medium',
        textAlign: 'center',

        textShadowOffset: {
            width: 0.1,
            height: 0.1,
        },
        textShadowRadius: 0.1,
    },
});

const mapStateToProps = ({ settingsState: { fontFactor } }) => ({ fontFactor });

export default connect(mapStateToProps)(ModalTextBlock);
