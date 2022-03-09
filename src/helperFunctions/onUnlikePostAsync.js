import { auth } from './initializeFirebase';
import { deleteField } from 'firebase/firestore';
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
            const docMap = {};
            docMap[
                `likes.${
                    auth.currentUser.uid
                    // tempUID
                }`
            ] = deleteField();
            return createLikeAsync(docPath(), docMap);
        } else {
            throw new Error('failed');
        }
    });
};

export default onUnlikePostAsync;
