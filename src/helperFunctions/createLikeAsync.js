import { firestore } from './initializeFirebase';
import { doc, updateDoc } from 'firebase/firestore';

const createLikeAsync = (docPath, docMap) => {
    return updateDoc(doc(firestore, ...docPath), docMap);
};

export default createLikeAsync;
