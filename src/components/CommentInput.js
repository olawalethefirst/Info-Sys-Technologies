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

const CommentInput = ({ headerSize, fontFactor, margin, commentInputRef }) => {
    const [comment, setComment] = useState('');

    return (
        <View
            style={{
                flexDirection: 'row',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: headerSize,
                borderColor: '#1A91D7',
                borderWidth: wp(0.75) * fontFactor,
                backgroundColor: '#fff',
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
                textAlignVertical="center"
            />
            <TouchableOpacity
                style={{
                    width: headerSize * 1.1,
                    height: '100%',
                    justifyContent: 'center',
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
                        opacity: !comment ? 0.7 : 1,
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
