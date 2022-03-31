import { auth } from './initializeFirebase';
import { arrayRemove } from 'firebase/firestore';
import updateDocAsync from './updateDocAsync';

const onUnlikeAsync = async (parentID, parentType) => {
    const docPath = () => {
        switch (parentType) {
            case 'comment':
                return ['comments', parentID];
            default:
                return ['posts', parentID];
        }
    };

    const docMap = {};
    docMap['likes'] = arrayRemove(auth.currentUser.uid);
    console.log('called with: ', docPath(), docMap);
    return updateDocAsync(docPath(), docMap);
};

export default onUnlikeAsync;
