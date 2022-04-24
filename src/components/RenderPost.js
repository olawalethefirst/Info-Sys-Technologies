import React from 'react';
import moment from 'moment';
import PostMini from './PostMini';

export default function renderPost({ item }) {
    const { body, title, createdAt, category, likes } = item;
    const createdString = `created ${moment(new Date(createdAt)).fromNow()}`;

    return (
        <PostMini
            body={body}
            title={title}
            createdAt={createdString}
            category={category}
            likes={Object.keys(likes).length}
            item={item}
        />
    );
}
