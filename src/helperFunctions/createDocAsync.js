import { firestore } from './initializeFirebase';
import { doc, runTransaction } from 'firebase/firestore';
import NetInfo from '@react-native-community/netinfo';

const createDocAsync = async (docObj, path) => {
    return runTransaction(firestore, async (transaction) => {
        const online = await (await NetInfo.fetch()).isConnected; //bypass firebase network offline unhandled exception
        if (online) {
            transaction.set(doc(firestore, ...path), docObj);
        } else {
            throw new Error('failed');
        }
    });
};

export default createDocAsync;
