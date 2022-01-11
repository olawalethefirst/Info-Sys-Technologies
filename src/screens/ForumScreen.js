import Constants from 'expo-constants';
import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    Button,
    Dimensions,
    Platform,
    Animated,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    View,
} from 'react-native';
import SubScreenTemplate from '../components/SubScreenTemplate';
import Forum from '../components/Forum';
import Footer from '../components/Footer';
import { firebase } from '../helperFunctions/initializeFirebase';
import { connect } from 'react-redux';
import updateUser from '../redux/actions/updateUser';
import scrollToTop from '../helperFunctions/scrollToTop';
import AddPost from '../components/AddPost';
import { CommonActions } from '@react-navigation/native';
// import { LogBox } from 'react-native';
// LogBox.ignoreAllLogs();
import PostErrorModal from '../components/PostErrorModal';
import PostSuccessfulModal from '../components/PostSuccessfulModal';
import CreatePost from '../components/CreatePost';
import useCreatePost from '../hooks/useCreatePost';
import updatePostsFirstBatch from '../redux/actions/updatePostsFirstBatch';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PostMini from '../components/PostMini';
import MarginVertical from '../components/MarginVertical';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import SecondaryHeader from '../components/SecondaryHeader';
import {stickyHeaderHeight} from '../constants'

const isStandaloneApp =
    Constants.appOwnership !== 'expo' && Constants.appOwnership !== 'guest';

function ForumScreen({
    user,
    margin,
    fontFactor,
    headerSize,
    bodyHeight,
    deviceWidthClass,
    navigation,
    updateUser,
    updatePostsFirstBatch,
    posts,
}) {
    const [createPostModalVisible, setCreatePostModalVisible] = useState(false);
    const toggleModal = () => {
        setCreatePostModalVisible((prevState) => !prevState);
    };
    const [
        postSuccessful,
        postError,
        activityIndicator,
        createPost,
        resetPostError,
        resetPostSuccessful,
        retryCreatePost,
    ] = useCreatePost(toggleModal);
    const { statusBarHeight } = Constants;
    const AnimatedImageBackground =
        Animated.createAnimatedComponent(ImageBackground);
    const sectionComponents = [
        {
            key: '0',
            data: (
                <Forum
                    createPostModalVisible={createPostModalVisible}
                    toggleModal={toggleModal}
                    key="0"
                    user={user}
                />
            ),
        },
        ...posts,
    ];
    const scrollRef = useRef(null);
    const scrollY = useRef(new Animated.Value(0));
    const handleScroll = Animated.event(
        [
            {
                nativeEvent: {
                    contentOffset: { y: scrollY.current },
                },
            },
        ],
        {
            useNativeDriver: true,
        }
    );
    const clampedScrollY = Animated.diffClamp(scrollY.current, 0, stickyHeaderHeight);
    const translateY = clampedScrollY.interpolate({
        inputRange: [0, stickyHeaderHeight],
        outputRange: [0, -stickyHeaderHeight],
    });
    const tabBarHeight = useBottomTabBarHeight();
    const effectiveBodyHeight = bodyHeight - tabBarHeight;
    const renderItem = ({
        item: { title, body, category, createdAt, owner },
    }) => <PostMini fontFactor={fontFactor} />;

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                updateUser(user);
            } else {
                updateUser(null);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // console.log(activityIndicator);
    // console.log('posts length', posts);

    return (
        <SafeAreaView style={{ height: effectiveBodyHeight }}>
            <SecondaryHeader
                heading={'Forum'}
                headerSize={headerSize}
                margin={margin}
                translateY={translateY}
                fontFactor={fontFactor}
            />

            <Animated.FlatList
                nestedScrollEnabled
                style={{ zIndex: -1 }}
                scrollEventThrottle={16}
                onScroll={handleScroll}
                contentContainerStyle={{
                    minHeight: effectiveBodyHeight + stickyHeaderHeight, //adding stickyHeaderHeight makes sticky header hide'able even when posts are yet to be loaded
                    paddingTop: stickyHeaderHeight,
                }}
                data={sectionComponents}
                bounces={false}
                renderItem={({ item, index }) => {
                    if (item.data) {
                        return item.data;
                    }
                    return (
                        <>
                            <PostMini fontFactor={fontFactor} />
                            <MarginVertical />
                        </>
                    );
                }}
                keyExtractor={(item, index) => 'keyExtractor' + index}
                ref={scrollRef}
                keyboardDismissMode={'none'}
                keyboardShouldPersistTaps="handled"
                // ListFooterComponent={() => (
                //     <View style={{ height: 100, backgroundColor: 'blue' }} />
                // )}
            />

            <AddPost
                margin={margin}
                headerSize={headerSize}
                fontFactor={fontFactor}
                toggleModal={toggleModal}
                user={user}
                disabled={activityIndicator.current}
            />
            {user && (
                <>
                    <CreatePost
                        toggleModal={toggleModal}
                        visible={createPostModalVisible}
                        margin={margin}
                        headerSize={headerSize}
                        fontFactor={fontFactor}
                        newPost={true}
                        onSubmitSuccessful={createPost}
                    />
                    <PostErrorModal
                        visible={postError}
                        toggleModal={resetPostError}
                        retryCreatePost={retryCreatePost}
                        fontFactor={fontFactor}
                        margin={margin}
                    />
                    <PostSuccessfulModal
                        visible={postSuccessful}
                        toggleModal={resetPostSuccessful}
                        fontFactor={fontFactor}
                        margin={margin}
                    />
                </>
            )}
        </SafeAreaView>
    );
}

const mapStateToProps = ({
    forumState: { user },
    settingsState: {
        margin,
        fontFactor,
        headerSize,
        bodyHeight,
        deviceWidthClass,
    },
    forumTempState: { posts },
}) => ({
    user,
    margin,
    fontFactor,
    headerSize,
    bodyHeight,
    deviceWidthClass,
    posts,
});

export default connect(mapStateToProps, {
    updateUser,
    updatePostsFirstBatch,
})(ForumScreen);

const styles = StyleSheet.create({});
