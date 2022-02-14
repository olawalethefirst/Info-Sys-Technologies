import { auth } from './initializeFirebase';
import { Timestamp } from 'firebase/firestore';
import makeQueryablePromise from './makeQueryablePromise';
import NetInfo from '@react-native-community/netinfo';
import createLikeAsync from './createLikeAsync';

const onLikePostAsync = async (parentID, parentType, tempUID) => {
    const docPath = () => {
        switch (parentType) {
            case 'comment':
                return ['comments', parentID];
            default:
                return ['posts', parentID];
        }
    };
    return NetInfo.fetch().then((state) => {
        if (state.isConnected) {
            const res = new Promise((resolve, reject) => {
                const docMap = {};
                const createdAt = new Date();
                docMap[
                    `likes.${
                        auth.currentUser.uid
                        // tempUID
                    }`
                ] = Timestamp.fromDate(createdAt);

                const request = makeQueryablePromise(
                    createLikeAsync(docPath, docMap)
                );
                request.then(() => resolve()).catch((err) => reject(err));

                setTimeout(() => {
                    if (request.isPending()) {
                        reject({ message: 'failed' });
                    }
                }, 5000);
            });

            return res;
        } else {
            throw new Error('failed');
        }
    });
};

export default onLikePostAsync;
