import React, { useState, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Dimensions,
    Image,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MarginVertical from './MarginVertical';
import PropTypes from 'prop-types';
import Animated2, {
    useAnimatedStyle,
    withTiming,
    useSharedValue,
} from 'react-native-reanimated';
import ServiceModal from './ServiceModal';

function ServicesTemplate({
    headerSize,
    url,
    title,
    body,
    fontFactor,
    contentContainerWidth,
    modalAwareAnimatedValue,
    tabBarHeight,
}) {
    const { height } = Dimensions.get('window');
    const modalAwareAnimatedValue2 = useSharedValue(0);
    const modalAwareAnimatedStyle = useAnimatedStyle(() => {
        ('worklet');
        return {
            transform: [
                {
                    translateY: withTiming(modalAwareAnimatedValue2.value),
                },
            ],
        };
    });
    const onModalWillShow = useCallback(() => {
        ('worklet');
        modalAwareAnimatedValue.value = -height;
        modalAwareAnimatedValue2.value = -height;
    }, [modalAwareAnimatedValue2, modalAwareAnimatedValue, height]);
    const onModalWillHide = useCallback(() => {
        'worklet';
        modalAwareAnimatedValue.value = 0;
        modalAwareAnimatedValue2.value = 0;
    }, [modalAwareAnimatedValue2, modalAwareAnimatedValue]);

    const styles2 = StyleSheet.create({
        heading: {
            fontSize: fontFactor * wp(8.5),
            lineHeight: fontFactor * wp(10.81),
        },
        baseFont: {
            fontSize: fontFactor * wp(5),
            lineHeight: fontFactor * wp(6.36),
        },
        contentContainer: {
            width: contentContainerWidth,
            alignSelf: 'center',
        },
        lightBlueunderline: {
            paddingVertical: wp(0.5),
            borderBottomWidth: fontFactor * wp(0.5),
        },
    });
    const [modalOpen, setModalOpen] = useState(false);
    const toggleModal = useCallback(() => setModalOpen((state) => !state), []);

    return (
        <View style={[styles.container, {}]}>
            <Image
                source={url}
                style={[styles.container, StyleSheet.absoluteFill]}
            />
            <Animated2.View style={[styles.container, modalAwareAnimatedStyle]}>
                <View style={[styles2.contentContainer]}>
                    <MarginVertical size={4} />
                    <Text
                        style={[
                            styles.whiteText,
                            styles.poppins600Font,
                            styles2.heading,
                        ]}
                    >
                        {title}
                    </Text>
                    <MarginVertical />
                    <Text
                        numberOfLines={3}
                        ellipsizeMode="tail"
                        style={[
                            styles.whiteText,
                            styles.karla400Font,
                            styles2.baseFont,
                        ]}
                    >
                        {body}
                    </Text>
                    <MarginVertical />
                    <Pressable
                        style={[
                            styles.lightBlueunderline,
                            styles2.lightBlueunderline,
                        ]}
                        onPress={toggleModal}
                    >
                        <Text
                            style={[
                                styles.lightBlueText,
                                styles2.baseFont,
                                styles.poppins600Font,
                            ]}
                        >
                            Continue reading
                        </Text>
                    </Pressable>
                </View>
            </Animated2.View>

            <ServiceModal
                modalOpen={modalOpen}
                onModalWillHide={onModalWillHide}
                onModalWillShow={onModalWillShow}
                toggleModal={toggleModal}
                headerSize={headerSize}
                tabBarHeight={tabBarHeight}
                title={title}
                body={body}
                contentContainerWidth={contentContainerWidth}
                fontFactor={fontFactor}
            />
        </View>
    );
}

ServicesTemplate.propTypes = {
    headerSize: PropTypes.number,
    url: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    fontFactor: PropTypes.number,
    contentContainerWidth: PropTypes.number,
    modalAwareAnimatedValue: PropTypes.object,
    tabBarHeight: PropTypes.number,
};

export default React.memo(ServicesTemplate, () => false);

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    whiteText: {
        color: '#ffffff',
    },
    poppins600Font: {
        fontFamily: 'Poppins_600SemiBold',
    },
    karla400Font: {
        fontFamily: 'Karla_400Regular',
    },
    lightBlueText: {
        color: '#1CB8F3',
    },
    lightBlueunderline: {
        borderBottomColor: '#1CB8F3',
        alignSelf: 'flex-start',
    },
    iconContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
});
