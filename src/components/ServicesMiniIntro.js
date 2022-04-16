import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

function ServicesMini({ margin, fontFactor}) {
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
        </View>
    );
}

ServicesMini.propTypes = {
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
};

export default React.memo(ServicesMini);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#161B26',
    },
    heading: {
        color: '#fff',
        fontFamily: 'Poppins_600SemiBold',
    },
    paragraph: {
        color: '#fff',
        fontFamily: 'Karla_400Regular',
    },
});
