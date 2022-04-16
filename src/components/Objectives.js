import React from 'react';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MarginVertical from './MarginVertical';
import PropTypes from 'prop-types';

function Objectives({ fontFactor, margin, columnMode }) {
    const isWeb = Platform.OS === 'web';

    return (
        <View
            style={[
                {
                    paddingHorizontal: margin,
                },
            ]}
        >
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
                        Objective
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
                        Our objective is to exceed your service expectations, to
                        empower you with management and financial information
                        tools thereby enabling you to keep abreast of current
                        facts and plan better for the future. To help us achieve
                        this, our team comprise of people who offer a broad
                        range of skills that will benefit your company.
                    </Text>
                </View>
                {!columnMode && <MarginVertical size={2} />}
                {columnMode && <View style={{ flex: 0.1 }} />}
                <View style={columnMode && styles.columnElement}>
                    <Image
                        style={{
                            width: '100%',
                            height: isWeb ? '100%' : undefined,
                            aspectRatio: 749 / 661,
                        }}
                        //eslint-disable-next-line no-undef
                        source={require('../../assets/images/image3.webp')}
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
                                aspectRatio: 819 / 663,
                            }}
                            //eslint-disable-next-line no-undef
                            source={require('../../assets/images/image4.webp')}
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
                        How we do it
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
                        We work collaboratively with clients to ensure that
                        their business and online objectives are met by our
                        digital strategies and financial solutions. It is an
                        iterative process, with intelligent insight, automated
                        systems that will improve operation efficiently and aid
                        management decision making, on-site experience and
                        technology.
                    </Text>
                </View>
                {!columnMode && <MarginVertical size={2} />}
                {!columnMode && (
                    <View style={columnMode && styles.columnElement}>
                        <Image
                            style={{
                                width: '100%',
                                height: isWeb ? '100%' : undefined,
                                aspectRatio: 819 / 663,
                            }}
                            //eslint-disable-next-line no-undef
                            source={require('../../assets/images/image4.webp')}
                            resizeMode="contain"
                        />
                    </View>
                )}
            </View>
            <MarginVertical size={2} />
        </View>
    );
}

Objectives.propTypes = {
    fontFactor: PropTypes.number,
    margin: PropTypes.number,
    columnMode: PropTypes.bool,
};

export default React.memo(Objectives);

const styles = StyleSheet.create({
    columnContainer: {
        flexDirection: 'row',
    },
    columnElement: {
        flex: 1,
        justifyContent: 'center',
    },
    heading: {
        fontFamily: 'Poppins_600SemiBold',
    },
    paragraph: {
        fontFamily: 'Karla_400Regular',
    },
});
