import React from 'react';
import { StyleSheet, Text, View, Pressable, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MarginVertical from './MarginVertical';
import SearchPosts from './SearchPosts';
import { useNavigation } from '@react-navigation/native';
import signOutUser from '../helperFunctions/signOutUser';
import PropTypes from 'prop-types';

const Forum = ({ margin, fontFactor, user }) => {
    const navigation = useNavigation();
    const styles2 = StyleSheet.create({
        fontSizeL1: {
            fontSize: fontFactor * wp(4),
            lineHeight: fontFactor * wp(5.13),
        },
        fontSizeL2: {
            fontSize: fontFactor * wp(6),
            lineHeight: fontFactor * wp(7.7),
        },
        paddingWP2: {
            padding: fontFactor * wp(2),
        },
        paddingHorizontalMargin: {
            paddingHorizontal: margin,
        },
    });

    return (
        <SafeAreaView>
            <View style={styles2.paddingHorizontalMargin}>
                {!user && (
                    <View
                        style={[
                            styles.bordeBottomWidth1,
                            styles.borderBottomColorCecece,
                        ]}
                    >
                        <MarginVertical />

                        <View
                            style={[
                                styles.flexDirectionRow,
                                styles.justifyContentSpaceBetween,
                            ]}
                        >
                            <Pressable
                                onPress={() =>
                                    navigation.navigate('Auth', {
                                        viewAnimatedValue: 0,
                                    })
                                }
                                style={({ pressed }) => [
                                    styles2.paddingWP2,
                                    styles.borderColor161B26,
                                    styles.borderWidth1,
                                    pressed
                                        ? styles.backgroundColorv161B26
                                        : styles.backgroundColorfff,
                                ]}
                            >
                                {({ pressed }) => (
                                    <Text
                                        style={[
                                            styles.poppins400Font,
                                            pressed
                                                ? styles.fontColorf7f7f7
                                                : styles.fontColor161B26,
                                            styles2.fontSizeL1,
                                        ]}
                                    >
                                        Sign Up
                                    </Text>
                                )}
                            </Pressable>
                            <Pressable
                                onPress={() =>
                                    navigation.navigate('Auth', {
                                        viewAnimatedValue: 1,
                                    })
                                }
                                style={({ pressed }) => [
                                    styles2.paddingWP2,
                                    styles.borderColor1A91D7,
                                    styles.borderWidth1,
                                    pressed
                                        ? null
                                        : styles.backgroundColor1A91D7,
                                ]}
                            >
                                {({ pressed }) => (
                                    <Text
                                        style={[
                                            styles2.fontSizeL1,
                                            styles.poppins400Font,
                                            pressed
                                                ? styles.fontColor1A91D7
                                                : styles.fontColorf7f7f7,
                                        ]}
                                    >
                                        Sign In
                                    </Text>
                                )}
                            </Pressable>
                        </View>
                        <MarginVertical />
                    </View>
                )}
                <MarginVertical />
                <View
                    style={[
                        styles.flexDirectionRow,
                        styles.justifyContentSpaceBetween,
                    ]}
                >
                    <Text style={[styles.postsHeading, styles2.fontSizeL2]}>
                        Posts
                    </Text>
                    {user && (
                        <Pressable
                            onPress={() => signOutUser()}
                            style={({ pressed }) => [
                                styles.borderColor1A91D7,
                                styles.borderWidth1,
                                styles2.paddingWP2,
                                pressed ? styles.backgroundColor1A91D7 : null,
                                styles.alignSelfFlexEnd,
                            ]}
                        >
                            {({ pressed }) => (
                                <Text
                                    style={[
                                        styles.poppins400Font,
                                        pressed
                                            ? styles.fontColorf7f7f7
                                            : styles.fontColor1A91D7,
                                        styles2.fontSizeL1,
                                    ]}
                                >
                                    Sign Out
                                </Text>
                            )}
                        </Pressable>
                    )}
                </View>
                <MarginVertical />
                <SearchPosts />
            </View>
        </SafeAreaView>
    );
};

Forum.propTypes = {
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
    user: PropTypes.object,
};

const styles = StyleSheet.create({
    poppins500Font: {
        fontFamily: 'Poppins_500Medium',
    },
    poppins400Font: {
        fontFamily: 'Poppins_400Regular',
    },
    fontColorf7f7f7: {
        color: '#f7f7f7',
    },
    fontColor1A91D7: {
        color: '#1A91D7',
    },
    fontColor161B26: {
        color: '#161B26',
    },
    borderColor1A91D7: {
        borderColor: '#1A91D7',
    },
    borderWidth1: {
        borderWidth: 1,
    },
    borderColor161B26: {
        borderColor: '#161B26',
    },
    backgroundColorv161B26: {
        backgroundColor: '#161B26',
    },
    backgroundColorfff: {
        backgroundColor: '#fff',
    },
    backgroundColor1A91D7: {
        backgroundColor: '#1A91D7',
    },
    alignSelfFlexEnd: {
        alignSelf: 'flex-end',
    },
    flexDirectionRow: { flexDirection: 'row' },
    justifyContentSpaceBetween: { justifyContent: 'space-between' },
    bordeBottomWidth1: {
        borderBottomWidth: 1,
    },
    borderBottomColorCecece: { borderBottomColor: '#cecece' },
});

export default React.memo(Forum);
