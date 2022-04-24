import { runTransaction, doc, deleteField } from 'firebase/firestore';
import { firestore } from './initializeFirebase';
import docPath from './docPath';
import NetInfo from '@react-native-community/netinfo';
const updateLikeAsync = (parentID, timestamp, liked, uid, parentType) => {
    const docMap = {};
    const path = docPath(parentID, parentType);

    return runTransaction(firestore, async (transaction) => {
        const online = (await NetInfo.fetch()).isConnected;
        if (online) {
            if (liked) {
                docMap[`likes.${uid}`] = deleteField();
                transaction.update(doc(firestore, ...path), docMap);
            } else {
                docMap[`likes.${uid}`] = timestamp;
                transaction.update(doc(firestore, ...path), docMap);
            }
        } else {
            throw new Error('offline');
        }
    });
};

export default updateLikeAsync;
