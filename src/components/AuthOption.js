import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import GoogleAuthContainer from './GoogleAuthContainer';
import { connect } from 'react-redux';
import Constants from 'expo-constants';

const Authoption = ({ fontFactor, animateView, user }) => {
    const isNative =
        Constants.appOwnership !== 'expo' && Constants.appOwnership !== 'guest';

    return (
        <View style={{ flexDirection: 'row' }}>
            <GoogleAuthContainer native={isNative} fontFactor={fontFactor}>
                {(onPress, disabled) => (
                    <Pressable
                        disabled={disabled || user}
                        onPress={onPress}
                        style={({ pressed }) => {
                            return {
                                width: fontFactor * wp(40),
                                height: fontFactor * wp(40),
                                borderWidth: 1,
                                borderColor: '#1A91D7',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: pressed
                                    ? '#1A91D7'
                                    : '#f7f7f7',
                            };
                        }}
                    >
                        {({ pressed }) => (
                            <>
                                <AntDesignIcon
                                    name={'google'}
                                    size={fontFactor * wp(6)}
                                    color={pressed ? '#f7f7f7' : '#1A91D7'}
                                />
                                <MarginVertical size={0.5} />
                                <Text
                                    style={{
                                        fontSize: fontFactor * wp(4),
                                        lineHeight: fontFactor * wp(5.09),
                                        fontFamily: 'Poppins_400Regular',
                                        color: pressed ? '#f7f7f7' : '#1A91D7',
                                    }}
                                >
                                    Google
                                </Text>
                            </>
                        )}
                    </Pressable>
                )}
            </GoogleAuthContainer>
            <View style={{ width: wp(5) }} />
            <Pressable
                style={({ pressed }) => {
                    return {
                        width: fontFactor * wp(40),
                        height: fontFactor * wp(40),
                        borderWidth: 1,
                        borderColor: '#1A91D7',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: pressed ? '#1A91D7' : '#f7f7f7',
                    };
                }}
                onPress={animateView}
            >
                {({ pressed }) => (
                    <>
                        <EntypoIcon
                            name={'mail'}
                            size={fontFactor * wp(6)}
                            color={pressed ? '#f7f7f7' : '#1A91D7'}
                        />
                        <MarginVertical size={0.5} />
                        <Text
                            style={{
                                fontSize: fontFactor * wp(4),
                                lineHeight: fontFactor * wp(5.09),
                                fontFamily: 'Poppins_400Regular',
                                color: pressed ? '#f7f7f7' : '#1A91D7',
                            }}
                        >
                            Email
                        </Text>
                    </>
                )}
            </Pressable>
        </View>
    );
};

const mapStateToProps = ({ forumTempState: { user } }) => ({ user });
export default connect(mapStateToProps)(Authoption);

const styles = StyleSheet.create({});
