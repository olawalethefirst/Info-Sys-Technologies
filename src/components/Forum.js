import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import PostMini from './PostMini';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MarginVertical from './MarginVertical';
import SearchPosts from './SearchPosts';
import CreatePost from './CreatePost';
import checkColumnMode from '../helperFunctions/checkColumnMode';
import { useNavigation } from '@react-navigation/native';
import signOutUser from '../helperFunctions/signOutUser';

const Forum = ({
    bodyHeight,
    margin,
    fontFactor,
    headerSize,
    deviceWidthClass,
    createPostModalVisible,
    toggleModal,
    user,
}) => {
    const columnMode = checkColumnMode(deviceWidthClass);
    const navigation = useNavigation();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
                style={[
                    {
                        minHeight: bodyHeight - headerSize,
                        backgroundColor: '#f7f7f7',
                        paddingHorizontal: margin,
                    },
                ]}
            >
                <View
                    style={{
                        width: columnMode ? '90%' : '100%',
                    }}
                >
                    {!user && (
                        <View
                            style={{
                                borderBottomColor: '#cecece',
                                borderBottomWidth: 1,
                            }}
                        >
                            <MarginVertical />

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Pressable
                                    onPress={() =>
                                        navigation.navigate('Auth', {
                                            viewAnimatedValue: 0,
                                        })
                                    }
                                    style={({ pressed }) => ({
                                        borderColor: '#161B26',
                                        borderWidth: 1,
                                        padding: fontFactor * wp(2),
                                        backgroundColor: pressed
                                            ? '#161B26'
                                            : '#f7f7f7',
                                    })}
                                >
                                    {({ pressed }) => (
                                        <Text
                                            style={{
                                                fontSize: fontFactor * wp(4),
                                                lineHeight:
                                                    fontFactor * wp(5.13),
                                                fontFamily:
                                                    'Poppins_400Regular',
                                                color: pressed
                                                    ? '#f7f7f7'
                                                    : '#161B26',
                                            }}
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
                                    style={({ pressed }) => ({
                                        borderColor: '#1A91D7',
                                        borderWidth: 1,
                                        padding: fontFactor * wp(2),
                                        backgroundColor: pressed
                                            ? null
                                            : '#1A91D7',
                                    })}
                                >
                                    {({ pressed }) => (
                                        <Text
                                            style={{
                                                fontSize: fontFactor * wp(4),
                                                lineHeight:
                                                    fontFactor * wp(5.13),
                                                fontFamily:
                                                    'Poppins_400Regular',
                                                color: pressed
                                                    ? '#1A91D7'
                                                    : '#f7f7f7',
                                            }}
                                        >
                                            Sign In
                                        </Text>
                                    )}
                                </Pressable>
                            </View>
                            <MarginVertical />
                        </View>
                    )}
                    <MarginVertical size={user ? 2 : 1} />
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text
                            style={[
                                styles.postsHeading,
                                {
                                    fontSize: fontFactor * wp(6),
                                    lineHeight: fontFactor * wp(7.7),
                                },
                            ]}
                        >
                            Posts
                        </Text>
                        {user && (
                            <Pressable
                                onPress={() => signOutUser()}
                                style={({ pressed }) => ({
                                    borderColor: '#1A91D7',
                                    borderWidth: 1,
                                    padding: fontFactor * wp(2),
                                    backgroundColor: pressed ? '#1A91D7' : null,
                                    alignSelf: 'flex-end',
                                })}
                            >
                                {({ pressed }) => (
                                    <Text
                                        style={{
                                            fontSize: fontFactor * wp(4),
                                            lineHeight: fontFactor * wp(5.13),
                                            fontFamily: 'Poppins_400Regular',
                                            color: pressed
                                                ? '#f7f7f7'
                                                : '#1A91D7',
                                        }}
                                    >
                                        Sign Out
                                    </Text>
                                )}
                            </Pressable>
                        )}
                    </View>

                    <MarginVertical />
                    <SearchPosts fontFactor={fontFactor} />
                    <MarginVertical size={1.5} />

                    <PostMini fontFactor={fontFactor} />
                    <CreatePost
                        toggleModal={toggleModal}
                        visible={createPostModalVisible}
                        margin={margin}
                        headerSize={headerSize}
                        fontFactor={fontFactor}
                        newPost={true}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    postsHeading: {
        fontFamily: 'Poppins_500Medium',
        // fontFamily: 'popp',
    },
});

export default React.memo(Forum);
