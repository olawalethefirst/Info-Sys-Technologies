import { firebase } from './initializeFirebase';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const setLastPostTimeAsync = () => {
    const lastPostRef = `/lastPostTime/${firebase.auth().currentUser?.uid}`;
    firebase
        .firestore()
        .doc(lastPostRef)
        .set({
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            postID: uuidv4(),
        })
        .then(() => {
            return { successful: true };
        })
        .catch(() => {
            return { successful: false };
        });
};

export default setLastPostTimeAsync;
