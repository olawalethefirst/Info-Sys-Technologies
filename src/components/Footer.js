import React, { useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    Pressable,
    Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

function Footer({
    headerSize,
    darkMode,
    margin,
    fontFactor,
    scrollToTop,
    scrollRef,
}) {
    const deviceWidth = Dimensions.get('window').width;
    const animatedValue = useRef(new Animated.Value(1)).current;
    const onPressIn = () => {
        Animated.spring(animatedValue, {
            toValue: 1.3,
            useNativeDriver: true,
        }).start();
    };
    const onPressOut = () => {
        Animated.spring(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

    return (
        <View
            style={[
                styles.container,
                {
                    height: headerSize,
                    backgroundColor: darkMode ? '#141822' : '#fff',
                    padding: margin,
                },
            ]}
        >
            <Text
                style={[
                    styles.text,
                    {
                        fontSize: fontFactor * wp(2.5),
                        lineHeight: fontFactor * wp(3.18),
                        color: darkMode ? '#fff' : '#000',
                    },
                ]}
            >
                {'\u00A9'} 2021 Info-Sys
            </Text>
            <Image
                // eslint-disable-next-line no-undef
                source={require('../../assets/images/transparent-logo.png')}
                style={{
                    height: 30,
                    width: 30,
                    position: 'absolute',
                    bottom: headerSize * 0.25,
                    right: deviceWidth / 2 - 15,
                }}
            />
            <AnimatedPressable
                hitSlop={wp(4)}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onPress={() => scrollToTop(scrollRef)}
                style={{ transform: [{ scale: animatedValue }] }}
            >
                <Icon
                    name="chevron-up"
                    style={{
                        fontSize: fontFactor * wp(5),
                        lineHeight: fontFactor * wp(6.36),
                        color: darkMode ? '#fff' : '#000',
                    }}
                />
            </AnimatedPressable>
        </View>
    );
}

Footer.propTypes = {
    headerSize: PropTypes.number,
    darkMode: PropTypes.bool,
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
    scrollToTop: PropTypes.func,
    scrollRef: PropTypes.object,
};

export default React.memo(Footer);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 0,
    },
    text: {
        fontFamily: 'Karla_400Regular',
    },
});
