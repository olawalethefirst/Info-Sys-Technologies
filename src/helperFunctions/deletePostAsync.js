import { firestore } from './initializeFirebase';
import { deleteDoc, doc } from 'firebase/firestore';

const deletePostAsync = (postID) => {
    return deleteDoc(doc(firestore, 'posts', postID));
};

export default deletePostAsync;
