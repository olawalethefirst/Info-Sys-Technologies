import React from 'react';
import { View, ScrollView, Platform, StyleSheet, Text } from 'react-native';
import ModalCloseIcon from './ModalCloseIcon';
import Constants from 'expo-constants';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

export default function ServiceModal({
    modalOpen,
    onModalWillHide,
    onModalWillShow,
    toggleModal,
    headerSize,
    tabBarHeight,
    title,
    body,
    contentContainerWidth,
    fontFactor,
}) {
    const { statusBarHeight } = Constants;
    const iconWidth = 1.1 * headerSize;
    const styles2 = StyleSheet.create({
        contentContainer: {
            width: contentContainerWidth,
            alignSelf: 'center',
        },
        baseFont: {
            fontSize: fontFactor * wp(5),
            lineHeight: fontFactor * wp(6.36),
        },
        modal: {
            margin: 0,
            marginTop: Platform.select({
                ios: headerSize + statusBarHeight,
                android: headerSize,
            }),
            marginBottom: tabBarHeight,
        },
        paddingVerticalVeaderSize: {
            paddingVertical: headerSize,
        },
    });

    return (
        <View>
            <Modal
                useNativeDriverForBackdrop
                isVisible={modalOpen}
                onModalWillHide={onModalWillHide}
                onModalWillShow={onModalWillShow}
                onBackButtonPress={toggleModal}
                useNativeDriver
                hideModalContentWhileAnimating
                style={styles2.modal}
            >
                <View
                    style={[
                        styles.container,
                        styles2.paddingVerticalVeaderSize,
                    ]}
                >
                    <View style={styles.iconContainer}>
                        <ModalCloseIcon
                            closeModal={toggleModal}
                            iconHeight={headerSize}
                            iconWidth={iconWidth}
                            color="#ffffff"
                        />
                    </View>

                    <ScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        style={[styles2.contentContainer]}
                    >
                        <View style={[styles.container]}>
                            <Text
                                style={[
                                    styles.poppins600Font,
                                    styles2.baseFont,
                                    styles.lightBlueText,
                                ]}
                            >
                                {title}
                            </Text>
                            <MarginVertical />
                            <Text
                                style={[
                                    styles.karla400Font,
                                    styles2.baseFont,
                                    styles.whiteText,
                                ]}
                            >
                                {body}
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
}

ServiceModal.propTypes = {
    modalOpen: PropTypes.bool,
    onModalWillHide: PropTypes.func,
    onModalWillShow: PropTypes.func,
    toggleModal: PropTypes.func,
    headerSize: PropTypes.number,
    tabBarHeight: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    contentContainerWidth: PropTypes.number,
    fontFactor: PropTypes.number,
};

const styles = StyleSheet.create({
    iconContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
    container: {
        height: '100%',
        width: '100%',
    },
    poppins600Font: {
        fontFamily: 'Poppins_600SemiBold',
    },
    lightBlueText: {
        color: '#1CB8F3',
    },
    karla400Font: {
        fontFamily: 'Karla_400Regular',
    },
    whiteText: {
        color: '#ffffff',
    },
});
