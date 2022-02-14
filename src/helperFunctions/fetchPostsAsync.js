import getPostsSnapshot from './getPostsSnapshot';

const errorMessages = {
    noPost: 'No Post',
    offline: 'Failed to get document because the client is offline',
};

export default async function fetchPostsAsync(lastPost) {
    const postsSnapshot = await getPostsSnapshot(lastPost);
    if (postsSnapshot.size) {
        return postsSnapshot.docs.map((doc) => ({
            postID: doc.ref.id,
            ...doc.data(),
        }));
    } else {
        throw new Error(errorMessages.noPost);
    }
}

export { errorMessages };
