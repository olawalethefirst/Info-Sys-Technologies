import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Pressable,
    RefreshControl,
    FlatList,
    Keyboard,
} from 'react-native';
import Forum from '../components/Forum';
import { connect } from 'react-redux';
import AddPost from '../components/AddPost';

import PostErrorModal from '../components/PostErrorModal';
import PostSuccessfulModal from '../components/PostSuccessfulModal';
import CreatePost from '../components/CreatePost';
import useCreatePost from '../hooks/useCreatePost';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import SecondaryHeader from '../components/SecondaryHeader';
import { useScrollToTop } from '@react-navigation/native';
import RenderPost from '../components/RenderPost';
import RenderSeparator from '../components/RenderSeparator';
import 'react-native-get-random-values';
import fetchPosts from '../redux/actions/fetchPosts';
import refreshPosts from '../redux/actions/refreshPosts';
import RenderPostsFooter from '../components/RenderPostsFooter';
import { Map } from 'immutable';
import RenderPostsHeader from '../components/RenderPostsHeader';
import checkColumnMode from '../helperFunctions/checkColumnMode';
import onEndOfPostsReached from '../helperFunctions/onEndOfPostsReached';
import { store } from '../redux/store';
import updateShowFooter from '../redux/actions/updateShowFooter';
import PropTypes from 'prop-types';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['[2022-01-']);

function ForumScreen({
    user,
    margin,
    fontFactor,
    headerSize,
    bodyHeight,
    deviceWidthClass,
    loadingPosts,
    loadingPostsError,
    refreshPosts,
    refreshingPosts,
    posts,
    fetchPosts,
    searching,
    searchResult,
    updateShowFooter,
    showFooter,
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
    const scrollRef = useRef(null);
    useScrollToTop(scrollRef);
    const tabBarHeight = useBottomTabBarHeight();
    const effectiveBodyHeight = bodyHeight - tabBarHeight;

    const itemLength = wp(25) * fontFactor;
    const itemOffset = (wp(25) + wp(4.4)) * fontFactor;
    const columnMode = checkColumnMode(deviceWidthClass);
    const getItemLayout = (data, index) => {
        return { length: itemLength, offset: itemOffset * index, index };
    };
    const handleScroll = ({
        nativeEvent: { contentSize, layoutMeasurement },
    }) => {
        const newShowFooter = contentSize.height > layoutMeasurement.height;
        const oldShowFooter = store.getState().forumTempState.showFooter;

        if (oldShowFooter !== newShowFooter) {
            updateShowFooter(newShowFooter);
        }
    };
    const onRefresh = () => !searching && refreshPosts(); //does nothing if search active
    const immutableExtraData = Map({
        loadingPosts,
        loadingPostsError,
        searching,
    });
    const onEndReached = () =>
        onEndOfPostsReached(
            loadingPosts,
            loadingPostsError,
            fetchPosts,
            posts[posts.length - 1].postID,
            searching,
            true
        ); //only loads more if certain conditions are met
    const retryLoadMorePosts = () =>
        onEndOfPostsReached(
            loadingPosts,
            loadingPostsError,
            fetchPosts,
            posts[posts.length - 1].postID,
            searching
        ); //retries to load more after encountering error
    const styles2 = StyleSheet.create({
        containerHeight: {
            height: effectiveBodyHeight,
        },
        flatlistContentContainer: {
            paddingHorizontal: margin,
            width: columnMode ? '90%' : '100%',
        },
    });

    useEffect(() => {
        // fetchPosts();
    }, [fetchPosts]);

    // const createPlentyPosts = async () => {
    //     const wordsArray = [
    //         'To',
    //         'is',
    //         'Has',
    //         'And',
    //         'in',
    //         'About',
    //         'inside',
    //         'From',
    //         'without',
    //         'Within',
    //         'under',
    //         'deeply',
    //         'Below',
    //         'Adapt',
    //         'transform',
    //     ];
    //     // check firebase to enforce field value to one of a catgeroies array
    //     const categories = [
    //         'Computer Maintenance',
    //         'Audit',
    //         'Accounting',
    //         'Networking',
    //     ];
    //     let i = 0;
    //     while (i < 300) {
    //         i++;

    //         const wordsRandomNo = Math.floor(Math.random() * wordsArray.length);
    //         const catgRandNo = Math.floor(Math.random() * categories.length);
    //         const body = [];
    //         for (let i = 0; i <= wordsRandomNo; i++) {
    //             body.push(wordsArray[i]);
    //         }

    //         createPostAsync(
    //             i + '',
    //             body.join(' '),
    //             categories[catgRandNo],
    //             uuidv4()
    //         )
    //             .then((doc) => console.log(doc, ' added successfully'))
    //             .catch((doc) => console.log(doc, 'add failed'));
    //     }
    // };
    // const createPostLikes = async () => {
    //     const usersArray = [
    //         'qllAFZtSkqX7GuaZ9oW97zPhWKT2',
    //         'f7Rk6WbGnUYwuD9oZO6gJiufWQ32',
    //         'IW4GkxsLm9giSV18tnkOjvPrNXr1',
    //         'BNfIHiYJuCQFcgxLhTipUQ6SXx82',
    //         'sEQjfFZdlVbMpUwAASv5lzhj8vs2',
    //         'F8mr2nPWVoOethu5S5JvQZAqPk92',
    //         'EDWbWh3Y64aPYFGzMrPiKNqoCJD3',
    //         '2dEkCa3zkYRR0kZm7Z8ceKKy4Ua2',
    //         'x3laHuM1UPRt2KODV7qUXju3WMW2',
    //         'ZwM019QIzmcoF0sqDFA42ZS1u3X2',
    //         '1nGrqRqTIfRhaJS5k4eo26B2iZf1',
    //         '5KayyblP7CNUFYGfUoFKVwdJ0kr1',
    //         'hNuhIlPkrMTDGcePSn1TYMsT8bk2',
    //         'AMDhHJ23XSaQXmEUzWzI6ve8aL03',
    //         'lxiPfnbvixarHzg7vk4zF2drlZi1',
    //     ];

    //     for (let i in posts) {
    //         const postID = posts[i].postID;
    //         const randomNoOfLikes = Math.floor(
    //             Math.random() * usersArray.length
    //         );
    //         for (let j = 0; j < randomNoOfLikes; j++) {
    //             const userID = usersArray[j];
    //             onLikePost(postID, userID);
    //         }
    //     }
    // };

    return (
        <SafeAreaView style={styles2.containerHeight}>
            <View style={styles.flex1}>
                <Pressable onPress={() => Keyboard.dismiss()}>
                    <SecondaryHeader
                        heading={'Forum'}
                        headerSize={headerSize}
                        margin={margin}
                        fontFactor={fontFactor}
                    />
                    <Forum
                        fontFactor={fontFactor}
                        user={user}
                        margin={margin}
                    />
                </Pressable>
                <FlatList
                    contentContainerStyle={styles2.flatlistContentContainer}
                    data={searching ? searchResult : posts} //switch between data source
                    extraData={immutableExtraData}
                    renderItem={RenderPost}
                    keyExtractor={(item, index) => 'keyExtractor' + index}
                    ref={scrollRef}
                    getItemLayout={getItemLayout}
                    keyboardDismissMode={'none'}
                    keyboardShouldPersistTaps="never"
                    ListHeaderComponent={
                        <RenderPostsHeader
                            fontFactor={fontFactor}
                            loadingPostsError={loadingPostsError}
                            showHeader={
                                searching
                                    ? !!searchResult?.length
                                    : !!posts?.length
                            }
                        />
                    }
                    onScroll={handleScroll}
                    ListFooterComponent={
                        <RenderPostsFooter
                            loadingPosts={loadingPosts}
                            fontFactor={fontFactor}
                            loadingPostsError={loadingPostsError}
                            posts={posts}
                            searchResult={searchResult}
                            searching={searching}
                            showFooter={showFooter}
                            retryLoadMorePosts={retryLoadMorePosts}
                        />
                    }
                    ItemSeparatorComponent={RenderSeparator}
                    refreshing={refreshingPosts}
                    // onRefresh={onRefresh}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshingPosts}
                            onRefresh={onRefresh}
                            colors={['#1A91D7']}
                            tintColor={'#1A91D7'}
                        />
                    }
                    onEndReachedThreshold={2}
                    onEndReached={onEndReached}
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
            </View>
        </SafeAreaView>
    );
}

