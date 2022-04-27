import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    RefreshControl,
    FlatList,
    Keyboard,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MarginVertical from './MarginVertical';
import SearchPosts from './SearchPosts';
import { useNavigation } from '@react-navigation/native';
import signOutUser from '../helperFunctions/signOutUser';
import PropTypes from 'prop-types';
import ForumAuthButton from './ForumAuthButton';
import { connect } from 'react-redux';
import AddPost from './AddPost';
import PostResultModal from './PostResultModal';
import CreatePost from './CreatePost';
import SecondaryHeader from './SecondaryHeader';
import RenderPost from './RenderPost';
import RenderSeparator from './RenderSeparator';
import 'react-native-get-random-values';
import fetchPosts from '../redux/actions/fetchPosts';
import refreshPosts from '../redux/actions/refreshPosts';
import RenderForumFooter from './RenderForumFooter';
import { Map } from 'immutable';
import RenderForumHeader from './RenderForumHeader';
import checkColumnMode from '../helperFunctions/checkColumnMode';
import loadMorePosts, {
    ON_END_REACHED,
    RETRY_LOAD_MORE_POSTS,
} from '../helperFunctions/loadMorePosts';
import updateShowFooter from '../redux/actions/updateShowFooter';
import UsernameModal from './UsernameModal';
import { useIsFocused } from '@react-navigation/native';
import CallToAuth from './CallToAuth';

const Forum = ({
    margin,
    fontFactor,
    uid,
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
    username,
    scrollRef,
}) => {
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
        flatlistContentContainer: {
            paddingHorizontal: margin,
            width: columnMode ? '90%' : '100%',
        },
    });
    //State related hooks
    const [flatListHeight, setFlatListHeight] = useState(0);
    const [contentHeight, setContentHeight] = useState(0);
    const [createPostModalVisible, setCreatePostModalVisible] = useState(false);
    const isFocused = useIsFocused();

    //Variables & Fns
    const toggleModal = useCallback(() => {
        setCreatePostModalVisible((prevState) => !prevState);
    }, []);
    const itemLength = wp(25) * fontFactor;
    const itemOffset = (wp(25) + wp(4.4)) * fontFactor;
    const columnMode = checkColumnMode(deviceWidthClass);
    const getItemLayout = (data, index) => {
        return { length: itemLength, offset: itemOffset * index, index };
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
                searching,
                posts.length > 0
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

    useEffect(() => {
        fetchPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        updateShowFooter(contentHeight > flatListHeight);
    }, [flatListHeight, contentHeight, updateShowFooter]);

    return (
        <View style={{ flex: 1 }}>
            <Pressable onPress={() => Keyboard.dismiss()}>
                <SecondaryHeader
                    heading={'Forum'}
                    headerSize={headerSize}
                    margin={margin}
                    fontFactor={fontFactor}
                />
                <View style={styles2.paddingHorizontalMargin}>
                    {!uid && (
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
                                <ForumAuthButton
                                    text={'Sign Up'}
                                    onPress={() =>
                                        navigation.navigate('Auth', {
                                            viewAnimatedValue: 0,
                                        })
                                    }
                                    backgroundColor={'#fff'}
                                    activeBackgroundColor={'#161B26'}
                                    textColor={'#161B26'}
                                    activeTextColor={'#fff'}
                                    borderColor={'#161B26'}
                                />

                                <ForumAuthButton
                                    text={'Sign In'}
                                    onPress={() =>
                                        navigation.navigate('Auth', {
                                            viewAnimatedValue: 1,
                                        })
                                    }
                                    backgroundColor={'#1A91D7'}
                                    activeBackgroundColor={'#f7f7f7'}
                                    textColor={'#fff'}
                                    activeTextColor={'#1A91D7'}
                                    borderColor={'#1A91D7'}
                                />
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
                        {uid && (
                            <View style={styles.alignSelfFlexEnd}>
                                <ForumAuthButton
                                    text={'Sign Out'}
                                    onPress={signOutUser}
                                    backgroundColor={'#fff'}
                                    activeBackgroundColor={'#1A91D7'}
                                    textColor={'#1A91D7'}
                                    activeTextColor={'#fff'}
                                    borderColor={'#1A91D7'}
                                />
                            </View>
                        )}
                    </View>
                    <MarginVertical />
                    <SearchPosts />
                </View>
            </Pressable>
            <FlatList
                onLayout={({
                    nativeEvent: {
                        layout: { height },
                    },
                }) => setFlatListHeight(height)}
                onContentSizeChange={(width, height) =>
                    setContentHeight(height)
                }
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
                    <RenderForumHeader
                        fontFactor={fontFactor}
                        loadingPostsError={loadingPostsError}
                        showFooter={showFooter}
                        searching={searching}
                        searchResultEmpty={!searchResult.length}
                        postsEmpty={!posts.length}
                    />
                }
                ListFooterComponent={
                    <RenderForumFooter
                        loadingPosts={loadingPosts}
                        fontFactor={fontFactor}
                        loadingPostsError={loadingPostsError}
                        searching={searching}
                        showFooter={showFooter}
                        retryLoadMorePosts={retryLoadMorePosts}
                        searchResultEmpty={!searchResult.length}
                        postsEmpty={!posts.length}
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
                        navigationFocussed={isFocused}
                    />
                    <UsernameModal
                        initialAction={() => {
                            if (username) {
                                toggleModal();
                            }
                        }}
                    />
                </>
            )}
            {!uid && <CallToAuth />}
        </View>
    );
};

Forum.propTypes = {
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
    uid: PropTypes.string,
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
    scrollRef: PropTypes.object,
    username: PropTypes.string,
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
export default connect(mapStateToProps, {
    fetchPosts,
    refreshPosts,
    updateShowFooter,
})(Forum);
