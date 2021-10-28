import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Constants from 'expo-constants';

export default function () {
    const { statusBarHeight } = Constants;
    const height = hp(100) - statusBarHeight;
    if (height > 736) {
        return 0.9 * height;
    } else {
        return 0.91 * height;
    }
}
