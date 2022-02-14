import React, { useRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Button,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import SubScreeenTemplate from '../components/SubScreenTemplate';
import Footer from '../components/Footer';
import scrollToTop from '../helperFunctions/scrollToTop';
import Auth from '../components/Auth';
import Constants from 'expo-constants';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const AuthScreen = ({
    headerSize,
    margin,
    fontFactor,
    bodyHeight,
    navigation,
    deviceWidthClass,
    uid,
}) => {
    const scrollRef = useRef(null);
    const { statusBarHeight } = Constants;
    const tabBarHeight = useBottomTabBarHeight();

    const sectionComponents = [
        {
            data: (
                <Auth
                    minHeight={bodyHeight - tabBarHeight}
                    deviceWidthClass={deviceWidthClass}
                />
            ),
        },
    ];

    useEffect(() => {
        uid ? setTimeout(() => navigation.goBack(), 1200) : null;
    }, [uid, navigation]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: 'white' }}
            behavior={Platform.select({ ios: 'height', android: null })}
            keyboardVerticalOffset={Platform.select({
                ios: headerSize + statusBarHeight,
                android: null,
            })}
        >
            <SubScreeenTemplate
                margin={margin}
                fontFactor={fontFactor}
                headerSize={headerSize}
                heading={'Join Us'}
                sectionComponents={sectionComponents}
                scrollRef={scrollRef}
                deeplyNestedScreen
            />
        </KeyboardAvoidingView>
    );
};

const mapStateToProps = ({
    settingsState: {
        headerSize,
        margin,
        fontFactor,
        bodyHeight,
        deviceWidthClass,
    },
    forumTempState: { uid },
}) => {
    return {
        headerSize,
        margin,
        fontFactor,
        bodyHeight,
        deviceWidthClass,
        uid,
    };
};

export default connect(mapStateToProps)(AuthScreen);

const styles = StyleSheet.create({});
