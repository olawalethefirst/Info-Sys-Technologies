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
import { connect } from 'react-redux';
import CommentsHeading from './CommentsHeading';
import Username from './Username';
import Created from './Created';
import Likes from './Likes';
import Category from './Category';
import toggleCallToAuthModal from '../redux/actions/toggleCallToAuthModal'

const Post = ({
    fontFactor,
    margin,
    uid,
    deviceWidthClass,
    containerRef,
    effectiveBodyHeight,
    commentInputRef,
    scrollRef,
    item,
    toggleCallToAuthModal
}) => {
    const [liked, setLiked] = useState(false);
    const columnMode = checkColumnMode(deviceWidthClass);
    const postRef = useRef(null);
    // console.log(item);

    const onPress = () => {
        commentInputRef.current?.focus();
        let itemTopOffset;
        let itemHeight;
        if (containerRef.current && postRef.current) {
            postRef.current.measureLayout(
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
        <View>
            <View
                ref={postRef}
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
                    <View>
                        <Username fontFactor={fontFactor} />
                        <MarginVertical size={0.2} />

                        <Created fontFactor={fontFactor} />
                        <MarginVertical size={0.2} />
                        <Likes fontFactor={fontFactor} />
                    </View>
                    <MarginVertical />

                    <View>
                        <Category Category fontFactor={fontFactor} />
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
                                uid
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
                            onPress={() =>
                                uid ? onPress() : toggleCallToAuthModal()
                            }
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
            <CommentsHeading />
        </View>
    );
};

const mapStateToProps = ({
    settingsState: { fontFactor, margin, deviceWidthClass, effectiveBodyHeight },
    forumTempState: { uid },
}) => ({
    fontFactor,
    margin,
    deviceWidthClass,
    uid,
    effectiveBodyHeight
});

export default connect(mapStateToProps, {toggleCallToAuthModal})(Post);

const styles = StyleSheet.create({});