const mapStateToProps = ({
    forumState: { posts },
    settingsState: {
        margin,
        fontFactor,
        headerSize,
        bodyHeight,
        deviceWidthClass,
    },
    forumTempState: {
        user,
        loadingPosts,
        loadingPostsError,
        refreshingPosts,
        searching,
        searchResult,
        showFooter,
    },
}) => ({
    user,
    margin,
    fontFactor,
    headerSize,
    bodyHeight,
    deviceWidthClass,
    posts,
    loadingPosts,
    loadingPostsError,
    refreshingPosts,
    searching,
    searchResult,
    showFooter,
});

ForumScreen.propTypes = {
    user: PropTypes.object,
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
    headerSize: PropTypes.number,
    bodyHeight: PropTypes.number,
    deviceWidthClass: PropTypes.string,
    loadingPosts: PropTypes.bool,
    loadingPostsError: PropTypes.string,
    refreshPosts: PropTypes.func,
    refreshingPosts: PropTypes.bool,
    posts: PropTypes.array,
    fetchPosts: PropTypes.func,
    searching: PropTypes.bool,
    searchResult: PropTypes.array,
    updateShowFooter: PropTypes.func,
    showFooter: PropTypes.bool,
};

export default connect(mapStateToProps, {
    fetchPosts,
    refreshPosts,
    updateShowFooter,
})(ForumScreen);

const styles = StyleSheet.create({
    flex1: {
        flex: 1,
    },
});
