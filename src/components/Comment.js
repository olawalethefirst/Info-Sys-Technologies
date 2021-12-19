import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ReplyIcon from './ReplyIcon';
import HeartIcon from './HeartIcon';
import checkColumnMode from '../helperFunctions/checkColumnMode';

const PostComment = ({
    fontFactor,
    margin,
    username,
    timestamp,
    comment,
    deviceWidthClass,
    user,
    toggleCallToAuth,
}) => {
    let liked;
    const columnMode = checkColumnMode(deviceWidthClass);

    return (
        <View
            style={{
                borderBottomColor: '#cecece',
                borderBottomWidth: wp(0.25),
                marginHorizontal: margin,
            }}
        >
            <View
                style={{
                    width: columnMode ? '90%' : '100%',
                    alignSelf: 'center',
                }}
            >
                <MarginVertical />
                <View>
                    <Text
                        style={{
                            fontSize: fontFactor * wp(4),
                            lineHeight: fontFactor * wp(5.09),
                            fontFamily: 'Poppins_500Medium',
                        }}
                    >
                        @username
                    </Text>
                    <MarginVertical size={0.2} />

                    <Text
                        style={{
                            fontSize: fontFactor * wp(3.75),
                            lineHeight: fontFactor * wp(4.77),
                            fontFamily: 'Poppins_400Regular',
                            color: '#808080',
                        }}
                    >
                        {moment(new Date()).fromNow()}
                    </Text>
                </View>
                <MarginVertical />

                <View>
                    <Text
                        style={{
                            fontSize: fontFactor * wp(4),
                            lineHeight: fontFactor * wp(5.09),
                            fontFamily: 'Poppins_400Regular',
                            // textAlign: 'left',
                        }}
                    >
                        Comment Comment Comment Comment Comment Comment Comment
                        Comment Comment Comment Comment Comment Comment Comment
                        Comment Comment Comment Comment Comment Post
                    </Text>
                </View>
                <MarginVertical />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => (user ? null : toggleCallToAuth())}
                        style={{
                            padding: fontFactor * wp(1),
                            margin: -fontFactor * wp(1),
                        }}
                    >
                        <HeartIcon
                            containerProp={{
                                width: fontFactor * wp(6.36),
                                height: fontFactor * wp(6.36),
                            }}
                            iconProp={
                                liked
                                    ? { fill: 'red', stroke: 'red' }
                                    : { fill: 'none', stroke: 'black' }
                            }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => (user ? null : toggleCallToAuth())}
                        style={{
                            padding: fontFactor * wp(1),
                            margin: -fontFactor * wp(1),
                        }}
                    >
                        <ReplyIcon
                            width={fontFactor * wp(6.36)}
                            height={fontFactor * wp(6.36)}
                        />
                    </TouchableOpacity>
                </View>
                <MarginVertical />
            </View>
        </View>
    );
};

export default PostComment;

const styles = StyleSheet.create({});
