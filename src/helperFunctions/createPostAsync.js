import { auth, firestore } from '../helperFunctions/initializeFirebase';
import { serverTimestamp, doc, setDoc } from 'firebase/firestore';

const createPostAsync = (title, body, category, postID) => {
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
