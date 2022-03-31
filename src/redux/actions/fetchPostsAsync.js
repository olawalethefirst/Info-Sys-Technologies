import getPostsSnapshot from '../../helperFunctions/getPostsSnapshot';

export default async function fetchPostsAsync(lastPost) {
    const postsSnapshot = await getPostsSnapshot(lastPost);
    return postsSnapshot.docs.map((doc) => {
        const data = doc.data();
        const { category, title, body } = data;

        return {
            postID: doc.id,
            searchField: category + '. ' + title + '. ' + body,
            ...data,
        };
    });
}
