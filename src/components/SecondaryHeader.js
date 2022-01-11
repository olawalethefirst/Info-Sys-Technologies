import React from 'react';
import {
    StyleSheet,
    Text,
    ImageBackground,
    Animated,
    TouchableOpacity,
    View,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

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

    return (
        <AnimatedImageBackground
            //eslint-disable-next-line no-undef
            source={require('../../assets/images/background2.png')}
            resizeMode="cover"
            style={[
                styles.header,
                {
                    paddingHorizontal: margin,
                    height: 50,
                    transform: [
                        {
                            translateY,
                        },
                    ],
                },
                deeplyNestedScreen && {
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                },
            ]}
        >
            {deeplyNestedScreen && (
                <TouchableOpacity
                    style={{
                        width: headerSize,
                        height: '100%',
                        justifyContent: 'center',
                    }}
                    onPress={navigation.goBack}
                >
                    <Text
                        style={[
                            styles.deeplyNestedScreenHeaderText,
                            {
                                fontSize: 25,
                            },
                        ]}
                    >
                        <AntDesignIcon
                            name="arrowleft"
                            size={25}
                            color="#fff"
                        />{' '}
                        {``}
                    </Text>
                </TouchableOpacity>
            )}
            <View style={{ justifyContent: 'center', height: '100%' }}>
                <Text
                    style={[
                        !deeplyNestedScreen && styles.headerText,
                        !deeplyNestedScreen && {
                            fontSize: 30,
                        },
                        deeplyNestedScreen && {
                            fontSize: 25,
                        },
                        deeplyNestedScreen &&
                            styles.deeplyNestedScreenHeaderText,
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
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#161B26',
        justifyContent: 'center',
    },
    headerText: {
        color: '#fff',
        fontFamily: 'Poppins_600SemiBold',
    },
    deeplyNestedScreenHeaderText: {
        color: '#fff',
        fontFamily: 'Poppins_500Medium',
    },
});
