import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function getHeaderSize() {
    const height = hp(100);
    if (height > 736) {
        return hp(10);
    } else {
        return hp(11);
    }
}
