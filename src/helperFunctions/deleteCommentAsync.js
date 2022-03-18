import { firestore } from './initializeFirebase';
import { deleteDoc, doc } from 'firebase/firestore';

const deleteCommentAsync = (commentID) => {
    return deleteDoc(doc(firestore, 'comments', commentID));
};

export default deleteCommentAsync;
