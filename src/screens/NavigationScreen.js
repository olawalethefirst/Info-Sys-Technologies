import React, { useRef, useEffect } from 'react';
import { StyleSheet, Pressable, Animated, SafeAreaView } from 'react-native';
import MarginVertical from '../components/MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import signOutUser from '../helperFunctions/signOutUser';
import { connect } from 'react-redux';
import { firebase } from '../helperFunctions/initializeFirebase';
import updateUser from '../redux/actions/updateUser';

function NavigationScreen({ fontFactor, navigation, user, updateUser }) {
    const onPressNavItemIn = (animatedValue) => {
        Animated.timing(animatedValue, {
            toValue: 1.2,
            duration: 150,
            useNativeDriver: true,
        }).start();
    };
    const onPressNavItemOut = (animatedValue) => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
        }).start();
    };
    const homeAnimatedValue = useRef(new Animated.Value(1)).current;
    const aboutAnimatedValue = useRef(new Animated.Value(1)).current;
    const servicesAnimatedValue = useRef(new Animated.Value(1)).current;
    const forumAnimatedValue = useRef(new Animated.Value(1)).current;
    const contactAnimatedValue = useRef(new Animated.Value(1)).current;
    const signOutAnimatedValue = useRef(new Animated.Value(1)).current;
    const styles2 = {
        navTextStyle: {
            fontSize: fontFactor * wp(7),
            lineHeight: fontFactor * wp(8.91),
        },
        navMiniTextStyle: {
            fontSize: fontFactor * wp(5.8),
            lineHeight: fontFactor * wp(7.128),
        },
    };

    // useEffect(() => {
    //     firebase.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //             updateUser(user);
    //         } else {
    //             updateUser(null);
    //         }
    //     });
    // }, [updateUser]);
    return (
        <SafeAreaView style={[styles.modalContainer]}>
            <Pressable
                onPress={navigation.goBack}
                style={[
                    StyleSheet.absoluteFill,
                    { backgroundColor: 'rgba(0, 0, 0, .8)' },
                ]}
            />

            <Pressable
                onPressIn={() => onPressNavItemIn(homeAnimatedValue)}
                onPressOut={() => onPressNavItemOut(homeAnimatedValue)}
                onPress={() => {
                    navigation.navigate('Home');
                }}
                hitSlop={fontFactor * wp(7)}
            >
                <Animated.Text
                    style={[
                        styles.navText,
                        styles2.navTextStyle,
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
                }}
                hitSlop={fontFactor * wp(7)}
            >
                <Animated.Text
                    style={[
                        styles.navText,
                        styles2.navTextStyle,
                        { transform: [{ scale: aboutAnimatedValue }] },
                    ]}
                >
                    About Us
                </Animated.Text>
            </Pressable>
            <MarginVertical size={2} />
            <Pressable
                onPressIn={() => onPressNavItemIn(servicesAnimatedValue)}
                onPressOut={() => onPressNavItemOut(servicesAnimatedValue)}
                onPress={() => {
                    navigation.navigate('Services');
                }}
                hitSlop={fontFactor * wp(7)}
            >
                <Animated.Text
                    style={[
                        styles.navText,
                        styles2.navTextStyle,
                        {
                            transform: [{ scale: servicesAnimatedValue }],
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
                onPress={() => {
                    navigation.navigate('ForumStack');
                }}
                hitSlop={fontFactor * wp(7)}
            >
                <Animated.Text
                    style={[
                        styles.navText,
                        styles2.navTextStyle,
                        { transform: [{ scale: forumAnimatedValue }] },
                    ]}
                >
                    Forum
                </Animated.Text>
            </Pressable>
            <MarginVertical size={2} />
            <Pressable
                onPressIn={() => onPressNavItemIn(contactAnimatedValue)}
                onPressOut={() => onPressNavItemOut(contactAnimatedValue)}
                onPress={() => {
                    navigation.navigate('Contact');
                }}
                hitSlop={fontFactor * wp(7)}
            >
                <Animated.Text
                    style={[
                        styles.navText,
                        styles2.navTextStyle,
                        {
                            transform: [{ scale: contactAnimatedValue }],
                        },
                    ]}
                >
                    Contact Us
                </Animated.Text>
            </Pressable>
            <MarginVertical size={2} />

            {user && (
                <Pressable
                    onPressIn={() => onPressNavItemIn(signOutAnimatedValue)}
                    onPressOut={() => onPressNavItemOut(signOutAnimatedValue)}
                    onPress={() => {
                        signOutUser();
                    }}
                    hitSlop={fontFactor * wp(5.6)}
                >
                    <Animated.Text
                        style={[
                            styles.navMini,
                            styles2.navMiniTextStyle,
                            {
                                transform: [{ scale: signOutAnimatedValue }],
                            },
                        ]}
                    >
                        Sign Out
                    </Animated.Text>
                </Pressable>
            )}
        </SafeAreaView>
    );
}

NavigationScreen.propTypes = {
    fontFactor: PropTypes.number,
    navigation: PropTypes.object,
    user: PropTypes.object,
};

const mapStateToProps = ({
    settingsState: { fontFactor, headerSize },
    forumTempState: { user },
}) => ({
    fontFactor,
    headerSize,
    user,
});

export default connect(mapStateToProps, { updateUser })(NavigationScreen);

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    navContainer: {
        alignItems: 'center',
    },
    navText: {
        fontFamily: 'Poppins_500Medium',
        color: '#fff',
    },
    navMini: {
        fontFamily: 'Poppins_500Medium',
        color: '#1A91D7',
    },
});
