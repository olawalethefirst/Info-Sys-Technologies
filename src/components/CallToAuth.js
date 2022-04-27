import React, { useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import toggleCallToAuthModal from '../redux/actions/toggleCallToAuthModal';
import { connect } from 'react-redux';
import ModalButton from './ModalButton';
import ModalTextBlock from './ModalTextBlock';
import PropTypes from 'prop-types';

const CalltoAuth = ({
    margin,
    callToAuthModalVisible,
    toggleCallToAuthModal,
}) => {
    const { statusBarHeight } = Constants;
    const navigation = useNavigation();
    const [navigate, setNavigate] = useState(false);
    const toggleNavigate = () => setNavigate((oldState) => !oldState);

    const styles2 = {
        modal: {
            marginTop: Platform.select({
                ios: statusBarHeight,
                android: 0,
            }),
        },
    };

    return (
        <Modal
            useNativeDriverForBackdrop
            backdropOpacity={0.8}
            isVisible={callToAuthModalVisible}
            useNativeDriver
            hideModalContentWhileAnimating
            onModalHide={() => {
                navigate &&
                    navigation.navigate('Auth', {
                        viewAnimatedValue: 0,
                    });
                navigate && toggleNavigate();
            }}
            style={[styles.modal, styles2.modal]}
            onBackButtonPress={toggleCallToAuthModal}
            onBackdropPress={toggleCallToAuthModal}
        >
            <View style={{ paddingHorizontal: margin }}>
                <ModalTextBlock
                    text={'You need to be logged in to perform this action'}
                />
                <ModalButton
                    text={'Join now'}
                    submit
                    onPress={() => {
                        toggleNavigate();
                        toggleCallToAuthModal();
                    }}
                />
                <ModalButton text={'Cancel'} onPress={toggleCallToAuthModal} />
            </View>
        </Modal>
    );
};

CalltoAuth.propTypes = {
    margin: PropTypes.number,
    callToAuthModalVisible: PropTypes.bool,
    toggleCallToAuthModal: PropTypes.func,
};

const mapStateToProps = ({
    settingsTempState: { callToAuthModalVisible },
    settingsState: { margin, fontFactor },
}) => ({ callToAuthModalVisible, margin, fontFactor });

export default connect(mapStateToProps, { toggleCallToAuthModal })(CalltoAuth);

const styles = StyleSheet.create({
    modal: {
        padding: 0,
        margin: 0,
    },
});
