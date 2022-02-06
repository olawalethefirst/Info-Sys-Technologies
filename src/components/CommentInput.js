import React, { useRef, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    TextInput,
    Keyboard,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { store } from '../redux/store';

const CommentInput = ({
    bodyHeight,
    headerSize,
    scrollY,
    fontFactor,
    margin,
    scrollRef,
    commentInputRef,
    // postScreenOffset,
}) => {
    const [comment, setComment] = useState('');

    return (
        <View
            style={{
                flexDirection: 'row',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                width: '100%',
                // backgroundColor: 'red',
                height: headerSize,
                borderColor: '#1A91D7',
                backgroundColor: '#f7f7f7',
                borderWidth: 3,
            }}
        >
            <TextInput
                ref={commentInputRef}
                style={[
                    {
                        fontSize: fontFactor * wp(4),
                        lineHeight: fontFactor * wp(5.1),
                        fontFamily: 'Poppins_500Medium',
                        paddingHorizontal: margin,
                        flex: 1,
                        alignItems: 'center',
                    },
                ]}
                value={comment}
                onChangeText={(text) => setComment(text)}
                placeholder="Type your comment"
                placeholderTextColor="#808080"
                // onFocus={() =>
                //     Keyboard.addListener(
                //         'keyboardDidShow',
                //         ({ endCoordinates: { height } }) => {
                //             scrollRef.current.scrollToOffset({
                //                 offset:
                //                     store.getState().settingsTempState
                //                         .postScreenOffset + height,
                //                 animated: true,
                //             });

                //             Keyboard.removeAllListeners('keyboardDidShow');
                //         }
                //     )
                // }
                textAlignVertical="center"
            />
            <TouchableOpacity
                style={{
                    width: headerSize * 1.2,
                    alignSelf: 'center',
                    padding: wp(0.5),
                }}
                disabled={!comment}
            >
                <Text
                    style={{
                        color: '#1A91D7',
                        textAlign: 'center',
                        fontSize: fontFactor * wp(4),
                        lineHeight: fontFactor * wp(5.1),
                        fontFamily: 'Poppins_600SemiBold',
                    }}
                >
                    Post
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default CommentInput;
const styles = StyleSheet.create({});
