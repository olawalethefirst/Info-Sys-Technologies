import {
    AUTH_WITH_EMAIL_INITIALIZED,
    AUTH_WITH_EMAIL_SUCCESSFUL,
    CLEAR_AUTH,
    AUTH_WITH_EMAIL_FAILED,
} from './actionTypes';
import signUpWithEmailAsync from '../../helperFunctions/signUpWithEmailAsync';
import signInWithEmailAsync from '../../helperFunctions/signInWIthEmailAsync';
import timerPromiseAsync from '../../helperFunctions/timerPromiseAsync';
import {
    googleAccount,
} from '../../helperFunctions/processErrorString';
import { AuthErrorCodes } from 'firebase/auth';
import fetchAccountProvider from '../../helperFunctions/fetchAccountProviderAsync';

export default function authUserWithEmail(payload) {
    return async (dispatch) => {
        dispatch({ type: AUTH_WITH_EMAIL_INITIALIZED, payload });
        const { createAccount, email, password } = payload;
        try {
            if (createAccount) {
                await signUpWithEmailAsync(email, password);
            } else {
                await signInWithEmailAsync(email, password);
            }
            dispatch({ type: AUTH_WITH_EMAIL_SUCCESSFUL });
            await timerPromiseAsync(2000);
            dispatch({ type: CLEAR_AUTH });
        } catch (err) {
            if (err.code === AuthErrorCodes.INVALID_PASSWORD) {
                try {
                    const providers = await fetchAccountProvider(email);
                    if (providers.length && providers.includes('google.com')) {
                        throw new Error(googleAccount);
                    } else {
                        throw err;
                    }
                } catch ({ message, code }) {
                    const payload = code ? code : message;
                    dispatch({ type: AUTH_WITH_EMAIL_FAILED, payload });
                }
            } else {
                dispatch({ type: AUTH_WITH_EMAIL_FAILED, payload: err.code });
            }
        }
    };
}
