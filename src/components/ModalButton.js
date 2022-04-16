import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

function ModalButton({ fontFactor, text, submit, onPress, disabled }) {
    const styles2 = {
        text: {
            color: submit ? '#fff' : 'red',
            fontSize: fontFactor * wp(4.5),
            lineHeight: fontFactor * wp(5.72),
            // opacity: disabled ? 0.5 : 1,
        },
        container: {
            backgroundColor: submit ? '#1A91D7' : '#ddd',
            padding: wp(2.2) * fontFactor,
            borderRadius: wp(1.35) * fontFactor,
            marginBottom: wp(2.2) * fontFactor,
            minHeight: wp(10.12) * fontFactor,
        },
    };

    return (
        <TouchableOpacity
            style={[styles.container, styles2.container]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[styles.text, styles2.text]}>{text}</Text>
        </TouchableOpacity>
    );
}

ModalButton.propTypes = {
    fontFactor: PropTypes.number,
    text: PropTypes.string,
    submit: PropTypes.bool,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
    text: { textAlign: 'center', fontFamily: 'Karla_400Regular' },
    container: {
        width: '100%',
        justifyContent: 'center',
    },
});

const mapStateToProps = ({ settingsState: { fontFactor } }) => ({ fontFactor });

export default connect(mapStateToProps)(ModalButton);
