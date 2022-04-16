import React from 'react';
import {
    StyleSheet,
    Text,
    ImageBackground,
    Animated,
    // TouchableOpacity,
    View,
    TouchableNativeFeedback 
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { stickyHeaderHeight } from '../constants';
import { TouchableOpacity} from 'react-native-gesture-handler'

const SecondaryHeader = ({
    deeplyNestedScreen,
    heading,
    headerSize,
    margin,
    translateY,
}) => {
    const AnimatedImageBackground =
        Animated.createAnimatedComponent(ImageBackground);
    const navigation = useNavigation();
    const styles2 = StyleSheet.create({
        widthHeaderSize: {
            width: headerSize,
        },
        paddingHorizontalMargin: {
            paddingHorizontal: margin,
        },
        translateY: {
            transform: [
                {
                    translateY,
                },
            ],
        },
    });

    return (
        <AnimatedImageBackground
            //eslint-disable-next-line no-undef
            source={require('../../assets/images/background2.webp')}
            resizeMode="cover"
            style={[
                styles.header,
                translateY && styles.absolute000,
                styles.stickyHeaderHeight,
                styles2.paddingHorizontalMargin,
                styles.backgroundColor161B26,
                translateY && styles2.translateY,
                deeplyNestedScreen && styles.flexDirectionRow,
                deeplyNestedScreen && styles.justifyContentFlexStart,
                deeplyNestedScreen && styles.alignItemsCenter,
               
            ]}
        >
            {deeplyNestedScreen && (
                <TouchableOpacity 
                    style={[
                        styles.height100Perc,
                        styles.justifyContentCenter,
                        styles2.widthHeaderSize,
                        {zIndex: 10000000000}
                    ]}
                    onPress={navigation.goBack}
                >
                    <Text
                        style={[
                            styles.fontColorFff,
                            styles.poppins500Font,
                            styles.fontSizeL1,
                        ]}
                    >
                        <AntDesignIcon
                            name="arrowleft"
                            size={25}
                            color="#fff"
                        />
                    </Text>
                </TouchableOpacity>
            )}
            <View style={[styles.justifyContentCenter, styles.height100Perc]}>
                <Text
                    style={[
                        deeplyNestedScreen
                            ? styles.fontSizeL1
                            : styles.fontSizeL2,
                        styles.fontColorFff,
                        deeplyNestedScreen
                            ? styles.poppins500Font
                            : styles.poppins600Font,
                    ]}
                >
                    {heading}
                </Text>
            </View>
        </AnimatedImageBackground>
    );
};

SecondaryHeader.propTypes = {
    deeplyNestedScreen: PropTypes.bool,
    heading: PropTypes.string,
    headerSize: PropTypes.number,
    margin: PropTypes.number,
    translateY: PropTypes.object,
};

export default SecondaryHeader;

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#161B26',
        justifyContent: 'center',
    },
    deeplyNestedScreenHeaderText: {
        color: '#fff',
        fontFamily: 'Poppins_500Medium',
    },
    backgroundColor161B26: {
        backgroundColor: '#161B26',
    },
    fontColorFff: {
        color: '#fff',
    },
    justifyContentCenter: { justifyContent: 'center' },
    poppins600Font: {
        fontFamily: 'Poppins_600SemiBold',
    },
    poppins500Font: {
        fontFamily: 'Poppins_500Medium',
    },
    fontSizeL1: {
        fontSize: 25,
    },
    fontSizeL2: {
        fontSize: 30,
    },
    height100Perc: {
        height: '100%',
    },
    absolute000: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    stickyHeaderHeight: {
        height: stickyHeaderHeight,
    },
    flexDirectionRow: {
        flexDirection: 'row',
    },
    justifyContentFlexStart: {
        justifyContent: 'flex-start',
    },
    alignItemsCenter: {
        alignItems: 'center',
    },
});
