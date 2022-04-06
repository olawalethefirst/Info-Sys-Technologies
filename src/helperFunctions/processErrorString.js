import { AuthErrorCodes } from 'firebase/auth';
export const googleAccount = 'google account';
export const usernameMinLimit = 'Minimum of three characters';
export const noPost = 'No Post';
export const noComment = 'noComment'
export const offline = 'unable to reach firestore';

export default function generateError(message) {
    switch (message) {
        //err.code - auth/user-not-found (User not found) -- suggest sign up (This may be avoided by confirming provider before initiating flow - will not require to account for in response)
        //err.code - auth/wrong-password (invalid password) - report invalid email or password
        case 'Password should be at least 6 characters':
            return 'Password should be at least 6 characters';
        case 'The email address is badly formatted.':
            return 'Invalid email format';
        case AuthErrorCodes.INVALID_PASSWORD:
            return 'Invalid username or password.';
        case AuthErrorCodes.EMAIL_EXISTS:
            return 'User already exists, please sign in instead.';
        case AuthErrorCodes.INVALID_EMAIL:
            return 'Invalid username or password';
        case offline:
            return 'Network error, please try again';
        case AuthErrorCodes.NETWORK_REQUEST_FAILED:
            return 'Please check your internet connection';
        case AuthErrorCodes.WEAK_PASSWORD:
            return 'The password must be 6 characters long or more';
        case usernameMinLimit:
            return 'The username must be 3 characters long or more';
        case googleAccount:
            return 'Login with Google instead';
        case 'unavailable':
            return 'Unable to load, please try again';
        default:
            return 'An error occured, please try again';
    }
}
