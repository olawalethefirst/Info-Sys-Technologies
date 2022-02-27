import { auth } from './initializeFirebase';
import { updateProfile } from 'firebase/auth';

export default function updateUsernameAsync(username) {
    return updateProfile(auth.currentUser, { displayName: username });
}
