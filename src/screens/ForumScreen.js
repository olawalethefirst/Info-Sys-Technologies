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
import AddPost from '../components/AddPost';
// import { LogBox } from 'react-native';
// LogBox.ignoreAllLogs();

const isStandaloneApp =
    Constants.appOwnership !== 'expo' && Constants.appOwnership !== 'guest';

function ForumScreen({
    user,
    margin,
    fontFactor,
    headerSize,
    bodyHeight,
    deviceWidthClass,
}) {
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            updateUser(user);
        });
    });
    const [createPostModalVisible, setCreatePostModalVisible] = useState(false);
    const toggleModal = () => {
        setCreatePostModalVisible((prevState) => !prevState);
    };

    const scrollRef = useRef(null);
    const sectionComponents = [
        {
            key: '0',
            data: (
                <Forum
                    bodyHeight={bodyHeight}
                    margin={margin}
                    fontFactor={fontFactor}
                    headerSize={headerSize}
                    deviceWidthClass={deviceWidthClass}
                    createPostModalVisible={createPostModalVisible}
                    toggleModal={toggleModal}
                    key="0"
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
                    key="1"
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
            >
                <AddPost
                    margin={margin}
                    headerSize={headerSize}
                    fontFactor={fontFactor}
                    toggleModal={toggleModal}
                />
            </SubScreenTemplate>
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
}) => ({
    user,
    margin,
    fontFactor,
    headerSize,
    bodyHeight,
    deviceWidthClass,
});

export default connect(mapStateToProps, {
    updateUser,
})(ForumScreen);

const styles = StyleSheet.create({});
