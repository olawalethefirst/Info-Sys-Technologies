import { errorMessages } from "./fetchPostsAsync"; 

export default function generateError(message) {
    switch (message) {
        //err.code - auth/user-not-found (User not found) -- suggest sign up (This may be avoided by confirming provider before initiating flow - will not require to account for in response)
        //err.code - auth/wrong-password (invalid password) - report invalid email or password
        case 'Password should be at least 6 characters':
            return 'Password should be at least 6 characters';
        case 'The email address is badly formatted.':
            return 'Invalid email format';
        case 'There is no user record corresponding to this identifier. The user may have been deleted.':
            return 'Invalid username or password.';
        case 'The email address is already in use by another account.':
            return 'User already exists, please sign in instead.';
        case 'Login with Google instead':
            return 'Login with Google instead';
        case 'The password is invalid or the user does not have a password.':
            return 'Invalid username or password';
        case errorMessages.networkError:
            return 'Error loading posts'
        case errorMessages.offline:
            return 'Error loading posts'
        default:
            return 'An error occured, please try again';
    }
}
