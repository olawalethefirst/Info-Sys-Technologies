import { auth } from './initializeFirebase';
import { arrayRemove } from 'firebase/firestore';
import NetInfo from '@react-native-community/netinfo';
import createLikeAsync from './createLikeAsync';

const onUnlikeAsync = async (parentID, parentType, tempUID) => {
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
            docMap['likes'] = arrayRemove(
                auth.currentUser.uid
                // tempUID
            );
            return createLikeAsync(docPath(), docMap);
        } else {
            throw new Error('failed');
        }
    });
};

export default onUnlikeAsync;
