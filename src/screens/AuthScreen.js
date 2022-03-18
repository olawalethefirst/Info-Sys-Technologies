import React, { useRef } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { connect } from 'react-redux';
import SubScreeenTemplate from '../components/SubScreenTemplate';
import Auth from '../components/Auth';
import Constants from 'expo-constants';
import AuthModal from '../components/AuthModal';
import PropTypes from 'prop-types'

const AuthScreen = ({
    headerSize,
    margin,
    fontFactor,
    deviceWidthClass,
    uid,
    effectiveBodyHeight,
}) => {
    const scrollRef = useRef(null);
    const { statusBarHeight } = Constants;
    const sectionComponents = [
        {
            data: (
                <Auth
                    deviceWidthClass={deviceWidthClass}
                    uid={uid}
                    fontFactor={fontFactor}
                    minHeight={effectiveBodyHeight}
                />
            ),
        },
    ];

    return (
        //Implement a user already logged in screen when user signed in
        <KeyboardAvoidingView
            style={styles.container}
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
                Keyboard
            />
            <AuthModal />
        </KeyboardAvoidingView>
    );
};

const mapStateToProps = ({
    settingsState: {
        headerSize,
        margin,
        fontFactor,
        deviceWidthClass,
        effectiveBodyHeight,
    },
    forumTempState: { uid },
}) => {
    return {
        headerSize,
        margin,
        fontFactor,
        effectiveBodyHeight,
        deviceWidthClass,
        uid,
    };
};

AuthScreen.propTypes = {
    headerSize: PropTypes.number,
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
    deviceWidthClass: PropTypes.string,
    uid: PropTypes.string,
    effectiveBodyHeight: PropTypes.number,
}

export default connect(mapStateToProps)(AuthScreen);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' }
});
