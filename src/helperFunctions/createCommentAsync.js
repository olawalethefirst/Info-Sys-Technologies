import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { firestore, auth } from './initializeFirebase';

const createCommentAsync = (data) => {
    // mention is an object containing a mention field and uid value else empty
    const {commentID, parentPostID, comment} = data
    return setDoc(doc(firestore, 'comments', commentID), {
        parentPostID,
        owner: auth.currentUser.uid,
        createdAt: serverTimestamp(),
        comment,
        username: auth.currentUser.displayName,
        likes: []
    });
};

export default createCommentAsync;
