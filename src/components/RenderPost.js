import React from 'react';
import moment from 'moment';
import PostMini from './PostMini';
import { Timestamp } from 'firebase/firestore';

export default function renderPost({ item }) {
    const { body, title, postID, owner, createdAt, category, likes } = item;
    const { seconds, nanoseconds } = createdAt;
    const createdString = `created ${moment(
        new Timestamp(seconds, nanoseconds).toDate()
    ).fromNow()}`;
    const likeCount = Object.keys(likes || {}).length;

    return (
        <PostMini
            body={body}
            title={title}
            postID={postID}
            owner={owner}
            createdAt={createdString}
            category={category}
            likes={likeCount}
            item={item}
        />
    );
}
