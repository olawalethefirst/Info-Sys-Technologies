import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function () {
    const height = hp(100);
    if (height > 736) {
        return hp(90);
    } else {
        return hp(89);
    }
}
