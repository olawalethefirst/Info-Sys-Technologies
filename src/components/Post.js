import React, { useRef, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Keyboard,
    Pressable,
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
import Category from './Category';
import toggleCallToAuthModal from '../redux/actions/toggleCallToAuthModal';
import Title from './Title';
import Body from './Body';
import LikeButton from './LikeButton';
import ReplyButton from './ReplyButton';

const Post = ({
    fontFactor,
    margin,
    uid,
    deviceWidthClass,
    containerRef,
    effectiveBodyHeight,
    commentInputRef,
    scrollRef,
    toggleCallToAuthModal,
    body,
    category,
    title,
    username,
    likes,
    createdAt,
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
    console.log(typeof fontFactor);

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
                        <Username username={username} fontFactor={fontFactor} />
                        <MarginVertical size={0.2} />

                        <CreatedAt
                            createdAt={createdAt}
                            fontFactor={fontFactor}
                        />
                        <MarginVertical size={0.2} />
                        <Likes fontFactor={fontFactor} />
                    </View>
                    <MarginVertical />

                    <View>
                        <Category category={category} fontFactor={fontFactor} />
                        <MarginVertical size={0.5} />
                        <Title fontFactor={fontFactor} title={title} />
                        <MarginVertical size={0.3} />
                        <Body fontFactor={fontFactor} body={body} />
                    </View>
                    <MarginVertical />
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <LikeButton
                            fontFactor={fontFactor}
                            uid={uid}
                            setLiked={setLiked}
                            toggleCallToAuthModal={toggleCallToAuthModal}
                            liked={liked}
                        />
                        <ReplyButton
                            fontFactor={fontFactor}
                            uid={uid}
                            toggleCallToAuthModal={toggleCallToAuthModal}
                            onPress={onPress}
                        />
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

export default connect(mapStateToProps, { toggleCallToAuthModal })(Post);

const styles = StyleSheet.create({});
