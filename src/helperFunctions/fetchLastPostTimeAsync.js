import { firebase } from './initializeFirebase';

const fetchLastPostTimeAsync = () => {
    // check if previous lastPostTime exist for user
    const lastPostRef = `/lastPostTime/${firebase.auth().currentUser?.uid}`;
    return firebase
        .firestore()
        .doc(lastPostRef)
        .get()
        .then(
            (doc) => {
                return {
                    successful: true,
                    exists: doc.exists,
                    data: doc.data(),
                };
            },
            () => {
                return { successful: false };
            }
        );
};

export default fetchLastPostTimeAsync;
