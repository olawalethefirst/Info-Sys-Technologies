import React, { useEffect, useState, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Keyboard,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import hideKeyboardAsync from '../helperFunctions/hideKeyboardAsync';
import { auth } from '../helperFunctions/initializeFirebase';
import toggleCallToAuthModal from '../redux/actions/toggleCallToAuthModal';
import toggleOnUsernameModal from '../redux/actions/toggleOnUsernameModal';
import PropTypes from 'prop-types';

const CommentInput = ({
    height,
    fontFactor,
    margin,
    commentInputRef,
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
    const onSend = useCallback(() => onComment(comment), [onComment, comment]);

    useEffect(() => {
        const events = ['keyboardDidShow', 'keyboardDidHide'];
        const listeners = events.map((e) =>
            Keyboard.addListener(e, () => setKeyboardActive(e === events[0]))
        );
        return () => listeners.forEach((listener) => listener.remove());
    }, []);

    const styles2 = {
        buttonText: {
            fontSize: fontFactor * wp(4),
            lineHeight: fontFactor * wp(5.1),
            opacity: comment.toString().trim().length > 0 ? 1 : 0.7,
        },
        button: {
            width: height * 1.1,
            height: height,
        },
        input: {
            fontSize: fontFactor * wp(4),
            lineHeight: fontFactor * wp(5.1),
            paddingHorizontal: margin,
        },
        container: {
            borderWidth: wp(0.75) * fontFactor,
            height: height,
        },
    };

    return (
        <View style={[styles.container, styles2.container]}>
            <TextInput
                ref={commentInputRef}
                style={[styles.input, styles2.input]}
                value={comment}
                onChangeText={(text) => setComment(text)}
                placeholder="Type your comment"
                placeholderTextColor="#808080"
                textAlignVertical="center"
            />
            <TouchableOpacity
                style={[styles.button, styles2.button]}
                disabled={!comment.trim()}
                onPress={onSend}
            >
                <Text style={[styles.buttonText, styles2.buttonText]}>
                    send
                </Text>
            </TouchableOpacity>
        </View>
    );
};

CommentInput.propTypes = {
    height: PropTypes.number,
    fontFactor: PropTypes.number,
    margin: PropTypes.number,
    commentInputRef: PropTypes.object,
    writeComment: PropTypes.func,
    toggleOnUsernameModal: PropTypes.func,
    toggleCallToAuthModal: PropTypes.func,
};

export default connect(null, {
    toggleOnUsernameModal,
    toggleCallToAuthModal,
})(CommentInput);
const styles = StyleSheet.create({
    buttonText: {
        color: '#1A91D7',
        textAlign: 'center',
        fontFamily: 'Poppins_600SemiBold',
    },
    button: { justifyContent: 'center' },
    input: { fontFamily: 'Poppins_500Medium', flex: 1, alignItems: 'center' },
    container: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderColor: '#1A91D7',
        backgroundColor: '#fff',
    },
});
