import React from 'react';
import { StyleSheet, Pressable, Keyboard } from 'react-native';
import Post from './Post';
import Comment from './Comment';
import { connect } from 'react-redux';

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
    deviceWidthClass,
    user,
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
                    deviceWidthClass={deviceWidthClass}
                    user={user}
                />
            )}
            {comment && (
                <Comment
                    fontFactor={fontFactor}
                    margin={margin}
                    username={username}
                    timestamp={timestamp}
                    comment={comment}
                    deviceWidthClass={deviceWidthClass}
                    user={user}
                    toggleCallToAuth={toggleCallToAuth}
                />
            )}
        </Pressable>
    );
};

const mapStateToProps = ({
    forumState: { user },
    settingsState: { deviceWidthClass, headerSize, fontFactor, margin },
}) => ({ deviceWidthClass, headerSize, fontFactor, margin, user });

export default connect(mapStateToProps)(PostDetail);

const styles = StyleSheet.create({});
