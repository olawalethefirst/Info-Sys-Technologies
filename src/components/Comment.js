import React, { useRef, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Keyboard,
} from 'react-native';
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
    index,
    scrollRef,
    containerRef,
    effectiveBodyHeight,
    commentInputRef,
}) => {
    let liked;
    const columnMode = checkColumnMode(deviceWidthClass);
    const commentRef = useRef(null);

    const onPress = () => {
        commentInputRef.current?.focus();
        let itemTopOffset;
        let itemHeight;

        if (containerRef.current && commentRef.current) {
            commentRef.current.measureLayout(
                containerRef.current,
                (left, top, width, height) => {
                    itemTopOffset = top;
                    itemHeight = height;
                }
            );
        }
        Keyboard.addListener(
            'keyboardDidShow',
            ({ endCoordinates: { height } }) => {
                if (itemTopOffset && itemHeight) {
                    const offset =
                        itemTopOffset -
                        (effectiveBodyHeight - height - itemHeight);
                    scrollRef.current.scrollToOffset({
                        offset,
                    });
                }
                Keyboard.removeAllListeners('keyboardDidShow');
            }
        );
    };

    return (
        <View
            ref={commentRef}
            style={{
                borderBottomColor: '#cecece',
                borderBottomWidth: wp(0.25),
                marginHorizontal: margin,
            }}
        >
            <View
                style={{
                    width: columnMode ? '90%' : '100%', // move to postscreen
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
                    <MarginVertical size={0.2} />
                    <Text
                        style={{
                            fontSize: fontFactor * wp(3.75),
                            lineHeight: fontFactor * wp(4.77),
                            fontFamily: 'Poppins_400Regular',
                            color: '#808080',
                        }}
                    >
                        0 likes
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
                        onPress={() => (user ? onPress() : toggleCallToAuth())}
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
