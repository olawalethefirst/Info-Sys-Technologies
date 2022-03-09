import { auth } from './initializeFirebase';
import { Timestamp } from 'firebase/firestore';
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
            const docMap = {};
            const createdAt = new Date();
            docMap[
                `likes.${
                    // auth.currentUser.uid
                    tempUID
                }`
            ] = Timestamp.fromDate(createdAt);
            return createLikeAsync(docPath(), docMap);
        } else {
            throw new Error('network test failed');
        }
    });
};

export default onLikePostAsync;
