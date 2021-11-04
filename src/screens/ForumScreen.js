import Constants from 'expo-constants';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, SafeAreaView, Button } from 'react-native';
import SubScreenTemplate from '../components/SubScreenTemplate';
import Forum from '../components/Forum';
import Footer from '../components/Footer';
import { firebase } from '../helperFunctions/initializeFirebase';
import { connect } from 'react-redux';
import updateUser from '../redux/actions/updateUser';
import scrollToTop from '../helperFunctions/scrollToTop';
import NewPost from '../components/NewPost';

// import { LogBox } from 'react-native';
// LogBox.ignoreAllLogs();

const isStandaloneApp =
    Constants.appOwnership !== 'expo' && Constants.appOwnership !== 'guest';

function ForumScreen({ user, margin, fontFactor, headerSize, bodyHeight }) {
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            updateUser(user);
        });
    });

    const scrollRef = useRef(null);
    const sectionComponents = [
        {
            key: '0',
            data: (
                <Forum
                    bodyHeight={bodyHeight}
                    margin={margin}
                    fontFactor={fontFactor}
                />
            ),
        },
        {
            key: '1',
            data: (
                <Footer
                    headerSize={headerSize}
                    darkMode={false}
                    margin={margin}
                    fontFactor={fontFactor}
                    scrollToTop={scrollToTop}
                    scrollRef={scrollRef}
                />
            ),
        },
    ];

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SubScreenTemplate
                margin={margin}
                fontFactor={fontFactor}
                headerSize={headerSize}
                heading="Forum"
                sectionComponents={sectionComponents}
                scrollRef={scrollRef}
            />
            <NewPost
                margin={margin}
                headerSize={headerSize}
                fontFactor={fontFactor}
            />
        </SafeAreaView>
    );
}

const mapStateToProps = ({
    forumState: { user },
    settingsState: { margin, fontFactor, headerSize, bodyHeight },
}) => ({
    user,
    margin,
    fontFactor,
    headerSize,
    bodyHeight,
});

export default connect(mapStateToProps, {
    updateUser,
})(ForumScreen);

const styles = StyleSheet.create({});
