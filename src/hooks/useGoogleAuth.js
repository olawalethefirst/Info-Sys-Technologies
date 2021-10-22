// import * as WebBrowser from 'expo-web-browser'; --- to be called in forum screen or any screen using login flow
import * as Google from 'expo-auth-session/providers/google';
import { clientId } from '../../config';

// console.log('clientId', clientId);

export default function useGoogleAuth() {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId:
            '173918698726-gb70pgv7tu67ufqrq73if4i3fv3jvjsi.apps.googleusercontent.com',
    });
    return [request, response, promptAsync];
}
