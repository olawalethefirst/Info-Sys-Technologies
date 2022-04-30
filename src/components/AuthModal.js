import React, { useCallback } from 'react';
import { ActivityIndicator, Platform, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import processErrorString from '../helperFunctions/processErrorString';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import clearAuth from '../redux/actions/clearAuth';
import ModalTextBlock from './ModalTextBlock';
import ModalButton from './ModalButton';
import { AuthErrorCodes } from 'firebase/auth';
import retryAuthUser from '../redux/actions/retryAuthUser';

// eslint-disable-next-line no-undef
const AuthModal = ({
    authModalVisible,
    uid,
    fontFactor,
    margin,
    authSuccessful,
    clearAuth,
    authorizing,
    authError,
    retryAuthUser,
}) => {
    const { statusBarHeight } = Constants;
    const navigation = useNavigation();
    const backAction = useCallback(() => {
        !authorizing && clearAuth();
    }, [authorizing, clearAuth]);
    const navigateAway = useCallback(() => {
        const navigationStateRoutes = navigation.getState().routes;
        const isInAuthScreen =
            navigationStateRoutes[navigationStateRoutes.length - 1].name ===
            'Auth'; //confirms that AuthScreen still open
        uid && isInAuthScreen && navigation.goBack(); //navigates back to previous screen
    }, [uid, navigation]);
    const retryAbleError = authError === AuthErrorCodes.NETWORK_REQUEST_FAILED;

    const styles = StyleSheet.create({
        activityIndicator: {
            marginBottom: fontFactor * wp(2.2),
            paddingVertical: fontFactor * wp(0.61), //maintain similar lineHeight / fontSize ratio as texts
        },
        modal: {
            margin: 0,
            marginTop: Platform.select({
                ios: statusBarHeight,
                android: 0,
            }),
            paddingHorizontal: margin,
        },
    });

    return (
        <Modal //change modal to react-native-modal to enable us naivgate away from screen upon successful authentication
            isVisible={authModalVisible}
            hideModalContentWhileAnimating
            useNativeDriver
            useNativeDriverForBackdrop
            style={styles.modal}
            backdropOpacity={0.8}
            onModalHide={navigateAway}
            onBackButtonPress={backAction}
        >
            {authorizing && (
                <ActivityIndicator
                    color="#1A91D7"
                    style={styles.activityIndicator}
                />
            )}
            {(authSuccessful || !!authError) && (
                <ModalTextBlock
                    text={
                        authSuccessful
                            ? 'Successful!'
                            : processErrorString(authError)
                    }
                    color={authSuccessful ? '#fff' : 'red'}
                />
            )}
            {!!retryAbleError && (
                <ModalButton
                    text="Retry"
                    submit
                    onPress={retryAuthUser}
                    disabled={authorizing}
                />
            )}
            {(!!authError || authSuccessful) && (
                <ModalButton
                    text="Close"
                    onPress={backAction}
                    disabled={authorizing}
                />
            )}
        </Modal>
    );
};

AuthModal.propTypes = {
    authModalVisible: PropTypes.bool,
    uid: PropTypes.string,
    fontFactor: PropTypes.number,
    margin: PropTypes.number,
    authSuccessful: PropTypes.bool,
    clearAuth: PropTypes.func,
    authorizing: PropTypes.bool,
    authError: PropTypes.string,
    retryAuthUser: PropTypes.func,
};

const mapStateToProps = ({
    forumTempState: { uid, authSuccessful, authorizing, authError },
    settingsState: { fontFactor, margin },
    settingsTempState: { authModalVisible },
}) => {
    return {
        uid,
        fontFactor,
        margin,
        authSuccessful,
        authorizing,
        authError,
        authModalVisible,
    };
};

export default connect(mapStateToProps, {
    clearAuth,
    retryAuthUser,
})(AuthModal);
