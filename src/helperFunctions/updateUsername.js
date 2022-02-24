import { auth } from './initializeFirebase';
import { updateProfile } from 'firebase/auth';

export default function updateUsername(username) {
    return updateProfile(auth.currentUser, { displayName: username });
}
