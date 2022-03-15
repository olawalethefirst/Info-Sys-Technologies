import { auth } from './initializeFirebase';
import { arrayUnion } from 'firebase/firestore';
import NetInfo from '@react-native-community/netinfo';
import createLikeAsync from './createLikeAsync';



const onLikeAsync = async (parentID, parentType, tempUID) => {
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
            docMap['likes'] = arrayUnion(
                auth.currentUser.uid
                // tempUID
            );
            return createLikeAsync(docPath(), docMap);
        } else {
            throw new Error('network test failed');
        }
    });
};

export default onLikeAsync;
