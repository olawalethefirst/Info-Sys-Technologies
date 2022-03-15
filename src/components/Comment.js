import React, { useRef,  useCallback  } from 'react';
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
import { connect } from 'react-redux';
import CommentsHeading from './CommentsHeading';
import Username from './Username';
import CreatedAt from './CreatedAt';
import Likes from './Likes';
import toggleCallToAuthModal from '../redux/actions/toggleCallToAuthModal';
import Title from './Title';
import Body from './Body';
import LikeButton from './LikeButton';
import ReplyButton from './ReplyButton';
import scrollToComponentBottom from '../helperFunctions/scrollToComponentBottom';
import { auth } from '../helperFunctions/initializeFirebase';
import PropTypes from 'prop-types'

const Comment = ({
    fontFactor,
    margin,
    deviceWidthClass,
    uid,
    item,
    toggleCallToAuth,
    scrollRef,
    containerRef,
    effectiveBodyHeight,
    commentInputRef,
}) => {
    let liked;
    const columnMode = checkColumnMode(deviceWidthClass);
    const commentRef = useRef(null);

    const onPress = () => {
        console.log('pressed me');
        // commentInputRef.current?.focus();
        // let itemTopOffset;
        // let itemHeight;

        // if (containerRef.current && commentRef.current) {
        //     commentRef.current.measureLayout(
        //         containerRef.current,
        //         (left, top, width, height) => {
        //             itemTopOffset = top;
        //             itemHeight = height;
        //         }
        //     );
        // }
        // Keyboard.addListener(
        //     'keyboardDidShow',
        //     ({ endCoordinates: { height } }) => {
        //         if (itemTopOffset && itemHeight) {
        //             const offset =
        //                 itemTopOffset -
        //                 (effectiveBodyHeight - height - itemHeight);
        //             scrollRef.current.scrollToOffset({
        //                 offset,
        //             });
        //         }
        //         Keyboard.removeAllListeners('keyboardDidShow');
        //     }
        // );
    };

    const onPress1 = () => {};

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
                        onPress={() => (uid ? onPress1() : toggleCallToAuth())}
                        style={{
                            padding: fontFactor * wp(2),
                            margin: -fontFactor * wp(2),
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
                        onPress={() => (uid ? onPress() : toggleCallToAuth())}
                        style={{
                            padding: fontFactor * wp(2),
                            margin: -fontFactor * wp(2),
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

const mapStateToProps = ({
    settingsState: {
        fontFactor,
        margin,
        deviceWidthClass,
        effectiveBodyHeight,
    },
    forumTempState: { uid },
}) => ({
    fontFactor,
    margin,
    deviceWidthClass,
    uid,
    effectiveBodyHeight,
});

export default connect(mapStateToProps)(Comment);

const styles = StyleSheet.create({});
