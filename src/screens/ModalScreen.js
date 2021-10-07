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
import MarginVertical from '../components/MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/core';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import ModalCloseIcon from '../components/ModalCloseIcon';

const isWeb = Platform.OS === 'web';
export default function ModalScreen({
    visible,
    closeModal,
    iconWidth,
    iconHeight,
    fontFactor,
}) {
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
    const deviceHeight = useSafeAreaFrame().height;

    return (
        <Modal
            style={{ margin: 0, padding: 0 }}
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
                <ModalCloseIcon
                    closeModal={closeModal}
                    iconWidth={iconWidth}
                    iconHeight={iconHeight}
                />
                <View style={styles.navContainer}>
                    <Pressable
                        onPressIn={() => onPressNavItemIn(homeAnimatedValue)}
                        onPressOut={() => onPressNavItemOut(homeAnimatedValue)}
                        onPress={() => {
                            !isWeb && closeModal();
                            navigation.navigate('Home');
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
                            !isWeb && closeModal();
                            navigation.navigate('About');
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
                            !isWeb && closeModal();
                            navigation.navigate('Services');
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
                        onPress={() => {
                            !isWeb && closeModal();
                            navigation.navigate('Contact');
                        }}
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

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        paddingHorizontal: 30,
        backgroundColor: 'rgba(22, 27, 38, .9)',
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
