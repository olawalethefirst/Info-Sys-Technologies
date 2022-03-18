import React, { useState, useRef, useEffect, useCallback } from 'react';
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
import PostResultModal from '../components/PostResultModal';
import CreatePost from '../components/CreatePost';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
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
import loadMorePosts, {
    ON_END_REACHED,
    RETRY_LOAD_MORE_POSTS,
} from '../helperFunctions/loadMorePosts';
import { store } from '../redux/store';
import updateShowFooter from '../redux/actions/updateShowFooter';
import PropTypes from 'prop-types';
import UsernameModal from '../components/UsernameModal';
import onLikePostAsync from '../helperFunctions/onLikeAsync';
import createPostAsync from '../helperFunctions/createPostAsync';
import { v4 as uuidv4 } from 'uuid';
import onUnlikePostAsync from '../helperFunctions/onUnlikeAsync';
import updateUsernameAsync from '../helperFunctions/updateUsernameAsync';
import { auth } from '../helperFunctions/initializeFirebase';
import CallToAuth from '../components/CallToAuth';

function ForumScreen({
    uid,
    margin,
    fontFactor,
    headerSize,
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
    effectiveBodyHeight,
    username,
    navigation,
}) {
    //State related hooks
    const [createPostModalVisible, setCreatePostModalVisible] = useState(false);
    const [navigationFocussed, setNavigationFocussed] = useState(false);
    const scrollRef = useRef(null);

    //Variables & Fns
    useScrollToTop(scrollRef);
    const toggleModal = useCallback(() => {
        setCreatePostModalVisible((prevState) => !prevState);
    }, []);
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
    const onRefresh = useCallback(
        () => !searching && refreshPosts(),
        [searching, refreshPosts]
    ); //does nothing if search active
    const onEndReached = useCallback(
        () =>
            loadMorePosts(
                ON_END_REACHED,
                loadingPosts,
                loadingPostsError,
                fetchPosts,
                posts[posts.length - 1].postID,
                searching
            ),
        [loadingPosts, loadingPostsError, fetchPosts, posts, searching]
    ); //only loads more if certain conditions are met
    const retryLoadMorePosts = useCallback(() => {
        posts.length
            ? loadMorePosts(
                  RETRY_LOAD_MORE_POSTS,
                  loadingPosts,
                  loadingPostsError,
                  fetchPosts,
                  posts[posts.length - 1].postID,
                  searching
              )
            : fetchPosts();
    }, [loadingPosts, loadingPostsError, fetchPosts, posts, searching]); //retries to load more after encountering error
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
        fetchPosts();
    }, [fetchPosts]);

    useEffect(() => {
        const events = ['focus', 'blur'];

        const unsubscribers = events.map((event) =>
            navigation.addListener(event, () =>
                setNavigationFocussed(event === events[0])
            )
        );

        return () => {
            unsubscribers.forEach((unsubscribe) => unsubscribe());
        };
    }, [navigation]);

    const createPlentyPosts = async () => {
        const wordsArray = [
            'To',
            'is',
            'Has',
            'And',
            'in',
            'About',
            'inside',
            'From',
            'without',
            'Within',
            'under',
            'deeply',
            'Below',
            'Adapt',
            'transform',
        ];
        // check firebase to enforce field value to one of a catgeroies array
        const categories = [
            'Computer Maintenance',
            'Audit',
            'Accounting',
            'Networking',
        ];
        let i = 0;
        while (i < 300) {
            i++;

            const wordsRandomNo = Math.floor(Math.random() * wordsArray.length);
            const catgRandNo = Math.floor(Math.random() * categories.length);
            const body = [];
            for (let i = 0; i <= wordsRandomNo; i++) {
                body.push(wordsArray[i]);
            }

            createPostAsync({
                title: i + '',
                body: body.join(' '),
                category: categories[catgRandNo],
                postID: uuidv4(),
            })
                .then((doc) => console.log(doc, ' added successfully'))
                .catch((doc) => console.log(doc, 'add failed'));
        }
    };
    let [successfulLikes, setSuccessfulLikes] = useState([]);
    const createPostLikes = async () => {
        const postsNew = posts.slice(0, 5);
        const usersArray = [
            'VoYc7W6H3oRbw5BjT3JYnw9DUoG2',
            'P4qMLAPr1WeSxrbQQTbYM6WgHQT2',
            'LkxUCko4UGTZgMcp8orfNd8dZz72',
            'SsJ1ya4qyOMDsknQMwLYGIZzXlk2',
            'pjj2dQRdIYMCIJB2JxQoTnl0NTE2',
            'haepGhJypbht0oHbHApyKfivvA62',
            'aK7O1suSWrS29VvYZUZNfDUFxZJ2',
            'pB0JrJQVhHbJS8CUojeq5kwpFg93',
            'eKNlvbNMUjh8yD8yirV7UIB3xDr1',
            'IJ7zgq586xU4vE4AD2rCjCAcmD13',
            'VAfSwYuG7xSrCvcDYnreFETED1z1',
            's0FfZE2Gt9bSnCn7MxdXVa3nEJ93',
            '8hJaaU7pEweuw1axytUV3bvgfBg1',
            'H9ipzu2DUrMphFTh4ZbnM2FT5UR2',
            'Wfjh4Lbf2VdW3jTKVCuHneu4YrV2',
            'wgxecR5YwdUqpc4Cq0BSDgpBA5h1',
            'cu7m1C2Q84X9GOwAhRbIFIQbAYd2',
            'V7ieKSKNRDXdMITzZYu5wSuspxF3',
            'uC27AtsRs1Xc7HCFqNuWO5yygxt2',
        ];

        for (let i in postsNew) {
            const { postID, title } = postsNew[i];
            const randomNoOfLikes = Math.floor(
                Math.random() * usersArray.length
            );
            for (let j = 0; j <= randomNoOfLikes; j++) {
                const userID = usersArray[j];
                console.log(
                    `posting like for UID: ${userID} in post title: ${title} with postID: ${postID}`
                );
                onLikePostAsync(postID, 'post', userID)
                    .then(() =>
                        setSuccessfulLikes((oldState) => [
                            ...oldState,
                            `posting like for UID: ${userID} in post title: ${title} with postID: ${postID} successful`,
                        ])
                    )
                    .catch((e) =>
                        console.log(
                            `posting like for UID: ${userID} in post title: ${title} with postID: ${postID} failed`,
                            e.message
                        )
                    );
            }
        }
    };
    console.log('successfulLikes: ', successfulLikes.length);

    return (
        <SafeAreaView style={[styles2.containerHeight]}>
            <View style={styles.flex1}>
                <Pressable onPress={() => Keyboard.dismiss()}>
                    <SecondaryHeader
                        heading={'Forum'}
                        headerSize={headerSize}
                        margin={margin}
                        fontFactor={fontFactor}
                    />
                    <Forum fontFactor={fontFactor} uid={uid} margin={margin} />
                </Pressable>
                <FlatList
                    contentContainerStyle={styles2.flatlistContentContainer}
                    data={searching ? searchResult : posts} //switch data source
                    extraData={Map({
                        loadingPosts,
                        loadingPostsError,
                        searching,
                    })}
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
                    onRefresh={onRefresh}
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
                <AddPost toggleModal={toggleModal} />
                {uid && (
                    <>
                        <CreatePost
                            toggleModal={toggleModal}
                            visible={createPostModalVisible}
                            onSubmitSuccessful={null}
                        />
                        <PostResultModal
                            name="postResultModal1"
                            navigationFocussed={navigationFocussed}
                        />
                        <UsernameModal initialAction={toggleModal} />
                    </>
                )}
                {!uid && (
                    <>
                        <CallToAuth />
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
        deviceWidthClass,
        effectiveBodyHeight,
    },
    forumTempState: {
        uid,
        loadingPosts,
        loadingPostsError,
        refreshingPosts,
        searching,
        searchResult,
        showFooter,
        username,
    },
}) => ({
    uid,
    margin,
    fontFactor,
    headerSize,
    deviceWidthClass,
    posts,
    loadingPosts,
    loadingPostsError,
    refreshingPosts,
    searching,
    searchResult,
    showFooter,
    effectiveBodyHeight,
    username,
});

ForumScreen.propTypes = {
    uid: PropTypes.string,
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
    headerSize: PropTypes.number,
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
