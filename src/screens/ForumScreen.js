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
import useCreatePost from '../hooks/useCreatePost';
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
import onEndOfPostsReached from '../helperFunctions/onEndOfPostsReached';
import { store } from '../redux/store';
import updateShowFooter from '../redux/actions/updateShowFooter';
import PropTypes from 'prop-types';
import UsernameModal from '../components/UsernameModal';
// import onLikePostAsync from '../helperFunctions/onLikePostAsync';
// import createPostAsync from '../helperFunctions/createPostAsync';
// import { v4 as uuidv4 } from 'uuid';
// import onUnlikePostAsync from '../helperFunctions/onUnlikePostAsync';
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
}) {
    //State related hooks
    const [createPostModalVisible, setCreatePostModalVisible] = useState(false);
    const [
        postSuccessful,
        postError,
        activityIndicator,
        writePost,
        resetFailedPostAction,
        resetSuccessfulPostAction,
        retryWrite,
    ] = useCreatePost();
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
    const immutableExtraData = Map({
        loadingPosts,
        loadingPostsError,
        searching,
    });
    const onEndReached = useCallback(
        () =>
            onEndOfPostsReached(
                loadingPosts,
                loadingPostsError,
                fetchPosts,
                posts[posts.length - 1].postID,
                searching,
                true
            ),
        [loadingPosts, loadingPostsError, fetchPosts, posts, searching]
    ); //only loads more if certain conditions are met
    const retryLoadMorePosts = useCallback(
        () =>
            onEndOfPostsReached(
                loadingPosts,
                loadingPostsError,
                fetchPosts,
                posts[posts.length - 1].postID,
                searching
            ),
        [loadingPosts, loadingPostsError, fetchPosts, posts, searching]
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
        fetchPosts();
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
    //     // console.log('mo beere o');
    //     // const postsNew = posts.splice(40, 60);
    //     // const usersArray = [
    //     //     'qllAFZtSkqX7GuaZ9oW97zPhWKT2',
    //     //     'f7Rk6WbGnUYwuD9oZO6gJiufWQ32',
    //     //     'IW4GkxsLm9giSV18tnkOjvPrNXr1',
    //     //     'BNfIHiYJuCQFcgxLhTipUQ6SXx82',
    //     //     'sEQjfFZdlVbMpUwAASv5lzhj8vs2',
    //     //     'F8mr2nPWVoOethu5S5JvQZAqPk92',
    //     //     'EDWbWh3Y64aPYFGzMrPiKNqoCJD3',
    //     //     '2dEkCa3zkYRR0kZm7Z8ceKKy4Ua2',
    //     //     'x3laHuM1UPRt2KODV7qUXju3WMW2',
    //     //     'ZwM019QIzmcoF0sqDFA42ZS1u3X2',
    //     //     '1nGrqRqTIfRhaJS5k4eo26B2iZf1',
    //     //     '5KayyblP7CNUFYGfUoFKVwdJ0kr1',
    //     //     'hNuhIlPkrMTDGcePSn1TYMsT8bk2',
    //     //     'AMDhHJ23XSaQXmEUzWzI6ve8aL03',
    //     //     'lxiPfnbvixarHzg7vk4zF2drlZi1',
    //     // ];

    //     // for (let i in postsNew) {
    //     //     const postID = postsNew[i].postID;
    //     //     const randomNoOfLikes = Math.floor(
    //     //         Math.random() * usersArray.length
    //     //     );
    //     //     for (let j = 0; j < randomNoOfLikes; j++) {
    //     //         const userID = usersArray[j];
    //     //         onLikePostAsync(postID, userID);
    //     //     }
    //     // }

    //     try {
    //         await onLikePostAsync(
    //             '6d6c129a-bfba-4ef9-89b0-ab0540dcfd5c',
    //             'AMDhHJ23XSaQXmEUzWzI6ve8aL03'
    //         );
    //         console.log('passed');
    //     } catch (err) {
    //         console.log('failed', err.message);
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
                    <Forum fontFactor={fontFactor} uid={uid} margin={margin} />
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
                <AddPost
                    toggleModal={toggleModal}
                    disabled={activityIndicator}
                />
                {uid && (
                    <>
                        <CreatePost
                            toggleModal={toggleModal}
                            visible={createPostModalVisible}
                            onSubmitSuccessful={writePost}
                            // deactivateActiveModal={deactivateActiveModal}
                        />
                        <PostResultModal
                            postSuccessful={postSuccessful}
                            postError={postError}
                            resetSuccessfulPostAction={
                                resetSuccessfulPostAction
                            }
                            resetFailedPostAction={resetFailedPostAction}
                            retryWrite={retryWrite}
                        />
                        <UsernameModal />
                    </>
                )}
                {true && (
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
