import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    Pressable,
    FlatList,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MarginVertical from './MarginVertical';
import SearchPosts from './SearchPosts';
import checkColumnMode from '../helperFunctions/checkColumnMode';
import { useNavigation } from '@react-navigation/native';
import signOutUser from '../helperFunctions/signOutUser';
import { firebase } from '../helperFunctions/initializeFirebase';
import updatePosts from '../redux/actions/updatePosts';
import updateActiveForumAction from '../redux/actions/updateActiveForumAction';
import { connect } from 'react-redux';
import updatePostsDataSource from '../redux/actions/updatePostsDataSource';
import getPosts from '../helperFunctions/getPosts';
import updatePostsFirstBatch from '../redux/actions/updatePostsFirstBatch';

const Forum = ({
    margin,
    fontFactor,
    headerSize,
    deviceWidthClass,
    createPostModalVisible,
    toggleModal,
    user,
    posts,
    updatePosts,
    updatePostsDataSource,
    activeForumAction,
    fromCache,
    updateActiveForumAction,
    updatePostsFirstBatch,
}) => {
    const columnMode = checkColumnMode(deviceWidthClass);
    const navigation = useNavigation();
    const ITEM_HEIGHT = (wp(25) + wp(4.4)) * fontFactor;

    // Move posts to foum screen
    useEffect(() => {
        console.log('useEffect triggered');
        firebase
            .firestore()
            .collection('posts')
            .orderBy('createdAt', 'desc')
            // .limit(100)
            .get()
            // getPosts(true)
            .then((snapshot) => {
                console.log('I can be gotten');
                if (!snapshot.metadata.fromCache) {
                    const posts = snapshot.docs.map((doc) => ({
                        postID: doc.ref.id,
                        ...doc.data(),
                    }));

                    updatePostsFirstBatch(posts);
                }

                // updatePostsDataSource(snapshot.metadata.fromCache);
                console.log('still has it', snapshot.metadata);
                // console.log(snapshot.metadata)
            })
            .catch(() => console.log('failed'));

        // setTimeout(()=>{
        // const lastPostRef = firebase.firestore().collection('posts').doc(posts[posts.length -1].postID)
        // console.log(lastPostRef)
        //     // firebase
        //     // .firestore()
        //     // .collection('posts')
        //     // .orderBy('createdAt', 'desc')
        //     // .limit(25).startAfter()
        //     // .get()
        // }, 1000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const lastPostRef = posts.length
        ? firebase
              .firestore()
              .collection('posts')
              .doc(posts[posts.length - 1].postID)
        : null;

    // posts.length &&
    //     getPosts(null, null, lastPostRef)
    //         .then((snapshot) => {
    //             console.log('I can also be gotten');
    //             const posts = snapshot.docs.map((doc) => ({
    //                 postID: doc.ref.id,
    //                 ...doc.data(),
    //             }));

    //             console.log('posts 2', posts);

    //             // updatePostsDataSource(snapshot.metadata.fromCache);
    //             // console.log('still has it', snapshot.metadata);
    //             // console.log(snapshot.metadata)
    //         })
    //         .catch(() => console.log('failed'));

    //approach by increasing limits instead
    // useEffect(() => {
    //     const listener = firebase
    //         .firestore()
    //         .collection('posts')
    //         .orderBy('createdAt', 'desc')
    //         .startAfter(posts[posts.length - 1])
    //         .limit(20)
    //         .get((snapshot) => {
    //             if (posts?.length === 20) {
    //                 console.log('about to call next');
    //                 if (!snapshot.metadata.fromCache) {
    //                     const newPosts = snapshot.docs.map((doc) => doc.data());
    //                     console.log(posts[posts.length - 1], newPosts);
    //                     // updatePosts(
    //                     //     posts
    //                     // );
    //                 }
    //             }

    //             console.log(snapshot.metadata);
    //         });
    //     return listener;
    // }, [updatePosts, posts]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
                style={[
                    {
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

const mapStateToProps = ({
    forumState: { user },
    settingsState: {
        margin,
        fontFactor,
        headerSize,
        deviceWidthClass,
    },
    forumTempState: { activeForumAction, fromCache, posts },
}) => {
    return {
        margin,
        fontFactor,
        headerSize,
        deviceWidthClass,
        user,
        posts,
        activeForumAction,
        fromCache,
    };
};

export default connect(mapStateToProps, {
    updatePosts,
    updatePostsDataSource,
    updateActiveForumAction,
    updatePostsFirstBatch,
})(React.memo(Forum));
