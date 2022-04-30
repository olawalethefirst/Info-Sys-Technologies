import {
    AUTH_INITIALIZED,
    AUTH_SUCCESSFUL,
    CLEAR_AUTH,
    AUTH_FAILED,
} from './actionTypes';
import signUpWithEmailAsync from '../../helperFunctions/signUpWithEmailAsync';
import signInWithEmailAsync from '../../helperFunctions/signInWithEmailAsync';
import timerPromiseAsync from '../../helperFunctions/timerPromiseAsync';
import { googleAccount } from '../../helperFunctions/processErrorString';
import { AuthErrorCodes } from 'firebase/auth';
import fetchAccountProvider from '../../helperFunctions/fetchAccountProviderAsync';
import { email, google } from '../../constants';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../helperFunctions/initializeFirebase';

export default function authUser(type, authData) {
    return async (dispatch) => {
        dispatch({ type: AUTH_INITIALIZED, payload: { type, authData } });
        switch (type) {
            case email:
                {
                    const { createAccount, email, password } = authData;
                    try {
                        if (createAccount) {
                            await signUpWithEmailAsync(email, password);
                        } else {
                            await signInWithEmailAsync(email, password);
                        }
                        dispatch({ type: AUTH_SUCCESSFUL });
                        await timerPromiseAsync(2000);
                        dispatch({ type: CLEAR_AUTH });
                    } catch (err) {
                        if (err.code === AuthErrorCodes.INVALID_PASSWORD) {
                            try {
                                const providers = await fetchAccountProvider(
                                    email
                                );
                                if (
                                    providers.length &&
                                    providers.includes('google.com')
                                ) {
                                    throw new Error(googleAccount);
                                } else {
                                    throw err;
                                }
                            } catch (err) {
                                dispatch({
                                    type: AUTH_FAILED,
                                    payload: err.code ?? err.message,
                                });
                            }
                        } else {
                            dispatch({
                                type: AUTH_FAILED,
                                payload: err.code ?? err.message,
                            });
                        }
                    }
                }
                break;
            case google: {
                const credential = GoogleAuthProvider.credential(authData);
                try {
                    await signInWithCredential(auth, credential);
                    dispatch({ type: AUTH_SUCCESSFUL });
                    await timerPromiseAsync(2000);
                    dispatch({ type: CLEAR_AUTH });
                } catch (err) {
                    dispatch({
                        type: AUTH_FAILED,
                        payload: err.code ?? err.message,
                    });
                }
                break;
            }
            default:
                return;
        }
    };
}
