import React from 'react';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MarginVertical from './MarginVertical';
import PropTypes from 'prop-types';

function VisionAndMission({ fontFactor, margin, columnMode }) {
    const isWeb = Platform.OS === 'web';

    return (
        <View
            style={[
                styles.container,
                {
                    paddingHorizontal: margin,
                },
            ]}
        >
            <MarginVertical size={2} />
            <View style={[columnMode && styles.columnContainer]}>
                {columnMode && (
                    <View style={[columnMode && styles.columnElement]}>
                        <Image
                            style={{
                                width: '100%',
                                height: isWeb ? '100%' : undefined,
                                aspectRatio: 800 / 688,
                            }}
                            // eslint-disable-next-line no-undef
                            source={require('../../assets/images/image2.png')}
                            resizeMode="contain"
                        />
                    </View>
                )}
                {columnMode && <View style={{ flex: 0.1 }} />}
                <View style={[columnMode && styles.columnElement]}>
                    <Text
                        style={[
                            styles.heading,
                            {
                                fontSize: fontFactor * wp(6),
                                lineHeight: fontFactor * wp(7.7),
                            },
                        ]}
                    >
                        Vision
                    </Text>
                    <MarginVertical size={1} />
                    <Text
                        style={[
                            styles.paragraph,
                            {
                                fontSize: fontFactor * wp(5),
                                lineHeight: fontFactor * wp(6.36),
                            },
                        ]}
                    >
                        Our vision is to maximize the overall productivity of
                        Nigerian businesses, one solution at a time.
                    </Text>
                    <MarginVertical size={2} />
                    <Text
                        style={[
                            styles.heading,
                            {
                                fontSize: fontFactor * wp(6),
                                lineHeight: fontFactor * wp(7.7),
                            },
                        ]}
                    >
                        Mision
                    </Text>
                    <MarginVertical size={1} />
                    <Text
                        style={[
                            styles.paragraph,
                            {
                                fontSize: fontFactor * wp(5),
                                lineHeight: fontFactor * wp(6.36),
                            },
                        ]}
                    >
                        Our Mision is to offer not only a quality service but to
                        understand your business and the issues facing it to
                        provide unique solutions that will transform the
                        profitability margin to the highest attainable value.
                    </Text>
                </View>
                {!columnMode && <MarginVertical size={2} />}
                {!columnMode && (
                    <View style={[columnMode && styles.columnElement]}>
                        <Image
                            style={{
                                width: '100%',
                                height: isWeb ? '100%' : undefined,
                                aspectRatio: 693 / 688,
                            }}
                            // eslint-disable-next-line no-undef
                            source={require('../../assets/images/image2.png')}
                            resizeMode="contain"
                        />
                    </View>
                )}
            </View>

            <MarginVertical size={3} />
        </View>
    );
}

VisionAndMission.propTypes = {
    fontFactor: PropTypes.number,
    margin: PropTypes.number,
    columnMode: PropTypes.bool,
};

export default React.memo(VisionAndMission);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#161B26',
    },
    columnContainer: {
        flexDirection: 'row',
    },
    columnElement: {
        flex: 1,
        justifyContent: 'center',
    },
    heading: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#fff',
    },
    paragraph: {
        fontFamily: 'Karla_400Regular',
        color: '#fff',
    },
});
