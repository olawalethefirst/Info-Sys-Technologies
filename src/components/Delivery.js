/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MarginVertical from './MarginVertical';
import PropTypes from 'prop-types';

function Delivery({ fontFactor, margin, columnMode }) {
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
            <Text
                style={[
                    styles.heading,
                    {
                        fontSize: fontFactor * wp(6),
                        lineHeight: fontFactor * wp(7.7),
                    },
                ]}
            >
                Delivery
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
                We deliver measurable business value in 3 ways:
            </Text>
            <MarginVertical size={2} />
            <View style={columnMode && styles.columnContainer}>
                <View style={columnMode && styles.columnElement}>
                    <Text
                        style={[
                            styles.heading,
                            {
                                fontSize: fontFactor * wp(6),
                                lineHeight: fontFactor * wp(7.7),
                            },
                        ]}
                    >
                        Higher Competitive Edge
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
                        We transform the fundamental shape of your business by
                        adhering to best-practiced process of delivering value.
                        You will save money by reducing man-hours spent in
                        preparing accounts and generating management reports
                        manually. Saved time can be invested in more strategic
                        and conceptual thinking. These benefits will impact the
                        organizations' bottom line and competitive edges.
                    </Text>
                </View>
                {!columnMode && <MarginVertical size={2} />}
                {columnMode && <View style={{ flex: 0.1 }} />}
                <View style={columnMode && styles.columnElement}>
                    <Image
                        style={{
                            width: '100%',
                            height: isWeb ? '100%' : undefined,
                            aspectRatio: 941 / 780,
                        }}
                        //eslint-disable-next-line no-undef
                        source={require('../../assets/images/image5.webp')}
                        resizeMode="contain"
                    />
                </View>
            </View>
            <MarginVertical size={2} />

            <View style={columnMode && styles.columnContainer}>
                {columnMode && (
                    <View style={columnMode && styles.columnElement}>
                        <Image
                            style={{
                                width: '100%',
                                height: isWeb ? '100%' : undefined,
                                aspectRatio: 1024 / 682,
                            }}
                            //eslint-disable-next-line no-undef
                            source={require('../../assets/images/image6.webp')}
                            resizeMode="contain"
                        />
                    </View>
                )}
                {columnMode && <View style={{ flex: 0.1 }} />}
                <View style={columnMode && styles.columnElement}>
                    <Text
                        style={[
                            styles.heading,
                            {
                                fontSize: fontFactor * wp(6),
                                lineHeight: fontFactor * wp(7.7),
                            },
                        ]}
                    >
                        Better Financial Controls
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
                        We provide systems that will improve controls in
                        financial transaction procedures. This also saves
                        organizations a lot of money that may be lost due to
                        inadequate controls.
                    </Text>
                </View>
                {!columnMode && <MarginVertical size={2} />}
                {!columnMode && (
                    <View style={columnMode && styles.columnElement}>
                        <Image
                            style={{
                                width: '100%',
                                height: isWeb ? '100%' : undefined,
                                aspectRatio: 1024 / 682,
                            }}
                            //eslint-disable-next-line no-undef
                            source={require('../../assets/images/image6.webp')}
                            resizeMode="contain"
                        />
                    </View>
                )}
            </View>
            <MarginVertical size={2} />
            <View style={columnMode && styles.columnContainer}>
                <View style={columnMode && styles.columnElement}>
                    <Text
                        style={[
                            styles.heading,
                            {
                                fontSize: fontFactor * wp(6),
                                lineHeight: fontFactor * wp(7.7),
                            },
                        ]}
                    >
                        Innovation
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
                        We can inject a level of product and service innovation
                        into your business to create new revenue opportunities
                        through collaboration and co-creation. We keep abreast
                        of the latest technology and how it applies to your
                        business issues. What you get from us is best-of-breed
                        solutions.
                    </Text>
                </View>
                {!columnMode && <MarginVertical size={2} />}
                {columnMode && <View style={{ flex: 0.1 }} />}
                <View style={columnMode && styles.columnElement}>
                    <Image
                        style={{
                            width: '100%',
                            height: isWeb ? '100%' : undefined,
                            aspectRatio: 822 / 679,
                        }}
                        //eslint-disable-next-line no-undef
                        source={require('../../assets/images/image7.webp')}
                        resizeMode="contain"
                    />
                </View>
            </View>
            <MarginVertical size={2} />
        </View>
    );
}

Delivery.propTypes = {
    fontFactor: PropTypes.number,
    margin: PropTypes.number,
    columnMode: PropTypes.bool,
};

export default React.memo(Delivery);

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
