import { auth, firestore } from '../helperFunctions/initializeFirebase';
import { serverTimestamp, doc, setDoc } from 'firebase/firestore';

const createPostAsync = (data) => {
    const { title, body, category, postID } = data;
    return setDoc(doc(firestore, 'posts', postID), {
        owner: auth.currentUser.uid,
        createdAt: serverTimestamp(),
        title,
        body,
        category,
        searchField: category + '. ' + title + '. ' + body,
    });
};

export default createPostAsync;
