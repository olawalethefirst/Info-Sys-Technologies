import { auth } from './initializeFirebase';
import { deleteField } from 'firebase/firestore';
import makeQueryablePromise from './makeQueryablePromise';
import NetInfo from '@react-native-community/netinfo';
import createLikeAsync from './createLikeAsync';

const onUnlikePostAsync = async (parentID, parentType, tempUID) => {
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
                docMap[
                    `likes.${
                        auth.currentUser.uid
                        // tempUID
                    }`
                ] = deleteField();

                const request = makeQueryablePromise(
                    createLikeAsync(docPath, docMap)
                );
                request
                    .then(() => {
                        console.log('I reallly passed');
                        resolve();
                    })
                    .catch((err) => {
                        console.log('I reallly failed');
                        reject(err);
                    });

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

export default onUnlikePostAsync;
