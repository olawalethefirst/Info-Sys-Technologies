import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    ScrollView,
    Animated,
    Pressable,
    Platform,
    Dimensions,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MarginVertical from './MarginVertical';
import Modal from 'react-native-modal';
import ModalCloseIcon from './ModalCloseIcon';
import PropTypes from 'prop-types';

function ServicesTemplate({
    headerSize,
    url,
    title,
    details,
    menuIconWidth,
    menuIconHeight,
    fontFactor,
    contentContainerWidth,
    fadeIn,
    fadeOut,
}) {
    const styles2 = {
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
    };
    const { height } = Dimensions.get('window');
    const translateY = useRef(new Animated.Value(0)).current;
    const animateOut = useRef(
        Animated.timing(translateY, {
            toValue: -height,
            duration: 300,
            useNativeDriver: true,
        })
    ).current;
    const animateIn = useRef(
        Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        })
    ).current;
    const [modalOpen, setModalOpen] = useState(false);
    const toggleModal = () => {
        setModalOpen((state) => {
            state
                ? Animated.parallel([animateIn.start(), fadeIn.start()])
                : Animated.parallel([animateOut.start(), fadeOut.start()]);
            return !state;
        });
    };

    return (
        <View style={[styles.container, {}]}>
            <ImageBackground source={url} style={[styles.container]}>
                <Animated.View
                    style={[
                        styles.container,
                        {
                            transform: [{ translateY }],
                        },
                    ]}
                >
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
                            {details}
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
                </Animated.View>
            </ImageBackground>
            <Modal
                isVisible={modalOpen}
                onBackButtonPress={toggleModal}
                useNativeDriver
                hideModalContentWhileAnimating
                style={{
                    margin: 0,
                    marginTop: Platform.select({
                        ios: headerSize,
                        android: menuIconHeight,
                    }),
                }}
            >
                <View style={{ flex: 1 }}>
                    <ModalCloseIcon
                        closeModal={toggleModal}
                        iconHeight={menuIconHeight}
                        iconWidth={menuIconWidth}
                        notFullScreen={true}
                    />
                    <ScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        style={[
                            styles2.contentContainer,
                            {
                                marginVertical: menuIconHeight,
                            },
                        ]}
                    >
                        <View style={[styles.container]}>
                            <Text
                                style={[
                                    styles.poppins600Font,
                                    styles2.baseFont,
                                    styles.lightBlueText,
                                ]}
                            >
                                {title}
                            </Text>
                            <MarginVertical />
                            <Text
                                style={[
                                    styles.karla400Font,
                                    styles2.baseFont,
                                    styles.whiteText,
                                ]}
                            >
                                {details}
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
}

ServicesTemplate.propTypes = {
    headerSize: PropTypes.number,
    url: PropTypes.number,
    title: PropTypes.string,
    details: PropTypes.string,
    menuIconWidth: PropTypes.number,
    menuIconHeight: PropTypes.number,
    fontFactor: PropTypes.number,
    contentContainerWidth: PropTypes.number,
    fadeIn: PropTypes.object,
    fadeOut: PropTypes.object,
};

export default React.memo(ServicesTemplate);

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
});
