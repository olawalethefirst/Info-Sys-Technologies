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
import DancingDownArrow from './DancingDownArrow';
import Modal from 'react-native-modal';
import Constants from 'expo-constants';
import ModalCloseIcon from './ModalCloseIcon';

function ServicesTemplate({
    headerSize,
    url,
    title,
    details,
    menuIconWidth,
    menuIconHeight,
    fontFactor,
    arrowWidth,
    contentContainerWidth,
    lastComponent,
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
        iconContainer: {
            position: 'absolute',
            width: arrowWidth,
            height: (arrowWidth * 125) / 42,
            right: (menuIconWidth - arrowWidth) / 2,
            bottom: wp(4),
            opacity: 0.8,
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
            state ? animateIn.start() : animateOut.start();
            return !state;
        });
    };
    console.log(modalOpen);

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
                    {/* {!lastComponent && (
                        <DancingDownArrow
                            arrowWidth={arrowWidth}
                            menuIconWidth={menuIconWidth}
                        />
                    )} */}
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
                            <MarginVertical size={2} />
                        </View>
                    </ScrollView>
                </View>
            </Modal>
            {/* <ScrollView
                        contentContainerStyle={[
                            styles.container,
                            { padding: margin },
                            styles.justifyFontVerticalCenter,
                            styles.darkBackground,
                        ]}
                    >
                        <MarginVertical size={2} />
                        <View style={{ width: '90%', alignSelf: 'center' }}>
                            <Text
                                style={[
                                    styles.karla400Font,
                                    styles2.baseFont,
                                    styles.whiteText,
                                    styles.alignTextCenter,
                                ]}
                            >
                                {details}
                            </Text>
                        </View>

                        <MarginVertical size={2} />
                    </ScrollView> */}
        </View>
    );
}

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
    justifyFontVerticalCenter: {
        justifyContent: 'center',
    },
    darkBackground: {
        backgroundColor: '#161B26',
    },
    justifyText: {
        textAlign: 'justify',
    },
    alignTextCenter: {
        alignSelf: 'center',
    },
    lightBlueText: {
        color: '#1CB8F3',
    },
    lightBlueunderline: {
        borderBottomColor: '#1CB8F3',
        alignSelf: 'flex-start',
    },
});
