import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

export default function ContactFormErrorModal({ isVisible, formError }) {
    return (
        <View>
            <Modal isVisible={isVisible} style={{ justifyContent: 'center' }}>
                {isVisible ? (
                    <>
                        <Text>
                            Invalid{' '}
                            {formError.length === 1 ? (
                                <Text>{formError[0].field}</Text>
                            ) : (
                                formError.map((el, index) => {
                                    if (index === formError.length - 2) {
                                        return (
                                            <Text>
                                                {formError[index].field} and{' '}
                                            </Text>
                                        );
                                    } else if (index === formError.length - 1) {
                                        return (
                                            <Text>
                                                {formError[index].field}{' '}
                                            </Text>
                                        );
                                    } else {
                                        return (
                                            <Text>
                                                {formError[index].field},{' '}
                                            </Text>
                                        );
                                    }
                                })
                            )}{' '}
                            field{formError.length > 1 ? 's' : null} provided
                        </Text>
                        <Pressable>
                            <Text>ok</Text>
                        </Pressable>
                    </>
                ) : (
                    <></>
                )}
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create;
// ({});.map((el, ))
