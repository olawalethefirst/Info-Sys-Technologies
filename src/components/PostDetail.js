import React from 'react';
import Post from './Post';
import Comment from './Comment';

const PostDetail = ({ commentInputRef, containerRef, scrollRef, item }) => {
    if (item.category) {
        return (
            <Post
                scrollRef={scrollRef}
                item={item}
                containerRef={containerRef}
                commentInputRef={commentInputRef}
            />
        );
    }
    return (
        <Comment
            scrollRef={scrollRef}
            item={item}
            containerRef={containerRef}
            commentInputRef={commentInputRef}
        />
    );
};

export default PostDetail;
