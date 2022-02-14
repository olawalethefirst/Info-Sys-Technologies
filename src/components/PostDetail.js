import React from 'react';
import Post from './Post';
import Comment from './Comment';

const PostDetail = ({
    commentInputRef,
    containerRef,
    scrollRef,
    toggleCallToAuth,
    item,
}) => {
    if (item.category) {
        return (
            <Post
                toggleCallToAuth={toggleCallToAuth}
                scrollRef={scrollRef}
                item={item}
                containerRef={containerRef}
                commentInputRef={commentInputRef}
            />
        );
    }
    return (
        <Comment
            toggleCallToAuth={toggleCallToAuth}
            scrollRef={scrollRef}
            item={item}
            containerRef={containerRef}
            commentInputRef={commentInputRef}
        />
    );
};

export default PostDetail;
