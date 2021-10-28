import Constants from 'expo-constants';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ActivityIndicator,
    Modal,
} from 'react-native';
import { firebase } from '../helperFunctions/initializeFirebase';
import { connect } from 'react-redux';
import updateUser from '../redux/actions/updateUser';
import updateActiveForumAction from '../redux/actions/updateActiveForumAction';
import resetActiveForumAction from '../redux/actions/resetActiveForumAction';
import signOutUser from '../helperFunctions/signOutUser';
import GoogleAuthButton from '../components/GoogleAuthButton';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import makeQueryablePromise from '../helperFunctions/makeQueryablePromise';
import { store } from '../redux/store';
import onCreateNewPost from '../helperFunctions/onCreateNewPost';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

const isStandaloneApp =
    Constants.appOwnership !== 'expo' && Constants.appOwnership !== 'guest';

function ForumScreen({
    user,
    updateUser,
    activeForumAction,
    // resetActiveForumAction
    // updateActiveForumAction,
}) {
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            updateUser(user);
        });
    });

    //PostFlow
    firebase
        .firestore()
        .collection('/posts/050f7200-e143-4268-b4c8-58202f0832c3/comments')
        .onSnapshot((snapshot) =>
            console.log('doc length', snapshot.docs.length)
        );

    const createCommentAsync = (postRef, comment) => {
        return firebase.firestore().doc(postRef).set({
            postOwner: firebase.auth().currentUser.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            comment,
        });
    };

    const onCreateComment = (parentID, postID, comment) => {
        store.dispatch(updateActiveForumAction({ type: 'createComment' }));
        const postRef = `/posts/${parentID}/comments/${postID}`;
        store.dispatch(updateActiveForumAction({ postRef }));
        const request = makeQueryablePromise(
            createCommentAsync(postRef, comment)
        );
        store.dispatch(updateActiveForumAction({ queryableRequest: request }));
        request.then(
            (res) => {
                store.dispatch(
                    updateActiveForumAction({
                        resolved: true,
                        successful: true,
                    })
                );
                setTimeout(() => store.dispatch(resetActiveForumAction()), 300);
                console.log('passed', res);
            },
            (e) => {
                store.dispatch(
                    updateActiveForumAction({
                        resolved: true,
                        successful: false,
                    })
                );
                setTimeout(() => store.dispatch(resetActiveForumAction()), 300);
                console.log('failed', e.message);
            }
        );
    };

    console.log(
        'activeForumAction',
        activeForumAction,
        activeForumAction?.queryableRequest?.isPending
            ? activeForumAction.queryableRequest.isPending()
            : null
    );

    return (
        <View style={{ justifyContent: 'center', flex: 1 }}>
            <Text>{user ? 'Logged in' : 'Logged Out'}</Text>

            <GoogleAuthButton native={isStandaloneApp} />
            <Button title="signout" onPress={signOutUser} />
            <Button
                title="Toggle Last Post Time"
                disable={activeForumAction}
                onPress={() => {
                    console.log('pressed');
                    onCreateComment(
                        '050f7200-e143-4268-b4c8-58202f0832c3',
                        uuidv4(),
                        'comment'
                    );
                }}
            />
        </View>
    );
}

const mapStateToProps = ({ forumState: { user, activeForumAction } }) => ({
    user,
    activeForumAction,
});

export default connect(mapStateToProps, {
    updateUser,
    updateActiveForumAction,
    resetActiveForumAction,
})(ForumScreen);

const styles = StyleSheet.create({});
