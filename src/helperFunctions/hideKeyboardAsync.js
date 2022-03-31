import { Keyboard } from 'react-native';

export default function hideKeyboardAsync() {
    return new Promise((res) => {
        const listener = Keyboard.addListener('keyboardDidHide', () => {
            listener.remove();
            res();
        });
        Keyboard.dismiss();
    });
}
