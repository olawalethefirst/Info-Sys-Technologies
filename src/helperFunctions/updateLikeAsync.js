import {
    arrayUnion,
    runTransaction,
    doc,
    arrayRemove,
} from 'firebase/firestore';
import { firestore, auth } from './initializeFirebase';
import docPath, { comment } from './docPath';
import NetInfo from '@react-native-community/netinfo';

export { comment };

const onLikeAsync = (parentID, parentType, tempUID) => {
    const docMap = {};
    const path = docPath(parentID, parentType);

    return runTransaction(firestore, async (transaction) => {
        const online = await (await NetInfo.fetch()).isConnected;
        if (online) {
            const parent = await transaction.get(doc(firestore, ...path));
            if (parent.data().likes.includes(auth.currentUser.uid)) {
                docMap['likes'] = arrayRemove(
                    auth.currentUser.uid
                    // tempUID
                );
                transaction.update(doc(firestore, ...path), docMap);
            } else {
                docMap['likes'] = arrayUnion(
                    auth.currentUser.uid
                    // tempUID
                );
                transaction.update(doc(firestore, ...path), docMap);
            }
        } else {
            throw new Error('offline');
        }
    });
};

export default onLikeAsync;
