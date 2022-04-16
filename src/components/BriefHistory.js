import React from 'react';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MarginVertical from './MarginVertical';
import PropTypes from 'prop-types';

function BriefHistory({ fontFactor, margin, columnMode }) {
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
                        Brief History
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
                        Info-Sys Technologies was founded in the year 2002 by
                        Mr. G.A Bashiru. The company started as an ICT training
                        institute, but has since expanded its services over the
                        years into consultations, proffering high quality
                        solutions in accounting and information Technology areas
                        amongst other services.
                    </Text>
                </View>
                {!columnMode && <MarginVertical size={2} />}
                {columnMode && <View style={{ flex: 0.1 }} />}
                <View style={[columnMode && styles.columnElement]}>
                    <Image
                        // eslint-disable-next-line no-undef
                        source={require('../../assets/images/image1.webp')}
                        style={{
                            width: '100%',
                            height: isWeb ? '100%' : undefined,
                            aspectRatio: 1920 / 1280,
                        }}
                        resizeMode="contain"
                    />
                </View>
            </View>

            {<MarginVertical size={3} />}
        </View>
    );
}

BriefHistory.propTypes = {
    fontFactor: PropTypes.number,
    margin: PropTypes.number,
    columnMode: PropTypes.bool,
};

export default React.memo(BriefHistory);

const styles = StyleSheet.create({
    container: {},
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
