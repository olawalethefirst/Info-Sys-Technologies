import { useEffect, useCallback } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { expoClientId, androidClientId, clientId } from '@env';
import { useDispatch } from 'react-redux';
import authUser from '../redux/actions/authUser';
import { google } from '../constants';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleProvider({ children }) {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        expoClientId,
        androidClientId,
        clientId,
    });
    const reduxDispatch = useDispatch();

    const onPress = useCallback(
        () => promptAsync({ showInRecents: true }),
        [promptAsync]
    );

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            reduxDispatch(authUser(google, id_token));
        }
    }, [response, reduxDispatch]);

    return children(onPress, !request);
}
