import React, { useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    InteractionManager,
} from 'react-native';
import PropTypes from 'prop-types';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MarginVertical from './MarginVertical';
import LearnMoreIcon from './LearnMoreIcon';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    withRepeat,
} from 'react-native-reanimated';
import { Services } from '../constants';
import { useNavigation } from '@react-navigation/native';
import ServicesMiniIcon from './ServicesMiniIcon';

function ServiceTemplate({ title, fontFactor, body, index }) {
    const { navigate } = useNavigation();
    const translateX = useSharedValue(10);
    const touchOpacity = useSharedValue(1);
    const animatedOpacity = useAnimatedStyle(() => ({
        opacity: touchOpacity.value,
    }));
    const pendulumLoop = useCallback(
        () => (translateX.value = withRepeat(withTiming(15), -1, true)),
        [translateX]
    );
    const onPressIn = useCallback(() => {
        translateX.value = withTiming(10, { duration: 50 });
        touchOpacity.value = withTiming(0.5, { duration: 150 });
    }, [touchOpacity, translateX]);
    const onPressOut = useCallback(() => {
        touchOpacity.value = withTiming(1, { duration: 150 });
        pendulumLoop();
    }, [touchOpacity, pendulumLoop]);
    const onPress = useCallback(() => {
        navigate(Services, { page: index + 1 });
    }, [navigate, index]);

    const styles2 = StyleSheet.create({
        iconContainer: {
            height: wp(12) * fontFactor,
            width: wp(12) * fontFactor,
            borderRadius: (wp(12) * fontFactor) / 2,
        },
        container: {
            paddingHorizontal: wp(8) * fontFactor,
            paddingTop: wp(8) * fontFactor,
            paddingBottom: wp(5.3) * fontFactor,
        },
        button: {
            paddingVertical: wp(2) * fontFactor,
        },
        animatedArrow: {
            height: fontFactor * wp(3.58),
            alignSelf: 'center',
            justifyContent: 'center',
        },
    });

    useEffect(() => {
        const interaction =
            InteractionManager.runAfterInteractions(pendulumLoop);
        return interaction.cancel;
    }, [pendulumLoop]);

    return (
        <View
            style={[
                styles.container,
                {
                    paddingHorizontal: 30,
                    paddingTop: 30,
                    paddingBottom: 20,
                },
            ]}
        >
            <View style={[styles.iconContainer, styles2.iconContainer]}>
                <ServicesMiniIcon type={title} size={wp(6) * fontFactor} />
            </View>
            <MarginVertical size={1.5} />

            <Text
                style={[
                    styles.heading,
                    {
                        fontSize: fontFactor * wp(4.6),
                        lineHeight: fontFactor * wp(5.85),
                    },
                ]}
            >
                {title}
            </Text>
            <MarginVertical size={1} />
            <Text
                style={[
                    styles.paragraph,
                    {
                        fontSize: fontFactor * wp(4.6),
                        lineHeight: fontFactor * wp(5.85),
                    },
                ]}
                numberOfLines={3}
                ellipsizeMode="tail"
            >
                {body}
            </Text>
            <MarginVertical size={1} />

            <TouchableWithoutFeedback
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onPress={onPress}
            >
                <Animated.View
                    style={[styles.button, styles2.button, animatedOpacity]}
                >
                    <LearnMoreIcon
                        height={fontFactor * wp(4)}
                        translateX={translateX}
                    />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
}

ServiceTemplate.propTypes = {
    children: PropTypes.object,
    title: PropTypes.string,
    body: PropTypes.string,
    fontFactor: PropTypes.number,
    index: PropTypes.number,
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'rgba(247, 247, 247, 0.6)',
        flex: 1,
    },
    iconContainer: {
        backgroundColor: '#1A91D7',
        justifyContent: 'center',
        alignItems: 'center',
        // padding: '4%',
    },
    heading: {
        color: '#fff',
        fontFamily: 'Poppins_600SemiBold',
    },
    paragraph: {
        color: '#fff',
        fontFamily: 'Karla_400Regular',
    },
    button: {
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Poppins_600SemiBold',
    },
});

export default React.memo(ServiceTemplate);
