import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { firestore, auth } from './initializeFirebase';

const createCommentAsync = (commentID, parentPostID, comment) => {
    // mention is an object containing a mention field and uid value else empty
    const docRef = doc(firestore, `/comments/${commentID}`);
    return setDoc(docRef, {
        parentPostID,
        owner: auth.currentUser.uid,
        createdAt: serverTimestamp(),
        comment,
    });
};

export default createCommentAsync;
