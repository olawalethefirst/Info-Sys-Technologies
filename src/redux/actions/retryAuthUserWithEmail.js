import {
    RETRY_AUTH_WITH_EMAIL,
    AUTH_WITH_EMAIL_SUCCESSFUL,
    CLEAR_AUTH,
    AUTH_WITH_EMAIL_FAILED,
} from './actionTypes';
import signUpWithEmailAsync from '../../helperFunctions/signUpWithEmailAsync';
import signInWithEmailAsync from '../../helperFunctions/signInWIthEmailAsync';
import timerPromiseAsync from '../../helperFunctions/timerPromiseAsync';
import {
    FIREBASE_AUTH_ERROR_CODES,
    googleAccount,
} from '../../helperFunctions/processErrorString';
import fetchAccountProvider from '../../helperFunctions/fetchAccountProviderAsync';

export default function retryAuthUserWithEmail() {
    return async (dispatch, getState) => {
        dispatch({ type: RETRY_AUTH_WITH_EMAIL });
        const { authData } = getState().forumTempState;
        const { createAccount, email, password } = authData;
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
            if (err.code === FIREBASE_AUTH_ERROR_CODES.INVALID_PASSWORD) {
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
