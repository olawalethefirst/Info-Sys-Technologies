import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ReplyIcon from './ReplyIcon';
import HeartIcon from './HeartIcon';
import checkColumnMode from '../helperFunctions/checkColumnMode';

const Post = ({
    fontFactor,
    margin,
    username,
    timestamp,
    category,
    title,
    body,
    user,
    toggleCallToAuth,
    deviceWidthClass,
}) => {
    const [liked, setLiked] = useState(false);
    const columnMode = checkColumnMode(deviceWidthClass);

    return (
        <View>
            <View
                style={{
                    borderBottomColor: '#cecece',
                    borderBottomWidth: wp(0.25),
                    paddingHorizontal: margin,
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
                                textAlign: 'left',
                                width: '100%',
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
                                textAlign: 'left',
                                width: '100%',
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
                                fontFamily: 'Poppins_500Medium',
                                textAlign: 'left',
                                width: '100%',
                            }}
                        >
                            Category
                        </Text>
                        <MarginVertical size={0.5} />
                        <Text
                            style={{
                                fontSize: fontFactor * wp(4),
                                lineHeight: fontFactor * wp(5.09),
                                fontFamily: 'Poppins_400Regular',
                                textAlign: 'left',
                                width: '100%',
                            }}
                        >
                            Post Title
                        </Text>
                        <MarginVertical size={0.3} />
                        <Text
                            style={{
                                fontSize: fontFactor * wp(4),
                                lineHeight: fontFactor * wp(5.09),
                                fontFamily: 'Poppins_400Regular',
                                textAlign: 'left',
                                width: '100%',
                            }}
                        >
                            Post Body Post Body Post Body Post Body Post Body
                            Post Body Post Body Post Body Post Body Post Body
                            Post Body Post Body Post Body Post Body Post Body
                            Post Body Post Body Post Body Post Body Post{' '}
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
                            onPress={() =>
                                user
                                    ? setLiked((liked) => !liked)
                                    : toggleCallToAuth()
                            }
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
            <MarginVertical />
            <View
                style={{
                    borderBottomWidth: wp(0.25),
                    borderBottomColor: '#cecece',
                    marginHorizontal: margin,
                }}
            >
                <View
                    style={{
                        width: columnMode ? '90%' : '100%',
                        alignSelf: 'center',
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <Text
                            style={{
                                fontSize: fontFactor * wp(6),
                                lineHeight: fontFactor * wp(7.7),
                                fontFamily: 'Poppins_500Medium',
                                textAlign: 'left',
                                width: '100%',
                            }}
                        >
                            Comments
                        </Text>
                        <MarginVertical size={0.5} />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Post;

const styles = StyleSheet.create({});
