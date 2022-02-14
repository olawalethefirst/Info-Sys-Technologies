import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import checkColumnMode from '../helperFunctions/checkColumnMode';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MarginVertical from './MarginVertical';

function CommentsHeading({ fontFactor, deviceWidthClass, margin }) {
    const columnMode = checkColumnMode(deviceWidthClass);

    return (
        <View
            style={{
                borderBottomWidth: wp(0.25),
                borderBottomColor: '#cecece',
                marginHorizontal: margin,
            }}
        >
            <View
                style={{
                    width: columnMode ? '90%' : '100%',
                    alignSelf: 'center',
                }}
            >
                <View style={{}}>
                    <Text
                        style={{
                            fontSize: fontFactor * wp(6),
                            lineHeight: fontFactor * wp(7.7),
                            fontFamily: 'Poppins_500Medium',
                            textAlign: 'left',
                        }}
                    >
                        Comments
                    </Text>
                </View>
                <MarginVertical />
            </View>
        </View>
    );
}

const mapStateToProps = ({
    settingsState: { fontFactor, deviceWidthClass, margin },
}) => ({
    fontFactor,
    deviceWidthClass,
    margin,
});

export default connect(mapStateToProps)(CommentsHeading);
