import { StyleSheet, Text, View, Platform } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import Constants from 'expo-constants';
import ModalTextBlock from './ModalTextBlock';
import ModalButton from './ModalButton';
import { connect } from 'react-redux';
import toggleContactModal from '../redux/actions/toggleContactModal';
import PropTypes from 'prop-types';

const { statusBarHeight } = Constants;

const ContactModal = ({ contactModalVisible, toggleContactModal, margin }) => {
    return (
        <Modal
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            hideModalContentWhileAnimating
            useNativeDriver
            useNativeDriverForBackdrop
            backdropOpacity={0.8}
            onBackButtonPress={toggleContactModal}
            isVisible={contactModalVisible}
            style={styles.modal}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    paddingHorizontal: margin,
                }}
            >
                <Text>Thank you for checking out this application.</Text>
                <ModalTextBlock
                    text={'Thank you for checking out this application'}
                    color={'#fff'}
                />
                <ModalButton text={'close'} onPress={toggleContactModal} />
            </View>
        </Modal>
    );
};

const mapStateToProps = ({
    settingsTempState: { contactModalVisible },
    settingsState: { margin },
}) => ({
    contactModalVisible,
    margin,
});

ContactModal.propTypes = {
    contactModalVisible: PropTypes.bool,
    toggleContactModal: PropTypes.func,
    margin: PropTypes.number,
};

export default connect(mapStateToProps, { toggleContactModal })(ContactModal);

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        marginTop: Platform.select({
            ios: statusBarHeight,
            android: 0,
        }),
    },
});
