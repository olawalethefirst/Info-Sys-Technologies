import React from 'react';
import { StyleSheet, Pressable, Keyboard } from 'react-native';
import Post from './Post';
import Comment from './Comment';

const PostDetail = ({
    margin,
    fontFactor,
    post,
    username,
    timestamp,
    category,
    title,
    body,
    comment,
    lastComment,
    headerSize,
    toggleCallToAuth,
}) => {
    return (
        <Pressable
            onPress={() => Keyboard.dismiss()}
            style={[lastComment && { paddingBottom: headerSize }]}
        >
            {post && (
                <Post
                    fontFactor={fontFactor}
                    margin={margin}
                    username={username}
                    timestamp={timestamp}
                    category={category}
                    title={title}
                    body={body}
                    toggleCallToAuth={toggleCallToAuth}
                />
            )}
            {comment && (
                <Comment
                    fontFactor={fontFactor}
                    margin={margin}
                    username={username}
                    timestamp={timestamp}
                    comment={comment}
                />
            )}
        </Pressable>
    );
};

export default PostDetail;

const styles = StyleSheet.create({});
