import React, { useRef } from 'react';
import {
    StyleSheet,
    View,
    Pressable,
    Animated,
    Dimensions,
    Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import Constants from 'expo-constants';
import MarginVertical from '../components/MarginVertical';
import { useFonts } from '@expo-google-fonts/poppins';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/core';

export default function ModalScreen({
    visible,
    closeModal,
    iconWidth,
    iconHeight,
    fontFactor,
}) {
    const [loaded] = useFonts({
        Poppins_500Medium,
    });
    const animatedValue = useRef(new Animated.Value(1)).current;
    const onPressIn = () => {
        Animated.spring(animatedValue, {
            toValue: 1.2,
            useNativeDriver: true,
        }).start();
    };
    const onPressOut = () => {
        Animated.spring(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };
    const onPressNavItemIn = (animatedValue) => {
        Animated.spring(animatedValue, {
            toValue: 1.2,
            useNativeDriver: true,
        }).start();
    };
    const onPressNavItemOut = (animatedValue) => {
        Animated.spring(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };
    const homeAnimatedValue = useRef(new Animated.Value(1)).current;
    const aboutAnimatedValue = useRef(new Animated.Value(1)).current;
    const servicesAnimatedValue = useRef(new Animated.Value(1)).current;
    const forumAnimatedValue = useRef(new Animated.Value(1)).current;
    const contactAnimatedValue = useRef(new Animated.Value(1)).current;
    const navTextStyle = {
        fontSize: fontFactor * wp(7),
        lineHeight: fontFactor * wp(8.91),
    };
    const navigation = useNavigation();
    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight =
        Platform.OS === 'ios'
            ? Dimensions.get('window').height
            : // eslint-disable-next-line no-undef
              require('react-native-extra-dimensions-android').get(
                  'REAL_WINDOW_HEIGHT'
              );

    if (!loaded) {
        return <View />;
    }

    return (
        <Modal
            style={{ margin: 0 }}
            isVisible={visible}
            animationIn="zoomIn"
            animationOut="zoomOut"
            onBackButtonPress={closeModal}
            coverScreen
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
            swipeDirection="down"
            onSwipeComplete={closeModal}
            deviceWidth={deviceWidth}
            deviceHeight={deviceHeight}
        >
            <View style={[styles.modalContainer]}>
                <Pressable
                    style={[
                        styles.modalCloseIcon,
                        {
                            width: iconWidth,
                            height: iconHeight,
                        },
                    ]}
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    onPress={closeModal}
                >
                    <Animated.Text
                        style={{
                            transform: [{ scale: animatedValue }],
                        }}
                    >
                        <Icon name="x" color="#fff" size={0.4 * iconWidth} />
                    </Animated.Text>
                </Pressable>
                <View style={styles.navContainer}>
                    <Pressable
                        onPressIn={() => onPressNavItemIn(homeAnimatedValue)}
                        onPressOut={() => onPressNavItemOut(homeAnimatedValue)}
                        onPress={() => {
                            navigation.navigate('Home');
                            closeModal();
                        }}
                        hitSlop={fontFactor * wp(7)}
                    >
                        <Animated.Text
                            style={[
                                styles.navText,
                                navTextStyle,
                                { transform: [{ scale: homeAnimatedValue }] },
                            ]}
                        >
                            Home
                        </Animated.Text>
                    </Pressable>
                    <MarginVertical size={2} />
                    <Pressable
                        onPressIn={() => onPressNavItemIn(aboutAnimatedValue)}
                        onPressOut={() => onPressNavItemOut(aboutAnimatedValue)}
                        onPress={() => {
                            navigation.navigate('About');
                            closeModal();
                        }}
                        hitSlop={fontFactor * wp(7)}
                    >
                        <Animated.Text
                            style={[
                                styles.navText,
                                navTextStyle,
                                { transform: [{ scale: aboutAnimatedValue }] },
                            ]}
                        >
                            About Us
                        </Animated.Text>
                    </Pressable>
                    <MarginVertical size={2} />
                    <Pressable
                        onPressIn={() =>
                            onPressNavItemIn(servicesAnimatedValue)
                        }
                        onPressOut={() =>
                            onPressNavItemOut(servicesAnimatedValue)
                        }
                        onPress={() => {
                            navigation.navigate('About');
                            closeModal();
                        }}
                        hitSlop={fontFactor * wp(7)}
                    >
                        <Animated.Text
                            style={[
                                styles.navText,
                                navTextStyle,
                                {
                                    transform: [
                                        { scale: servicesAnimatedValue },
                                    ],
                                },
                            ]}
                        >
                            Services
                        </Animated.Text>
                    </Pressable>
                    <MarginVertical size={2} />
                    <Pressable
                        onPressIn={() => onPressNavItemIn(forumAnimatedValue)}
                        onPressOut={() => onPressNavItemOut(forumAnimatedValue)}
                        hitSlop={fontFactor * wp(7)}
                    >
                        <Animated.Text
                            style={[
                                styles.navText,
                                navTextStyle,
                                { transform: [{ scale: forumAnimatedValue }] },
                            ]}
                        >
                            Forum
                        </Animated.Text>
                    </Pressable>
                    <MarginVertical size={2} />
                    <Pressable
                        onPressIn={() => onPressNavItemIn(contactAnimatedValue)}
                        onPressOut={() =>
                            onPressNavItemOut(contactAnimatedValue)
                        }
                        hitSlop={fontFactor * wp(7)}
                    >
                        <Animated.Text
                            style={[
                                styles.navText,
                                navTextStyle,
                                {
                                    transform: [
                                        { scale: contactAnimatedValue },
                                    ],
                                },
                            ]}
                        >
                            Contact Us
                        </Animated.Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

ModalScreen.propTypes = {
    visible: PropTypes.bool,
    closeModal: PropTypes.func,
    iconWidth: PropTypes.number,
    iconHeight: PropTypes.number,
    fontFactor: PropTypes.number,
};

const { statusBarHeight } = Constants;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        paddingHorizontal: 30,
        backgroundColor: 'rgba(22, 27, 38, .9)',
        marginTop: statusBarHeight,
        justifyContent: 'center',
    },
    modalCloseIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navContainer: {
        alignItems: 'center',
    },
    navText: {
        fontFamily: 'Poppins_500Medium',
        color: '#fff',
    },
});
