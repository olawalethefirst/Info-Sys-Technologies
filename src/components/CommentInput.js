import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Keyboard,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { store } from '../redux/store';
import hideKeyboardAsync from '../helperFunctions/hideKeyboardAsync';
import { auth } from '../helperFunctions/initializeFirebase';
import toggleCallToAuthModal from '../redux/actions/toggleCallToAuthModal';
import toggleOnUsernameModal from '../redux/actions/toggleOnUsernameModal';

const CommentInput = ({
    headerSize,
    fontFactor,
    margin,
    commentInputRef,
    postID,
    writeComment,
    toggleOnUsernameModal,
    toggleCallToAuthModal,
}) => {
    const [keyboardActive, setKeyboardActive] = useState(false);
    const [comment, setComment] = useState('');

    const onComment = useCallback(
        async (comment) => {
            if (keyboardActive) {
                await hideKeyboardAsync();
            }
            if (auth.currentUser?.uid && auth.currentUser?.displayName) {
                console.log(
                    'passed',
                    auth.currentUser.uid,
                    auth.currentUser.displayName
                );
                writeComment(comment);
                setComment('');
            } else if (!auth.currentUser?.uid) {
                toggleCallToAuthModal();
            } else if (!auth.currentUser?.displayName) {
                toggleOnUsernameModal();
            }
        },
        [
            writeComment,
            keyboardActive,
            toggleCallToAuthModal,
            toggleOnUsernameModal,
        ]
    );

    useEffect(() => {
        const events = ['keyboardDidShow', 'keyboardDidHide'];
        const listeners = events.map((e) =>
            Keyboard.addListener(e, () => setKeyboardActive(e === events[0]))
        );
        return () => listeners.forEach((listener) => listener.remove());
    }, []);


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
                disabled={!comment.trim()}
                onPress={() => onComment(comment)}
            >
                <Text
                    style={{
                        color: '#1A91D7',
                        textAlign: 'center',
                        fontSize: fontFactor * wp(4),
                        lineHeight: fontFactor * wp(5.1),
                        fontFamily: 'Poppins_600SemiBold',
                        opacity: comment.toString().trim().length > 0 ? 1 : 0.7,
                    }}
                >
                    send
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default connect(null, {
    toggleOnUsernameModal,
    toggleCallToAuthModal,
})(CommentInput);
const styles = StyleSheet.create({});
