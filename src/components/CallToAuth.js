import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const CalltoAuth = ({ toggleAuth, visible, margin, fontFactor }) => {
    console.log(wp(2.25));
    return (
        <Modal visible={visible} animationType="fade" transparent={true}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    paddingHorizontal: margin,
                    // To implement marginTop:
                }}
            >
                <View
                    style={{
                        width: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        alignItems: 'center',
                    }}
                >
                    <Text>You need to be logged in to perform this action</Text>
                </View>

                <TouchableOpacity
                    style={{
                        height: 50,
                        width: '100%',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        padding: wp(2.2),
                        borderRadius: 8,
                        // borderWidth: 5,
                        // borderColor: '#fff',
                        
                    }}
                    onPress={toggleAuth}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            color: 'black', // fontSize: fontFactor * wp(4.5),
                            //                         lineHeight: fontFactor * wp(5.72),
                            fontFamily: 'Karla_500Medium',
                        }}
                    >
                        Join now
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        padding: wp(2.2),
                    }}
                    onPress={toggleAuth}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            color: 'red',
                            // fontSize: fontFactor * wp(4.5),
                            //                         lineHeight: fontFactor * wp(5.72),
                            fontFamily: 'Karla_500Medium',
                        }}
                    >
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default CalltoAuth;

const styles = StyleSheet.create({});
