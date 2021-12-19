import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const AuthSwitch = ({ createAccount, fontFactor, toggleAuthView }) => {
    return (
        <>
            {
                <View>
                    <Text
                        style={{
                            fontSize: fontFactor * wp(3.75),
                            lineHeight: fontFactor * wp(4.77),
                            fontFamily: 'Poppins_400Regular',
                            color: '#808080',
                        }}
                    >
                        {createAccount
                            ? 'Already have an account?'
                            : 'New user?'}
                    </Text>
                    <MarginVertical size={0.3} />
                    <TouchableOpacity
                        onPress={toggleAuthView}
                        style={{
                            flexDirection: 'row',
                            alignSelf: 'flex-start',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: fontFactor * wp(4.5),
                                lineHeight: fontFactor * wp(5.72),
                                fontFamily: 'Poppins_600SemiBold',
                                color: '#1A91D7',
                            }}
                        >
                            {createAccount ? 'Sign in' : 'Sign up'}
                        </Text>
                        <View
                            style={{
                                height: fontFactor * wp(5.72),
                                justifyContent: 'center',
                            }}
                        >
                            <EntypoIcon
                                name={'chevron-right'}
                                size={fontFactor * wp(5.09)}
                                color={'#1A91D7'}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            }
        </>
    );
};

export default AuthSwitch;

const styles = StyleSheet.create({});
