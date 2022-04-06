import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import processErrorString from '../helperFunctions/processErrorString';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

const RetryLoad = ({ onRetry, error, fontFactor }) => {
    const styles2 = StyleSheet.create({
        container: {
            paddingVertical: wp(2.2) * fontFactor,
        },
        fontSizeL1: { fontSize: fontFactor * wp(4) },
        fontSizeL2: { fontSize: fontFactor * wp(5) },
    });

    return (
        <View style={styles2.container}>
            <Text
                style={[
                    styles2.fontSizeL2,
                    styles.karla500Font,
                    styles.alignTextCenter,
                ]}
            >
                {processErrorString(error)}
            </Text>
            <MarginVertical size={0.2} />
            {
                <TouchableOpacity activeOpacity={0.7} onPress={onRetry}>
                    <Text
                        style={[
                            styles2.fontSizeL1,
                            styles.poppins400Font,
                            styles.alignTextCenter,
                            styles.fontColor808080,
                        ]}
                    >
                        Retry
                    </Text>
                </TouchableOpacity>
            }
        </View>
    );
};

RetryLoad.propTypes = {
    onRetry: PropTypes.func,
    error: PropTypes.string,
    fontFactor: PropTypes.number,
};

export default RetryLoad;

const styles = StyleSheet.create({
    alignTextCenter: { textAlign: 'center' },
    karla500Font: { fontFamily: 'Karla_500Medium' },
    poppins400Font: { fontFamily: 'Poppins_400Regular' },
    fontColor808080: { color: '#808080' },
});
