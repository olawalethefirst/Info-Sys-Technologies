import getPostsSnapshot from './getPostsSnapshot';

const errorMessages = {
    noPost: 'No Post',
    networkError: 'Network Error',
    offline: 'Failed to get document because the client is offline',
};

export default async function fetchPostsAsync(lastPost) {
    const postsSnapshot = await getPostsSnapshot(lastPost);
    if (postsSnapshot.metadata.fromCache) {
        throw new Error(errorMessages.networkError);
    }
    if (postsSnapshot.docs.length) {
        return postsSnapshot.docs.map((doc) => ({
            postID: doc.ref.id,
            ...doc.data(),
        }));
    } else {
        throw new Error(errorMessages.noPost);
    }
}

export { errorMessages };
