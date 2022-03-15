import React, { useCallback } from 'react';
import {
    Text,
    View,
    ActivityIndicator,
    Platform,
    TouchableOpacity,
} from 'react-native';
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
import retryAuthUserWithEmail from '../redux/actions/retryAuthUserWithEmail';

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
    retryAuthUserWithEmail,
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


    return (
        <Modal //change modal to react-native-modal to enable us naivgate away from screen upon successful authentication
            isVisible={authModalVisible}
            hideModalContentWhileAnimating
            useNativeDriver
            useNativeDriverForBackdrop
            style={{
                margin: 0,
                marginTop: Platform.select({
                    ios: statusBarHeight,
                    android: 0,
                }),
                paddingHorizontal: margin,
            }}
            backdropOpacity={0.9}
            onModalHide={navigateAway}
            onBackButtonPress={backAction}
            onBackdropPress={backAction}
        >
            {authorizing && (
                <ActivityIndicator
                    color="#1A91D7"
                    style={{
                        marginBottom: wp(2.2),
                        paddingVertical: wp(0.61), //maintain similar bottom margin to text(lineHeight-fontSize)
                    }}
                />
            )}
            {(authSuccessful || authError) && (
                <ModalTextBlock
                    text={
                        authSuccessful
                            ? 'Successful!'
                            : processErrorString(authError)
                    }
                    color={authSuccessful ? '#fff' : 'red'}
                />
            )}
            {retryAbleError && (
                <ModalButton
                    text="Retry"
                    submit
                    onPress={retryAuthUserWithEmail}
                    disabled={authorizing}
                />
            )}
            <ModalButton
                text="Close"
                onPress={backAction}
                disabled={authorizing}
            />
        </Modal>
    );
};

AuthModal.propTypes = {
    modalVisible: PropTypes.bool,
    activityIndicator: PropTypes.bool,
    error: PropTypes.string,
    firebaseNetworkError: PropTypes.string,
    retryFirebaseAuth: PropTypes.func,
    dismissModal: PropTypes.func,
    uid: PropTypes.string,
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
    retryAuthUserWithEmail,
})(AuthModal);
