import { firestore } from './initializeFirebase';
import { doc, runTransaction } from 'firebase/firestore';

const updateDocAsync = (docPath, docMap) => {
    console.log('called me');
    return runTransaction(firestore, async (transaction) => {
        transaction.update(doc(firestore, ...docPath), docMap);
    });
};

export default updateDocAsync;
